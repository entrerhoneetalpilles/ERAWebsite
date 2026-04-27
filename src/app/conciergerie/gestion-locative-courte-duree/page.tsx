import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, AlertCircle, TrendingUp, Clock, FileText, Shield } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { OG_IMG } from "@/lib/og";

export const metadata: Metadata = {
  title: "Gestion Locative Courte Durée — Alpilles",
  description:
    "Déléguez la gestion locative courte durée en Provence. Déclarations, tarification dynamique, maximisation des revenus. Devis gratuit sous 24h.",
  alternates: {
    canonical: "https://entre-rhone-alpilles.fr/conciergerie/gestion-locative-courte-duree",
  },
  openGraph: {
    title: "Gestion Locative Courte Durée en Provence — Alpilles",
    description:
      "Tout ce que vous devez savoir sur la gestion locative courte durée en Provence. Cadre légal, revenus, délégation. ERA gère tout pour vous.",
    url: "https://entre-rhone-alpilles.fr/conciergerie/gestion-locative-courte-duree",
    images: OG_IMG,
  },
};

const avantages = [
  {
    icon: <TrendingUp className="w-6 h-6" aria-hidden="true" />,
    title: "Revenus jusqu'à 3× supérieurs",
    desc: "La location courte durée génère en moyenne 2 à 3 fois plus de revenus qu'un bail longue durée classique sur les marchés touristiques provençaux.",
  },
  {
    icon: <Clock className="w-6 h-6" aria-hidden="true" />,
    title: "Flexibilité totale",
    desc: "Vous conservez la maîtrise de votre bien et pouvez bloquer des périodes pour votre usage personnel, contrairement au bail résidentiel.",
  },
  {
    icon: <Shield className="w-6 h-6" aria-hidden="true" />,
    title: "Protection renforcée",
    desc: "Garantie dommages Airbnb jusqu'à 3 M€, vérification des voyageurs, caution pré-autorisée et état des lieux systématique à chaque rotation.",
  },
  {
    icon: <FileText className="w-6 h-6" aria-hidden="true" />,
    title: "Cadre légal maîtrisé",
    desc: "Déclaration en mairie, numéro d'enregistrement, taxe de séjour, classement meublé de tourisme — ERA gère l'intégralité des obligations réglementaires.",
  },
];

const etapesGestion = [
  {
    num: "01",
    title: "Audit & optimisation du bien",
    items: [
      "Estimation des revenus potentiels basée sur les données AirDNA locales",
      "Conseils d'aménagement pour atteindre le classement étoiles visé",
      "Shooting photo professionnel et rédaction d'annonces optimisées",
      "Mise en ligne sur Airbnb, Booking.com et Abritel/VRBO",
    ],
  },
  {
    num: "02",
    title: "Mise en conformité réglementaire",
    items: [
      "Déclaration du meublé de tourisme en mairie (obligatoire partout depuis 2024)",
      "Obtention du numéro d'enregistrement si la commune le requiert",
      "Classement officiel meublé de tourisme 1 à 5 étoiles (option)",
      "Vérification de l'assurance et des obligations fiscales",
    ],
  },
  {
    num: "03",
    title: "Gestion opérationnelle quotidienne",
    items: [
      "Tarification dynamique quotidienne par IA (PriceLabs / Beyond)",
      "Accueil et check-out des voyageurs, ménage et linge hôtelier",
      "Communication voyageurs 24h/24 avec délai de réponse < 1h",
      "Collecte et reversement automatique de la taxe de séjour",
    ],
  },
];

