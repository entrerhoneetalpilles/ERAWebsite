import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import FAQAccordion from "@/components/FAQAccordion";
import { communes, getCommuneBySlug, getPropertyTypeBySlug } from "@/lib/data";
import { OG_IMG } from "@/lib/og";

export async function generateStaticParams() {
  const params: { slug: string; "sous-type": string }[] = [];
  for (const commune of communes) {
    for (const type of commune.propertyTypes) {
      params.push({ slug: commune.slug, "sous-type": type });
    }
  }
  return params;
}

type Props = { params: Promise<{ slug: string; "sous-type": string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, "sous-type": sousType } = await params;
  const commune = getCommuneBySlug(slug);
  const pt = getPropertyTypeBySlug(sousType);
  if (!commune || !pt) return {};
  return {
    title: `${pt.plural} à ${commune.name} — Location Provence`,
    description: `${pt.plural} à louer à ${commune.name} en Provence. ${pt.description}. Sélectionnés et gérés par notre conciergerie locale — ERA. Réservation directe.`,
    alternates: { canonical: `https://entre-rhone-alpilles.fr/locations/${commune.slug}/${sousType}` },
    openGraph: {
      title: `${pt.plural} à ${commune.name} — Location Provence`,
      description: `${pt.plural} de caractère à ${commune.name} sélectionnés par Entre Rhône et Alpilles. ${commune.atout}.`,
      url: `https://entre-rhone-alpilles.fr/locations/${commune.slug}/${sousType}`,
      images: OG_IMG,
    },
  };
}

