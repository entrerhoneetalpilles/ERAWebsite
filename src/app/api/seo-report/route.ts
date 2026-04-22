import { NextRequest } from "next/server";
import { blogPosts, communes } from "@/lib/data";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://entre-rhone-alpilles.fr").replace(/\/$/, "");
const PSI_KEY = process.env.GOOGLE_PAGESPEED_API_KEY ?? "";

// ── Types ──────────────────────────────────────────────────────

type Severity = "critical" | "warning" | "info";
type PageType = "home" | "blog" | "blog-index" | "location" | "destination" | "conciergerie" | "static";

export interface Issue {
  severity: Severity;
  code: string;
  message: string;
}

export interface PageResult {
  path: string;
  url: string;
  pageType: PageType;
  httpStatus: number;
  title: string | null;
  titleLength: number;
  description: string | null;
  descriptionLength: number;
  h1: string | null;
  h1Count: number;
  h2Count: number;
  h2Texts: string[];
  h3Count: number;
  canonical: string | null;
  robotsMeta: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  hasJsonLd: boolean;
  jsonLdTypes: string[];
  imagesTotal: number;
  imagesWithoutAlt: number;
  wordCount: number;
  internalLinks: number;
  externalLinks: number;
  viewport: string | null;
  htmlLang: string | null;
  responseTimeMs: number;
  pageSizeKb: number;
  textHtmlRatio: number;
  issues: Issue[];
  score: number;
  psi?: { performance: number; seo: number; accessibility: number; lcp: number | null; cls: number | null };
}

// ── Page list ──────────────────────────────────────────────────

function getPages(mode: "quick" | "full"): Array<{ path: string; pageType: PageType }> {
  const statics: Array<{ path: string; pageType: PageType }> = [
    { path: "/", pageType: "home" },
    { path: "/blog", pageType: "blog-index" },
    { path: "/locations", pageType: "static" },
    { path: "/destinations", pageType: "static" },
    { path: "/conciergerie", pageType: "conciergerie" },
    { path: "/conciergerie/nos-services", pageType: "static" },
    { path: "/conciergerie/comment-ca-marche", pageType: "static" },
    { path: "/conciergerie/tarifs", pageType: "static" },
    { path: "/conciergerie/estimer-mes-revenus", pageType: "static" },
    { path: "/contact", pageType: "static" },
    { path: "/faq", pageType: "static" },
    { path: "/a-propos", pageType: "static" },
    { path: "/avis", pageType: "static" },
  ];

  const blogs: Array<{ path: string; pageType: PageType }> = blogPosts.map((p) => ({
    path: `/blog/${p.slug}`,
    pageType: "blog",
  }));

  if (mode === "quick") return [...statics, ...blogs];

  const communePages: Array<{ path: string; pageType: PageType }> = communes.flatMap((c) => [
    { path: `/locations/${c.slug}`, pageType: "location" as PageType },
    { path: `/destinations/${c.slug}`, pageType: "destination" as PageType },
    { path: `/conciergerie/${c.slug}`, pageType: "conciergerie" as PageType },
  ]);

  return [...statics, ...blogs, ...communePages];
}

// ── HTML helpers ───────────────────────────────────────────────

function dHtml(s: string) {
  return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'");
}

function getMeta(html: string, name: string): string | null {
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*?)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*?)["'][^>]+name=["']${name}["']`, "i"),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return dHtml(m[1].trim());
  }
  return null;
}

function getOg(html: string, prop: string): string | null {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']og:${prop}["'][^>]+content=["']([^"']*?)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*?)["'][^>]+property=["']og:${prop}["']`, "i"),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return dHtml(m[1].trim());
  }
  return null;
}

function getTitle(html: string): string | null {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? dHtml(m[1].trim()) : null;
}

function getCanonical(html: string): string | null {
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
    ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  return m ? m[1].trim() : null;
}

function getHeadings(html: string, tag: "h1" | "h2" | "h3"): string[] {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const results: string[] = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    const text = m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (text) results.push(dHtml(text));
  }
  return results;
}

