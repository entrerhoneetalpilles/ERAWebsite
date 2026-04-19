import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO = "contact@entre-rhone-alpilles.fr";
const FROM = "Entre Rhône et Alpilles <noreply@entre-rhone-alpilles.fr>";

function notifHtml({
  name, email, phone, subject, message,
}: { name: string; email: string; phone?: string; subject: string; message: string }) {
  const subjectLabel = subject === "voyageur" ? "🧳 Voyageur" : "🏠 Propriétaire";
  const hasPhone = !!phone;
  const msgLen = message.length;
  const score = [hasPhone ? "✅ Téléphone renseigné" : "❌ Pas de téléphone", msgLen > 200 ? "✅ Message détaillé" : msgLen > 80 ? "⚠️ Message court" : "❌ Message très court"].join(" &nbsp;·&nbsp; ");

  return `
    <div style="font-family:'Helvetica Neue',sans-serif;max-width:620px;margin:auto;background:#fff;border:1px solid #D9C9B0;border-radius:8px;overflow:hidden">
      <div style="background:#6E8052;padding:20px 28px">
        <p style="color:#fff;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 4px">Entre Rhône et Alpilles</p>
        <h1 style="color:#fff;font-size:20px;margin:0;font-weight:400">Nouveau contact — ${subjectLabel}</h1>
      </div>

      <div style="padding:28px;background:#F5F0E8;border-bottom:1px solid #D9C9B0">
        <p style="margin:0;font-size:12px;color:#9A8A78">${score}</p>
      </div>

      <div style="padding:28px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr>
            <td style="padding:8px 0;color:#9A8A78;width:130px;vertical-align:top">Nom</td>
            <td style="padding:8px 0;color:#1A1A1A;font-weight:600">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#9A8A78;vertical-align:top">Email</td>
            <td style="padding:8px 0"><a href="mailto:${email}" style="color:#6E8052;font-weight:600">${email}</a></td>
          </tr>
          ${hasPhone ? `<tr>
            <td style="padding:8px 0;color:#9A8A78;vertical-align:top">Téléphone</td>
            <td style="padding:8px 0"><a href="tel:${phone}" style="color:#6E8052;font-weight:600">${phone}</a></td>
          </tr>` : ""}
          <tr>
            <td style="padding:8px 0;color:#9A8A78;vertical-align:top">Profil</td>
            <td style="padding:8px 0;color:#1A1A1A">${subject === "voyageur" ? "Voyageur — hébergement" : "Propriétaire — conciergerie"}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#9A8A78;vertical-align:top">Reçu le</td>
            <td style="padding:8px 0;color:#9A8A78;font-size:12px">${new Date().toLocaleString("fr-FR")}</td>
          </tr>
        </table>

        <div style="margin-top:20px;padding:16px;background:#F5F0E8;border-left:3px solid #8C9E6E;border-radius:4px">
          <p style="font-size:12px;color:#9A8A78;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px">Message</p>
          <p style="font-size:14px;color:#3A3228;line-height:1.7;margin:0;white-space:pre-wrap">${message}</p>
        </div>

        <div style="margin-top:24px;text-align:center">
          <a href="mailto:${email}?subject=Re: votre demande — Entre Rhône et Alpilles" style="display:inline-block;background:#6E8052;color:#fff;padding:12px 28px;border-radius:6px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none">
            Répondre à ${name.split(" ")[0]}
          </a>
        </div>
      </div>

      <div style="padding:16px 28px;border-top:1px solid #D9C9B0;background:#fafafa">
        <p style="font-size:11px;color:#C2A882;margin:0;text-align:center">entre-rhone-alpilles.fr</p>
      </div>
    </div>
  `;
}

