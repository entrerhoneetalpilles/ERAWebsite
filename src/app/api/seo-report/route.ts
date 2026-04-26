import { NextRequest } from "next/server";
import { blogPosts, communes, propertyTypes } from "@/lib/data";

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
  internalLinkPaths: string[];
  viewport: string | null;
  htmlLang: string | null;
  responseTimeMs: number;
  pageSizeKb: number;
  textHtmlRatio: number;
  twitterCard: string | null;
  twitterTitle: string | null;
  twitterImage: string | null;
  twitterImageWidth: string | null;
  twitterImageHeight: string | null;
  schemaIssues: SchemaIssue[];
  redirectChain: string[];
  bodyText: string;
  issues: Issue[];
  score: number;
  psi?: { performance: number; seo: number; accessibility: number; lcp: number | null; cls: number | null };
}

export interface SchemaIssue { type: string; missingProp: string; }
export interface DuplicateGroup { similarity: number; paths: string[]; }
export interface RedirectChain { path: string; chain: string[]; finalUrl: string; chainLength: number; }
export interface SecurityHeaders { hsts: string | null; csp: string | null; xFrameOptions: string | null; xContentTypeOptions: string | null; referrerPolicy: string | null; score: number; }
export interface CoverageInfo { sitemapPaths: string[]; crawledPaths: string[]; onlyInSitemap: string[]; onlyInCrawl: string[]; inBoth: number; }
export interface CrawlGraphNode { path: string; outbound: string[]; inbound: string[]; depth: number; isOrphan: boolean; }

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

  const sousTypePages: Array<{ path: string; pageType: PageType }> = communes.flatMap((c) =>
    c.propertyTypes.map((type) => ({ path: `/locations/${c.slug}/${type}`, pageType: "location" as PageType }))
  );

  const avecPiscinePages: Array<{ path: string; pageType: PageType }> = communes
    .filter((c) => c.circle <= 2)
    .map((c) => ({ path: `/locations/avec-piscine/${c.slug}`, pageType: "location" as PageType }));

  // Type aggregator pages (/locations/mas, /locations/villa, …) — these link to
  // sousTypePages, so they must be crawled for orphan detection to work correctly.
  // /locations/avec-piscine is also a propertyType slug and handled by its own page.
  const typeAggregatorPages: Array<{ path: string; pageType: PageType }> = propertyTypes.map((pt) => ({
    path: `/locations/${pt.slug}`,
    pageType: "location" as PageType,
  }));

  return [...statics, ...blogs, ...communePages, ...typeAggregatorPages, ...sousTypePages, ...avecPiscinePages];
}

// ── HTML helpers ───────────────────────────────────────────────

function dHtml(s: string) {
  return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&apos;/g, "'");
}

