import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import FAQAccordion from "@/components/FAQAccordion";
import { communes, getCommuneBySlug } from "@/lib/data";
import { OG_IMG } from "@/lib/og";

export async function generateStaticParams() {
  return communes.map((c) => ({ ville: c.slug }));
}

type Props = { params: Promise<{ ville: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville } = await params;
  const commune = getCommuneBySlug(ville);
  if (!commune) return {};
  return {
    title: `Conciergerie ${commune.name}`,
    description: `Conciergerie de location saisonnière à ${commune.name}. Gestion complète, tarification dynamique, maximisation des revenus. Devis gratuit.`,
    alternates: { canonical: `https://entre-rhone-alpilles.fr/conciergerie/${commune.slug}` },
    openGraph: {
      title: `Conciergerie ${commune.name} — Gestion Locative`,
      description: `Gestion locative complète à ${commune.name}. Tarification dynamique, maximisation des revenus. Devis gratuit.`,
      url: `https://entre-rhone-alpilles.fr/conciergerie/${commune.slug}`,
      images: OG_IMG,
    },
  };
}

const services = ["Gestion annonces Airbnb & Booking", "Check-in/out personnalisé", "Ménage & linge hôtelier", "Tarification dynamique", "Communication voyageurs 24/7", "Rapport mensuel détaillé"];

const communeMarketData: Record<string, { tauxOccupation: string; prixNuit: string; hauteSaison: string; revenusMoyens: string }> = {
  "saint-remy-de-provence":  { tauxOccupation: "80–92%", prixNuit: "195–480 €", hauteSaison: "Avril – Octobre",   revenusMoyens: "25 000 – 55 000 €" },
  "les-baux-de-provence":    { tauxOccupation: "78–92%", prixNuit: "250–650 €", hauteSaison: "Avril – Novembre",  revenusMoyens: "30 000 – 70 000 €" },
  "maussane-les-alpilles":   { tauxOccupation: "78–88%", prixNuit: "180–390 €", hauteSaison: "Mai – Septembre",   revenusMoyens: "20 000 – 46 000 €" },
  "fontvieille":             { tauxOccupation: "75–85%", prixNuit: "155–330 €", hauteSaison: "Avril – Octobre",   revenusMoyens: "18 000 – 40 000 €" },
  "paradou":                 { tauxOccupation: "76–88%", prixNuit: "190–430 €", hauteSaison: "Mai – Octobre",     revenusMoyens: "20 000 – 48 000 €" },
  "villeneuve-les-avignon":  { tauxOccupation: "74–86%", prixNuit: "175–420 €", hauteSaison: "Juil. – Août",     revenusMoyens: "18 000 – 42 000 €" },
  "arles":                   { tauxOccupation: "75–88%", prixNuit: "135–350 €", hauteSaison: "Avril – Octobre",   revenusMoyens: "15 000 – 40 000 €" },
  "tarascon":                { tauxOccupation: "65–78%", prixNuit: "115–250 €", hauteSaison: "Juin – Août",       revenusMoyens: "12 000 – 28 000 €" },
  "boulbon":                 { tauxOccupation: "68–80%", prixNuit: "135–270 €", hauteSaison: "Mai – Septembre",   revenusMoyens: "13 000 – 30 000 €" },
  "graveson":                { tauxOccupation: "70–82%", prixNuit: "145–310 €", hauteSaison: "Juin – Septembre",  revenusMoyens: "15 000 – 35 000 €" },
  "barbentane":              { tauxOccupation: "68–80%", prixNuit: "145–295 €", hauteSaison: "Juin – Septembre",  revenusMoyens: "14 000 – 30 000 €" },
  "chateaurenard":           { tauxOccupation: "65–76%", prixNuit: "115–245 €", hauteSaison: "Juin – Août",       revenusMoyens: "11 000 – 25 000 €" },
  "saint-etienne-du-gres":   { tauxOccupation: "72–84%", prixNuit: "155–335 €", hauteSaison: "Mai – Octobre",    revenusMoyens: "15 000 – 36 000 €" },
  "eygalieres":              { tauxOccupation: "82–94%", prixNuit: "295–800 €", hauteSaison: "Avril – Novembre",  revenusMoyens: "35 000 – 80 000 €" },
  "aureille":                { tauxOccupation: "68–80%", prixNuit: "135–275 €", hauteSaison: "Mai – Octobre",     revenusMoyens: "13 000 – 30 000 €" },
  "mouries":                 { tauxOccupation: "70–82%", prixNuit: "155–320 €", hauteSaison: "Mai – Octobre",     revenusMoyens: "15 000 – 34 000 €" },
  "molleges":                { tauxOccupation: "65–76%", prixNuit: "125–255 €", hauteSaison: "Juin – Septembre",  revenusMoyens: "12 000 – 27 000 €" },
  "noves":                   { tauxOccupation: "65–76%", prixNuit: "125–255 €", hauteSaison: "Juin – Septembre",  revenusMoyens: "11 000 – 25 000 €" },
  "verquieres":              { tauxOccupation: "62–74%", prixNuit: "115–235 €", hauteSaison: "Juin – Août",       revenusMoyens: "10 000 – 22 000 €" },
  "orgon":                   { tauxOccupation: "66–78%", prixNuit: "130–265 €", hauteSaison: "Mai – Septembre",   revenusMoyens: "12 000 – 28 000 €" },
};
const defaultMarket = { tauxOccupation: "70–82%", prixNuit: "140–320 €", hauteSaison: "Juin – Septembre", revenusMoyens: "13 000 – 32 000 €" };

