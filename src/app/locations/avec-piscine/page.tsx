import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Waves } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import Breadcrumb from "@/components/Breadcrumb";
import FAQAccordion from "@/components/FAQAccordion";
import { communes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Location avec Piscine en Provence — Alpilles & Rhône",
  description:
    "Locations de vacances avec piscine privée en Provence : mas, villas et bastides entre le Rhône et les Alpilles. Piscine chauffée, vue Alpilles. Réservation directe.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/locations/avec-piscine" },
  keywords: ["location avec piscine provence", "villa piscine alpilles", "mas piscine saint-rémy", "location piscine privée provence"],
  openGraph: {
    title: "Location avec Piscine en Provence — Mas, Villas & Bastides",
    description: "Locations de vacances avec piscine privée en Provence : mas, villas et bastides entre le Rhône et les Alpilles. Piscine chauffée disponible.",
    url: "https://entre-rhone-alpilles.fr/locations/avec-piscine",
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Locations avec piscine en Provence — Entre Rhône et Alpilles",
  description: "Sélection de mas, villas et bastides avec piscine privée entre le Rhône et les Alpilles",
  url: "https://entre-rhone-alpilles.fr/locations/avec-piscine",
  numberOfItems: 6,
};

const featuredWithPiscine = [
  { title: "Mas des Oliviers — Piscine & Vue Alpilles", location: "Saint-Rémy-de-Provence", type: "Mas", guests: 8, price: 320, rating: 4.9, reviewCount: 47, hasPiscine: true, slug: "mas-des-oliviers-saint-remy", href: "/locations/saint-remy-de-provence", featured: true, image: "/images/properties/mas-piscine-aerien.jpg" },
  { title: "Villa Baux — Piscine Panoramique", location: "Les Baux-de-Provence", type: "Villa", guests: 6, price: 280, rating: 4.8, reviewCount: 31, hasPiscine: true, slug: "villa-baux-terrasse", href: "/locations/les-baux-de-provence", image: "/images/properties/villa-baux.jpg" },
  { title: "Mas Maussane — Piscine & Oliveraie", location: "Maussane-les-Alpilles", type: "Mas", guests: 10, price: 390, rating: 5.0, reviewCount: 22, hasPiscine: true, slug: "mas-maussane-alpilles", href: "/locations/maussane-les-alpilles", image: "/images/properties/mas-maussane.jpg" },
  { title: "Bastide Eygalières — Piscine Luxe", location: "Eygalières", type: "Bastide", guests: 12, price: 650, rating: 5.0, reviewCount: 14, hasPiscine: true, slug: "bastide-eygalieres-luxe", href: "/locations/eygalieres", image: "/images/properties/bastide-eygalieres.jpg" },
  { title: "Villa Graveson — Piscine Chauffée", location: "Graveson", type: "Villa", guests: 8, price: 270, rating: 4.8, reviewCount: 25, hasPiscine: true, slug: "villa-graveson-piscine", href: "/locations/graveson", image: "/images/properties/mas-piscine-jardin.jpg" },
  { title: "Mas Arles — Grande Piscine & Jardin", location: "Arles", type: "Mas", guests: 10, price: 310, rating: 4.7, reviewCount: 19, hasPiscine: true, slug: "mas-arles-piscine", href: "/locations/arles", image: "/images/properties/mas-saint-remy.jpg" },
];

const faqItems = [
  {
    question: "Les piscines sont-elles chauffées ?",
    answer: "La majorité de nos piscines sont chauffées de mi-avril à octobre. La période de chauffe est précisée sur chaque annonce. En juillet-août, l'eau atteint naturellement 27-30°C.",
  },
  {
    question: "Y a-t-il des règles de sécurité autour des piscines ?",
    answer: "Toutes nos piscines sont équipées de dispositifs de sécurité conformes à la réglementation française (alarme, barrière ou couverture). Les enfants doivent être surveillés en permanence.",
  },
  {
    question: "Puis-je filtrer par taille de piscine ?",
    answer: "Contactez-nous directement pour affiner votre recherche selon la taille ou les équipements de la piscine (couloir de nage, jacuzzi, plage, pool house).",
  },
  {
    question: "Quelle est la meilleure période pour louer avec piscine en Provence ?",
    answer: "De juin à septembre pour profiter pleinement de la piscine. Mai et octobre sont idéaux pour un séjour plus calme avec piscine chauffée et des prix plus attractifs.",
  },
];

const communesAvecPiscine = communes.filter((c) => c.circle <= 2);

export default function AvecPiscinePage() {
  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="bg-gradient-to-br from-blue-50 to-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Locations", href: "/locations" }, { label: "Avec piscine" }]} />
          <div className="mt-8 max-w-3xl">
            <div className="flex items-center gap-2 text-blue-600 mb-4">
              <Waves className="w-5 h-5" aria-hidden="true" />
              <span className="text-sm font-semibold uppercase tracking-wider">Piscine privée incluse</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Location avec piscine<br />
              <span className="text-[var(--color-rhone)]">en Provence — Alpilles & Rhône</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Mas provençaux, villas et bastides avec piscine privée. Plongez dans la Provence authentique,
              entre le Rhône et les Alpilles. Piscines chauffées disponibles de mai à octobre.
            </p>
          </div>
        </div>
      </div>

      {/* Biens avec piscine */}
      <section className="py-20 bg-white" aria-labelledby="piscine-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 id="piscine-heading" className="font-serif text-2xl font-bold text-gray-900">
              Nos hébergements avec piscine
            </h2>
            <span className="text-sm text-gray-500">Piscine privée · Sélection ERA</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredWithPiscine.map((p) => (
              <PropertyCard key={p.slug} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Par commune */}
      <section className="py-16 bg-[var(--color-cream)]" aria-labelledby="by-commune-piscine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="by-commune-piscine" className="font-serif text-2xl font-bold text-gray-900 mb-8">
            Locations avec piscine par commune
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {communesAvecPiscine.map((c) => (
              <Link key={c.slug} href={`/locations/avec-piscine/${c.slug}`}
                className="p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-300 hover:shadow-sm transition-all text-center group">
                <Waves className="w-4 h-4 text-blue-400 mx-auto mb-2" aria-hidden="true" />
                <p className="text-sm font-semibold text-gray-800 group-hover:text-[var(--color-rhone)] transition-colors leading-snug">{c.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contenu SEO */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Louer une villa ou un mas avec piscine en Provence
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
            <p>
              Entre le Rhône et les Alpilles, la Provence offre un cadre exceptionnel pour des vacances sous le soleil.
              Nos <strong>locations avec piscine privée</strong> vous permettent de profiter d'un espace bain de soleil exclusif,
              sans partager votre piscine avec d'autres vacanciers.
            </p>
            <p>
              De <strong>Saint-Rémy-de-Provence</strong> à <strong>Eygalières</strong>, en passant par <strong>Maussane-les-Alpilles</strong>,
              notre sélection comprend des mas authentiques, des villas contemporaines et des bastides historiques,
              tous dotés d'une piscine privée. Certains biens proposent également un jacuzzi, un pool house ou un couloir de nage.
            </p>
            <p>
              Notre service de conciergerie local assure la mise en eau et l'entretien de la piscine avant chaque arrivée.
              Le traitement est confié à des professionnels partenaires pour garantir une eau cristalline tout au long de votre séjour.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[var(--color-cream)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">
            Questions sur nos locations avec piscine
          </h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </div>
  );
}