/** Returns content inside <main> tag, or full page minus nav/header/footer/aside */
function contentZone(html: string): string {
  // Match <main> only — using <article> as alternative stops at the first </article>
  // inside <main>, missing everything after (commune grids, blog lists, etc.)
  const mainMatch = html.match(/<main[^>]*>([\s\S]*)<\/main>/i);
  if (mainMatch) return mainMatch[1];
  return html.replace(/<(?:nav|header|footer|aside)[^>]*>[\s\S]*?<\/(?:nav|header|footer|aside)>/gi, "");
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
      // Handle @graph pattern (array of typed nodes)
      if (Array.isArray(obj["@graph"])) {
        for (const node of obj["@graph"]) {
          const t = node["@type"] ?? node.type;
          if (t) types.push(Array.isArray(t) ? t.join(", ") : String(t));
        }
      } else {
        const t = obj["@type"] ?? obj.type;
        if (t) types.push(Array.isArray(t) ? t.join(", ") : String(t));
      }
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

function countLinks(html: string): { internal: number; external: number; internalPaths: string[] } {
  const zone = contentZone(html);
  const re = /<a[^>]+href=["']([^"']+)["']/gi;
  let internal = 0;
  let external = 0;
  const internalPaths: string[] = [];
  const siteHost = (() => { try { return new URL(SITE).hostname; } catch { return ""; } })();
  let m;
  while ((m = re.exec(zone)) !== null) {
    const href = m[1];
    if (href.startsWith("http")) {
      try {
        const u = new URL(href);
        if (u.hostname !== siteHost) {
          external++;
        } else {
          internal++;
          internalPaths.push((u.pathname.split("?")[0].split("#")[0]) || "/");
        }
      } catch { external++; }
    } else if (!href.startsWith("mailto:") && !href.startsWith("tel:") && !href.startsWith("#")) {
      internal++;
      internalPaths.push(href.split("?")[0].split("#")[0] || "/");
    }
  }
  return { internal, external, internalPaths };
}

function getWordCount(html: string): number {
  const mainMatch = html.match(/<main[^>]*>([\s\S]*)<\/main>/i);
  const main = mainMatch ? mainMatch[1] : html;
  const text = main
    .replace(/<script[\s\S]*?<\/script>/gi, "")
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

// ── Feature AAA helpers ────────────────────────────────────────

function getTwitterCard(html: string): { card: string | null; title: string | null; image: string | null; imageWidth: string | null; imageHeight: string | null } {
  function tw(name: string): string | null {
    const pats = [
      new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*?)["']`, "i"),
      new RegExp(`<meta[^>]+content=["']([^"']*?)["'][^>]+name=["']${name}["']`, "i"),
    ];
    for (const re of pats) { const m = html.match(re); if (m) return m[1].trim(); }
    return null;
  }
  return { card: tw("twitter:card"), title: tw("twitter:title"), image: tw("twitter:image"), imageWidth: tw("twitter:image:width"), imageHeight: tw("twitter:image:height") };
}

const SCHEMA_REQUIRED: Record<string, string[]> = {
  Article: ["headline", "datePublished", "author"],
  BlogPosting: ["headline", "datePublished", "author"],
  Organization: ["name", "url"],
  LocalBusiness: ["name", "address", "telephone"],
  BreadcrumbList: ["itemListElement"],
  FAQPage: ["mainEntity"],
  WebSite: ["name", "url"],
  LodgingBusiness: ["name", "address"],
  TouristDestination: ["name"],
};

function validateSchemaRequired(html: string): SchemaIssue[] {
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const issues: SchemaIssue[] = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      const obj = JSON.parse(m[1]);
      const items = Array.isArray(obj["@graph"]) ? obj["@graph"] : [obj];
      for (const item of items) {
        const type = item["@type"] as string;
        if (!type) continue;
        const required = SCHEMA_REQUIRED[type] ?? [];
        for (const prop of required) {
          if (!item[prop]) issues.push({ type, missingProp: prop });
        }
      }
    } catch { /* skip invalid JSON */ }
  }
  return issues;
}

async function fetchWithRedirects(url: string): Promise<{ html: string; httpStatus: number; chain: string[]; finalUrl: string; headers: Record<string, string> }> {
  const chain: string[] = [];
  let current = url;
  let httpStatus = 0;
  let html = "";
  let headers: Record<string, string> = {};
  for (let i = 0; i < 5; i++) {
    try {
      const res = await fetch(current, { redirect: "manual", headers: { "User-Agent": "ERA-SEO-Audit/1.0" }, signal: AbortSignal.timeout(12000), cache: "no-store" });
      httpStatus = res.status;
      headers = Object.fromEntries(res.headers.entries());
      if (res.status >= 300 && res.status < 400) {
        const loc = res.headers.get("location");
        if (!loc) break;
        chain.push(current);
        current = loc.startsWith("http") ? loc : new URL(loc, current).href;
      } else {
        if (res.ok) html = await res.text();
        break;
      }
    } catch { break; }
  }
  return { html, httpStatus, chain, finalUrl: current, headers };
}

function analyzeSecurityHeaders(headers: Record<string, string>): SecurityHeaders {
  const hsts = headers["strict-transport-security"] ?? null;
  const csp = headers["content-security-policy"] ?? null;
  const xFrameOptions = headers["x-frame-options"] ?? null;
  const xContentTypeOptions = headers["x-content-type-options"] ?? null;
  const referrerPolicy = headers["referrer-policy"] ?? null;
  let score = 0;
  if (hsts) score += 25;
  if (csp) score += 25;
  if (xFrameOptions) score += 20;
  if (xContentTypeOptions) score += 15;
  if (referrerPolicy) score += 15;
  return { hsts, csp, xFrameOptions, xContentTypeOptions, referrerPolicy, score };
}

