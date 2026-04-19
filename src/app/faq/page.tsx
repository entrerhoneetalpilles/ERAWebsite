import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ — Toutes vos questions sur la Conciergerie & Locations Provence",
  description:
    "Réponses à toutes vos questions : tarifs conciergerie, gestion Airbnb, réservations voyageurs, assurances, fiscalité location courte durée en Provence.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/faq" },
  openGraph: {
    title: "FAQ Conciergerie & Locations — Entre Rhône et Alpilles",
    description: "Réponses à toutes vos questions : tarifs, gestion Airbnb, réservations, assurances et fiscalité location courte durée en Provence.",
    url: "https://entre-rhone-alpilles.fr/faq",
  },
};

const faqProprietaires = [
  { question: "Quels sont les honoraires de la conciergerie Entre Rhône et Alpilles ?", answer: "Nous proposons 3 formules : Essentiel à 18% HT, Premium à 22% HT, Prestige à 28% HT — calculées sur vos revenus nets après déduction des frais de plateforme (Airbnb, Booking, etc.). Vous percevez vos revenus directement depuis les plateformes, ERA vous adresse ensuite sa facture mensuelle. TVA 20% applicable selon votre régime fiscal." },
  { question: "Quelles plateformes gérez-vous ?", answer: "Nous gérons vos annonces sur Airbnb, Booking.com, VRBO et les réservations directes via votre site. Toutes les plateformes sont synchronisées via notre channel manager pour éviter les doubles réservations." },
  { question: "Comment est optimisé le prix de ma location ?", answer: "Nous utilisons PriceLabs, un outil de tarification dynamique professionnel. Les prix s'ajustent chaque jour en fonction de la demande, des événements locaux (Feria d'Arles, Rencontres Photo, Noël aux Baux), des vacances scolaires et de la concurrence. Résultat : taux d'occupation optimisé et revenus maximisés." },
  { question: "Puis-je utiliser mon bien pour un usage personnel ?", answer: "Absolument. Vous conservez la pleine maîtrise de votre calendrier. Bloquez les dates souhaitées depuis votre espace propriétaire, par email ou par téléphone. Aucun délai minimum requis." },
  { question: "Comment se passe le check-in des voyageurs ?", answer: "Nous proposons un accueil personnalisé en présentiel pour les biens premium, et une solution de boîte à clés sécurisée pour les autres. Un guide de bienvenue personnalisé (recommandations locales, règles de la maison, contacts d'urgence) est remis à chaque voyageur." },
  { question: "Qui se charge du ménage entre les séjours ?", answer: "Notre équipe de ménage professionnelle intervient après chaque départ. Le tarif de ménage est refacturé aux voyageurs et n'est donc pas à votre charge. Le linge de maison (draps, serviettes, tapis de bain) est fourni et entretenu par notre service." },
  { question: "Mon bien est-il assuré pendant les locations ?", answer: "Tous les biens sur Airbnb bénéficient de la garantie dommages AirCover (jusqu'à 3M€). Pour les autres plateformes, nous vérifions systématiquement que votre assurance habitation couvre la location meublée courte durée. Nous pouvons vous orienter vers des assureurs spécialisés si nécessaire." },
  { question: "Puis-je résilier le contrat quand je veux ?", answer: "Un préavis est requis selon la formule : 2 mois pour Essentiel et Premium, 3 mois pour Prestige. La résiliation s'effectue par email. Toutes les réservations confirmées avant la fin du préavis sont honorées." },
  { question: "Comment fonctionnent les paiements avec ERA ?", answer: "Vous percevez vos revenus locatifs directement depuis les plateformes (Airbnb, Booking, etc.). ERA vous adresse ensuite une facture mensuelle correspondant à sa commission sur vos revenus nets. Vous recevez un relevé détaillé de toutes vos réservations (dates, montants, plateforme) chaque mois." },
  { question: "La fiscalité des locations Airbnb est-elle compliquée ?", answer: "Les revenus de location meublée relèvent du régime LMNP (Loueur Meublé Non Professionnel) ou LMP selon votre situation. Nous vous fournissons tous les justificatifs nécessaires pour votre déclaration. Nous pouvons vous recommander un comptable spécialisé dans la location saisonnière." },
  { question: "Quelle est la durée de location minimale que vous gérez ?", answer: "Nous gérons des locations de 1 nuit à plusieurs semaines. La durée minimale est définie par bien selon sa localisation et le profil de clientèle cible. En zone urbaine (Arles, Villeneuve), le court séjour est privilégié. Pour les mas en Alpilles, 3-7 nuits minimum en haute saison." },
];

