import nodemailer from 'nodemailer';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

interface ResolvedEmailConfig {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
  from: string;
  resendApiKey?: string;
}

async function resolveEmailConfig(): Promise<ResolvedEmailConfig> {
  let host = process.env.SMTP_HOST || 'smtp.gmail.com';
  let port = parseInt(process.env.SMTP_PORT || '587', 10);
  let secure = process.env.SMTP_SECURE === 'true' || port === 465;
  let user = process.env.SMTP_USER?.trim();
  let pass = process.env.SMTP_PASS?.trim();
  let from =
    process.env.SMTP_FROM ||
    (user ? `"NOB TECHNOLOGIES" <${user}>` : '"NOB TECHNOLOGIES" <contact@nobtech.fr>');
  let resendApiKey = process.env.RESEND_API_KEY?.trim();

  // If .env doesn't have credentials, check Payload CMS SiteSettings (`emailConfig` tab)
  if ((!user || !pass) && !resendApiKey) {
    try {
      const { getPayloadClient } = await import('@/lib/payload');
      const payload = await getPayloadClient();
      const settings: any = await payload.findGlobal({
        slug: 'site-settings',
        overrideAccess: true,
      });
      const cfg = settings?.emailConfig;
      if (cfg) {
        if (cfg.smtpHost) host = String(cfg.smtpHost).trim();
        if (cfg.smtpPort) port = Number(cfg.smtpPort) || 587;
        if (typeof cfg.smtpSecure === 'boolean') secure = cfg.smtpSecure || port === 465;
        if (cfg.smtpUser) user = String(cfg.smtpUser).trim();
        if (cfg.smtpPass) pass = String(cfg.smtpPass).trim();
        if (cfg.smtpFrom) from = String(cfg.smtpFrom).trim();
        if (cfg.resendApiKey) resendApiKey = String(cfg.resendApiKey).trim();
      }
    } catch {
      // Ignore if CMS not reachable
    }
  }

  return { host, port, secure, user, pass, from, resendApiKey };
}

/**
 * Send an email using standard SMTP or Resend API (configured via .env or Back-Office SiteSettings).
 */
export async function sendEmail({ to, subject, html, replyTo }: SendEmailOptions) {
  const cfg = await resolveEmailConfig();

  // 1. Standard SMTP via Nodemailer
  if (cfg.user && cfg.pass) {
    try {
      const transporter = nodemailer.createTransport({
        host: cfg.host,
        port: cfg.port,
        secure: cfg.secure,
        auth: {
          user: cfg.user,
          pass: cfg.pass,
        },
      });

      const info = await transporter.sendMail({
        from: cfg.from,
        to,
        replyTo: replyTo || cfg.user || 'contact@nobtech.fr',
        subject,
        html,
      });
      console.log(`[EMAIL SERVICE] Email SMTP envoyé avec succès à ${to}. MessageId: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error(`[EMAIL SERVICE] Erreur SMTP lors de l'envoi à ${to} :`, error);
      throw error;
    }
  }

  // 2. Fallback: Resend HTTP API if configured
  if (cfg.resendApiKey) {
    try {
      const toList = to
        .split(',')
        .map((e) => e.trim())
        .filter(Boolean);
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cfg.resendApiKey}`,
        },
        body: JSON.stringify({
          from: cfg.from.includes('@') ? cfg.from : 'NOB TECHNOLOGIES <onboarding@resend.dev>',
          to: toList,
          reply_to: replyTo || 'contact@nobtech.fr',
          subject,
          html,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(`[EMAIL SERVICE] Email Resend envoyé avec succès à ${to}. ID: ${data.id}`);
        return { success: true, messageId: data.id };
      } else {
        const errText = await res.text();
        console.error(`[EMAIL SERVICE] Erreur Resend API:`, errText);
      }
    } catch (error) {
      console.error(`[EMAIL SERVICE] Erreur lors de l'envoi via Resend:`, error);
    }
  }

  console.warn(
    `[EMAIL SERVICE] Identifiants d'envoi (SMTP_USER/SMTP_PASS ou RESEND_API_KEY) non renseignés dans .env ni dans Back-Office > Paramètres du site > Emails & Notifications.\n` +
      `Email en attente pour : ${to} | Objet : ${subject}`
  );
  return {
    success: false,
    warning: 'SMTP_CONFIG_MISSING',
    message: 'Identifiants SMTP / Resend non configurés dans .env ou dans le Back-Office',
  };
}

/**
 * Resolve all administrator email addresses dynamically from Payload CMS `users` collection,
 * `SiteSettings` global (`emailConfig.adminEmails` & `contact.email`), and `ADMIN_NOTIFY_EMAIL` env var.
 */
