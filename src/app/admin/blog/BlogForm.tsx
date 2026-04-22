"use client";

import React from "react";

const CATEGORIES = [
  "Conseils propriétaires",
  "Guides de voyage",
  "Actualités région",
];

function slugify(str: string) {
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

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export interface FormValues {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  content: string;
}

interface Props {
  values: FormValues;
  onChange: (next: FormValues) => void;
  slugReadOnly?: boolean;
}

const inputCls =
  "w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-rhone)] bg-white transition";
const labelCls = "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1";

export default function BlogForm({ values, onChange, slugReadOnly = false }: Props) {
  function set<K extends keyof FormValues>(key: K, val: string) {
    const next: FormValues = { ...values, [key]: val };
    if (key === "title" && !slugReadOnly) {
      next.slug = slugify(val);
    }
    onChange(next);
  }

  const readTime = estimateReadTime(values.content);
  const wordCount = values.content.trim().split(/\s+/).filter(Boolean).length;
  const titleLen = values.title.length;
  const excerptLen = values.excerpt.length;

  return (
    <div className="space-y-5">
      {/* Titre */}
      <div>
        <label className={labelCls}>
          Titre de l&apos;article
          <span className={`ml-2 font-mono normal-case ${titleLen > 60 ? "text-red-500" : titleLen >= 50 ? "text-emerald-600" : "text-gray-400"}`}>
            {titleLen} car.
          </span>
        </label>
        <input
          type="text"
          className={inputCls}
          placeholder="Ex. : Location saisonnière en Provence : 7 conseils pour maximiser vos revenus"
          value={values.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => set("title", e.target.value)}
        />
      </div>

      {/* Slug */}
      <div>
        <label className={labelCls}>URL (slug)</label>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400 whitespace-nowrap">/blog/</span>
          <input
            type="text"
            className={slugReadOnly ? `${inputCls} bg-gray-50 text-gray-400 cursor-not-allowed` : inputCls}
            value={values.slug}
            readOnly={slugReadOnly}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => set("slug", e.target.value)}
          />
        </div>
        {slugReadOnly && (
          <p className="mt-1 text-xs text-amber-600">Le slug ne peut pas être modifié (URLs existantes).</p>
        )}
      </div>

      {/* Excerpt / meta description */}
      <div>
        <label className={labelCls}>
          Meta description / extrait
          <span className={`ml-2 font-mono normal-case ${excerptLen > 160 ? "text-red-500" : excerptLen >= 140 ? "text-emerald-600" : "text-gray-400"}`}>
            {excerptLen} car.
          </span>
        </label>
        <textarea
          rows={3}
          className={inputCls}
          placeholder="Résumé accrocheur de 140-160 caractères visible dans Google. Inclure une zone géographique et un verbe d'action."
          value={values.excerpt}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => set("excerpt", e.target.value)}
        />
      </div>

      {/* Catégorie + Date côte à côte */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Catégorie</label>
          <select
            className={inputCls}
            value={values.category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => set("category", e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Date de publication</label>
          <input
            type="date"
            className={inputCls}
            value={values.date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => set("date", e.target.value)}
          />
        </div>
      </div>

      {/* Image */}
      <div>
        <label className={labelCls}>Chemin de l&apos;image</label>
        <input
          type="text"
          className={inputCls}
          placeholder="/images/blog/mon-article-provence.jpg"
          value={values.image}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => set("image", e.target.value)}
        />
        <p className="mt-1 text-xs text-gray-400">
          Format recommandé : /images/blog/[slug].jpg — 1200×630px
        </p>
      </div>

      {/* Contenu */}
      <div>
        <label className={labelCls}>
          Contenu (Markdown)
          <span className={`ml-2 font-mono normal-case ${wordCount >= 900 ? "text-emerald-600" : wordCount >= 600 ? "text-yellow-600" : "text-red-500"}`}>
            {wordCount} mots · {readTime} min
          </span>
        </label>
        <textarea
          rows={18}
          className={`${inputCls} font-mono text-xs leading-relaxed`}
          placeholder={`## Introduction\n\nCommence par contextualiser pour la Provence / les Alpilles...\n\n## Section 1 — Titre avec mot-clé local\n\nContenu riche, 900+ mots au total pour dominer en SEO local.\n\n## Conclusion\n\nAppel à l'action vers Entre Rhône et Alpilles.`}
          value={values.content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => set("content", e.target.value)}
        />
        <p className="mt-1 text-xs text-gray-400">
          Utilise ## pour les titres, **texte** pour le gras. Vise 900+ mots pour dominer les résultats locaux.
        </p>
      </div>
    </div>
  );
}
