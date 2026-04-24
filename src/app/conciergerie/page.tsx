import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, TrendingUp, Users, Wrench, Star, MapPin } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { OG_IMG } from "@/lib/og";
import { communes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Conciergerie & Gestion Locative Provence",
  description:
    "Déléguez la gestion locative de votre bien en Provence — Alpilles. Check-in, ménage, tarification dynamique, 85% d'occupation. Estimation gratuite en 2 min.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/conciergerie" },
  openGraph: {
    title: "Conciergerie & Gestion Locative Provence",
    description: "Déléguez la gestion locative de votre bien en Provence — Alpilles. Check-in, ménage, tarification dynamique, 85% d'occupation.",
    url: "https://entre-rhone-alpilles.fr/conciergerie",
    images: OG_IMG,
  },
};

const steps = [
  { num: "01", title: "Estimation gratuite", desc: "Nous évaluons le potentiel locatif de votre bien et vous proposons une fourchette de revenus réaliste basée sur les données du marché local." },
  { num: "02", title: "Onboarding & mise en ligne", desc: "Photos professionnelles, rédaction des annonces optimisées SEO, création ou optimisation de vos profils Airbnb, Booking.com et VRBO." },
  { num: "03", title: "Gestion complète", desc: "Check-in/out, ménage, linge de maison, communication 24/7 avec les voyageurs, maintenance, tarification dynamique quotidienne." },
];

const services = [
  { icon: <Users className="w-5 h-5" />, label: "Accueil personnalisé des voyageurs" },
  { icon: <Wrench className="w-5 h-5" />, label: "Ménage & linge hôtelier" },
  { icon: <TrendingUp className="w-5 h-5" />, label: "Tarification dynamique (PriceLabs)" },
  { icon: <Clock className="w-5 h-5" />, label: "Communication voyageurs 24/7" },
  { icon: <CheckCircle className="w-5 h-5" />, label: "Maintenance & urgences" },
  { icon: <Star className="w-5 h-5" />, label: "Optimisation des avis" },
];

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Entre Rhône et Alpilles — Conciergerie",
  description: "Service de conciergerie de locations saisonnières haut de gamme en Provence. Gestion complète : check-in/out, ménage, tarification dynamique, communication voyageurs.",
  url: "https://entre-rhone-alpilles.fr/conciergerie",
  telephone: "+33752907868",
  email: "contact@entre-rhone-alpilles.fr",
  serviceType: "Conciergerie de locations saisonnières",
  areaServed: [
    { "@type": "Place", name: "Alpilles, Provence-Alpes-Côte d'Azur" },
    { "@type": "Place", name: "Rhône, Provence" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Formules de conciergerie",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Formule Essentiel",
        description: "Gestion des réservations, check-in/out autonome, coordination ménage, communication voyageurs 7j/7, tableau de bord en ligne.",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "18",
          priceCurrency: "EUR",
          unitText: "% HT des revenus nets",
        },
      },
      {
        "@type": "Offer",
        name: "Formule Premium",
        description: "Tout Essentiel + photos pro, pricing dynamique PriceLabs, check-in présentiel, ménage inclus, linge hôtelier, assistance 24h/24.",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "22",
          priceCurrency: "EUR",
          unitText: "% HT des revenus nets",
        },
      },
      {
        "@type": "Offer",
        name: "Formule Prestige",
        description: "Tout Premium + gestionnaire dédié, traductions EN/NL, conciergerie voyageurs complète, gardiennage hors saison, panier bienvenue.",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "28",
          priceCurrency: "EUR",
          unitText: "% HT des revenus nets",
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    reviewCount: "40",
    bestRating: "5",
  },
};

