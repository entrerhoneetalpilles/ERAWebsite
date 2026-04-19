import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Star, Home, TrendingUp, Shield } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import CommuneCard from "@/components/CommuneCard";
import TestimonialCard from "@/components/TestimonialCard";
import BlogCard from "@/components/BlogCard";
import FAQAccordion from "@/components/FAQAccordion";
import { communes, testimonials, blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Conciergerie Airbnb en Provence — Entre Rhône et Alpilles",
  description:
    "Conciergerie de locations saisonnières haut de gamme entre le Rhône et les Alpilles. Délégation totale pour propriétaires, hébergements d'exception pour voyageurs. 20 communes couvertes en Provence.",
};

const stats = [
  { value: "30+", label: "Biens gérés" },
  { value: "4,9★", label: "Note moyenne" },
  { value: "20", label: "Communes couvertes" },
  { value: "85%", label: "Taux d'occupation" },
];

const ownerBenefits = [
  {
    icon: <TrendingUp className="w-6 h-6" aria-hidden="true" />,
    title: "Revenus maximisés",
    desc: "Tarification dynamique et optimisation des calendriers pour augmenter vos revenus jusqu'à +40%.",
  },
  {
    icon: <Shield className="w-6 h-6" aria-hidden="true" />,
    title: "Zéro stress",
    desc: "Check-in/out, ménage, linge, communication voyageurs — nous gérons tout à votre place.",
  },
  {
    icon: <Home className="w-6 h-6" aria-hidden="true" />,
    title: "Votre bien préservé",
    desc: "Sélection rigoureuse des voyageurs, état des lieux systématique, assurance incluse.",
  },
];

const faqItems = [
  {
    question: "Quels sont les honoraires de la conciergerie ?",
    answer:
      "Nos honoraires sont de 20 à 25% des revenus locatifs générés, selon les services choisis. Pas de frais fixes, pas de surprise : vous ne payez que sur vos revenus réels.",
  },
  {
    question: "Quelles communes couvrez-vous en Provence ?",
    answer:
      "Nous couvrons 20 communes entre le Rhône et les Alpilles : Saint-Rémy-de-Provence, Les Baux, Maussane, Fontvieille, Paradou, Arles, Villeneuve-lès-Avignon, Tarascon, Eygalières et bien d'autres.",
  },
  {
    question: "Comment fonctionne le check-in des voyageurs ?",
    answer:
      "Nous assurons l'accueil personnalisé de chaque voyageur, en présentiel ou via une boîte à clés sécurisée. Un guide de bienvenue personnalisé est remis à chaque arrivée.",
  },
  {
    question: "Mon bien est-il assuré pendant les locations ?",
    answer:
      "Oui, tous nos biens bénéficient de la garantie dommages d'Airbnb (jusqu'à 3M€) et nous vérifions que votre assurance habitation couvre la location courte durée.",
  },
  {
    question: "Puis-je bloquer des dates pour un usage personnel ?",
    answer:
      "Absolument. Vous conservez la maîtrise de votre calendrier et pouvez bloquer des dates à tout moment depuis votre espace propriétaire.",
  },
];

const featuredProperties = [
  { title: "Mas des Oliviers — Vue Alpilles", location: "Saint-Rémy-de-Provence", type: "Mas", guests: 8, price: 320, rating: 4.9, reviewCount: 47, hasPiscine: true, slug: "mas-des-oliviers-saint-remy", featured: true },
  { title: "Villa Baux — Terrasse panoramique", location: "Les Baux-de-Provence", type: "Villa", guests: 6, price: 280, rating: 4.8, reviewCount: 31, hasPiscine: true, slug: "villa-baux-terrasse", featured: false },
  { title: "Mas Maussane — Cœur des Alpilles", location: "Maussane-les-Alpilles", type: "Mas", guests: 10, price: 390, rating: 5.0, reviewCount: 22, hasPiscine: true, slug: "mas-maussane-alpilles", featured: false },
  { title: "Appartement du Théâtre — Arles", location: "Arles", type: "Appartement", guests: 4, price: 140, rating: 4.9, reviewCount: 58, hasPiscine: false, slug: "appartement-theatre-arles", featured: false },
  { title: "Bastide Eygalières — Luxe absolu", location: "Eygalières", type: "Bastide", guests: 12, price: 650, rating: 5.0, reviewCount: 14, hasPiscine: true, slug: "bastide-eygalieres-luxe", featured: false },
  { title: "Gîte Paradou — Oliviers centenaires", location: "Paradou", type: "Gîte", guests: 4, price: 165, rating: 4.8, reviewCount: 36, hasPiscine: false, slug: "gite-paradou-oliviers", featured: false },
];

