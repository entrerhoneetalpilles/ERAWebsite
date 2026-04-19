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

    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: TO,
        subject: `[Newsletter] Nouvelle inscription — ${email}`,
        html: `
          <div style="font-family:'Helvetica Neue',sans-serif;max-width:560px;margin:auto;background:#fff;border:1px solid #D9C9B0;border-radius:8px;overflow:hidden">
            <div style="background:#6E8052;padding:20px 28px">
              <p style="color:rgba(255,255,255,0.7);font-size:11px;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 4px">Newsletter</p>
              <h1 style="color:#fff;font-size:18px;margin:0;font-weight:400">Nouvelle inscription</h1>
            </div>
            <div style="padding:28px">
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <tr>
                  <td style="padding:8px 0;color:#9A8A78;width:130px">Email</td>
                  <td><a href="mailto:${email}" style="color:#6E8052;font-weight:600">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#9A8A78">Reçu le</td>
                  <td style="color:#9A8A78;font-size:12px">${new Date().toLocaleString("fr-FR")}</td>
                </tr>
              </table>
            </div>
            <div style="padding:16px 28px;border-top:1px solid #D9C9B0;background:#fafafa;text-align:center">
              <p style="font-size:11px;color:#C2A882;margin:0">entre-rhone-alpilles.fr</p>
            </div>
          </div>
        `,
      }),
      resend.emails.send({
        from: FROM,
        to: email,
        subject: "Bienvenue dans la newsletter — Entre Rhône et Alpilles",
        html: `
          <div style="font-family:'Helvetica Neue',sans-serif;max-width:580px;margin:auto;background:#fff;border:1px solid #D9C9B0;border-radius:8px;overflow:hidden">
            <div style="background:#6E8052;padding:24px 32px;text-align:center">
              <p style="color:rgba(255,255,255,0.7);font-size:11px;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 6px">Entre Rhône et Alpilles</p>
              <h1 style="color:#fff;font-size:24px;margin:0;font-weight:300;font-style:italic">Bienvenue !</h1>
            </div>

            <div style="padding:36px 32px">
              <p style="font-size:15px;color:#3A3228;line-height:1.7;margin:0 0 16px">
                Votre inscription à notre newsletter est confirmée.
              </p>
              <p style="font-size:15px;color:#3A3228;line-height:1.7;margin:0 0 28px">
                Chaque mois, vous recevrez nos <strong style="color:#6E8052">conseils exclusifs</strong> pour propriétaires, les tendances du marché locatif en Provence, et nos guides de voyage entre le Rhône et les Alpilles.
              </p>

              <div style="background:#F5F0E8;border-radius:8px;padding:20px;margin-bottom:28px">
                <p style="font-size:13px;font-weight:600;color:#3A3228;margin:0 0 12px">Au programme chaque mois :</p>
                <ul style="margin:0;padding-left:20px;font-size:14px;color:#7A6E65;line-height:2">
                  <li>Astuces pour maximiser vos revenus locatifs</li>
                  <li>Tendances Airbnb et marché Provence</li>
                  <li>Guides et bons plans locaux</li>
                  <li>Actualités de la conciergerie ERA</li>
                </ul>
              </div>

              <div style="text-align:center">
                <a href="https://entre-rhone-alpilles.fr/blog" style="display:inline-block;background:#8C9E6E;color:#fff;padding:13px 28px;border-radius:6px;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none">
                  Lire nos derniers articles
                </a>
              </div>
            </div>

            <div style="padding:16px 28px;border-top:1px solid #D9C9B0;background:#fafafa;text-align:center">
              <p style="font-size:11px;color:#C2A882;margin:0">Sans engagement · Désinscription en 1 clic · <a href="https://entre-rhone-alpilles.fr" style="color:#C2A882">entre-rhone-alpilles.fr</a></p>
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