async function getSitemapPaths(site: string): Promise<string[]> {
  try {
    const res = await fetch(`${site}/sitemap.xml`, { cache: "no-store", signal: AbortSignal.timeout(10000) });
    if (!res.ok) return [];
    const xml = await res.text();
    const re = /<loc>([\s\S]*?)<\/loc>/gi;
    const paths: string[] = [];
    let m;
    while ((m = re.exec(xml)) !== null) {
      const u = m[1].trim();
      if (u.endsWith(".xml")) continue;
      try { paths.push(new URL(u).pathname.replace(/\/$/, "") || "/"); } catch { /* skip */ }
    }
    return [...new Set(paths)];
  } catch { return []; }
}

const DUP_STOPWORDS = new Set(["le","la","les","de","du","des","un","une","et","en","au","aux","par","pour","sur","dans","avec","son","ses","notre","nos","qui","que","est","sont","pas","plus","cette","ces","nous","vous","ils","elles","tout","tous"]);

function textToFreq(text: string): Map<string, number> {
  const freq = new Map<string, number>();
  for (const w of (text.toLowerCase().match(/\b[a-zàâäéèêëîïôùûüç]{3,}\b/g) ?? [])) {
    if (!DUP_STOPWORDS.has(w)) freq.set(w, (freq.get(w) ?? 0) + 1);
  }
  return freq;
}

function cosineSim(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0, na = 0, nb = 0;
  for (const [w, va] of a) { const vb = b.get(w) ?? 0; dot += va * vb; na += va * va; }
  for (const vb of b.values()) nb += vb * vb;
  const d = Math.sqrt(na) * Math.sqrt(nb);
  return d === 0 ? 0 : dot / d;
}

function detectBodyDuplicates(pages: { path: string; text: string }[]): DuplicateGroup[] {
  const vecs = pages.map((p) => ({ path: p.path, vec: textToFreq(p.text) }));
  const groups: DuplicateGroup[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < vecs.length; i++) {
    if (seen.has(vecs[i].path) || vecs[i].vec.size < 30) continue;
    const group: string[] = [vecs[i].path];
    let maxSim = 0;
    for (let j = i + 1; j < vecs.length; j++) {
      if (seen.has(vecs[j].path) || vecs[j].vec.size < 30) continue;
      const sim = cosineSim(vecs[i].vec, vecs[j].vec);
      if (sim >= 0.80) { group.push(vecs[j].path); seen.add(vecs[j].path); maxSim = Math.max(maxSim, sim); }
    }
    if (group.length > 1) { groups.push({ similarity: Math.round(maxSim * 100) / 100, paths: group }); seen.add(vecs[i].path); }
  }
  return groups;
}

