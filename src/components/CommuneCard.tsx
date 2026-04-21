import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import type { Commune } from "@/lib/data";

interface CommuneCardProps {
  commune: Commune;
  showCircle?: boolean;
}

const circleColors = {
  1: { bg: "var(--color-lin)", text: "var(--color-rhone-dark)", border: "var(--color-gres-moyen)" },
  2: { bg: "var(--color-cream)", text: "var(--color-rhone)", border: "var(--color-gres-clair)" },
  3: { bg: "var(--blanc-casse)", text: "var(--texte-discret)", border: "var(--color-gres-clair)" },
};

const circleLabels = {
  1: "Cœur des Alpilles",
  2: "Alpilles & Camargue",
  3: "Grande Provence",
};

const bandColors = {
  1: "var(--color-sable)",
  2: "var(--color-rhone)",
  3: "var(--color-alpilles)",
};

export default function CommuneCard({ commune, showCircle }: CommuneCardProps) {
  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-[var(--color-gres-clair)]">
      {/* Color band top */}
      <div
        className="h-1.5"
        style={{ background: bandColors[commune.circle] }}
      />

      <div className="p-5">
        {showCircle && (
          <span
            className="inline-block mb-3 px-2.5 py-0.5 rounded-full text-xs font-medium border"
            style={{
              background: circleColors[commune.circle].bg,
              color: circleColors[commune.circle].text,
              borderColor: circleColors[commune.circle].border,
            }}
          >
            {circleLabels[commune.circle]}
          </span>
        )}

        <div className="flex items-start gap-2 mb-2">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--color-rhone)]" aria-hidden="true" />
          <h3 className="font-serif font-normal text-lg text-[var(--color-encre)] leading-snug group-hover:text-[var(--color-rhone-dark)] transition-colors">
            {commune.name}
          </h3>
        </div>

        <p className="text-sm font-medium mb-3 text-[var(--color-rhone-dark)]">
          {commune.atout}
        </p>

        <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: "var(--texte-leger)" }}>
          {commune.description}
        </p>

        <div className="mb-4">
          <p
            className="text-xs uppercase tracking-wider mb-1.5 font-medium"
            style={{ color: "var(--texte-discret)" }}
          >
            Profil voyageur
          </p>
          <p className="text-sm" style={{ color: "var(--texte-leger)" }}>{commune.profilVoyageur}</p>
        </div>

        <div className="flex gap-2 flex-wrap mb-4">
          {commune.propertyTypes.slice(0, 3).map((type) => (
            <span
              key={type}
              className="px-2 py-0.5 text-xs rounded-full"
              style={{ background: "var(--color-cream)", color: "var(--texte-leger)" }}
            >
              {type.replace("-", " ")}
            </span>
          ))}
        </div>

        <div
          className="flex gap-2 pt-3 border-t"
          style={{ borderColor: "var(--color-gres-clair)" }}
        >
          <Link
            href={`/locations/${commune.slug}`}
            className="flex-1 text-center px-3 py-2 bg-[var(--color-rhone)] text-white text-xs font-medium rounded-md hover:bg-[var(--color-rhone-dark)] transition-colors"
          >
            Hébergements
          </Link>
          <Link
            href={`/destinations/${commune.slug}`}
            className="flex items-center gap-1 px-3 py-2 border text-xs font-medium rounded-md transition-colors hover:bg-[var(--color-cream)]"
            style={{ borderColor: "var(--color-gres-clair)", color: "var(--texte-leger)" }}
          >
            Guide
            <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
