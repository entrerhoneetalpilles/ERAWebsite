import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Comment ça marche — Conciergerie Entre Rhône et Alpilles",
  description: "Découvrez notre processus de gestion locative en Provence. Estimation, onboarding, gestion complète — tout en 3 étapes simples.",
};

const steps = [
  {
    num: "01", title: "Prise de contact & estimation",
    items: ["Appel découverte gratuit (30 min)", "Visite du bien et état des lieux", "Étude de marché AirDNA", "Projection de revenus annuels", "Proposition de contrat sans engagement"],
  },
  {
    num: "02", title: "Mise en place & optimisation",
    items: ["Shooting photo professionnel inclus", "Rédaction des annonces (FR/EN/NL)", "Création des profils Airbnb, Booking, VRBO", "Paramétrage des règles tarifaires dynamiques", "Intégration au channel manager"],
  },
  {
    num: "03", title: "Gestion au quotidien",
    items: ["Check-in/out personnalisé ou boîte à clés", "Ménage professionnel après chaque séjour", "Linge hôtelier fourni et entretenu", "Réponses aux voyageurs sous 1h", "Rapport mensuel détaillé"],
  },
];

export default function CommentCaMarchePage() {
  return (
    <div className="pt-20">
      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Conciergerie", href: "/conciergerie" }, { label: "Comment ça marche" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Comment ça marche ?</h1>
            <p className="text-xl text-gray-600 leading-relaxed">Notre processus en 3 étapes simples pour déléguer sereinement la gestion de votre bien en Provence.</p>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-8">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[var(--color-rhone)] text-white flex items-center justify-center font-serif text-2xl font-bold">{step.num}</div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">{step.title}</h2>
                  <ul className="space-y-3">
                    {step.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-gray-600">
                        <span className="w-5 h-5 rounded-full bg-[var(--color-alpilles)]/20 text-[var(--color-alpilles)] flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link href="/conciergerie/estimer-mes-revenus" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-rhone)] text-white font-bold rounded-xl hover:bg-[var(--color-rhone-light)] transition-colors text-lg">
              Démarrer gratuitement <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
