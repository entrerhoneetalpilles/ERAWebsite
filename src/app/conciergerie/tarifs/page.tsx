import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, X, Info } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Tarifs Conciergerie Provence — Essentiel, Premium, Prestige",
  description:
    "Nos 3 formules de conciergerie : Essentiel 18% HT, Premium 22% HT, Prestige 28% HT. Commission sur revenus nets, sans frais fixes. Vous percevez vos revenus directement.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/conciergerie/tarifs" },
};

const formulas = [
  {
    id: "essentiel",
    label: "Essentiel",
    rate: "18%",
    unit: "HT",
    pitch: "Gestion locative essentielle",
    target: "Studio, T2, maison de village — Bien ≤ 4 couchages — Propriétaire impliqué",
    example: "Ex. 15 000 €/an → 2 700 € HT facturés",
    engagement: "6 mois minimum",
    notice: "Préavis 2 mois",
    onboarding: "150 € HT",
    billing: "Facturation mensuelle J+10",
    highlighted: false,
    services: [
      "Création & optimisation annonces (Airbnb, Booking, Abritel)",
      "Gestion multi-plateformes + channel manager",
      "Optimisation tarifaire manuelle",
      "Check-in autonome (boîte à clés / code)",
      "Check-out avec état des lieux",
      "Coordination prestataire ménage (facturé au voyageur)",
      "Gestion messages & réservations 7j/7",
      "Livret d'accueil numérique personnalisé",
      "Réponses aux avis voyageurs",
      "Signalement incidents & petites réparations",
      "Relevé mensuel des revenus",
      "Tableau de bord en ligne",
    ],
    notIncluded: [
      "Photos professionnelles (option 250 € HT)",
      "Pricing dynamique IA",
      "Check-in personnalisé en présentiel",
      "Ménage inclus dans la commission",
      "Assistance voyageurs 24h/24",
    ],
  },
  {
    id: "premium",
    label: "Premium",
    rate: "22%",
    unit: "HT",
    pitch: "Full service sans contrainte",
    target: "Mas, villa, gîte — Bien 4-8 couchages — Délégation totale",
    example: "Ex. 30 000 €/an → 6 600 € HT facturés",
    engagement: "12 mois recommandé",
    notice: "Préavis 2 mois",
    onboarding: "Offert",
    billing: "Facturation mensuelle J+5",
    highlighted: true,
    badge: "70% de nos propriétaires",
    services: [
      "Tout Essentiel +",
      "Photos professionnelles incluses",
      "Pricing dynamique IA (PriceLabs / Beyond)",
      "Check-in personnalisé en présentiel",
      "Ménage inclus dans la commission",
      "Gestion linge (draps, serviettes, housses)",
      "Blanchisserie professionnelle partenaire",
      "Contrôle qualité entre chaque séjour",
      "Assistance voyageurs 24h/24 (numéro dédié)",
      "Coordination artisans & prestataires",
      "Visites de contrôle entre saisons",
      "Gestion piscine & espaces extérieurs",
      "Recommandations restaurants & activités locales",
      "Rapport de performance trimestriel",
    ],
    notIncluded: [
      "Livret d'accueil physique imprimé",
      "Traduction EN + NL",
      "Réservations restaurants & billets",
      "Gardiennage hors saison",
      "Gestionnaire dédié",
    ],
  },
  {
    id: "prestige",
    label: "Prestige",
    rate: "28%",
    unit: "HT",
    pitch: "Expérience haut de gamme",
    target: "Villa luxe, bastide, domaine — Bien 8+ couchages — Clientèle internationale",
    example: "Ex. 60 000 €/an → 16 800 € HT facturés",
    engagement: "12 mois minimum",
    notice: "Préavis 3 mois",
    onboarding: "Offert",
    billing: "Facturation mensuelle J+5",
    highlighted: false,
    services: [
      "Tout Premium +",
      "Gestionnaire dédié (interlocuteur unique)",
      "Traduction annonces EN + NL",
      "Remise clés avec visite guidée du bien",
      "Panier de bienvenue (produits locaux Provence)",
      "Livret d'accueil physique imprimé",
      "Réservations restaurants & billets événements",
      "Service de transfert aéroport / gare (partenaire)",
      "Location vélos / équipements sports (partenaire)",
      "Panier épicerie à l'arrivée (sur commande)",
      "Gardiennage hors saison (visites mensuelles)",
      "Analyse concurrentielle annuelle du bien",
    ],
    notIncluded: [],
  },
];