export default async function ConciergerieVillePage({ params }: Props) {
  const { ville } = await params;
  const commune = getCommuneBySlug(ville);
  if (!commune) notFound();

  const market = communeMarketData[commune.slug] ?? defaultMarket;

  const faqItems = [
    {
      question: `Quelle est la commission pour un bien à ${commune.name} ?`,
      answer: `Notre commission à ${commune.name} est de 20 à 25% des revenus locatifs générés, tout compris. Pas de frais fixes ni d'engagement minimum.`,
    },
    {
      question: `Combien puis-je gagner avec ma location à ${commune.name} ?`,
      answer: `Le potentiel locatif à ${commune.name} varie selon le type de bien et sa capacité. En moyenne, nos propriétaires génèrent entre 15 000€ et 45 000€ par an. Utilisez notre simulateur pour une estimation personnalisée.`,
    },
    {
      question: `Gérez-vous les biens sur Airbnb et Booking à ${commune.name} ?`,
      answer: `Oui, nous gérons votre présence sur Airbnb, Booking.com, VRBO et votre site direct. La synchronisation des calendriers est automatique via notre channel manager.`,
    },
  ];

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Entre Rhône et Alpilles — Conciergerie ${commune.name}`,
    description: `Conciergerie de location saisonnière à ${commune.name}`,
    url: `https://entre-rhone-alpilles.fr/conciergerie/${commune.slug}`,
    geo: { "@type": "GeoCoordinates", latitude: commune.lat, longitude: commune.lng },
    areaServed: { "@type": "City", name: commune.name },
  };

  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Conciergerie", href: "/conciergerie" }, { label: commune.name }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Conciergerie Airbnb à {commune.name}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Vous êtes propriétaire à {commune.name} ? Notre équipe locale gère votre bien de A à Z
              pour maximiser vos revenus et vous libérer de toutes les contraintes.
            </p>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                Pourquoi confier votre bien à {commune.name} à ERA ?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {commune.description} Notre connaissance intime du marché locatif à {commune.name}
                nous permet d&apos;optimiser chaque réservation et de maximiser votre taux d&apos;occupation.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                La demande locative à {commune.name} est portée par une clientèle attirée par {commune.atout}.
                Notre tarification dynamique (PriceLabs) ajuste les prix chaque jour en fonction de la demande
                locale, des événements de la région et de la concurrence. Les propriétaires que nous gérons
                à {commune.name} génèrent en moyenne {market.revenusMoyens} par an selon le type et la
                capacité de leur bien.
              </p>
              <ul className="space-y-3 mb-8">
                {services.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[var(--color-alpilles)] flex-shrink-0" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
              <Link href="/conciergerie/estimer-mes-revenus"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-rhone)] text-white font-semibold rounded-xl hover:bg-[var(--color-rhone-light)] transition-colors">
                Estimer mes revenus à {commune.name}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="bg-[var(--color-cream)] rounded-2xl p-8">
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-6">Marché locatif à {commune.name}</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Taux d&apos;occupation moyen</span>
                  <span className="font-bold text-[var(--color-rhone)]">{market.tauxOccupation}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Prix moyen / nuit</span>
                  <span className="font-bold text-[var(--color-rhone)]">{market.prixNuit}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Haute saison</span>
                  <span className="font-bold text-[var(--color-rhone)]">{market.hauteSaison}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-600">Profil voyageurs</span>
                  <span className="font-bold text-[var(--color-rhone)] text-right max-w-[150px]">{commune.profilVoyageur}</span>
                </div>
              </div>
              <Link href="/contact"
                className="block mt-6 text-center px-6 py-3 border-2 border-[var(--color-rhone)] text-[var(--color-rhone)] font-semibold rounded-xl hover:bg-[var(--color-rhone)]/5 transition-colors">
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-cream)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">
            FAQ — Conciergerie à {commune.name}
          </h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </div>
  );
}
