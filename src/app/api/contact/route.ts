import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO = "contact@entre-rhone-alpilles.fr";
const FROM = "Entre Rhône et Alpilles <noreply@entre-rhone-alpilles.fr>";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Adresse email invalide" }, { status: 400 });
    }

    const subjectLabel = subject === "voyageur" ? "Voyageur" : "Propriétaire";

    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `[Contact ${subjectLabel}] ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;color:#3A3228">
          <h2 style="color:#6E8052;margin-bottom:4px">Nouveau message — ${subjectLabel}</h2>
          <hr style="border:none;border-top:1px solid #D9C9B0;margin:16px 0"/>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:6px 0;color:#9A8A78;width:120px">Nom</td><td style="padding:6px 0"><strong>${name}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#9A8A78">Email</td><td style="padding:6px 0"><a href="mailto:${email}" style="color:#6E8052">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:6px 0;color:#9A8A78">Téléphone</td><td style="padding:6px 0">${phone}</td></tr>` : ""}
          </table>
          <hr style="border:none;border-top:1px solid #D9C9B0;margin:16px 0"/>
          <p style="white-space:pre-wrap;font-size:15px;line-height:1.7">${message}</p>
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