function buildCrawlGraph(results: PageResult[], depths: Record<string, number>, orphans: string[]): CrawlGraphNode[] {
  const orphanSet = new Set(orphans);
  const inbound = new Map<string, string[]>();
  for (const page of results) {
    for (const lp of page.internalLinkPaths) {
      const clean = lp.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
      const arr = inbound.get(clean) ?? [];
      if (!arr.includes(page.path)) arr.push(page.path);
      inbound.set(clean, arr);
    }
  }
  return results.map((page) => ({
    path: page.path,
    outbound: [...new Set(page.internalLinkPaths.map((lp) => lp.split("?")[0].split("#")[0].replace(/\/$/, "") || "/"))],
    inbound: inbound.get(page.path) ?? [],
    depth: depths[page.path] ?? -1,
    isOrphan: orphanSet.has(page.path),
  }));
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
  NO_VIEWPORT:           { sev: "critical", pts: 10, msg: "Balise viewport manquante (SEO mobile)" },
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
  NO_LANG:               { sev: "warning",  pts: 5,  msg: "Attribut lang absent sur <html>" },
  LOW_TEXT_RATIO:        { sev: "warning",  pts: 5,  msg: (n: number) => `Ratio texte/HTML faible (${n}% — vise 15%+)` },
  SLOW_RESPONSE:         { sev: "warning",  pts: 5,  msg: (n: number) => `Réponse lente (${n} ms — vise < 2 s)` },
  // Warnings mineurs
  NO_OG_TITLE:           { sev: "warning",  pts: 4,  msg: "og:title manquant" },
  NO_OG_DESC:            { sev: "warning",  pts: 3,  msg: "og:description manquant" },
  IMG_ALT:               { sev: "warning",  pts: 3,  msg: (n: number) => `${n} image${n > 1 ? "s" : ""} sans attribut alt` },
  DUPLICATE_JSON_LD:     { sev: "critical", pts: 15, msg: (types: string) => `Schema JSON-LD en double : ${types}` },
  JSON_LD_WRONG_TYPE:    { sev: "warning",  pts: 8,  msg: (got: string, expected: string) => `JSON-LD type incorrect pour cette page (${got} → attendu ${expected})` },
  COMMUNE_NOT_IN_TITLE:  { sev: "warning",  pts: 6,  msg: (slug: string) => `Commune "${slug}" absente du titre (SEO local faible)` },
  NO_PSI:                { sev: "info",     pts: 0,  msg: "PageSpeed Insights non disponible pour cette page" },
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

  // ── Technical ─────────────────────────────────────────────
  if (!result.viewport) add("NO_VIEWPORT");
  if (!result.htmlLang) add("NO_LANG");
  if (result.responseTimeMs > 3000 && result.responseTimeMs > 0) add("SLOW_RESPONSE", result.responseTimeMs);

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

  // ── Duplicate JSON-LD types ───────────────────────────────
  const typeCounts = new Map<string, number>();
  for (const t of result.jsonLdTypes) typeCounts.set(t, (typeCounts.get(t) ?? 0) + 1);
  const dupTypes = [...typeCounts.entries()].filter(([, c]) => c > 1).map(([t]) => t);
  if (dupTypes.length > 0) add("DUPLICATE_JSON_LD", dupTypes.join(", "));

  // ── JSON-LD type coherence per page type ──────────────────
  const expectedTypes: Partial<Record<PageType, string[]>> = {
    home: ["WebSite", "LocalBusiness"],
    blog: ["Article"],
    conciergerie: ["LocalBusiness", "ProfessionalService", "Service"],
    location: ["LodgingBusiness", "Accommodation", "Hotel", "ItemList"],
    destination: ["TouristDestination", "City", "Place", "TouristAttraction"],
  };
  if (result.hasJsonLd && expectedTypes[result.pageType]) {
    const expected = expectedTypes[result.pageType]!;
    const hasExpected = result.jsonLdTypes.some((t) => expected.some((e) => t.includes(e)));
    if (!hasExpected) {
      add("JSON_LD_WRONG_TYPE", result.jsonLdTypes.join(", "), expected.join("/"));
    }
  }

  // ── Commune name in title ─────────────────────────────────
  const communePageTypes: PageType[] = ["conciergerie", "location", "destination"];
  if (communePageTypes.includes(result.pageType) && result.title) {
    const pathParts = result.path.split("/").filter(Boolean);
    const LOCATION_TYPES = new Set(["mas", "villa", "bastide", "gite", "appartement", "maison-village"]);
    const lastPart = pathParts[pathParts.length - 1];
    const communeIdx = LOCATION_TYPES.has(lastPart) ? pathParts.length - 2 : pathParts.length - 1;
    const communeSlug = pathParts.length >= 2 ? pathParts[communeIdx] : null;
    // Skip type aggregator pages like /locations/mas where the parent segment is "locations"
    if (communeSlug && communeSlug !== "locations" && communeSlug !== "avec-piscine") {
      // Normalize accents so "chateaurenard" matches "Châteaurenard", "eygalieres" matches "Eygalières", etc.
      const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
      const communeNorm = norm(communeSlug.replace(/-/g, " "));
      const titleNorm = norm(result.title);
      const communeParts = communeNorm.split(" ").filter((p) => p.length > 3);
      const communeInTitle = communeParts.length > 0 && communeParts.some((p) => titleNorm.includes(p));
      if (!communeInTitle && communeParts.length > 0) {
        add("COMMUNE_NOT_IN_TITLE", communeSlug);
      }
    }
  }

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

  // ── Text/HTML ratio ───────────────────────────────────────
  if (result.textHtmlRatio < 10 && result.pageSizeKb > 20) add("LOW_TEXT_RATIO", result.textHtmlRatio);

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
  const start = Date.now();

  const { html, httpStatus, chain: redirectChain } = await fetchWithRedirects(url);

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
  const tw = getTwitterCard(html);
  const schemaIssues = validateSchemaRequired(html);
  const bodyText = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 8000);

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
    wordCount, internalLinks: links.internal, externalLinks: links.external, internalLinkPaths: links.internalPaths,
    viewport, htmlLang,
    responseTimeMs, pageSizeKb, textHtmlRatio,
    twitterCard: tw.card, twitterTitle: tw.title, twitterImage: tw.image,
    twitterImageWidth: tw.imageWidth, twitterImageHeight: tw.imageHeight,
    schemaIssues, redirectChain, bodyText,
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