const oblisLegales = [
  {
    title: "Déclaration en mairie",
    desc: "Obligatoire pour toute mise en location d'une résidence principale ou secondaire en meublé de tourisme depuis la loi Le Meur (2024). Un formulaire Cerfa suffit dans la plupart des communes des Alpilles.",
    alerte: false,
  },
  {
    title: "Numéro d'enregistrement",
    desc: "Requis dans les communes ayant instauré un régime d'enregistrement (ex. Arles). Ce numéro doit figurer sur toutes vos annonces sous peine d'amende.",
    alerte: false,
  },
  {
    title: "Taxe de séjour",
    desc: "Elle est collectée par les plateformes (Airbnb, Booking) pour les communes qui ont délégué cette collecte. Pour les réservations directes, ERA s'en charge et la reverse à la collectivité.",
    alerte: false,
  },
  {
    title: "Limitation à 120 nuits/an (résidence principale)",
    desc: "Si votre bien est votre résidence principale, la loi ALUR limite la location à 120 nuits par an. En résidence secondaire, aucun plafond ne s'applique dans les Alpilles.",
    alerte: true,
  },
  {
    title: "Régime fiscal LMNP",
    desc: "La location meublée non professionnelle (LMNP) vous permet de déduire vos charges réelles ou de bénéficier d'un abattement forfaitaire de 50% (micro-BIC). ERA vous fournit les relevés nécessaires à votre déclaration.",
    alerte: false,
  },
];

