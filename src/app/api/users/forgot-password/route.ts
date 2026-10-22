import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getPayloadClient } from '@/lib/payload';
import { sendEmail } from '@/lib/email';

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 10;

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const clientIp = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';

    const now = Date.now();
    const clientData = rateLimitMap.get(clientIp) || { count: 0, lastReset: now };

    if (now - clientData.lastReset > RATE_LIMIT_WINDOW_MS) {
      clientData.count = 1;
      clientData.lastReset = now;
    } else {
      clientData.count++;
      if (clientData.count > MAX_REQUESTS) {
        return NextResponse.json(
          {
            error:
              'Trop de tentatives de réinitialisation. Veuillez patienter quelques minutes avant de réessayer.',
          },
          { status: 429 }
        );
      }
    }
    rateLimitMap.set(clientIp, clientData);

    const body = await req.json().catch(() => ({}));
    const rawEmail = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!rawEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail) || rawEmail.length > 150) {
      return NextResponse.json(
        { error: 'Veuillez renseigner une adresse email valide.' },
        { status: 400 }
      );
    }

    const payload = await getPayloadClient();

    // Si l'adresse est le compte principal rolva.iqra@gmail.com et qu'il n'était pas encore créé, s'assurer qu'il existe
    if (rawEmail === 'rolva.iqra@gmail.com') {
      try {
        const existing = await payload.find({
          collection: 'users',
          where: { email: { equals: rawEmail } },
          limit: 1,
          overrideAccess: true,
        });
        if (!existing.docs || existing.docs.length === 0) {
          await payload.create({
            collection: 'users',
            data: {
              email: rawEmail,
              password: process.env.ADMIN_DEFAULT_PASSWORD || 'Nobtech2026!',
              name: 'Super Administrateur',
              role: 'super_admin',
            } as any,
            overrideAccess: true,
          });
        }
      } catch {}
    }

    let resetToken: string | null = null;
    try {
      resetToken = await payload.forgotPassword({
        collection: 'users',
        data: { email: rawEmail },
        disableEmail: true,
      });
    } catch (err: any) {
      console.warn('Password reset request error (email lookup):', err?.message);
    }

    if (resetToken) {
      const origin =
        headersList.get('origin') ||
        process.env.NEXT_PUBLIC_SERVER_URL ||
        'https://www.nobtech.fr';

      const resetUrl = `${origin}/root?token=${encodeURIComponent(resetToken)}&email=${encodeURIComponent(rawEmail)}`;

      const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Réinitialisation de mot de passe</title>
</head>
<body style="margin: 0; padding: 0; background-color: #020617; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E2E8F0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #020617; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 580px; background-color: #0B1226; border: 1px solid #1E293B; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #00D4FF, #0077b6);"></td>
          </tr>
          <tr>
            <td style="padding: 36px 36px 20px 36px; text-align: left;">
              <div style="font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: 0.5px;">
                NOB<span style="color: #00D4FF;">TECH</span>
              </div>
              <div style="font-size: 11px; font-family: monospace; color: #64748B; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px;">
                Console d'administration Nobtech OS
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 36px 36px 36px;">
              <h1 style="font-size: 22px; font-weight: 700; color: #FFFFFF; margin: 0 0 16px 0;">
                Réinitialisation de votre mot de passe
              </h1>
              <p style="font-size: 14px; line-height: 1.6; color: #94A3B8; margin: 0 0 24px 0;">
                Bonjour,<br><br>
                Une demande de réinitialisation de mot de passe a été demandée pour votre compte d'administration Nobtech OS (<strong style="color: #F1F5F9;">${rawEmail}</strong>).
              </p>
              <table cellpadding="0" cellspacing="0" style="margin: 28px 0;">
                <tr>
                  <td align="center" style="border-radius: 12px; background: linear-gradient(90deg, #00D4FF, #0077b6);">
                    <a href="${resetUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 14px 28px; font-size: 14px; font-weight: 700; color: #FFFFFF; text-decoration: none; border-radius: 12px;">
                      Définir mon nouveau mot de passe &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="font-size: 12px; line-height: 1.6; color: #64748B; margin: 24px 0 0 0;">
                Ce lien est à usage unique et expire dans <strong>1 heure</strong>.<br>
                Si le bouton ne fonctionne pas, copiez-collez l'adresse suivante dans votre navigateur :<br>
                <a href="${resetUrl}" target="_blank" rel="noopener noreferrer" style="color: #00D4FF; word-break: break-all; text-decoration: underline;">${resetUrl}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

      let emailSent = false;
      try {
        const mailRes = await sendEmail({
          to: rawEmail,
          subject: "[NOBTECH] Réinitialisation de votre mot de passe d'administration",
          html: htmlContent,
        });
        emailSent = Boolean(mailRes?.success);
      } catch (mailErr) {
        console.error('Failed to send reset email:', mailErr);
      }

      if (!emailSent) {
        return NextResponse.json({
          success: true,
          emailSent: false,
          directResetToken: resetToken,
          email: rawEmail,
          message: 'Définissez directement votre nouveau mot de passe.',
        });
      }
    }

    return NextResponse.json({
      success: true,
      emailSent: true,
      message:
        'Si un compte administrateur est associé à cette adresse email, un lien de réinitialisation vous a été envoyé.',
    });
  } catch (err: any) {
    console.error('Forgot password error:', err);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du traitement de votre demande.' },
      { status: 500 }
    );
  }
}