const options = [
  { label: "Session photo professionnelle", price: "250 € HT", note: "one-shot", for: "Formule Essentiel" },
  { label: "Mise en place initiale (onboarding complet)", price: "150 € HT", note: "one-shot", for: "Toutes formules" },
  { label: "Linge de maison (gestion & blanchisserie)", price: "Sur devis", note: "selon volume", for: "Formule Essentiel" },
  { label: "Classement meublé de tourisme (dossier)", price: "200 € HT", note: "one-shot", for: "Toutes formules" },
  { label: "Check-in tardif (après 22h)", price: "30 € HT", note: "par intervention", for: "Formule Essentiel" },
  { label: "Déclaration mairie (enregistrement LCD)", price: "100 € HT", note: "one-shot", for: "Toutes formules" },
  { label: "Visite de contrôle hors saison (mensuelle)", price: "80 € HT", note: "par visite", for: "Essentiel & Premium" },
  { label: "Traduction annonces EN + NL", price: "120 € HT", note: "one-shot", for: "Essentiel & Premium" },
  { label: "Shooting vidéo du bien (Reels/YouTube)", price: "350 € HT", note: "one-shot", for: "Toutes formules" },
];

const faqItems = [
  {
    question: "Comment fonctionne le modèle de facturation ERA ?",
    answer: "Vous percevez directement vos revenus locatifs depuis les plateformes (Airbnb, Booking, etc.). ERA vous adresse ensuite une facture mensuelle correspondant à la commission sur vos revenus nets perçus, déduction faite des frais de plateforme. Vous restez toujours propriétaire de vos flux financiers.",
  },
  {
    question: "Sur quelle base se calcule la commission ?",
    answer: "La commission se calcule sur les revenus nets perçus après déduction des frais de plateforme (commission Airbnb/Booking, etc.). La TVA applicable (20%) sera ajoutée selon votre régime fiscal.",
  },
  {
    question: "Y a-t-il des frais d'installation ?",
    answer: "La mise en place (photos, annonces, paramétrage) est offerte en formules Premium et Prestige. En formule Essentiel, des frais d'onboarding de 150 € HT s'appliquent une seule fois.",
  },
  {
    question: "Quelle est la durée d'engagement ?",
    answer: "Essentiel : engagement minimum de 6 mois, préavis de résiliation 2 mois. Premium : 12 mois recommandés, préavis 2 mois. Prestige : 12 mois minimum, préavis 3 mois.",
  },
  {
    question: "Les frais de ménage sont-ils à ma charge ?",
    answer: "En Essentiel, le ménage est coordonné par ERA mais facturé directement aux voyageurs (frais de nettoyage sur l'annonce) — vous n'avancez rien. En Premium et Prestige, le ménage est inclus dans la commission.",
  },
  {
    question: "Puis-je changer de formule en cours de contrat ?",
    answer: "Oui. Une montée en formule est possible à tout moment. Un passage à une formule inférieure s'effectue à l'échéance de la période d'engagement en cours, avec un préavis conformé.",
  },
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
      description: "3 formules : Essentiel 18% HT, Premium 22% HT, Prestige 28% HT. Commission sur revenus nets, facturation séparée.",
      priceCurrency: "EUR",
      minPrice: "18",
      maxPrice: "28",
      unitText: "% des revenus locatifs nets HT",
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
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Tarifs clairs, sans surprise
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Trois formules calibrées sur le marché provençal. Vous percevez vos revenus directement — ERA vous facture sa commission séparément chaque mois.
            </p>
          </div>
        </div>
      </div>

      {/* Encart modèle de facturation */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-blue-800">
              <strong>Notre modèle :</strong> vous percevez vos revenus locatifs directement depuis Airbnb, Booking.com, etc.
              ERA vous adresse une facture mensuelle pour sa commission — calculée sur vos revenus nets après déduction des frais de plateforme. TVA 20% applicable.
            </p>
          </div>
        </div>
      </div>

      {/* Les 3 formules */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {formulas.map((f) => (
              <div key={f.id}
                className={`rounded-2xl border-2 p-8 relative flex flex-col ${f.highlighted ? "border-[var(--color-rhone)] shadow-lg" : "border-gray-200"}`}>
                {f.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--color-rhone)] text-white text-xs font-bold rounded-full whitespace-nowrap">
                    {f.badge}
                  </span>
                )}
                <div className="mb-6">
                  <h2 className="font-serif text-xl font-bold text-gray-900 mb-1">{f.label}</h2>
                  <p className="text-sm text-gray-500 mb-4">{f.pitch}</p>
                  <div className="flex items-baseline gap-1">
                    <span className={`font-serif text-5xl font-bold ${f.highlighted ? "text-[var(--color-rhone)]" : "text-gray-900"}`}>{f.rate}</span>
                    <span className="text-gray-500 text-sm">{f.unit} des revenus nets</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{f.example}</p>
                </div>

                <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3 mb-6 space-y-1">
                  <div className="flex justify-between"><span>Engagement</span><span className="font-medium text-gray-700">{f.engagement}</span></div>
                  <div className="flex justify-between"><span>Préavis</span><span className="font-medium text-gray-700">{f.notice}</span></div>
                  <div className="flex justify-between"><span>Onboarding</span><span className="font-medium text-gray-700">{f.onboarding}</span></div>
                  <div className="flex justify-between"><span>Facturation</span><span className="font-medium text-gray-700">{f.billing}</span></div>
                </div>

                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Inclus</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {f.services.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[var(--color-alpilles)] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>

                {f.notIncluded.length > 0 && (
                  <>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Non inclus</p>
                    <ul className="space-y-2 mb-6">
                      {f.notIncluded.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-sm text-gray-400">
                          <X className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <Link
                  href="/conciergerie/estimer-mes-revenus"
                  className={`block text-center px-6 py-3 font-semibold rounded-xl transition-colors mt-auto ${f.highlighted ? "bg-[var(--color-rhone)] text-white hover:bg-[var(--color-rhone-light)]" : "border-2 border-[var(--color-rhone)] text-[var(--color-rhone)] hover:bg-[var(--color-rhone)]/5"}`}>
                  Estimer mes revenus
                </Link>
              </div>
            ))}
          </div>

          {/* Note positionnement marché */}
          <div className="bg-[var(--color-cream)] rounded-2xl p-8 mb-16">
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Notre positionnement tarifaire</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <p className="font-semibold text-gray-700 mb-2">Marché national (référence)</p>
                <ul className="space-y-1">
                  <li>Commission moyenne conciergeries FR : <strong>20–25%</strong></li>
                  <li>Full service (ménage inclus) : <strong>25–30%</strong></li>
                  <li>Services premium + conciergerie voyageurs : <strong>30–35%</strong></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-2">Entre Rhône et Alpilles</p>
                <ul className="space-y-1">
                  <li>Essentiel <strong>18% HT</strong> — entrée compétitive</li>
                  <li>Premium <strong>22% HT</strong> — référence marché</li>
                  <li>Prestige <strong>28% HT</strong> — haut de gamme Alpilles</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Modulation possible : −1 point sur Prestige pour tout bien générant plus de 40 000 €/an. Au-delà de 80 000 €, négociation sur mesure.
            </p>
          </div>
        </div>
      </section>

      {/* Options à la carte */}
      <section className="py-16 bg-[var(--color-cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Options à la carte</h2>
          <p className="text-gray-600 mb-8">Ces services peuvent être ajoutés à n'importe quelle formule selon vos besoins.</p>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl overflow-hidden border border-gray-100 text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-4 font-semibold">Option</th>
                  <th className="text-right px-6 py-4 font-semibold">Tarif</th>
                  <th className="text-right px-6 py-4 font-semibold hidden md:table-cell">Disponible pour</th>
                </tr>
              </thead>
              <tbody>
                {options.map((o, i) => (
                  <tr key={o.label} className={i % 2 === 0 ? "" : "bg-gray-50/50"}>
                    <td className="px-6 py-4 text-gray-700">{o.label}</td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900 whitespace-nowrap">
                      {o.price} <span className="text-xs font-normal text-gray-400">{o.note}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-500 hidden md:table-cell">{o.for}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">Questions sur nos tarifs</h2>
          <FAQAccordion items={faqItems} />
          <div className="mt-12 text-center">
            <Link href="/conciergerie/estimer-mes-revenus"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-rhone)] text-white font-bold rounded-xl hover:bg-[var(--color-rhone-light)] transition-colors text-lg">
              Simuler mes revenus gratuitement <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
