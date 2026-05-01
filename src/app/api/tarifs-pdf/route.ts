import { NextResponse } from "next/server";

// Couleurs ERA (reprises depuis globals.css)
const C = {
  sage: "#8C9E6E",
  sageLight: "#9DB07C",
  cream: "#F5F0E8",
  encre: "#1A1A1A",
  gray: "#6B7280",
  grayLight: "#9CA3AF",
  border: "#E5E7EB",
  bg: "#F9FAFB",
};

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', 'Helvetica Neue', Arial, sans-serif;
    color: ${C.encre};
    background: #f0ede8;
    font-size: 9.5pt;
    line-height: 1.4;
  }

  @page { size: A4 portrait; margin: 0; }

  @media print {
    body { background: white; }
    .no-print { display: none !important; }
    .page { margin: 0 !important; box-shadow: none !important; }
    a { page-break-inside: avoid; }
  }

  @media screen {
    .page {
      width: 210mm;
      margin: 24px auto;
      box-shadow: 0 8px 32px rgba(0,0,0,.14);
    }
  }

  .page {
    background: white;
    padding: 14mm 16mm 12mm;
    min-height: 297mm;
    display: flex;
    flex-direction: column;
  }

  /* ── En-tête ── */
  .era-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2px solid ${C.encre};
    padding-bottom: 9px;
    margin-bottom: 16px;
  }
  .era-logo {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 19pt;
    font-weight: 700;
    color: ${C.encre};
    letter-spacing: -0.01em;
  }
  .era-tagline { font-size: 7.5pt; color: ${C.gray}; margin-top: 2px; }
  .era-contact { text-align: right; font-size: 7.5pt; color: ${C.grayLight}; line-height: 1.7; }

  /* ── Titre du document ── */
  .doc-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 17pt;
    font-weight: 600;
    color: ${C.encre};
    margin-bottom: 3px;
  }
  .doc-sub { font-size: 8.5pt; color: ${C.gray}; margin-bottom: 12px; }

  /* ── Encart facturation ── */
  .billing-note {
    display: flex;
    gap: 9px;
    align-items: flex-start;
    background: ${C.cream};
    border-left: 3px solid ${C.sage};
    padding: 7px 10px;
    border-radius: 0 5px 5px 0;
    font-size: 8pt;
    color: #444;
    margin-bottom: 18px;
  }
  .billing-note strong { color: ${C.encre}; }

  /* ── Grille des formules ── */
  .formulas-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 9px;
    margin-bottom: 18px;
  }

  .formula-card {
    border: 1.5px solid ${C.border};
    border-radius: 8px;
    padding: 11px 10px;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .formula-card.highlighted {
    border-color: ${C.sage};
    border-width: 2px;
  }

  .formula-badge {
    background: ${C.sage};
    color: white;
    font-size: 6.5pt;
    font-weight: 700;
    padding: 2px 9px;
    border-radius: 50px;
    text-align: center;
    letter-spacing: .04em;
    margin-bottom: 7px;
    align-self: flex-start;
  }

  .formula-name {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 14pt;
    font-weight: 700;
    color: ${C.encre};
    margin-bottom: 1px;
  }
  .formula-pitch { font-size: 7pt; color: ${C.grayLight}; margin-bottom: 7px; }

  .formula-rate-wrap { display: flex; align-items: baseline; gap: 4px; margin-bottom: 2px; }
  .formula-rate {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 30pt;
    font-weight: 700;
    color: ${C.sage};
    line-height: 1;
  }
  .formula-rate-unit { font-size: 7.5pt; color: ${C.grayLight}; }
  .formula-example { font-size: 6.5pt; color: #bbb; margin-bottom: 9px; }

  .formula-meta {
    background: ${C.cream};
    border-radius: 5px;
    padding: 7px 8px;
    margin-bottom: 9px;
    font-size: 7.5pt;
  }
  .formula-meta-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5px;
  }
  .formula-meta-row:last-child { margin-bottom: 0; }
  .fmk { color: ${C.grayLight}; }
  .fmv { font-weight: 500; color: #333; }

  .services-title {
    font-size: 6.5pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .06em;
    color: ${C.grayLight};
    margin-bottom: 5px;
  }
  .services-list { list-style: none; font-size: 7.5pt; color: #444; flex: 1; }
  .services-list li {
    padding: 1.5px 0 1.5px 12px;
    position: relative;
  }
  .services-list li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${C.sage};
    font-weight: 700;
    font-size: 8pt;
  }

  .formula-target {
    font-size: 6.5pt;
    color: ${C.grayLight};
    font-style: italic;
    border-top: 1px solid ${C.border};
    padding-top: 7px;
    margin-top: 8px;
  }

  /* ── Options ── */
  .section-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 13pt;
    font-weight: 600;
    color: ${C.encre};
    margin-bottom: 8px;
  }

  table.options {
    width: 100%;
    border-collapse: collapse;
    font-size: 8pt;
    margin-bottom: 4px;
  }
  table.options thead tr { background: ${C.cream}; }
  table.options th {
    padding: 6px 10px;
    text-align: left;
    font-size: 6.5pt;
    text-transform: uppercase;
    letter-spacing: .06em;
    color: ${C.grayLight};
    font-weight: 600;
  }
  table.options th:nth-child(2),
  table.options th:nth-child(3) { text-align: right; }
  table.options td {
    padding: 6px 10px;
    border-bottom: 1px solid #f3f4f6;
    color: #444;
  }
  table.options td:nth-child(2),
  table.options td:nth-child(3) { text-align: right; white-space: nowrap; }
  table.options tr:nth-child(even) td { background: ${C.bg}; }
  .opt-price { font-weight: 600; color: ${C.encre}; }
  .opt-note { font-size: 6.5pt; color: #bbb; font-weight: 400; margin-left: 3px; }
  .opt-for { font-size: 7.5pt; color: ${C.gray}; }

  /* ── Footer ── */
  .doc-footer {
    margin-top: auto;
    padding-top: 10px;
    border-top: 1px solid ${C.border};
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 6.5pt;
    color: ${C.grayLight};
  }
  .doc-footer strong { color: ${C.gray}; font-weight: 500; }

  /* ── Bouton impression (écran seulement) ── */
  .print-btn {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: ${C.sage};
    color: white;
    border: none;
    padding: 13px 26px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(0,0,0,.18);
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background .15s;
  }
  .print-btn:hover { background: ${C.sageLight}; }
`;

function row(label: string, price: string, note: string, forLabel: string) {
  return `<tr>
    <td>${label}</td>
    <td><span class="opt-price">${price}</span><span class="opt-note">${note}</span></td>
    <td class="opt-for">${forLabel}</td>
  </tr>`;
}

function formulaCard(opts: {
  badge?: string;
  name: string;
  pitch: string;
  rate: string;
  example: string;
  engagement: string;
  notice: string;
  onboarding: string;
  billing: string;
  services: string[];
  target: string;
  highlighted?: boolean;
}) {
  return `
  <div class="formula-card${opts.highlighted ? " highlighted" : ""}">
    ${opts.badge ? `<div class="formula-badge">${opts.badge}</div>` : ""}
    <div class="formula-name">${opts.name}</div>
    <div class="formula-pitch">${opts.pitch}</div>
    <div class="formula-rate-wrap">
      <span class="formula-rate">${opts.rate}</span>
      <span class="formula-rate-unit">HT des revenus nets</span>
    </div>
    <div class="formula-example">${opts.example}</div>
    <div class="formula-meta">
      <div class="formula-meta-row"><span class="fmk">Engagement</span><span class="fmv">${opts.engagement}</span></div>
      <div class="formula-meta-row"><span class="fmk">Préavis</span><span class="fmv">${opts.notice}</span></div>
      <div class="formula-meta-row"><span class="fmk">Onboarding</span><span class="fmv">${opts.onboarding}</span></div>
      <div class="formula-meta-row"><span class="fmk">Facturation</span><span class="fmv">${opts.billing}</span></div>
    </div>
    <div class="services-title">Inclus</div>
    <ul class="services-list">
      ${opts.services.map((s) => `<li>${s}</li>`).join("")}
    </ul>
    <div class="formula-target">${opts.target}</div>
  </div>`;
}

function buildHtml() {
  const essentiel = formulaCard({
    name: "Essentiel",
    pitch: "Gestion locative essentielle",
    rate: "18%",
    example: "Ex. 15 000 €/an → 2 700 € HT facturés",
    engagement: "6 mois min.",
    notice: "2 mois",
    onboarding: "150 € HT",
    billing: "Mensuelle J+10",
    services: [
      "Création & optimisation des annonces",
      "Gestion multi-plateformes + channel manager",
      "Optimisation tarifaire manuelle",
      "Check-in autonome (boîte à clés / code)",
      "Check-out + état des lieux",
      "Coordination prestataire ménage",
      "Gestion messages & réservations 7j/7",
      "Livret d'accueil numérique personnalisé",
      "Réponses aux avis voyageurs",
      "Signalement incidents & petites réparations",
      "Relevé mensuel des revenus",
      "Tableau de bord en ligne",
    ],
    target: "Studio, T2, maison de village — ≤ 4 couchages — Propriétaire impliqué",
  });

  const premium = formulaCard({
    badge: "70 % de nos propriétaires",
    name: "Premium",
    pitch: "Full service sans contrainte",
    rate: "22%",
    example: "Ex. 30 000 €/an → 6 600 € HT facturés",
    engagement: "12 mois recommandé",
    notice: "2 mois",
    onboarding: "Offert",
    billing: "Mensuelle J+5",
    highlighted: true,
    services: [
      "Tout Essentiel +",
      "Photos professionnelles incluses",
      "Pricing dynamique IA (PriceLabs / Beyond)",
      "Check-in en présentiel",
      "Ménage inclus dans la commission",
      "Gestion linge (draps, serviettes, housses)",
      "Blanchisserie professionnelle partenaire",
      "Contrôle qualité entre chaque séjour",
      "Assistance voyageurs 24h/24",
      "Coordination artisans & prestataires",
      "Visites de contrôle entre saisons",
      "Gestion piscine & espaces extérieurs",
      "Rapport de performance trimestriel",
    ],
    target: "Mas, villa, gîte — 4–8 couchages — Délégation totale",
  });

  const prestige = formulaCard({
    name: "Prestige",
    pitch: "Expérience haut de gamme",
    rate: "28%",
    example: "Ex. 60 000 €/an → 16 800 € HT facturés",
    engagement: "12 mois min.",
    notice: "3 mois",
    onboarding: "Offert",
    billing: "Mensuelle J+5",
    services: [
      "Tout Premium +",
      "Gestionnaire dédié (interlocuteur unique)",
      "Traduction annonces EN + NL",
      "Remise clés avec visite guidée du bien",
      "Panier de bienvenue (produits locaux Provence)",
      "Livret d'accueil physique imprimé",
      "Réservations restaurants & événements",
      "Service transfert aéroport / gare (partenaire)",
      "Location vélos & équipements sports",
      "Panier épicerie à l'arrivée (sur commande)",
      "Gardiennage hors saison (visites mensuelles)",
      "Analyse concurrentielle annuelle du bien",
    ],
    target: "Villa luxe, bastide, domaine — 8+ couchages — Clientèle internationale",
  });

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tarifs conciergerie — Entre Rhône et Alpilles</title>
  <meta name="robots" content="noindex">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <style>${CSS}</style>
</head>
<body>
  <button class="print-btn no-print" onclick="window.print()">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
    Imprimer / Enregistrer en PDF
  </button>

  <div class="page">

    <!-- En-tête ERA -->
    <div class="era-header">
      <div>
        <div class="era-logo">Entre Rhône et Alpilles</div>
        <div class="era-tagline">Conciergerie de locations saisonnières en Provence</div>
      </div>
      <div class="era-contact">
        entre-rhone-alpilles.fr<br>
        contact@entre-rhone-alpilles.fr
      </div>
    </div>

    <!-- Titre -->
    <h1 class="doc-title">Nos formules de conciergerie</h1>
    <p class="doc-sub">3 formules calibrées sur le marché provençal — Tarifs HT, TVA 20 % applicable</p>

    <!-- Note facturation -->
    <div class="billing-note">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${C.sage}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:1px"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <span><strong>Modèle de facturation :</strong> vous percevez vos revenus locatifs directement depuis Airbnb, Booking.com, etc. ERA vous adresse une facture mensuelle calculée sur vos revenus nets, après déduction des frais de plateforme.</span>
    </div>

    <!-- 3 formules -->
    <div class="formulas-grid">
      ${essentiel}
      ${premium}
      ${prestige}
    </div>

    <!-- Options à la carte -->
    <h2 class="section-title">Options à la carte</h2>
    <table class="options">
      <thead>
        <tr>
          <th>Option</th>
          <th>Tarif</th>
          <th>Disponible pour</th>
        </tr>
      </thead>
      <tbody>
        ${row("Session photo professionnelle", "250 € HT", "one-shot", "Formule Essentiel")}
        ${row("Mise en place initiale (onboarding complet)", "150 € HT", "one-shot", "Toutes formules")}
        ${row("Linge de maison (gestion & blanchisserie)", "Sur devis", "selon volume", "Formule Essentiel")}
        ${row("Classement meublé de tourisme (dossier)", "200 € HT", "one-shot", "Toutes formules")}
        ${row("Check-in tardif (après 22h)", "30 € HT", "par intervention", "Formule Essentiel")}
        ${row("Déclaration mairie (enregistrement LCD)", "100 € HT", "one-shot", "Toutes formules")}
        ${row("Visite de contrôle hors saison (mensuelle)", "80 € HT", "par visite", "Essentiel & Premium")}
        ${row("Traduction annonces EN + NL", "120 € HT", "one-shot", "Essentiel & Premium")}
        ${row("Shooting vidéo du bien (Reels / YouTube)", "350 € HT", "one-shot", "Toutes formules")}
      </tbody>
    </table>

    <!-- Pied de page -->
    <div class="doc-footer">
      <strong>Entre Rhône et Alpilles</strong> &nbsp;·&nbsp; entre-rhone-alpilles.fr
      <span>Tarifs HT — TVA 20 % applicable &nbsp;·&nbsp; Document non contractuel, susceptible d'évoluer</span>
    </div>

  </div>
</body>
</html>`;
}

export function GET() {
  return new NextResponse(buildHtml(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
