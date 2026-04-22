import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Heart, Zap } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { OG_IMG } from "@/lib/og";

export const metadata: Metadata = {
  title: "Notre histoire — Conciergerie Provence",
  description:
    "Histoire et valeurs d'une conciergerie de locations saisonnières haut de gamme en Provence, entre le Rhône et les Alpilles.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/a-propos" },
  openGraph: {
    title: "Notre histoire — Conciergerie Provence",
    description: "L'histoire, la vision et l'engagement d'une conciergerie haut de gamme en Provence.",
    url: "https://entre-rhone-alpilles.fr/a-propos",
    images: OG_IMG,
  },
};

const values = [
  {
    icon: <MapPin className="w-6 h-6" aria-hidden="true" />,
    title: "Ancrage local",
    text: "Nous vivons et travaillons dans les Alpilles depuis des années. Nous connaissons chaque village, chaque artisan, chaque plombier disponible un dimanche soir.",
  },
  {
    icon: <Heart className="w-6 h-6" aria-hidden="true" />,
    title: "Passion du détail",
    text: "Chaque bien est traité comme s'il était le nôtre. Du kit de bienvenue au guide local personnalisé, chaque détail compte pour transformer un séjour en souvenir inoubliable.",
  },
  {
    icon: <Zap className="w-6 h-6" aria-hidden="true" />,
    title: "Performance mesurée",
    text: "Tarification dynamique, optimisation des annonces, reporting mensuel transparent. Nous nous engageons sur des résultats — et nous les mesurons ensemble.",
  },
];

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "À propos — Entre Rhône et Alpilles",
  url: "https://entre-rhone-alpilles.fr/a-propos",
  description: "Histoire et valeurs de la conciergerie Entre Rhône et Alpilles en Provence.",
  mainEntity: {
    "@type": "Organization",
    name: "Entre Rhône et Alpilles",
    url: "https://entre-rhone-alpilles.fr",
    description: "Conciergerie de locations saisonnières haut de gamme entre le Rhône et les Alpilles.",
    areaServed: {
      "@type": "Place",
      name: "Alpilles, Provence, France",
    },
  },
};

export default function AProposPage() {
  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "À propos" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl font-light mb-6">
              Nés de la Provence,<br />au service des propriétaires
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Entre Rhône et Alpilles est une conciergerie indépendante fondée par des amoureux de la région. Notre mission : permettre à chaque propriétaire de valoriser pleinement son bien sans en subir les contraintes.
            </p>
          </div>
        </div>
      </div>

      {/* Notre histoire */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-light mb-8">Notre histoire</h2>
          <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
            <p>
              Tout a commencé avec un constat simple : la région entre le Rhône et les Alpilles concentre certains des plus beaux patrimoines immobiliers de France — mas provençaux, bastides, villas avec vue — mais trop peu de propriétaires en tiraient le plein potentiel.
            </p>
            <p>
              Soit ils géraient eux-mêmes, au prix d'un stress considérable et de revenus sous-optimisés. Soit ils confiaient leur bien à des plateformes nationales sans connaissance locale, sans présence terrain, sans réelle personnalisation.
            </p>
            <p>
              Nous avons créé Entre Rhône et Alpilles pour combler ce vide : une conciergerie de proximité, avec un ancrage local profond, une exigence hôtelière et une transparence totale sur les performances.
            </p>
            <p>
              Aujourd'hui, nous gérons des biens de Saint-Rémy-de-Provence à Arles, d'Eygalières à Fontvieille. Chaque bien bénéficie d'une attention individuelle, d'une tarification dynamique professionnelle et d'une communication soignée avec les voyageurs.
            </p>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-20 bg-[var(--color-cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-light text-center mb-12">Ce qui nous distingue</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-xl p-8 border border-[var(--color-gres-clair)]">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-rhone)]/10 text-[var(--color-rhone)] flex items-center justify-center mb-5">
                  {v.icon}
                </div>
                <h3 className="font-serif text-xl font-light mb-3">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre zone */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-light mb-8">Notre territoire</h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            Nous intervenons exclusivement entre le Rhône et les Alpilles — un choix assumé. Cette concentration géographique nous permet une réactivité inégalée (intervention sur place en moins d'une heure), une connaissance fine du marché local et des partenariats solides avec les meilleurs prestataires de la région.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {["Saint-Rémy-de-Provence", "Eygalières", "Les Baux-de-Provence", "Maussane-les-Alpilles", "Fontvieille", "Paradou", "Arles", "Tarascon", "Villeneuve-lès-Avignon"].map((c) => (
              <div key={c} className="px-3 py-2 bg-[var(--color-cream)] rounded-lg text-sm text-gray-700 text-center border border-[var(--color-gres-clair)]">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--color-cream)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-light mb-4">Prêt à nous confier votre bien ?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Obtenez une estimation gratuite de vos revenus potentiels en moins de 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/conciergerie/estimer-mes-revenus"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-rhone)] text-white font-semibold rounded-lg hover:bg-[var(--color-rhone-light)] transition-colors">
              Estimer mes revenus <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[var(--color-rhone)] text-[var(--color-rhone)] font-semibold rounded-lg hover:bg-[var(--color-rhone)]/5 transition-colors">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
