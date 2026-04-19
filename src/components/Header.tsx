"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  {
    href: "/conciergerie",
    label: "Propriétaires",
    children: [
      { href: "/conciergerie/nos-services", label: "Nos services" },
      { href: "/conciergerie/comment-ca-marche", label: "Comment ça marche" },
      { href: "/conciergerie/tarifs", label: "Tarifs" },
      {
        href: "/conciergerie/estimer-mes-revenus",
        label: "Estimer mes revenus",
      },
    ],
  },
  {
    href: "/locations",
    label: "Voyageurs",
    children: [
      { href: "/locations", label: "Tous les hébergements" },
      { href: "/locations/avec-piscine", label: "Avec piscine" },
      { href: "/locations/mas", label: "Mas provençaux" },
      { href: "/locations/villa", label: "Villas" },
    ],
  },
  {
    href: "/destinations",
    label: "Destinations",
    children: [
      { href: "/destinations/saint-remy-de-provence", label: "Saint-Rémy" },
      { href: "/destinations/arles", label: "Arles" },
      { href: "/destinations/les-baux-de-provence", label: "Les Baux" },
      { href: "/destinations/eygalieres", label: "Eygalières" },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/avis", label: "Avis" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-white shadow-md"
          : "bg-white/95 backdrop-blur-sm"
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Navigation principale"
      >
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0"
            aria-label="Entre Rhône et Alpilles — Accueil"
          >
            <span className="text-[var(--color-rhone)] font-serif text-xl lg:text-2xl font-bold leading-tight">
              Entre Rhône
              <br className="hidden sm:block" />
              <span className="text-[var(--color-alpilles)]"> et Alpilles</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[var(--color-rhone)] transition-colors rounded-md hover:bg-gray-50 flex items-center gap-1"
                    aria-expanded={activeDropdown === link.href}
                  >
                    {link.label}
                    <svg
                      className="w-3.5 h-3.5 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Link>
                  {activeDropdown === link.href && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[var(--color-cream)] hover:text-[var(--color-rhone)] transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[var(--color-rhone)] transition-colors rounded-md hover:bg-gray-50"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+33600000000"
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[var(--color-rhone)] transition-colors"
              aria-label="Nous appeler"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>06 00 00 00 00</span>
            </a>
            <Link
              href="/conciergerie/estimer-mes-revenus"
              className="px-4 py-2 bg-[var(--color-rhone)] text-white text-sm font-medium rounded-lg hover:bg-[var(--color-rhone-light)] transition-colors"
            >
              Confier mon bien
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-[var(--color-rhone)] hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-gray-100 py-4"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-4 py-2.5 text-sm font-semibold text-gray-800 hover:text-[var(--color-rhone)] hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 mt-1 mb-2 flex flex-col gap-0.5">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-[var(--color-rhone)] hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3 px-4">
                <a
                  href="tel:+33600000000"
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <Phone className="w-4 h-4" />
                  06 00 00 00 00
                </a>
                <Link
                  href="/conciergerie/estimer-mes-revenus"
                  className="w-full text-center px-4 py-3 bg-[var(--color-rhone)] text-white text-sm font-medium rounded-lg hover:bg-[var(--color-rhone-light)] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Confier mon bien
                </Link>
                <Link
                  href="/contact"
                  className="w-full text-center px-4 py-3 border border-[var(--color-rhone)] text-[var(--color-rhone)] text-sm font-medium rounded-lg hover:bg-[var(--color-cream)] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Trouver un hébergement
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
