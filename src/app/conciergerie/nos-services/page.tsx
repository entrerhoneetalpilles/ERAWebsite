import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { OG_IMG } from "@/lib/og";

export const metadata: Metadata = {
  title: "Nos services de conciergerie en Provence",
  description:
    "Check-in/out, ménage, tarification dynamique IA, communication voyageurs 24h/24, déclarations légales. 3 formules de gestion locative courte durée en Provence.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/conciergerie/nos-services" },
  openGraph: {
    title: "Nos services de conciergerie en Provence",
    description: "Check-in/out, ménage, tarification dynamique IA, maintenance. 3 formules de gestion locative courte durée en Provence.",
    url: "https://entre-rhone-alpilles.fr/conciergerie/nos-services",
    images: OG_IMG,
  },
};

const serviceGroups = [
  {
    title: "Accueil & Voyageurs",
    services: [
      "Check-in personnalisé en présentiel ou boîte à clés sécurisée",
      "Check-out et contrôle du bien",
      "Communication voyageurs 7j/7 (délai < 1h) ou 24h/24 (Premium+)",
      "Guide de bienvenue numérique personnalisé par bien",
      "Recommandations locales (restaurants, activités, bonnes adresses)",
      "Gestion des avis et réponses publiques",
    ],
  },
  {
    title: "Entretien & Maintenance",
    services: [
      "Coordination ménage professionnel après chaque séjour",
      "Linge hôtelier (draps, serviettes, housses) géré et blanchi — Premium+",
      "Contrôle qualité photographique avant chaque arrivée",
      "Maintenance courante et signalement incidents",
      "Réseau d'artisans locaux pour urgences",
      "Réapprovisionnement consommables (café, gel douche…) — Premium+",
    ],
  },
  {
    title: "Optimisation & Revenus",
    services: [
      "Tarification dynamique quotidienne par IA (PriceLabs / Beyond) — Premium+",
      "Gestion multi-plateformes (Airbnb, Booking.com, Abritel/VRBO)",
      "Synchronisation des calendriers via channel manager",
      "Création et optimisation des annonces (photos, titres, SEO)",
      "Analyse mensuelle des performances et rapport financier",
      "Tableau de bord propriétaire en ligne",
    ],
  },
  {
    title: "Administratif & Légal",
    services: [
      "Collecte et reversement de la taxe de séjour",
      "Contrats de location conformes à la législation",
      "Déclaration en mairie si requise",
      "Gestion des cautions (pré-autorisation Stripe)",
      "Factures et relevés pour votre comptabilité",
      "Vérification des assurances voyageurs",
    ],
  },
];

const formulas = [
  {
    id: "essentiel",
    label: "Essentiel",
    rate: "18% HT",
    pitch: "Gestion essentielle",
    target: "Studio, T2, maison de village · ≤ 4 couchages",
    highlights: [
      "Annonces multi-plateformes",
      "Check-in autonome (boîte à clés)",
      "Gestion messages & réservations",
      "Tarification manuelle",
      "Relevé mensuel des revenus",
    ],
    highlighted: false,
  },
  {
    id: "premium",
    label: "Premium",
    rate: "22% HT",
    pitch: "Full service, délégation totale",
    target: "Mas, villa, gîte · 4–8 couchages",
    highlights: [
      "Tout Essentiel +",
      "Pricing dynamique IA (PriceLabs)",
      "Check-in présentiel inclus",
      "Ménage & linge inclus dans la commission",
      "Assistance voyageurs 24h/24",
      "Photos professionnelles offertes",
    ],
    highlighted: true,
    badge: "70% de nos propriétaires",
  },
  {
    id: "prestige",
    label: "Prestige",
    rate: "28% HT",
    pitch: "Expérience haut de gamme",
    target: "Villa luxe, bastide, domaine · 8+ couchages",
    highlights: [
      "Tout Premium +",
      "Gestionnaire dédié (interlocuteur unique)",
      "Panier de bienvenue produits locaux",
      "Réservations restaurants & billets",
      "Traduction annonces EN + NL",
      "Gardiennage hors saison",
    ],
    highlighted: false,
  },
];

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Conciergerie de locations saisonnières en Provence",
  description: "Service complet de gestion locative courte durée pour propriétaires. Check-in/out, ménage, tarification dynamique IA, communication voyageurs, maintenance. 3 formules : Essentiel 18% HT, Premium 22% HT, Prestige 28% HT.",
  serviceType: "Property Management / Conciergerie Airbnb",
  provider: {
    "@type": "Organization",
    name: "Entre Rhône et Alpilles",
    url: "https://entre-rhone-alpilles.fr",
  },
  areaServed: { "@type": "Place", name: "Provence — Alpilles & Rhône" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services de conciergerie inclus",
    itemListElement: serviceGroups.flatMap((g, gi) =>
      g.services.map((s, si) => ({
        "@type": "Offer",
        position: gi * 10 + si + 1,
        itemOffered: { "@type": "Service", name: s, serviceType: g.title },
      }))
    ),
  },
};

