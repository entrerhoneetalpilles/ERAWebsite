import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO = "contact@entre-rhone-alpilles.fr";
const FROM = "Entre Rhône et Alpilles <noreply@entre-rhone-alpilles.fr>";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Adresse email invalide" }, { status: 400 });
    }

    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `[Newsletter] Nouvelle inscription — ${email}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;color:#3A3228">
          <h2 style="color:#6E8052;margin-bottom:4px">Nouvelle inscription newsletter</h2>
          <hr style="border:none;border-top:1px solid #D9C9B0;margin:16px 0"/>
          <p style="font-size:15px">Email : <a href="mailto:${email}" style="color:#6E8052">${email}</a></p>
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