export async function getAdminRecipientEmails(payload?: any): Promise<string[]> {
  const emailSet = new Set<string>();

  // 1. Environment variable (supports comma-separated list)
  if (process.env.ADMIN_NOTIFY_EMAIL) {
    process.env.ADMIN_NOTIFY_EMAIL.split(',')
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e && e.includes('@'))
      .forEach((e) => emailSet.add(e));
  }

  // 2. Default corporate contact address
  emailSet.add('contact@nobtech.fr');

  // 3. Registered administrators in Payload CMS `users` collection & `site-settings`
  if (payload) {
    try {
      const usersResult = await payload.find({
        collection: 'users',
        limit: 100,
        overrideAccess: true,
      });
      if (usersResult?.docs && Array.isArray(usersResult.docs)) {
        for (const doc of usersResult.docs) {
          if (doc?.email && typeof doc.email === 'string' && doc.email.includes('@')) {
            emailSet.add(doc.email.trim().toLowerCase());
          }
        }
      }
    } catch (err) {
      console.warn('[EMAIL SERVICE] Impossible de récupérer la liste des administrateurs CMS:', err);
    }

    try {
      const settings: any = await payload.findGlobal({
        slug: 'site-settings',
        overrideAccess: true,
      });
      if (settings?.contact?.email && typeof settings.contact.email === 'string' && settings.contact.email.includes('@')) {
        emailSet.add(settings.contact.email.trim().toLowerCase());
      }
      if (settings?.emailConfig?.adminEmails && typeof settings.emailConfig.adminEmails === 'string') {
        settings.emailConfig.adminEmails
          .split(',')
          .map((e: string) => e.trim().toLowerCase())
          .filter((e: string) => e && e.includes('@'))
          .forEach((e: string) => emailSet.add(e));
      }
    } catch {
      // Ignore if global is unavailable
    }
  }

  return Array.from(emailSet);
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
  const formattedSummary = params.summary
    ? escapeHtml(params.summary).replace(/\n/g, '<br/>')
    : '';

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
                    ? `<div style="font-size: 12px; color: #64748b; font-family: monospace; margin-bottom: 10px;">Réf: #${escapeHtml(params.referenceId)}</div>`
                    : ''
                }
                ${
                  formattedSummary
                    ? `<div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 13px; line-height: 1.6; color: #cbd5e1;">
                        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: 700; margin-bottom: 6px;">Résumé de votre demande :</div>
                        ${formattedSummary}
                      </div>`
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
                NOB TECHNOLOGIES — Solutions Informatiques, Télécoms & Cybersécurité
              </div>
              <div style="font-size: 11px; color: #475569;">
                contact@nobtech.fr • +221 77 301 08 38 / +221 33 814 04 35 • Dakar, Sénégal • &copy; ${currentYear} Tous droits réservés.
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

export interface AdminNotificationParams {
  formType?: string;
  referenceId?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  fields?: Array<{ label: string; value?: string | null }>;
}

/**
 * High-end branded HTML summary template sent to all administrators whenever a form is submitted.
 */
export function generateAdminNotificationHtml(params: AdminNotificationParams) {
  const currentYear = new Date().getFullYear();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nob-technologies-7l3h.vercel.app').replace(/\/$/, '');
  const adminUrl = params.referenceId
    ? `${siteUrl}/admin/collections/contact-messages/${encodeURIComponent(params.referenceId)}`
    : `${siteUrl}/admin/collections/contact-messages`;

  const submittedAt = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Africa/Dakar',
  }).format(new Date());

  const cleanPhoneDigits = params.phone ? params.phone.replace(/[^\d+]/g, '').replace(/^\+/, '') : '';
  const whatsappUrl = cleanPhoneDigits ? `https://wa.me/${cleanPhoneDigits}` : null;

  const validExtraFields = (params.fields || []).filter(
    (f) => f.value && String(f.value).trim().length > 0
  );

  const extraFieldsRowsHtml = validExtraFields
    .map(
      (f) => `
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; width: 38%;">
          ${escapeHtml(f.label)}
        </td>
        <td style="padding: 10px 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; font-weight: 600; color: #f8fafc;">
          ${escapeHtml(String(f.value))}
        </td>
      </tr>`
    )
    .join('');

  const formattedMessage = escapeHtml(params.message).replace(/\n/g, '<br/>');

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau formulaire soumis - NOB TECHNOLOGIES</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b1120; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b1120; padding: 32px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 640px; background-color: #0f172a; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0A2540 0%, #00B4D8 100%); padding: 28px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="display: inline-block; padding: 4px 12px; background: rgba(11, 17, 32, 0.45); border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 999px; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
                      🔔 ${escapeHtml(params.formType || 'Formulaire Site Web')}
                    </div>
                    <div style="font-size: 22px; font-weight: 800; letter-spacing: -0.4px; color: #ffffff;">
                      Récapitulatif de Soumission
                    </div>
                    <div style="font-size: 12px; color: rgba(255, 255, 255, 0.85); margin-top: 4px;">
                      Reçu le ${escapeHtml(submittedAt)} (Heure de Dakar)
                    </div>
                  </td>
                  ${
                    params.referenceId
                      ? `<td align="right" valign="top">
                          <div style="background: rgba(11, 17, 32, 0.55); padding: 6px 12px; border-radius: 8px; font-family: monospace; font-size: 12px; color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">
                            Réf #${escapeHtml(params.referenceId)}
                          </div>
                        </td>`
                      : ''
                  }
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 30px;">
              <!-- Subject Banner -->
              <div style="background-color: #1e293b; border-left: 4px solid #00B4D8; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #38bdf8; font-weight: 700; margin-bottom: 4px;">
                  Objet de la demande
                </div>
                <div style="font-size: 17px; font-weight: 700; color: #ffffff;">
                  ${escapeHtml(params.subject)}
                </div>
              </div>

              <!-- Section 1: Coordonnées du Contact -->
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #00B4D8; margin-bottom: 10px;">
                1. Coordonnées de l'expéditeur
              </div>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #1e293b; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 10px; overflow: hidden; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; width: 38%;">
                    Nom & Prénom
                  </td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; font-weight: 700; color: #ffffff;">
                    ${escapeHtml(params.name)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8;">
                    Email
                  </td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px;">
                    <a href="mailto:${escapeHtml(params.email)}" style="color: #38bdf8; text-decoration: none; font-weight: 600;">
                      ${escapeHtml(params.email)}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8;">
                    Téléphone / WhatsApp
                  </td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; color: #f8fafc;">
                    ${
                      params.phone
                        ? `<a href="tel:${escapeHtml(params.phone)}" style="color: #f8fafc; text-decoration: none; font-weight: 600;">${escapeHtml(params.phone)}</a>`
                        : '<span style="color: #64748b; font-style: italic;">Non renseigné</span>'
                    }
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8;">
                    Entreprise / Organisation
                  </td>
                  <td style="padding: 10px 14px; font-size: 14px; color: #f8fafc; font-weight: 600;">
                    ${
                      params.company
                        ? escapeHtml(params.company)
                        : '<span style="color: #64748b; font-style: italic; font-weight: 400;">Particulier / Non renseignée</span>'
                    }
                  </td>
                </tr>
              </table>

              <!-- Section 2: Critères & Spécifications du Formulaire (if any) -->
              ${
                validExtraFields.length > 0
                  ? `<div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #00B4D8; margin-bottom: 10px;">
                      2. Informations & Paramètres sélectionnés
                    </div>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #1e293b; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 10px; overflow: hidden; margin-bottom: 24px;">
                      ${extraFieldsRowsHtml}
                    </table>`
                  : ''
              }

              <!-- Section 3: Message / Détails complets -->
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #00B4D8; margin-bottom: 10px;">
                ${validExtraFields.length > 0 ? '3.' : '2.'} Contenu détaillé & Message
              </div>
              <div style="background-color: #1e293b; border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 10px; padding: 18px 20px; font-size: 14px; line-height: 1.7; color: #f1f5f9; margin-bottom: 28px;">
                ${formattedMessage}
              </div>

              <!-- Quick Action Buttons -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 10px;">
                    <a href="mailto:${escapeHtml(params.email)}?subject=${encodeURIComponent('Re: ' + params.subject + ' - NOB TECHNOLOGIES')}" style="display: inline-block; background-color: #00B4D8; color: #0b1120; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 22px; border-radius: 10px; margin: 4px;">
                      ✉️ Répondre par Email
                    </a>
                    ${
                      whatsappUrl
                        ? `<a href="${whatsappUrl}" style="display: inline-block; background-color: #10b981; color: #0b1120; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 22px; border-radius: 10px; margin: 4px;">
                            💬 Contacter sur WhatsApp
                          </a>`
                        : ''
                    }
                    <a href="${adminUrl}" style="display: inline-block; background-color: #1e293b; color: #f8fafc; border: 1px solid rgba(255, 255, 255, 0.15); font-weight: 600; font-size: 13px; text-decoration: none; padding: 12px 22px; border-radius: 10px; margin: 4px;">
                      🖥️ Ouvrir dans le Back-Office
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0b1120; border-top: 1px solid rgba(255, 255, 255, 0.05); padding: 20px 30px; text-align: center;">
              <div style="font-size: 11px; color: #64748b;">
                Notification automatique envoyée aux administrateurs NOB TECHNOLOGIES • &copy; ${currentYear}
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
                NOB TECHNOLOGIES — Réseaux, Télécoms, Cloud & Cybersécurité
              </div>
              <div style="font-size: 11px; color: #475569;">
                contact@nobtech.fr • +221 77 301 08 38 / +221 33 814 04 35 • Dakar, Sénégal • &copy; ${currentYear} Tous droits réservés.
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