export default function ConciergerieHubPage() {
  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Propriétaires & Conciergerie" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Conciergerie de locations<br />
              <span className="text-[var(--color-rhone)]">saisonnières en Provence</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Vous êtes propriétaire d&apos;un mas, d&apos;une villa ou d&apos;un appartement entre le Rhône et les Alpilles ? Déléguez la gestion à notre équipe locale et profitez de vos revenus locatifs sans les contraintes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/conciergerie/estimer-mes-revenus" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-rhone)] text-white font-semibold rounded-full hover:bg-[var(--color-rhone-light)] transition-colors">
                Estimer mes revenus <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/conciergerie/nos-services" className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-rhone)] text-[var(--color-rhone)] font-semibold rounded-full hover:bg-[var(--color-rhone)]/5 transition-colors">
                Voir nos services
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white" aria-labelledby="steps-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="steps-heading" className="font-serif text-3xl font-bold text-gray-900 mb-12 text-center">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="relative">
                <div className="w-14 h-14 rounded-full bg-[var(--color-rhone)] text-white flex items-center justify-center font-serif text-2xl font-bold mb-6">{s.num}</div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/conciergerie/comment-ca-marche" className="inline-flex items-center gap-1.5 text-[var(--color-rhone)] font-semibold hover:text-[var(--color-rhone-light)] transition-colors">
              En savoir plus <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--color-cream)]" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="services-heading" className="font-serif text-3xl font-bold text-gray-900 mb-6">Tout est inclus dans notre service</h2>
              <p className="text-gray-600 leading-relaxed mb-8">De la mise en ligne de votre annonce à la remise des clés, notre équipe gère chaque détail pour vous offrir la sérénité totale.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((s) => (
                  <div key={s.label} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                    <span className="text-[var(--color-rhone)]">{s.icon}</span>
                    <span className="text-sm text-gray-700 font-medium">{s.label}</span>
                  </div>
                ))}
              </div>
              <Link href="/conciergerie/nos-services" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[var(--color-rhone)] text-white font-semibold rounded-full hover:bg-[var(--color-rhone-light)] transition-colors">
                Voir tous nos services <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="bg-[var(--color-rhone)] rounded-2xl p-8 text-white">
              <h3 className="font-serif text-2xl font-bold mb-6">Nos tarifs</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span>Essentiel</span>
                  <span className="font-bold text-[var(--color-or)]">18% HT</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span>Premium</span>
                  <span className="font-bold text-[var(--color-or)]">22% HT</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span>Prestige</span>
                  <span className="font-bold text-[var(--color-or)]">28% HT</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-white/80 text-sm">Vous percevez vos revenus directement — ERA facture séparément</span>
                </div>
              </div>
              <Link href="/conciergerie/tarifs" className="block text-center px-6 py-3 bg-[var(--color-or)] text-white font-semibold rounded-full hover:bg-[var(--color-or-light)] transition-colors">
                Voir le détail des tarifs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Une conciergerie ancrée dans les Alpilles</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Entre Rhône et Alpilles intervient exclusivement dans un périmètre géographique maîtrisé — de Saint-Rémy-de-Provence à Arles, d&apos;Eygalières à Fontvieille — pour garantir une réactivité terrain inégalée. Chaque bien bénéficie d&apos;un suivi individualisé, pas d&apos;une gestion industrielle à distance.
            </p>
            <p>
              Contrairement aux grandes plateformes nationales, notre équipe vit et travaille dans les Alpilles. Nous connaissons chaque artisan local, chaque spécificité du marché par commune et chaque période de demande intense — Feria d&apos;Arles, Rencontres Photo, marchés de Noël des Baux, transhumance de Saint-Rémy. Cette connaissance intime du terrain se traduit directement en revenus supplémentaires pour nos propriétaires.
            </p>
            <p>
              Nos propriétaires génèrent en moyenne entre 15 000 € et 45 000 € de revenus annuels selon la capacité et la localisation de leur bien. Le taux d&apos;occupation moyen de notre portefeuille atteint 78% sur l&apos;année, avec des pics à 95% en juillet-août.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/conciergerie/comment-ca-marche", label: "Comment ça marche", desc: "Notre processus en détail" },
              { href: "/conciergerie/nos-services", label: "Nos services", desc: "Tout ce que nous gérons" },
              { href: "/conciergerie/tarifs", label: "Tarifs", desc: "Transparents et sans surprise" },
              { href: "/conciergerie/estimer-mes-revenus", label: "Estimer mes revenus", desc: "Simulateur gratuit" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group p-5 rounded-xl border border-gray-100 hover:border-[var(--color-rhone)] hover:shadow-sm transition-all" title={l.label}>
                <p className="font-semibold text-gray-900 group-hover:text-[var(--color-rhone)] transition-colors mb-1">{l.label}</p>
                <p className="text-sm text-gray-500">{l.desc}</p>
                <ArrowRight className="w-4 h-4 text-[var(--color-rhone)] mt-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" aria-labelledby="zones-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <MapPin className="w-5 h-5 text-[var(--color-rhone)]" aria-hidden="true" />
            <h2 id="zones-heading" className="text-xl font-semibold text-gray-900">
              Nos zones d&apos;intervention
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {communes.map((c) => (
              <Link
                key={c.slug}
                href={`/conciergerie/${c.slug}`}
                className="group flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-100 hover:border-[var(--color-rhone)] hover:shadow-sm transition-all text-sm text-gray-700 hover:text-[var(--color-rhone)]"
                title={`Conciergerie à ${c.name}`}
              >
                <ArrowRight className="w-3.5 h-3.5 shrink-0 text-gray-300 group-hover:text-[var(--color-rhone)] transition-colors" aria-hidden="true" />
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
