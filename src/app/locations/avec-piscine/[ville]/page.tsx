import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Waves, ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import FAQAccordion from "@/components/FAQAccordion";
import { communes, getCommuneBySlug } from "@/lib/data";
import { OG_IMG } from "@/lib/og";

export async function generateStaticParams() {
  return communes.filter((c) => c.circle <= 2).map((c) => ({ ville: c.slug }));
}

type Props = { params: Promise<{ ville: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville } = await params;
  const commune = getCommuneBySlug(ville);
  if (!commune) return {};
  return {
    title: `Location avec Piscine ${commune.name} — Mas & Villas`,
    description: `Mas, villas et bastides avec piscine privée à ${commune.name} en Provence. ${commune.atout}. Sélectionnés et gérés par ERA, conciergerie locale.`,
    alternates: { canonical: `https://entre-rhone-alpilles.fr/locations/avec-piscine/${commune.slug}` },
    openGraph: {
      title: `Location avec Piscine ${commune.name} — Mas & Villas`,
      description: `Mas et villas avec piscine privée à ${commune.name}. ${commune.atout}. Sélectionnés par Entre Rhône et Alpilles.`,
      url: `https://entre-rhone-alpilles.fr/locations/avec-piscine/${commune.slug}`,
      images: OG_IMG,
    },
  };
}

