import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Nos Services de Conciergerie — Entre Rhône et Alpilles",
  description: "Check-in/out, ménage, tarification dynamique, communication voyageurs, maintenance. Découvrez tous les services inclus dans notre conciergerie Provence.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/conciergerie/nos-services" },
};

const serviceGroups = [
  {
    title: "Accueil & Voyageurs",
    services: ["Check-in personnalisé en présentiel ou boîte à clés sécurisée", "Check-out et contrôle du bien", "Communication voyageurs 24/7 (délai de réponse < 1h)", "Guide de bienvenue personnalisé par bien", "Recommandations locales (restaurants, activités)", "Gestion des avis et réponses publiques"],
  },
  {
    title: "Entretien & Maintenance",
    services: ["Ménage professionnel après chaque séjour", "Linge hôtelier (draps, serviettes) fourni et entretenu", "Contrôle qualité photographique avant chaque arrivée", "Maintenance courante (ampoules, petites réparations)", "Réseau d'artisans locaux pour urgences", "Réapprovisionnement consommables (café, gel douche, etc.)"],
  },
  {
    title: "Optimisation & Revenus",
    services: ["Tarification dynamique quotidienne (PriceLabs)", "Gestion multi-plateformes (Airbnb, Booking, VRBO)", "Synchronisation des calendriers (channel manager)", "Optimisation des annonces (SEO, photos, titres)", "Analyse mensuelle des performances", "Rapport financier mensuel détaillé"],
  },
  {
    title: "Administratif & Légal",
    services: ["Vérification des assurances voyageurs", "Collecte et reversement de la taxe de séjour", "Contrats de location conformes à la législation", "Déclaration en mairie si requise", "Gestion des cautions (pré-autorisation Stripe)", "Factures et relevés pour votre comptabilité"],
  },
];

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Conciergerie de locations saisonnières en Provence",
  description: "Service complet de gestion locative courte durée pour propriétaires. Check-in/out, ménage, tarification dynamique, communication voyageurs, maintenance.",
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
        itemOffered: {
          "@type": "Service",
          name: s,
          serviceType: g.title,
        },
      }))
    ),
  },
};

export default function NosServicesPage() {
  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Conciergerie", href: "/conciergerie" }, { label: "Nos services" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Nos services de conciergerie</h1>
            <p className="text-xl text-gray-600 leading-relaxed">Une gestion complète de A à Z pour que vous n&apos;ayez plus à vous soucier de rien. Tout est inclus dans notre commission.</p>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceGroups.map((group) => (
              <div key={group.title} className="bg-[var(--color-cream)] rounded-2xl p-8">
                <h2 className="font-serif text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">{group.title}</h2>
                <ul className="space-y-3">
                  {group.services.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
                      <span className="text-[var(--color-alpilles)] font-bold mt-0.5 flex-shrink-0">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-[var(--color-rhone)] rounded-2xl p-8 text-white text-center">
            <h2 className="font-serif text-2xl font-bold mb-4">Tout cela pour seulement 20 à 25% de commission</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">Pas de frais cachés, pas d&apos;engagement minimum. Vous ne payez que sur vos revenus réels.</p>
            <Link href="/conciergerie/estimer-mes-revenus" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-or)] text-white font-bold rounded-xl hover:bg-[var(--color-or-light)] transition-colors">
              Estimer mes revenus <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
