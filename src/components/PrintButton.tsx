"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      aria-label="Télécharger en PDF"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-[var(--color-rhone)] text-white text-sm font-semibold rounded-full shadow-lg hover:opacity-90 transition-opacity print:hidden"
    >
      <Printer className="w-4 h-4" aria-hidden="true" />
      Télécharger PDF
    </button>
  );
}
