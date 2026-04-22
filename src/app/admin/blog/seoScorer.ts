"use client";

export interface SeoInput {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  category: string;
}

export interface SeoItem {
  label: string;
  score: number;
  max: number;
  tip: string;
  status: "good" | "warn" | "bad";
}

export interface SeoResult {
  total: number;
  max: number;
  grade: "S" | "A" | "B" | "C" | "D";
  items: SeoItem[];
}

const LOCAL_KEYWORDS = [
  "provence", "alpilles", "rhône", "arles", "saint-rémy", "saint-remy",
  "les baux", "maussane", "eygalières", "fontvieille", "paradou",
  "mouriès", "aureille", "avignon", "luberon", "camargue",
  "entre rhône et alpilles", "era", "conciergerie", "location saisonnière",
  "mas", "bastide", "gîte", "villa",
];

const POWER_WORDS = [
  "guide", "complet", "conseils", "meilleur", "top", "incontournable",
  "essentiel", "découvrir", "tout savoir", "rentabilité", "optimiser",
];

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function localKeywordCount(text: string): number {
  const lower = text.toLowerCase();
  return LOCAL_KEYWORDS.filter((kw) => lower.includes(kw)).length;
}

function scoreTitle(title: string): SeoItem {
  const len = title.length;
  const hasLocal = localKeywordCount(title) > 0;
  const hasPower = POWER_WORDS.some((w) => title.toLowerCase().includes(w));
  const lower = title.toLowerCase();
  const startsStrong =
    LOCAL_KEYWORDS.some((kw) => lower.startsWith(kw)) || /^[A-ZÀÂÉÈÊËÎÏÔÙÛÜÇ]/.test(title);

  let score = 0;
  let tip = "";

  if (len >= 50 && len <= 60) {
    score += 8;
  } else if (len >= 45 && len < 70) {
    score += 5;
    tip = len < 50 ? "Allonge un peu le titre (objectif 50-60 car.)" : "Raccourcis le titre (idéal < 60 car.)";
  } else {
    score += 2;
    tip = len < 45 ? "Titre trop court — vise 50-60 caractères." : "Titre trop long — risque de coupure dans Google.";
  }

  if (hasLocal) score += 8;
  else tip = (tip || "") + " Ajoute un lieu local (Provence, Alpilles, commune…).";

  if (hasPower) score += 4;

  if (!startsStrong) tip = (tip || "") + " Commence par un mot-clé fort.";

  const status = score >= 16 ? "good" : score >= 10 ? "warn" : "bad";
  return { label: "Titre SEO", score, max: 20, tip: tip || "Parfait !", status };
}

function scoreExcerpt(excerpt: string): SeoItem {
  const len = excerpt.length;
  const hasLocal = localKeywordCount(excerpt) > 0;
  const hasVerb = /découvr|appren|sav|optim|maximis|profite|rentabilis/i.test(excerpt);

  let score = 0;
  let tip = "";

  if (len >= 140 && len <= 160) {
    score += 10;
  } else if (len >= 120 && len <= 175) {
    score += 6;
    tip = len < 140 ? "Allonge la meta description (idéal 140-160 car.)" : "Raccourcis (Google coupe après ~160 car.)";
  } else {
    score += 2;
    tip = len < 120 ? "Trop courte — vise 140-160 caractères." : "Trop longue — sera tronquée dans Google.";
  }

  if (hasLocal) score += 6;
  else tip = (tip || "") + " Mentionne une zone locale.";

  if (hasVerb) score += 4;
  else tip = (tip || "") + " Ajoute un verbe d'action (découvrir, optimiser…).";

  const status = score >= 16 ? "good" : score >= 10 ? "warn" : "bad";
  return { label: "Meta description", score, max: 20, tip: tip || "Parfait !", status };
}

