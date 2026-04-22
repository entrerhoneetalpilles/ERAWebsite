import type { Metadata } from "next";
import EstimerForm from "@/components/EstimerForm";
import { OG_IMG } from "@/lib/og";

export const metadata: Metadata = {
  title: "Simulateur Revenus Locatifs Provence",
  description:
    "Calculez gratuitement vos revenus Airbnb en Alpilles et Provence. Résultat en 30 secondes basé sur les données AirDNA et notre expertise locale.",
  alternates: { canonical: "https://entre-rhone-alpilles.fr/conciergerie/estimer-mes-revenus" },
  openGraph: {
    title: "Simulateur Revenus Locatifs Provence",
    description: "Estimez gratuitement vos revenus Airbnb en Provence. Résultat en 30 secondes.",
    url: "https://entre-rhone-alpilles.fr/conciergerie/estimer-mes-revenus",
    images: OG_IMG,
  },
};

export default function EstimerMesRevenusPage() {
  return <EstimerForm />;
}