function confirmHtml({ name, subject }: { name: string; subject: string }) {
  const isOwner = subject === "proprietaire";
  const firstName = name.split(" ")[0];

  return `
    <div style="font-family:'Helvetica Neue',sans-serif;max-width:580px;margin:auto;background:#fff;border:1px solid #D9C9B0;border-radius:8px;overflow:hidden">
      <div style="background:#6E8052;padding:24px 32px;text-align:center">
        <p style="color:rgba(255,255,255,0.7);font-size:11px;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 6px">Entre Rhône et Alpilles</p>
        <h1 style="color:#fff;font-size:24px;margin:0;font-weight:300;font-style:italic">Message bien reçu</h1>
      </div>

      <div style="padding:36px 32px">
        <p style="font-size:16px;color:#3A3228;margin:0 0 20px">Bonjour ${firstName},</p>

        ${isOwner ? `
        <p style="font-size:15px;color:#3A3228;line-height:1.7;margin:0 0 16px">
          Merci pour votre message. Notre équipe a bien reçu votre demande et vous répondra <strong style="color:#6E8052">sous 24 heures ouvrées</strong>.
        </p>
        <p style="font-size:15px;color:#3A3228;line-height:1.7;margin:0 0 24px">
          En attendant, si vous souhaitez avoir une première idée des revenus que pourrait générer votre bien, notre simulateur vous donne une estimation en 2 minutes.
        </p>
        <div style="text-align:center;margin-bottom:28px">
          <a href="https://entre-rhone-alpilles.fr/conciergerie/estimer-mes-revenus" style="display:inline-block;background:#8C9E6E;color:#fff;padding:13px 28px;border-radius:6px;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none">
            Simuler mes revenus
          </a>
        </div>
        ` : `
        <p style="font-size:15px;color:#3A3228;line-height:1.7;margin:0 0 16px">
          Merci pour votre message. Notre équipe a bien reçu votre demande et vous répondra <strong style="color:#6E8052">sous 24 heures ouvrées</strong>.
        </p>
        <p style="font-size:15px;color:#3A3228;line-height:1.7;margin:0 0 24px">
          En attendant, n'hésitez pas à parcourir nos hébergements disponibles entre le Rhône et les Alpilles.
        </p>
        <div style="text-align:center;margin-bottom:28px">
          <a href="https://entre-rhone-alpilles.fr/locations" style="display:inline-block;background:#8C9E6E;color:#fff;padding:13px 28px;border-radius:6px;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none">
            Voir les hébergements
          </a>
        </div>
        `}

        <div style="background:#F5F0E8;border-radius:8px;padding:20px;margin-bottom:0">
          <p style="font-size:12px;color:#9A8A78;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px">Nos coordonnées</p>
          <table style="font-size:14px;color:#3A3228">
            <tr><td style="padding:3px 12px 3px 0;color:#9A8A78">Téléphone</td><td>06 00 00 00 00 (Lun–Sam, 9h–19h)</td></tr>
            <tr><td style="padding:3px 12px 3px 0;color:#9A8A78">Email</td><td><a href="mailto:contact@entre-rhone-alpilles.fr" style="color:#6E8052">contact@entre-rhone-alpilles.fr</a></td></tr>
          </table>
        </div>
      </div>

      <div style="padding:16px 28px;border-top:1px solid #D9C9B0;background:#fafafa;text-align:center">
        <p style="font-size:11px;color:#C2A882;margin:0">Entre Rhône et Alpilles · Conciergerie Provence · <a href="https://entre-rhone-alpilles.fr" style="color:#C2A882">entre-rhone-alpilles.fr</a></p>
      </div>
    </div>
  `;
}

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

    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: TO,
        replyTo: email,
        subject: `[${subject === "voyageur" ? "Voyageur" : "Propriétaire"}] ${name}${phone ? ` · ${phone}` : ""}`,
        html: notifHtml({ name, email, phone, subject: subject ?? "proprietaire", message }),
      }),
      resend.emails.send({
        from: FROM,
        to: email,
        subject: "Votre message a bien été reçu — Entre Rhône et Alpilles",
        html: confirmHtml({ name, subject: subject ?? "proprietaire" }),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
