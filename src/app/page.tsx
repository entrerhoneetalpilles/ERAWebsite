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
  title: {
    absolute:
      "Conciergerie Location Saisonnière Provence | Alpilles, Arles, Eygalières",
  },
  description:
    "Conciergerie de locations saisonnières dans les Alpilles et en Provence. Mas, villas, bastides entre Arles et Eygalières. Estimation gratuite en 2 min.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr" },
};

const stats = [
  { value: "30+", label: "Biens gérés" },
  { value: "4,9/5", label: "Note moyenne" },
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
  { title: "Mas des Oliviers — Vue Alpilles", location: "Saint-Rémy-de-Provence", type: "Mas", guests: 8, price: 320, rating: 4.9, reviewCount: 47, hasPiscine: true, slug: "mas-des-oliviers-saint-remy", href: "/locations/saint-remy-de-provence", featured: true, image: "/images/properties/mas-location-vacances-saint-remy-de-provence.jpg" },
  { title: "Villa Baux — Terrasse panoramique", location: "Les Baux-de-Provence", type: "Villa", guests: 6, price: 280, rating: 4.8, reviewCount: 31, hasPiscine: true, slug: "villa-baux-terrasse", href: "/locations/les-baux-de-provence", featured: false, image: "/images/properties/villa-location-les-baux-de-provence.jpg" },
  { title: "Mas Maussane — Cœur des Alpilles", location: "Maussane-les-Alpilles", type: "Mas", guests: 10, price: 390, rating: 5.0, reviewCount: 22, hasPiscine: true, slug: "mas-maussane-alpilles", href: "/locations/maussane-les-alpilles", featured: false, image: "/images/properties/mas-location-maussane-les-alpilles.jpg" },
  { title: "Appartement du Théâtre — Arles", location: "Arles", type: "Appartement", guests: 4, price: 140, rating: 4.9, reviewCount: 58, hasPiscine: false, slug: "appartement-theatre-arles", href: "/locations/arles", featured: false, image: "/images/properties/appartement-location-arles-provence.jpg" },
  { title: "Bastide Eygalières — Luxe absolu", location: "Eygalières", type: "Bastide", guests: 12, price: 650, rating: 5.0, reviewCount: 14, hasPiscine: true, slug: "bastide-eygalieres-luxe", href: "/locations/eygalieres", featured: false, image: "/images/properties/bastide-location-eygalieres-alpilles.jpg" },
  { title: "Gîte Paradou — Oliviers centenaires", location: "Paradou", type: "Gîte", guests: 4, price: 165, rating: 4.8, reviewCount: 36, hasPiscine: false, slug: "gite-paradou-oliviers", href: "/locations/paradou", featured: false, image: "/images/properties/gite-location-paradou-alpilles.jpg" },
];

