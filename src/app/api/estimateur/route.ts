import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO = "contact@entre-rhone-alpilles.fr";
const FROM = "Entre Rhône et Alpilles <noreply@entre-rhone-alpilles.fr>";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { email, commune, type, bedrooms, standing, estimatedRevenue } = body;

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Adresse email invalide" }, { status: 400 });
    }

    const revenueLabel = estimatedRevenue
      ? `${estimatedRevenue.toLocaleString("fr-FR")} €/an`
      : "–";

    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `[Estimation] ${commune ?? "Commune inconnue"} — ${revenueLabel}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;color:#3A3228">
          <h2 style="color:#6E8052;margin-bottom:4px">Nouvelle demande d'estimation</h2>
          <hr style="border:none;border-top:1px solid #D9C9B0;margin:16px 0"/>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:6px 0;color:#9A8A78;width:160px">Email propriétaire</td><td style="padding:6px 0"><a href="mailto:${email}" style="color:#6E8052">${email}</a></td></tr>
            ${commune ? `<tr><td style="padding:6px 0;color:#9A8A78">Commune</td><td style="padding:6px 0">${commune}</td></tr>` : ""}
            ${type ? `<tr><td style="padding:6px 0;color:#9A8A78">Type de bien</td><td style="padding:6px 0">${type}</td></tr>` : ""}
            ${bedrooms ? `<tr><td style="padding:6px 0;color:#9A8A78">Chambres</td><td style="padding:6px 0">${bedrooms}</td></tr>` : ""}
            ${standing ? `<tr><td style="padding:6px 0;color:#9A8A78">Standing</td><td style="padding:6px 0">${standing}</td></tr>` : ""}
            <tr><td style="padding:6px 0;color:#9A8A78">Revenu estimé</td><td style="padding:6px 0"><strong style="color:#6E8052;font-size:16px">${revenueLabel}</strong></td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #D9C9B0;margin:16px 0"/>
          <p style="font-size:11px;color:#9A8A78">Reçu le ${new Date().toLocaleString("fr-FR")} · entre-rhone-alpilles.fr</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
