import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import PropertyCard from "@/components/PropertyCard";
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
    title: `${commune.name} : que faire, voir et où loger ? Guide complet`,
    description: `Guide complet de ${commune.name} en Provence : incontournables, restaurants, activités et hébergements de caractère. ${commune.atout}.`,
    alternates: { canonical: `https://entre-rhone-alpilles.fr/destinations/${commune.slug}` },
    openGraph: {
      title: `Guide ${commune.name} — Entre Rhône et Alpilles`,
      description: commune.description,
    },
  };
}

const getLocalInfo = (slug: string) => {
  const info: Record<string, { highlights: string[]; events: string[]; bestTime: string }> = {
    "saint-remy-de-provence": {
      highlights: ["Le marché provençal du mercredi", "Site archéologique de Glanum", "Centre Van Gogh & Hôpital Saint-Paul", "Les Antiques (arc de triomphe romain)", "Vieux bourg et ses galeries d'art"],
      events: ["Fête de la transhumance (Pentecôte)", "Marché de Noël de Saint-Rémy", "Alpilles en fête (automne)"],
      bestTime: "Avril à juin et septembre-octobre pour éviter la foule",
    },
    "arles": {
      highlights: ["Arènes romaines (UNESCO)", "Fondation LUMA Arles", "Musée de l'Arles Antique", "Les Alyscamps", "Cryptoportiques"],
      events: ["Feria de Pâques et de septembre", "Rencontres de la Photographie (juillet)", "Les Suds à Arles (juillet)"],
      bestTime: "Hors feria pour la visite, pendant la feria pour l'expérience unique",
    },
    "les-baux-de-provence": {
      highlights: ["Château des Baux (village médiéval)", "Carrières de Lumières", "Panorama sur la plaine de la Crau", "Cathédrale d'images", "Restaurants étoilés"],
      events: ["Les Baux en décembre (féérique)", "Médiévales des Baux (été)"],
      bestTime: "Décembre pour la magie de Noël, tôt le matin en été",
    },
    "eygalieres": {
      highlights: ["Village perché et ses ruelles", "Chapelle Saint-Sixte", "Panorama sur les Alpilles", "Restaurants gastronomiques", "Villas de célébrités"],
      events: ["Marché estival", "Fête du village (août)"],
      bestTime: "Juin et septembre pour la douceur et moins de monde",
    },
  };
  return info[slug] ?? {
    highlights: ["Village provençal authentique", "Marchés locaux", "Patrimoine architectural", "Nature et randonnées", "Gastronomie provençale"],
    events: ["Marché hebdomadaire", "Fêtes estivales"],
    bestTime: "Printemps et automne pour un séjour idéal",
  };
};

export default async function DestinationVillePage({ params }: Props) {
  const { ville } = await params;
  const commune = getCommuneBySlug(ville);
  if (!commune) notFound();

  const localInfo = getLocalInfo(ville);

  const mockProperties = [
    { title: `Mas de charme — ${commune.name}`, location: commune.name, type: "Mas", guests: 8, price: 280, rating: 4.9, reviewCount: 32, hasPiscine: true, slug: `mas-charme-${ville}` },
    { title: `Villa avec piscine — ${commune.name}`, location: commune.name, type: "Villa", guests: 6, price: 220, rating: 4.8, reviewCount: 18, hasPiscine: true, slug: `villa-piscine-${ville}` },
    { title: `Gîte authentique — ${commune.name}`, location: commune.name, type: "Gîte", guests: 4, price: 130, rating: 4.7, reviewCount: 24, hasPiscine: false, slug: `gite-authentique-${ville}` },
  ];

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: commune.name,
    description: commune.description,
    url: `https://entre-rhone-alpilles.fr/destinations/${commune.slug}`,
    geo: { "@type": "GeoCoordinates", latitude: commune.lat, longitude: commune.lng },
    touristType: commune.profilVoyageur,
  };

  const toc = ["Pourquoi séjourner", "Incontournables", "Quand venir", "Événements", "Nos hébergements"];

  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Destinations", href: "/destinations" }, { label: commune.name }]} />
          <div className="mt-8 max-w-3xl">
            <div className="flex items-center gap-2 text-[var(--color-rhone)] mb-4">
              <MapPin className="w-5 h-5" aria-hidden="true" />
              <span className="text-sm font-semibold">Provence · Bouches-du-Rhône</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {commune.name} : que faire, voir et où loger ?<br />
              <span className="text-[var(--color-rhone)] text-3xl">Guide complet</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">{commune.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* TOC sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 bg-[var(--color-cream)] rounded-xl p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Sommaire</p>
              <nav>
                <ul className="space-y-2">
                  {toc.map((item) => (
                    <li key={item}>
                      <a href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                        className="text-sm text-gray-600 hover:text-[var(--color-rhone)] transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <article className="lg:col-span-3 prose-sm max-w-none">
            <section id="pourquoi-séjourner" className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Pourquoi séjourner à {commune.name} ?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{commune.description}</p>
              <p className="text-gray-600 leading-relaxed">
                {commune.name} est idéal pour les voyageurs recherchant {commune.profilVoyageur.toLowerCase()}.
                Le village offre une harmonie rare entre authenticité provençale et confort moderne.
              </p>
              <div className="mt-6 p-4 bg-[var(--color-cream)] rounded-xl">
                <p className="text-sm font-semibold text-gray-700">⭐ Point fort : <span className="font-normal">{commune.atout}</span></p>
              </div>
            </section>

            <section id="incontournables" className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Incontournables de {commune.name}</h2>
              <ul className="space-y-3">
                {localInfo.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-gray-700">
                    <span className="text-[var(--color-or)] mt-0.5 flex-shrink-0">✦</span>
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            <section id="quand-venir" className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Quand venir à {commune.name} ?</h2>
              <div className="flex items-start gap-3 p-5 bg-[var(--color-cream)] rounded-xl">
                <Calendar className="w-5 h-5 text-[var(--color-rhone)] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <p className="text-gray-700 leading-relaxed">{localInfo.bestTime}</p>
              </div>
            </section>

            <section id="événements" className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Événements & agenda</h2>
              <div className="space-y-3">
                {localInfo.events.map((e) => (
                  <div key={e} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <span className="text-[var(--color-rhone)] text-xl">📅</span>
                    <p className="text-gray-700 font-medium">{e}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="nos-hébergements" className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                Nos hébergements à {commune.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
                {mockProperties.map((p) => (
                  <PropertyCard key={p.slug} {...p} />
                ))}
              </div>
              <Link href={`/locations/${commune.slug}`}
                className="inline-flex items-center gap-2 mt-6 text-[var(--color-rhone)] font-semibold hover:text-[var(--color-rhone-light)] transition-colors">
                Voir tous les hébergements à {commune.name}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