const faqVoyageurs = [
  { question: "Comment réserver un hébergement via Entre Rhône et Alpilles ?", answer: "Vous pouvez réserver via notre site (réservation directe avec les meilleurs tarifs), via Airbnb ou Booking.com. Pour une demande personnalisée, contactez-nous par email ou téléphone. Nous vous aidons à trouver le bien qui correspond exactement à vos besoins." },
  { question: "Les prix affichés sont-ils définitifs ?", answer: "Les prix affiché sont par nuit hors taxe de séjour. S'y ajoutent les frais de ménage (visibles avant la réservation) et la taxe de séjour locale. Aucun frais caché. Le total est affiché avant validation de la réservation." },
  { question: "À quelle heure puis-je arriver et partir ?", answer: "Le check-in est généralement à partir de 16h, le check-out avant 11h. Des horaires flexibles peuvent être arrangés selon les disponibilités. Nous proposons le dépôt des bagages si votre vol est décalé." },
  { question: "Les animaux de compagnie sont-ils acceptés ?", answer: "Certains de nos biens acceptent les animaux de compagnie (chiens uniquement pour la plupart). Cette information est précisée sur chaque annonce. Des frais supplémentaires peuvent s'appliquer. Contactez-nous pour confirmer." },
  { question: "Y a-t-il du linge de maison fourni ?", answer: "Oui, tous nos hébergements incluent le linge de maison : draps, taies d'oreillers, serviettes de bain et tapis de bain. La literie est changée et lavée entre chaque séjour selon les standards hôteliers." },
  { question: "Quelles sont les conditions d'annulation ?", answer: "Pour les réservations Airbnb ou Booking, les conditions d'annulation sont celles de la plateforme. Pour les réservations directes : remboursement intégral jusqu'à J-7, 50% entre J-7 et J-3, aucun remboursement en dessous de 3 jours." },
  { question: "Que faire en cas de problème pendant le séjour ?", answer: "Notre équipe est joignable 7j/7 par téléphone pour toute urgence (panne, dégât des eaux, serrure, etc.). Pour les demandes non urgentes, un email ou WhatsApp suffit. Nous intervenons généralement dans les 4 heures." },
  { question: "Peut-on organiser un événement dans l'hébergement ?", answer: "Les événements (anniversaires, enterrements de vie, séminaires) sont possibles dans certains biens, avec accord préalable. Des frais supplémentaires et une caution renforcée s'appliquent. Contactez-nous pour étudier votre demande." },
  { question: "Y a-t-il une connexion internet dans les hébergements ?", answer: "Oui, tous nos hébergements disposent du Wi-Fi. La plupart offrent une connexion fibre ou très haut débit, adaptée au télétravail. La vitesse et le réseau sont précisés sur chaque annonce." },
  { question: "Les hébergements sont-ils accessibles aux personnes à mobilité réduite ?", answer: "Certains de nos biens sont accessibles PMR. Contactez-nous avec vos besoins spécifiques et nous identifierons les hébergements les plus adaptés (plain-pied, douche à l'italienne, etc.)." },
];

