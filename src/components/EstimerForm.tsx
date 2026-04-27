"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const communes = [
  "Saint-Rémy-de-Provence",
  "Les Baux-de-Provence",
  "Maussane-les-Alpilles",
  "Arles",
  "Eygalières",
  "Fontvieille",
  "Paradou",
  "Autre commune",
];
const propertyTypes = ["Mas", "Villa", "Bastide", "Appartement", "Gîte", "Maison de village"];
const standings = ["Standard", "Confort", "Premium", "Luxe"];

const baseRevenues: Record<string, Record<string, number>> = {
  "Saint-Rémy-de-Provence": { Mas: 28000, Villa: 32000, Bastide: 38000, Appartement: 14000, Gîte: 16000, "Maison de village": 12000 },
  "Les Baux-de-Provence": { Mas: 30000, Villa: 35000, Bastide: 42000, Appartement: 15000, Gîte: 18000, "Maison de village": 13000 },
  Eygalières: { Mas: 35000, Villa: 45000, Bastide: 55000, Appartement: 18000, Gîte: 20000, "Maison de village": 16000 },
  Arles: { Mas: 18000, Villa: 22000, Bastide: 28000, Appartement: 12000, Gîte: 14000, "Maison de village": 10000 },
  "Maussane-les-Alpilles": { Mas: 25000, Villa: 29000, Bastide: 36000, Appartement: 13000, Gîte: 15000, "Maison de village": 11000 },
  Fontvieille: { Mas: 22000, Villa: 26000, Bastide: 32000, Appartement: 11000, Gîte: 14000, "Maison de village": 10000 },
  Paradou: { Mas: 24000, Villa: 28000, Bastide: 34000, Appartement: 12000, Gîte: 14000, "Maison de village": 11000 },
};

const standingMultiplier: Record<string, number> = { Standard: 0.8, Confort: 1.0, Premium: 1.25, Luxe: 1.6 };
const bedroomMultiplier: Record<number, number> = { 1: 0.6, 2: 0.8, 3: 1.0, 4: 1.25, 5: 1.5 };

