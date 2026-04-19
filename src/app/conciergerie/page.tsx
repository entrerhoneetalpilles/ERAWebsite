import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, TrendingUp, Users, Wrench, Star } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Conciergerie Airbnb Provence — Services pour Propriétaires",
  description:
    "Déléguez la gestion de votre location saisonnière en Provence. Check-in/out, ménage, communication voyageurs, tarification dynamique. Devis gratuit.",
};

const steps = [
  { num: "01", title: "Estimation gratuite", desc: "Nous évaluons le potentiel locatif de votre bien et vous proposons une fourchette de revenus réaliste basée sur les données du marché local." },
  { num: "02", title: "Onboarding & mise en ligne", desc: "Photos professionnelles, rédaction des annonces optimisées SEO, création ou optimisation de vos profils Airbnb, Booking.com et VRBO." },
  { num: "03", title: "Gestion complète", desc: "Check-in/out, ménage, linge de maison, communication 24/7 avec les voyageurs, maintenance, tarification dynamique quotidienne." },
];

const services = [
  { icon: <Users className="w-5 h-5" />, label: "Accueil personnalisé des voyageurs" },
  { icon: <Wrench className="w-5 h-5" />, label: "Ménage & linge hôtelier" },
  { icon: <TrendingUp className="w-5 h-5" />, label: "Tarification dynamique (PriceLabs)" },
  { icon: <Clock className="w-5 h-5" />, label: "Communication voyageurs 24/7" },
  { icon: <CheckCircle className="w-5 h-5" />, label: "Maintenance & urgences" },
  { icon: <Star className="w-5 h-5" />, label: "Optimisation des avis" },
];

export default function ConciergerieHubPage() {
  return (
    <div className="pt-20">
      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Propriétaires & Conciergerie" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Conciergerie de locations<br />
              <span className="text-[var(--color-rhone)]">saisonnières en Provence</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Vous êtes propriétaire d'un mas, d'une villa ou d'un appartement entre le Rhône et les Alpilles ? Déléguez la gestion à notre équipe locale et profitez de vos revenus locatifs sans les contraintes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/conciergerie/estimer-mes-revenus" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-rhone)] text-white font-semibold rounded-xl hover:bg-[var(--color-rhone-light)] transition-colors">
                Estimer mes revenus <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/conciergerie/nos-services" className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-rhone)] text-[var(--color-rhone)] font-semibold rounded-xl hover:bg-[var(--color-rhone)]/5 transition-colors">
                Voir nos services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Comment ça marche */}
      <section className="py-20 bg-white" aria-labelledby="steps-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="steps-heading" className="font-serif text-3xl font-bold text-gray-900 mb-12 text-center">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="relative">
                <div className="w-14 h-14 rounded-full bg-[var(--color-rhone)] text-white flex items-center justify-center font-serif text-2xl font-bold mb-6">{s.num}</div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/conciergerie/comment-ca-marche" className="inline-flex items-center gap-1.5 text-[var(--color-rhone)] font-semibold hover:text-[var(--color-rhone-light)] transition-colors">
              En savoir plus <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services inclus */}
      <section className="py-20 bg-[var(--color-cream)]" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="services-heading" className="font-serif text-3xl font-bold text-gray-900 mb-6">Tout est inclus dans notre service</h2>
              <p className="text-gray-600 leading-relaxed mb-8">De la mise en ligne de votre annonce à la remise des clés, notre équipe gère chaque détail pour vous offrir la sérénité totale.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((s) => (
                  <div key={s.label} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                    <span className="text-[var(--color-rhone)]">{s.icon}</span>
                    <span className="text-sm text-gray-700 font-medium">{s.label}</span>
                  </div>
                ))}
              </div>
              <Link href="/conciergerie/nos-services" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[var(--color-rhone)] text-white font-semibold rounded-xl hover:bg-[var(--color-rhone-light)] transition-colors">
                Voir tous nos services <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="bg-[var(--color-rhone)] rounded-2xl p-8 text-white">
              <h3 className="font-serif text-2xl font-bold mb-6">Nos tarifs</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span>Commission sur revenus</span>
                  <span className="font-bold text-[var(--color-or)]">20–25%</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span>Frais d'installation</span>
                  <span className="font-bold text-[var(--color-or)]">Offerts</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span>Engagement minimum</span>
                  <span className="font-bold text-[var(--color-or)]">Aucun</span>
                </div>
              </div>
              <Link href="/conciergerie/tarifs" className="block text-center px-6 py-3 bg-[var(--color-or)] text-white font-semibold rounded-xl hover:bg-[var(--color-or-light)] transition-colors">
                Voir le détail des tarifs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Liens rapides */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/conciergerie/comment-ca-marche", label: "Comment ça marche", desc: "Notre processus en détail" },
              { href: "/conciergerie/nos-services", label: "Nos services", desc: "Tout ce que nous gérons" },
              { href: "/conciergerie/tarifs", label: "Tarifs", desc: "Transparents et sans surprise" },
              { href: "/conciergerie/estimer-mes-revenus", label: "Estimer mes revenus", desc: "Simulateur gratuit" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group p-5 rounded-xl border border-gray-100 hover:border-[var(--color-rhone)] hover:shadow-sm transition-all">
                <p className="font-semibold text-gray-900 group-hover:text-[var(--color-rhone)] transition-colors mb-1">{l.label}</p>
                <p className="text-sm text-gray-500">{l.desc}</p>
                <ArrowRight className="w-4 h-4 text-[var(--color-rhone)] mt-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
