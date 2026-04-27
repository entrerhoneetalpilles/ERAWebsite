import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { communes, propertyTypes, activityTags } from "@/lib/data";
import { OG_IMG } from "@/lib/og";

export const metadata: Metadata = {
  title: "Locations de Vacances en Provence",
  description:
    "Hébergements de caractère entre le Rhône et les Alpilles : mas provençaux, villas avec piscine, bastides. 20 communes en Provence.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/locations" },
  openGraph: {
    title: "Locations de Vacances en Provence — Mas, Villas, Bastides",
    description: "Hébergements d'exception sélectionnés dans 20 communes entre le Rhône et les Alpilles.",
    url: "https://entre-rhone-alpilles.fr/locations",
    images: OG_IMG,
  },
};

const portfolioStats = [
  { value: "30+", label: "Biens gérés", sub: "Mas, villas, bastides, gîtes" },
  { value: "20", label: "Communes", sub: "Entre Rhône et Alpilles" },
  { value: "85%", label: "Taux d'occupation", sub: "Moyenne annuelle du portfolio" },
  { value: "Superhost", label: "Niveau Airbnb", sub: "Reconnu par Airbnb France" },
];

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Locations de vacances en Provence — Entre Rhône et Alpilles",
  description: "Mas provençaux, villas avec piscine, bastides et appartements de caractère dans 20 communes entre le Rhône et les Alpilles.",
  url: "https://entre-rhone-alpilles.fr/locations",
  numberOfItems: 30,
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
              Mas provençaux, villas avec piscine, bastides et appartements de caractère. Des hébergements
              d&apos;exception sélectionnés dans 20 communes de Provence, gérés par une conciergerie locale.
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

      {/* Notre portfolio */}
      <section className="py-16 bg-white" aria-labelledby="portfolio-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {portfolioStats.map((s) => (
              <div key={s.label} className="p-6 bg-[var(--color-cream)] rounded-xl text-center">
                <div className="font-serif text-3xl font-bold text-[var(--color-rhone)]">{s.value}</div>
                <div className="font-semibold text-gray-900 mt-1 text-sm">{s.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 id="portfolio-heading" className="font-serif text-2xl font-bold text-gray-900 mb-4">
                Un portfolio de 30+ biens sélectionnés dans 20 communes
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Entre Rhône et Alpilles gère un ensemble de mas provençaux, villas avec piscine, bastides,
                gîtes et appartements répartis dans 20 communes de la Provence intérieure — de Saint-Rémy-de-Provence
                à Arles, d&apos;Eygalières à Fontvieille. Chaque bien est sélectionné pour son authenticité,
                son standing et sa situation géographique.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Notre portfolio évolue au fil de nos mandats. Utilisez la navigation ci-dessous pour explorer
                les biens disponibles par commune ou par type, ou contactez-nous pour connaître les disponibilités
                actuelles et obtenir une sélection personnalisée selon vos dates et votre groupe.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-rhone)] text-white font-semibold rounded-xl hover:bg-[var(--color-rhone-dark)] transition-colors"
              >
                Voir les disponibilités
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { icon: "🏡", title: "Mas provençaux", desc: "Fermes authentiques reconverties avec piscine et grand jardin, idéales pour les familles et groupes." },
                { icon: "🏠", title: "Villas & bastides", desc: "Demeures de maître et villas contemporaines, équipements premium, souvent en position dominante." },
                { icon: "🏘️", title: "Gîtes & maisons de village", desc: "Hébergements de charme au cœur des villages provençaux, idéaux pour les couples et courts séjours." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 bg-[var(--color-cream)] rounded-xl">
                  <span className="text-2xl flex-shrink-0" aria-hidden="true">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-600 leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Par commune */}
      <section className="py-16 bg-[var(--color-cream)]" aria-labelledby="by-commune">
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
      <section className="py-16 bg-white" aria-labelledby="by-type">
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
      <section className="py-16 bg-[var(--color-cream)]" aria-labelledby="by-activity">
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

      {/* Contenu SEO */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Louer en Provence entre le Rhône et les Alpilles
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              La zone géographique comprise entre le Rhône et les Alpilles concentre certains des patrimoines
              immobiliers les plus recherchés de France. De <strong>Saint-Rémy-de-Provence</strong>, cœur battant
              des Alpilles, à <strong>Arles</strong> et son héritage romain UNESCO, en passant par
              <strong> Eygalières</strong> — le village le plus huppé de la région — et <strong>Maussane-les-Alpilles</strong>,
              capitale de l&apos;huile d&apos;olive AOP, chaque commune offre une expérience unique.
            </p>
            <p>
              Notre conciergerie intervient exclusivement dans ce périmètre maîtrisé, garantissant une réactivité
              terrain que les plateformes nationales ne peuvent offrir. Chaque bien que nous gérons bénéficie
              d&apos;un accueil personnalisé à l&apos;arrivée, d&apos;un guide local sur mesure et d&apos;une
              assistance disponible 7j/7 pendant toute la durée du séjour.
            </p>
            <p>
              La Provence entre Rhône et Alpilles jouit de plus de <strong>300 jours de soleil par an</strong>.
              La haute saison s&apos;étend d&apos;avril à octobre, avec des pics en juillet-août pendant
              la Feria d&apos;Arles, les Rencontres de la Photographie et les marchés d&apos;été.
              Le printemps et l&apos;automne offrent des conditions idéales avec des prix plus accessibles
              et une fréquentation plus calme — souvent préférés des voyageurs connaisseurs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
