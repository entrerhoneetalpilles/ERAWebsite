"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return <p className="text-white font-semibold py-3">✓ Vous êtes inscrit(e) ! À bientôt.</p>;
  }

  return (
    <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
      <label htmlFor="newsletter-email" className="sr-only">Votre adresse email</label>
      <input
        id="newsletter-email"
        type="email"
        placeholder="votre@email.fr"
        required
        className="flex-1 px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-or)]"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-[var(--color-or)] text-white font-semibold rounded-xl hover:bg-[var(--color-or-light)] transition-colors whitespace-nowrap"
      >
        S'abonner
      </button>
    </form>
  );
}