export default function NosServicesPage() {
  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      {/* Hero */}
      <div className="bg-[var(--color-cream)] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Conciergerie", href: "/conciergerie" }, { label: "Nos services" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] mb-4" style={{ color: "var(--color-rhone)" }}>
              Ce qui est inclus
            </p>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-[var(--color-encre)] mb-5">
              Nos services de conciergerie
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--texte-leger)" }}>
              Une gestion complète de A à Z, calibrée sur votre bien et vos objectifs. Tout est inclus dans votre formule — aucun frais caché.
            </p>
          </div>
        </div>
      </div>

      {/* Détail des services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceGroups.map((group) => (
              <div
                key={group.title}
                className="bg-[var(--color-cream)] rounded-xl p-8 border"
                style={{ borderColor: "var(--color-gres-clair)" }}
              >
                <h2
                  className="font-serif font-normal text-xl text-[var(--color-encre)] mb-5 pb-4 border-b"
                  style={{ borderColor: "var(--color-gres-clair)" }}
                >
                  {group.title}
                </h2>
                <ul className="space-y-3">
                  {group.services.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "var(--texte-leger)" }}>
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[var(--color-rhone)]"
                        aria-hidden="true"
                      >
                        <polyline points="2,6 5,9 10,3" />
                      </svg>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-xs mt-6 text-center" style={{ color: "var(--texte-discret)" }}>
            Les mentions « Premium+ » indiquent des services disponibles à partir de la formule Premium.
          </p>
        </div>
      </section>

      {/* Aperçu des 3 formules */}
      <section className="py-20 bg-[var(--color-lin)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.2em] mb-4" style={{ color: "var(--color-rhone)" }}>
              Trois formules
            </p>
            <h2 className="font-serif font-normal text-3xl sm:text-4xl text-[var(--color-encre)] mb-4">
              Choisissez votre niveau de service
            </h2>
            <p style={{ color: "var(--texte-leger)" }}>
              Vous percevez vos revenus directement — ERA vous facture sa commission séparément chaque mois.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {formulas.map((f) => (
              <div
                key={f.id}
                className={`bg-white rounded-xl p-7 relative flex flex-col border-2 transition-shadow hover:shadow-md ${
                  f.highlighted ? "border-[var(--color-rhone)]" : ""
                }`}
                style={!f.highlighted ? { borderColor: "var(--color-gres-clair)" } : {}}
              >
                {f.badge && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-white text-xs font-medium rounded-full whitespace-nowrap"
                    style={{ background: "var(--color-rhone)" }}
                  >
                    {f.badge}
                  </span>
                )}

                <div className="mb-5">
                  <h3 className="font-serif font-normal text-xl text-[var(--color-encre)] mb-1">{f.label}</h3>
                  <p className="text-sm mb-3" style={{ color: "var(--texte-discret)" }}>{f.pitch}</p>
                  <p
                    className="text-3xl font-light font-serif"
                    style={{ color: f.highlighted ? "var(--color-rhone-dark)" : "var(--color-encre)" }}
                  >
                    {f.rate}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--texte-discret)" }}>{f.target}</p>
                </div>

                <ul className="space-y-2.5 flex-1 mb-6">
                  {f.highlights.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm" style={{ color: "var(--texte-leger)" }}>
                      <CheckCircle
                        className="w-4 h-4 flex-shrink-0 mt-0.5 text-[var(--color-rhone)]"
                        aria-hidden="true"
                      />
                      {s}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/conciergerie/tarifs"
                  className={`block text-center px-6 py-2.5 text-sm rounded-md transition-colors mt-auto ${
                    f.highlighted
                      ? "bg-[var(--color-rhone)] text-white hover:bg-[var(--color-rhone-dark)]"
                      : "border border-[var(--color-rhone)] text-[var(--color-rhone)] hover:bg-[var(--color-cream)]"
                  }`}
                >
                  Voir le détail
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/conciergerie/tarifs"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: "var(--color-rhone-dark)" }}
            >
              Comparer toutes les formules en détail <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#2A2520]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="w-10 h-px mx-auto mb-8"
            style={{ background: "var(--color-gres-moyen)", opacity: 0.5 }}
            aria-hidden="true"
          />
          <h2 className="font-serif font-light text-2xl sm:text-3xl text-white mb-4">
            Prêt à déléguer la gestion de votre bien ?
          </h2>
          <p className="mb-8 font-light" style={{ color: "rgba(255,255,255,0.55)" }}>
            Estimation gratuite · Réponse sous 24h · Aucun engagement initial
          </p>
          <Link
            href="/conciergerie/estimer-mes-revenus"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-rhone)] text-white rounded-md hover:bg-[var(--color-rhone-dark)] transition-colors"
          >
            Estimer mes revenus <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
