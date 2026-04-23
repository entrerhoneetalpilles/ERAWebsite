import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import PropertyCard from "@/components/PropertyCard";
import PropertyTypeFilter from "@/components/PropertyTypeFilter";
import FAQAccordion from "@/components/FAQAccordion";
import {
  communes,
  propertyTypes,
  activityTags,
  getCommuneBySlug,
  getPropertyTypeBySlug,
} from "@/lib/data";
import { OG_IMG } from "@/lib/og";

export async function generateStaticParams() {
  return [
    ...communes.map((c) => ({ slug: c.slug })),
    ...propertyTypes.map((t) => ({ slug: t.slug })),
    ...activityTags.map((t) => ({ slug: t.slug })),
  ];
}

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ type?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const commune = getCommuneBySlug(slug);
  if (commune) {
    return {
      title: `Locations ${commune.name}`,
      description: `Locations de vacances à ${commune.name} : mas, villas et hébergements de charme en Provence. Réservez en direct avec ERA, votre conciergerie locale.`,
      alternates: { canonical: `https://entre-rhone-alpilles.fr/locations/${commune.slug}` },
      openGraph: { title: `Location vacances ${commune.name}`, description: commune.description, images: OG_IMG },
    };
  }

  const pt = getPropertyTypeBySlug(slug);
  if (pt) {
    return {
      title: `${pt.plural} à louer en Provence`,
      description: `${pt.plural} en Provence : ${pt.description}. Sélection ERA Provence — réservation directe.`,
      alternates: { canonical: `https://entre-rhone-alpilles.fr/locations/${pt.slug}` },
      openGraph: {
        title: `${pt.plural} à louer en Provence — ERA`,
        description: `${pt.plural} de caractère en Provence sélectionnés par Entre Rhône et Alpilles.`,
        images: OG_IMG,
      },
    };
  }

  const at = activityTags.find((t) => t.slug === slug);
  if (at) {
    return {
      title: `Hébergements ${at.name} — Provence`,
      description: `Hébergements idéaux pour ${at.name.toLowerCase()} en Provence. ${at.description}. Sélectionnés par notre conciergerie locale.`,
      alternates: { canonical: `https://entre-rhone-alpilles.fr/locations/${at.slug}` },
    };
  }

  return {};
}

