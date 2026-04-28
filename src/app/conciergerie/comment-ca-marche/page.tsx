import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, CheckCircle } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import FAQAccordion from "@/components/FAQAccordion";
import { OG_IMG } from "@/lib/og";

export const metadata: Metadata = {
  title: "Comment ça marche — Gestion Locative ERA en Provence",
  description: "Notre processus en 3 étapes : estimation gratuite, mise en ligne professionnelle, gestion complète de votre location saisonnière en Provence. Délégation totale dès le premier mois.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/conciergerie/comment-ca-marche" },
  openGraph: {
    title: "Comment ça marche — Gestion Locative ERA",
    description: "Estimation, mise en ligne, gestion complète : notre processus en 3 étapes pour les propriétaires en Provence.",
    url: "https://entre-rhone-alpilles.fr/conciergerie/comment-ca-marche",
    images: OG_IMG,
  },
};

const steps = [
  {
    num: "01",
    title: "Prise de contact & estimation",
    duration: "Semaine 1",
    description: "Tout commence par un appel découverte gratuit de 30 minutes. Nous prenons le temps de comprendre votre bien, vos contraintes (semaines bloquées, standing souhaité, type de clientèle) et vos objectifs de revenus. Si votre bien est situé dans notre zone d'intervention — entre le Rhône et les Alpilles — nous planifions une visite physique sous 5 jours ouvrés.",
    detail: "Lors de la visite, nous évaluons l'état général du bien, les équipements, la capacité d'accueil et les points forts à mettre en avant. Nous croisons ensuite ces données avec notre observatoire du marché local et les données AirDNA (taux d'occupation et tarifs en temps réel sur Airbnb, Booking.com et VRBO) pour établir une projection de revenus annuels réaliste. Tout cela est formalisé dans une proposition de mandat sans engagement.",
    items: ["Appel découverte gratuit (30 min)", "Visite du bien et état des lieux", "Étude de marché AirDNA", "Projection de revenus annuels", "Proposition de contrat sans engagement"],
  },
  {
    num: "02",
    title: "Mise en place & optimisation",
    duration: "Semaines 2–3",
    description: "Une fois le mandat signé, notre équipe prend en charge l'intégralité de la mise en ligne. Un photographe professionnel intervient dans les 5 jours suivant la signature pour réaliser un reportage complet : intérieur, extérieur, piscine, terrasse, détails d'ambiance. Ces photos sont la première impression que les voyageurs auront de votre bien — nous n'improvisons pas.",
    detail: "Nos rédacteurs rédigent ensuite les annonces en français, anglais et néerlandais, optimisées pour les algorithmes de classement d'Airbnb et Booking.com. Les profils sont créés sur toutes les plateformes pertinentes, synchronisés via notre channel manager (Lodgify) pour éviter les doubles réservations. Le système de tarification dynamique PriceLabs est paramétré dès le premier jour : vos prix s'ajustent automatiquement en fonction de la demande, des événements locaux (Feria d'Arles, Rencontres Photo, Alpilles en fête) et de la météo.",
    items: ["Shooting photo professionnel inclus (Premium & Prestige)", "Rédaction des annonces (FR/EN/NL)", "Création des profils Airbnb, Booking, VRBO", "Paramétrage PriceLabs — tarification dynamique", "Intégration au channel manager Lodgify"],
  },
  {
    num: "03",
    title: "Gestion au quotidien",
    duration: "En continu",
    description: "À partir de la première réservation, notre conciergerie prend en charge l'intégralité de la relation voyageur : réponses aux demandes en moins d'une heure, vérification des profils, collecte de la taxe de séjour, envoi des instructions d'arrivée et remise des clés. L'accueil est assuré en présentiel (formules Premium et Prestige) ou via une boîte à clés sécurisée connectée (formule Essentiel).",
    detail: "Entre chaque séjour, une équipe de ménage professionnelle partenaire intervient systématiquement. Le linge hôtelier (draps, serviettes, peignoirs selon le standing) est fourni, lavé en blanchisserie industrielle et replacé avant chaque arrivée. Vous recevez chaque mois un rapport détaillé : revenus, taux d'occupation, avis voyageurs et actions menées. Notre équipe reste votre interlocuteur unique — vous ne gérez plus rien.",
    items: ["Check-in/out personnalisé ou boîte à clés connectée", "Ménage professionnel après chaque séjour", "Linge hôtelier fourni et entretenu", "Réponses aux voyageurs sous 1h, 7j/7", "Rapport mensuel détaillé (revenus, taux d'occupation, avis)"],
  },
];

