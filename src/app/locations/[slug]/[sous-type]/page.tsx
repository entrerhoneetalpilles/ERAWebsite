import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import PropertyCard from "@/components/PropertyCard";
import FAQAccordion from "@/components/FAQAccordion";
import { communes, getCommuneBySlug, getPropertyTypeBySlug } from "@/lib/data";

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
    description: `${pt.plural} à louer à ${commune.name} en Provence. Hébergements de caractère sélectionnés par Entre Rhône et Alpilles. Réservation directe.`,
    alternates: { canonical: `https://entre-rhone-alpilles.fr/locations/${commune.slug}/${sousType}` },
  };
}

export default async function LocationsVilleTypePage({ params }: Props) {
  const { slug, "sous-type": sousType } = await params;
  const commune = getCommuneBySlug(slug);
  const pt = getPropertyTypeBySlug(sousType);
  if (!commune || !pt) notFound();

  const mockProperties = [
    { title: `${pt.name} de charme — ${commune.name}`, location: commune.name, type: pt.name, guests: 6, price: 240, rating: 4.9, reviewCount: 28, hasPiscine: sousType === "avec-piscine", slug: `${sousType}-charme-${slug}` },
    { title: `${pt.name} Vue Alpilles — ${commune.name}`, location: commune.name, type: pt.name, guests: 8, price: 310, rating: 4.8, reviewCount: 19, hasPiscine: sousType === "avec-piscine", slug: `${sousType}-vue-alpilles-${slug}` },
  ];

  const faqItems = [
    {
      question: `Quels ${pt.plural.toLowerCase()} propose Entre Rhône et Alpilles à ${commune.name} ?`,
      answer: `Nous proposons des ${pt.plural.toLowerCase()} de qualité à ${commune.name}, tous contrôlés et gérés par notre équipe locale. ${pt.description}.`,
    },
    {
      question: `Quel est le prix d'un ${pt.name.toLowerCase()} à ${commune.name} ?`,
      answer: `Les prix varient selon la capacité, la période et les équipements. Comptez entre 150€ et 500€/nuit pour un ${pt.name.toLowerCase()} à ${commune.name}. Nos tarifs incluent les charges et la taxe de séjour.`,
    },
    {
      question: `Puis-je louer un ${pt.name.toLowerCase()} à ${commune.name} pour une semaine ?`,
      answer: `Oui, nous acceptons les locations à la semaine et au-delà. En basse saison, des durées de 2 à 3 nuits sont également possibles.`,
    },
  ];

  return (
    <div className="pt-20">
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
              triés sur le volet par notre équipe conciergerie locale.
            </p>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {mockProperties.map((p) => (
              <PropertyCard key={p.slug} {...p} href={`/locations/${slug}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-cream)]">
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
