import type { MetadataRoute } from "next";
import { communes, propertyTypes, activityTags, blogPosts } from "@/lib/data";

const BASE = "https://entre-rhone-alpilles.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/conciergerie`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/conciergerie/comment-ca-marche`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/conciergerie/nos-services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/conciergerie/tarifs`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/conciergerie/estimer-mes-revenus`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE}/locations`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/locations/avec-piscine`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/destinations`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/avis`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE}/kit-media`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    // cgv, mentions-legales, politique-confidentialite sont noindex — ne pas inclure dans le sitemap
  ];

  const communeRoutes: MetadataRoute.Sitemap = communes.flatMap((c) => {
    const priority = c.circle === 1 ? 0.85 : c.circle === 2 ? 0.75 : 0.65;
    return [
      { url: `${BASE}/locations/${c.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority },
      { url: `${BASE}/destinations/${c.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: priority - 0.05 },
      { url: `${BASE}/conciergerie/${c.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: priority - 0.05 },
      ...c.propertyTypes.map((type) => ({
        url: `${BASE}/locations/${c.slug}/${type}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: priority - 0.1,
      })),
    ];
  });

  const communesAvecPiscine = communes.filter((c) => c.circle <= 2);
  const avecPiscineRoutes: MetadataRoute.Sitemap = communesAvecPiscine.map((c) => ({
    url: `${BASE}/locations/avec-piscine/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  // "avec-piscine" a sa propre page statique — on l'exclut des typeRoutes pour éviter le doublon
  const typeRoutes: MetadataRoute.Sitemap = [
    ...propertyTypes
      .filter((t) => t.slug !== "avec-piscine")
      .map((t) => ({
        url: `${BASE}/locations/${t.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.78,
      })),
    ...activityTags.map((t) => ({
      url: `${BASE}/locations/${t.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...communeRoutes,
    ...avecPiscineRoutes,
    ...typeRoutes,
    ...blogRoutes,
  ];
}
