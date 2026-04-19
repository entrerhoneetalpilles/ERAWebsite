import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Conciergerie Entre Rhône et Alpilles",
  description:
    "Contactez notre équipe de conciergerie en Provence. Propriétaires : devis gratuit sous 24h. Voyageurs : aide à la réservation. Saint-Rémy-de-Provence.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/contact" },
};

export default function ContactPage() {
  return <ContactForm />;
}