const topCommunes = communes.filter((c) =>
  ["saint-remy-de-provence", "arles", "les-baux-de-provence", "eygalieres"].includes(c.slug)
);

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "LodgingBusiness"],
      "@id": "https://entre-rhone-alpilles.fr/#business",
      name: "Entre Rhône et Alpilles — Conciergerie",
      alternateName: "ERA Conciergerie Provence",
      description: "Conciergerie de locations saisonnières haut de gamme entre le Rhône et les Alpilles. Gestion Airbnb, Booking, VRBO pour propriétaires. 20 communes en Provence.",
      url: "https://entre-rhone-alpilles.fr",
      telephone: "+33600000000",
      email: "contact@entre-rhone-alpilles.fr",
      foundingDate: "2023",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Saint-Rémy-de-Provence",
        addressLocality: "Saint-Rémy-de-Provence",
        postalCode: "13210",
        addressRegion: "Provence-Alpes-Côte d'Azur",
        addressCountry: "FR",
      },
      geo: { "@type": "GeoCoordinates", latitude: 43.789, longitude: 4.832 },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "19:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "17:00" },
      ],
      areaServed: [
        "Saint-Rémy-de-Provence","Les Baux-de-Provence","Maussane-les-Alpilles","Fontvieille","Paradou",
        "Arles","Villeneuve-lès-Avignon","Tarascon","Boulbon","Graveson","Barbentane","Châteaurenard",
        "Saint-Étienne-du-Grès","Eygalières","Aureille","Mouriès","Mollégès","Noves","Verquières","Orgon",
      ].map((name) => ({ "@type": "City", name, containedInPlace: { "@type": "State", name: "Provence-Alpes-Côte d'Azur" } })),
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "208", bestRating: "5", worstRating: "1" },
      priceRange: "€€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Carte bancaire, Virement",
      hasMap: "https://maps.google.com/?q=Saint-Rémy-de-Provence",
      sameAs: [
        "https://www.airbnb.fr",
        "https://www.facebook.com/entrerhonealpilles",
        "https://www.instagram.com/entrerhonealpilles",
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://entre-rhone-alpilles.fr/#organization",
      name: "Entre Rhône et Alpilles",
      url: "https://entre-rhone-alpilles.fr",
      logo: { "@type": "ImageObject", url: "https://entre-rhone-alpilles.fr/logo.png", width: 200, height: 60 },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+33600000000",
        contactType: "customer service",
        availableLanguage: ["French","English"],
        areaServed: "FR",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://entre-rhone-alpilles.fr/#website",
      url: "https://entre-rhone-alpilles.fr",
      name: "Entre Rhône et Alpilles",
      inLanguage: "fr-FR",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: "https://entre-rhone-alpilles.fr/locations?q={search_term_string}" },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[var(--color-rhone-dark)] via-[var(--color-rhone)] to-[var(--color-alpilles-dark)] pt-20" aria-labelledby="hero-heading">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--color-or)] animate-pulse" aria-hidden="true" />
            Conciergerie Premium en Provence
          </p>
          <h1 id="hero-heading" className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Conciergerie Airbnb<br />
            <span className="text-[var(--color-or)]">entre Rhône et Alpilles</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed">
            Délégation totale de la gestion locative avec maximisation des revenus et zéro stress — ou séjournez dans nos hébergements d'exception en Provence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/conciergerie/estimer-mes-revenus" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-or)] text-white font-semibold rounded-xl hover:bg-[var(--color-or-light)] transition-colors text-base shadow-lg">
              Confier mon bien <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/locations" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 text-white font-semibold rounded-xl hover:bg-white/25 transition-colors text-base backdrop-blur-sm border border-white/20">
              Trouver un hébergement <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-serif text-3xl font-bold text-[var(--color-or)]">{s.value}</p>
                <p className="text-white/75 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPRIÉTAIRES */}
      <section className="py-20 bg-[var(--color-cream)]" aria-labelledby="owners-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-[var(--color-rhone)] text-sm font-semibold uppercase tracking-wider mb-3">Pour les propriétaires</p>
            <h2 id="owners-heading" className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Votre bien en de bonnes mains</h2>
            <p className="text-gray-600 leading-relaxed">Confiez la gestion de votre mas, villa ou appartement à notre équipe locale. Nous optimisons vos revenus tout en préservant votre tranquillité et votre bien.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {ownerBenefits.map((b) => (
              <div key={b.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-rhone)]/10 text-[var(--color-rhone)] flex items-center justify-center mb-4">{b.icon}</div>
                <h3 className="font-serif text-lg font-semibold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/conciergerie/estimer-mes-revenus" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-rhone)] text-white font-semibold rounded-xl hover:bg-[var(--color-rhone-light)] transition-colors">
              Estimer mes revenus <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/conciergerie/nos-services" className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-rhone)] text-[var(--color-rhone)] font-semibold rounded-xl hover:bg-[var(--color-rhone)]/5 transition-colors">
              Découvrir nos services
            </Link>
          </div>
        </div>
      </section>

      {/* BIENS À LA UNE */}
      <section className="py-20 bg-white" aria-labelledby="featured-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[var(--color-alpilles)] text-sm font-semibold uppercase tracking-wider mb-3">Pour les voyageurs</p>
              <h2 id="featured-heading" className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">Nos hébergements d'exception</h2>
            </div>
            <Link href="/locations" className="hidden sm:flex items-center gap-1.5 text-[var(--color-rhone)] font-semibold text-sm hover:text-[var(--color-rhone-light)] transition-colors">
              Voir tout <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((p) => (
              <PropertyCard key={p.slug} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="py-20 bg-[var(--color-cream)]" aria-labelledby="destinations-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[var(--color-rhone)] text-sm font-semibold uppercase tracking-wider mb-3">Notre territoire</p>
            <h2 id="destinations-heading" className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Destinations populaires</h2>
            <p className="text-gray-600 max-w-xl mx-auto">20 communes entre le Rhône et les Alpilles — de Villeneuve-lès-Avignon à Eygalières.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {topCommunes.map((c) => (
              <CommuneCard key={c.slug} commune={c} />
            ))}
          </div>
          <div className="text-center">
            <Link href="/destinations" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-rhone)] text-white font-semibold rounded-xl hover:bg-[var(--color-rhone-light)] transition-colors">
              Toutes les destinations <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="py-20 bg-white" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-4" role="img" aria-label="5 étoiles">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-[var(--color-or)] text-[var(--color-or)]" aria-hidden="true" />
              ))}
            </div>
            <h2 id="testimonials-heading" className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Ils nous font confiance</h2>
            <p className="text-gray-600">4,9/5 · Plus de 200 avis vérifiés</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/avis" className="inline-flex items-center gap-1.5 text-[var(--color-rhone)] font-semibold hover:text-[var(--color-rhone-light)] transition-colors">
              Lire tous les avis <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-20 bg-[var(--color-cream)]" aria-labelledby="blog-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[var(--color-rhone)] text-sm font-semibold uppercase tracking-wider mb-3">Blog & Conseils</p>
              <h2 id="blog-heading" className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">Derniers articles</h2>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-1.5 text-[var(--color-rhone)] font-semibold text-sm hover:text-[var(--color-rhone-light)] transition-colors">
              Voir tout <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="faq-heading" className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
            <p className="text-gray-600">Tout ce que vous devez savoir sur notre service de conciergerie.</p>
          </div>
          <FAQAccordion items={faqItems} />
          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">Vous avez d'autres questions ?</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-rhone)] text-white font-semibold rounded-xl hover:bg-[var(--color-rhone-light)] transition-colors">
              Nous contacter <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-gradient-to-br from-[var(--color-rhone)] to-[var(--color-alpilles-dark)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">Prêt à déléguer la gestion de votre bien ?</h2>
          <p className="text-white/80 text-lg mb-8">Estimation gratuite en 2 minutes. Nos experts locaux vous répondent sous 24h.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/conciergerie/estimer-mes-revenus" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-or)] text-white font-bold rounded-xl hover:bg-[var(--color-or-light)] transition-colors text-base">
              Estimer mes revenus gratuitement <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 text-white font-semibold rounded-xl hover:bg-white/25 transition-colors border border-white/20">
              Parler à un expert
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
