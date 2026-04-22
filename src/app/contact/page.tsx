import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { OG_IMG } from "@/lib/og";

export const metadata: Metadata = {
  title: "Contactez-nous — Devis gratuit sous 24h",
  description:
    "Contactez notre conciergerie en Provence. Propriétaires : devis gratuit sous 24h. Voyageurs : aide à la réservation. Saint-Rémy-de-Provence.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/contact" },
  openGraph: {
    title: "Contactez-nous — Devis gratuit sous 24h",
    description: "Conciergerie Provence — devis gratuit pour propriétaires sous 24h. Aide à la réservation pour voyageurs.",
    url: "https://entre-rhone-alpilles.fr/contact",
    images: OG_IMG,
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
