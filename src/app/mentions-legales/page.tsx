import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Mentions légales — Entre Rhône et Alpilles",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="pt-20">
      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Mentions légales" }]} />
          <h1 className="font-serif text-4xl font-bold text-gray-900 mt-8">Mentions légales</h1>
        </div>
      </div>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray max-w-none">
          <h2>Éditeur du site</h2>
          <p>Entre Rhône et Alpilles — Conciergerie de Locations Saisonnières<br />
          Adresse : Saint-Rémy-de-Provence (13210)<br />
          Email : contact@entre-rhone-alpilles.fr<br />
          Téléphone : 06 00 00 00 00</p>

          <h2>Hébergement</h2>
          <p>Le site entre-rhone-alpilles.fr est hébergé par Vercel Inc.,
          340 Pine Street, Suite 900, San Francisco, CA 94104, USA.</p>

          <h2>Propriété intellectuelle</h2>
          <p>L'ensemble du contenu de ce site (textes, images, vidéos, logos) est protégé
          par le droit d'auteur et appartient à Entre Rhône et Alpilles ou à ses partenaires.
          Toute reproduction est interdite sans accord préalable.</p>

          <h2>Limitation de responsabilité</h2>
          <p>Les informations contenues sur ce site sont données à titre indicatif.
          Entre Rhône et Alpilles ne saurait être tenu responsable des erreurs ou omissions.</p>

          <h2>Droit applicable</h2>
          <p>Ce site est soumis au droit français. En cas de litige, les tribunaux français sont compétents.</p>
        </div>
      </section>
    </div>
  );
}