const faqItems = [
  {
    question: "Combien de temps faut-il avant la première réservation ?",
    answer: "En moyenne, les premières réservations arrivent dans les 48 à 72 heures suivant la mise en ligne des annonces, selon la saison. En haute saison (juillet-août), les biens se remplissent quasi instantanément. En dehors de la saison, comptez 1 à 2 semaines pour les premières réservations. Le mois de mise en ligne est pris en charge sans commission dans le cadre de nos formules Premium et Prestige.",
  },
  {
    question: "Est-ce que je peux bloquer des semaines pour mon usage personnel ?",
    answer: "Oui, absolument. Vous restez propriétaire et maître de votre calendrier. Vous pouvez bloquer autant de semaines que vous souhaitez, à tout moment, via l'accès propriétaire à votre tableau de bord. Nous adaptons simplement notre stratégie de tarification en conséquence pour optimiser le potentiel des dates disponibles.",
  },
  {
    question: "Quelle est la durée minimale du mandat ?",
    answer: "La formule Essentiel requiert un engagement minimum de 6 mois. Les formules Premium et Prestige sont sans engagement minimum — vous êtes libre de mettre fin au mandat avec un préavis de 30 jours. Cette flexibilité reflète notre confiance dans la qualité de notre service : nous ne vous retenons pas par contrat, mais par la satisfaction.",
  },
  {
    question: "Qui prend en charge les réparations et l'entretien ?",
    answer: "Les réparations courantes (ampoule, joint, petite plomberie) sont prises en charge directement par notre équipe ou via nos artisans partenaires locaux, avec votre accord au-delà d'un seuil défini dans le contrat (généralement 150 € HT). Pour les travaux plus importants, nous vous conseillons et coordonnons les devis, mais la décision finale vous appartient. Nous gérons également les sinistres et déclarations auprès des assureurs en cas de dommages causés par un voyageur.",
  },
  {
    question: "Comment sont gérés les avis et les éventuels problèmes avec les voyageurs ?",
    answer: "Notre équipe répond à chaque avis voyageur (positif ou négatif) de manière professionnelle et mesurée. En cas de litige, nous agissons comme votre représentant : collecte de preuves, dépôt de réclamation auprès de la plateforme, médiation. La grande majorité des séjours se passent sans incident — nous sélectionnons les voyageurs avec soin et définissons des règles claires dès le départ.",
  },
  {
    question: "Puis-je voir les performances en temps réel ?",
    answer: "Oui. Vous avez accès à un portail propriétaire avec votre tableau de bord en temps réel : revenus générés, réservations à venir, calendrier d'occupation, taux d'occupation et comparaison aux objectifs. Un rapport mensuel complet vous est envoyé par email avec le détail de chaque réservation, les avis voyageurs et les actions menées par notre équipe.",
  },
];

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Comment confier son bien à une conciergerie de location saisonnière en Provence",
  description: "Notre processus en 3 étapes pour déléguer sereinement la gestion de votre bien entre le Rhône et les Alpilles.",
  totalTime: "P14D",
  supply: [
    { "@type": "HowToSupply", name: "Titre de propriété ou mandat du bien" },
    { "@type": "HowToSupply", name: "Coordonnées du propriétaire" },
  ],
  step: steps.map((s) => ({
    "@type": "HowToStep",
    name: s.title,
    text: s.description,
    url: `https://entre-rhone-alpilles.fr/conciergerie/comment-ca-marche#step-${s.num}`,
  })),
};

export default function CommentCaMarchePage() {
  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Conciergerie", href: "/conciergerie" }, { label: "Comment ça marche" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Comment ça marche ?</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              De la première prise de contact à la gestion quotidienne de vos voyageurs : notre processus
              en 3 étapes pour déléguer sereinement votre location saisonnière en Provence. La mise en ligne
              complète est opérationnelle en moins de 15 jours.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline visuelle */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {steps.map((step, i) => (
              <div key={step.num} className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-rhone)] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 whitespace-nowrap">{step.title}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" /> {step.duration}
                    </p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0 mx-2" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps détaillés */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {steps.map((step) => (
              <div key={step.num} id={`step-${step.num}`} className="scroll-mt-24">
                <div className="flex gap-6 sm:gap-10">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-[var(--color-rhone)] text-white flex items-center justify-center font-serif text-xl font-bold">
                      {step.num}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="font-serif text-2xl font-bold text-gray-900">{step.title}</h2>
                      <span className="text-xs font-medium text-[var(--color-rhone)] bg-[var(--color-rhone)]/10 px-2.5 py-1 rounded-full flex-shrink-0">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">{step.description}</p>
                    <p className="text-gray-600 leading-relaxed mb-6">{step.detail}</p>
                    <ul className="space-y-2.5">
                      {step.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-gray-700">
                          <CheckCircle className="w-4 h-4 text-[var(--color-alpilles)] flex-shrink-0" aria-hidden="true" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-[var(--color-cream)] rounded-2xl p-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">Prêt à déléguer ?</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Commencez par une estimation gratuite de vos revenus locatifs. Notre équipe vous répond
              sous 24h et peut planifier une visite de votre bien dans la semaine.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/conciergerie/estimer-mes-revenus"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-rhone)] text-white font-bold rounded-full hover:bg-[var(--color-rhone-dark)] transition-colors text-lg">
                Estimer mes revenus <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[var(--color-rhone)] text-[var(--color-rhone)] font-bold rounded-full hover:bg-[var(--color-rhone)]/5 transition-colors text-lg">
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Garanties */}
      <section className="py-16 bg-[var(--color-cream)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8 text-center">Ce que vous ne gérez plus</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Annonces et photos", desc: "Création, optimisation et mise à jour continue" },
              { label: "Communication voyageurs", desc: "Réponses sous 1h, 7j/7, en FR/EN/NL" },
              { label: "Check-in / Check-out", desc: "Accueil personnalisé ou boîte à clés connectée" },
              { label: "Ménage & linge", desc: "Équipe professionnelle après chaque séjour" },
              { label: "Tarification dynamique", desc: "PriceLabs ajuste vos prix automatiquement" },
              { label: "Rapports & comptabilité", desc: "Rapport mensuel + accès propriétaire 24h/24" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl p-5 border border-gray-100">
                <CheckCircle className="w-5 h-5 text-[var(--color-alpilles)] mb-3" aria-hidden="true" />
                <p className="font-semibold text-gray-900 text-sm mb-1">{item.label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">Questions fréquentes</h2>
          <FAQAccordion items={faqItems} />
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/conciergerie/tarifs"
              className="inline-flex items-center gap-1.5 text-[var(--color-rhone)] font-semibold hover:opacity-80 transition-opacity">
              Voir nos formules & tarifs <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/conciergerie/estimer-mes-revenus"
              className="inline-flex items-center gap-1.5 text-[var(--color-alpilles)] font-semibold hover:opacity-80 transition-opacity">
              Simulateur de revenus <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
