import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente — Entre Rhône et Alpilles",
  description: "Conditions générales de vente de la conciergerie Entre Rhône et Alpilles. Modalités de réservation, annulation, paiement.",
  robots: { index: false, follow: false },
};

export default function CGVPage() {
  return (
    <div className="pt-20">
      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "CGV" }]} />
          <h1 className="font-serif text-4xl font-bold text-gray-900 mt-8">Conditions Générales de Vente</h1>
          <p className="text-gray-500 mt-2">Dernière mise à jour : janvier 2025</p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-gray-700 leading-relaxed">
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">1. Objet</h2>
            <p>Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Entre Rhône et Alpilles (ci-après « ERA ») et ses clients, qu'il s'agisse de propriétaires confiant leur bien en gestion ou de voyageurs réservant un hébergement.</p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">2. Services proposés</h2>
            <p className="mb-3"><strong>Pour les propriétaires :</strong> service de conciergerie incluant la gestion des réservations, l'accueil des voyageurs, l'entretien du bien et la optimisation des revenus locatifs.</p>
            <p><strong>Pour les voyageurs :</strong> mise en relation avec des hébergements de qualité, service de conciergerie local et assistance durant le séjour.</p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">3. Tarification — Propriétaires</h2>
            <p className="mb-3">ERA propose trois formules de conciergerie :</p>
            <ul className="list-disc pl-6 mb-3 space-y-1">
              <li><strong>Essentiel : 18% HT</strong> — engagement 6 mois minimum, préavis 2 mois, onboarding 150 € HT</li>
              <li><strong>Premium : 22% HT</strong> — engagement 12 mois recommandé, préavis 2 mois, onboarding offert</li>
              <li><strong>Prestige : 28% HT</strong> — engagement 12 mois minimum, préavis 3 mois, onboarding offert</li>
            </ul>
            <p className="mb-3">La commission se calcule sur les revenus locatifs nets après déduction des frais de plateforme (Airbnb, Booking, etc.). TVA 20% applicable selon le régime fiscal du propriétaire.</p>
            <p><strong>Modèle de facturation :</strong> le propriétaire perçoit ses revenus locatifs directement depuis les plateformes. ERA adresse une facture mensuelle correspondant à sa commission (J+10 pour Essentiel, J+5 pour Premium et Prestige).</p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">4. Réservations — Voyageurs</h2>
            <p className="mb-3">Les réservations sont confirmées à réception du paiement. Le solde est dû selon les conditions de la plateforme utilisée (Airbnb, Booking.com, réservation directe).</p>
            <p>Une caution peut être demandée selon le bien loué. Elle est restituée dans les 48h suivant le départ en l'absence de dommages constatés.</p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">5. Annulation</h2>
            <p className="mb-3"><strong>Propriétaires :</strong> résiliation du contrat de gestion avec 30 jours de préavis par email recommandé.</p>
            <p><strong>Voyageurs :</strong> les conditions d'annulation sont celles affichées au moment de la réservation sur la plateforme utilisée. En réservation directe, remboursement intégral jusqu'à 7 jours avant l'arrivée, 50% entre 7 et 3 jours, aucun remboursement en dessous.</p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">6. Responsabilités</h2>
            <p>ERA s'engage à mettre en œuvre tous les moyens nécessaires à la bonne exécution des services. ERA ne peut être tenue responsable des cas de force majeure, des dommages causés par les voyageurs (couverts par la garantie Airbnb), ou des défaillances de tiers.</p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">7. Droit applicable</h2>
            <p>Les présentes CGV sont soumises au droit français. Tout litige sera soumis aux tribunaux compétents du ressort d'Aix-en-Provence.</p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">8. Contact</h2>
            <p>Entre Rhône et Alpilles · Saint-Rémy-de-Provence (13210)<br />
            Email : contact@entre-rhone-alpilles.fr · Tél. : 07 52 90 78 68</p>
          </div>
        </div>
      </section>
    </div>
  );
}
