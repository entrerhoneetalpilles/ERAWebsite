import Link from "next/link";
import { MapPin, Users, Star, Waves } from "lucide-react";

interface PropertyCardProps {
  title: string;
  location: string;
  type: string;
  guests: number;
  price: number;
  rating: number;
  reviewCount: number;
  hasPiscine?: boolean;
  slug: string;
  href?: string;
  image?: string;
  featured?: boolean;
}

export default function PropertyCard({
  title,
  location,
  type,
  guests,
  price,
  rating,
  reviewCount,
  hasPiscine,
  slug,
  href,
  image,
  featured,
}: PropertyCardProps) {
  const cardHref = href ?? `/locations/${slug}`;
  return (
    <article
      className={`group bg-white rounded-xl overflow-hidden transition-all duration-300 border ${
        featured
          ? "shadow-md"
          : "shadow-sm hover:shadow-md hover:-translate-y-0.5"
      }`}
      style={featured ? { borderColor: "var(--color-gres-moyen)" } : { borderColor: "var(--color-gres-clair)" }}
    >
      {/* Image */}
      <Link href={cardHref} className="block relative overflow-hidden aspect-[4/3]">
        <div
          className="w-full h-full bg-gradient-to-br from-[var(--color-cream)] to-[var(--color-alpilles)]/20 group-hover:scale-105 transition-transform duration-500"
          style={
            image
              ? { backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }
              : {}
          }
          role="img"
          aria-label={`Photo de ${title}`}
        />
        {featured && (
          <span
            className="absolute top-3 left-3 px-3 py-1 text-white text-xs font-medium rounded-full tracking-wide"
            style={{ background: "var(--color-sable)" }}
          >
            Coup de cœur
          </span>
        )}
        {hasPiscine && (
          <span className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-full">
            <Waves className="w-3.5 h-3.5 text-[var(--color-alpilles-dark)]" aria-label="Piscine" />
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-xs mb-2" style={{ color: "var(--texte-discret)" }}>
          <MapPin className="w-3 h-3" aria-hidden="true" />
          <span>{location}</span>
          <span className="mx-1" style={{ color: "var(--color-gres-clair)" }}>·</span>
          <span>{type}</span>
        </div>

        <Link href={cardHref}>
          <h3
            className="font-serif font-normal text-base text-[var(--color-encre)] group-hover:text-[var(--color-rhone-dark)] transition-colors line-clamp-2 leading-snug mb-3"
          >
            {title}
          </h3>
        </Link>

        <div className="flex items-center gap-3 text-xs mb-4" style={{ color: "var(--texte-discret)" }}>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" aria-hidden="true" />
            {guests} voyageurs
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-[var(--color-or)] text-[var(--color-or)]" aria-hidden="true" />
            <span className="font-medium" style={{ color: "var(--texte-corps)" }}>{rating}</span>
            <span>({reviewCount})</span>
          </span>
        </div>

        <div
          className="flex items-center justify-between pt-3 border-t"
          style={{ borderColor: "var(--color-gres-clair)" }}
        >
          <div>
            <span className="text-lg font-semibold text-[var(--color-encre)]">{price} €</span>
            <span className="text-xs" style={{ color: "var(--texte-discret)" }}> / nuit</span>
          </div>
          <Link
            href={cardHref}
            className="px-4 py-1.5 bg-[var(--color-rhone)] text-white text-xs font-medium rounded-md hover:bg-[var(--color-rhone-dark)] transition-colors"
            style={{ letterSpacing: "0.04em" }}
          >
            Voir le bien
          </Link>
        </div>
      </div>
    </article>
  );
}
