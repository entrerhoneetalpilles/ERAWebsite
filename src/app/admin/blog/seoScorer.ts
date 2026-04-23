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

  // New checks
  const first100Words = content.trim().split(/\s+/).slice(0, 100).join(" ").toLowerCase();
  const keywordInFirst100 = LOCAL_KEYWORDS.some((kw) => first100Words.includes(kw));

  const h2Lines = content.split("\n").filter((line) => line.startsWith("## "));
  const keywordInH2 = h2Lines.some((line) => {
    const lower = line.toLowerCase();
    return LOCAL_KEYWORDS.some((kw) => lower.includes(kw));
  });

  const hasImage = /\/images\/blog\//.test(content) || /!\[/.test(content);

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

  // New scoring
  if (keywordInFirst100) score += 4;
  else tip = (tip || "") + " Glisse un mot-clé local dans les 100 premiers mots.";

  if (keywordInH2) score += 3;
  else tip = (tip || "") + " Inclus un mot-clé local dans au moins un H2.";

  if (hasImage) score += 3;
  else tip = (tip || "") + " Ajoute une image (chemin /images/blog/ ou syntaxe ![…]).";

  const status = score >= 32 ? "good" : score >= 20 ? "warn" : "bad";
  return { label: "Contenu & structure", score, max: 40, tip: tip || "Excellent contenu !", status };
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

function scoreSlug(slug: string, title: string): SeoItem {
  const len = slug.length;
  const hasLocal = LOCAL_KEYWORDS.some((kw) =>
    slug.toLowerCase().replace(/-/g, " ").includes(kw.replace(/-/g, " "))
  );
  const isClean = /^[a-z0-9-]+$/.test(slug);
  const noDouble = !/-{2,}/.test(slug);

  // Slug coherence with title: slug shares ≥2 words (length>3) with title after normalization
  const normalizeToWords = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").split(/[-\s]+/).filter((w) => w.length > 3);
  const slugWords = new Set(normalizeToWords(slug));
  const titleWords = normalizeToWords(title);
  const sharedWords = titleWords.filter((w) => slugWords.has(w));
  const slugCoherent = sharedWords.length >= 2;

  let score = 0;
  let tip = "";

  if (len >= 20 && len <= 60) score += 2; else tip = "URL idéale : 20-60 caractères.";
  if (hasLocal) score += 2; else tip = (tip || "") + " Ajoute un mot-clé local dans l'URL.";
  if (isClean && noDouble) score += 2;
  else tip = (tip || "") + " L'URL doit être en minuscules sans caractères spéciaux.";
  if (slugCoherent) score += 2;
  else tip = (tip || "") + " L'URL devrait refléter le titre (partager ≥2 mots communs).";

  const status = score >= 6 ? "good" : score >= 3 ? "warn" : "bad";
  return { label: "URL (slug)", score, max: 8, tip: tip || "URL propre !", status };
}

function scoreReadability(content: string): SeoItem {
  let score = 0;
  const tips: string[] = [];

  // Keyword density: find the most used LOCAL_KEYWORD
  const lower = content.toLowerCase();
  const totalWords = countWords(content);

  let bestKw = "";
  let bestCount = 0;
  for (const kw of LOCAL_KEYWORDS) {
    // Count non-overlapping occurrences
    let count = 0;
    let pos = 0;
    while ((pos = lower.indexOf(kw, pos)) !== -1) {
      count++;
      pos += kw.length;
    }
    if (count > bestCount) {
      bestCount = count;
      bestKw = kw;
    }
  }

  if (totalWords > 0 && bestKw) {
    const density = (bestCount / totalWords) * 100;
    if (density >= 1 && density <= 3) {
      score += 5;
    } else if (density > 3 && density <= 5) {
      score += 2;
      tips.push(`Densité de "${bestKw}" élevée (${density.toFixed(1)}% — idéal 1-3%).`);
    } else if (density < 1) {
      tips.push(`Densité de mots-clés trop faible (${density.toFixed(1)}% — vise 1-3%).`);
    } else {
      tips.push(`Sur-optimisation détectée : densité de "${bestKw}" = ${density.toFixed(1)}% (max 5%).`);
    }
  } else {
    tips.push("Aucun mot-clé local détecté dans le contenu.");
  }

  // Paragraph count: split by \n{2,} excluding headings
  const paragraphs = content.split(/\n{2,}/).filter((block) => {
    const trimmed = block.trim();
    return trimmed.length > 0 && !trimmed.startsWith("#");
  });
  const paraCount = paragraphs.length;
  if (paraCount >= 5) {
    score += 4;
  } else if (paraCount >= 3) {
    score += 2;
    tips.push(`Seulement ${paraCount} paragraphes — vise 5+ pour une bonne structure.`);
  } else {
    tips.push(`Trop peu de paragraphes (${paraCount}) — structure le contenu en blocs distincts.`);
  }

  // Average paragraph length
  if (paragraphs.length > 0) {
    const avgLen = paragraphs.reduce((sum, p) => sum + countWords(p), 0) / paragraphs.length;
    if (avgLen <= 80) {
      score += 3;
    } else if (avgLen <= 120) {
      score += 1;
      tips.push(`Paragraphes longs en moyenne (${Math.round(avgLen)} mots — idéal ≤80).`);
    } else {
      tips.push(`Paragraphes trop longs (moy. ${Math.round(avgLen)} mots) — découpe en blocs plus courts.`);
    }
  }

  // External authority link
  const hasExternalAuthority = /https?:\/\/(?!(?:www\.)?entre-rhone-alpilles\.fr)[^\s"'<>]+/.test(content);
  if (hasExternalAuthority) {
    score += 3;
  } else {
    tips.push("Ajoute un lien vers une source externe autoritaire (Wikipedia, source officielle…).");
  }

  const status = score >= 12 ? "good" : score >= 7 ? "warn" : "bad";
  return {
    label: "Lisibilité & densité",
    score,
    max: 15,
    tip: tips.length === 0 ? "Excellent équilibre de lisibilité !" : tips.join(" "),
    status,
  };
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
    scoreSlug(input.slug, input.title),
    scoreReadability(input.content),
  ];
  const total = items.reduce((s, i) => s + i.score, 0);
  const max = items.reduce((s, i) => s + i.max, 0);
  return { total, max, grade: toGrade((total / max) * 100), items };
}
