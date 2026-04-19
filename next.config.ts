import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/locations/saint-remy", destination: "/locations/saint-remy-de-provence", permanent: true },
      { source: "/locations/les-baux", destination: "/locations/les-baux-de-provence", permanent: true },
      { source: "/destinations/saint-remy", destination: "/destinations/saint-remy-de-provence", permanent: true },
      { source: "/destinations/les-baux", destination: "/destinations/les-baux-de-provence", permanent: true },
      { source: "/conciergerie/services", destination: "/conciergerie/nos-services", permanent: true },
      { source: "/conciergerie/estimer", destination: "/conciergerie/estimer-mes-revenus", permanent: true },
    ];
  },
};

export default nextConfig;