const faqItems = [
  {
    question: "Quelle est la différence entre gestion locative courte durée et longue durée ?",
    answer:
      "La gestion locative courte durée cible des séjours de 1 à 30 nuits sur des plateformes comme Airbnb ou Booking.com. Elle génère des revenus nettement supérieurs en zone touristique, mais implique une gestion plus intensive (rotations fréquentes, communication voyageurs, ménages). ERA prend en charge l'intégralité de cette gestion à votre place.",
  },
  {
    question: "Combien puis-je espérer gagner en gestion locative courte durée en Provence ?",
    answer:
      "Les revenus varient selon la commune, le type de bien et le standing. Sur notre portefeuille, un mas avec piscine à Saint-Rémy-de-Provence génère entre 30 000 € et 55 000 € par an. Un appartement à Arles rapporte entre 12 000 € et 22 000 €. Notre simulateur vous donne une estimation personnalisée en 30 secondes.",
  },
  {
    question: "Dois-je déclarer mon bien en mairie avant de le mettre en location courte durée ?",
    answer:
      "Oui, depuis la loi Le Meur (novembre 2024), la déclaration en mairie est obligatoire dans toutes les communes de France pour tout meublé de tourisme. ERA prend en charge cette démarche dans le cadre de votre onboarding.",
  },
  {
    question: "Puis-je passer à la gestion locative courte durée depuis un bail longue durée ?",
    answer:
      "Oui, sous réserve de respecter le préavis applicable et les éventuelles clauses de votre bail. Nous vous conseillons sur le calendrier optimal pour maximiser votre première saison.",
  },
  {
    question: "Combien coûte la gestion locative courte durée avec ERA ?",
    answer:
      "Notre commission varie de 18% à 28% HT des revenus locatifs nets, selon la formule choisie (Essentiel, Premium ou Prestige). Pas de frais fixes, pas d'engagement de durée : vous ne payez que sur vos revenus réels.",
  },
];

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Gestion locative courte durée en Provence",
      description:
        "Service complet de gestion locative courte durée pour propriétaires en Provence — Alpilles. Déclarations légales, tarification dynamique IA, accueil voyageurs, ménage, optimisation des revenus.",
      serviceType: "Gestion locative courte durée / Conciergerie Airbnb",
      url: "https://entre-rhone-alpilles.fr/conciergerie/gestion-locative-courte-duree",
      provider: {
        "@type": "LocalBusiness",
        "@id": "https://entre-rhone-alpilles.fr/#business",
        name: "Entre Rhône et Alpilles",
        url: "https://entre-rhone-alpilles.fr",
        telephone: "+33752907868",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Saint-Rémy-de-Provence",
          postalCode: "13210",
          addressCountry: "FR",
        },
      },
      areaServed: [
        { "@type": "Place", name: "Alpilles, Provence-Alpes-Côte d'Azur" },
        { "@type": "Place", name: "Arles, Bouches-du-Rhône" },
        { "@type": "Place", name: "Saint-Rémy-de-Provence, Bouches-du-Rhône" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Formules de gestion locative courte durée",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Essentiel",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "18",
              priceCurrency: "EUR",
              unitText: "% HT des revenus nets",
            },
          },
          {
            "@type": "Offer",
            name: "Premium",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "22",
              priceCurrency: "EUR",
              unitText: "% HT des revenus nets",
            },
          },
          {
            "@type": "Offer",
            name: "Prestige",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "28",
              priceCurrency: "EUR",
              unitText: "% HT des revenus nets",
            },
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function GestionLocativeCourteduree() {
  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* Hero */}
      <div className="bg-[var(--color-cream)] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Conciergerie", href: "/conciergerie" },
              { label: "Gestion locative courte durée" },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] mb-4 text-[var(--color-rhone)]">
              Propriétaires · Provence &amp; Alpilles
            </p>
            <h1 className="font-serif font-light text-4xl sm:text-5xl text-[var(--color-encre)] mb-5">
              Gestion locative<br />
              <span className="text-[var(--color-rhone)]">courte durée en Provence</span>
            </h1>
            <p className="text-lg leading-relaxed text-[var(--texte-leger)]">
              Vous souhaitez louer votre mas, villa ou appartement sur Airbnb ou Booking.com, sans en subir les contraintes ? ERA prend en charge l&apos;intégralité de la gestion — de la mise en conformité légale à l&apos;accueil des voyageurs — pour que vous perceviez vos revenus l&apos;esprit tranquille.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/conciergerie/estimer-mes-revenus"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-rhone)] text-white font-semibold rounded-full hover:bg-[var(--color-rhone-light)] transition-colors"
              >
                Estimer mes revenus <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/conciergerie/nos-services"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-rhone)] text-[var(--color-rhone)] font-semibold rounded-full hover:bg-[var(--color-rhone)]/5 transition-colors"
              >
                Voir nos services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Pourquoi la courte durée */}
      <section className="py-20 bg-white" aria-labelledby="avantages-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2
              id="avantages-heading"
              className="font-serif font-normal text-3xl sm:text-4xl text-[var(--color-encre)] mb-4"
            >
              Pourquoi choisir la location courte durée en Provence ?
            </h2>
            <p className="text-[var(--texte-leger)] leading-relaxed">
              Le marché provençal — Alpilles, Arles, Saint-Rémy — affiche parmi les taux d&apos;occupation les plus élevés de France hors grandes métropoles. Avec une saison haute qui s&apos;étale d&apos;avril à octobre et des pics à 95% en juillet-août, la gestion locative courte durée est ici particulièrement rentable.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {avantages.map((a) => (
              <div
                key={a.title}
                className="flex gap-5 p-6 bg-[var(--color-cream)] rounded-xl border border-[var(--color-gres-clair)]"
              >
                <span className="flex-shrink-0 text-[var(--color-rhone)] mt-0.5">{a.icon}</span>
                <div>
                  <h3 className="font-serif font-normal text-lg text-[var(--color-encre)] mb-2">{a.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--texte-leger)]">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre processus */}
      <section className="py-20 bg-[var(--color-lin)]" aria-labelledby="processus-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="processus-heading"
            className="font-serif font-normal text-3xl sm:text-4xl text-[var(--color-encre)] mb-12 text-center"
          >
            Notre processus de gestion locative
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {etapesGestion.map((e) => (
              <div key={e.num} className="bg-white rounded-xl p-7 border border-[var(--color-gres-clair)]">
                <div className="w-12 h-12 rounded-full bg-[var(--color-rhone)] text-white flex items-center justify-center font-serif text-xl font-bold mb-5">
                  {e.num}
                </div>
                <h3 className="font-serif font-normal text-xl text-[var(--color-encre)] mb-4">{e.title}</h3>
                <ul className="space-y-2.5">
                  {e.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--texte-leger)]">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-[var(--color-rhone)]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/conciergerie/comment-ca-marche"
              className="inline-flex items-center gap-1.5 text-[var(--color-rhone)] font-semibold hover:text-[var(--color-rhone-light)] transition-colors"
            >
              Voir le processus complet <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Cadre légal */}
      <section className="py-20 bg-white" aria-labelledby="legal-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2
              id="legal-heading"
              className="font-serif font-normal text-3xl sm:text-4xl text-[var(--color-encre)] mb-4"
            >
              Cadre légal de la location courte durée
            </h2>
            <p className="text-[var(--texte-leger)] leading-relaxed">
              La réglementation de la location saisonnière a fortement évolué depuis 2022. ERA prend en charge l&apos;ensemble des obligations légales dès l&apos;onboarding, pour que vous n&apos;ayez aucune démarche administrative à effectuer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {oblisLegales.map((o) => (
              <div
                key={o.title}
                className={`p-6 rounded-xl border ${
                  o.alerte
                    ? "bg-amber-50 border-amber-200"
                    : "bg-[var(--color-cream)] border-[var(--color-gres-clair)]"
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  {o.alerte ? (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" aria-hidden="true" />
                  ) : (
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--color-rhone)]" aria-hidden="true" />
                  )}
                  <h3 className="font-serif font-normal text-lg text-[var(--color-encre)]">{o.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-[var(--texte-leger)] pl-8">{o.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-center text-[var(--texte-discret)]">
            Réglementation applicable en Provence-Alpes-Côte d&apos;Azur au 1er janvier 2025. ERA assure une veille réglementaire continue.
          </p>
        </div>
      </section>

      {/* Zones couvertes */}
      <section className="py-16 bg-[var(--color-cream)]" aria-labelledby="zones-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="zones-heading"
            className="font-serif font-normal text-2xl text-[var(--color-encre)] mb-6 text-center"
          >
            Gestion locative courte durée — nos communes
          </h2>
          <p className="text-center text-[var(--texte-leger)] mb-8 max-w-xl mx-auto text-sm">
            ERA intervient sur 20 communes entre le Rhône et les Alpilles. Chaque commune dispose d&apos;une équipe locale qui connaît le marché, les artisans et les spécificités réglementaires.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "Saint-Rémy-de-Provence", slug: "saint-remy-de-provence" },
              { name: "Les Baux-de-Provence", slug: "les-baux-de-provence" },
              { name: "Maussane-les-Alpilles", slug: "maussane-les-alpilles" },
              { name: "Fontvieille", slug: "fontvieille" },
              { name: "Paradou", slug: "paradou" },
              { name: "Eygalières", slug: "eygalieres" },
              { name: "Arles", slug: "arles" },
              { name: "Tarascon", slug: "tarascon" },
              { name: "Villeneuve-lès-Avignon", slug: "villeneuve-les-avignon" },
              { name: "Graveson", slug: "graveson" },
              { name: "Mouriès", slug: "mouries" },
              { name: "Aureille", slug: "aureille" },
              { name: "Orgon", slug: "orgon" },
              { name: "Châteaurenard", slug: "chateaurenard" },
              { name: "Barbentane", slug: "barbentane" },
            ].map((c) => (
              <Link
                key={c.slug}
                href={`/conciergerie/${c.slug}`}
                className="px-4 py-2 text-sm bg-white border border-[var(--color-gres-clair)] rounded-full text-[var(--color-encre)] hover:border-[var(--color-rhone)] hover:text-[var(--color-rhone)] transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="faq-heading"
            className="font-serif font-normal text-3xl text-[var(--color-encre)] mb-10 text-center"
          >
            Questions fréquentes — gestion locative courte durée
          </h2>
          <dl className="space-y-6">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="border-b border-[var(--color-gres-clair)] pb-6"
              >
                <dt className="font-serif font-normal text-lg text-[var(--color-encre)] mb-3">
                  {item.question}
                </dt>
                <dd className="text-[var(--texte-leger)] leading-relaxed text-sm">{item.answer}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--color-rhone)] font-semibold hover:text-[var(--color-rhone-light)] transition-colors"
            >
              Toutes les questions <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-[#2A2520]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="w-10 h-px mx-auto mb-8"
            style={{ background: "var(--color-gres-moyen)", opacity: 0.5 }}
            aria-hidden="true"
          />
          <h2 className="font-serif font-light text-2xl sm:text-3xl text-white mb-4">
            Prêt à déléguer la gestion locative de votre bien ?
          </h2>
          <p className="mb-8 font-light" style={{ color: "rgba(255,255,255,0.55)" }}>
            Estimation gratuite · Réponse sous 24h · Aucun engagement initial
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/conciergerie/estimer-mes-revenus"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[var(--color-rhone)] text-white rounded-md hover:bg-[var(--color-rhone-dark)] transition-colors"
            >
              Estimer mes revenus <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/30 text-white rounded-md hover:bg-white/5 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