// Données différenciées par commune pour éviter le duplicate content
const communePropertyData: Record<string, { name: string; type: string; guests: number; price: number; rating: number; reviewCount: number; hasPiscine: boolean; adjective: string; image?: string }[]> = {
  "saint-remy-de-provence": [
    { name: "Mas des Oliviers — Vue Alpilles", type: "Mas", guests: 8, price: 320, rating: 4.9, reviewCount: 47, hasPiscine: true, adjective: "Vue panoramique", image: "/images/properties/mas-location-vacances-saint-remy-de-provence.jpg" },
    { name: "Villa du Marché — Centre Saint-Rémy", type: "Villa", guests: 6, price: 255, rating: 4.8, reviewCount: 29, hasPiscine: true, adjective: "Plein centre" },
    { name: "Maison Glanum — Charme provençal", type: "Maison de village", guests: 4, price: 145, rating: 4.9, reviewCount: 52, hasPiscine: false, adjective: "Cœur village", image: "/images/properties/interieur-mas-provencal-salon.jpg" },
  ],
  "les-baux-de-provence": [
    { name: "Villa des Baux — Terrasse panoramique", type: "Villa", guests: 6, price: 280, rating: 4.8, reviewCount: 31, hasPiscine: true, adjective: "Vue château", image: "/images/properties/villa-location-les-baux-de-provence.jpg" },
    { name: "Bastide Alpilles — Standing luxe", type: "Bastide", guests: 10, price: 480, rating: 5.0, reviewCount: 18, hasPiscine: true, adjective: "Luxe absolu" },
    { name: "Mas des Carrières — Lumières", type: "Mas", guests: 8, price: 350, rating: 4.9, reviewCount: 24, hasPiscine: true, adjective: "Prestige", image: "/images/properties/mas-piscine-vue-aerienne-provence.jpg" },
  ],
  "eygalieres": [
    { name: "Bastide Eygalières — Discrétion absolue", type: "Bastide", guests: 12, price: 650, rating: 5.0, reviewCount: 14, hasPiscine: true, adjective: "Exclusivité", image: "/images/properties/bastide-location-eygalieres-alpilles.jpg" },
    { name: "Villa des Célébrités — Piscine privée", type: "Villa", guests: 8, price: 520, rating: 5.0, reviewCount: 11, hasPiscine: true, adjective: "Ultra-luxe" },
    { name: "Mas Garrigue — Vue Alpilles Est", type: "Mas", guests: 6, price: 380, rating: 4.9, reviewCount: 22, hasPiscine: true, adjective: "Vue imprenable" },
  ],
  "maussane-les-alpilles": [
    { name: "Mas Oliveraie — Huile d'or", type: "Mas", guests: 8, price: 295, rating: 4.9, reviewCount: 33, hasPiscine: true, adjective: "AOP oliviers", image: "/images/properties/mas-location-maussane-les-alpilles.jpg" },
    { name: "Gîte du Moulin — Famille", type: "Gîte", guests: 6, price: 185, rating: 4.8, reviewCount: 41, hasPiscine: true, adjective: "Vue moulin" },
    { name: "Maison du Village — Gastronomie", type: "Maison de village", guests: 4, price: 140, rating: 4.7, reviewCount: 28, hasPiscine: false, adjective: "Restaurants à pied" },
  ],
  "arles": [
    { name: "Appartement du Théâtre — UNESCO", type: "Appartement", guests: 4, price: 140, rating: 4.9, reviewCount: 58, hasPiscine: false, adjective: "Centre historique", image: "/images/properties/appartement-location-arles-provence.jpg" },
    { name: "Mas Camargue — Feria", type: "Mas", guests: 8, price: 240, rating: 4.8, reviewCount: 35, hasPiscine: true, adjective: "Porte Camargue" },
    { name: "Maison LUMA — Art contemporain", type: "Maison de village", guests: 5, price: 180, rating: 5.0, reviewCount: 22, hasPiscine: false, adjective: "Quartier artistique" },
  ],
  "fontvieille": [
    { name: "Mas Daudet — Vue Moulin", type: "Mas", guests: 8, price: 260, rating: 4.8, reviewCount: 29, hasPiscine: true, adjective: "Hommage Daudet" },
    { name: "Gîte des Cyclamens — Vélo", type: "Gîte", guests: 6, price: 155, rating: 4.7, reviewCount: 38, hasPiscine: false, adjective: "Départ cyclable" },
    { name: "Villa Fontaine — Famille", type: "Villa", guests: 10, price: 295, rating: 4.9, reviewCount: 21, hasPiscine: true, adjective: "Idéal familles" },
  ],
  "paradou": [
    { name: "Mas du Silence — Slow travel", type: "Mas", guests: 6, price: 275, rating: 5.0, reviewCount: 19, hasPiscine: true, adjective: "Calme total" },
    { name: "Gîte des Oliviers — Intimiste", type: "Gîte", guests: 4, price: 160, rating: 4.9, reviewCount: 31, hasPiscine: false, adjective: "Secret villageois", image: "/images/properties/gite-location-paradou-alpilles.jpg" },
    { name: "Bastide Paradou — Couple", type: "Bastide", guests: 4, price: 340, rating: 5.0, reviewCount: 12, hasPiscine: true, adjective: "Romantique" },
  ],
  "villeneuve-les-avignon": [
    { name: "Villa Chartreuse — Vue Palais Papes", type: "Villa", guests: 8, price: 310, rating: 4.9, reviewCount: 26, hasPiscine: true, adjective: "Vue unique" },
    { name: "Appartement Festival — Avignon", type: "Appartement", guests: 4, price: 160, rating: 4.8, reviewCount: 44, hasPiscine: false, adjective: "Festival Off" },
    { name: "Maison du Rhône — Jardins", type: "Maison de village", guests: 6, price: 210, rating: 4.7, reviewCount: 33, hasPiscine: false, adjective: "Bord de Rhône" },
  ],
  "tarascon": [
    { name: "Mas du Rhône — Rive provençale", type: "Mas", guests: 8, price: 240, rating: 4.8, reviewCount: 29, hasPiscine: true, adjective: "Vue château" },
    { name: "Appartement Tartarin — Centre Tarascon", type: "Appartement", guests: 3, price: 125, rating: 4.7, reviewCount: 41, hasPiscine: false, adjective: "Centre historique" },
    { name: "Gîte du Rhône — Calme absolu", type: "Gîte", guests: 5, price: 155, rating: 4.8, reviewCount: 33, hasPiscine: false, adjective: "Bord de rivière" },
  ],
  "boulbon": [
    { name: "Mas Boulbon — Village perché", type: "Mas", guests: 8, price: 260, rating: 4.9, reviewCount: 17, hasPiscine: true, adjective: "Panorama Rhône" },
    { name: "Bastide du Rocher — Vue panoramique", type: "Bastide", guests: 6, price: 285, rating: 4.9, reviewCount: 12, hasPiscine: true, adjective: "Vue exceptionnelle" },
    { name: "Gîte des Garrigues — Nature", type: "Gîte", guests: 4, price: 140, rating: 4.7, reviewCount: 24, hasPiscine: false, adjective: "Sauvage et calme" },
  ],
  "graveson": [
    { name: "Mas du Vignoble — Coteaux des Baux", type: "Mas", guests: 8, price: 270, rating: 4.8, reviewCount: 32, hasPiscine: true, adjective: "Domaine viticole" },
    { name: "Villa Graveson — Piscine jardin", type: "Villa", guests: 6, price: 220, rating: 4.8, reviewCount: 28, hasPiscine: true, adjective: "Jardin luxuriant" },
    { name: "Gîte de la Plaine — Famille", type: "Gîte", guests: 6, price: 165, rating: 4.7, reviewCount: 37, hasPiscine: false, adjective: "Idéal famille" },
  ],
  "barbentane": [
    { name: "Bastide du Château — Prestige", type: "Bastide", guests: 10, price: 380, rating: 4.9, reviewCount: 20, hasPiscine: true, adjective: "Vue château royal" },
    { name: "Villa Durance — Jardin en fleurs", type: "Villa", guests: 8, price: 260, rating: 4.8, reviewCount: 25, hasPiscine: true, adjective: "Parc arboré" },
    { name: "Maison des Halles — Village", type: "Maison de village", guests: 4, price: 145, rating: 4.7, reviewCount: 34, hasPiscine: false, adjective: "Caractère XVIIe" },
  ],
  "chateaurenard": [
    { name: "Mas des Maraîchers — Plaine", type: "Mas", guests: 8, price: 230, rating: 4.7, reviewCount: 24, hasPiscine: true, adjective: "Grand domaine" },
    { name: "Appartement du Marché — Châteaurenard", type: "Appartement", guests: 4, price: 120, rating: 4.7, reviewCount: 44, hasPiscine: false, adjective: "Marché à pied" },
    { name: "Gîte des Vergers — Famille", type: "Gîte", guests: 6, price: 160, rating: 4.8, reviewCount: 31, hasPiscine: false, adjective: "Vergers alentour" },
  ],
  "saint-etienne-du-gres": [
    { name: "Mas des Alpilles Ouest — Vélo & Nature", type: "Mas", guests: 8, price: 270, rating: 4.9, reviewCount: 23, hasPiscine: true, adjective: "Départ randonnée" },
    { name: "Villa Olympe — Famille spacieuse", type: "Villa", guests: 10, price: 295, rating: 4.8, reviewCount: 19, hasPiscine: true, adjective: "Grand espace" },
    { name: "Gîte de la Via Aurelia — Authenticité", type: "Gîte", guests: 4, price: 155, rating: 4.7, reviewCount: 34, hasPiscine: false, adjective: "Voie romaine" },
  ],
  "aureille": [
    { name: "Mas de la Garrigue — Alpilles Est", type: "Mas", guests: 6, price: 255, rating: 4.9, reviewCount: 15, hasPiscine: true, adjective: "Nature préservée" },
    { name: "Villa Aureille — Calme & panorama", type: "Villa", guests: 8, price: 285, rating: 4.8, reviewCount: 17, hasPiscine: true, adjective: "Vue Alpilles" },
    { name: "Gîte du Castelas — Authenticité", type: "Gîte", guests: 4, price: 145, rating: 4.8, reviewCount: 26, hasPiscine: false, adjective: "Village secret" },
  ],
  "mouries": [
    { name: "Mas des Oliviers — Oliveraie AOP", type: "Mas", guests: 8, price: 280, rating: 4.9, reviewCount: 29, hasPiscine: true, adjective: "600 ha d'oliviers", image: "/images/properties/mas-piscine-jardin-provence.jpg" },
    { name: "Villa des Moulins — Famille", type: "Villa", guests: 6, price: 235, rating: 4.8, reviewCount: 23, hasPiscine: true, adjective: "Vue moulin" },
    { name: "Gîte de l'Huile d'Or — Authentique", type: "Gîte", guests: 4, price: 155, rating: 4.7, reviewCount: 35, hasPiscine: false, adjective: "Terroir AOP" },
  ],
  "molleges": [
    { name: "Mas Mollégès — Entre Alpilles et Luberon", type: "Mas", guests: 8, price: 240, rating: 4.8, reviewCount: 19, hasPiscine: true, adjective: "Deux massifs" },
    { name: "Gîte des Vergers — Famille", type: "Gîte", guests: 5, price: 150, rating: 4.7, reviewCount: 29, hasPiscine: false, adjective: "Vergers bio" },
    { name: "Maison provençale — Village", type: "Maison de village", guests: 4, price: 125, rating: 4.7, reviewCount: 23, hasPiscine: false, adjective: "Authenticité" },
  ],
  "noves": [
    { name: "Mas de la Durance — Noves", type: "Mas", guests: 8, price: 235, rating: 4.8, reviewCount: 22, hasPiscine: true, adjective: "Bord de Durance" },
    { name: "Gîte des Cerisiers — Famille", type: "Gîte", guests: 5, price: 140, rating: 4.7, reviewCount: 31, hasPiscine: false, adjective: "Vergers" },
    { name: "Maison du Canal — Noves", type: "Maison de village", guests: 4, price: 120, rating: 4.6, reviewCount: 27, hasPiscine: false, adjective: "Calme absolu" },
  ],
  "verquieres": [
    { name: "Mas du Comtat — Provence authentique", type: "Mas", guests: 6, price: 220, rating: 4.7, reviewCount: 16, hasPiscine: true, adjective: "Grand jardin" },
    { name: "Gîte de la Plaine — Verquières", type: "Gîte", guests: 4, price: 125, rating: 4.7, reviewCount: 20, hasPiscine: false, adjective: "Vue ventoux" },
    { name: "Maison du village — Calme total", type: "Maison de village", guests: 3, price: 110, rating: 4.6, reviewCount: 24, hasPiscine: false, adjective: "Budget maîtrisé" },
  ],
  "orgon": [
    { name: "Mas Orgon — Porte du Luberon", type: "Mas", guests: 8, price: 255, rating: 4.8, reviewCount: 21, hasPiscine: true, adjective: "Vue Durance" },
    { name: "Villa Durance — Entre deux massifs", type: "Villa", guests: 6, price: 230, rating: 4.9, reviewCount: 15, hasPiscine: true, adjective: "Luberon & Alpilles" },
    { name: "Gîte du Rocher — Panorama exceptionnel", type: "Gîte", guests: 4, price: 150, rating: 4.8, reviewCount: 28, hasPiscine: false, adjective: "Vue 360°" },
  ],
};

