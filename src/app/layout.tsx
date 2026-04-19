import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://entre-rhone-alpilles.fr"),
  title: {
    default:
      "Conciergerie Airbnb en Provence — Entre Rhône et Alpilles",
    template: "%s — Entre Rhône et Alpilles",
  },
  description:
    "Conciergerie de locations saisonnières haut de gamme entre le Rhône et les Alpilles. Délégation totale, maximisation des revenus, zéro stress pour les propriétaires.",
  keywords: [
    "conciergerie airbnb provence",
    "gestion locative courte durée",
    "location saisonnière alpilles",
    "conciergerie saint-rémy-de-provence",
    "gestion airbnb arles",
  ],
  authors: [{ name: "Entre Rhône et Alpilles" }],
  creator: "Entre Rhône et Alpilles",
  publisher: "Entre Rhône et Alpilles",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://entre-rhone-alpilles.fr",
    siteName: "Entre Rhône et Alpilles",
    title: "Conciergerie Airbnb en Provence — Entre Rhône et Alpilles",
    description:
      "Conciergerie de locations saisonnières haut de gamme entre le Rhône et les Alpilles.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Entre Rhône et Alpilles — Conciergerie Provence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Conciergerie Airbnb en Provence — Entre Rhône et Alpilles",
    description:
      "Conciergerie de locations saisonnières haut de gamme entre le Rhône et les Alpilles.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
