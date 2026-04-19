"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Une erreur est survenue.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return <p className="text-white font-semibold py-3">✓ Vous êtes inscrit(e) ! À bientôt.</p>;
  }

  return (
    <>
      <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
        <label htmlFor="newsletter-email" className="sr-only">Votre adresse email</label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.fr"
          required
          className="flex-1 px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-or)]"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[var(--color-or)] text-white font-semibold rounded-xl hover:bg-[var(--color-or-light)] transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "…" : "S'abonner"}
        </button>
      </form>
      {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
    </>
  );
}
