import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import PropertyCard from "@/components/PropertyCard";
import FAQAccordion from "@/components/FAQAccordion";
import {
  communes,
  propertyTypes,
  activityTags,
  getCommuneBySlug,
  getPropertyTypeBySlug,
} from "@/lib/data";

export async function generateStaticParams() {
  return [
    ...communes.map((c) => ({ slug: c.slug })),
    ...propertyTypes.map((t) => ({ slug: t.slug })),
    ...activityTags.map((t) => ({ slug: t.slug })),
  ];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const commune = getCommuneBySlug(slug);
  if (commune) {
    return {
      title: `Location vacances ${commune.name} — Mas, Villas, Hébergements`,
      description: `Locations de vacances à ${commune.name} : mas provençaux, villas avec piscine et hébergements de caractère sélectionnés par Entre Rhône et Alpilles. Réservez directement.`,
      alternates: { canonical: `https://entre-rhone-alpilles.fr/locations/${commune.slug}` },
      openGraph: { title: `Location vacances ${commune.name}`, description: commune.description },
    };
  }

  const pt = getPropertyTypeBySlug(slug);
  if (pt) {
    return {
      title: `${pt.plural} à louer en Provence — Alpilles & Rhône`,
      description: `Trouvez votre ${pt.name.toLowerCase()} de vacances en Provence. ${pt.description}. Sélection exclusive Entre Rhône et Alpilles.`,
      alternates: { canonical: `https://entre-rhone-alpilles.fr/locations/${pt.slug}` },
    };
  }

  const at = activityTags.find((t) => t.slug === slug);
  if (at) {
    return {
      title: `Hébergements ${at.name} en Provence — Alpilles & Rhône`,
      description: `Hébergements idéaux pour ${at.name.toLowerCase()} en Provence. ${at.description}. Sélectionnés par notre conciergerie locale.`,
      alternates: { canonical: `https://entre-rhone-alpilles.fr/locations/${at.slug}` },
    };
  }

  return {};
}

const mockProperties = (label: string) => [
  { title: `Mas de charme — ${label}`, location: label, type: "Mas", guests: 8, price: 280, rating: 4.9, reviewCount: 32, hasPiscine: true, slug: `mas-charme-${label.toLowerCase().replace(/[\s,]/g, "-")}` },
  { title: `Villa provençale — ${label}`, location: label, type: "Villa", guests: 6, price: 220, rating: 4.8, reviewCount: 18, hasPiscine: true, slug: `villa-provencale-${label.toLowerCase().replace(/[\s,]/g, "-")}` },
  { title: `Gîte authentique — ${label}`, location: label, type: "Gîte", guests: 4, price: 130, rating: 4.7, reviewCount: 24, hasPiscine: false, slug: `gite-authentique-${label.toLowerCase().replace(/[\s,]/g, "-")}` },
];

export default async function LocationsSlugPage({ params }: Props) {
  const { slug } = await params;

  const commune = getCommuneBySlug(slug);
  if (commune) {
    const properties = mockProperties(commune.name);

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
                  {commune.circle === 1 ? "Cœur des Alpilles" : commune.circle === 2 ? "Zone de développement" : "Frontière stratégique"}
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
            <div className="flex items-center justify-between mb-8">
              <h2 id="properties-heading" className="font-serif text-2xl font-bold text-gray-900">
                Hébergements à {commune.name}
              </h2>
              <span className="text-sm text-gray-500">{properties.length} biens disponibles</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {properties.map((p) => <PropertyCard key={p.slug} {...p} />)}
            </div>

            <div className="border-t border-gray-100 pt-12">
              <h2 className="font-serif text-xl font-bold text-gray-900 mb-6">
                Explorer par type de bien à {commune.name}
              </h2>
              <div className="flex flex-wrap gap-3">
                {commune.propertyTypes.map((type) => {
                  const pt = propertyTypes.find((p) => p.slug === type);
                  return (
                    <Link key={type} href={`/locations/${commune.slug}/${type}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-cream)] rounded-full text-sm font-medium text-gray-700 hover:bg-[var(--color-rhone)] hover:text-white transition-colors">
                      {pt?.icon} {pt?.plural ?? type}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[var(--color-cream)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
              Pourquoi séjourner à {commune.name} ?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">{commune.description}</p>
            <p className="text-gray-600 leading-relaxed">
              Avec notre service de conciergerie local, vous bénéficiez d&apos;un accueil personnalisé,
              de recommandations d&apos;initiés et d&apos;une assistance disponible tout au long de votre séjour.
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
    const properties = mockProperties(pt.plural);
    const communesWithType = communes.filter((c) => c.propertyTypes.includes(slug));

    const faqItems = [
      { question: `Qu'est-ce qu'un ${pt.name.toLowerCase()} en Provence ?`, answer: `${pt.description}. Nos ${pt.plural.toLowerCase()} sont sélectionnés pour leur authenticité et leur qualité.` },
      { question: `Dans quelles communes trouver des ${pt.plural.toLowerCase()} ?`, answer: `Nos ${pt.plural.toLowerCase()} sont disponibles à ${communesWithType.slice(0, 5).map((c) => c.name).join(", ")} et dans plusieurs autres communes de la région.` },
      { question: `Quel est le prix d'un ${pt.name.toLowerCase()} en Provence ?`, answer: `Les prix varient selon la localisation, la capacité et la période. Comptez entre 100€ et 600€/nuit selon les biens.` },
    ];

    return (
      <div className="pt-20">
        <div className="bg-[var(--color-cream)] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb items={[{ label: "Locations", href: "/locations" }, { label: pt.plural }]} />
            <div className="mt-8 max-w-3xl">
              <div className="text-4xl mb-4" aria-hidden="true">{pt.icon}</div>
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
              {properties.map((p) => <PropertyCard key={p.slug} {...p} />)}
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
    const properties = mockProperties(at.name);

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
              <div className="text-4xl mb-4" aria-hidden="true">{at.icon}</div>
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
              {properties.map((p) => <PropertyCard key={p.slug} {...p} />)}
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
