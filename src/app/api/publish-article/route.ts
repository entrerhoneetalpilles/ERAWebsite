import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const ROOT = process.cwd();

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
  const paragraphs = v.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  const lines = paragraphs
    .map((p) => `    "${esc(p.replace(/\n/g, " "))}",`)
    .join("\n");
  return `  "${esc(v.slug)}": [\n${lines}\n  ],`;
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

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ArticleData;
    const { slug, title, content } = body;

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: "Champs requis manquants : slug, title, content." },
        { status: 400 }
      );
    }

    const dataPath = path.join(ROOT, "src/lib/data.ts");
    const pagePath = path.join(ROOT, "src/app/blog/[slug]/page.tsx");

    // ── 1. data.ts — insérer dans blogPosts[] ──────────────────────
    let dataSource = await fs.readFile(dataPath, "utf8");

    if (dataSource.includes(`slug: "${slug}"`)) {
      return NextResponse.json(
        { error: `Un article avec le slug "${slug}" existe déjà.` },
        { status: 409 }
      );
    }

    const DATA_MARKER = "export const blogPosts: BlogPost[] = [";
    if (!dataSource.includes(DATA_MARKER)) {
      return NextResponse.json(
        { error: "Marqueur blogPosts[] introuvable dans data.ts." },
        { status: 500 }
      );
    }
    dataSource = dataSource.replace(
      DATA_MARKER,
      `${DATA_MARKER}\n${buildDataEntry(body)}`
    );
    await fs.writeFile(dataPath, dataSource, "utf8");

    // ── 2. blog/[slug]/page.tsx — contenu + liens internes ─────────
    let pageSource = await fs.readFile(pagePath, "utf8");

    const CONTENT_MARKER = "const articleContent: Record<string, string[]> = {";
    if (!pageSource.includes(CONTENT_MARKER)) {
      return NextResponse.json(
        { error: "Marqueur articleContent{} introuvable dans page.tsx." },
        { status: 500 }
      );
    }
    pageSource = pageSource.replace(
      CONTENT_MARKER,
      `${CONTENT_MARKER}\n${buildContentEntry(body)}`
    );

    const LINKS_MARKER =
      "const internalLinks: Record<string, { label: string; href: string }[]> = {";
    if (!pageSource.includes(LINKS_MARKER)) {
      return NextResponse.json(
        { error: "Marqueur internalLinks{} introuvable dans page.tsx." },
        { status: 500 }
      );
    }
    pageSource = pageSource.replace(
      LINKS_MARKER,
      `${LINKS_MARKER}\n${buildLinksEntry(slug, body.category)}`
    );

    await fs.writeFile(pagePath, pageSource, "utf8");

    return NextResponse.json({ success: true, slug, url: `/blog/${slug}` });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
