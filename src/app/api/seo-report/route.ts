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

/** Returns main/article content or full page minus nav/header/footer/aside */
function contentZone(html: string): string {
  return (
    html.match(/<(?:main|article)[^>]*>([\s\S]*?)<\/(?:main|article)>/i)?.[1] ??
    html.replace(/<(?:nav|header|footer|aside)[^>]*>[\s\S]*?<\/(?:nav|header|footer|aside)>/gi, "")
  );
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
  const m =
    html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ??
    html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  return m ? m[1].trim() : null;
}

function getHeadings(html: string, tag: "h1" | "h2"): string[] {
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
  const zone = contentZone(html);
  const re = /<img([^>]*)>/gi;
  let total = 0;
  let withoutAlt = 0;
  let m;
  while ((m = re.exec(zone)) !== null) {
    total++;
    const attrs = m[1];
    const hasAlt = /alt=["'][^"']*["']/i.test(attrs);
    const emptyAlt = /alt=["']\s*["']/i.test(attrs);
    if (!hasAlt || emptyAlt) withoutAlt++;
  }
  return { total, withoutAlt };
}

function countLinks(html: string): { internal: number; external: number } {
  const zone = contentZone(html);
  const re = /<a[^>]+href=["']([^"']+)["']/gi;
  let internal = 0;
  let external = 0;
  let m;
  while ((m = re.exec(zone)) !== null) {
    const href = m[1];
    if (href.startsWith("http") && !href.includes(SITE.replace(/https?:\/\//, ""))) external++;
    else if (!href.startsWith("mailto:") && !href.startsWith("tel:") && !href.startsWith("#")) internal++;
  }
  return { internal, external };
}

function getWordCount(html: string): number {
  const main = html.match(/<(?:main|article)[^>]*>([\s\S]*?)<\/(?:main|article)>/i)?.[1] ?? html;
  const text = main
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.split(/\s+/).filter((w) => w.length > 1).length;
}

// ── Scoring ────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SW: Record<string, { sev: Severity; pts: number; msg: string | ((...a: any[]) => string) }> = {
  // Critical — erreurs bloquantes
  HTTP_ERROR:            { sev: "critical", pts: 50, msg: (s: number) => `Erreur HTTP ${s}` },
  TITLE_MISSING:         { sev: "critical", pts: 25, msg: "Balise <title> manquante" },
  TITLE_DUPLICATE:       { sev: "critical", pts: 15, msg: "Titre identique à une autre page (contenu dupliqué)" },
  DESC_MISSING:          { sev: "critical", pts: 20, msg: "Meta description manquante" },
  H1_MISSING:            { sev: "critical", pts: 20, msg: "H1 manquant" },
  CANONICAL_MISMATCH:    { sev: "critical", pts: 15, msg: (url: string) => `Canonical incorrect → ${url}` },
  // Warnings majeurs
  H1_DUPLICATE:          { sev: "warning",  pts: 12, msg: (n: number) => `${n} balises H1 présentes (doit être unique)` },
  DESC_DUPLICATE:        { sev: "warning",  pts: 10, msg: "Meta description identique à une autre page" },
  THIN_CONTENT:          { sev: "warning",  pts: 10, msg: (n: number, min: number) => `Contenu mince (${n} mots — vise ${min}+)` },
  NO_H2:                 { sev: "warning",  pts: 8,  msg: "Aucune balise H2 (structure de contenu manquante)" },
  NO_OG_IMAGE:           { sev: "warning",  pts: 8,  msg: "og:image manquant" },
  NO_JSON_LD:            { sev: "warning",  pts: 8,  msg: "Données structurées JSON-LD manquantes" },
  TITLE_TOO_LONG_SEVERE: { sev: "warning",  pts: 8,  msg: (n: number) => `Titre très long (${n} car. — recommandé ≤ 70)` },
  // Warnings modérés
  H1_TITLE_MISMATCH:     { sev: "warning",  pts: 5,  msg: "H1 et titre sans mot-clé commun" },
  NO_INTERNAL_LINKS:     { sev: "warning",  pts: 5,  msg: "Aucun lien interne dans le contenu (page isolée)" },
  TITLE_TOO_SHORT:       { sev: "warning",  pts: 5,  msg: (n: number) => `Titre trop court (${n} car. — idéal 45-70)` },
  TITLE_TOO_LONG:        { sev: "warning",  pts: 5,  msg: (n: number) => `Titre trop long (${n} car. — recommandé ≤ 70)` },
  NO_CANONICAL:          { sev: "warning",  pts: 5,  msg: "Lien canonical manquant" },
  DESC_TOO_LONG:         { sev: "warning",  pts: 5,  msg: (n: number) => `Meta description trop longue (${n} car. — max 160)` },
  DESC_TOO_SHORT:        { sev: "warning",  pts: 5,  msg: (n: number) => `Meta description trop courte (${n} car. — idéal 120-160)` },
  // Warnings mineurs
  NO_OG_TITLE:           { sev: "warning",  pts: 4,  msg: "og:title manquant" },
  NO_OG_DESC:            { sev: "warning",  pts: 3,  msg: "og:description manquant" },
  IMG_ALT:               { sev: "warning",  pts: 3,  msg: (n: number) => `${n} image${n > 1 ? "s" : ""} sans attribut alt` },
};

const THIN_MIN: Partial<Record<PageType, number>> = {
  blog: 400,
  home: 350,
  conciergerie: 300,
  location: 150,
  destination: 150,
};

const STOP_WORDS = new Set(["de", "du", "des", "le", "la", "les", "un", "une", "et", "en", "sur", "pour", "par", "avec", "dans", "au", "aux", "qui", "que", "son", "ses", "notre", "nos"]);

function keywords(text: string): Set<string> {
  return new Set(text.toLowerCase().split(/\W+/).filter((w) => w.length > 3 && !STOP_WORDS.has(w)));
}

function score(result: Omit<PageResult, "issues" | "score">): { issues: Issue[]; score: number } {
  const issues: Issue[] = [];
  let deduct = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function add(code: string, ...args: any[]) {
    const w = SW[code];
    if (!w) return;
    const msg = typeof w.msg === "function" ? w.msg(...args) : w.msg;
    issues.push({ severity: w.sev, code, message: msg });
    deduct += w.pts;
  }

  if (result.httpStatus >= 400) {
    add("HTTP_ERROR", result.httpStatus);
    return { issues, score: Math.max(0, 100 - deduct) };
  }

  // ── Title ──────────────────────────────────────────────────
  if (!result.title) {
    add("TITLE_MISSING");
  } else if (result.titleLength > 80) {
    add("TITLE_TOO_LONG_SEVERE", result.titleLength);
  } else if (result.titleLength > 70) {
    add("TITLE_TOO_LONG", result.titleLength);
  } else if (result.titleLength < 30) {
    add("TITLE_TOO_SHORT", result.titleLength);
  }

  // ── Description ───────────────────────────────────────────
  if (!result.description) {
    add("DESC_MISSING");
  } else if (result.descriptionLength > 160) {
    add("DESC_TOO_LONG", result.descriptionLength);
  } else if (result.descriptionLength < 120) {
    add("DESC_TOO_SHORT", result.descriptionLength);
  }

  // ── H1 ────────────────────────────────────────────────────
  if (result.h1Count === 0) {
    add("H1_MISSING");
  } else if (result.h1Count > 1) {
    add("H1_DUPLICATE", result.h1Count);
  }

  // ── H1 ↔ Title keyword coherence ──────────────────────────
  if (result.title && result.h1) {
    const titleKw = keywords(result.title);
    const h1Kw = keywords(result.h1);
    if (titleKw.size > 0 && h1Kw.size > 0 && ![...h1Kw].some((w) => titleKw.has(w))) {
      add("H1_TITLE_MISMATCH");
    }
  }

  // ── H2 structure ──────────────────────────────────────────
  const needsH2: PageType[] = ["home", "blog", "location", "destination", "conciergerie"];
  if (result.h2Count === 0 && needsH2.includes(result.pageType)) {
    add("NO_H2");
  }

  // ── Canonical ─────────────────────────────────────────────
  if (result.canonical) {
    const canonPath = result.canonical.replace(/^https?:\/\/(www\.)?[^/]+/, "").replace(/\/$/, "") || "/";
    const expectedPath = result.path.replace(/\/$/, "") || "/";
    if (canonPath !== expectedPath) add("CANONICAL_MISMATCH", result.canonical);
  } else if (result.pageType !== "home") {
    add("NO_CANONICAL");
  }

  // ── Open Graph ────────────────────────────────────────────
  if (!result.ogTitle) add("NO_OG_TITLE");
  if (!result.ogDescription) add("NO_OG_DESC");
  if (!result.ogImage) add("NO_OG_IMAGE");

  // ── JSON-LD ───────────────────────────────────────────────
  const needsJsonLd: PageType[] = ["home", "blog", "location", "destination", "conciergerie"];
  if (!result.hasJsonLd && needsJsonLd.includes(result.pageType)) add("NO_JSON_LD");

  // ── Images (content zone) ─────────────────────────────────
  if (result.imagesWithoutAlt > 0) add("IMG_ALT", result.imagesWithoutAlt);

  // ── Internal links (content zone) ─────────────────────────
  const needsLinks: PageType[] = ["blog", "location", "destination", "conciergerie"];
  if (result.internalLinks === 0 && needsLinks.includes(result.pageType)) {
    add("NO_INTERNAL_LINKS");
  }

  // ── Thin content (by page type) ───────────────────────────
  const minWords = THIN_MIN[result.pageType] ?? 0;
  if (minWords > 0 && result.wordCount < minWords) {
    add("THIN_CONTENT", result.wordCount, minWords);
  }

  return { issues, score: Math.max(0, 100 - deduct) };
}

// ── Cross-page analysis (duplicate titles / descriptions) ──────

function crossPageCorrections(
  results: PageResult[]
): Record<string, { issues: Issue[]; score: number }> {
  const titleCount = new Map<string, number>();
  const descCount = new Map<string, number>();

  for (const r of results) {
    if (r.httpStatus < 400) {
      if (r.title) titleCount.set(r.title.toLowerCase(), (titleCount.get(r.title.toLowerCase()) ?? 0) + 1);
      if (r.description) descCount.set(r.description.toLowerCase(), (descCount.get(r.description.toLowerCase()) ?? 0) + 1);
    }
  }

  const corrections: Record<string, { issues: Issue[]; score: number }> = {};

  for (const r of results) {
    const extra: Issue[] = [];
    let extraDeduct = 0;

    if (r.title && (titleCount.get(r.title.toLowerCase()) ?? 0) > 1) {
      const w = SW.TITLE_DUPLICATE;
      extra.push({ severity: w.sev, code: "TITLE_DUPLICATE", message: w.msg as string });
      extraDeduct += w.pts;
    }
    if (r.description && (descCount.get(r.description.toLowerCase()) ?? 0) > 1) {
      const w = SW.DESC_DUPLICATE;
      extra.push({ severity: w.sev, code: "DESC_DUPLICATE", message: w.msg as string });
      extraDeduct += w.pts;
    }

    if (extra.length > 0) {
      corrections[r.path] = {
        issues: [...r.issues, ...extra],
        score: Math.max(0, r.score - extraDeduct),
      };
    }
  }

  return corrections;
}

// ── Page fetch + analysis ──────────────────────────────────────

async function analyzePage(path: string, pageType: PageType): Promise<PageResult> {
  const url = `${SITE}${path}`;
  let html = "";
  let httpStatus = 200;

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

  const title = getTitle(html);
  const description = getMeta(html, "description");
  const h1s = getHeadings(html, "h1");
  const h2s = getHeadings(html, "h2");
  const canonical = getCanonical(html);
  const robotsMeta = getMeta(html, "robots");
  const ogTitle = getOg(html, "title");
  const ogDescription = getOg(html, "description");
  const ogImage = getOg(html, "image");
  const jsonLdTypes = getJsonLdTypes(html);
  const imgs = countImages(html);
  const links = countLinks(html);
  const wordCount = getWordCount(html);

  const partial: Omit<PageResult, "issues" | "score"> = {
    path, url, pageType, httpStatus,
    title, titleLength: title?.length ?? 0,
    description, descriptionLength: description?.length ?? 0,
    h1: h1s[0] ?? null, h1Count: h1s.length,
    h2Count: h2s.length, h2Texts: h2s.slice(0, 6),
    canonical, robotsMeta,
    ogTitle, ogDescription, ogImage,
    hasJsonLd: jsonLdTypes.length > 0, jsonLdTypes,
    imagesTotal: imgs.total, imagesWithoutAlt: imgs.withoutAlt,
    wordCount, internalLinks: links.internal, externalLinks: links.external,
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
        // Infrastructure check
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

        // Phase 1 — crawl (stream individual page results for real-time UX)
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

        // Phase 2 — cross-page analysis (duplicate titles/descriptions)
        const corrections = crossPageCorrections(allResults);
        if (Object.keys(corrections).length > 0) {
          send({ type: "corrections", corrections });
        }

        // PageSpeed for homepage + first blog post
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
