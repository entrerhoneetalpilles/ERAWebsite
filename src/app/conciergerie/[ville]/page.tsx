import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import FAQAccordion from "@/components/FAQAccordion";
import { communes, getCommuneBySlug } from "@/lib/data";

export async function generateStaticParams() {
  return communes.map((c) => ({ ville: c.slug }));
}

type Props = { params: Promise<{ ville: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville } = await params;
  const commune = getCommuneBySlug(ville);
  if (!commune) return {};
  return {
    title: `Conciergerie ${commune.name} — Gestion Locative`,
    description: `Conciergerie de location saisonnière à ${commune.name}. Gestion complète, tarification dynamique, maximisation des revenus. Devis gratuit.`,
    alternates: { canonical: `https://entre-rhone-alpilles.fr/conciergerie/${commune.slug}` },
    openGraph: {
      title: `Conciergerie ${commune.name} — Gestion Locative`,
      description: `Gestion locative complète à ${commune.name}. Tarification dynamique, maximisation des revenus. Devis gratuit.`,
      url: `https://entre-rhone-alpilles.fr/conciergerie/${commune.slug}`,
    },
  };
}

const services = ["Gestion annonces Airbnb & Booking", "Check-in/out personnalisé", "Ménage & linge hôtelier", "Tarification dynamique", "Communication voyageurs 24/7", "Rapport mensuel détaillé"];

export default async function ConciergerieVillePage({ params }: Props) {
  const { ville } = await params;
  const commune = getCommuneBySlug(ville);
  if (!commune) notFound();

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
              <p className="text-gray-600 leading-relaxed mb-6">
                {commune.description} Notre connaissance intime du marché locatif à {commune.name}
                nous permet d'optimiser chaque réservation et de maximiser votre taux d'occupation.
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
                  <span className="text-gray-600">Taux d'occupation moyen</span>
                  <span className="font-bold text-[var(--color-rhone)]">72–85%</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Prix moyen / nuit</span>
                  <span className="font-bold text-[var(--color-rhone)]">150–400€</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Haute saison</span>
                  <span className="font-bold text-[var(--color-rhone)]">Juin – Septembre</span>
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
