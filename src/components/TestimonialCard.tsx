import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/data";
import { formatDate } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
      <Quote
        className="w-6 h-6 text-[var(--color-or)] mb-4 flex-shrink-0 opacity-70"
        aria-hidden="true"
      />

      <p className="text-gray-600 leading-relaxed text-sm flex-1 mb-6 italic">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{testimonial.location}</p>
          <p className="text-xs text-gray-300 mt-0.5">{formatDate(testimonial.date)}</p>
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
            className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
              testimonial.role === "proprietaire"
                ? "bg-[var(--color-cream)] text-[var(--color-rhone)]"
                : "bg-[#FBF6EE] text-[var(--color-or-dark)]"
            }`}
          >
            {testimonial.role === "proprietaire" ? "Propriétaire" : "Voyageur"}
          </span>
        </div>
      </div>
    </article>
  );
}
