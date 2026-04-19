import type { Metadata } from "next";
import EstimerForm from "@/components/EstimerForm";

export const metadata: Metadata = {
  title: "Estimer mes revenus — Simulateur Gratuit Location Provence",
  description:
    "Calculez vos revenus locatifs potentiels en Provence. Simulation gratuite pour mas, villas, bastides en Alpilles. Basé sur les données AirDNA et notre expertise locale.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/conciergerie/estimer-mes-revenus" },
  openGraph: {
    title: "Simulateur de revenus locatifs — Provence & Alpilles",
    description: "Estimez gratuitement vos revenus Airbnb en Provence. Résultat en 30 secondes.",
  },
};

export default function EstimerMesRevenusPage() {
  return <EstimerForm />;
}
