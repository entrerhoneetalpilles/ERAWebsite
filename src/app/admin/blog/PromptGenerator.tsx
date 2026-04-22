"use client";

import React, { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";

// ── Données statiques ────────────────────────────────────────────
const COMMUNES = [
  "Saint-Rémy-de-Provence", "Les Baux-de-Provence", "Maussane-les-Alpilles",
  "Fontvieille", "Paradou", "Mouriès", "Aureille", "Eygalières",
  "Orgon", "Arles", "Tarascon", "Saint-Martin-de-Crau",
  "Avignon", "Nîmes", "Salon-de-Provence", "Istres",
  "Villeneuve-lès-Avignon", "Saint-Gilles", "Aigues-Mortes",
];

const ARTICLE_TYPES = [
  { value: "guide-complet",  label: "Guide complet (pillar content)"     },
  { value: "conseils",       label: "Conseils pratiques (liste)"         },
  { value: "guide-voyage",   label: "Guide voyage / découverte"          },
  { value: "comparatif",     label: "Comparatif / classement"            },
  { value: "actualite",      label: "Actualité / tendance marché"        },
  { value: "faq",            label: "FAQ / questions fréquentes"         },
];

const AUDIENCES = [
  { value: "proprietaires",  label: "Propriétaires de biens locatifs"   },
  { value: "voyageurs",      label: "Voyageurs / touristes"              },
  { value: "investisseurs",  label: "Investisseurs immobiliers"          },
  { value: "generique",      label: "Grand public"                       },
];

const TONES = [
  { value: "expert",     label: "Expert & autoritaire"      },
  { value: "accessible", label: "Accessible & chaleureux"   },
  { value: "premium",    label: "Premium & raffiné"         },
];

const WORD_COUNTS = ["900", "1 200", "1 500", "2 000", "2 500"];

// ── Types ────────────────────────────────────────────────────────
interface PromptConfig {
  sujet: string;
  communes: string[];
  keywords: string;
  articleType: string;
  audience: string;
  tone: string;
  wordCount: string;
  hasCta: boolean;
  hasSchema: boolean;
}

const DEFAULT: PromptConfig = {
  sujet: "",
  communes: [],
  keywords: "",
  articleType: "guide-complet",
  audience: "proprietaires",
  tone: "expert",
  wordCount: "1 200",
  hasCta: true,
  hasSchema: true,
};

// ── Génération du prompt ─────────────────────────────────────────
function buildPrompt(cfg: PromptConfig): string {
  const communeList = cfg.communes.length > 0
    ? cfg.communes.join(", ")
    : "les Alpilles (Saint-Rémy-de-Provence, Les Baux, Maussane, Eygalières…)";

  const typeLabel = ARTICLE_TYPES.find((t) => t.value === cfg.articleType)?.label ?? cfg.articleType;
  const audienceLabel = AUDIENCES.find((a) => a.value === cfg.audience)?.label ?? cfg.audience;
  const toneLabel = TONES.find((t) => t.value === cfg.tone)?.label ?? cfg.tone;

  const keywordBlock = cfg.keywords.trim()
    ? `Mots-clés principaux à intégrer naturellement (densité 1-2 %) :\n${cfg.keywords.trim().split(/[,\n]+/).map((k) => `- ${k.trim()}`).join("\n")}\n\n`
    : "";

  const schemaBlock = cfg.hasSchema
    ? `\n\n---\n\n## Données structurées (JSON-LD)\n\nAprès le contenu principal, génère un bloc JSON-LD de type \`Article\` avec :\n- \`@type\`: "Article"\n- \`headline\`: le titre H1\n- \`author\`: { "@type": "Organization", "name": "Entre Rhône et Alpilles" }\n- \`publisher\`: { "@type": "Organization", "name": "Entre Rhône et Alpilles", "url": "https://entre-rhone-alpilles.fr" }\n- \`inLanguage\`: "fr-FR"\n- \`keywords\`: liste des mots-clés principaux\n\nFormate-le dans un bloc de code \`\`\`json`
    : "";

  const ctaBlock = cfg.hasCta
    ? `\n\n---\n\n## Appel à l'action final\n\nTermine l'article par un paragraphe de 3-4 lignes invitant le lecteur à contacter **Entre Rhône et Alpilles** — la conciergerie de référence pour la location saisonnière dans les Alpilles et le Rhône. Lien à mentionner : \`https://entre-rhone-alpilles.fr/contact\`. Ton naturel, pas de pushy sales.`
    : "";

  return `Tu es un expert SEO et rédacteur web spécialisé dans le tourisme et la location saisonnière en Provence. Tu rédiges pour **Entre Rhône et Alpilles** (ERA), une conciergerie haut de gamme basée dans les Alpilles (Bouches-du-Rhône, 13). L'objectif est de **dominer les résultats Google locaux** pour les requêtes liées à la location saisonnière, au tourisme et à la gestion locative dans cette zone géographique.

---

## Contexte de la marque

- **Nom** : Entre Rhône et Alpilles
- **Positionnement** : conciergerie premium pour propriétaires et voyageurs, zone Rhône–Alpilles–Camargue
- **Site** : https://entre-rhone-alpilles.fr
- **Ton global** : authentique, expert, ancré dans le territoire provençal
- **Langue** : français (français de France, vouvoiement si adresse au lecteur)

---

## Mission

Rédige un article de blog de type **${typeLabel}** destiné à **${audienceLabel}**.

**Sujet** : ${cfg.sujet || "(à définir selon le type choisi)"}
**Zone géographique ciblée** : ${communeList}
**Ton** : ${toneLabel}
**Longueur cible** : ${cfg.wordCount} mots minimum (hors JSON-LD)

${keywordBlock}---

## Règles SEO absolues

1. **H1 unique** en début d'article — entre 50 et 60 caractères — contient obligatoirement un lieu local (commune, Alpilles, Provence ou Rhône).
2. **H2 (##)** toutes les 200-300 mots environ — chaque H2 contient un mot-clé local ou de longue traîne.
3. **H3 (###)** pour les sous-sections si nécessaire.
4. Gras (**texte**) sur les termes importants (max 1-2 par paragraphe).
5. Paragraphes courts : 3-5 phrases maximum.
6. Mentionne **au moins 3 communes des Alpilles** de façon naturelle dans le corps du texte.
7. Intègre **"Provence"** et **"Alpilles"** au moins 4 fois chacun.
8. Inclure au moins **une référence à "Entre Rhône et Alpilles"** ou "ERA" dans le corps du texte (hors CTA).
9. Utilise des **listes à puces** (- item) pour les contenus énumératifs.
10. Pas de remplissage — chaque phrase apporte de la valeur.

---

## Structure attendue

\`\`\`markdown
# [Titre H1 — 50-60 car. — mot-clé local en tête]

[Introduction : 2-3 paragraphes — contextualise, pose le problème ou l'intérêt, accroche locale. Ne commence pas par "Dans cet article".]

## [H2 — Section 1]

[Contenu...]

## [H2 — Section 2]

[Contenu...]

## [H2 — Section 3]

[Contenu...]

[Continue selon le type d'article et la longueur cible]${ctaBlock}${schemaBlock}
\`\`\`

---

## Format de sortie

Retourne **uniquement** le contenu Markdown brut dans un seul bloc de code \`\`\`markdown. Aucun commentaire avant ou après. Pas de meta description séparée — elle sera extraite du premier paragraphe.`;
}

// ── UI ───────────────────────────────────────────────────────────
const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-rhone)] bg-white transition";
const labelCls = "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1";

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div
        className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-[var(--color-rhone)]" : "bg-gray-200"}`}
        onClick={() => onChange(!checked)}
      >
        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
      </div>
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