const faqDestinations = [
  { question: "Quelle est la meilleure période pour visiter les Alpilles ?", answer: "Avril-juin et septembre-octobre offrent le meilleur rapport beauté/fréquentation/prix. Juillet-août est la haute saison avec chaleur maximale et foule. L'hiver (novembre-mars) est calme et magique pour Noël aux Baux." },
  { question: "Comment aller de Paris aux Alpilles ?", answer: "TGV Paris-Avignon en 2h40, puis voiture de location (recommandé) ou taxi. L'aéroport Marseille-Provence (MRS) est à 50 min. L'aéroport de Nîmes (FNI) dessert Paris-Orly avec Volotea. Une voiture est indispensable dans les Alpilles." },
  { question: "Quels événements animent la région en 2025 ?", answer: "Feria de Pâques et de la Vendange à Arles, Rencontres de la Photographie à Arles (juillet), Fête de la Transhumance à Saint-Rémy (Pentecôte), Marché de Noël des Baux-de-Provence (décembre), festival Alpilles Musiques (été)." },
  { question: "Quels sont les restaurants incontournables des Alpilles ?", answer: "Oustau de Baumanière (Les Baux, 3 étoiles), La Cabro d'Or (Les Baux), L'Oustalet (Maussane), La Maison Manon (Maussane), Le Vallon de Valrugues (Saint-Rémy). Réservez longtemps à l'avance en haute saison." },
  { question: "Quelles activités outdoor pratiquer dans les Alpilles ?", answer: "Randonnée sur le GR653 et les sentiers balisés, vélo sur la Via Rhôna et les pistes cyclables, escalade sur les parois calcaires, golf (Golf de Servanes, Golf des Baux), équitation, VTT, parapente." },
  { question: "Y a-t-il des marchés provençaux dans la région ?", answer: "Saint-Rémy (mercredi, le plus grand), Arles (samedi, exceptionnel), Maussane (dimanche matin), Fontvieille (lundi), Les Baux (vendredi été), Tarascon (mardi), Villeneuve-lès-Avignon (jeudi)." },
  { question: "La région est-elle adaptée aux familles avec enfants ?", answer: "Oui, excellemment. Grottes de la Baume (Sainte-Victoire), musée de la camargue, parc ornithologique du Pont de Gau, Zoo de la Barben, accrobranche, plages de Camargue à 30 min. De nombreux hébergements ERA sont équipés pour les bébés (lit parapluie, chaise haute)." },
  { question: "La Camargue est-elle accessible depuis les Alpilles ?", answer: "Oui, Arles est la porte d'entrée de la Camargue, à 30 min de Saint-Rémy. Flamants roses, chevaux blancs, taureaux noirs — une excursion incontournable depuis nos hébergements." },
];

export default function FAQPage() {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ...faqProprietaires,
      ...faqVoyageurs,
      ...faqDestinations,
    ].map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "FAQ" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Foire aux questions
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Toutes les réponses sur notre service de conciergerie, nos hébergements et la région Alpilles & Rhône.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation rapide */}
      <nav className="sticky top-16 z-40 bg-white border-b border-gray-100 py-3 shadow-sm" aria-label="Sections FAQ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-4 overflow-x-auto">
          {[
            { href: "#proprietaires", label: "Propriétaires" },
            { href: "#voyageurs", label: "Voyageurs" },
            { href: "#destinations", label: "Destinations" },
          ].map((l) => (
            <a key={l.href} href={l.href}
              className="whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:bg-[var(--color-rhone)] hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <section id="proprietaires" aria-labelledby="faq-prop-heading">
          <h2 id="faq-prop-heading" className="font-serif text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            Questions propriétaires
            <span className="text-sm font-normal text-gray-400 font-sans">{faqProprietaires.length} questions</span>
          </h2>
          <FAQAccordion items={faqProprietaires} schema={false} />
          <div className="mt-8">
            <Link href="/conciergerie/estimer-mes-revenus"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-rhone)] text-white font-semibold rounded-xl hover:bg-[var(--color-rhone-light)] transition-colors">
              Estimer mes revenus gratuitement <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section id="voyageurs" aria-labelledby="faq-voy-heading">
          <h2 id="faq-voy-heading" className="font-serif text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            Questions voyageurs
            <span className="text-sm font-normal text-gray-400 font-sans">{faqVoyageurs.length} questions</span>
          </h2>
          <FAQAccordion items={faqVoyageurs} schema={false} />
          <div className="mt-8">
            <Link href="/locations"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-alpilles)] text-white font-semibold rounded-xl hover:bg-[var(--color-alpilles-light)] transition-colors">
              Voir nos hébergements <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section id="destinations" aria-labelledby="faq-dest-heading">
          <h2 id="faq-dest-heading" className="font-serif text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            Questions destinations
            <span className="text-sm font-normal text-gray-400 font-sans">{faqDestinations.length} questions</span>
          </h2>
          <FAQAccordion items={faqDestinations} schema={false} />
          <div className="mt-8">
            <Link href="/destinations"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-rhone)] text-[var(--color-rhone)] font-semibold rounded-xl hover:bg-[var(--color-rhone)]/5 transition-colors">
              Explorer les destinations <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <div className="bg-[var(--color-cream)] rounded-2xl p-8 text-center">
          <p className="font-serif text-xl font-bold text-gray-900 mb-3">Vous n'avez pas trouvé votre réponse ?</p>
          <p className="text-gray-600 mb-6">Notre équipe vous répond sous 24h.</p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-rhone)] text-white font-semibold rounded-xl hover:bg-[var(--color-rhone-light)] transition-colors">
            Nous contacter <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
