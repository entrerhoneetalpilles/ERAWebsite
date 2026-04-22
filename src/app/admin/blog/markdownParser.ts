import type { FormValues } from "./BlogForm";

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function stripJsonLd(md: string): string {
  // Remove ```json ... ``` blocks (JSON-LD schema)
  return md.replace(/```json[\s\S]*?```/gi, "").trim();
}

function extractTitle(md: string): string {
  const match = md.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function extractExcerpt(md: string, title: string): string {
  // Remove the H1 line then find first non-empty, non-heading paragraph
  const withoutTitle = md.replace(/^#\s+.+\n?/m, "");
  const paragraphs = withoutTitle
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0 && !p.startsWith("#") && !p.startsWith("```") && !p.startsWith("---"));

  if (paragraphs.length === 0) return "";

  // Strip Markdown formatting for the excerpt
  const raw = paragraphs[0]
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/`(.+?)`/g, "$1");

  // Trim to 160 chars at word boundary
  if (raw.length <= 160) return raw;
  const cut = raw.slice(0, 160);
  const lastSpace = cut.lastIndexOf(" ");
  return lastSpace > 120 ? cut.slice(0, lastSpace) + "…" : cut + "…";
}

function extractContent(md: string): string {
  // Remove H1, remove JSON-LD, keep the rest
  const clean = stripJsonLd(md);
  return clean.replace(/^#\s+.+\n?/m, "").trim();
}

function detectCategory(md: string): FormValues["category"] {
  const lower = md.toLowerCase();
  if (/guide.*voyage|randonnée|marché|visiter|incontournable|tourisme/i.test(lower))
    return "Guides de voyage";
  if (/actualité|tendance|marché immobilier|airbnb.*actualité|réglementation/i.test(lower))
    return "Actualités région";
  return "Conseils propriétaires";
}

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export interface ParseResult {
  values: Partial<FormValues>;
  warnings: string[];
}

export function parseMarkdownArticle(raw: string): ParseResult {
  const warnings: string[] = [];

  if (!raw.trim()) {
    return { values: {}, warnings: ["Contenu vide."] };
  }

  // Extract from the ```markdown block if the LLM wrapped it
  const blockMatch = raw.match(/```(?:markdown)?\s*\n([\s\S]+?)\n```/i);
  const md = blockMatch ? blockMatch[1].trim() : raw.trim();

  const title = extractTitle(md);
  if (!title) warnings.push("Aucun titre H1 (# …) trouvé — à remplir manuellement.");

  const slug = slugify(title);
  const excerpt = extractExcerpt(md, title);
  if (excerpt.length < 100) warnings.push("Extrait court (< 100 car.) — vérifie la meta description.");

  const content = extractContent(md);
  const category = detectCategory(md);
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < 600) warnings.push(`Contenu court (${wordCount} mots) — vise 900+ pour le SEO local.`);

  const today = new Date().toISOString().slice(0, 10);

  return {
    values: {
      title,
      slug,
      excerpt,
      content,
      category,
      date: today,
      image: slug ? `/images/blog/${slug}.jpg` : "",
    },
    warnings,
  };
}
