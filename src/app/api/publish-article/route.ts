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

function esc(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function buildDataEntry(v: ArticleData): string {
  const readTime = Math.max(1, Math.round(v.content.trim().split(/\s+/).filter(Boolean).length / 200));
  const image = v.image || `/images/blog/${v.slug}.jpg`;
  return `  {
    slug: "${esc(v.slug)}",
    title: "${esc(v.title)}",
    excerpt:
      "${esc(v.excerpt)}",
    date: "${v.date}",
    category: "${esc(v.category)}",
    image: "${esc(image)}",
    readTime: ${readTime},
  },`;
}

function buildContentEntry(v: ArticleData): string {
  const clean = v.content
    .replace(/```[\s\S]*?```/gi, "")                          // blocs de code
    .replace(/---\s*\n+##\s+Données structurées[\s\S]*/i, "") // section JSON-LD avec ---
    .replace(/\n##\s+Données structurées[\s\S]*/i, "")        // section JSON-LD sans ---
    .trim();

  const entries: string[] = [];
  for (const block of clean.split(/\n{2,}/)) {
    const trimmed = block.trim();
    if (!trimmed || trimmed === "---") continue;
    for (const line of trimmed.split("\n").map((l) => l.trim()).filter(Boolean)) {
      if (/^# (?!#)/.test(line)) continue; // skip H1
      entries.push(line);
    }
  }

  const encoded = entries.map((e) => `    "${esc(e)}",`).join("\n");
  return `  "${esc(v.slug)}": [\n${encoded}\n  ],`;
}

function defaultLinks(category: string): Array<{ label: string; href: string }> {
  if (category === "Conseils propriétaires") {
    return [
      { label: "Notre service de conciergerie Provence", href: "/conciergerie" },
      { label: "Nos services de gestion locative", href: "/conciergerie/nos-services" },
      { label: "Estimer mes revenus locatifs gratuitement", href: "/conciergerie/estimer-mes-revenus" },
    ];
  }
  if (category === "Guides de voyage") {
    return [
      { label: "Tous nos hébergements entre Rhône et Alpilles", href: "/locations" },
      { label: "Découvrir les destinations en Provence", href: "/destinations" },
      { label: "Estimer mes revenus Airbnb en Provence", href: "/conciergerie/estimer-mes-revenus" },
    ];
  }
  return [
    { label: "Notre conciergerie Provence", href: "/conciergerie" },
    { label: "Toutes nos actualités et conseils", href: "/blog" },
    { label: "Estimer mes revenus locatifs", href: "/conciergerie/estimer-mes-revenus" },
  ];
}

function buildLinksEntry(slug: string, category: string): string {
  const links = defaultLinks(category);
  const entries = links
    .map((l) => `    { label: "${esc(l.label)}", href: "${l.href}" },`)
    .join("\n");
  return `  "${esc(slug)}": [\n${entries}\n  ],`;
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
    const err = await res.json() as { message?: string };
    throw new Error(`GitHub GET ${filePath}: ${err.message ?? res.statusText}`);
  }
  const data = await res.json() as { content: string; sha: string };
  const decoded = Buffer.from(data.content, "base64").toString("utf8");
  return { content: decoded, sha: data.sha };
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
    const err = await res.json() as { message?: string };
    throw new Error(`GitHub PUT ${filePath}: ${err.message ?? res.statusText}`);
  }
}

// ── Handler ────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: "Variable d'environnement GITHUB_TOKEN manquante." },
      { status: 500 }
    );
  }

  try {
    const body = (await req.json()) as ArticleData;
    const { slug, title, content } = body;

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: "Champs requis manquants : slug, title, content." },
        { status: 400 }
      );
    }

    // ── 1. data.ts — insérer dans blogPosts[] ──────────────────
    const dataFile = await ghGet("src/lib/data.ts");

    if (dataFile.content.includes(`slug: "${slug}"`)) {
      return NextResponse.json(
        { error: `Un article avec le slug "${slug}" existe déjà.` },
        { status: 409 }
      );
    }

    const DATA_MARKER = "export const blogPosts: BlogPost[] = [";
    if (!dataFile.content.includes(DATA_MARKER)) {
      return NextResponse.json(
        { error: "Marqueur blogPosts[] introuvable dans data.ts." },
        { status: 500 }
      );
    }
    const newDataSource = dataFile.content.replace(
      DATA_MARKER,
      `${DATA_MARKER}\n${buildDataEntry(body)}`
    );
    await ghPut(
      "src/lib/data.ts",
      newDataSource,
      dataFile.sha,
      `content: add blog post "${slug}"`
    );

    // ── 2. blog/[slug]/page.tsx — contenu + liens internes ─────
    const pageFile = await ghGet("src/app/blog/[slug]/page.tsx");

    const CONTENT_MARKER = "const articleContent: Record<string, string[]> = {";
    const LINKS_MARKER =
      "const internalLinks: Record<string, { label: string; href: string }[]> = {";

    if (!pageFile.content.includes(CONTENT_MARKER)) {
      return NextResponse.json(
        { error: "Marqueur articleContent{} introuvable dans page.tsx." },
        { status: 500 }
      );
    }
    if (!pageFile.content.includes(LINKS_MARKER)) {
      return NextResponse.json(
        { error: "Marqueur internalLinks{} introuvable dans page.tsx." },
        { status: 500 }
      );
    }

    let newPageSource = pageFile.content.replace(
      CONTENT_MARKER,
      `${CONTENT_MARKER}\n${buildContentEntry(body)}`
    );
    newPageSource = newPageSource.replace(
      LINKS_MARKER,
      `${LINKS_MARKER}\n${buildLinksEntry(slug, body.category)}`
    );

    await ghPut(
      "src/app/blog/[slug]/page.tsx",
      newPageSource,
      pageFile.sha,
      `content: add article content for "${slug}"`
    );

    return NextResponse.json({ success: true, slug, url: `/blog/${slug}` });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
