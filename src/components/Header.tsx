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
      { href: "/conciergerie/estimer-mes-revenus", label: "Estimer mes revenus" },
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
  { href: "/a-propos", label: "À propos" },
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
      className="fixed top-0 left-0 right-0 z-50 bg-white transition-[border-color,box-shadow] duration-300"
      style={{
        borderBottom: "1px solid",
        borderColor: scrolled || isOpen ? "var(--color-gres-clair)" : "transparent",
        boxShadow: scrolled || isOpen ? "var(--ombre-sm)" : "none",
      }}
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
            title="Accueil — Entre Rhône et Alpilles"
          >
            <span
              className="font-serif text-xl lg:text-2xl leading-tight text-[var(--color-rhone-dark)]"
              style={{ fontWeight: 500 }}
            >
              Entre Rhône
              <br className="hidden sm:block" />
              <span style={{ color: "var(--texte-discret)", fontWeight: 300 }}> et Alpilles</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
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
                    className="px-3 py-2 text-xs tracking-widest uppercase transition-colors flex items-center gap-1"
                    style={{ color: "var(--texte-discret)", letterSpacing: "0.1em" }}
                    aria-expanded={activeDropdown === link.href}
                    title={link.label}
                  >
                    {link.label}
                    <svg className="w-3 h-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  {activeDropdown === link.href && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-md border border-[var(--color-gres-clair)] py-1 z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm transition-colors hover:bg-[var(--color-cream)]"
                          style={{ color: "var(--texte-leger)" }}
                          title={child.label}
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
                  className="px-3 py-2 text-xs transition-colors uppercase tracking-widest"
                  style={{ color: "var(--texte-discret)", letterSpacing: "0.1em" }}
                  title={link.label}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+33752907868"
              className="flex items-center gap-1.5 text-xs transition-colors"
              style={{ color: "var(--texte-discret)" }}
              aria-label="Nous appeler"
              title="Appeler le 07 52 90 78 68"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              <span>07 52 90 78 68</span>
            </a>
            <Link
              href="/conciergerie/estimer-mes-revenus"
              className="px-5 py-2.5 bg-[var(--color-rhone)] text-white text-xs rounded-md hover:bg-[var(--color-rhone-dark)] transition-colors"
              style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
              title="Confier mon bien en gestion locative"
            >
              Confier mon bien
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 transition-colors"
            style={{ color: "var(--texte-discret)" }}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-[var(--color-gres-clair)] overflow-y-auto"
            style={{ maxHeight: "calc(100dvh - 4rem)" }}
          >
            <div className="py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-4 py-2.5 text-xs font-medium rounded-lg transition-colors uppercase"
                    style={{ color: "var(--texte-corps)", letterSpacing: "0.1em" }}
                    onClick={() => setIsOpen(false)}
                    title={link.label}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 mt-1 mb-2 flex flex-col gap-0.5">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm rounded-lg transition-colors"
                          style={{ color: "var(--texte-leger)" }}
                          onClick={() => setIsOpen(false)}
                          title={child.label}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div
                className="mt-4 pt-4 border-t flex flex-col gap-3 px-4"
                style={{ borderColor: "var(--color-gres-clair)" }}
              >
                <a
                  href="tel:+33752907868"
                  className="flex items-center gap-2 text-xs"
                  style={{ color: "var(--texte-discret)" }}
                  title="Appeler le 07 52 90 78 68"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  07 52 90 78 68
                </a>
                <Link
                  href="/conciergerie/estimer-mes-revenus"
                  className="w-full text-center px-4 py-3 bg-[var(--color-rhone)] text-white text-xs rounded-md hover:bg-[var(--color-rhone-dark)] transition-colors"
                  style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
                  onClick={() => setIsOpen(false)}
                  title="Confier mon bien en gestion locative"
                >
                  Confier mon bien
                </Link>
                <Link
                  href="/contact"
                  className="w-full text-center px-4 py-3 border border-[var(--color-rhone)] text-[var(--color-rhone)] text-xs rounded-md hover:bg-[var(--color-cream)] transition-colors"
                  style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
                  onClick={() => setIsOpen(false)}
                  title="Trouver un hébergement en Provence"
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
