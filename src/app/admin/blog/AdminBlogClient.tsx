"use client";

import { useState, useMemo, useEffect } from "react";
import { Copy, Check, Lock, Eye, EyeOff, FileText, Sparkles } from "lucide-react";
import BlogForm, { type FormValues } from "./BlogForm";
import SeoPanel from "./SeoPanel";
import PromptGenerator from "./PromptGenerator";
import { computeSeoScore } from "./seoScorer";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "ERA2026";
const SESSION_KEY = "era_admin_auth";

function today() {
  return new Date().toISOString().slice(0, 10);
}

const EMPTY: FormValues = {
  title: "",
  slug: "",
  excerpt: "",
  category: "Conseils propriétaires",
  image: "",
  date: today(),
  content: "",
};

// ── Password gate ──────────────────────────────────────────────
function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onSuccess();
    } else {
      setErr(true);
      setPwd("");
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-cream)] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[var(--color-rhone)] flex items-center justify-center">
            <Lock className="w-7 h-7 text-white" />
          </div>
        </div>
        <h1 className="font-serif text-2xl font-bold text-center text-gray-900 mb-1">
          Admin — Blog ERA
        </h1>
        <p className="text-sm text-center text-gray-400 mb-6">Accès réservé</p>
        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Mot de passe"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-rhone)]"
              value={pwd}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPwd(e.target.value); setErr(false); }}
              autoFocus
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={() => setShow((s: boolean) => !s)}
            >
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {err && (
            <p className="text-xs text-red-500 text-center">Mot de passe incorrect.</p>
          )}
          <button
            type="submit"
            className="w-full bg-[var(--color-rhone)] hover:bg-[var(--color-rhone-dark)] text-white font-semibold rounded-xl py-3 text-sm transition-colors"
          >
            Accéder
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Code output ────────────────────────────────────────────────
function generateDataEntry(v: FormValues): string {
  const readTime = Math.max(1, Math.round(v.content.trim().split(/\s+/).filter(Boolean).length / 200));
  return `  {
    slug: "${v.slug}",
    title: "${v.title.replace(/"/g, '\\"')}",
    excerpt:
      "${v.excerpt.replace(/"/g, '\\"')}",
    date: "${v.date}",
    category: "${v.category}",
    image: "${v.image || `/images/blog/${v.slug}.jpg`}",
    readTime: ${readTime},
  },`;
}

function generateContentEntry(v: FormValues): string {
  const paragraphs = v.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  const lines = paragraphs.map((p) => `    "${p.replace(/"/g, '\\"').replace(/\n/g, " ")}",`).join("\n");
  return `  "${v.slug}": [\n${lines}\n  ],`;
}

function CopyBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1 text-xs text-[var(--color-rhone)] hover:text-[var(--color-rhone-dark)] transition-colors"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copié !" : "Copier"}
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed whitespace-pre-wrap break-words">
        {code}
      </pre>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────
export default function AdminBlogClient() {
  const [authed, setAuthed] = useState(false);
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [tab, setTab] = useState<"form" | "prompt" | "export">("form");

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") setAuthed(true);
  }, []);

  const seoResult = useMemo(() => computeSeoScore({
    title: values.title,
    excerpt: values.excerpt,
    content: values.content,
    slug: values.slug,
    category: values.category,
  }), [values]);

  if (!authed) return <PasswordGate onSuccess={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-[var(--color-cream)] pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            Créer un article de blog
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Le compteur SEO se met à jour en temps réel — visez le grade <strong>A</strong> ou <strong>S</strong> pour dominer les Alpilles.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setTab("form")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === "form" ? "bg-[var(--color-rhone)] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[var(--color-rhone)]"}`}
          >
            <FileText className="w-4 h-4" /> Rédaction
          </button>
          <button
            onClick={() => setTab("prompt")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === "prompt" ? "bg-[var(--color-rhone)] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[var(--color-rhone)]"}`}
          >
            <Sparkles className="w-4 h-4" /> Générer un prompt IA
          </button>
          <button
            onClick={() => setTab("export")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === "export" ? "bg-[var(--color-rhone)] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[var(--color-rhone)]"}`}
          >
            <Copy className="w-4 h-4" /> Exporter le code
          </button>
        </div>

        {tab === "form" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form — 2/3 */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <BlogForm values={values} onChange={setValues} />
            </div>
            {/* SEO panel — 1/3 */}
            <div className="lg:col-span-1">
              <SeoPanel result={seoResult} />
            </div>
          </div>
        )}

        {tab === "prompt" && <PromptGenerator />}

        {tab === "export" && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-6">
              Copie ces deux blocs et colle-les dans les fichiers correspondants.
            </p>

            <div className="mb-3 p-3 bg-blue-50 rounded-xl text-xs text-blue-700">
              <strong>1.</strong> Colle le bloc ci-dessous dans{" "}
              <code className="bg-blue-100 px-1 rounded">src/lib/data.ts</code>{" "}
              à l&apos;intérieur du tableau <code className="bg-blue-100 px-1 rounded">blogPosts</code>.
            </div>
            <CopyBlock
              label="Entrée dans data.ts → blogPosts[]"
              code={generateDataEntry(values)}
            />

            <div className="mt-6 mb-3 p-3 bg-amber-50 rounded-xl text-xs text-amber-700">
              <strong>2.</strong> Colle le bloc ci-dessous dans{" "}
              <code className="bg-amber-100 px-1 rounded">src/app/blog/[slug]/page.tsx</code>{" "}
              à l&apos;intérieur de l&apos;objet <code className="bg-amber-100 px-1 rounded">articleContent</code>.
            </div>
            <CopyBlock
              label="Entrée dans blog/[slug]/page.tsx → articleContent{}"
              code={generateContentEntry(values)}
            />

            <div className="mt-6 p-4 bg-[#F5F0E8] rounded-xl text-xs text-gray-600">
              <strong className="text-[#6E8052]">Rappel :</strong> l&apos;image doit être placée dans{" "}
              <code className="bg-white px-1 rounded">/public{values.image || `/images/blog/${values.slug}.jpg`}</code>{" "}
              — format 1200×630px, nommée exactement comme le slug.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
