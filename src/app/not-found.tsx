import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

const quickLinks = [
  { href: "/locations", label: "Hébergements" },
  { href: "/destinations", label: "Destinations" },
  { href: "/conciergerie", label: "Conciergerie" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <div className="pt-20 min-h-screen flex items-center bg-[var(--color-cream)]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <p className="font-serif text-8xl font-bold text-[var(--color-rhone)]/20 mb-6">404</p>
        <h1 className="font-serif text-3xl font-bold text-gray-900 mb-4">Page introuvable</h1>
        <p className="text-gray-600 mb-10">
          Cette page n'existe pas ou a été déplacée. Revenez à l'accueil ou explorez nos destinations en Provence.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {quickLinks.map((l) => (
            <Link key={l.href} href={l.href}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-[var(--color-rhone)] hover:text-[var(--color-rhone)] transition-colors">
              {l.label}
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          ))}
        </div>

        <Link href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-rhone)] text-white font-semibold rounded-xl hover:bg-[var(--color-rhone-light)] transition-colors">
          Retour à l'accueil
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
