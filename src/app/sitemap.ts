import type { MetadataRoute } from "next";
import { communes, propertyTypes } from "@/lib/data";

const BASE = "https://entre-rhone-alpilles.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/conciergerie`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/conciergerie/comment-ca-marche`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/conciergerie/nos-services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/conciergerie/tarifs`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/conciergerie/estimer-mes-revenus`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/locations`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/destinations`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/avis`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const communeRoutes: MetadataRoute.Sitemap = communes.flatMap((c) => [
    { url: `${BASE}/locations/${c.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/destinations/${c.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/conciergerie/${c.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...c.propertyTypes.map((type) => ({
      url: `${BASE}/locations/${c.slug}/${type}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.65,
    })),
  ]);

  const typeRoutes: MetadataRoute.Sitemap = propertyTypes.map((t) => ({
    url: `${BASE}/locations/${t.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...communeRoutes, ...typeRoutes];
}