// ── Cross-page cannibalization ─────────────────────────────────

interface CannibalizationPair { pathA: string; pathB: string; shared: string[]; overlap: number; }

function crossPageCannibalization(results: PageResult[]): CannibalizationPair[] {
  const pairs: CannibalizationPair[] = [];
  // Generic site-wide words present in almost every title — not indicative of cannibalization
  const STOP = new Set(["de","du","des","le","la","les","un","une","et","en","sur","pour","par","avec","dans","au","aux","qui","que","son","ses","location","provence","alpilles","entre","rhone","gestion","locative","proven","locations"]);
  function kw(text: string): string[] {
    return [...new Set(text.toLowerCase().split(/\W+/).filter(w => w.length > 3 && !STOP.has(w)))];
  }
  for (let i = 0; i < results.length; i++) {
    for (let j = i + 1; j < results.length; j++) {
      const a = results[i]; const b = results[j];
      if (!a.title || !b.title) continue;
      // Skip sibling pages (same parent path = same commune, different property type — not true cannibalization)
      const parentA = a.path.split("/").slice(0, -1).join("/");
      const parentB = b.path.split("/").slice(0, -1).join("/");
      if (parentA === parentB && parentA !== "") continue;
      const kwA = kw(a.title); const kwB = new Set(kw(b.title));
      const shared = kwA.filter(w => kwB.has(w));
      const overlap = shared.length / Math.min(kwA.length, kwB.size);
      if (overlap > 0.6 && shared.length >= 3) pairs.push({ pathA: a.path, pathB: b.path, shared, overlap });
    }
  }
  return pairs.sort((a,b) => b.overlap - a.overlap).slice(0, 20);
}

// ── Orphan pages detection ─────────────────────────────────────

function detectOrphans(results: PageResult[], crawledPaths: Set<string>): string[] {
  void crawledPaths; // used for filtering (parameter kept for API clarity)
  const linked = new Set<string>();
  for (const page of results) {
    for (const lp of page.internalLinkPaths) {
      const clean = lp.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
      linked.add(clean);
    }
  }
  linked.add("/"); // homepage is never an orphan
  return results
    .filter(p => p.httpStatus === 200 && !linked.has(p.path.replace(/\/$/, "") || "/"))
    .map(p => p.path);
}

// ── Crawl depth calculation ────────────────────────────────────

function calcCrawlDepths(results: PageResult[]): Record<string, number> {
  const depths: Record<string, number> = { "/": 0 };
  const queue: string[] = ["/"];
  const pageMap = new Map(results.map(p => [p.path, p]));
  while (queue.length > 0) {
    const current = queue.shift()!;
    const page = pageMap.get(current);
    if (!page) continue;
    const currentDepth = depths[current] ?? 0;
    for (const lp of page.internalLinkPaths) {
      const clean = lp.split("?")[0].split("#")[0].replace(/\/$/,"") || "/";
      if (depths[clean] === undefined) {
        depths[clean] = currentDepth + 1;
        queue.push(clean);
      }
    }
  }
  return depths;
}

// ── Broken internal links detection ───────────────────────────

