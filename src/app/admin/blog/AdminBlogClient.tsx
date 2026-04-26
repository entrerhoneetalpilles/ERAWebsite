"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Check, Lock, Eye, EyeOff, FileText, Sparkles, Rocket,
  CheckCircle, AlertCircle, ExternalLink, RefreshCw,
  LayoutList, Pencil, Trash2, X, Loader2, BarChart2,
  Calendar, Clock, LogOut,
} from "lucide-react";
import BlogForm, { type FormValues } from "./BlogForm";
import SeoPanel from "./SeoPanel";
import PromptGenerator from "./PromptGenerator";
import SeoReport from "./SeoReport";
import { computeSeoScore } from "./seoScorer";
import type { BlogPost } from "@/lib/data";
import { checkAdminPassword, signOutAdmin } from "./actions";

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
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const ok = await checkAdminPassword(pwd);
    setLoading(false);
    if (ok) {
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
          {err && <p className="text-xs text-red-500 text-center">Mot de passe incorrect.</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-rhone)] hover:bg-[var(--color-rhone-dark)] text-white font-semibold rounded-xl py-3 text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Vérification…" : "Accéder"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Article list (Gérer tab) ───────────────────────────────────
function ArticleList({
  posts,
  onEdit,
  onDelete,
}: {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (slug: string) => void;
}) {
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null);
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);

  async function handleDelete(slug: string) {
    setLoadingSlug(slug);
    await onDelete(slug);
    setConfirmSlug(null);
    setLoadingSlug(null);
  }

  const categoryColor: Record<string, string> = {
    "Conseils propriétaires": "bg-[var(--color-rhone)]/10 text-[var(--color-rhone)]",
    "Guides de voyage": "bg-emerald-50 text-emerald-700",
    "Actualités région": "bg-amber-50 text-amber-700",
  };

  const todayStr = new Date().toISOString().slice(0, 10);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100">
      {posts.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-12">Aucun article publié.</p>
      )}
      {posts.map((post) => {
        const isScheduled = post.date > todayStr;
        return (
        <div key={post.slug} className="flex items-start gap-4 p-5">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">{post.title}</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs text-gray-400">{post.date}</span>
              {isScheduled && (
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium border border-amber-100">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  Planifié
                </span>
              )}
              <span className="text-gray-200">·</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColor[post.category] ?? "bg-gray-100 text-gray-600"}`}>
                {post.category}
              </span>
              <span className="text-gray-200">·</span>
              <span className="text-xs text-gray-400">{post.readTime} min</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-400 hover:text-[var(--color-rhone)] hover:bg-[var(--color-rhone)]/5 transition-colors"
              title="Voir l'article"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => onEdit(post)}
              className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              title="Modifier"
            >
              <Pencil className="w-4 h-4" />
            </button>

            {confirmSlug === post.slug ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleDelete(post.slug)}
                  disabled={loadingSlug === post.slug}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  {loadingSlug === post.slug ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Trash2 className="w-3 h-3" />
                  )}
                  Confirmer
                </button>
                <button
                  onClick={() => setConfirmSlug(null)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmSlug(post.slug)}
                className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Supprimer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        );
      })}
    </div>
  );
}

// ── Types ──────────────────────────────────────────────────────
type PublishStatus = "idle" | "loading" | "success" | "error";
type Tab = "form" | "prompt" | "manage" | "seo" | "calendar";
type Mode = "create" | "edit";

interface Props {
  initialPosts: BlogPost[];
  isAuthenticated: boolean;
}

// ── Main component ─────────────────────────────────────────────
export default function AdminBlogClient({ initialPosts, isAuthenticated }: Props) {
  const router = useRouter();
  const [authed, setAuthed] = useState(isAuthenticated);
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [tab, setTab] = useState<Tab>("form");
  const [mode, setMode] = useState<Mode>("create");

  const [publishStatus, setPublishStatus] = useState<PublishStatus>("idle");
  const [publishError, setPublishError] = useState("");
  const [publishedSlug, setPublishedSlug] = useState("");

  const [manageStatus, setManageStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [manageMsg, setManageMsg] = useState("");
  const [loadingEdit, setLoadingEdit] = useState(false);

  async function handleSignOut() {
    await signOutAdmin();
    setAuthed(false);
    router.refresh();
  }

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

  // ── Edit ──
  async function handleEdit(post: BlogPost) {
    setLoadingEdit(true);
    try {
      const res = await fetch(`/api/manage-article?slug=${encodeURIComponent(post.slug)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Impossible de charger le contenu.");
      setValues({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        category: post.category,
        image: post.image,
        date: post.date,
        content: data.content,
      });
      setMode("edit");
      setPublishStatus("idle");
      setPublishError("");
      setTab("form");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erreur lors du chargement.");
    } finally {
      setLoadingEdit(false);
    }
  }

  // ── Delete ──
  async function handleDelete(slug: string) {
    setManageStatus("loading");
    setManageMsg("");
    try {
      const res = await fetch(`/api/manage-article?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur lors de la suppression.");
      setManageStatus("success");
      setManageMsg(`Article "${slug}" supprimé. Redéploiement en cours…`);
    } catch (err) {
      setManageStatus("error");
      setManageMsg(err instanceof Error ? err.message : "Erreur inconnue.");
    }
  }

  // ── Publish / Update ──
  async function handlePublish() {
    if (!values.slug || !values.title || !values.content) return;
    setPublishStatus("loading");
    setPublishError("");
    try {
      const url = mode === "edit" ? "/api/manage-article" : "/api/publish-article";
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
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

  function cancelEdit() {
    setMode("create");
    setValues(EMPTY);
    setPublishStatus("idle");
    setPublishError("");
  }

  function handleReset() {
    setMode("create");
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
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-gray-900">
              {mode === "edit" ? "Modifier l'article" : "Créer un article de blog"}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {mode === "edit"
                ? <>Mode édition — <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">/blog/{values.slug}</code></>
                : <>Le compteur SEO se met à jour en temps réel — visez le grade <strong>A</strong> ou <strong>S</strong>.</>
              }
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-500 border border-gray-200 hover:border-red-300 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setTab("form")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === "form" ? "bg-[var(--color-rhone)] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[var(--color-rhone)]"}`}
          >
            <FileText className="w-4 h-4" />
            {mode === "edit" ? "Modifier" : "Rédaction"}
          </button>
          {mode === "create" && (
            <button
              onClick={() => setTab("prompt")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === "prompt" ? "bg-[var(--color-rhone)] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[var(--color-rhone)]"}`}
            >
              <Sparkles className="w-4 h-4" /> Générer un prompt IA
            </button>
          )}
          <button
            onClick={() => { setTab("manage"); setManageStatus("idle"); setManageMsg(""); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === "manage" ? "bg-[var(--color-rhone)] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[var(--color-rhone)]"}`}
          >
            <LayoutList className="w-4 h-4" /> Gérer les articles
            <span className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${tab === "manage" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
              {initialPosts.length}
            </span>
          </button>
          <button
            onClick={() => setTab("seo")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === "seo" ? "bg-[var(--color-rhone)] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[var(--color-rhone)]"}`}
          >
            <BarChart2 className="w-4 h-4" /> Rapports SEO
          </button>
          {(() => {
            const scheduled = initialPosts.filter((p) => p.date > new Date().toISOString().slice(0, 10));
            return (
              <button
                onClick={() => setTab("calendar")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === "calendar" ? "bg-[var(--color-rhone)] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[var(--color-rhone)]"}`}
              >
                <Calendar className="w-4 h-4" /> Calendrier
                {scheduled.length > 0 && (
                  <span className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${tab === "calendar" ? "bg-white/20 text-white" : "bg-amber-100 text-amber-700"}`}>
                    {scheduled.length}
                  </span>
                )}
              </button>
            );
          })()}
        </div>

        {/* ── Form / Edit tab ── */}
        {tab === "form" && (
          <>
            {mode === "edit" && (
              <div className="mb-4 flex items-center gap-3 px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
                <Pencil className="w-4 h-4 shrink-0" />
                <span>Tu modifies <strong>{values.title}</strong>. Le slug est fixe.</span>
                <button onClick={cancelEdit} className="ml-auto flex items-center gap-1 text-blue-500 hover:text-blue-700 font-medium">
                  <X className="w-3.5 h-3.5" /> Annuler
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <BlogForm values={values} onChange={setValues} slugReadOnly={mode === "edit"} />
              </div>
              <div className="lg:col-span-1">
                <SeoPanel result={seoResult} />
              </div>
            </div>

            {/* Publication panel */}
            <div className="mt-6">
              {publishStatus === "success" ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <CheckCircle className="w-8 h-8 text-emerald-500 shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-800">
                      {mode === "edit" ? "Article mis à jour !" : "Article publié avec succès !"}
                    </p>
                    <p className="text-sm text-emerald-700 mt-0.5">
                      <strong>{values.title}</strong> — redéploiement Vercel en cours (~1 min).
                    </p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <a href={`/blog/${publishedSlug}`} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors">
                      <ExternalLink className="w-4 h-4" /> Voir l&apos;article
                    </a>
                    <button onClick={handleReset}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-emerald-300 hover:border-emerald-500 text-emerald-700 text-sm font-semibold rounded-xl transition-colors">
                      <RefreshCw className="w-4 h-4" /> Nouvel article
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {mode === "edit" ? "Enregistrer les modifications" : "Publier l'article"}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {mode === "edit"
                          ? "Les modifications seront appliquées après redéploiement (~1 min)."
                          : "L'article sera ajouté directement au site — pas de copier-coller nécessaire."}
                      </p>
                    </div>
                    <button
                      onClick={handlePublish}
                      disabled={!canPublish || publishStatus === "loading"}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-colors shrink-0 ${canPublish && publishStatus !== "loading"
                        ? "bg-[var(--color-rhone)] hover:bg-[var(--color-rhone-dark)] text-white"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                      {publishStatus === "loading" ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> {mode === "edit" ? "Mise à jour…" : "Publication…"}</>
                      ) : publishStatus === "error" ? (
                        <><RefreshCw className="w-4 h-4" /> Réessayer</>
                      ) : mode === "edit" ? (
                        <><Check className="w-4 h-4" /> Mettre à jour</>
                      ) : (
                        <><Rocket className="w-4 h-4" /> Publier sur le site</>
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
                      <strong>Conseil :</strong> ton score SEO est <strong>{seoResult.grade}</strong> — améliore-le avant de publier.
                    </p>
                  )}
                  {canPublish && (seoResult.grade === "S" || seoResult.grade === "A") && (
                    <p className="mt-3 text-xs text-emerald-600 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Score SEO <strong>{seoResult.grade}</strong> — prêt à publier !
                    </p>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* ── Prompt tab ── */}
        {tab === "prompt" && mode === "create" && <PromptGenerator onImport={handleImport} />}

        {/* ── SEO report tab ── */}
        {tab === "seo" && <SeoReport />}

        {/* ── Calendar tab ── */}
        {tab === "calendar" && (() => {
          const todayStr = new Date().toISOString().slice(0, 10);
          const sorted = [...initialPosts].sort((a, b) => a.date.localeCompare(b.date));
          const scheduled = sorted.filter((p) => p.date > todayStr);
          const published = sorted.filter((p) => p.date <= todayStr).reverse();
          return (
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  Articles planifiés ({scheduled.length})
                </h2>
                {scheduled.length === 0 ? (
                  <p className="text-sm text-gray-400 py-6 text-center bg-white rounded-xl border border-gray-200">
                    Aucun article planifié. Choisissez une date future dans le formulaire de rédaction.
                  </p>
                ) : (
                  <div className="bg-white rounded-2xl border border-amber-200 shadow-sm divide-y divide-amber-50">
                    {scheduled.map((p) => (
                      <div key={p.slug} className="flex items-center gap-4 px-5 py-4">
                        <div className="w-20 text-right shrink-0">
                          <span className="text-xs font-mono text-amber-700 bg-amber-50 px-2 py-1 rounded-lg">{p.date}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate text-sm">{p.title}</p>
                          <p className="text-xs text-gray-400 truncate mt-0.5">{p.category}</p>
                        </div>
                        <button
                          onClick={() => { handleEdit(p); setTab("form"); }}
                          className="shrink-0 p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Modifier"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Articles publiés ({published.length})
                </h2>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100">
                  {published.map((p) => (
                    <div key={p.slug} className="flex items-center gap-4 px-5 py-4">
                      <div className="w-20 text-right shrink-0">
                        <span className="text-xs font-mono text-gray-500">{p.date}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-700 truncate text-sm">{p.title}</p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">{p.category}</p>
                      </div>
                      <a
                        href={`/blog/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 p-2 rounded-lg text-gray-400 hover:text-[var(--color-rhone)] hover:bg-[var(--color-rhone)]/5 transition-colors"
                        title="Voir"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── Manage tab ── */}
        {tab === "manage" && (
          <div className="space-y-4">
            {/* Status banner */}
            {manageStatus === "success" && (
              <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700">
                <CheckCircle className="w-4 h-4 shrink-0" />
                {manageMsg}
                <button onClick={() => setManageStatus("idle")} className="ml-auto text-emerald-400 hover:text-emerald-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            {manageStatus === "error" && (
              <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {manageMsg}
                <button onClick={() => setManageStatus("idle")} className="ml-auto text-red-400 hover:text-red-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {loadingEdit && (
              <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                Chargement du contenu…
              </div>
            )}

            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">
                {initialPosts.length} article{initialPosts.length > 1 ? "s" : ""} publiés — liste issue du dernier déploiement.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[var(--color-rhone)] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Rafraîchir
              </button>
            </div>

            <ArticleList
              posts={initialPosts}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
}
