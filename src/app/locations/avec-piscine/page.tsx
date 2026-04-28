import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Waves } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import Breadcrumb from "@/components/Breadcrumb";
import FAQAccordion from "@/components/FAQAccordion";
import { communes } from "@/lib/data";
import { OG_IMG } from "@/lib/og";

export const metadata: Metadata = {
  title: "Location avec Piscine Provence — Alpilles",
  description:
    "Mas, villas et bastides avec piscine privée en Provence. Piscine chauffée disponible entre le Rhône et les Alpilles. Réservation directe.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/locations/avec-piscine" },
  keywords: ["location avec piscine provence", "villa piscine alpilles", "mas piscine saint-rémy", "location piscine privée provence"],
  openGraph: {
    title: "Location avec Piscine en Provence — Mas, Villas & Bastides",
    description: "Locations de vacances avec piscine privée en Provence : mas, villas et bastides entre le Rhône et les Alpilles. Piscine chauffée disponible.",
    url: "https://entre-rhone-alpilles.fr/locations/avec-piscine",
    images: OG_IMG,
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
  { title: "Mas des Oliviers — Piscine & Vue Alpilles", location: "Saint-Rémy-de-Provence", type: "Mas", guests: 8, price: 320, rating: 4.9, reviewCount: 47, hasPiscine: true, slug: "mas-des-oliviers-saint-remy", href: "/locations/saint-remy-de-provence", featured: true, image: "/images/properties/mas-location-vacances-saint-remy-de-provence.jpg" },
  { title: "Villa Baux — Piscine Panoramique", location: "Les Baux-de-Provence", type: "Villa", guests: 6, price: 280, rating: 4.8, reviewCount: 31, hasPiscine: true, slug: "villa-baux-terrasse", href: "/locations/les-baux-de-provence", image: "/images/properties/villa-location-les-baux-de-provence.jpg" },
  { title: "Mas Maussane — Piscine & Oliveraie", location: "Maussane-les-Alpilles", type: "Mas", guests: 10, price: 390, rating: 5.0, reviewCount: 22, hasPiscine: true, slug: "mas-maussane-alpilles", href: "/locations/maussane-les-alpilles", image: "/images/properties/mas-location-maussane-les-alpilles.jpg" },
  { title: "Bastide Eygalières — Piscine Luxe", location: "Eygalières", type: "Bastide", guests: 12, price: 650, rating: 5.0, reviewCount: 14, hasPiscine: true, slug: "bastide-eygalieres-luxe", href: "/locations/eygalieres", image: "/images/properties/bastide-location-eygalieres-alpilles.jpg" },
  { title: "Villa Graveson — Piscine Chauffée", location: "Graveson", type: "Villa", guests: 8, price: 270, rating: 4.8, reviewCount: 25, hasPiscine: true, slug: "villa-graveson-piscine", href: "/locations/graveson", image: "/images/properties/mas-piscine-jardin-provence.jpg" },
  { title: "Mas Arles — Grande Piscine & Jardin", location: "Arles", type: "Mas", guests: 10, price: 310, rating: 4.7, reviewCount: 19, hasPiscine: true, slug: "mas-arles-piscine", href: "/locations/arles", image: "/images/properties/mas-location-saint-remy-de-provence.jpg" },
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
          <div className="flex items-center justify-between mb-2">
            <h2 id="piscine-heading" className="font-serif text-2xl font-bold text-gray-900">
              Portfolio — biens avec piscine privée
            </h2>
            <span className="text-sm text-gray-500">Piscine privée · Sélection ERA</span>
          </div>
          <p className="text-sm text-[var(--texte-discret)] mb-8 italic">
            Exemples de biens avec piscine gérés par ERA. Disponibilités sur demande —{" "}
            <a href="/contact" className="underline underline-offset-2 hover:text-gray-600 transition-colors">contactez-nous</a>.
          </p>
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
            Louer un mas ou une villa avec piscine privée en Provence
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
            <p>
              Entre le Rhône et les Alpilles, la Provence bénéficie de plus de 300 jours de soleil par an.
              La saison piscine s&apos;étend de mi-avril à mi-octobre, avec les mois de juin à septembre
              les plus ensoleillés. En juillet-août, l&apos;eau de piscine atteint naturellement 27 à 30°C
              sans chauffage supplémentaire. Nos <strong>locations avec piscine privée</strong> vous permettent
              de profiter d&apos;un espace bain de soleil exclusif, sans partager votre piscine avec
              d&apos;autres vacanciers.
            </p>
            <p>
              De <strong>Saint-Rémy-de-Provence</strong> à <strong>Eygalières</strong>, en passant par
              <strong> Maussane-les-Alpilles</strong> et <strong>Fontvieille</strong>, notre sélection comprend
              des mas authentiques avec piscine en garrigue, des villas contemporaines avec piscine à débordement
              et des bastides historiques avec bassin en pierre — tous dotés d&apos;une piscine privée et exclusive.
              Certains biens proposent également un jacuzzi, un pool house, une plage de nage ou un couloir de nage
              pour les amateurs de natation en eau calme.
            </p>
            <p>
              Notre équipe de conciergerie locale assure la mise en eau et l&apos;entretien professionnel de la
              piscine avant chaque arrivée. Le traitement de l&apos;eau est confié à des partenaires professionnels
              pour garantir une eau cristalline tout au long de votre séjour. Toutes nos piscines sont conformes
              aux normes de sécurité françaises en vigueur : alarme de bassin, barrière sécurisée ou couverture
              rigide, selon les biens. Les consignes de sécurité sont transmises à chaque voyageur dans le livret
              d&apos;accueil.
            </p>
            <p>
              Le printemps (mai-juin) et le début de l&apos;automne (septembre) offrent un excellent compromis :
              soleil, chaleur douce, piscine accessible et tarifs sensiblement inférieurs à la haute saison
              de juillet-août. Ces périodes sont particulièrement appréciées des familles avec enfants en
              bas âge, des couples qui recherchent la tranquillité et des voyageurs souhaitant explorer la
              Provence sans la foule. Contactez-nous pour une sélection selon vos dates et vos préférences.
            </p>
          </div>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Types de locations avec piscine disponibles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { type: "Mas provençaux", desc: "Le type de bien le plus demandé en Provence. Architecture en pierre calcaire, volets en bois, terrasse sous les platanes. Les mas avec piscine offrent un jardin généreux et une intimité totale, typiquement pour 6 à 12 personnes." },
              { type: "Villas contemporaines", desc: "Architecture plus moderne, souvent avec piscine à débordement ou bassin géométrique, vue panoramique sur les Alpilles ou le Rhône. Idéales pour les groupes d'amis ou les familles cherchant confort et design." },
              { type: "Bastides & domaines", desc: "Les propriétés les plus prestige de notre portfolio. Vastes domaines avec piscine de grand bassin, pool house, jacuzzi, terrain paysager. Pour les séjours haut de gamme et les événements privés." },
            ].map((item) => (
              <div key={item.type} className="bg-[var(--color-cream)] rounded-xl p-5">
                <Waves className="w-5 h-5 text-blue-400 mb-3" aria-hidden="true" />
                <p className="font-semibold text-gray-900 text-sm mb-2">{item.type}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="font-semibold text-gray-900 mb-1">Recherche personnalisée</p>
              <p className="text-sm text-gray-600">Précisez vos critères (taille de piscine, chauffage, jacuzzi, capacité, commune) et nous vous proposons une sélection sur mesure depuis notre portfolio actuel.</p>
            </div>
            <Link href="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-rhone)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--color-rhone-dark)] transition-colors whitespace-nowrap">
              Demander une sélection <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
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
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/locations"
              className="inline-flex items-center gap-1.5 text-[var(--color-rhone)] font-semibold hover:opacity-80 transition-opacity">
              ← Toutes les locations en Provence
            </Link>
            <Link href="/destinations"
              className="inline-flex items-center gap-1.5 text-[var(--color-alpilles)] font-semibold hover:opacity-80 transition-opacity">
              Nos destinations <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
