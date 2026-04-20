import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CommuneCard from "@/components/CommuneCard";
import Breadcrumb from "@/components/Breadcrumb";
import { communes, getCommunesByCircle } from "@/lib/data";

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Destinations en Provence — 20 Communes entre Rhône et Alpilles",
  description: "Guides complets de 20 communes entre le Rhône et les Alpilles : locations, activités, infos pratiques.",
  url: "https://entre-rhone-alpilles.fr/destinations",
  hasPart: communes.map((c, i) => ({
    "@type": "TouristDestination",
    position: i + 1,
    name: c.name,
    url: `https://entre-rhone-alpilles.fr/destinations/${c.slug}`,
    description: c.description,
    containedInPlace: { "@type": "State", name: "Provence-Alpes-Côte d'Azur" },
  })),
};

export const metadata: Metadata = {
  title: "Destinations Provence — 20 Communes Alpilles & Rhône",
  description:
    "Guides de 20 communes entre le Rhône et les Alpilles : Saint-Rémy-de-Provence, Arles, Les Baux-de-Provence, Eygalières, Maussane et bien d'autres.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/destinations" },
  openGraph: {
    title: "Destinations Provence — 20 Communes entre Rhône et Alpilles",
    description: "Guides complets de 20 communes en Provence : Saint-Rémy-de-Provence, Arles, Les Baux-de-Provence, Eygalières, Maussane et bien d'autres.",
    url: "https://entre-rhone-alpilles.fr/destinations",
  },
};

export default function DestinationsPage() {
  const c1 = getCommunesByCircle(1);
  const c2 = getCommunesByCircle(2);
  const c3 = getCommunesByCircle(3);

  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Destinations" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Nos destinations en Provence
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              De Villeneuve-lès-Avignon à Eygalières, découvrez le guide complet de nos 20 communes
              entre le Rhône et les Alpilles.
            </p>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white" aria-labelledby="c1-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 id="c1-heading" className="font-serif text-2xl font-bold text-gray-900">Cœur de marché — Alpilles</h2>
            <p className="text-sm text-gray-500">Priorité absolue · Clientèle premium · Triangle d'or</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c1.map((c) => <CommuneCard key={c.slug} commune={c} showCircle />)}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--color-cream)]" aria-labelledby="c2-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 id="c2-heading" className="font-serif text-2xl font-bold text-gray-900">Zone de développement</h2>
            <p className="text-sm text-gray-500">Fort potentiel · Biens de caractère</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c2.map((c) => <CommuneCard key={c.slug} commune={c} showCircle />)}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" aria-labelledby="c3-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 id="c3-heading" className="font-serif text-2xl font-bold text-gray-900">Frontière stratégique</h2>
            <p className="text-sm text-gray-500">SEO longue traîne · Opportuniste</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c3.map((c) => <CommuneCard key={c.slug} commune={c} showCircle />)}
          </div>
        </div>
      </section>
    </div>
  );
}
