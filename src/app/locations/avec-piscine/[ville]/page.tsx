import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Waves, ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import PropertyCard from "@/components/PropertyCard";
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
    title: `Location avec piscine ${commune.name}`,
    description: `Mas et villas avec piscine privée à ${commune.name}, Provence. Piscine chauffée disponible. Sélectionnés par ERA. Réservation directe.`,
    alternates: { canonical: `https://entre-rhone-alpilles.fr/locations/avec-piscine/${commune.slug}` },
    openGraph: {
      title: `Location avec Piscine ${commune.name} — Mas & Villas`,
      description: `Mas et villas avec piscine privée à ${commune.name}. Sélectionnés par Entre Rhône et Alpilles.`,
      url: `https://entre-rhone-alpilles.fr/locations/avec-piscine/${commune.slug}`,
      images: OG_IMG,
    },
  };
}

export default async function AvecPiscineVillePage({ params }: Props) {
  const { ville } = await params;
  const commune = getCommuneBySlug(ville);
  if (!commune) notFound();

  const mockProperties = [
    { title: `Mas avec piscine — ${commune.name}`, location: commune.name, type: "Mas", guests: 8, price: 290, rating: 4.9, reviewCount: 28, hasPiscine: true, slug: `mas-piscine-${ville}`, featured: true },
    { title: `Villa piscine chauffée — ${commune.name}`, location: commune.name, type: "Villa", guests: 6, price: 250, rating: 4.8, reviewCount: 21, hasPiscine: true, slug: `villa-piscine-${ville}` },
    { title: `Bastide piscine panoramique — ${commune.name}`, location: commune.name, type: "Bastide", guests: 10, price: 420, rating: 5.0, reviewCount: 12, hasPiscine: true, slug: `bastide-piscine-${ville}` },
  ];

  const faqItems = [
    {
      question: `Y a-t-il des locations avec piscine chauffée à ${commune.name} ?`,
      answer: `Oui, plusieurs de nos biens à ${commune.name} proposent une piscine chauffée, disponible de mai à octobre. La disponibilité de la chauffe est précisée sur chaque annonce.`,
    },
    {
      question: `Quel est le prix d'une location avec piscine à ${commune.name} ?`,
      answer: `Comptez entre 200€ et 650€ par nuit pour une location avec piscine à ${commune.name}, selon la capacité, le standing et la saison. Les tarifs les plus attractifs sont en mai, juin et septembre.`,
    },
    {
      question: `La piscine est-elle privée à ${commune.name} ?`,
      answer: `Oui, toutes nos locations à ${commune.name} disposent d'une piscine privée, exclusivement réservée aux occupants du bien. Aucun partage avec d'autres vacanciers.`,
    },
  ];

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Location avec piscine à ${commune.name}`,
    description: `Mas et villas avec piscine privée à ${commune.name} en Provence`,
    url: `https://entre-rhone-alpilles.fr/locations/avec-piscine/${ville}`,
    numberOfItems: mockProperties.length,
    itemListElement: mockProperties.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "LodgingBusiness", name: p.title, address: { "@type": "PostalAddress", addressLocality: commune.name, addressCountry: "FR" } },
    })),
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
              {commune.description} Profitez d'une piscine privée dans un cadre provençal exceptionnel.
            </p>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {mockProperties.map((p) => <PropertyCard key={p.slug} {...p} href={`/locations/${commune.slug}`} />)}
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href={`/locations/${commune.slug}`} className="inline-flex items-center gap-1.5 text-[var(--color-rhone)] font-semibold hover:opacity-80 transition-opacity">
              ← Tous les hébergements à {commune.name}
            </Link>
            <Link href="/locations/avec-piscine" className="inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:opacity-80 transition-opacity">
              Toutes les locations avec piscine <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-cream)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Louer un hébergement avec piscine à {commune.name}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed mb-12">
            <p>
              {commune.description} Louer un hébergement avec piscine privée à {commune.name} vous
              garantit une détente optimale, loin des piscines collectives — idéal pour des vacances
              en famille, en couple ou entre amis sous le soleil provençal.
            </p>
            <p>
              Notre sélection de mas et villas avec piscine à {commune.name} est gérée directement
              par notre équipe conciergerie locale. Chaque bien bénéficie d&apos;un accueil personnalisé,
              de recommandations d&apos;adresses locales et d&apos;une assistance disponible 7 jours sur 7.
            </p>
            <p>
              <strong>Atout de {commune.name} :</strong> {commune.atout}
            </p>
          </div>
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">FAQ — Piscine à {commune.name}</h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </div>
  );
}
