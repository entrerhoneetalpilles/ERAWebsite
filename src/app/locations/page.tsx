import type { Metadata } from "next";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import Breadcrumb from "@/components/Breadcrumb";
import { communes, propertyTypes, activityTags } from "@/lib/data";

export const metadata: Metadata = {
  title: "Locations de Vacances en Provence — Mas, Villas",
  description:
    "Hébergements de caractère entre le Rhône et les Alpilles : mas provençaux, villas avec piscine, bastides. 20 communes en Provence.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/locations" },
  openGraph: {
    title: "Locations de Vacances en Provence — Mas, Villas, Bastides",
    description: "Hébergements d'exception sélectionnés dans 20 communes entre le Rhône et les Alpilles.",
  },
};

const featuredProperties = [
  { title: "Mas des Oliviers — Vue Alpilles", location: "Saint-Rémy-de-Provence", type: "Mas", guests: 8, price: 320, rating: 4.9, reviewCount: 47, hasPiscine: true, slug: "mas-des-oliviers-saint-remy", href: "/locations/saint-remy-de-provence", image: "/images/properties/mas-des-oliviers.jpg" },
  { title: "Villa Baux — Terrasse panoramique", location: "Les Baux-de-Provence", type: "Villa", guests: 6, price: 280, rating: 4.8, reviewCount: 31, hasPiscine: true, slug: "villa-baux-terrasse", href: "/locations/les-baux-de-provence", image: "/images/properties/villa-baux.jpg" },
  { title: "Mas Maussane — Cœur des Alpilles", location: "Maussane-les-Alpilles", type: "Mas", guests: 10, price: 390, rating: 5.0, reviewCount: 22, hasPiscine: true, slug: "mas-maussane-alpilles", href: "/locations/maussane-les-alpilles", image: "/images/properties/mas-maussane.jpg" },
  { title: "Appartement du Théâtre — Arles", location: "Arles", type: "Appartement", guests: 4, price: 140, rating: 4.9, reviewCount: 58, hasPiscine: false, slug: "appartement-theatre-arles", href: "/locations/arles", image: "/images/properties/appartement-arles.jpg" },
  { title: "Bastide Eygalières — Luxe absolu", location: "Eygalières", type: "Bastide", guests: 12, price: 650, rating: 5.0, reviewCount: 14, hasPiscine: true, slug: "bastide-eygalieres-luxe", href: "/locations/eygalieres", image: "/images/properties/bastide-eygalieres.jpg" },
  { title: "Gîte Paradou — Oliviers centenaires", location: "Paradou", type: "Gîte", guests: 4, price: 165, rating: 4.8, reviewCount: 36, hasPiscine: false, slug: "gite-paradou-oliviers", href: "/locations/paradou", image: "/images/properties/gite-paradou.jpg" },
];

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Locations de vacances en Provence — Entre Rhône et Alpilles",
  description: "Mas provençaux, villas avec piscine, bastides et appartements de caractère dans 20 communes entre le Rhône et les Alpilles.",
  url: "https://entre-rhone-alpilles.fr/locations",
  numberOfItems: featuredProperties.length,
  itemListElement: featuredProperties.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "LodgingBusiness",
      name: p.title,
      address: { "@type": "PostalAddress", addressLocality: p.location, addressCountry: "FR" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviewCount, bestRating: 5 },
      priceRange: `${p.price}€/nuit`,
    },
  })),
};

export default function LocationsHubPage() {
  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Locations de vacances" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Locations de vacances<br />
              <span className="text-[var(--color-rhone)]">entre Rhône et Alpilles</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Mas provençaux, villas avec piscine, bastides et appartements de caractère. Des hébergements d&apos;exception sélectionnés dans 20 communes de Provence.
            </p>
          </div>
        </div>
      </div>

      {/* Filtres rapides */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <Link href="/locations/avec-piscine" className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 hover:border-[var(--color-rhone)] hover:text-[var(--color-rhone)] transition-colors">
              Avec piscine
            </Link>
            {propertyTypes.slice(0, 5).map((t) => (
              <Link key={t.slug} href={`/locations/${t.slug}`} className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 hover:border-[var(--color-rhone)] hover:text-[var(--color-rhone)] transition-colors">
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hébergements */}
      <section className="py-20 bg-white" aria-labelledby="properties-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="properties-heading" className="font-serif text-2xl font-bold text-gray-900 mb-8">Nos hébergements à la une</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((p) => (
              <PropertyCard key={p.slug} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Par commune */}
      <section className="py-20 bg-[var(--color-cream)]" aria-labelledby="by-commune">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="by-commune" className="font-serif text-2xl font-bold text-gray-900 mb-8">Par commune</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {communes.slice(0, 15).map((c) => (
              <Link key={c.slug} href={`/locations/${c.slug}`}
                className="p-4 bg-white rounded-xl border border-gray-100 hover:border-[var(--color-rhone)] hover:shadow-sm transition-all text-center group">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-[var(--color-rhone)] transition-colors leading-snug">{c.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Par type */}
      <section className="py-20 bg-white" aria-labelledby="by-type">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="by-type" className="font-serif text-2xl font-bold text-gray-900 mb-8">Par type de bien</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {propertyTypes.map((t) => (
              <Link key={t.slug} href={`/locations/${t.slug}`}
                className="p-5 bg-[var(--color-cream)] rounded-xl hover:shadow-sm transition-all group border border-transparent hover:border-[var(--color-rhone)]">
                <p className="font-semibold text-gray-900 group-hover:text-[var(--color-rhone)] transition-colors">{t.plural}</p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{t.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Par activité */}
      <section className="py-20 bg-[var(--color-cream)]" aria-labelledby="by-activity">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="by-activity" className="font-serif text-2xl font-bold text-gray-900 mb-8">Par séjour thématique</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {activityTags.map((tag) => (
              <Link key={tag.slug} href={`/locations/${tag.slug}`}
                className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-sm transition-all group border border-transparent hover:border-[var(--color-alpilles)]">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-[var(--color-alpilles)] transition-colors">{tag.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
