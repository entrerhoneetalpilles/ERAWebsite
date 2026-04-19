import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/lib/data";
import { formatDate as fmtDate } from "@/lib/utils";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Blog Entre Rhône et Alpilles`,
    description: post.excerpt,
    alternates: { canonical: `https://entre-rhone-alpilles.fr/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Entre Rhône et Alpilles"],
      tags: [post.category, "Provence", "Alpilles"],
    },
  };
}

const articleContent: Record<string, string[]> = {
  "preparer-location-estivale-provence": [
    "La saison estivale en Provence est la plus lucrative pour les propriétaires de locations saisonnières. Juin, juillet, août et septembre représentent souvent 60 à 70% des revenus annuels d'un bien. Bien se préparer est donc essentiel pour maximiser ces revenus.",
    "**Soigner les photos de votre annonce** est la première priorité. Les voyageurs scannent des dizaines d'annonces en quelques secondes : des photos professionnelles, lumineuses et bien composées font la différence. Nous recommandons de refaire les photos tous les 2 ans, et surtout après chaque rénovation.",
    "**La tarification dynamique** est votre meilleur allié. Les prix doivent s'ajuster quotidiennement en fonction de la demande, des événements locaux et de la concurrence. Un bien à Saint-Rémy-de-Provence peut valoir 250€/nuit en mai et 420€/nuit un week-end de juillet. Des outils comme PriceLabs automatisent ces ajustements.",
    "**Préparez votre bien physiquement** : vérifiez la climatisation (indispensable en Provence l'été), le bon état de la piscine et son système de filtration, l'état des stores et volets. Un check-up technique en avril vous évitera les urgences en juillet.",
    "**Répondez vite aux demandes** : sur Airbnb, un taux de réponse élevé et rapide (moins d'une heure) améliore votre classement dans les résultats de recherche. En haute saison, les voyageurs envoient plusieurs demandes en parallèle — le premier à répondre gagne souvent la réservation.",
    "**Constituez un kit de bienvenue** provençal : huile d'olive locale, savon de Marseille, quelques bouteilles de vin de la région, un guide des marchés et restaurants. Ces petites attentions génèrent des avis 5 étoiles et des retours.",
    "Avec Entre Rhône et Alpilles, tout cela est géré pour vous. Notre équipe s'occupe de la préparation, de la tarification et de l'accueil — vous n'avez qu'à percevoir vos revenus.",
  ],
  "guide-feria-arles": [
    "La Feria d'Arles est l'un des événements les plus spectaculaires de Provence. Deux fois par an — à Pâques et en septembre — la ville se transforme pendant 5 jours en capitale de la tauromachie et de la fête. En 2025, la Feria de Pâques se tient du 17 au 21 avril, la Feria des Vendanges du 12 au 14 septembre.",
    "**Les arènes romaines** sont évidemment le cœur de la Feria. Classées au patrimoine mondial UNESCO, elles accueillent corridas, novilladas et spectacles équestres. Les billets pour les corridas de gala se vendent en quelques heures — réservez dès l'ouverture des ventes (généralement 3 mois avant).",
    "**La Feria ne se réduit pas aux arènes.** Les bandas (fanfares) parcourent les rues à toute heure, les bodégas (buvettes géantes) résonnent de flamenco, les terrasses débordent. Le centre historique d'Arles se vit entièrement à pied.",
    "**Où se loger pendant la Feria ?** Les hébergements sont pris d'assaut dès octobre pour la Feria de Pâques. Privilégiez un appartement en centre-ville pour marcher jusqu'aux arènes, ou un mas dans les Alpilles (15-20 min) pour fuir le bruit la nuit. Nos appartements à Arles et nos mas à Saint-Rémy sont très demandés.",
    "**Conseils pratiques :** arrivez à Arles en train (gare à 15 min des arènes à pied). La voiture est déconseillée — parking introuvable. Habillez-vous en blanc pour la Feria de Pâques, tradition oblige. Budget boisson/restauration : 50-80€/jour minimum.",
    "**Que faire en dehors des corridas ?** La fondation LUMA, les Alyscamps, le musée de l'Arles antique — profitez des journées plus calmes pour visiter une ville exceptionnelle.",
  ],
  "printemps-alpilles-que-faire": [
    "Le printemps est sans doute la plus belle saison dans les Alpilles. De mars à mai, la nature explose de couleurs : les amandiers en fleurs, les cerisiers, les premières lavandes, les coquelicots dans la plaine. La lumière provençale retrouve sa douceur après l'hiver.",
    "**Randonnée sur le GR653 :** le sentier de Saint-Jacques traverse les Alpilles de Fontvieille à Eygalières. Au printemps, la garrigue embaume le thym et le romarin. Comptez 3 à 4 heures pour le tronçon le plus beau entre Les Baux et Saint-Rémy.",
    "**Les marchés provençaux en pleine forme :** le marché de Saint-Rémy-de-Provence (mercredi matin) est particulièrement festif au printemps — asperges vertes, fraises de Carpentras, premiers melons, fromages de chèvre frais. Arrivez avant 9h pour éviter la foule.",
    "**Vélo sur la Via Rhôna :** la piste cyclable longe le Rhône de Villeneuve-lès-Avignon à Arles sur 60 km. Terrain plat, paysages de plaine, villages de charme — idéal pour les familles avec enfants.",
    "**Les Carrières de Lumières :** le spectacle son et lumière des Carrières, dans les entrailles calcaires des Baux, change chaque année. Au printemps, profitez-en avant les files d'attente de l'été. Réservation en ligne conseillée.",
    "**Le printemps en chiffres :** température 15-22°C, ensoleillement maximal, pas de foule, prix des hébergements 20-30% inférieurs à l'été. La saison idéale pour découvrir la région authentiquement.",
    "**Où loger au printemps dans les Alpilles ?** Nos mas et gîtes avec jardin et piscine (parfois non encore chauffée en mars-avril) offrent des prix très attractifs. C'est la période préférée des connaisseurs.",
  ],
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = articleContent[slug] ?? [post.excerpt];
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Entre Rhône et Alpilles",
      url: "https://entre-rhone-alpilles.fr",
    },
    publisher: {
      "@type": "Organization",
      name: "Entre Rhône et Alpilles",
      logo: { "@type": "ImageObject", url: "https://entre-rhone-alpilles.fr/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://entre-rhone-alpilles.fr/blog/${slug}` },
    articleSection: post.category,
    inLanguage: "fr-FR",
  };

  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.category, href: "/blog" }, { label: post.title }]} />
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-rhone)]/10 text-[var(--color-rhone)] rounded-full font-medium">
              <Tag className="w-3 h-3" aria-hidden="true" />
              {post.category}
            </span>
            <time dateTime={post.date}>{fmtDate(post.date)}</time>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {post.readTime} min
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-[var(--color-or)] pl-5">
            {post.excerpt}
          </p>
        </header>

        {/* Illustration */}
        <div className="aspect-[16/9] bg-gradient-to-br from-[var(--color-cream)] to-[var(--color-alpilles)]/30 rounded-2xl mb-10"
          role="img" aria-label={`Illustration pour "${post.title}"`} />

        {/* Content */}
        <div className="space-y-6">
          {content.map((paragraph, i) => (
            <p key={i} className="text-gray-700 leading-relaxed text-base"
              dangerouslySetInnerHTML={{
                __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }}
            />
          ))}
        </div>

        {/* Author */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-rhone)] text-white flex items-center justify-center font-serif font-bold text-lg">
            E
          </div>
          <div>
            <p className="font-semibold text-gray-900">Équipe Entre Rhône et Alpilles</p>
            <p className="text-sm text-gray-500">Conciergerie & Experts locaux en Provence</p>
          </div>
        </div>

        {/* Share */}
        <div className="mt-8 p-5 bg-[var(--color-cream)] rounded-xl">
          <p className="text-sm font-semibold text-gray-700 mb-3">Partager cet article</p>
          <div className="flex gap-3">
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://entre-rhone-alpilles.fr/blog/${slug}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 bg-black text-white text-xs font-medium rounded-lg hover:opacity-80 transition-opacity">
              X (Twitter)
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://entre-rhone-alpilles.fr/blog/${slug}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:opacity-80 transition-opacity">
              Facebook
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 p-8 bg-[var(--color-rhone)] rounded-2xl text-center text-white">
          <p className="font-serif text-xl font-bold mb-3">Vous êtes propriétaire en Provence ?</p>
          <p className="text-white/80 text-sm mb-6">Confiez la gestion de votre bien et maximisez vos revenus locatifs.</p>
          <Link href="/conciergerie/estimer-mes-revenus"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-or)] text-white font-semibold rounded-xl hover:bg-[var(--color-or-light)] transition-colors">
            Estimation gratuite <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-16 bg-[var(--color-cream)]" aria-labelledby="related-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="related-heading" className="font-serif text-2xl font-bold text-gray-900 mb-8">Articles liés</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((p) => <BlogCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
