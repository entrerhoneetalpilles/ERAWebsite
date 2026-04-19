import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/*?utm_*", "/*?ref=*"],
      },
    ],
    sitemap: "https://entre-rhone-alpilles.fr/sitemap.xml",
  };
}
