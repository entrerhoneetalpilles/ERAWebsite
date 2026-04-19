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
        subject: `Votre estimation ERA${rev ? ` — ${formatEur(rev.min)} à ${formatEur(rev.max)}/an` : ""}`,
        html: `
          <div style="font-family:'Helvetica Neue',sans-serif;max-width:580px;margin:auto;background:#fff;border:1px solid #D9C9B0;border-radius:8px;overflow:hidden">
            <div style="background:#6E8052;padding:24px 32px;text-align:center">
              <p style="color:rgba(255,255,255,0.7);font-size:11px;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 6px">Entre Rhône et Alpilles</p>
              <h1 style="color:#fff;font-size:22px;margin:0;font-weight:300;font-style:italic">Votre estimation de revenus</h1>
            </div>

            ${rev ? `
            <div style="padding:28px 32px;background:#F5F0E8;border-bottom:1px solid #D9C9B0;text-align:center">
              <p style="font-size:12px;color:#9A8A78;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px">Potentiel estimé pour votre bien</p>
              <p style="font-size:32px;font-weight:700;color:#6E8052;margin:0">${formatEur(rev.min)} – ${formatEur(rev.max)}</p>
              <p style="font-size:13px;color:#9A8A78;margin:4px 0 0">par an · ${commune ?? "Provence"} · ${type ?? ""} · ${bedrooms ?? ""} chambre${Number(bedrooms) > 1 ? "s" : ""}</p>
            </div>` : ""}

            <div style="padding:32px">
              <p style="font-size:15px;color:#3A3228;line-height:1.7;margin:0 0 20px">
                Voici le détail de ce que vous pourriez percevoir selon la formule choisie :
              </p>

              ${midRev ? `
              <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:28px">
                <thead>
                  <tr style="background:#F5F0E8">
                    <th style="padding:10px 12px;text-align:left;font-weight:600;color:#3A3228;font-size:12px">Formule</th>
                    <th style="padding:10px 12px;text-align:center;color:#9A8A78;font-size:12px">Commission</th>
                    <th style="padding:10px 12px;text-align:right;font-weight:600;color:#3A3228;font-size:12px">Revenu net estimé</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom:1px solid #EDE5D4">
                    <td style="padding:12px">Essentiel</td>
                    <td style="padding:12px;text-align:center;color:#9A8A78">18% HT</td>
                    <td style="padding:12px;text-align:right;font-weight:600;color:#3A3228">${formatEur(netEssentiel!)}/an</td>
                  </tr>
                  <tr style="border-bottom:1px solid #EDE5D4;background:#F5F0E8">
                    <td style="padding:12px;font-weight:600;color:#6E8052">Premium ⭐</td>
                    <td style="padding:12px;text-align:center;color:#9A8A78">22% HT</td>
                    <td style="padding:12px;text-align:right;font-weight:700;color:#6E8052">${formatEur(netPremium!)}/an</td>
                  </tr>
                  <tr>
                    <td style="padding:12px">Prestige</td>
                    <td style="padding:12px;text-align:center;color:#9A8A78">28% HT</td>
                    <td style="padding:12px;text-align:right;font-weight:600;color:#3A3228">${formatEur(netPrestige!)}/an</td>
                  </tr>
                </tbody>
              </table>` : ""}

              <div style="background:#F5F0E8;border-radius:8px;padding:20px;margin-bottom:28px">
                <p style="font-size:12px;color:#9A8A78;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 10px">Pourquoi confier votre bien à ERA ?</p>
                <ul style="margin:0;padding-left:20px;font-size:14px;color:#3A3228;line-height:2">
                  <li>Tarification dynamique IA (PriceLabs) — jusqu'à +40% de revenus</li>
                  <li>Gestion multi-plateformes : Airbnb, Booking, Abritel</li>
                  <li>Ménage, linge, check-in : tout est géré à votre place</li>
                  <li>Experts locaux, présents 7j/7 en Provence</li>
                </ul>
              </div>

              <div style="text-align:center">
                <a href="https://entre-rhone-alpilles.fr/contact" style="display:inline-block;background:#8C9E6E;color:#fff;padding:14px 32px;border-radius:6px;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none">
                  Parler à un expert ERA
                </a>
              </div>

              <p style="font-size:12px;color:#9A8A78;text-align:center;margin-top:16px">
                Ou appelez-nous : <a href="tel:+33600000000" style="color:#6E8052">06 00 00 00 00</a> (Lun–Sam, 9h–19h)
              </p>
            </div>

            <div style="padding:16px 28px;border-top:1px solid #D9C9B0;background:#fafafa;text-align:center">
              <p style="font-size:11px;color:#C2A882;margin:0">Estimation indicative basée sur les données du marché local · <a href="https://entre-rhone-alpilles.fr" style="color:#C2A882">entre-rhone-alpilles.fr</a></p>
            </div>
          </div>
        `,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