async function detectBrokenLinks(
  results: PageResult[],
  site: string
): Promise<Array<{ path: string; httpStatus: number; sources: string[] }>> {
  // collect unique internal paths and their sources
  const linkSources = new Map<string, string[]>();
  for (const page of results) {
    for (const lp of page.internalLinkPaths) {
      const clean = lp.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
      if (!clean.startsWith("/") || clean === page.path) continue;
      const existing = linkSources.get(clean) ?? [];
      if (!existing.includes(page.path)) existing.push(page.path);
      linkSources.set(clean, existing);
    }
  }
  // only check paths not already crawled or known-good
  const crawledOk = new Set(results.filter(p => p.httpStatus === 200).map(p => p.path));
  const toCheck = [...linkSources.keys()].filter(p => !crawledOk.has(p));

  const broken: Array<{ path: string; httpStatus: number; sources: string[] }> = [];
  const BATCH = 8;
  for (let i = 0; i < toCheck.length; i += BATCH) {
    const batch = toCheck.slice(i, i + BATCH);
    const checks = await Promise.all(batch.map(async (p) => {
      try {
        const res = await fetch(`${site}${p}`, { method: "HEAD", signal: AbortSignal.timeout(8000), cache: "no-store" });
        return { path: p, httpStatus: res.status, sources: linkSources.get(p) ?? [] };
      } catch {
        return { path: p, httpStatus: 0, sources: linkSources.get(p) ?? [] };
      }
    }));
    for (const c of checks) {
      if (c.httpStatus === 404 || c.httpStatus === 0) broken.push(c);
    }
  }
  return broken;
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

        // Phase 3 — cannibalization
        const cannibalization = crossPageCannibalization(allResults);
        if (cannibalization.length > 0) send({ type: "cannibalization", pairs: cannibalization });

        // Phase 4 — crawl depths + orphans
        const depths = calcCrawlDepths(allResults);
        send({ type: "depths", depths });
        const orphans = detectOrphans(allResults, new Set(allResults.map(p => p.path)));
        if (orphans.length > 0) send({ type: "orphans", paths: orphans });

        // Phase 5 — broken internal links
        const brokenLinks = await detectBrokenLinks(allResults, SITE);
        if (brokenLinks.length > 0) send({ type: "broken_links", links: brokenLinks });

        // Phase 6 — redirect chains
        const redirectChains: RedirectChain[] = allResults
          .filter((p) => p.redirectChain.length > 0)
          .map((p) => ({ path: p.path, chain: p.redirectChain, finalUrl: p.url, chainLength: p.redirectChain.length }));
        if (redirectChains.length > 0) send({ type: "redirect_chains", chains: redirectChains });

        // Phase 7 — security headers (from homepage)
        const homepageFetch = await fetchWithRedirects(`${SITE}/`);
        const secHeaders = analyzeSecurityHeaders(homepageFetch.headers);
        send({ type: "security_headers", headers: secHeaders });

        // Phase 8 — sitemap coverage diff
        const sitemapPaths = await getSitemapPaths(SITE);
        if (sitemapPaths.length > 0) {
          const crawledSet = new Set(allResults.map((p) => p.path));
          const sitemapSet = new Set(sitemapPaths);
          const coverageDiff: CoverageInfo = {
            sitemapPaths,
            crawledPaths: allResults.map((p) => p.path),
            onlyInSitemap: sitemapPaths.filter((p) => !crawledSet.has(p)),
            onlyInCrawl: allResults.map((p) => p.path).filter((p) => !sitemapSet.has(p)),
            inBoth: sitemapPaths.filter((p) => crawledSet.has(p)).length,
          };
          send({ type: "coverage_diff", diff: coverageDiff });
        }

        // Phase 9 — body duplicate detection (cosine sim)
        const textData = allResults.map((p) => ({ path: p.path, text: p.bodyText }));
        const dupGroups = detectBodyDuplicates(textData);
        if (dupGroups.length > 0) send({ type: "duplicate_groups", groups: dupGroups });

        // Phase 10 — crawl graph
        const crawlGraph = buildCrawlGraph(allResults, depths, orphans);
        send({ type: "crawl_graph", nodes: crawlGraph });

        // PageSpeed for top 5 pages
        if (PSI_KEY || process.env.PSI_ALLOW_NO_KEY) {
          const psiTargets = ["/", "/conciergerie", "/locations", "/conciergerie/estimer-mes-revenus",
            blogPosts[0] ? `/blog/${blogPosts[0].slug}` : null].filter(Boolean) as string[];
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