export default async function LocationsVilleTypePage({ params }: Props) {
  const { slug, "sous-type": sousType } = await params;
  const commune = getCommuneBySlug(slug);
  const pt = getPropertyTypeBySlug(sousType);
  if (!commune || !pt) notFound();

  const faqItems = [
    {
      question: `Qu'est-ce qu'un ${pt.name.toLowerCase()} en Provence ?`,
      answer: `${pt.description}. Les ${pt.plural.toLowerCase()} de Provence se distinguent par leur architecture authentique — pierre calcaire, tomettes, tuiles canal — et leurs espaces extérieurs généreux : terrasse ombragée, jardin planté d'oliviers ou piscine privée. À ${commune.name}, ils bénéficient en plus d'un cadre naturel exceptionnel : ${commune.atout.toLowerCase()}.`,
    },
    {
      question: `Quels ${pt.plural.toLowerCase()} propose ERA à ${commune.name} ?`,
      answer: `Nous gérons plusieurs ${pt.plural.toLowerCase()} de qualité à ${commune.name}, tous inspectés et gérés par notre équipe de conciergerie locale. Notre sélection privilégie les biens avec cachet provençal, espaces extérieurs et équipements premium. Contactez-nous directement pour connaître les disponibilités actuelles et obtenir une sélection personnalisée.`,
    },
    {
      question: `Quel est le prix d'un ${pt.name.toLowerCase()} à ${commune.name} ?`,
      answer: `À ${commune.name}, les tarifs varient selon la capacité, la saison et les équipements du bien. En règle générale, comptez entre 150 € et 600 €/nuit selon le standing. Juillet-août et les périodes événementielles (Feria d'Arles, Rencontres Photo, marchés de Noël) affichent les tarifs les plus élevés. Le printemps (avril-juin) et l'automne (septembre-octobre) offrent les meilleurs rapports qualité/prix.`,
    },
    {
      question: `Quelle est la durée minimale de location à ${commune.name} ?`,
      answer: `La durée minimale dépend du bien et de la saison. En haute saison (juillet-août), une semaine minimum est souvent demandée pour les ${pt.plural.toLowerCase()} les plus prisés. Le reste de l'année, 2 à 3 nuits sont généralement possibles. Précisez vos dates lors de votre demande — nous adaptons selon les disponibilités.`,
    },
    {
      question: `Quels services sont inclus avec la location ?`,
      answer: `Tous nos ${pt.plural.toLowerCase()} à ${commune.name} incluent un accueil personnalisé à votre arrivée, le linge de maison (draps, serviettes), un guide local sur mesure (restaurants, marchés, activités) et une assistance disponible 7j/7 pendant tout votre séjour. Le ménage de fin de séjour est inclus ou facturé selon les biens.`,
    },
  ];

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${pt.plural} à ${commune.name}`,
    description: `${pt.plural} de caractère à ${commune.name} en Provence — Entre Rhône et Alpilles`,
    url: `https://entre-rhone-alpilles.fr/locations/${slug}/${sousType}`,
    numberOfItems: 3,
    itemListElement: [
      { "@type": "ListItem", position: 1, item: { "@type": "LodgingBusiness", name: `${pt.name} de charme — ${commune.name}`, address: { "@type": "PostalAddress", addressLocality: commune.name, addressCountry: "FR" } } },
      { "@type": "ListItem", position: 2, item: { "@type": "LodgingBusiness", name: `${pt.name} Vue Alpilles — ${commune.name}`, address: { "@type": "PostalAddress", addressLocality: commune.name, addressCountry: "FR" } } },
    ],
  };

  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: "Locations", href: "/locations" },
            { label: commune.name, href: `/locations/${commune.slug}` },
            { label: pt.plural },
          ]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {pt.plural} à {commune.name}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {pt.description}. Découvrez notre sélection de {pt.plural.toLowerCase()} à {commune.name},
              gérés par notre équipe de conciergerie locale implantée dans les Alpilles.
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--color-cream)] rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-gray-900 mb-2">
                Voir les {pt.plural.toLowerCase()} disponibles à {commune.name}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Notre portfolio de {pt.plural.toLowerCase()} évolue au fil des mandats. Contactez-nous pour
                connaître les disponibilités actuelles et recevoir une sélection personnalisée selon vos dates et votre groupe.
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
            Louer un {pt.name.toLowerCase()} à {commune.name}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              {pt.description}. À {commune.name}, nos {pt.plural.toLowerCase()} bénéficient
              d&apos;un cadre provençal d&apos;exception — {commune.atout.toLowerCase()} — qui fait de cette
              commune l&apos;une des destinations les plus prisées entre le Rhône et les Alpilles.
              Chaque bien est retenu pour son cachet, la qualité de ses équipements et son entretien irréprochable.
            </p>
            <p>
              {commune.description} La clientèle que nous accueillons à {commune.name} est principalement
              composée de {commune.profilVoyageur.toLowerCase()}. Nos {pt.plural.toLowerCase()} sont
              précisément calibrés pour répondre à ces attentes : espace, authenticité et immersion dans la
              Provence la plus préservée.
            </p>
            <p>
              Notre conciergerie ERA intervient exclusivement dans un périmètre maîtrisé entre le Rhône
              et les Alpilles — ce qui nous permet une réactivité terrain inégalée. À votre arrivée, un guide
              personnalisé vous attend avec nos adresses d&apos;initiés : marchés, producteurs, restaurants
              et activités à découvrir dans un rayon de 20 km. Notre équipe reste disponible 7j/7 pendant
              toute la durée de votre séjour.
            </p>
            <p>
              La Provence entre Rhône et Alpilles bénéficie de plus de 300 jours de soleil par an.
              La haute saison s&apos;étend d&apos;avril à octobre, avec des pics en juillet-août.
              Le printemps (avril-mai) et l&apos;automne (septembre-octobre) sont souvent préférés des
              voyageurs connaisseurs : températures idéales, marchés animés, paysages colorés et
              fréquentation plus sereine.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/conciergerie/${commune.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-rhone)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-rhone-dark)] transition-colors">
              Conciergerie à {commune.name} <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href={`/destinations/${commune.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--color-rhone)] text-[var(--color-rhone)] text-sm font-semibold rounded-lg hover:bg-[var(--color-rhone)]/5 transition-colors">
              Guide de {commune.name}
            </Link>
            {sousType !== "avec-piscine" && (
              <Link href={`/locations/avec-piscine/${commune.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:border-[var(--color-rhone)] hover:text-[var(--color-rhone)] transition-colors">
                Avec piscine à {commune.name}
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">
            FAQ — {pt.plural} à {commune.name}
          </h2>
          <FAQAccordion items={faqItems} />
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={`/locations/${commune.slug}`} className="inline-flex items-center gap-1.5 text-[var(--color-rhone)] font-semibold hover:text-[var(--color-rhone-light)] transition-colors">
              ← Tous les hébergements à {commune.name}
            </Link>
            <Link href={`/destinations/${commune.slug}`} className="inline-flex items-center gap-1.5 text-[var(--color-alpilles)] font-semibold hover:opacity-80 transition-colors">
              Guide de {commune.name} <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
