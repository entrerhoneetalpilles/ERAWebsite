import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CommuneCard from "@/components/CommuneCard";
import Breadcrumb from "@/components/Breadcrumb";
import { communes, getCommunesByCircle } from "@/lib/data";

export const metadata: Metadata = {
  title: "Destinations en Provence — Entre Rhône et Alpilles",
  description:
    "Guides complets de 20 communes entre le Rhône et les Alpilles : Saint-Rémy-de-Provence, Arles, Les Baux, Eygalières, Maussane et bien d'autres.",
};

export default function DestinationsPage() {
  const c1 = getCommunesByCircle(1);
  const c2 = getCommunesByCircle(2);
  const c3 = getCommunesByCircle(3);

  return (
    <div className="pt-20">
      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Destinations" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Nos destinations en Provence
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              De Villeneuve-lès-Avignon à Eygalières, découvrez le guide complet de nos 20 communes
              entre le Rhône et les Alpilles.
            </p>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white" aria-labelledby="c1-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">⭐</span>
            <div>
              <h2 id="c1-heading" className="font-serif text-2xl font-bold text-gray-900">Cœur de marché — Alpilles</h2>
              <p className="text-sm text-gray-500">Priorité absolue · Clientèle premium · Triangle d'or</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c1.map((c) => <CommuneCard key={c.slug} commune={c} showCircle />)}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--color-cream)]" aria-labelledby="c2-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">🔵</span>
            <div>
              <h2 id="c2-heading" className="font-serif text-2xl font-bold text-gray-900">Zone de développement</h2>
              <p className="text-sm text-gray-500">Fort potentiel · Biens de caractère</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c2.map((c) => <CommuneCard key={c.slug} commune={c} showCircle />)}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" aria-labelledby="c3-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">🟢</span>
            <div>
              <h2 id="c3-heading" className="font-serif text-2xl font-bold text-gray-900">Frontière stratégique</h2>
              <p className="text-sm text-gray-500">SEO longue traîne · Opportuniste</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c3.map((c) => <CommuneCard key={c.slug} commune={c} showCircle />)}
          </div>
        </div>
      </section>
    </div>
  );
}
