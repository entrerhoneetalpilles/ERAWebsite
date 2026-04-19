import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import type { Commune } from "@/lib/data";

interface CommuneCardProps {
  commune: Commune;
  showCircle?: boolean;
}

const circleColors = {
  1: "bg-amber-50 text-amber-700 border-amber-200",
  2: "bg-blue-50 text-blue-700 border-blue-200",
  3: "bg-green-50 text-green-700 border-green-200",
};

const circleLabels = {
  1: "Priorité absolue",
  2: "Fort potentiel",
  3: "Longue traîne",
};

export default function CommuneCard({ commune, showCircle }: CommuneCardProps) {
  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      {/* Color band top */}
      <div
        className={`h-2 ${
          commune.circle === 1
            ? "bg-[var(--color-or)]"
            : commune.circle === 2
            ? "bg-[var(--color-rhone)]"
            : "bg-[var(--color-alpilles)]"
        }`}
      />

      <div className="p-5">
        {showCircle && (
          <span
            className={`inline-block mb-3 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
              circleColors[commune.circle]
            }`}
          >
            {circleLabels[commune.circle]}
          </span>
        )}

        <div className="flex items-start gap-2 mb-2">
          <MapPin className="w-4 h-4 text-[var(--color-rhone)] mt-0.5 flex-shrink-0" aria-hidden="true" />
          <h3 className="font-serif text-lg font-semibold text-gray-900 leading-snug group-hover:text-[var(--color-rhone)] transition-colors">
            {commune.name}
          </h3>
        </div>

        <p className="text-sm text-[var(--color-alpilles)] font-medium mb-3">
          {commune.atout}
        </p>

        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {commune.description}
        </p>

        <div className="mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 font-medium">
            Profil voyageur
          </p>
          <p className="text-sm text-gray-600">{commune.profilVoyageur}</p>
        </div>

        <div className="flex gap-2 flex-wrap mb-4">
          {commune.propertyTypes.slice(0, 3).map((type) => (
            <span
              key={type}
              className="px-2 py-0.5 bg-[var(--color-cream)] text-gray-600 text-xs rounded-full"
            >
              {type.replace("-", " ")}
            </span>
          ))}
        </div>

        <div className="flex gap-2 pt-3 border-t border-gray-100">
          <Link
            href={`/locations/${commune.slug}`}
            className="flex-1 text-center px-3 py-2 bg-[var(--color-rhone)] text-white text-xs font-medium rounded-lg hover:bg-[var(--color-rhone-light)] transition-colors"
          >
            Hébergements
          </Link>
          <Link
            href={`/destinations/${commune.slug}`}
            className="flex items-center gap-1 px-3 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:border-[var(--color-rhone)] hover:text-[var(--color-rhone)] transition-colors"
          >
            Guide
            <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
