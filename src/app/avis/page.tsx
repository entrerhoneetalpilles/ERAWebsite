import type { Metadata } from "next";
import { Star } from "lucide-react";
import TestimonialCard from "@/components/TestimonialCard";
import Breadcrumb from "@/components/Breadcrumb";
import { testimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Avis Clients — Entre Rhône et Alpilles Conciergerie",
  description:
    "Plus de 200 avis vérifiés de propriétaires et voyageurs. Note moyenne 4,9/5. Découvrez les témoignages de nos clients en Provence.",
};

const stats = [
  { value: "4,9/5", label: "Note moyenne", sub: "208 avis" },
  { value: "98%", label: "Recommandent ERA", sub: "Propriétaires" },
  { value: "4,8/5", label: "Satisfaction voyageurs", sub: "Toutes plateformes" },
  { value: "5★", label: "Niveau Superhost", sub: "Airbnb France" },
];

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Entre Rhône et Alpilles",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "208",
    bestRating: "5",
    worstRating: "1",
  },
  review: testimonials.map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
    reviewBody: t.text,
    datePublished: t.date,
  })),
};

export default function AvisPage() {
  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Avis clients" }]} />
          <div className="mt-8 text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-1 mb-4" role="img" aria-label="Note 4,9 étoiles sur 5">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="w-8 h-8 fill-[var(--color-or)] text-[var(--color-or)]" aria-hidden="true" />
              ))}
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Ils nous font confiance</h1>
            <p className="text-xl text-gray-600">Plus de 200 avis vérifiés de propriétaires et voyageurs satisfaits.</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <section className="py-12 bg-[var(--color-rhone)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-serif text-3xl font-bold text-[var(--color-or)]">{s.value}</p>
                <p className="text-white font-semibold mt-1">{s.label}</p>
                <p className="text-white/60 text-xs mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avis */}
      <section className="py-20 bg-white" aria-labelledby="reviews-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="reviews-heading" className="font-serif text-2xl font-bold text-gray-900 mb-10">Témoignages récents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => <TestimonialCard key={t.name} testimonial={t} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
