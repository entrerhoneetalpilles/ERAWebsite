import type { Metadata } from "next";
import Link from "next/link";
import { OG_IMG } from "@/lib/og";

export const metadata: Metadata = {
  title: "Kit Média — Conciergerie Provence",
  description:
    "Kit média officiel d'Entre Rhône et Alpilles. Données audience, chiffres clés, opportunités de partenariat pour la presse, les partenaires et les annonceurs.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/kit-media" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Kit Média — Conciergerie Provence",
    description:
      "Données audience, services et opportunités de partenariat pour la conciergerie de référence en Provence.",
    url: "https://entre-rhone-alpilles.fr/kit-media",
    images: OG_IMG,
  },
};

const stats = [
  { value: "30+", label: "Biens gérés", sub: "Mas, villas, bastides, appartements" },
  { value: "4,7/5", label: "Note moyenne", sub: "40 avis propriétaires vérifiés" },
  { value: "20", label: "Communes couvertes", sub: "Entre le Rhône et les Alpilles" },
  { value: "85%", label: "Taux d'occupation", sub: "Moyenne annuelle du portfolio" },
];

const sections = [
  { num: "01", title: "Présentation", desc: "Notre histoire, notre positionnement, notre territoire." },
  { num: "02", title: "Audience", desc: "Propriétaires CSP+ et voyageurs haut de gamme — deux profils à forte intention." },
  { num: "03", title: "Services", desc: "Gestion locative totale, optimisation des revenus, conciergerie voyageurs." },
  { num: "04", title: "Territoire", desc: "Les 20 communes couvertes, de Saint-Rémy à Arles." },
  { num: "05", title: "Données qualifiées", desc: "Profils détaillés, saisonnalité, panier moyen, durée de séjour." },
  { num: "06", title: "Partenariats", desc: "Échanges de liens, articles invités, services locaux, affiliation." },
];

export default function KitMediaPage() {
  return (
    <div className="pt-20 bg-[var(--color-cream)] min-h-screen">

      {/* Hero */}
      <div className="bg-[var(--color-rhone-dark)] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gres-clair)] mb-6 font-medium">
            Presse · Partenaires · Annonceurs
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl font-light text-white leading-tight mb-4">
            Kit Média
          </h1>
          <p className="font-serif text-3xl font-light text-[var(--color-gres-moyen)] italic mb-8">
            Entre Rhône et Alpilles
          </p>
          <div className="w-12 h-px bg-[var(--color-sable)] mb-8" />
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mb-10">
            Toutes les données pour comprendre notre audience, notre territoire et nos
            opportunités de collaboration — en un seul document.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/kit-media-entre-rhone-alpilles.html"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-sable)] text-white text-sm font-medium rounded-md hover:bg-[var(--color-or-dark)] transition-colors"
              style={{ letterSpacing: "0.06em" }}
            >
              Consulter le kit complet
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href="/kit-media-entre-rhone-alpilles.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 text-white text-sm font-medium rounded-md hover:bg-white/10 transition-colors"
              style={{ letterSpacing: "0.06em" }}
            >
              ⬇ Télécharger PDF
            </a>
          </div>
        </div>
      </div>

      {/* Chiffres clés */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sable)] font-medium mb-3">
          Chiffres clés
        </p>
        <h2 className="font-serif text-3xl font-light text-[var(--color-rhone-dark)] mb-10">
          La conciergerie de référence en Provence
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-gres-clair)]/30">
          {stats.map((s) => (
            <div key={s.label} className="bg-white p-8">
              <div className="font-serif text-4xl font-light text-[var(--color-rhone-dark)] leading-none mb-1">
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-[0.15em] text-[var(--color-sable)] font-medium mt-2 mb-1">
                {s.label}
              </div>
              <div className="text-xs text-[var(--texte-discret)] leading-snug">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contenu du kit */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sable)] font-medium mb-3">
          Sommaire
        </p>
        <h2 className="font-serif text-3xl font-light text-[var(--color-rhone-dark)] mb-10">
          Ce que contient le kit
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-gres-clair)]/30">
          {sections.map((s) => (
            <div key={s.num} className="bg-white p-8 group">
              <div
                className="w-8 h-0.5 mb-5"
                style={{ background: "var(--color-sable)" }}
              />
              <div className="text-xs text-[var(--texte-discret)] tracking-[0.2em] uppercase mb-2">
                {s.num}
              </div>
              <h3 className="font-serif text-xl font-light text-[var(--color-rhone-dark)] mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-[var(--texte-leger)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA contact */}
      <div
        className="border-t"
        style={{ borderColor: "var(--color-gres-clair)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-2xl font-light text-[var(--color-rhone-dark)] mb-2">
              Une proposition de partenariat ?
            </h2>
            <p className="text-sm text-[var(--texte-leger)]">
              Contactez-nous pour toute collaboration éditoriale, échange de liens ou partenariat service.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[var(--color-rhone)] text-white text-sm font-medium rounded-md hover:bg-[var(--color-rhone-dark)] transition-colors"
              style={{ letterSpacing: "0.05em" }}
            >
              Nous contacter
            </Link>
            <a
              href="/kit-media-entre-rhone-alpilles.html"
              className="px-6 py-3 border border-[var(--color-gres-moyen)] text-[var(--texte-corps)] text-sm font-medium rounded-md hover:border-[var(--color-rhone)] hover:text-[var(--color-rhone)] transition-colors"
              style={{ letterSpacing: "0.05em" }}
            >
              Voir le kit complet
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