export default function PromptGenerator() {
  const [cfg, setCfg] = useState<PromptConfig>(DEFAULT);
  const [copied, setCopied] = useState(false);

  const prompt = buildPrompt(cfg);

  function set<K extends keyof PromptConfig>(key: K, val: PromptConfig[K]) {
    setCfg((prev: PromptConfig) => ({ ...prev, [key]: val }));
  }

  function toggleCommune(name: string) {
    setCfg((prev: PromptConfig) => ({
      ...prev,
      communes: prev.communes.includes(name)
        ? prev.communes.filter((c: string) => c !== name)
        : [...prev.communes, name],
    }));
  }

  function copyPrompt() {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* ── Panneau de configuration ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[var(--color-rhone)]" />
          <h2 className="font-semibold text-gray-800">Configurer l&apos;article</h2>
        </div>

        {/* Sujet */}
        <div>
          <label className={labelCls}>Sujet / angle de l&apos;article</label>
          <input
            type="text"
            className={inputCls}
            placeholder="Ex. : Rentabilité d'un mas aux Alpilles en location courte durée"
            value={cfg.sujet}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => set("sujet", e.target.value)}
          />
        </div>

        {/* Type d'article */}
        <div>
          <label className={labelCls}>Type d&apos;article</label>
          <select
            className={inputCls}
            value={cfg.articleType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => set("articleType", e.target.value)}
          >
            {ARTICLE_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>

        {/* Audience + Ton */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Audience cible</label>
            <select
              className={inputCls}
              value={cfg.audience}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => set("audience", e.target.value)}
            >
              {AUDIENCES.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Ton</label>
            <select
              className={inputCls}
              value={cfg.tone}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => set("tone", e.target.value)}
            >
              {TONES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
        </div>

        {/* Nombre de mots */}
        <div>
          <label className={labelCls}>Longueur cible</label>
          <div className="flex gap-2 flex-wrap">
            {WORD_COUNTS.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => set("wordCount", w)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  cfg.wordCount === w
                    ? "bg-[var(--color-rhone)] text-white"
                    : "border border-gray-200 text-gray-600 hover:border-[var(--color-rhone)]"
                }`}
              >
                {w} mots
              </button>
            ))}
          </div>
        </div>

        {/* Mots-clés */}
        <div>
          <label className={labelCls}>Mots-clés (un par ligne ou séparés par virgule)</label>
          <textarea
            rows={3}
            className={inputCls}
            placeholder={"location saisonnière Alpilles\nmas Provence\nconciergerie Saint-Rémy"}
            value={cfg.keywords}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => set("keywords", e.target.value)}
          />
        </div>

        {/* Communes */}
        <div>
          <label className={labelCls}>Communes ciblées (optionnel)</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {COMMUNES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleCommune(c)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  cfg.communes.includes(c)
                    ? "bg-[var(--color-rhone)] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3 pt-1">
          <Toggle
            checked={cfg.hasCta}
            onChange={(v) => set("hasCta", v)}
            label="Inclure un appel à l'action ERA en fin d'article"
          />
          <Toggle
            checked={cfg.hasSchema}
            onChange={(v) => set("hasSchema", v)}
            label="Demander le bloc JSON-LD (données structurées Article)"
          />
        </div>
      </div>

      {/* ── Prompt généré ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">Prompt généré</h2>
          <button
            onClick={copyPrompt}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              copied
                ? "bg-emerald-500 text-white"
                : "bg-[var(--color-rhone)] hover:bg-[var(--color-rhone-dark)] text-white"
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copié !" : "Copier le prompt"}
          </button>
        </div>

        <div className="flex-1 bg-gray-950 rounded-xl overflow-auto p-4">
          <pre className="text-gray-200 text-xs leading-relaxed whitespace-pre-wrap break-words font-mono">
            {prompt}
          </pre>
        </div>

        <div className="mt-4 p-3 bg-[#F5F0E8] rounded-xl text-xs text-gray-600 leading-relaxed">
          <span className="font-semibold text-[#6E8052]">Workflow :</span>{" "}
          Copie ce prompt → colle-le dans Claude ou ChatGPT → l&apos;IA génère le Markdown
          → copie le contenu dans l&apos;onglet <strong>Rédaction</strong> → le score SEO se met à jour en temps réel.
        </div>
      </div>
    </div>
  );
}