export default async function AvecPiscineVillePage({ params }: Props) {
  const { ville } = await params;
  const commune = getCommuneBySlug(ville);
  if (!commune) notFound();

  const faqItems = [
    {
      question: `Y a-t-il des locations avec piscine chauffée à ${commune.name} ?`,
      answer: `Oui, plusieurs de nos biens à ${commune.name} proposent une piscine chauffée, disponible de mi-avril à octobre selon les équipements. La disponibilité de la chauffe et la période de mise en eau sont précisées lors de chaque demande. En juillet-août, l'eau atteint naturellement 27-30°C sans chauffe.`,
    },
    {
      question: `Quel est le prix d'une location avec piscine à ${commune.name} ?`,
      answer: `Les tarifs varient selon le type de bien, la capacité et la saison. À ${commune.name}, comptez généralement entre 200 € et 700 €/nuit pour un hébergement avec piscine privée. Nos prix sont plus attractifs en mai, juin et septembre — la haute saison (juillet-août) affiche les tarifs les plus élevés. Contactez-nous pour un devis personnalisé.`,
    },
    {
      question: `La piscine est-elle privée et exclusive à ${commune.name} ?`,
      answer: `Oui, toutes nos locations à ${commune.name} disposent d'une piscine privée, réservée exclusivement aux occupants du bien — aucun partage avec d'autres vacanciers. Nos piscines sont entretenues par des professionnels partenaires avant chaque arrivée pour garantir une eau cristalline.`,
    },
    {
      question: `Quand réserver une location avec piscine à ${commune.name} ?`,
      answer: `La haute saison (juillet-août) se réserve idéalement 3 à 6 mois à l'avance pour les meilleurs biens. Pour juin et septembre, 1 à 2 mois suffisent généralement. En dehors de la saison, les disponibilités sont plus larges. Contactez-nous dès que vos dates sont fixées pour éviter les déceptions.`,
    },
    {
      question: `Proposez-vous des mas ou bastides avec piscine et jardin à ${commune.name} ?`,
      answer: `Oui, notre portfolio à ${commune.name} inclut principalement des mas et bastides avec piscine privée et grand jardin — idéaux pour les familles et groupes d'amis. Certains biens disposent également d'un pool house, d'un jacuzzi ou d'un couloir de nage. Précisez vos critères dans votre demande pour que nous vous proposions la sélection la plus adaptée.`,
    },
  ];

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Location avec piscine à ${commune.name}`,
    description: `Mas, villas et bastides avec piscine privée à ${commune.name} en Provence`,
    url: `https://entre-rhone-alpilles.fr/locations/avec-piscine/${ville}`,
    numberOfItems: 3,
  };

  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="bg-gradient-to-br from-blue-50 to-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: "Locations", href: "/locations" },
            { label: "Avec piscine", href: "/locations/avec-piscine" },
            { label: commune.name },
          ]} />
          <div className="mt-8 max-w-3xl">
            <div className="flex items-center gap-2 text-blue-600 mb-4">
              <Waves className="w-5 h-5" aria-hidden="true" />
              <span className="text-sm font-semibold uppercase tracking-wider">Piscine privée · {commune.name}</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Location avec piscine à {commune.name}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {commune.description} Profitez d&apos;une piscine privée dans un cadre provençal exceptionnel,
              géré par notre conciergerie locale.
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-gray-900 mb-2">
                <Waves className="w-5 h-5 inline mr-2 text-blue-500" aria-hidden="true" />
                Voir les biens avec piscine disponibles à {commune.name}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Notre sélection de mas, villas et bastides avec piscine privée à {commune.name} évolue
                régulièrement. Contactez-nous pour les disponibilités actuelles et une proposition personnalisée.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-rhone)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--color-rhone-dark)] transition-colors whitespace-nowrap">
                Demander les disponibilités <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href={`/locations/${commune.slug}`}
                className="text-center text-sm text-[var(--color-rhone)] font-medium hover:underline underline-offset-2">
                ← Tous les hébergements à {commune.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu SEO */}
      <section className="py-16 bg-[var(--color-cream)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Louer avec piscine privée à {commune.name}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
            <p>
              {commune.description} Louer un hébergement avec piscine privée à {commune.name} vous
              garantit une détente optimale, loin des piscines collectives — idéal pour des vacances
              en famille, en couple ou entre amis sous le soleil provençal.
            </p>
            <p>
              Notre sélection de mas et villas avec piscine à {commune.name} est gérée directement
              par notre équipe de conciergerie locale. Le point fort de cette commune : <strong>{commune.atout}</strong>.
              La clientèle que nous accueillons ici est principalement composée de {commune.profilVoyageur.toLowerCase()}.
            </p>
            <p>
              Chaque bien avec piscine de notre portfolio bénéficie d&apos;un entretien professionnel
              avant chaque arrivée : mise en eau, vérification du traitement, nettoyage du bassin et
              des abords. Nos piscines sont conformes aux normes de sécurité françaises (alarme,
              barrière ou couverture selon les biens).
            </p>
            <p>
              La Provence connaît plus de 300 jours de soleil par an. La saison piscine s&apos;étend
              de mi-avril à mi-octobre, avec les mois de juin à septembre les plus ensoleillés.
              En juillet-août, l&apos;eau de piscine atteint naturellement 27 à 30°C sans chauffage.
              Le printemps (mai-juin) et le début d&apos;automne (septembre) offrent un excellent compromis :
              soleil, chaleur douce et tarifs plus attractifs qu&apos;en haute saison.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { emoji: "🌊", label: "Piscine privée", desc: "Aucun partage — exclusivité totale" },
              { emoji: "🌞", label: "Saison longue", desc: "Mi-avril à mi-octobre" },
              { emoji: "🏡", label: "Mas & bastides", desc: "Hébergements de caractère" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl p-5 text-center border border-gray-100">
                <div className="text-2xl mb-2" aria-hidden="true">{item.emoji}</div>
                <div className="font-semibold text-gray-900 text-sm">{item.label}</div>
                <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href={`/conciergerie/${commune.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-rhone)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-rhone-dark)] transition-colors">
              Conciergerie à {commune.name} <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/locations/avec-piscine"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-blue-300 text-blue-700 text-sm font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              <Waves className="w-4 h-4" aria-hidden="true" /> Toutes les piscines en Provence
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">
            FAQ — Piscine à {commune.name}
          </h2>
          <FAQAccordion items={faqItems} />
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={`/locations/${commune.slug}`}
              className="inline-flex items-center gap-1.5 text-[var(--color-rhone)] font-semibold hover:opacity-80 transition-opacity">
              ← Tous les hébergements à {commune.name}
            </Link>
            <Link href={`/destinations/${commune.slug}`}
              className="inline-flex items-center gap-1.5 text-[var(--color-alpilles)] font-semibold hover:opacity-80 transition-opacity">
              Guide de {commune.name} <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