const mockProperties = (slug: string, label: string) => {
  const custom = communePropertyData[slug];
  if (custom) {
    return custom.map((p) => ({
      title: p.name,
      location: label,
      type: p.type,
      guests: p.guests,
      price: p.price,
      rating: p.rating,
      reviewCount: p.reviewCount,
      hasPiscine: p.hasPiscine,
      image: p.image,
      slug: `${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
    }));
  }
  // Données génériques pour les communes circle 2/3
  const seed = label.charCodeAt(0) % 7;
  const prices = [145, 165, 195, 225, 250, 275, 310];
  const ratings = [4.7, 4.7, 4.8, 4.8, 4.9, 4.9, 5.0];
  const reviews = [18, 22, 27, 31, 35, 41, 48];
  return [
    { title: `Mas provençal — ${label}`, location: label, type: "Mas", guests: 8, price: prices[(seed + 2) % 7] + 80, rating: ratings[(seed + 1) % 7], reviewCount: reviews[(seed + 2) % 7], hasPiscine: true, slug: `mas-provencal-${slug}` },
    { title: `Villa ${label.split("-")[0]} — Jardin`, location: label, type: "Villa", guests: 6, price: prices[(seed + 4) % 7] + 40, rating: ratings[(seed + 3) % 7], reviewCount: reviews[(seed + 1) % 7], hasPiscine: true, slug: `villa-jardin-${slug}` },
    { title: `Gîte de caractère — ${label}`, location: label, type: "Gîte", guests: 4, price: prices[seed % 7], rating: ratings[(seed + 2) % 7], reviewCount: reviews[(seed + 4) % 7], hasPiscine: false, slug: `gite-caractere-${slug}` },
  ];
};

const typeSlugToName: Record<string, string> = {
  mas: "Mas",
  villa: "Villa",
  bastide: "Bastide",
  appartement: "Appartement",
  gite: "Gîte",
  "maison-village": "Maison de village",
};

export default async function LocationsSlugPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { type: selectedType } = await searchParams;

  const commune = getCommuneBySlug(slug);
  if (commune) {
    const allProperties = mockProperties(commune.slug, commune.name);

    const properties = selectedType
      ? selectedType === "avec-piscine"
        ? allProperties.filter((p) => p.hasPiscine)
        : allProperties.filter((p) => typeSlugToName[selectedType] && p.type === typeSlugToName[selectedType])
      : allProperties;

    const filterTypes = [
      ...commune.propertyTypes
        .filter((s) => typeSlugToName[s])
        .map((s) => ({ slug: s, label: typeSlugToName[s] })),
      ...(allProperties.some((p) => p.hasPiscine) ? [{ slug: "avec-piscine", label: "Avec piscine" }] : []),
    ];

    const faqItems = [
      { question: `Quels types de biens peut-on louer à ${commune.name} ?`, answer: `À ${commune.name}, nous proposons principalement des ${commune.propertyTypes.join(", ")}. Chaque bien est sélectionné pour sa qualité et son authenticité provençale.` },
      { question: `Quelle est la durée minimale de séjour à ${commune.name} ?`, answer: `La durée minimale est généralement de 2 à 3 nuits selon les biens et les saisons. En haute saison (juillet-août), certains biens exigent une semaine minimum.` },
      { question: `Y a-t-il une piscine dans les locations à ${commune.name} ?`, answer: `Oui, plusieurs de nos biens à ${commune.name} disposent d'une piscine privée. Utilisez le filtre "avec piscine" pour les afficher en priorité.` },
    ];

    const schemaOrg = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Locations de vacances à ${commune.name}`,
      description: commune.description,
      url: `https://entre-rhone-alpilles.fr/locations/${commune.slug}`,
      numberOfItems: properties.length,
      itemListElement: properties.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "LodgingBusiness",
          name: p.title,
          address: { "@type": "PostalAddress", addressLocality: commune.name, addressCountry: "FR" },
          geo: { "@type": "GeoCoordinates", latitude: commune.lat, longitude: commune.lng },
          aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviewCount },
        },
      })),
    };

    return (
      <div className="pt-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

        <div className="bg-[var(--color-cream)] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb items={[{ label: "Locations", href: "/locations" }, { label: commune.name }]} />
            <div className="mt-8 max-w-3xl">
              <div className="flex items-center gap-2 text-[var(--color-rhone)] mb-4">
                <MapPin className="w-5 h-5" aria-hidden="true" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  {commune.circle === 1 ? "Cœur des Alpilles" : commune.circle === 2 ? "Alpilles & Camargue" : "Grande Provence"}
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Location vacances à {commune.name}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-4">{commune.description}</p>
              <p className="text-sm text-gray-500">
                <strong>Profil voyageur :</strong> {commune.profilVoyageur}
              </p>
            </div>
          </div>
        </div>

        <section className="py-20 bg-white" aria-labelledby="properties-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 id="properties-heading" className="font-serif text-2xl font-bold text-gray-900">
                Hébergements à {commune.name}
              </h2>
              <span className="text-sm text-gray-500">{properties.length} bien{properties.length > 1 ? "s" : ""} disponible{properties.length > 1 ? "s" : ""}</span>
            </div>
            <Suspense fallback={null}>
              <PropertyTypeFilter types={filterTypes} />
            </Suspense>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {properties.length > 0 ? (
                properties.map((p) => <PropertyCard key={p.slug} {...p} href={`/locations/${commune.slug}`} />)
              ) : (
                <p className="col-span-3 py-12 text-center text-gray-500">
                  Aucun bien disponible pour ce filtre.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[var(--color-cream)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
              Pourquoi louer à {commune.name} avec ERA ?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Chaque bien que nous proposons à {commune.name} est sélectionné pour son authenticité,
              son confort et sa situation. Nos hébergements de caractère — mas provençaux, villas avec piscine,
              bastides et gîtes — sont gérés par une équipe locale qui connaît la région sur le bout des doigts.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Avec notre service de conciergerie, vous bénéficiez d&apos;un accueil personnalisé à votre arrivée,
              de recommandations d&apos;initiés sur les meilleurs restaurants, marchés et activités,
              et d&apos;une assistance disponible 7j/7 tout au long de votre séjour.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Point fort :</strong> {commune.atout}
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              La région bénéficie de plus de 300 jours d&apos;ensoleillement par an et d&apos;un microclimat
              exceptionnel, propice aux séjours en toute saison. Le printemps et l&apos;automne offrent
              chaleur douce, marchés animés et paysages colorés — souvent préférés des connaisseurs à la
              haute saison (juillet-août), plus chargée mais aussi la plus festive.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nos hébergements à {commune.name} sont disponibles en courts séjours ou à la semaine.
              À votre arrivée, un guide d&apos;accueil personnalisé vous attend avec nos meilleures adresses
              locales : marchés, restaurants, producteurs et activités à découvrir dans les environs.
              Notre équipe reste disponible 7j/7 pendant tout votre séjour.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">
              FAQ — Location à {commune.name}
            </h2>
            <FAQAccordion items={faqItems} />
          </div>
        </section>

        <section className="py-16 bg-[var(--color-rhone)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-white mb-4">
              Vous êtes propriétaire à {commune.name} ?
            </h2>
            <p className="text-white/80 mb-8">
              Confiez la gestion de votre bien à notre équipe locale et maximisez vos revenus.
            </p>
            <Link href={`/conciergerie/${commune.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-or)] text-white font-semibold rounded-xl hover:bg-[var(--color-or-light)] transition-colors">
              Conciergerie à {commune.name} <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const pt = getPropertyTypeBySlug(slug);
  if (pt) {
    const properties = mockProperties(pt.slug, pt.plural);
    const communesWithType = communes.filter((c) => c.propertyTypes.includes(slug));

    const faqItems = [
      { question: `Qu'est-ce qu'un ${pt.name.toLowerCase()} en Provence ?`, answer: `${pt.description}. Nos ${pt.plural.toLowerCase()} sont sélectionnés pour leur authenticité et leur qualité.` },
      { question: `Dans quelles communes trouver des ${pt.plural.toLowerCase()} ?`, answer: `Nos ${pt.plural.toLowerCase()} sont disponibles à ${communesWithType.slice(0, 5).map((c) => c.name).join(", ")} et dans plusieurs autres communes de la région.` },
      { question: `Quel est le prix d'un ${pt.name.toLowerCase()} en Provence ?`, answer: `Les prix varient selon la localisation, la capacité et la période. Comptez entre 100€ et 600€/nuit selon les biens.` },
    ];

    const ptSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${pt.plural} en Provence`,
      description: `${pt.description}`,
      url: `https://entre-rhone-alpilles.fr/locations/${slug}`,
      numberOfItems: communesWithType.length,
    };

    return (
      <div className="pt-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ptSchema) }} />
        <div className="bg-[var(--color-cream)] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb items={[{ label: "Locations", href: "/locations" }, { label: pt.plural }]} />
            <div className="mt-8 max-w-3xl">
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                {pt.plural} en Provence
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">{pt.description}.</p>
            </div>
          </div>
        </div>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">
              Nos {pt.plural.toLowerCase()} disponibles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {properties.map((p) => <PropertyCard key={p.slug} {...p} href={`/locations/${slug}`} />)}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[var(--color-cream)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-6">
              {pt.plural} par commune
            </h2>
            <div className="flex flex-wrap gap-3">
              {communesWithType.map((c) => (
                <Link key={c.slug} href={`/locations/${c.slug}/${slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-[var(--color-rhone)] hover:text-white transition-colors border border-gray-200">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">
              FAQ — {pt.plural} en Provence
            </h2>
            <FAQAccordion items={faqItems} />
          </div>
        </section>
      </div>
    );
  }

  const at = activityTags.find((t) => t.slug === slug);
  if (at) {
    const properties = mockProperties(at.slug, at.name);

    const faqItems = [
      { question: `Quels hébergements pour ${at.name.toLowerCase()} en Provence ?`, answer: `Nous sélectionnons des biens idéalement situés pour ${at.name.toLowerCase()}. ${at.description}.` },
      { question: `Quelle est la meilleure période pour ${at.name.toLowerCase()} ?`, answer: `Le printemps (avril-juin) et l'automne (septembre-octobre) sont les meilleures périodes. L'été est plus chargé mais offre plus de disponibilités d'activités.` },
    ];

    return (
      <div className="pt-20">
        <div className="bg-[var(--color-cream)] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb items={[{ label: "Locations", href: "/locations" }, { label: at.name }]} />
            <div className="mt-8 max-w-3xl">
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Hébergements {at.name} en Provence
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">{at.description}.</p>
            </div>
          </div>
        </div>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">
              Hébergements sélectionnés pour {at.name.toLowerCase()}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {properties.map((p) => <PropertyCard key={p.slug} {...p} href="/locations" />)}
            </div>
            <div className="text-center">
              <Link href="/locations"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-rhone)] text-white font-semibold rounded-xl hover:bg-[var(--color-rhone-light)] transition-colors">
                Voir tous les hébergements <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">
              FAQ — {at.name} en Provence
            </h2>
            <FAQAccordion items={faqItems} />
          </div>
        </section>
      </div>
    );
  }

  notFound();
}
