import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO ?? "entrerhoneetalpilles/ERAWebsite";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH ?? "main";
const GH_API = `https://api.github.com/repos/${GITHUB_REPO}/contents`;

interface ArticleData {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  content: string;
}

// ── GitHub helpers ─────────────────────────────────────────────

function ghHeaders() {
  return {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };
}

async function ghGet(filePath: string): Promise<{ content: string; sha: string }> {
  const res = await fetch(`${GH_API}/${filePath}?ref=${GITHUB_BRANCH}`, {
    headers: ghHeaders(),
    cache: "no-store",
  });
  if (!res.ok) {
    const err = (await res.json()) as { message?: string };
    throw new Error(`GitHub GET ${filePath}: ${err.message ?? res.statusText}`);
  }
  const data = (await res.json()) as { content: string; sha: string };
  return { content: Buffer.from(data.content, "base64").toString("utf8"), sha: data.sha };
}

async function ghPut(filePath: string, content: string, sha: string, message: string) {
  const res = await fetch(`${GH_API}/${filePath}`, {
    method: "PUT",
    headers: ghHeaders(),
    body: JSON.stringify({
      message,
      content: Buffer.from(content, "utf8").toString("base64"),
      sha,
      branch: GITHUB_BRANCH,
    }),
  });
  if (!res.ok) {
    const err = (await res.json()) as { message?: string };
    throw new Error(`GitHub PUT ${filePath}: ${err.message ?? res.statusText}`);
  }
}

// ── Source-file helpers ────────────────────────────────────────

