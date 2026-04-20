"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const contactInfo = [
  { icon: <Phone className="w-5 h-5" aria-hidden="true" />, label: "Téléphone", value: "07 52 90 78 68", href: "tel:+33752907868" },
  { icon: <Mail className="w-5 h-5" aria-hidden="true" />, label: "Email", value: "contact@entre-rhone-alpilles.fr", href: "mailto:contact@entre-rhone-alpilles.fr" },
  { icon: <MapPin className="w-5 h-5" aria-hidden="true" />, label: "Zone", value: "Saint-Rémy-de-Provence, 13210", href: undefined },
  { icon: <Clock className="w-5 h-5" aria-hidden="true" />, label: "Disponibilité", value: "Lun–Sam, 9h–19h", href: undefined },
];

export default function ContactForm() {
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", sujet: "proprietaire", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.nom, email: form.email, phone: form.telephone, subject: form.sujet, message: form.message }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Une erreur est survenue. Veuillez réessayer.");
      } else {
        setSubmitted(true);
        window.dataLayer?.push({ event: "contact_form_submit", contact_type: form.sujet });
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-20">
      <div className="bg-[var(--color-cream)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Contact" }]} />
          <div className="mt-8 max-w-2xl">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Contactez-nous</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Propriétaire ou voyageur, notre équipe vous répond sous 24h.
            </p>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Infos */}
            <div>
              <h2 className="font-serif text-xl font-bold text-gray-900 mb-6">Nos coordonnées</h2>
              <div className="space-y-5">
                {contactInfo.map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-rhone)]/10 text-[var(--color-rhone)] flex items-center justify-center flex-shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-gray-800 font-semibold hover:text-[var(--color-rhone)] transition-colors">{c.value}</a>
                      ) : (
                        <p className="text-gray-800 font-semibold">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-5 bg-[var(--color-cream)] rounded-xl">
                <h3 className="font-serif font-bold text-gray-900 mb-2">Délais de réponse</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Par téléphone : réponse immédiate en heures ouvrées.<br />
                  Par email : réponse garantie sous 24h ouvrées.<br />
                  Pour les urgences voyageurs : ligne 24/7 disponible.
                </p>
              </div>
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="text-center py-16">
                  <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Message envoyé !</h2>
                  <p className="text-gray-600">Nous vous répondrons sous 24 heures ouvrées.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nom" className="block text-sm font-semibold text-gray-700 mb-2">Nom & prénom *</label>
                      <input id="nom" type="text" required value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-rhone)] focus:border-transparent" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-rhone)] focus:border-transparent" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="telephone" className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                    <input id="telephone" type="tel" value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-rhone)] focus:border-transparent" />
                  </div>

                  <div>
                    <p className="block text-sm font-semibold text-gray-700 mb-3">Je suis… *</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { val: "proprietaire", label: "Propriétaire" },
                        { val: "voyageur", label: "Voyageur" },
                      ].map((opt) => (
                        <button key={opt.val} type="button" onClick={() => setForm({ ...form, sujet: opt.val })}
                          className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-colors ${form.sujet === opt.val ? "border-[var(--color-rhone)] bg-[var(--color-rhone)] text-white" : "border-gray-200 text-gray-600 hover:border-[var(--color-rhone)]"}`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                    <textarea id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={form.sujet === "proprietaire" ? "Décrivez votre bien, sa localisation, votre situation actuelle..." : "Vos dates de séjour, nombre de voyageurs, type de bien recherché..."}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-rhone)] focus:border-transparent resize-none" />
                  </div>

                  <div className="flex items-start gap-3">
                    <input id="rgpd" type="checkbox" required className="mt-1 accent-[var(--color-rhone)]" />
                    <label htmlFor="rgpd" className="text-xs text-gray-500 leading-relaxed">
                      J'accepte que mes données soient utilisées pour traiter ma demande.{" "}
                      <a href="/politique-confidentialite" className="text-[var(--color-rhone)] hover:underline">Politique de confidentialité</a>.
                    </label>
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
                  )}

                  <button type="submit" disabled={loading}
                    className="w-full py-4 bg-[var(--color-rhone)] text-white font-bold rounded-xl hover:bg-[var(--color-rhone-light)] transition-colors text-base disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? "Envoi en cours…" : "Envoyer mon message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