const topCommunes = communes.filter((c) =>
  ["saint-remy-de-provence", "arles", "les-baux-de-provence", "eygalieres"].includes(c.slug)
);

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://entre-rhone-alpilles.fr/#business",
      name: "Entre Rhône et Alpilles — Conciergerie",
      alternateName: "ERA Conciergerie Provence",
      description: "Conciergerie de locations saisonnières haut de gamme entre le Rhône et les Alpilles. Gestion Airbnb, Booking, VRBO pour propriétaires. 20 communes en Provence.",
      url: "https://entre-rhone-alpilles.fr",
      telephone: "+33752907868",
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
      geo: { "@type": "GeoCoordinates", latitude: 43.7896, longitude: 4.8318 },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "19:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "17:00" },
      ],
      areaServed: [
        "Saint-Rémy-de-Provence","Les Baux-de-Provence","Maussane-les-Alpilles","Fontvieille","Paradou",
        "Arles","Villeneuve-lès-Avignon","Tarascon","Boulbon","Graveson","Barbentane","Châteaurenard",
        "Saint-Étienne-du-Grès","Eygalières","Aureille","Mouriès","Mollégès","Noves","Verquières","Orgon",
      ],
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.7", reviewCount: "40", bestRating: "5", worstRating: "1" },
      priceRange: "€€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Carte bancaire, Virement",
      hasMap: "https://maps.google.com/?q=Saint-Rémy-de-Provence",
      sameAs: [
        "https://www.facebook.com/entrerhoneetalpilles",
        "https://www.instagram.com/entrerhoneetalpilles",
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
        telephone: "+33752907868",
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
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://entre-rhone-alpilles.fr" },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      {/* HERO */}
      <section
        className="relative bg-[var(--color-cream)] pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, var(--color-gres-clair), transparent)" }}
          aria-hidden="true"
        />

        <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow */}
          <p
            className="text-[var(--color-sable)] text-xs uppercase tracking-[0.45em] mb-6 font-medium"
          >
            Provence &nbsp;·&nbsp; Alpilles &nbsp;·&nbsp; Rhône
          </p>

          {/* Thin gold divider */}
          <div
            className="w-12 h-px mx-auto mb-8"
            style={{ background: "var(--color-gres-moyen)", opacity: 0.7 }}
            aria-hidden="true"
          />

          {/* Heading */}
          <h1
            id="hero-heading"
            className="font-serif font-light text-5xl sm:text-6xl lg:text-7xl text-[var(--color-encre)] leading-[1.1] mb-6"
          >
            La conciergerie{" "}
            <br />
            <em className="not-italic text-[var(--color-rhone-dark)] italic">des Alpilles</em>{" "}
            <br />
            et de Provence
          </h1>

          {/* Description */}
          <p
            className="text-base sm:text-lg max-w-lg mx-auto mb-12 leading-relaxed"
            style={{ color: "var(--texte-leger)", fontWeight: 300 }}
          >
            Délégation totale de votre gestion locative — ou séjournez dans nos hébergements d&apos;exception entre le Rhône et les Alpilles.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-24">
            <Link
              href="/conciergerie/estimer-mes-revenus"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[var(--color-rhone)] text-white rounded-md hover:bg-[var(--color-rhone-dark)] transition-colors text-sm"
            >
              Confier mon bien <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md border text-sm tracking-[0.1em] uppercase font-medium transition-colors hover:bg-[var(--color-lin)]"
              style={{ borderColor: "var(--color-gres-moyen)", color: "var(--texte-corps)" }}
            >
              Nos hébergements
            </Link>
          </div>

          {/* Stats */}
          <div
            className="border-t pt-10 grid grid-cols-2 sm:grid-cols-4"
            style={{ borderColor: "var(--color-gres-clair)" }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="text-center py-2"
                style={i > 0 ? { borderLeft: "1px solid var(--gres-clair)" } : {}}
              >
                <p className="font-serif font-light text-3xl text-[var(--color-rhone-dark)]">
                  {s.value}
                </p>
                <p
                  className="text-xs mt-2 uppercase tracking-[0.12em]"
                  style={{ color: "var(--texte-discret)" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPRIÉTAIRES */}
      <section className="py-24 bg-white" aria-labelledby="owners-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p
              className="text-xs font-medium uppercase tracking-[0.2em] mb-4"
              style={{ color: "var(--color-rhone)" }}
            >
              Pour les propriétaires
            </p>
            <h2 id="owners-heading" className="font-serif font-normal text-3xl sm:text-4xl text-[var(--color-encre)] mb-4">
              Conciergerie dans les Alpilles — votre bien en de bonnes mains
            </h2>
            <p className="leading-relaxed" style={{ color: "var(--texte-leger)" }}>
              Confiez la gestion de votre mas, villa ou appartement à notre équipe locale. Nous optimisons vos revenus tout en préservant votre tranquillité et votre bien.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {ownerBenefits.map((b) => (
              <div
                key={b.title}
                className="bg-[var(--color-cream)] rounded-xl p-7 border hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                style={{ borderColor: "var(--color-gres-clair)" }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-5"
                  style={{ background: "rgba(140,158,110,0.12)", color: "var(--color-rhone-dark)" }}
                >
                  {b.icon}
                </div>
                <h3 className="font-serif font-normal text-lg text-[var(--color-encre)] mb-2">{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--texte-leger)" }}>{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/conciergerie/estimer-mes-revenus"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-rhone)] text-white rounded-md hover:bg-[var(--color-rhone-dark)] transition-colors"
            >
              Estimer mes revenus <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/conciergerie/nos-services"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-rhone)] text-[var(--color-rhone)] rounded-md hover:bg-[var(--color-cream)] transition-colors"
            >
              Découvrir nos services
            </Link>
            <Link href="/a-propos" className="inline-flex items-center gap-2 px-6 py-3 text-[var(--color-rhone)] font-semibold hover:underline transition-colors text-sm">
              Notre histoire →
            </Link>
          </div>
        </div>
      </section>

      {/* BIENS À LA UNE */}
      <section className="py-24 bg-[var(--color-cream)]" aria-labelledby="featured-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p
                className="text-xs font-medium uppercase tracking-[0.2em] mb-4"
                style={{ color: "var(--color-alpilles-dark)" }}
              >
                Pour les voyageurs
              </p>
              <h2 id="featured-heading" className="font-serif font-normal text-3xl sm:text-4xl text-[var(--color-encre)]">
                Nos hébergements d&apos;exception
              </h2>
            </div>
            <Link
              href="/locations"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[var(--color-rhone)]"
              style={{ color: "var(--color-rhone-dark)" }}
            >
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
      <section className="py-24 bg-[var(--color-lin)]" aria-labelledby="destinations-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p
              className="text-xs font-medium uppercase tracking-[0.2em] mb-4"
              style={{ color: "var(--color-rhone)" }}
            >
              Notre territoire
            </p>
            <h2 id="destinations-heading" className="font-serif font-normal text-3xl sm:text-4xl text-[var(--color-encre)] mb-4">
              Destinations populaires
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "var(--texte-leger)" }}>
              20 communes entre le Rhône et les Alpilles — de Villeneuve-lès-Avignon à Eygalières.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {topCommunes.map((c) => (
              <CommuneCard key={c.slug} commune={c} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-rhone)] text-white rounded-md hover:bg-[var(--color-rhone-dark)] transition-colors"
            >
              Toutes les destinations <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="py-24 bg-white" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-5" role="img" aria-label="5 étoiles">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-[var(--color-or)] text-[var(--color-or)]" aria-hidden="true" />
              ))}
            </div>
            <h2 id="testimonials-heading" className="font-serif font-normal text-3xl sm:text-4xl text-[var(--color-encre)] mb-3">
              Ils nous font confiance
            </h2>
            <p style={{ color: "var(--texte-discret)" }}>4,7/5 · 40 avis propriétaires vérifiés</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/avis"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: "var(--color-rhone-dark)" }}
            >
              Lire tous les avis <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-24 bg-[var(--color-cream)]" aria-labelledby="blog-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p
                className="text-xs font-medium uppercase tracking-[0.2em] mb-4"
                style={{ color: "var(--color-rhone)" }}
              >
                Blog & Conseils
              </p>
              <h2 id="blog-heading" className="font-serif font-normal text-3xl sm:text-4xl text-[var(--color-encre)]">
                Derniers articles
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: "var(--color-rhone-dark)" }}
            >
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
      <section className="py-24 bg-white" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="faq-heading" className="font-serif font-normal text-3xl sm:text-4xl text-[var(--color-encre)] mb-4">
              Questions fréquentes
            </h2>
            <p style={{ color: "var(--texte-leger)" }}>Tout ce que vous devez savoir sur notre service de conciergerie.</p>
          </div>
          <FAQAccordion items={faqItems} />
          <div className="mt-10 text-center">
            <p className="mb-4" style={{ color: "var(--texte-leger)" }}>Vous avez d&apos;autres questions ?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-rhone)] text-white rounded-md hover:bg-[var(--color-rhone-dark)] transition-colors"
            >
              Nous contacter <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-[#2A2520]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="w-12 h-px mx-auto mb-10"
            style={{ background: "var(--color-gres-moyen)", opacity: 0.5 }}
            aria-hidden="true"
          />
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-white mb-6 leading-snug">
            Prêt à déléguer la gestion<br className="hidden sm:block" /> de votre bien ?
          </h2>
          <p
            className="text-base mb-10 font-light"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Estimation gratuite en 2 minutes. Nos experts locaux vous répondent sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/conciergerie/estimer-mes-revenus"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-rhone)] text-white rounded-md hover:bg-[var(--color-rhone-dark)] transition-colors"
            >
              Estimer mes revenus gratuitement <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md border font-medium transition-colors hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)" }}
            >
              Parler à un expert
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