function getJsonLdTypes(html: string): string[] {
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const types: string[] = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      const obj = JSON.parse(m[1]);
      const t = obj["@type"] ?? obj.type;
      if (t) types.push(Array.isArray(t) ? t.join(", ") : String(t));
    } catch { /* skip invalid JSON */ }
  }
  return types;
}

function countImages(html: string): { total: number; withoutAlt: number } {
  const re = /<img([^>]*)>/gi;
  let total = 0;
  let withoutAlt = 0;
  let m;
  while ((m = re.exec(html)) !== null) {
    total++;
    const attrs = m[1];
    const hasAlt = /alt=["'][^"']*["']/i.test(attrs);
    const emptyAlt = /alt=["']\s*["']/i.test(attrs);
    if (!hasAlt || emptyAlt) withoutAlt++;
  }
  return { total, withoutAlt };
}

function countLinks(html: string): { internal: number; external: number } {
  const re = /<a[^>]+href=["']([^"']+)["']/gi;
  let internal = 0;
  let external = 0;
  let m;
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    if (href.startsWith("http") && !href.includes(SITE.replace(/https?:\/\//, ""))) external++;
    else if (!href.startsWith("mailto:") && !href.startsWith("tel:") && !href.startsWith("#")) internal++;
  }
  return { internal, external };
}

function getWordCount(html: string): number {
  const main = html.match(/<(?:main|article)[^>]*>([\s\S]*?)<\/(?:main|article)>/i)?.[1] ?? html;
  const text = main.replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.split(/\s+/).filter((w) => w.length > 1).length;
}

function getHtmlLang(html: string): string | null {
  const m = html.match(/<html[^>]+lang=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

function getTextHtmlRatio(html: string): number {
  if (!html) return 0;
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  const cleaned = body
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");
  const textLen = cleaned.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;
  return cleaned.length > 0 ? Math.round((textLen / cleaned.length) * 100) : 0;
}

// ── Scoring ────────────────────────────────────────────────────

const SCORE_WEIGHTS = {
  // Blocking
  HTTP_ERROR: { sev: "critical" as Severity, pts: 50, msg: (s: number) => `Erreur HTTP ${s}` },
  // Title
  TITLE_MISSING: { sev: "critical" as Severity, pts: 20, msg: "Balise <title> manquante" },
  TITLE_TOO_LONG: { sev: "warning" as Severity, pts: 8, msg: (n: number) => `Titre trop long (${n} car. — max 60)` },
  TITLE_TOO_SHORT: { sev: "warning" as Severity, pts: 5, msg: (n: number) => `Titre trop court (${n} car. — idéal 50-60)` },
  TITLE_DUPLICATE: { sev: "critical" as Severity, pts: 15, msg: "Titre identique sur une autre page" },
  // Description
  DESC_MISSING: { sev: "critical" as Severity, pts: 20, msg: "Meta description manquante" },
  DESC_TOO_LONG: { sev: "warning" as Severity, pts: 5, msg: (n: number) => `Meta description trop longue (${n} car. — max 160)` },
  DESC_TOO_SHORT: { sev: "warning" as Severity, pts: 8, msg: (n: number) => `Meta description trop courte (${n} car. — idéal 140-160)` },
  DESC_DUPLICATE: { sev: "warning" as Severity, pts: 10, msg: "Meta description dupliquée entre pages" },
  // Headings
  H1_MISSING: { sev: "critical" as Severity, pts: 15, msg: "H1 manquant" },
  H1_DUPLICATE: { sev: "warning" as Severity, pts: 10, msg: (n: number) => `${n} balises H1 présentes (doit être unique)` },
  NO_H2: { sev: "warning" as Severity, pts: 5, msg: "Aucun H2 (structure de contenu insuffisante)" },
  // Canonical
  NO_CANONICAL: { sev: "warning" as Severity, pts: 5, msg: "Lien canonical manquant" },
  WRONG_CANONICAL: { sev: "critical" as Severity, pts: 15, msg: "Canonical pointe vers une URL différente" },
  // Open Graph
  NO_OG_TITLE: { sev: "warning" as Severity, pts: 5, msg: "og:title manquant (partage réseaux sociaux)" },
  NO_OG_DESC: { sev: "warning" as Severity, pts: 5, msg: "og:description manquant" },
  NO_OG_IMAGE: { sev: "warning" as Severity, pts: 5, msg: "og:image manquant (image de partage)" },
  // Structured data
  NO_JSON_LD: { sev: "warning" as Severity, pts: 5, msg: "Aucune donnée structurée JSON-LD" },
  // Images
  IMG_ALT: { sev: "warning" as Severity, pts: 3, msg: (n: number) => `${n} image${n > 1 ? "s" : ""} sans attribut alt` },
  // Content
  THIN_CONTENT: { sev: "warning" as Severity, pts: 5, msg: (n: number, thr: number) => `Contenu mince (${n} mots — vise ${thr}+)` },
  LOW_TEXT_RATIO: { sev: "warning" as Severity, pts: 5, msg: (n: number) => `Ratio texte/HTML faible (${n}% — vise 15%+)` },
  // Technical
  NO_VIEWPORT: { sev: "critical" as Severity, pts: 10, msg: "Balise viewport manquante (SEO mobile)" },
  NO_LANG: { sev: "warning" as Severity, pts: 5, msg: "Attribut lang absent sur <html>" },
  SLOW_RESPONSE: { sev: "warning" as Severity, pts: 5, msg: (n: number) => `Réponse lente (${n} ms — vise < 2 s)` },
};

function score(result: Omit<PageResult, "issues" | "score">): { issues: Issue[]; score: number } {
  const issues: Issue[] = [];
  let deduct = 0;

  function add(code: keyof typeof SCORE_WEIGHTS, ...args: number[]) {
    const w = SCORE_WEIGHTS[code];
    let message: string;
    if (typeof w.msg === "function") {
      message = (w.msg as (...n: number[]) => string)(...args);
    } else {
      message = w.msg as string;
    }
    issues.push({ severity: w.sev, code, message });
    deduct += w.pts;
  }

  if (result.httpStatus >= 400) { add("HTTP_ERROR", result.httpStatus); return { issues, score: Math.max(0, 100 - deduct) }; }

  // Technical
  if (!result.viewport) add("NO_VIEWPORT");
  if (!result.htmlLang) add("NO_LANG");
  if (result.responseTimeMs > 3000 && result.responseTimeMs > 0) add("SLOW_RESPONSE", result.responseTimeMs);

  // Title
  if (!result.title) add("TITLE_MISSING");
  else if (result.titleLength > 60) add("TITLE_TOO_LONG", result.titleLength);
  else if (result.titleLength < 30) add("TITLE_TOO_SHORT", result.titleLength);

  // Description
  if (!result.description) add("DESC_MISSING");
  else if (result.descriptionLength > 160) add("DESC_TOO_LONG", result.descriptionLength);
  else if (result.descriptionLength < 100) add("DESC_TOO_SHORT", result.descriptionLength);

  // Headings
  if (result.h1Count === 0) add("H1_MISSING");
  else if (result.h1Count > 1) add("H1_DUPLICATE", result.h1Count);

  const contentPagesH2: PageType[] = ["home", "blog", "location", "destination", "conciergerie"];
  if (result.h2Count === 0 && contentPagesH2.includes(result.pageType)) add("NO_H2");

  // Canonical
  if (!result.canonical) {
    if (result.pageType !== "home") add("NO_CANONICAL");
  } else {
    const canonNorm = result.canonical.replace(/\/$/, "");
    const urlNorm = result.url.replace(/\/$/, "");
    if (canonNorm !== urlNorm) add("WRONG_CANONICAL");
  }

  // Open Graph
  if (!result.ogTitle) add("NO_OG_TITLE");
  if (!result.ogDescription) add("NO_OG_DESC");
  if (!result.ogImage) add("NO_OG_IMAGE");

  // JSON-LD
  const importantTypes: PageType[] = ["home", "blog", "location", "destination", "conciergerie"];
  if (!result.hasJsonLd && importantTypes.includes(result.pageType)) add("NO_JSON_LD");

  // Images
  if (result.imagesWithoutAlt > 0) add("IMG_ALT", result.imagesWithoutAlt);

  // Content
  const thinThresholds: Record<PageType, number> = {
    blog: 500, home: 250, location: 300, destination: 300,
    conciergerie: 200, "blog-index": 100, static: 100,
  };
  const thr = thinThresholds[result.pageType] ?? 200;
  const contentTypes: PageType[] = ["home", "blog", "location", "destination", "conciergerie", "static"];
  if (result.wordCount < thr && contentTypes.includes(result.pageType)) {
    add("THIN_CONTENT", result.wordCount, thr);
  }

  if (result.textHtmlRatio < 10 && result.pageSizeKb > 20) add("LOW_TEXT_RATIO", result.textHtmlRatio);

  return { issues, score: Math.max(0, 100 - deduct) };
}

// ── Page fetch + analysis ──────────────────────────────────────

async function analyzePage(path: string, pageType: PageType): Promise<PageResult> {
  const url = `${SITE}${path}`;
  let html = "";
  let httpStatus = 200;
  const start = Date.now();

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "ERA-SEO-Audit/1.0" },
      signal: AbortSignal.timeout(12000),
      cache: "no-store",
    });
    httpStatus = res.status;
    if (res.ok) html = await res.text();
  } catch {
    httpStatus = 0;
  }

  const responseTimeMs = Date.now() - start;

  const title = getTitle(html);
  const description = getMeta(html, "description");
  const h1s = getHeadings(html, "h1");
  const h2s = getHeadings(html, "h2");
  const h3s = getHeadings(html, "h3");
  const canonical = getCanonical(html);
  const robotsMeta = getMeta(html, "robots");
  const ogTitle = getOg(html, "title");
  const ogDescription = getOg(html, "description");
  const ogImage = getOg(html, "image");
  const jsonLdTypes = getJsonLdTypes(html);
  const imgs = countImages(html);
  const links = countLinks(html);
  const wordCount = getWordCount(html);
  const viewport = getMeta(html, "viewport");
  const htmlLang = getHtmlLang(html);
  const pageSizeKb = Math.round(html.length / 1024);
  const textHtmlRatio = getTextHtmlRatio(html);

  const partial: Omit<PageResult, "issues" | "score"> = {
    path, url, pageType, httpStatus,
    title, titleLength: title?.length ?? 0,
    description, descriptionLength: description?.length ?? 0,
    h1: h1s[0] ?? null, h1Count: h1s.length,
    h2Count: h2s.length, h2Texts: h2s.slice(0, 6),
    h3Count: h3s.length,
    canonical, robotsMeta,
    ogTitle, ogDescription, ogImage,
    hasJsonLd: jsonLdTypes.length > 0, jsonLdTypes,
    imagesTotal: imgs.total, imagesWithoutAlt: imgs.withoutAlt,
    wordCount, internalLinks: links.internal, externalLinks: links.external,
    viewport, htmlLang,
    responseTimeMs, pageSizeKb, textHtmlRatio,
  };

  const { issues, score: pageScore } = score(partial);
  return { ...partial, issues, score: pageScore };
}

async function fetchPsi(url: string): Promise<PageResult["psi"] | undefined> {
  if (!PSI_KEY && !process.env.PSI_ALLOW_NO_KEY) return undefined;
  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance&category=seo&category=accessibility${PSI_KEY ? `&key=${PSI_KEY}` : ""}`;
    const res = await fetch(apiUrl, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) return undefined;
    const data = await res.json() as {
      lighthouseResult?: {
        categories?: Record<string, { score?: number }>;
        audits?: {
          "largest-contentful-paint"?: { numericValue?: number };
          "cumulative-layout-shift"?: { numericValue?: number };
        };
      };
    };
    const cats = data.lighthouseResult?.categories;
    const audits = data.lighthouseResult?.audits;
    return {
      performance: Math.round((cats?.["performance"]?.score ?? 0) * 100),
      seo: Math.round((cats?.["seo"]?.score ?? 0) * 100),
      accessibility: Math.round((cats?.["accessibility"]?.score ?? 0) * 100),
      lcp: audits?.["largest-contentful-paint"]?.numericValue
        ? Math.round((audits["largest-contentful-paint"].numericValue ?? 0) / 100) / 10
        : null,
      cls: audits?.["cumulative-layout-shift"]?.numericValue ?? null,
    };
  } catch {
    return undefined;
  }
}

// ── SSE handler ────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as { mode?: string };
  const mode = (body.mode === "full" ? "full" : "quick") as "quick" | "full";

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      function send(data: object) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      }

      try {
        // Check sitemap + robots
        const [sitemapRes, robotsRes] = await Promise.all([
          fetch(`${SITE}/sitemap.xml`, { cache: "no-store" }).catch(() => null),
          fetch(`${SITE}/robots.txt`, { cache: "no-store" }).catch(() => null),
        ]);
        send({
          type: "infra",
          sitemap: sitemapRes?.ok ?? false,
          robots: robotsRes?.ok ?? false,
          sitemapUrl: `${SITE}/sitemap.xml`,
          robotsUrl: `${SITE}/robots.txt`,
        });

        const pages = getPages(mode);
        send({ type: "total", count: pages.length });

        // Crawl in parallel batches of 6 — stream results live
        const allResults: PageResult[] = [];
        const BATCH = 6;
        for (let i = 0; i < pages.length; i += BATCH) {
          const batch = pages.slice(i, i + BATCH);
          const results = await Promise.all(batch.map((p) => analyzePage(p.path, p.pageType)));
          for (const r of results) {
            allResults.push(r);
            send({ type: "page", data: r });
          }
        }

        // Cross-page duplicate detection
        const titleMap = new Map<string, string[]>();
        const descMap = new Map<string, string[]>();
        for (const r of allResults) {
          if (r.title) {
            const arr = titleMap.get(r.title) ?? [];
            arr.push(r.path);
            titleMap.set(r.title, arr);
          }
          if (r.description) {
            const arr = descMap.get(r.description) ?? [];
            arr.push(r.path);
            descMap.set(r.description, arr);
          }
        }

        type Correction = { path: string; addIssues: Issue[]; scoreDelta: number };
        const corrections: Correction[] = [];
        for (const r of allResults) {
          const addIssues: Issue[] = [];
          let delta = 0;
          if (r.title && (titleMap.get(r.title) ?? []).length > 1) {
            addIssues.push({ severity: "critical", code: "TITLE_DUPLICATE", message: SCORE_WEIGHTS.TITLE_DUPLICATE.msg as string });
            delta -= SCORE_WEIGHTS.TITLE_DUPLICATE.pts;
          }
          if (r.description && (descMap.get(r.description) ?? []).length > 1) {
            addIssues.push({ severity: "warning", code: "DESC_DUPLICATE", message: SCORE_WEIGHTS.DESC_DUPLICATE.msg as string });
            delta -= SCORE_WEIGHTS.DESC_DUPLICATE.pts;
          }
          if (addIssues.length > 0) corrections.push({ path: r.path, addIssues, scoreDelta: delta });
        }
        if (corrections.length > 0) send({ type: "corrections", data: corrections });

        // PageSpeed for homepage + first blog post (if key is set)
        if (PSI_KEY || process.env.PSI_ALLOW_NO_KEY) {
          const psiTargets = ["/", blogPosts[0] ? `/blog/${blogPosts[0].slug}` : null].filter(Boolean) as string[];
          for (const path of psiTargets) {
            const psi = await fetchPsi(`${SITE}${path}`);
            if (psi) send({ type: "psi", path, data: psi });
          }
        }

        send({ type: "done" });
      } catch (err) {
        send({ type: "error", message: err instanceof Error ? err.message : "Erreur inconnue" });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
