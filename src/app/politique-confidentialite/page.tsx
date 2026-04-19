import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Entre Rhône et Alpilles",
  description: "Politique de confidentialité et traitement des données personnelles de la conciergerie Entre Rhône et Alpilles. Conformité RGPD.",
  robots: { index: false, follow: false },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="pt-20">
      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Politique de confidentialité" }]} />
          <h1 className="font-serif text-4xl font-bold text-gray-900 mt-8">Politique de confidentialité</h1>
        </div>
      </div>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray max-w-none">
          <h2>Collecte des données</h2>
          <p>Entre Rhône et Alpilles collecte uniquement les données nécessaires au traitement de vos demandes :
          nom, email, téléphone, via nos formulaires de contact.</p>

          <h2>Finalités</h2>
          <p>Vos données sont utilisées pour : répondre à vos demandes, vous envoyer notre newsletter (avec consentement),
          améliorer nos services. Elles ne sont jamais cédées à des tiers.</p>

          <h2>Durée de conservation</h2>
          <p>Prospects : 3 ans à compter du dernier contact. Clients : 5 ans pour les obligations comptables.</p>

          <h2>Vos droits (RGPD)</h2>
          <p>Vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données.
          Pour exercer ces droits : contact@entre-rhone-alpilles.fr</p>

          <h2>Cookies</h2>
          <p>Ce site utilise des cookies analytiques (Google Analytics 4) et fonctionnels.
          Votre consentement est demandé à votre première visite conformément aux recommandations CNIL.</p>

          <h2>Contact DPO</h2>
          <p>Pour toute question relative à vos données : contact@entre-rhone-alpilles.fr</p>
        </div>
      </section>
    </div>
  );
}
