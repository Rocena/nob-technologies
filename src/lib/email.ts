import nodemailer from 'nodemailer';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export function getEmailTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Send an email using standard SMTP.
 * If credentials are not present, logs preview with a clear setup message.
 */
export async function sendEmail({ to, subject, html, replyTo }: SendEmailOptions) {
  const transporter = getEmailTransporter();
  const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER || '"NOB TECHNOLOGIES" <contact@nobtech.fr>';

  if (!transporter) {
    console.warn(
      `[EMAIL SERVICE] Paramètres SMTP non configurés dans le fichier .env (SMTP_USER, SMTP_PASS).\n` +
      `Email destiné à : ${to} | Objet : ${subject}`
    );
    return {
      success: false,
      warning: 'SMTP_CONFIG_MISSING',
      message: 'SMTP credentials not configured in .env',
    };
  }

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to,
      replyTo: replyTo || process.env.SMTP_USER || 'contact@nobtech.fr',
      subject,
      html,
    });
    console.log(`[EMAIL SERVICE] Email envoyé avec succès à ${to}. MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[EMAIL SERVICE] Erreur lors de l'envoi à ${to} :`, error);
    throw error;
  }
}

/**
 * High-end branded HTML email template for client acknowledgment receipt (Accusé de réception).
 */
export function generateClientAcknowledgmentHtml(params: {
  name: string;
  subject: string;
  summary?: string;
  referenceId?: string;
}) {
  const currentYear = new Date().getFullYear();
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accusé de réception - NOB TECHNOLOGIES</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b1120; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b1120; padding: 40px 10px;">
    <tr>
      <td align="center">
        <!-- Container -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #0f172a; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0A2540 0%, #00B4D8 100%); padding: 36px 30px; text-align: center;">
              <div style="font-size: 26px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff; margin-bottom: 6px;">
                NOB TECHNOLOGIES
              </div>
              <div style="font-size: 13px; text-transform: uppercase; letter-spacing: 2px; color: rgba(255, 255, 255, 0.85); font-weight: 600;">
                Excellence & Ingénierie Digitale
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 36px 30px;">
              <!-- Status Pill -->
              <div style="display: inline-block; padding: 6px 14px; background: rgba(0, 180, 216, 0.12); border: 1px solid rgba(0, 180, 216, 0.35); border-radius: 999px; color: #00B4D8; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 24px;">
                ✓ Accusé de réception officiel
              </div>

              <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                Bonjour ${escapeHtml(params.name)},
              </h1>

              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #94a3b8;">
                Nous vous confirmons la bonne réception de votre demande concernant :
              </p>

              <!-- Request Highlight Card -->
              <div style="background-color: #1e293b; border-left: 4px solid #00B4D8; padding: 18px 20px; border-radius: 8px; margin-bottom: 24px;">
                <div style="font-size: 14px; font-weight: 600; color: #38bdf8; margin-bottom: 6px;">
                  Objet : ${escapeHtml(params.subject)}
                </div>
                ${
                  params.referenceId
                    ? `<div style="font-size: 12px; color: #64748b; font-family: monospace;">Réf: #${escapeHtml(params.referenceId)}</div>`
                    : ''
                }
              </div>

              <!-- Commitment Box -->
              <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 20px; margin-bottom: 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="36" valign="top">
                      <div style="width: 28px; height: 28px; border-radius: 50%; background: #00B4D8; color: #ffffff; text-align: center; line-height: 28px; font-weight: bold; font-size: 14px;">
                        ⏱
                      </div>
                    </td>
                    <td style="padding-left: 12px;">
                      <div style="font-size: 14px; font-weight: 600; color: #f1f5f9; margin-bottom: 4px;">
                        Délai de traitement garanti sous 24h ouvrées
                      </div>
                      <div style="font-size: 13px; color: #94a3b8; line-height: 1.5;">
                        Nos ingénieurs et consultants étudient votre besoin avec la plus grande rigueur technique afin de vous apporter une réponse personnalisée et adaptée.
                      </div>
                    </td>
                  </tr>
                </table>
              </div>

              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #94a3b8;">
                Si vous avez des pièces complémentaires ou des précisions urgentes à apporter, vous pouvez répondre directement à cet email.
              </p>

              <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 20px; margin-top: 30px;">
                <div style="font-size: 14px; font-weight: 600; color: #f8fafc;">
                  L'équipe NOB TECHNOLOGIES
                </div>
                <div style="font-size: 13px; color: #64748b;">
                  Pôle Solutions & Relation Client
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0b1120; border-top: 1px solid rgba(255, 255, 255, 0.05); padding: 24px 30px; text-align: center;">
              <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">
                NOB TECHNOLOGIES SARL — Solutions Informatiques, Télécoms & Cybersécurité
              </div>
              <div style="font-size: 11px; color: #475569;">
                contact@nobtech.fr • +33 1 23 45 67 89 • Abidjan & Paris • &copy; ${currentYear} Tous droits réservés.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Branded HTML template for admin replies sent directly from the back-office.
 */
export function generateAdminReplyHtml(params: {
  recipientName: string;
  originalSubject: string;
  messageBody: string;
  adminName?: string;
}) {
  const currentYear = new Date().getFullYear();
  const formattedBody = escapeHtml(params.messageBody).replace(/\n/g, '<br/>');

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Réponse de NOB TECHNOLOGIES</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b1120; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b1120; padding: 40px 10px;">
    <tr>
      <td align="center">
        <!-- Container -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #0f172a; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0A2540 0%, #00B4D8 100%); padding: 36px 30px; text-align: center;">
              <div style="font-size: 26px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff; margin-bottom: 6px;">
                NOB TECHNOLOGIES
              </div>
              <div style="font-size: 13px; text-transform: uppercase; letter-spacing: 2px; color: rgba(255, 255, 255, 0.85); font-weight: 600;">
                Direction Technique & Commerciale
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 36px 30px;">
              <div style="font-size: 13px; color: #64748b; margin-bottom: 12px;">
                En réponse à : <strong style="color: #94a3b8;">${escapeHtml(params.originalSubject)}</strong>
              </div>

              <h1 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                Bonjour ${escapeHtml(params.recipientName)},
              </h1>

              <!-- Message Body -->
              <div style="background-color: #1e293b; border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 24px; font-size: 15px; line-height: 1.7; color: #f1f5f9; margin-bottom: 30px;">
                ${formattedBody}
              </div>

              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #94a3b8;">
                Pour toute information complémentaire ou pour échanger directement avec notre équipe, vous pouvez simplement répondre à cet email ou nous contacter par téléphone.
              </p>

              <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 20px; margin-top: 28px;">
                <div style="font-size: 15px; font-weight: 700; color: #ffffff;">
                  ${escapeHtml(params.adminName || 'L\'équipe NOB TECHNOLOGIES')}
                </div>
                <div style="font-size: 13px; color: #00B4D8; font-weight: 500; margin-top: 2px;">
                  NOB TECHNOLOGIES — Solutions Digitales de Haute Précision
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0b1120; border-top: 1px solid rgba(255, 255, 255, 0.05); padding: 24px 30px; text-align: center;">
              <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">
                NOB TECHNOLOGIES SARL — Réseaux, Télécoms, Cloud & Cybersécurité
              </div>
              <div style="font-size: 11px; color: #475569;">
                contact@nobtech.fr • +33 1 23 45 67 89 • Abidjan & Paris • &copy; ${currentYear} Tous droits réservés.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
