import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/data";
import { formatDate } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
      <Quote
        className="w-8 h-8 text-[var(--color-or)] mb-4 flex-shrink-0"
        aria-hidden="true"
      />

      <p className="text-gray-700 leading-relaxed text-sm flex-1 mb-6">
        "{testimonial.text}"
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{testimonial.location}</p>
          <p className="text-xs text-gray-400 mt-0.5">{formatDate(testimonial.date)}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex gap-0.5" role="img" aria-label={`${testimonial.rating} étoiles sur 5`}>
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-[var(--color-or)] text-[var(--color-or)]"
                aria-hidden="true"
              />
            ))}
          </div>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              testimonial.role === "proprietaire"
                ? "bg-blue-50 text-blue-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {testimonial.role === "proprietaire" ? "Propriétaire" : "Voyageur"}
          </span>
        </div>
      </div>
    </article>
  );
}