function reEsc(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function strEsc(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

/** Remove a blogPost entry block from data.ts */
function removeDataEntry(source: string, slug: string): string {
  const re = new RegExp(
    `  \\{\\n    slug: "${reEsc(slug)}",[\\s\\S]*?  \\},\\n`
  );
  return source.replace(re, "");
}

/** Remove one "slug": [...], block (articleContent or internalLinks) */
function removeRecordEntry(source: string, slug: string): string {
  const re = new RegExp(`  "${reEsc(slug)}": \\[[\\s\\S]*?  \\],\\n`);
  return source.replace(re, "");
}

/** Extract the string-array lines for a given slug from page.tsx */
function extractContentLines(source: string, slug: string): string[] {
  const marker = `  "${slug}": [`;
  const start = source.indexOf(marker);
  if (start === -1) return [];

  let depth = 1;
  let pos = start + marker.length;
  while (pos < source.length && depth > 0) {
    if (source[pos] === "[") depth++;
    else if (source[pos] === "]") depth--;
    pos++;
  }

  const inner = source.slice(start + marker.length, pos - 1);
  const lines: string[] = [];
  for (const raw of inner.split("\n")) {
    const t = raw.trim();
    if (t.startsWith('"') && t.endsWith('",')) {
      lines.push(
        t.slice(1, -2).replace(/\\"/g, '"').replace(/\\\\/g, "\\")
      );
    }
  }
  return lines;
}

// ── Build helpers (mirror of publish-article/route.ts) ─────────

function buildDataEntry(v: ArticleData): string {
  const readTime = Math.max(
    1,
    Math.round(v.content.trim().split(/\s+/).filter(Boolean).length / 200)
  );
  const image = v.image || `/images/blog/${v.slug}.jpg`;
  return `  {
    slug: "${strEsc(v.slug)}",
    title: "${strEsc(v.title)}",
    excerpt:
      "${strEsc(v.excerpt)}",
    date: "${v.date}",
    category: "${strEsc(v.category)}",
    image: "${strEsc(image)}",
    readTime: ${readTime},
  },`;
}

function buildContentEntry(v: ArticleData): string {
  const clean = v.content.replace(/```[\s\S]*?```/gi, "").trim();
  const entries: string[] = [];
  for (const block of clean.split(/\n{2,}/)) {
    const trimmed = block.trim();
    if (!trimmed || trimmed === "---") continue;
    for (const line of trimmed
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)) {
      if (/^# (?!#)/.test(line)) continue;
      entries.push(line);
    }
  }
  return `  "${strEsc(v.slug)}": [\n${entries.map((e) => `    "${strEsc(e)}",`).join("\n")}\n  ],`;
}

function defaultLinks(category: string) {
  if (category === "Conseils propriétaires")
    return [
      { label: "Notre service de conciergerie Provence", href: "/conciergerie" },
      { label: "Nos services de gestion locative", href: "/conciergerie/nos-services" },
      { label: "Estimer mes revenus locatifs gratuitement", href: "/conciergerie/estimer-mes-revenus" },
    ];
  if (category === "Guides de voyage")
    return [
      { label: "Tous nos hébergements entre Rhône et Alpilles", href: "/locations" },
      { label: "Découvrir les destinations en Provence", href: "/destinations" },
      { label: "Estimer mes revenus Airbnb en Provence", href: "/conciergerie/estimer-mes-revenus" },
    ];
  return [
    { label: "Notre conciergerie Provence", href: "/conciergerie" },
    { label: "Toutes nos actualités et conseils", href: "/blog" },
    { label: "Estimer mes revenus locatifs", href: "/conciergerie/estimer-mes-revenus" },
  ];
}

function buildLinksEntry(slug: string, category: string): string {
  const links = defaultLinks(category);
  return `  "${strEsc(slug)}": [\n${links.map((l) => `    { label: "${strEsc(l.label)}", href: "${l.href}" },`).join("\n")}\n  ],`;
}

// ── Route handlers ─────────────────────────────────────────────

function noToken() {
  return NextResponse.json(
    { error: "Variable d'environnement GITHUB_TOKEN manquante." },
    { status: 500 }
  );
}

/** GET /api/manage-article?slug=xxx — return raw content lines for the edit form */
export async function GET(req: NextRequest) {
  if (!GITHUB_TOKEN) return noToken();
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    if (!slug) return NextResponse.json({ error: "slug requis" }, { status: 400 });

    const pageFile = await ghGet("src/app/blog/[slug]/page.tsx");
    const lines = extractContentLines(pageFile.content, slug);
    if (lines.length === 0)
      return NextResponse.json({ error: "Contenu introuvable pour ce slug." }, { status: 404 });

    return NextResponse.json({ content: lines.join("\n\n") });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur inconnue" },
      { status: 500 }
    );
  }
}

/** PUT /api/manage-article — update an existing article */
export async function PUT(req: NextRequest) {
  if (!GITHUB_TOKEN) return noToken();
  try {
    const body = (await req.json()) as ArticleData;
    const { slug, title, content } = body;
    if (!slug || !title || !content)
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });

    const [dataFile, pageFile] = await Promise.all([
      ghGet("src/lib/data.ts"),
      ghGet("src/app/blog/[slug]/page.tsx"),
    ]);

    // data.ts: remove old + prepend updated entry
    const DATA_MARKER = "export const blogPosts: BlogPost[] = [";
    let newData = removeDataEntry(dataFile.content, slug);
    if (!newData.includes(DATA_MARKER))
      return NextResponse.json({ error: "Marqueur blogPosts[] introuvable." }, { status: 500 });
    newData = newData.replace(DATA_MARKER, `${DATA_MARKER}\n${buildDataEntry(body)}`);
    await ghPut("src/lib/data.ts", newData, dataFile.sha, `content: update blog post "${slug}"`);

    // page.tsx: remove old blocks + prepend updated ones
    const CONTENT_MARKER = "const articleContent: Record<string, string[]> = {";
    const LINKS_MARKER =
      "const internalLinks: Record<string, { label: string; href: string }[]> = {";
    let newPage = removeRecordEntry(pageFile.content, slug); // articleContent
    newPage = removeRecordEntry(newPage, slug); // internalLinks
    newPage = newPage.replace(CONTENT_MARKER, `${CONTENT_MARKER}\n${buildContentEntry(body)}`);
    newPage = newPage.replace(LINKS_MARKER, `${LINKS_MARKER}\n${buildLinksEntry(slug, body.category)}`);
    await ghPut(
      "src/app/blog/[slug]/page.tsx",
      newPage,
      pageFile.sha,
      `content: update article "${slug}"`
    );

    return NextResponse.json({ success: true, slug, url: `/blog/${slug}` });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur inconnue" },
      { status: 500 }
    );
  }
}

/** DELETE /api/manage-article?slug=xxx — remove an article */
export async function DELETE(req: NextRequest) {
  if (!GITHUB_TOKEN) return noToken();
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    if (!slug) return NextResponse.json({ error: "slug requis" }, { status: 400 });

    const [dataFile, pageFile] = await Promise.all([
      ghGet("src/lib/data.ts"),
      ghGet("src/app/blog/[slug]/page.tsx"),
    ]);

    const newData = removeDataEntry(dataFile.content, slug);
    await ghPut("src/lib/data.ts", newData, dataFile.sha, `content: remove blog post "${slug}"`);

    let newPage = removeRecordEntry(pageFile.content, slug);
    newPage = removeRecordEntry(newPage, slug);
    await ghPut(
      "src/app/blog/[slug]/page.tsx",
      newPage,
      pageFile.sha,
      `content: remove article "${slug}"`
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur inconnue" },
      { status: 500 }
    );
  }
}
