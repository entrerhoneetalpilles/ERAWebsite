interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  schema?: boolean;
}

export default function FAQAccordion({ items, schema = true }: FAQAccordionProps) {
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
      <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
        {items.map((item, index) => (
          <details key={index} className="group bg-white">
            <summary className="w-full flex items-center justify-between px-6 py-5 cursor-pointer gap-4 hover:bg-[var(--color-cream)] transition-colors">
              <span className="font-serif text-base font-normal text-gray-900 leading-snug text-left">
                {item.question}
              </span>
              <svg
                className="w-4 h-4 text-[var(--color-rhone)] flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-5">
              <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                {item.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
