import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/static/",
          "/_next/data/",
          "/mentions-legales",
          "/politique-confidentialite",
          "/cgv",
          "/*?utm_*",
          "/*?ref=*",
        ],
      },
    ],
    sitemap: "https://entre-rhone-alpilles.fr/sitemap.xml",
  };
}
