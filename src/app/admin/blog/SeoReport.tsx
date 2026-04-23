"use client";

import React, { useState, useRef, useMemo } from "react";
import {
  Play, StopCircle, RefreshCw, ExternalLink,
  CheckCircle2, XCircle, AlertTriangle, AlertCircle,
  ChevronDown, ChevronUp, BarChart2, FileSearch, Shield, Zap,
  Copy, Check,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────

type Severity = "critical" | "warning" | "info";
type PageType = "home" | "blog" | "blog-index" | "location" | "destination" | "conciergerie" | "static";
type SortKey = "score" | "path" | "issues" | "words";
type SortDir = "asc" | "desc";

interface Issue {
  severity: Severity;
  code: string;
  message: string;
}

interface CannibalizationPair { pathA: string; pathB: string; shared: string[]; overlap: number; }
interface BrokenLink { path: string; httpStatus: number; sources: string[] }

interface PageResult {
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
  issues: Issue[];
  score: number;
  psi?: { performance: number; seo: number; accessibility: number; lcp: number | null; cls: number | null };
}

interface InfraStatus {
  sitemap: boolean;
  robots: boolean;
  sitemapUrl: string;
  robotsUrl: string;
}

interface PsiEntry {
  path: string;
  data: NonNullable<PageResult["psi"]>;
}

// ── Score helpers ─────────────────────────────────────────────────

function scoreColor(s: number) {
  if (s >= 80) return "text-emerald-600";
  if (s >= 60) return "text-yellow-600";
  if (s >= 40) return "text-orange-500";
  return "text-red-600";
}
function scoreBorder(s: number) {
  if (s >= 80) return "bg-emerald-50 border-emerald-200";
  if (s >= 60) return "bg-yellow-50 border-yellow-200";
  if (s >= 40) return "bg-orange-50 border-orange-200";
  return "bg-red-50 border-red-200";
}
function scoreGrade(s: number) {
  if (s >= 95) return "S";
  if (s >= 80) return "A";
  if (s >= 65) return "B";
  if (s >= 50) return "C";
  if (s >= 35) return "D";
  return "F";
}

// ── Sub-components ────────────────────────────────────────────────

function ScoreBadge({ score }: { score: number }) {
  return (
    <span className={`inline-flex items-baseline gap-1 px-2 py-0.5 rounded-lg border text-xs font-bold ${scoreBorder(score)} ${scoreColor(score)}`}>
      {score}<span className="font-normal opacity-60 text-[10px]">{scoreGrade(score)}</span>
    </span>
  );
}

function SevChip({ severity }: { severity: Severity }) {
  if (severity === "critical")
    return <span className="shrink-0 inline-block px-1.5 py-0.5 text-[10px] font-bold rounded bg-red-100 text-red-700">CRITIQUE</span>;
  if (severity === "warning")
    return <span className="shrink-0 inline-block px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-700">ALERTE</span>;
  return <span className="shrink-0 inline-block px-1.5 py-0.5 text-[10px] font-bold rounded bg-blue-100 text-blue-700">INFO</span>;
}

function StatCard({ label, value, color, bg }: { label: string; value: string | number; color: string; bg: string }) {
  return (
    <div className={`rounded-2xl border shadow-sm p-4 text-center ${bg}`}>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function SortBtn({ thisKey, label, sortKey, sortDir, onToggle }: {
  thisKey: SortKey; label: string; sortKey: SortKey; sortDir: SortDir;
  onToggle: (key: SortKey) => void;
}) {
  const active = sortKey === thisKey;
  return (
    <button
      onClick={() => onToggle(thisKey)}
      className={`flex items-center gap-0.5 text-xs font-semibold transition-colors ${active ? "text-[var(--color-rhone)]" : "text-gray-400 hover:text-gray-600"}`}
    >
      {label}
      {active
        ? sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
        : <ChevronDown className="w-3 h-3 opacity-30" />}
    </button>
  );
}

// ── Main ──────────────────────────────────────────────────────────

export default function SeoReport() {
  const [mode, setMode] = useState<"quick" | "full">("quick");
  const [runStatus, setRunStatus] = useState<"idle" | "running" | "done" | "error">("idle");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [currentPath, setCurrentPath] = useState("");
  const [pages, setPages] = useState<PageResult[]>([]);
  const [infra, setInfra] = useState<InfraStatus | null>(null);
  const [psiList, setPsiList] = useState<PsiEntry[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [cannibalization, setCannibalization] = useState<CannibalizationPair[]>([]);
  const [orphans, setOrphans] = useState<string[]>([]);
  const [brokenLinks, setBrokenLinks] = useState<BrokenLink[]>([]);
  const [depths, setDepths] = useState<Record<string, number>>({});
  const abortRef = useRef<AbortController | null>(null);

  function handleEvent(event: Record<string, unknown>) {
    const type = event.type as string;
    if (type === "infra") {
      setInfra(event as unknown as InfraStatus);
    } else if (type === "total") {
      setProgress((p) => ({ ...p, total: event.count as number }));
    } else if (type === "page") {
      const page = event.data as PageResult;
      setCurrentPath(page.path);
      setPages((prev) => [...prev, page]);
      setProgress((p) => ({ ...p, done: p.done + 1 }));
    } else if (type === "corrections") {
      const corrections = event.corrections as Record<string, { issues: Issue[]; score: number }>;
      setPages((prev) => prev.map((p) => {
        const c = corrections[p.path];
        return c ? { ...p, issues: c.issues, score: c.score } : p;
      }));
    } else if (type === "psi") {
      setPsiList((prev) => [...prev, { path: event.path as string, data: event.data as PsiEntry["data"] }]);
    } else if (type === "cannibalization") {
      setCannibalization(event.pairs as CannibalizationPair[]);
    } else if (type === "orphans") {
      setOrphans(event.paths as string[]);
    } else if (type === "broken_links") {
      setBrokenLinks(event.links as BrokenLink[]);
    } else if (type === "depths") {
      setDepths(event.depths as Record<string, number>);
    } else if (type === "done") {
      setRunStatus("done");
    } else if (type === "error") {
      setErrorMsg(event.message as string);
      setRunStatus("error");
    }
  }

  async function startAnalysis() {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setRunStatus("running");
    setProgress({ done: 0, total: 0 });
    setPages([]);
    setInfra(null);
    setPsiList([]);
    setErrorMsg("");
    setExpanded(null);
    setCannibalization([]);
    setOrphans([]);
    setBrokenLinks([]);
    setDepths({});

    try {
      const res = await fetch("/api/seo-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
        signal: abortRef.current.signal,
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try { handleEvent(JSON.parse(line.slice(6))); } catch { /* skip malformed */ }
        }
      }
      setRunStatus("done");
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        setRunStatus("done");
      } else {
        setErrorMsg(err instanceof Error ? err.message : "Erreur inconnue");
        setRunStatus("error");
      }
    }
  }

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir(key === "score" ? "asc" : "desc"); }
  }

  const avgScore = pages.length > 0
    ? Math.round(pages.reduce((s, p) => s + p.score, 0) / pages.length)
    : null;
  const criticalCount = pages.reduce((n, p) => n + p.issues.filter((i) => i.severity === "critical").length, 0);
  const warningCount = pages.reduce((n, p) => n + p.issues.filter((i) => i.severity === "warning").length, 0);

  const topIssues = useMemo(() => {
    const map = new Map<string, { message: string; severity: Severity; count: number }>();
    for (const p of pages)
      for (const iss of p.issues) {
        const ex = map.get(iss.code);
        if (ex) ex.count++;
        else map.set(iss.code, { message: iss.message, severity: iss.severity, count: 1 });
      }
    const o = { critical: 0, warning: 1, info: 2 };
    return Array.from(map.values()).sort((a, b) =>
      o[a.severity] !== o[b.severity] ? o[a.severity] - o[b.severity] : b.count - a.count
    );
  }, [pages]);

  const sortedPages = useMemo(() => {
    const arr = [...pages];
    arr.sort((a, b) => {
      if (sortKey === "path") return sortDir === "asc" ? a.path.localeCompare(b.path) : b.path.localeCompare(a.path);
      const av = sortKey === "score" ? a.score : sortKey === "issues" ? a.issues.length : a.wordCount;
      const bv = sortKey === "score" ? b.score : sortKey === "issues" ? b.issues.length : b.wordCount;
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return arr;
  }, [pages, sortKey, sortDir]);

  const pct = progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;

  function buildClipboardText(): string {
    const date = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
    const lines: string[] = [];
    lines.push(`RAPPORT SEO — entre-rhone-alpilles.fr — ${date}`);
    lines.push("=".repeat(60));

    if (infra) {
      lines.push(`\nINFRASTRUCTURE`);
      lines.push(`  Sitemap XML : ${infra.sitemap ? "✓ OK" : "✗ ABSENT"}`);
      lines.push(`  robots.txt  : ${infra.robots ? "✓ OK" : "✗ ABSENT"}`);
    }

    if (avgScore !== null) {
      lines.push(`\nRÉSUMÉ`);
      lines.push(`  Pages analysées     : ${pages.length}`);
      lines.push(`  Score moyen         : ${avgScore}/100 (${scoreGrade(avgScore)})`);
      lines.push(`  Problèmes critiques : ${criticalCount}`);
      lines.push(`  Avertissements      : ${warningCount}`);
    }

    if (topIssues.length > 0) {
      lines.push(`\nPROBLÈMES GLOBAUX`);
      for (const iss of topIssues) {
        const tag = iss.severity === "critical" ? "[CRITIQUE]" : "[ALERTE]  ";
        lines.push(`  ${tag} ${iss.message} — ${iss.count}/${pages.length} pages`);
      }
    }

    lines.push(`\nDÉTAIL PAR PAGE`);
    const sorted = [...pages].sort((a, b) => a.score - b.score);
    for (const p of sorted) {
      lines.push(`\n  ${p.path} — Score ${p.score}/100 (${scoreGrade(p.score)})`);
      if (p.title) lines.push(`    Titre (${p.titleLength} car.) : ${p.title}`);
      if (p.h1) lines.push(`    H1 : ${p.h1}`);
      if (p.issues.length === 0) {
        lines.push(`    ✓ Aucun problème`);
      } else {
        for (const iss of p.issues) {
          const tag = iss.severity === "critical" ? "✗" : "△";
          lines.push(`    ${tag} ${iss.message}`);
        }
      }
    }

    if (psiList.length > 0) {
      lines.push(`\nPAGESPEED INSIGHTS (mobile)`);
      for (const e of psiList) {
        lines.push(`  ${e.path} — Perf. ${e.data.performance} / SEO ${e.data.seo} / Access. ${e.data.accessibility}${e.data.lcp !== null ? ` / LCP ${e.data.lcp}s` : ""}${e.data.cls !== null ? ` / CLS ${e.data.cls.toFixed(3)}` : ""}`);
      }
    }

    if (cannibalization.length > 0) {
      lines.push(`\nCANNIBALISATION DE MOTS-CLÉS (${cannibalization.length} paires)`);
      for (const pair of cannibalization) {
        lines.push(`  ${pair.pathA}  ↔  ${pair.pathB}`);
        lines.push(`    Mots-clés partagés : ${pair.shared.join(", ")} (${Math.round(pair.overlap * 100)}% overlap)`);
      }
    }

    if (brokenLinks.length > 0) {
      lines.push(`\nLIENS INTERNES CASSÉS (${brokenLinks.length})`);
      for (const link of brokenLinks) {
        lines.push(`  [${link.httpStatus || "ERR"}] ${link.path}`);
        lines.push(`    Lié depuis : ${link.sources.slice(0, 5).join(", ")}${link.sources.length > 5 ? ` +${link.sources.length - 5}` : ""}`);
      }
    }

    if (orphans.length > 0) {
      lines.push(`\nPAGES ORPHELINES — aucun lien entrant (${orphans.length})`);
      for (const p of orphans) lines.push(`  ${p}`);
    }

    const pagesWithDepth = Object.entries(depths).sort((a, b) => b[1] - a[1]);
    if (pagesWithDepth.length > 0) {
      lines.push(`\nPROFONDEUR DE CRAWL`);
      for (const [path, depth] of pagesWithDepth) {
        const flag = depth > 6 ? " ⚠ trop profond" : depth > 4 ? " △ à surveiller" : "";
        lines.push(`  ${path} — profondeur ${depth}${flag}`);
      }
    }

    return lines.join("\n");
  }

  function copyReport() {
    navigator.clipboard.writeText(buildClipboardText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="space-y-6">

      {/* ── Control panel ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-[var(--color-rhone)]" />
              Rapport SEO
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Audit automatique : title, meta description, H1, canonical, JSON-LD, images alt, contenu…
            </p>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            {(["quick", "full"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                disabled={runStatus === "running"}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors disabled:opacity-50 ${
                  mode === m
                    ? "bg-[var(--color-rhone)] text-white border-[var(--color-rhone)]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {m === "quick" ? "Rapide (~20 p.)" : "Complet (~80 p.)"}
              </button>
            ))}
            {runStatus === "running" ? (
              <button
                onClick={() => abortRef.current?.abort()}
                className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
              >
                <StopCircle className="w-4 h-4" /> Arrêter
              </button>
            ) : (
              <>
                {runStatus === "done" && pages.length > 0 && (
                  <button
                    onClick={copyReport}
                    className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl border transition-colors ${
                      copied
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copié !" : "Copier le rapport"}
                  </button>
                )}
                <button
                  onClick={startAnalysis}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[var(--color-rhone)] hover:bg-[var(--color-rhone-dark)] text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  {runStatus === "done" ? <RefreshCw className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {runStatus === "done" ? "Relancer" : "Lancer l'analyse"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Progress */}
        {progress.total > 0 && (
          <div className="mt-5">
            <div className="flex justify-between text-xs text-gray-400 mb-1.5">
              <span className="truncate max-w-xs font-mono">
                {runStatus === "running" ? currentPath : "Analyse terminée"}
              </span>
              <span>{progress.done} / {progress.total}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  runStatus === "done" ? "bg-emerald-500" : "bg-[var(--color-rhone)]"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}

        {runStatus === "error" && (
          <div className="mt-4 flex items-start gap-2 text-sm text-red-700 bg-red-50 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            {errorMsg}
          </div>
        )}
      </div>

      {/* ── Idle placeholder ── */}
      {runStatus === "idle" && (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-14 text-center">
          <BarChart2 className="w-10 h-10 mx-auto text-gray-200 mb-3" />
          <p className="text-sm text-gray-400">Lance l'analyse pour obtenir ton rapport SEO complet.</p>
          <p className="text-xs text-gray-300 mt-1">Mode <strong>Rapide</strong> : pages statiques + articles. Mode <strong>Complet</strong> : + toutes les communes.</p>
        </div>
      )}

      {/* ── Results ── */}
      {pages.length > 0 && (
        <>
          {/* Infra */}
          {infra && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-4">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-3">Infrastructure</p>
              <div className="flex gap-8 flex-wrap">
                {[
                  { label: "Sitemap XML", ok: infra.sitemap, url: infra.sitemapUrl },
                  { label: "robots.txt", ok: infra.robots, url: infra.robotsUrl },
                ].map(({ label, ok, url }) => (
                  <div key={label} className="flex items-center gap-2 text-sm">
                    {ok
                      ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      : <XCircle className="w-4 h-4 text-red-500" />}
                    <span className={ok ? "text-gray-700" : "text-red-600 font-medium"}>{label}</span>
                    <a href={url} target="_blank" rel="noopener noreferrer"
                      className="text-gray-300 hover:text-[var(--color-rhone)]">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard label="Pages analysées" value={pages.length} color="text-gray-900" bg="bg-white border-gray-200" />
            {avgScore !== null && (
              <StatCard
                label="Score moyen"
                value={`${avgScore} ${scoreGrade(avgScore)}`}
                color={scoreColor(avgScore)}
                bg={`border ${scoreBorder(avgScore)}`}
              />
            )}
            <StatCard
              label="Problèmes critiques"
              value={criticalCount}
              color={criticalCount > 0 ? "text-red-600" : "text-gray-400"}
              bg={criticalCount > 0 ? "bg-red-50 border-red-200" : "bg-white border-gray-200"}
            />
            <StatCard
              label="Avertissements"
              value={warningCount}
              color={warningCount > 0 ? "text-amber-600" : "text-gray-400"}
              bg={warningCount > 0 ? "bg-amber-50 border-amber-200" : "bg-white border-gray-200"}
            />
          </div>

          {/* PageSpeed Insights */}
          {psiList.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" /> PageSpeed Insights (mobile)
              </p>
              <div className="space-y-5">
                {psiList.map((entry) => (
                  <div key={entry.path}>
                    <p className="text-xs text-gray-500 font-mono mb-2">{entry.path}</p>
                    <div className="flex gap-3 flex-wrap">
                      {[
                        { label: "Performance", val: entry.data.performance },
                        { label: "SEO", val: entry.data.seo },
                        { label: "Accessibilité", val: entry.data.accessibility },
                      ].map(({ label, val }) => (
                        <div key={label} className={`rounded-xl border px-4 py-2 text-center min-w-[80px] ${scoreBorder(val)}`}>
                          <p className={`text-xl font-bold ${scoreColor(val)}`}>{val}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{label}</p>
                        </div>
                      ))}
                      {entry.data.lcp !== null && (
                        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 text-center min-w-[80px]">
                          <p className="text-xl font-bold text-gray-700">{entry.data.lcp}s</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">LCP</p>
                        </div>
                      )}
                      {entry.data.cls !== null && (
                        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 text-center min-w-[80px]">
                          <p className="text-xl font-bold text-gray-700">{entry.data.cls.toFixed(3)}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">CLS</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top issues */}
          {topIssues.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[var(--color-rhone)]" />
                Problèmes globaux ({topIssues.length} types · {pages.length} pages)
              </p>
              <div className="divide-y divide-gray-50">
                {topIssues.map((iss, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5">
                    <SevChip severity={iss.severity} />
                    <span className="flex-1 text-sm text-gray-700 min-w-0">{iss.message}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${iss.severity === "critical" ? "bg-red-500" : "bg-amber-400"}`}
                          style={{ width: `${Math.min(100, (iss.count / pages.length) * 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-16 text-right tabular-nums">
                        {iss.count}/{pages.length}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cannibalization */}
          {cannibalization.length > 0 && (
            <div className="bg-white rounded-2xl border border-orange-200 shadow-sm p-6">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
                Cannibalisation de mots-clés ({cannibalization.length} paires)
              </p>
              <div className="space-y-2">
                {cannibalization.map((pair, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0 text-xs">
                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-gray-700">{pair.pathA}</span>
                      <span className="text-gray-400 mx-2">↔</span>
                      <span className="font-mono text-gray-700">{pair.pathB}</span>
                      <p className="text-gray-400 mt-0.5">Mots-clés partagés : <span className="text-orange-600 font-medium">{pair.shared.join(", ")}</span> ({Math.round(pair.overlap*100)}% overlap)</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Broken links */}
          {brokenLinks.length > 0 && (
            <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-6">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-red-500" />
                Liens internes cassés ({brokenLinks.length})
              </p>
              <div className="space-y-2">
                {brokenLinks.map((link, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0 text-xs">
                    <span className="font-semibold text-red-600 shrink-0">{link.httpStatus || "ERR"}</span>
                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-gray-700">{link.path}</span>
                      <p className="text-gray-400 mt-0.5 truncate">Lié depuis : {link.sources.slice(0,3).join(", ")}{link.sources.length > 3 ? ` +${link.sources.length-3}` : ""}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orphan pages */}
          {orphans.length > 0 && (
            <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-6">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                Pages orphelines — aucun lien entrant ({orphans.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {orphans.map((p) => (
                  <a key={p} href={`https://entre-rhone-alpilles.fr${p}`} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-2 py-1 hover:bg-amber-100 transition-colors">
                    {p} <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Per-page table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <FileSearch className="w-4 h-4 text-[var(--color-rhone)]" />
              <h3 className="text-sm font-semibold text-gray-700">Détail par page</h3>
              <span className="ml-auto text-xs text-gray-400">{sortedPages.length} pages — clic pour détails</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-2.5 min-w-[200px]">
                      <SortBtn thisKey="path" label="Page" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} />
                    </th>
                    <th className="px-3 py-2.5">
                      <SortBtn thisKey="score" label="Score" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} />
                    </th>
                    <th className="px-3 py-2.5 text-center text-gray-400 font-semibold">Titre</th>
                    <th className="px-3 py-2.5 text-center text-gray-400 font-semibold">Desc</th>
                    <th className="px-3 py-2.5 text-center text-gray-400 font-semibold">H1</th>
                    <th className="px-3 py-2.5 text-center text-gray-400 font-semibold">LD</th>
                    <th className="px-3 py-2.5">
                      <SortBtn thisKey="words" label="Mots" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} />
                    </th>
                    <th className="px-3 py-2.5">
                      <SortBtn thisKey="issues" label="Prob." sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} />
                    </th>
                    <th className="px-3 py-2.5 text-center text-gray-400 font-semibold">Prof.</th>
                    <th className="w-8" />
                  </tr>
                </thead>
                <tbody>
                  {sortedPages.map((page) => (
                    <React.Fragment key={page.path}>
                      <tr
                        className={`border-b border-gray-50 hover:bg-gray-50/70 cursor-pointer transition-colors ${
                          expanded === page.path ? "bg-blue-50/30" : ""
                        }`}
                        onClick={() => setExpanded(expanded === page.path ? null : page.path)}
                      >
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-gray-700 truncate max-w-[180px] block">{page.path}</span>
                            <a
                              href={page.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-gray-300 hover:text-[var(--color-rhone)] shrink-0"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          {page.title && (
                            <p className="text-gray-400 truncate max-w-[220px] mt-0.5 text-[11px]">{page.title}</p>
                          )}
                        </td>
                        <td className="px-3 py-2.5">
                          <ScoreBadge score={page.score} />
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          {!page.title
                            ? <XCircle className="w-3.5 h-3.5 text-red-500 mx-auto" />
                            : page.titleLength > 60 || page.titleLength < 30
                            ? <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mx-auto" />
                            : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mx-auto" />}
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          {!page.description
                            ? <XCircle className="w-3.5 h-3.5 text-red-500 mx-auto" />
                            : page.descriptionLength > 160 || page.descriptionLength < 100
                            ? <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mx-auto" />
                            : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mx-auto" />}
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          {page.h1Count === 0
                            ? <XCircle className="w-3.5 h-3.5 text-red-500 mx-auto" />
                            : page.h1Count > 1
                            ? <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mx-auto" />
                            : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mx-auto" />}
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          {page.hasJsonLd
                            ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mx-auto" />
                            : <span className="text-gray-200">—</span>}
                        </td>
                        <td className="px-3 py-2.5 text-center tabular-nums">
                          <span className={
                            page.wordCount < 300 ? "text-red-500 font-semibold"
                            : page.wordCount < 600 ? "text-amber-500"
                            : "text-gray-500"
                          }>
                            {page.wordCount}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          {page.issues.length === 0
                            ? <span className="text-emerald-500 font-bold">✓</span>
                            : <span className={`font-semibold ${
                                page.issues.some((i) => i.severity === "critical") ? "text-red-600" : "text-amber-600"
                              }`}>
                                {page.issues.length}
                              </span>}
                        </td>
                        <td className="px-3 py-2.5 text-center tabular-nums">
                          {depths[page.path] !== undefined ? (
                            <span className={
                              depths[page.path] > 6 ? "text-red-600 font-semibold"
                              : depths[page.path] > 4 ? "text-amber-500 font-semibold"
                              : "text-gray-500"
                            }>
                              {depths[page.path]}
                            </span>
                          ) : <span className="text-gray-300">—</span>}
                        </td>
                        <td className="px-2 py-2.5 text-center">
                          {expanded === page.path
                            ? <ChevronUp className="w-3.5 h-3.5 text-gray-400 mx-auto" />
                            : <ChevronDown className="w-3.5 h-3.5 text-gray-300 mx-auto" />}
                        </td>
                      </tr>

                      {expanded === page.path && (
                        <tr>
                          <td colSpan={10} className="bg-slate-50 px-6 py-4 border-b border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              {/* Issues */}
                              <div>
                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Problèmes</p>
                                {page.issues.length === 0 ? (
                                  <p className="text-xs text-emerald-600 flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Aucun problème détecté
                                  </p>
                                ) : (
                                  <ul className="space-y-2">
                                    {page.issues.map((iss, i) => (
                                      <li key={i} className="flex items-start gap-2">
                                        <SevChip severity={iss.severity} />
                                        <span className="text-xs text-gray-700">{iss.message}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>

                              {/* Details */}
                              <div className="space-y-1.5 text-xs">
                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Informations</p>
                                {page.title && (
                                  <p>
                                    <span className="text-gray-400">Titre ({page.titleLength} car.) : </span>
                                    <span className={page.titleLength > 60 ? "text-amber-600" : "text-gray-700"}>{page.title}</span>
                                  </p>
                                )}
                                {page.description && (
                                  <p>
                                    <span className="text-gray-400">Meta desc ({page.descriptionLength} car.) : </span>
                                    <span className={page.descriptionLength > 160 || page.descriptionLength < 100 ? "text-amber-600" : "text-gray-700"}>
                                      {page.description.length > 130 ? page.description.slice(0, 130) + "…" : page.description}
                                    </span>
                                  </p>
                                )}
                                {page.h1 && (
                                  <p><span className="text-gray-400">H1 : </span><span className="text-gray-700">{page.h1}</span></p>
                                )}
                                {page.h2Texts.length > 0 && (
                                  <div>
                                    <span className="text-gray-400">H2 ({page.h2Count}) :</span>
                                    <ul className="ml-3 mt-0.5 space-y-0.5 text-gray-600">
                                      {page.h2Texts.map((h2, i) => <li key={i}>• {h2}</li>)}
                                    </ul>
                                  </div>
                                )}
                                {page.h3Count > 0 && (
                                  <p><span className="text-gray-400">H3 : </span><span className="text-gray-700">{page.h3Count}</span></p>
                                )}
                                {page.jsonLdTypes.length > 0 && (
                                  <p><span className="text-gray-400">JSON-LD : </span><span className="text-gray-700">{page.jsonLdTypes.join(", ")}</span></p>
                                )}
                                <p>
                                  <span className="text-gray-400">Liens : </span>
                                  <span className="text-gray-700">{page.internalLinks} internes · {page.externalLinks} externes</span>
                                </p>
                                {page.imagesTotal > 0 && (
                                  <p>
                                    <span className="text-gray-400">Images : </span>
                                    <span className="text-gray-700">{page.imagesTotal} total</span>
                                    {page.imagesWithoutAlt > 0 && (
                                      <span className="text-red-500"> · {page.imagesWithoutAlt} sans alt</span>
                                    )}
                                  </p>
                                )}
                                {page.canonical && (
                                  <p className="break-all">
                                    <span className="text-gray-400">Canonical : </span>
                                    <span className="font-mono text-[10px] text-gray-600">{page.canonical}</span>
                                  </p>
                                )}
                                <div className="pt-1 mt-1 border-t border-gray-100 grid grid-cols-2 gap-x-4 gap-y-1">
                                  <p>
                                    <span className="text-gray-400">Réponse : </span>
                                    <span className={page.responseTimeMs > 3000 ? "text-amber-600 font-semibold" : "text-gray-700"}>
                                      {page.responseTimeMs} ms
                                    </span>
                                  </p>
                                  <p>
                                    <span className="text-gray-400">Taille HTML : </span>
                                    <span className="text-gray-700">{page.pageSizeKb} KB</span>
                                  </p>
                                  <p>
                                    <span className="text-gray-400">Ratio texte : </span>
                                    <span className={page.textHtmlRatio < 10 ? "text-amber-600 font-semibold" : "text-gray-700"}>
                                      {page.textHtmlRatio}%
                                    </span>
                                  </p>
                                  <p>
                                    <span className="text-gray-400">Lang : </span>
                                    <span className={!page.htmlLang ? "text-red-500 font-semibold" : "text-gray-700"}>
                                      {page.htmlLang ?? "absent"}
                                    </span>
                                  </p>
                                  <p>
                                    <span className="text-gray-400">Viewport : </span>
                                    <span className={!page.viewport ? "text-red-500 font-semibold" : "text-gray-700"}>
                                      {page.viewport ? "✓" : "absent"}
                                    </span>
                                  </p>
                                </div>
                                {page.httpStatus !== 200 && (
                                  <p className="text-red-600 font-semibold">
                                    Statut HTTP : {page.httpStatus || "Timeout / erreur réseau"}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