function scoreContent(content: string): SeoItem {
  const words = countWords(content);
  const localCount = localKeywordCount(content);
  const hasH2 = /^#{2}\s/m.test(content) || /\*\*[A-ZÀÂÉÈÊËÎÏÔÙÛÜ].{5,}\*\*/m.test(content);
  const hasInternalLink = /entre-rhone-alpilles\.fr|\/blog\/|\/locations\/|\/conciergerie/i.test(content);
  const hasCTA = /contactez|réservez|estimez|découvrez|appelez|contactez-nous/i.test(content);

  let score = 0;
  let tip = "";

  if (words >= 900) score += 12;
  else if (words >= 600) { score += 7; tip = `${words} mots — vise 900+ pour dominer en SEO local.`; }
  else { score += 2; tip = `Seulement ${words} mots — contenu trop court pour se positionner.`; }

  if (localCount >= 5) score += 8;
  else if (localCount >= 2) { score += 5; tip = (tip || "") + ` ${localCount} mots-clés locaux — vise 5+ (Provence, Alpilles, communes…).`; }
  else { score += 1; tip = (tip || "") + " Presque aucun mot-clé local — risque de ne pas se positionner."; }

  if (hasH2) score += 5;
  else tip = (tip || "") + " Structure avec des ## titres ou **titres gras**.";

  if (hasInternalLink) score += 3;
  else tip = (tip || "") + " Ajoute un lien interne vers le site.";

  if (hasCTA) score += 2;

  const status = score >= 24 ? "good" : score >= 15 ? "warn" : "bad";
  return { label: "Contenu & structure", score, max: 30, tip: tip || "Excellent contenu !", status };
}

function scoreLocalSeo(input: SeoInput): SeoItem {
  const fullText = [input.title, input.excerpt, input.content].join(" ").toLowerCase();

  const COMMUNES = [
    "saint-rémy", "saint-remy", "les baux", "arles", "maussane", "eygalières",
    "fontvieille", "paradou", "mouriès", "aureille", "avignon", "tarascon",
    "saint-martin-de-crau", "salon-de-provence",
  ];
  const communeHits = COMMUNES.filter((c) => fullText.includes(c)).length;

  const hasProvence = fullText.includes("provence");
  const hasAlpilles = fullText.includes("alpilles");
  const hasRhone = fullText.includes("rhône") || fullText.includes("rhone");
  const hasBrand =
    fullText.includes("entre rhône et alpilles") ||
    fullText.includes("entre rhone et alpilles") ||
    fullText.includes("conciergerie");
  const hasGeo = /bouches.du.rhône|gard|vaucluse|13\d{3}|30\d{3}/i.test(fullText);
  const hasSchema =
    /location saisonnière|airbnb|booking|conciergerie|gestion locative/i.test(fullText);

  let score = 0;
  let tips: string[] = [];

  if (hasProvence) score += 4; else tips.push("Mentionne 'Provence'.");
  if (hasAlpilles) score += 4; else tips.push("Mentionne 'Alpilles'.");
  if (hasRhone) score += 2; else tips.push("Mentionne 'Rhône'.");
  if (communeHits >= 2) score += 6;
  else if (communeHits === 1) { score += 3; tips.push("Cite au moins 2 communes des Alpilles."); }
  else tips.push("Cite au moins une commune (Saint-Rémy, Arles, Les Baux…).");
  if (hasBrand) score += 4;
  if (hasGeo) score += 2;
  if (hasSchema) score += 3;

  const status = score >= 20 ? "good" : score >= 13 ? "warn" : "bad";
  return {
    label: "SEO local Alpilles",
    score,
    max: 25,
    tip: tips.length === 0 ? "Maillage local excellent !" : tips.join(" "),
    status,
  };
}

function scoreSlug(slug: string): SeoItem {
  const len = slug.length;
  const hasLocal = LOCAL_KEYWORDS.some((kw) =>
    slug.toLowerCase().replace(/-/g, " ").includes(kw.replace(/-/g, " "))
  );
  const isClean = /^[a-z0-9-]+$/.test(slug);
  const noDouble = !/-{2,}/.test(slug);

  let score = 0;
  let tip = "";

  if (len >= 20 && len <= 60) score += 2; else tip = "URL idéale : 20-60 caractères.";
  if (hasLocal) score += 1;
  if (isClean && noDouble) score += 2;
  else tip = (tip || "") + " L'URL doit être en minuscules sans caractères spéciaux.";

  const status = score >= 4 ? "good" : score >= 2 ? "warn" : "bad";
  return { label: "URL (slug)", score, max: 5, tip: tip || "URL propre !", status };
}

function toGrade(pct: number): SeoResult["grade"] {
  if (pct >= 90) return "S";
  if (pct >= 75) return "A";
  if (pct >= 58) return "B";
  if (pct >= 40) return "C";
  return "D";
}

export function computeSeoScore(input: SeoInput): SeoResult {
  const items = [
    scoreTitle(input.title),
    scoreExcerpt(input.excerpt),
    scoreContent(input.content),
    scoreLocalSeo(input),
    scoreSlug(input.slug),
  ];
  const total = items.reduce((s, i) => s + i.score, 0);
  const max = items.reduce((s, i) => s + i.max, 0);
  return { total, max, grade: toGrade((total / max) * 100), items };
}
