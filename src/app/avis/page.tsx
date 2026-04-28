import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowRight, CheckCircle } from "lucide-react";
import TestimonialCard from "@/components/TestimonialCard";
import Breadcrumb from "@/components/Breadcrumb";
import { testimonials } from "@/lib/data";
import { OG_IMG } from "@/lib/og";

export const metadata: Metadata = {
  title: "Avis Clients — Conciergerie Provence 4,7/5",
  description:
    "40 avis vérifiés de propriétaires et voyageurs. Note moyenne 4,7/5. Tous les témoignages de nos clients en Alpilles et Provence.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/avis" },
  openGraph: {
    title: "Avis Clients — Conciergerie Provence 4,7/5",
    description: "40 avis vérifiés. Note moyenne 4,7/5 — propriétaires en Provence.",
    url: "https://entre-rhone-alpilles.fr/avis",
    images: OG_IMG,
  },
};

const stats = [
  { value: "4,7/5", label: "Note moyenne", sub: "40 avis vérifiés" },
  { value: "98%", label: "Recommandent ERA", sub: "Propriétaires" },
  { value: "4,8/5", label: "Satisfaction voyageurs", sub: "Toutes plateformes" },
  { value: "Superhost", label: "Niveau Superhost", sub: "Airbnb France" },
];

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Entre Rhône et Alpilles",
  url: "https://entre-rhone-alpilles.fr",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    reviewCount: String(testimonials.length),
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
            <div className="flex items-center justify-center gap-1 mb-4" role="img" aria-label="Note 4,7 étoiles sur 5">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="w-8 h-8 fill-[var(--color-or)] text-[var(--color-or)]" aria-hidden="true" />
              ))}
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-light mb-4">Avis clients : ils nous font confiance</h1>
            <p className="text-xl text-gray-600">Propriétaires et voyageurs témoignent de leur expérience avec Entre Rhône et Alpilles.</p>
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
          <h2 id="reviews-heading" className="font-serif text-2xl font-light mb-10">Témoignages récents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => <TestimonialCard key={t.name} testimonial={t} />)}
          </div>
        </div>
      </section>

      {/* Contexte & confiance */}
      <section className="py-16 bg-[var(--color-cream)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Pourquoi faire confiance à ces avis ?</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
            <p>
              Tous les avis affichés sur cette page proviennent de propriétaires et de voyageurs ayant
              effectivement eu recours à nos services. Aucun avis n&apos;est sollicité en échange d&apos;une
              contrepartie commerciale. Les témoignages des voyageurs sont collectés via Airbnb, Booking.com
              et VRBO — plateformes qui vérifient que le séjour a bien eu lieu avant de permettre la publication
              d&apos;un avis.
            </p>
            <p>
              Pour les propriétaires, les témoignages sont recueillis par notre équipe lors d&apos;entretiens
              ou via Google Avis Clients. La note moyenne de 4,7/5 est calculée sur l&apos;ensemble des avis
              recueillis sur toutes les plateformes depuis le lancement d&apos;ERA.
            </p>
            <p>
              Notre statut <strong>Superhost Airbnb</strong> (attribué aux hôtes dont le taux de réponse
              dépasse 90%, la note globale 4,8/5 et le taux d&apos;annulation est inférieur à 1%) est maintenu
              en continu depuis l&apos;ouverture de nos profils. Ce label est réévalué chaque trimestre par Airbnb
              sur la base de critères objectifs et non déclaratifs.
            </p>
          </div>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Ce que nos clients apprécient le plus</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { label: "Réactivité de l'équipe", desc: "Réponse aux demandes en moins d'une heure, 7j/7 pendant le séjour. Nos clients ne restent jamais sans réponse face à un problème." },
              { label: "Qualité de l'accueil", desc: "Accueil personnalisé à l'arrivée, livret avec nos adresses locales, panier de bienvenue provençal pour les formules Premium et Prestige." },
              { label: "Transparence des revenus", desc: "Les propriétaires reçoivent un rapport mensuel détaillé : réservations, revenus nets, taux d'occupation et actions menées par l'équipe." },
              { label: "Entretien irréprochable", desc: "Ménage professionnel après chaque séjour, linge de maison hôtelier fourni et entretenu en blanchisserie partenaire." },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--color-alpilles)] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">{item.label}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">Rejoignez nos propriétaires satisfaits</h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                98% de nos propriétaires recommandent ERA à leur entourage. Commencez par une estimation
                gratuite de vos revenus locatifs — notre équipe vous répond sous 24h.
              </p>
            </div>
            <Link href="/conciergerie/estimer-mes-revenus"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-rhone)] text-white font-semibold rounded-xl hover:bg-[var(--color-rhone-dark)] transition-colors whitespace-nowrap">
              Estimation gratuite <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
