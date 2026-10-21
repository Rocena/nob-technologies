import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { sendEmail } from '@/lib/email';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  try {
    const payload = await getPayloadClient();
    const reqHeaders = await headers();

    const { user } = await payload.auth({ headers: reqHeaders });
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { admissionId } = body;

    if (!admissionId) {
      return NextResponse.json({ error: 'ID de candidature manquant.' }, { status: 400 });
    }

    const admission = await payload.findByID({
      collection: 'admissions',
      id: admissionId,
      depth: 0,
    });

    if (!admission || !admission.email) {
      return NextResponse.json({ error: 'Candidat ou adresse email introuvable.' }, { status: 404 });
    }

    const year = new Date(admission.createdAt || Date.now()).getFullYear();
    const certCode = `NOB-CERT-${year}-${String(admission.id).padStart(4, '0').toUpperCase()}`;
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.nobtech.fr';
    const certificateUrl = `${origin}/document/certificat/${admission.id}`;

    const emailHtml = `
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="utf-8"></head>
    <body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; color: #0f172a;">
      <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #0284C7 100%); padding: 34px 28px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 800;">NOB TECHNOLOGIES • ACADEMY</h1>
          <p style="margin: 6px 0 0; font-size: 12px; opacity: 0.9; text-transform: uppercase; letter-spacing: 1.5px;">Délivrance d'Attestation Officielle</p>
        </div>
        <div style="padding: 32px 28px;">
          <p style="font-size: 15px; margin: 0 0 16px;">Félicitations <strong>${admission.candidateName}</strong>,</p>
          <p style="font-size: 14px; line-height: 1.65; color: #334155; margin: 0 0 24px;">
            Nous avons le plaisir de vous délivrer votre <strong>Certificat Officiel de Réussite</strong> pour le programme <strong>${admission.formationTitle}</strong>.
          </p>
          <div style="background: #f8fafc; border: 1px solid #bae6fd; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
            <div style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700;">Numéro d'identification du Certificat :</div>
            <div style="font-size: 17px; font-weight: 900; color: #0284C7; font-family: monospace; margin-top: 4px;">${certCode}</div>
          </div>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${certificateUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #0284C7, #0369A1); color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 28px; border-radius: 10px; box-shadow: 0 4px 15px rgba(2, 132, 199, 0.4);">
              Afficher &amp; Télécharger mon Certificat PDF
            </a>
          </div>
          <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin: 0;">
            Ce document officiel peut être joint à votre CV ou partagé sur votre profil professionnel LinkedIn.
          </p>
        </div>
        <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 28px; text-align: center; font-size: 12px; color: #64748b;">
          <strong>NOB TECHNOLOGIES S.A.R.L</strong> — Dakar, Sénégal • contact@nobtech.fr
        </div>
      </div>
    </body>
    </html>
    `;

    await sendEmail({
      to: admission.email,
      subject: `🎓 Votre Certificat Officiel (${certCode}) — ${admission.formationTitle}`,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      message: `Certificat ${certCode} envoyé par email à ${admission.email} !`,
    });
  } catch (err: any) {
    console.error('Send certificate error:', err);
    return NextResponse.json(
      { error: err.message || "Erreur lors de l'envoi du certificat." },
      { status: 500 }
    );
  }
}
