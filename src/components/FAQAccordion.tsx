"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  schema?: boolean;
}

export default function FAQAccordion({ items, schema = true }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const schemaData = schema
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
      <dl className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
          >
            <dt>
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-serif text-base font-semibold text-gray-900 leading-snug">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[var(--color-rhone)] flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </dt>
            {openIndex === index && (
              <dd className="px-5 pb-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </dd>
            )}
          </div>
        ))}
      </dl>
    </>
  );
}
