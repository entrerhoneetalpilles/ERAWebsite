import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GTM_ID = "GTM-WDCFVC9J";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-var",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://entre-rhone-alpilles.fr"),
  title: {
    default:
      "Conciergerie Location Saisonnière Provence | Alpilles, Arles, Eygalières",
    template: "%s — Entre Rhône et Alpilles",
  },
  description:
    "Conciergerie de locations saisonnières haut de gamme en Provence. Mas, villas, bastides entre Arles et Eygalières. Estimation gratuite en 2 min.",
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
    title: "Conciergerie Location Saisonnière Provence | Alpilles, Arles, Eygalières",
    description:
      "Conciergerie de locations saisonnières haut de gamme en Provence. Mas, villas, bastides entre Arles et Eygalières.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conciergerie Location Saisonnière Provence | Alpilles, Arles, Eygalières",
    description:
      "Conciergerie de locations saisonnières haut de gamme en Provence. Mas, villas, bastides entre Arles et Eygalières.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
      dir="ltr"
      className={`${cormorant.variable} ${dmSans.variable} h-full`}
    >
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
