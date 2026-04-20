import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO = "contact@entre-rhone-alpilles.fr";
const FROM = "Entre Rhône et Alpilles <noreply@entre-rhone-alpilles.fr>";

function formatEur(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

function getFormulaReco(revenue: number): string {
  if (revenue >= 40000) return "Prestige (28% HT) — bien haut de gamme à fort potentiel";
  if (revenue >= 20000) return "Premium (22% HT) — délégation totale recommandée";
  return "Essentiel (18% HT) — démarrage optimal";
}

function standingLabel(s: string) {
  const map: Record<string, string> = { Standard: "Standard", Confort: "Confort", Premium: "Premium ✨", Luxe: "Luxe 🏆" };
  return map[s] ?? s;
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { email, commune, type, surface: bedrooms, estimatedRevenue } = body;

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Adresse email invalide" }, { status: 400 });
    }

    const rev: { min: number; max: number } | null =
      estimatedRevenue && typeof estimatedRevenue === "object" ? estimatedRevenue : null;
    const midRev = rev ? Math.round((rev.min + rev.max) / 2) : null;
    const recoFormula = midRev ? getFormulaReco(midRev) : "Premium (22% HT)";

    const netEssentiel = midRev ? Math.round(midRev * 0.82) : null;
    const netPremium   = midRev ? Math.round(midRev * 0.78) : null;
    const netPrestige  = midRev ? Math.round(midRev * 0.72) : null;

    await Promise.all([
      // ── Notif interne ──
      resend.emails.send({
        from: FROM,
        to: TO,
        replyTo: email,
        subject: `[Estimation] ${commune ?? "?"} · ${type ?? "?"} · ${rev ? `${formatEur(rev.min)}–${formatEur(rev.max)}` : "?"}`,
        html: `
          <div style="font-family:'Helvetica Neue',sans-serif;max-width:620px;margin:auto;background:#fff;border:1px solid #D9C9B0;border-radius:8px;overflow:hidden">
            <div style="background:#6E8052;padding:20px 28px">
              <p style="color:rgba(255,255,255,0.7);font-size:11px;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 4px">Nouvelle estimation</p>
              <h1 style="color:#fff;font-size:20px;margin:0;font-weight:400">${commune ?? "Commune non renseignée"} — ${type ?? "Type inconnu"}</h1>
            </div>

            ${rev ? `<div style="padding:16px 28px;background:#F5F0E8;border-bottom:1px solid #D9C9B0">
              <p style="margin:0;font-size:22px;font-weight:600;color:#6E8052">${formatEur(rev.min)} – ${formatEur(rev.max)} <span style="font-size:14px;font-weight:400;color:#9A8A78">/an estimé</span></p>
              <p style="margin:4px 0 0;font-size:12px;color:#9A8A78">Formule recommandée : ${recoFormula}</p>
            </div>` : ""}

            <div style="padding:28px">
              <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px">
                <tr><td style="padding:7px 0;color:#9A8A78;width:160px">Email</td><td><a href="mailto:${email}" style="color:#6E8052;font-weight:600">${email}</a></td></tr>
                ${commune ? `<tr><td style="padding:7px 0;color:#9A8A78">Commune</td><td style="color:#1A1A1A;font-weight:500">${commune}</td></tr>` : ""}
                ${type ? `<tr><td style="padding:7px 0;color:#9A8A78">Type de bien</td><td style="color:#1A1A1A">${type}</td></tr>` : ""}
                ${bedrooms ? `<tr><td style="padding:7px 0;color:#9A8A78">Chambres</td><td style="color:#1A1A1A">${bedrooms}</td></tr>` : ""}
                ${body.standing ? `<tr><td style="padding:7px 0;color:#9A8A78">Standing</td><td style="color:#1A1A1A">${standingLabel(body.standing)}</td></tr>` : ""}
                <tr><td style="padding:7px 0;color:#9A8A78">Reçu le</td><td style="color:#9A8A78;font-size:12px">${new Date().toLocaleString("fr-FR")}</td></tr>
              </table>

              ${rev && midRev ? `
              <div style="background:#F5F0E8;border-radius:8px;padding:20px;margin-bottom:20px">
                <p style="font-size:12px;color:#9A8A78;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px">Revenus nets estimés après commission</p>
                <table style="width:100%;font-size:13px">
                  <tr style="border-bottom:1px solid #D9C9B0">
                    <td style="padding:8px 0;color:#3A3228">Essentiel — 18% HT</td>
                    <td style="padding:8px 0;text-align:right;font-weight:600;color:#3A3228">${formatEur(netEssentiel!)}/an net</td>
                  </tr>
                  <tr style="border-bottom:1px solid #D9C9B0">
                    <td style="padding:8px 0;color:#3A3228">Premium — 22% HT</td>
                    <td style="padding:8px 0;text-align:right;font-weight:600;color:#3A3228">${formatEur(netPremium!)}/an net</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#3A3228">Prestige — 28% HT</td>
                    <td style="padding:8px 0;text-align:right;font-weight:600;color:#3A3228">${formatEur(netPrestige!)}/an net</td>
                  </tr>
                </table>
              </div>` : ""}

              <div style="text-align:center">
                <a href="mailto:${email}?subject=Votre estimation ERA — ${commune ?? "Provence"}" style="display:inline-block;background:#6E8052;color:#fff;padding:12px 28px;border-radius:6px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none">
                  Contacter ce prospect
                </a>
              </div>
            </div>

            <div style="padding:16px 28px;border-top:1px solid #D9C9B0;background:#fafafa;text-align:center">
              <p style="font-size:11px;color:#C2A882;margin:0">entre-rhone-alpilles.fr</p>
            </div>
          </div>
        `,
      }),

      // ── Confirmation prospect ──
      resend.emails.send({
        from: FROM,
        to: email,
        subject: `Votre potentiel locatif en Provence${rev ? ` — jusqu'à ${formatEur(rev.max)}/an` : ""}`,
        html: (() => {
          // Gestion solo ≈ 60 % du potentiel ERA (sans pricing IA, sans photos pro, sans multi-plateforme)
          const soloEstimate = midRev ? Math.round(midRev * 0.60) : null;
          // ERA Premium net (22 % de commission sur le potentiel optimisé)
          const eraPremiumNet = midRev ? Math.round(midRev * 0.78) : null;
          // Gain supplémentaire vs. solo
          const extraVsSolo = soloEstimate && eraPremiumNet ? eraPremiumNet - soloEstimate : null;
          // Commission annuelle ERA
          const eraCommission = midRev ? Math.round(midRev * 0.22) : null;

          return `
          <div style="font-family:'Helvetica Neue',sans-serif;max-width:580px;margin:auto;background:#fff;border:1px solid #D9C9B0;border-radius:8px;overflow:hidden">

            <!-- En-tête -->
            <div style="background:#2A2520;padding:28px 32px;text-align:center">
              <p style="color:rgba(255,255,255,0.5);font-size:11px;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 8px">Entre Rhône et Alpilles · Conciergerie Provence</p>
              <p style="color:#C2A882;font-size:13px;margin:0">Votre estimation personnalisée</p>
            </div>

            <!-- Potentiel bien -->
            ${rev ? `
            <div style="padding:28px 32px;text-align:center;border-bottom:1px solid #EDE5D4">
              <p style="font-size:12px;color:#9A8A78;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 10px">${type ?? "Votre bien"} · ${commune ?? "Provence"} · ${bedrooms ?? ""} chambre${Number(bedrooms) > 1 ? "s" : ""}</p>
              <p style="font-size:13px;color:#7A6E65;margin:0 0 4px">Potentiel locatif annuel avec ERA</p>
              <p style="font-size:38px;font-weight:700;color:#6E8052;margin:0;line-height:1.1">${formatEur(rev.min)} – ${formatEur(rev.max)}</p>
              <p style="font-size:12px;color:#9A8A78;margin:8px 0 0">Basé sur les données AirDNA et le marché local Provence</p>
            </div>` : ""}

            <div style="padding:32px">

              <!-- Comparaison solo vs ERA -->
              ${soloEstimate && eraPremiumNet && extraVsSolo ? `
              <p style="font-size:15px;color:#3A3228;line-height:1.7;margin:0 0 20px">
                La différence entre une location gérée seule et une location confiée à ERA n'est pas juste une question de confort — c'est une question de revenus.
              </p>

              <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;border-radius:8px;overflow:hidden">
                <tr>
                  <td style="padding:16px;background:#F5F0E8;border-bottom:1px solid #EDE5D4">
                    <p style="margin:0 0 4px;font-size:11px;color:#9A8A78;text-transform:uppercase;letter-spacing:0.1em">En gestion directe</p>
                    <p style="margin:0;font-size:22px;font-weight:600;color:#9A8A78">${formatEur(soloEstimate)}/an</p>
                    <p style="margin:6px 0 0;font-size:12px;color:#C2A882;line-height:1.5">Sans pricing IA · sans photos pro · une seule plateforme · gestion de votre temps</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px;background:#6E8052">
                    <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.65);text-transform:uppercase;letter-spacing:0.1em">Avec ERA Premium</p>
                    <p style="margin:0;font-size:26px;font-weight:700;color:#fff">${formatEur(eraPremiumNet)}/an net</p>
                    <p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,0.75);line-height:1.5">Pricing IA · photos pro · Airbnb + Booking + Abritel · zéro gestion de votre part</p>
                  </td>
                </tr>
              </table>

              <div style="background:#F5F0E8;border-left:3px solid #8C9E6E;border-radius:4px;padding:16px 20px;margin-bottom:28px">
                <p style="margin:0;font-size:14px;color:#3A3228;line-height:1.6">
                  <strong style="color:#6E8052">+${formatEur(extraVsSolo)} de revenus supplémentaires par an</strong> — bien au-delà des ${formatEur(eraCommission!)} d'honoraires ERA. La conciergerie ne vous coûte rien : elle s'autofinance et génère du profit dès la première saison.
                </p>
              </div>` : ""}

              <!-- Ce qu'ERA fait pour vous -->
              <p style="font-size:13px;font-weight:600;color:#3A3228;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 14px">Ce qu'ERA gère à votre place</p>
              <table style="width:100%;font-size:13px;color:#3A3228;margin-bottom:28px">
                ${[
                  ["Tarification dynamique IA", "Algorithme PriceLabs ajusté chaque jour — +20 à +40 % de revenus"],
                  ["Multi-plateformes", "Airbnb, Booking.com, Abritel — toutes synchronisées"],
                  ["Photos & annonces pro", "Mise en scène, titres optimisés, SEO plateforme"],
                  ["Check-in, ménage, linge", "Accueil personnalisé, linge hôtelier, ménage après chaque séjour"],
                  ["Voyageurs 24h/24", "Communication, urgences, avis — nous gérons tout"],
                  ["Tableau de bord", "Vos revenus en temps réel, rapport mensuel détaillé"],
                ].map(([title, desc]) => `
                  <tr style="border-bottom:1px solid #EDE5D4">
                    <td style="padding:10px 12px 10px 0;font-weight:600;color:#3A3228;width:45%;vertical-align:top">${title}</td>
                    <td style="padding:10px 0;color:#7A6E65;font-size:12px;line-height:1.5">${desc}</td>
                  </tr>
                `).join("")}
              </table>

              <!-- CTA principal -->
              <div style="text-align:center;margin-bottom:20px">
                <a href="https://entre-rhone-alpilles.fr/contact" style="display:inline-block;background:#6E8052;color:#fff;padding:15px 36px;border-radius:6px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;font-weight:500">
                  Confier mon bien à ERA
                </a>
              </div>
              <p style="font-size:12px;color:#9A8A78;text-align:center;margin:0">
                Ou appelez-nous directement : <a href="tel:+33752907868" style="color:#6E8052;font-weight:600">07 52 90 78 68</a><br/>
                <span style="font-size:11px">Lun–Sam · 9h–19h · Réponse garantie sous 24h</span>
              </p>
            </div>

            <div style="padding:16px 28px;border-top:1px solid #D9C9B0;background:#fafafa;text-align:center">
              <p style="font-size:11px;color:#C2A882;margin:0">Estimation indicative · données AirDNA & marché local · <a href="https://entre-rhone-alpilles.fr" style="color:#C2A882">entre-rhone-alpilles.fr</a></p>
            </div>
          </div>
          `;
        })(),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
