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
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <>
      {schemaData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      )}
      <dl className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
        {items.map((item, index) => (
          <div key={index} className="bg-white">
            <dt>
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-[var(--color-cream)] transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-serif text-base font-normal text-gray-900 leading-snug">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[var(--color-rhone)] flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </dt>
            {openIndex === index && (
              <dd className="px-6 pb-5">
                <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
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
