"use client";

import { useState, useMemo, useEffect } from "react";
import { Check, Lock, Eye, EyeOff, FileText, Sparkles, Rocket, CheckCircle, AlertCircle, ExternalLink, RefreshCw } from "lucide-react";
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

type PublishStatus = "idle" | "loading" | "success" | "error";

// ── Main component ─────────────────────────────────────────────
export default function AdminBlogClient() {
  const [authed, setAuthed] = useState(false);
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [tab, setTab] = useState<"form" | "prompt">("form");
  const [publishStatus, setPublishStatus] = useState<PublishStatus>("idle");
  const [publishError, setPublishError] = useState("");
  const [publishedSlug, setPublishedSlug] = useState("");

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

  function handleImport(imported: Partial<FormValues>) {
    setValues((prev: FormValues) => ({ ...prev, ...imported }));
    setTab("form");
  }

  async function handlePublish() {
    if (!values.slug || !values.title || !values.content) return;
    setPublishStatus("loading");
    setPublishError("");
    try {
      const res = await fetch("/api/publish-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishStatus("error");
        setPublishError(data.error ?? "Erreur lors de la publication.");
      } else {
        setPublishedSlug(data.slug);
        setPublishStatus("success");
      }
    } catch {
      setPublishStatus("error");
      setPublishError("Impossible de contacter le serveur.");
    }
  }

  function handleReset() {
    setValues(EMPTY);
    setPublishStatus("idle");
    setPublishError("");
    setPublishedSlug("");
  }

  const canPublish = !!(values.slug && values.title && values.content.trim());

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
            Le compteur SEO se met à jour en temps réel — visez le grade <strong>A</strong> ou <strong>S</strong> avant de publier.
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
        </div>

        {tab === "form" && (
          <>
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

            {/* ── Publication ─────────────────────────────────────── */}
            <div className="mt-6">
              {publishStatus === "success" ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <CheckCircle className="w-8 h-8 text-emerald-500 shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-800">Article publié avec succès !</p>
                    <p className="text-sm text-emerald-700 mt-0.5">
                      L&apos;article <strong>{values.title}</strong> est maintenant en ligne.
                    </p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <a
                      href={`/blog/${publishedSlug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Voir l&apos;article
                    </a>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-emerald-300 hover:border-emerald-500 text-emerald-700 text-sm font-semibold rounded-xl transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Nouvel article
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Publier l&apos;article</p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        L&apos;article sera ajouté directement au site — pas de copier-coller nécessaire.
                      </p>
                    </div>
                    <button
                      onClick={handlePublish}
                      disabled={!canPublish || publishStatus === "loading"}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-colors shrink-0 ${
                        canPublish && publishStatus !== "loading"
                          ? "bg-[var(--color-rhone)] hover:bg-[var(--color-rhone-dark)] text-white"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {publishStatus === "loading" ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Publication…
                        </>
                      ) : publishStatus === "error" ? (
                        <>
                          <RefreshCw className="w-4 h-4" />
                          Réessayer
                        </>
                      ) : (
                        <>
                          <Rocket className="w-4 h-4" />
                          Publier sur le site
                        </>
                      )}
                    </button>
                  </div>

                  {publishStatus === "error" && (
                    <div className="mt-4 flex items-start gap-2 text-sm text-red-700 bg-red-50 rounded-xl px-4 py-3">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      {publishError}
                    </div>
                  )}

                  {!canPublish && (
                    <p className="mt-3 text-xs text-gray-400">
                      Remplis au minimum le titre, le slug et le contenu pour activer la publication.
                    </p>
                  )}

                  {canPublish && seoResult.grade !== "S" && seoResult.grade !== "A" && (
                    <p className="mt-3 text-xs text-amber-600">
                      <strong>Conseil :</strong> ton score SEO est <strong>{seoResult.grade}</strong> — améliore-le avant de publier pour maximiser ta visibilité Google.
                    </p>
                  )}

                  {canPublish && (seoResult.grade === "S" || seoResult.grade === "A") && (
                    <p className="mt-3 text-xs text-emerald-600 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Score SEO <strong>{seoResult.grade}</strong> — prêt à publier !
                    </p>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {tab === "prompt" && <PromptGenerator onImport={handleImport} />}
      </div>
    </div>
  );
}
