import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, X } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Tarifs Conciergerie Provence — Entre Rhône et Alpilles",
  description: "Nos tarifs de conciergerie : 20 à 25% de commission sur revenus, sans frais fixes. Transparent, sans engagement. Devis gratuit.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/conciergerie/tarifs" },
};

const comparison = [
  { feature: "Gestion des annonces multi-plateformes", solo: false, era: true },
  { feature: "Tarification dynamique quotidienne", solo: false, era: true },
  { feature: "Communication voyageurs 24/7", solo: false, era: true },
  { feature: "Check-in/out professionnel", solo: false, era: true },
  { feature: "Ménage & linge hôtelier", solo: false, era: true },
  { feature: "Rapport mensuel", solo: false, era: true },
  { feature: "Réseau d'artisans locaux", solo: false, era: true },
  { feature: "Revenus optimisés +30 à 40%", solo: false, era: true },
];

const faqItems = [
  { question: "Y a-t-il des frais d'installation ?", answer: "Non, aucun frais d'installation. La mise en place de votre bien (photos, annonces, paramétrage) est entièrement offerte." },
  { question: "Quelle est la durée d'engagement minimum ?", answer: "Aucun engagement minimum. Vous pouvez mettre fin au contrat avec un préavis de 30 jours." },
  { question: "Comment sont reversés mes revenus ?", answer: "Les revenus locatifs sont virés sur votre compte bancaire chaque mois, accompagnés d'un relevé détaillé de toutes les réservations et dépenses." },
  { question: "Les frais de ménage sont-ils à ma charge ?", answer: "Les frais de ménage sont refacturés aux voyageurs (frais de nettoyage visibles sur l'annonce). Vous n'avancez rien." },
];

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@type": "PriceSpecification",
      name: "Tarifs de conciergerie Entre Rhône et Alpilles",
      description: "Commission sur revenus locatifs, sans frais fixes ni engagement minimum.",
      priceCurrency: "EUR",
      minPrice: "20",
      maxPrice: "25",
      unitText: "% des revenus locatifs",
      eligibleQuantity: { "@type": "QuantitativeValue", unitText: "par mois" },
    },
  ],
};

export default function TarifsPage() {
  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Conciergerie", href: "/conciergerie" }, { label: "Tarifs" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Tarifs clairs, sans surprise</h1>
            <p className="text-xl text-gray-600 leading-relaxed">Une commission simple sur vos revenus réels. Pas de frais fixes, pas d&apos;engagement. On gagne quand vous gagnez.</p>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="rounded-2xl border-2 border-gray-200 p-8">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Essentiel</h2>
              <p className="text-gray-500 text-sm mb-6">Pour les biens avec calendrier établi</p>
              <div className="mb-6">
                <span className="font-serif text-5xl font-bold text-gray-900">20%</span>
                <span className="text-gray-500 ml-2">des revenus</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["Gestion des réservations", "Check-in/out", "Ménage professionnel", "Communication voyageurs", "Rapport mensuel"].map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-[var(--color-alpilles)] flex-shrink-0" aria-hidden="true" /> {s}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="block text-center px-6 py-3 border-2 border-[var(--color-rhone)] text-[var(--color-rhone)] font-semibold rounded-xl hover:bg-[var(--color-rhone)]/5 transition-colors">
                Demander un devis
              </Link>
            </div>

            <div className="rounded-2xl border-2 border-[var(--color-rhone)] p-8 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--color-rhone)] text-white text-xs font-bold rounded-full">Recommandé</span>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Premium</h2>
              <p className="text-gray-500 text-sm mb-6">Gestion optimisée & tarification dynamique</p>
              <div className="mb-6">
                <span className="font-serif text-5xl font-bold text-[var(--color-rhone)]">25%</span>
                <span className="text-gray-500 ml-2">des revenus</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["Tout Essentiel +", "Tarification dynamique PriceLabs", "Optimisation annonces & photos", "Linge hôtelier premium", "Gestionnaire dédié", "Accès espace propriétaire"].map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-[var(--color-rhone)] flex-shrink-0" aria-hidden="true" /> {s}
                  </li>
                ))}
              </ul>
              <Link href="/conciergerie/estimer-mes-revenus" className="block text-center px-6 py-3 bg-[var(--color-rhone)] text-white font-semibold rounded-xl hover:bg-[var(--color-rhone-light)] transition-colors">
                Estimer mes revenus
              </Link>
            </div>
          </div>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8 text-center">Gérer seul vs. Avec Entre Rhône et Alpilles</h2>
          <div className="rounded-2xl overflow-hidden border border-gray-100 mb-16">
            <div className="grid grid-cols-3 bg-gray-50 p-4 text-sm font-semibold text-gray-500">
              <div>Fonctionnalité</div>
              <div className="text-center">En solo</div>
              <div className="text-center text-[var(--color-rhone)]">Avec ERA</div>
            </div>
            {comparison.map((row) => (
              <div key={row.feature} className="grid grid-cols-3 p-4 border-t border-gray-50 text-sm">
                <div className="text-gray-700">{row.feature}</div>
                <div className="flex justify-center"><X className="w-4 h-4 text-red-400" aria-label="Non" /></div>
                <div className="flex justify-center"><CheckCircle className="w-4 h-4 text-[var(--color-alpilles)]" aria-label="Oui" /></div>
              </div>
            ))}
          </div>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8 text-center">Questions sur nos tarifs</h2>
          <FAQAccordion items={faqItems} />

          <div className="mt-12 text-center">
            <Link href="/conciergerie/estimer-mes-revenus" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-rhone)] text-white font-bold rounded-xl hover:bg-[var(--color-rhone-light)] transition-colors text-lg">
              Simuler mes revenus gratuitement <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
