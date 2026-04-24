import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const footerLinks = {
  proprietaires: [
    { href: "/conciergerie/nos-services", label: "Nos services" },
    { href: "/conciergerie/comment-ca-marche", label: "Comment ça marche" },
    { href: "/conciergerie/tarifs", label: "Tarifs" },
    { href: "/conciergerie/estimer-mes-revenus", label: "Estimer mes revenus" },
  ],
  voyageurs: [
    { href: "/locations", label: "Tous les hébergements" },
    { href: "/locations/avec-piscine", label: "Avec piscine" },
    { href: "/locations/mas", label: "Mas provençaux" },
    { href: "/locations/villa", label: "Villas" },
  ],
  destinations: [
    { href: "/destinations/saint-remy-de-provence", label: "Saint-Rémy-de-Provence" },
    { href: "/destinations/arles", label: "Arles" },
    { href: "/destinations/les-baux-de-provence", label: "Les Baux-de-Provence" },
    { href: "/destinations/eygalieres", label: "Eygalières" },
    { href: "/destinations/maussane-les-alpilles", label: "Maussane-les-Alpilles" },
  ],
  legal: [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/politique-confidentialite", label: "Politique de confidentialité" },
    { href: "/cgv", label: "CGV" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="bg-[var(--color-rhone-dark)] text-white"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4" title="Accueil — Entre Rhône et Alpilles">
              <span className="font-serif text-2xl font-bold text-white leading-tight">
                Entre Rhône
                <br />
                <span className="text-[var(--color-or)]">et Alpilles</span>
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-xs">
              Conciergerie de locations saisonnières haut de gamme en Provence.
              Entre le Rhône et les Alpilles, nous gérons votre bien avec passion
              et expertise.
            </p>
            <div className="flex flex-col gap-3 text-sm text-gray-300">
              <a
                href="https://maps.google.com/?q=Saint-Rémy-de-Provence"
                className="flex items-center gap-2 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                title="Voir sur Google Maps — Saint-Rémy-de-Provence"
              >
                <MapPin className="w-4 h-4 flex-shrink-0 text-[var(--color-or)]" aria-hidden="true" />
                Saint-Rémy-de-Provence, 13210
              </a>
              <a
                href="tel:+33752907868"
                className="flex items-center gap-2 hover:text-white transition-colors"
                title="Appeler le 07 52 90 78 68"
              >
                <Phone className="w-4 h-4 flex-shrink-0 text-[var(--color-or)]" aria-hidden="true" />
                07 52 90 78 68
              </a>
              <a
                href="mailto:contact@entre-rhone-alpilles.fr"
                className="flex items-center gap-2 hover:text-white transition-colors"
                title="Envoyer un email à contact@entre-rhone-alpilles.fr"
              >
                <Mail className="w-4 h-4 flex-shrink-0 text-[var(--color-or)]" aria-hidden="true" />
                contact@entre-rhone-alpilles.fr
              </a>
            </div>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.instagram.com/entrerhoneetalpilles"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Suivre sur Instagram"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Suivre sur Facebook"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          {/* Propriétaires */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Propriétaires
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.proprietaires.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                    title={link.label}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Voyageurs */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Voyageurs
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.voyageurs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                    title={link.label}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold text-white mt-8 mb-4 text-sm uppercase tracking-wider">
              Destinations
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.destinations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                    title={link.label}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Infos */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              À propos
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/a-propos" className="text-sm text-gray-300 hover:text-white transition-colors" title="Notre histoire">
                  Notre histoire
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-300 hover:text-white transition-colors" title="Blog & conseils">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-300 hover:text-white transition-colors" title="Questions fréquentes">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/avis" className="text-sm text-gray-300 hover:text-white transition-colors" title="Avis clients">
                  Avis clients
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors" title="Nous contacter">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/kit-media" className="text-sm text-gray-300 hover:text-white transition-colors" title="Kit Média">
                  Kit Média
                </Link>
              </li>
            </ul>
            <h3 className="font-semibold text-white mt-8 mb-4 text-sm uppercase tracking-wider">
              Légal
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                    title={link.label}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Entre Rhône et Alpilles. Tous droits réservés.
          </p>
          <p className="text-xs text-gray-400">
            Conciergerie de locations saisonnières — Provence, Alpilles, Rhône
          </p>
        </div>
      </div>
    </footer>
  );
}