export default function EstimerForm() {
  const [form, setForm] = useState({ commune: "", type: "", bedrooms: 3, standing: "Confort" });
  const [result, setResult] = useState<{ min: number; max: number } | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  function calculate() {
    const base = (baseRevenues[form.commune] ?? baseRevenues["Saint-Rémy-de-Provence"])[form.type] ?? 20000;
    const mult = standingMultiplier[form.standing] * bedroomMultiplier[form.bedrooms];
    const est = Math.round(base * mult);
    setResult({ min: Math.round(est * 0.85), max: Math.round(est * 1.15) });
  }

  function formatEur(n: number) {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  }

  return (
    <div className="pt-20">
      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Conciergerie", href: "/conciergerie" }, { label: "Estimer mes revenus" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Estimez vos revenus locatifs en Provence
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Notre simulateur vous donne une fourchette réaliste basée sur les données AirDNA et nos observations locales.
            </p>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--color-cream)] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <Calculator className="w-8 h-8 text-[var(--color-rhone)]" aria-hidden="true" />
              <h2 className="font-serif text-2xl font-bold text-gray-900">Simulateur de revenus</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="commune" className="block text-sm font-semibold text-gray-700 mb-2">Commune</label>
                <select id="commune" value={form.commune} onChange={(e) => setForm({ ...form, commune: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-rhone)] focus:border-transparent">
                  <option value="">Sélectionnez une commune</option>
                  {communes.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">Type de bien</label>
                <select id="type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-rhone)] focus:border-transparent">
                  <option value="">Sélectionnez un type</option>
                  {propertyTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="bedrooms" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre de chambres : <span className="text-[var(--color-rhone)]">{form.bedrooms}</span>
                </label>
                <input id="bedrooms" type="range" min={1} max={5} value={form.bedrooms}
                  onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })}
                  className="w-full accent-[var(--color-rhone)]" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  {[1, 2, 3, 4, 5].map((n) => <span key={n}>{n}</span>)}
                </div>
              </div>

              <div>
                <p className="block text-sm font-semibold text-gray-700 mb-2">Standing du bien</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {standings.map((s) => (
                    <button key={s} onClick={() => setForm({ ...form, standing: s })}
                      className={`py-2.5 px-3 rounded-xl text-sm font-medium border-2 transition-colors ${form.standing === s ? "border-[var(--color-rhone)] bg-[var(--color-rhone)] text-white" : "border-gray-200 text-gray-600 hover:border-[var(--color-rhone)]"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={calculate} disabled={!form.commune || !form.type}
                className="w-full py-4 bg-[var(--color-rhone)] text-white font-bold rounded-xl hover:bg-[var(--color-rhone-light)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg">
                Calculer mes revenus estimés
              </button>
            </div>

            {result && (
              <div className="mt-8 p-6 bg-white rounded-xl border-2 border-[var(--color-rhone)] text-center">
                <p className="text-sm text-gray-500 mb-2">Revenus annuels estimés avec ERA</p>
                <p className="font-serif text-4xl font-bold text-[var(--color-rhone)] mb-1">
                  {formatEur(result.min)} — {formatEur(result.max)}
                </p>
                <p className="text-xs text-gray-400 mb-6">Estimation basée sur les données du marché local (AirDNA)</p>

                {!submitted ? (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Recevez votre étude personnalisée par email</p>
                    <div className="flex gap-2">
                      <input type="email" placeholder="votre@email.fr" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-rhone)]" />
                      <button onClick={async () => {
                        if (!email) return;
                        setEmailLoading(true);
                        setEmailError("");
                        try {
                          const res = await fetch("/api/estimateur", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email, commune: form.commune, type: form.type, surface: form.bedrooms, estimatedRevenue: result }),
                          });
                          if (!res.ok) {
                            const data = await res.json();
                            setEmailError(data.error || "Erreur. Veuillez réessayer.");
                          } else {
                            setSubmitted(true);
                            window.dataLayer?.push({ event: "estimateur_submit", commune: form.commune, property_type: form.type, standing: form.standing, revenue_min: result?.min, revenue_max: result?.max });
                          }
                        } catch {
                          setEmailError("Erreur. Veuillez réessayer.");
                        } finally {
                          setEmailLoading(false);
                        }
                      }} disabled={!email || emailLoading}
                        className="px-4 py-2.5 bg-[var(--color-or)] text-white font-semibold rounded-lg hover:bg-[var(--color-or-light)] transition-colors disabled:opacity-50">
                        {emailLoading ? "…" : <ArrowRight className="w-4 h-4" aria-hidden="true" />}
                      </button>
                    </div>
                    {emailError && <p className="text-red-500 text-xs mt-2">{emailError}</p>}
                  </div>
                ) : (
                  <p className="text-[var(--color-alpilles)] font-semibold">Votre étude personnalisée vous sera envoyée sous 24h !</p>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Préférez-vous en parler directement à un expert ?</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-rhone)] text-[var(--color-rhone)] font-semibold rounded-xl hover:bg-[var(--color-rhone)]/5 transition-colors">
              Prendre rendez-vous <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Méthodologie SEO */}
      <section className="py-16 bg-[var(--color-cream)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Comment est calculée l&apos;estimation ?
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
            <p>
              Notre simulateur croise <strong>trois sources de données</strong> : les données AirDNA (tarifs et taux
              d&apos;occupation en temps réel sur Airbnb, Booking.com et VRBO), notre propre observatoire du marché
              basé sur le portefeuille de biens que nous gérons en Provence, et les spécificités de chaque commune
              (saisonnalité, profil voyageur, types de biens dominants).
            </p>
            <p>
              L&apos;estimation fournie est une <strong>fourchette annuelle réaliste</strong>, ajustée selon le type de bien,
              le nombre de chambres et le standing. Elle suppose une gestion active avec tarification dynamique —
              ce que nous mettons en place dès le premier mois de mandat. Sans optimisation, les revenus sont
              généralement 20 à 35% inférieurs à ce potentiel.
            </p>
            <p>
              Cette estimation ne tient pas compte de votre calendrier personnel de blocage (si vous souhaitez
              garder des semaines pour votre usage propre). Pour une estimation sur mesure incluant ces contraintes,
              utilisez le formulaire de contact.
            </p>
          </div>
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">
            Questions sur le simulateur
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "L'estimation est-elle garantie ?",
                a: "Non — c'est une fourchette indicative basée sur le marché actuel. Les revenus réels dépendent de la qualité du bien, de son état, de ses équipements et de la stratégie de tarification. Nous nous engageons sur des objectifs révisés après inspection physique du bien.",
              },
              {
                q: "Quelle est la commission d'ERA sur les revenus ?",
                a: "Notre commission est de 20 à 25% des revenus locatifs générés, tout compris : gestion des annonces, accueil voyageurs, ménage professionnel, linge hôtelier et tarification dynamique. Pas de frais fixes ni d'engagement minimum de durée.",
              },
              {
                q: "Mon bien n'est pas à Saint-Rémy ou Eygalières — puis-je quand même utiliser le simulateur ?",
                a: "Oui, sélectionnez \"Autre commune\" et nous vous contacterons avec une estimation adaptée à votre localisation précise. Nous couvrons 20 communes entre le Rhône et les Alpilles.",
              },
              {
                q: "À partir de quel type de bien travaillez-vous ?",
                a: "Nous gérons des mas, villas, bastides, gîtes, maisons de village et appartements dès lors qu'ils répondent à nos critères de qualité. Pas de seuil de surface minimum, mais un standing minimum Confort.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
