import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/data";
import { formatDate } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article
      className="bg-white rounded-xl p-6 border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
      style={{ borderColor: "var(--color-gres-clair)" }}
    >
      <Quote
        className="w-5 h-5 mb-4 flex-shrink-0 opacity-50 text-[var(--color-or)]"
        aria-hidden="true"
      />

      <p className="leading-relaxed text-sm flex-1 mb-6 italic" style={{ color: "var(--texte-leger)" }}>
        &ldquo;{testimonial.text}&rdquo;
      </p>

      <div
        className="flex items-center justify-between pt-4 border-t"
        style={{ borderColor: "var(--color-gres-clair)" }}
      >
        <div>
          <p className="font-medium text-sm text-[var(--color-encre)]">{testimonial.name}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--texte-discret)" }}>{testimonial.location}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--color-gres-moyen)" }}>{formatDate(testimonial.date)}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-0.5" role="img" aria-label={`${testimonial.rating} étoiles sur 5`}>
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 fill-[var(--color-or)] text-[var(--color-or)]"
                aria-hidden="true"
              />
            ))}
          </div>
          <span
            className="text-xs px-2.5 py-0.5 rounded-full font-medium"
            style={
              testimonial.role === "proprietaire"
                ? { background: "var(--color-cream)", color: "var(--color-rhone-dark)" }
                : { background: "var(--color-lin)", color: "var(--color-sable)" }
            }
          >
            {testimonial.role === "proprietaire" ? "Propriétaire" : "Voyageur"}
          </span>
        </div>
      </div>
    </article>
  );
}
