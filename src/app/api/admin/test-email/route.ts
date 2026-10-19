import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, getAdminRecipientEmails, generateAdminNotificationHtml, generateClientAcknowledgmentHtml } from '@/lib/email';
import { getPayloadClient } from '@/lib/payload';

export const dynamic = 'force-dynamic';

function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayloadClient();
    const adminEmails = await getAdminRecipientEmails(payload);

    const testHtml = generateAdminNotificationHtml({
      formType: 'Test de Diagnostic Email',
      name: 'Diagnostic Système NOBTECH',
      email: 'contact@nobtech.fr',
      phone: '+221 77 301 08 38',
      company: 'NOB TECHNOLOGIES',
      subject: 'Test de fonctionnement du service d\'envoi email',
      message: 'Ce message confirme que la liaison SMTP / messagerie vers les administrateurs est 100% opérationnelle.',
      fields: [
        { label: 'Date du test', value: new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Dakar' }) },
        { label: 'Destinataires configurés', value: adminEmails.join(', ') },
      ],
    });

    const result = await sendEmail({
      to: adminEmails.join(', '),
      subject: '[Test NOBTECH] Vérification de l\'envoi des emails aux administrateurs',
      html: testHtml,
    });

    return NextResponse.json({
      success: result.success,
      warning: result.warning,
      messageId: (result as any).messageId,
      message: (result as any).message,
      recipients: adminEmails,
      smtpConfig: {
        host: process.env.SMTP_HOST || 'non-défini',
        port: process.env.SMTP_PORT || 'non-défini',
        user: process.env.SMTP_USER ? `${process.env.SMTP_USER.slice(0, 3)}***` : 'VIDE (non-défini)',
        hasPass: Boolean(process.env.SMTP_PASS),
        hasResendKey: Boolean(process.env.RESEND_API_KEY),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayloadClient();
    const { user } = await payload.auth({ headers: req.headers });

    if (!user) {
      return NextResponse.json({ error: 'Non authentifié. Vous devez être connecté au back-office.' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const templateType = body.templateType || 'diagnostic';
    const recipient = (body.recipient || '').trim() || user.email || 'contact@nobtech.fr';

    // Retrieve settings to read customized email templates
    let emailTemplates: any = {};
    try {
      const siteSettings = await (payload as any).findGlobal({ slug: 'site-settings' });
      emailTemplates = siteSettings?.emailTemplates || {};
    } catch {}

    const currentYear = new Date().getFullYear();
    const currentDateStr = new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Dakar' });
    let subject = '';
    let html = '';

    if (templateType === 'ack') {
      // 1. Accusé de réception
      const templateSubj = emailTemplates.ackEmailSubject || 'Accusé de réception : Nous avons bien reçu votre demande — NOB TECHNOLOGIES';
      subject = `[TEST] ${templateSubj.replace('{{subject}}', 'Audit d\'infrastructure réseau & Cybersécurité')}`;

      const heading = emailTemplates.ackEmailHeading || 'Merci pour votre confiance';
      const mainMsg = emailTemplates.ackEmailMessage || 'Nous accusons bonne réception de votre demande. Nos équipes techniques l\'examinent actuellement avec la plus grande attention. Vous recevrez une réponse sous 24 à 48 heures ouvrées.';
      const helpText = emailTemplates.ackEmailHelpText || 'Une question urgente ? Contactez directement nos équipes au +221 77 301 08 38 ou par e-mail à contact@nobtech.fr.';

      html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0b1120;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#e2e8f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0b1120;padding:36px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:600px;background-color:#0f172a;border:1px solid rgba(255,255,255,0.1);border-radius:16px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.4);">
        <tr>
          <td style="background:linear-gradient(135deg,#0A2540 0%,#00B4D8 100%);padding:32px 28px;text-align:center;">
            <div style="font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">NOB TECHNOLOGIES</div>
            <div style="font-size:12px;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.85);font-weight:600;margin-top:4px;">Excellence & Ingénierie Digitale</div>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 28px;">
            <div style="display:inline-block;padding:5px 12px;background:rgba(0,180,216,0.12);border:1px solid rgba(0,180,216,0.35);border-radius:999px;color:#00B4D8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:20px;">
              ✓ Aperçu du Modèle : Accusé de réception
            </div>
            <h1 style="margin:0 0 12px 0;font-size:20px;font-weight:700;color:#ffffff;">${escapeHtml(heading)}</h1>
            <p style="font-size:14px;color:#94a3b8;line-height:1.6;margin:0 0 20px 0;">Bonjour <strong>${escapeHtml(user.name || 'Cher Client')}</strong>,</p>
            <div style="background-color:#1e293b;border-left:4px solid #00B4D8;padding:16px 18px;border-radius:8px;margin-bottom:22px;">
              <div style="font-size:13px;font-weight:700;color:#38bdf8;margin-bottom:4px;">Objet : Audit d'infrastructure réseau & Cybersécurité</div>
              <div style="font-size:12px;color:#64748b;font-family:monospace;">Réf: #TEST-${Date.now().toString().slice(-6)}</div>
            </div>
            <div style="background-color:#1e293b;border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:18px 20px;font-size:14px;line-height:1.7;color:#f1f5f9;margin-bottom:24px;">
              ${escapeHtml(mainMsg).replace(/\n/g, '<br/>')}
            </div>
            <div style="background:rgba(15,23,42,0.6);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:16px;font-size:13px;color:#94a3b8;margin-bottom:24px;">
              💡 <em>${escapeHtml(helpText)}</em>
            </div>
            <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:16px;">
              <div style="font-size:14px;font-weight:700;color:#ffffff;">L'équipe NOB TECHNOLOGIES</div>
              <div style="font-size:12px;color:#64748b;">Pôle Solutions & Relation Client</div>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background-color:#0b1120;border-top:1px solid rgba(255,255,255,0.05);padding:18px 24px;text-align:center;font-size:11px;color:#64748b;">
            NOB TECHNOLOGIES • contact@nobtech.fr • Dakar, Sénégal • &copy; ${currentYear}
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
    } else if (templateType === 'admission_accepted') {
      // 2. Admission Acceptée
      const formationTitle = 'Parcours Expert Cybersécurité (Cisco + Security+ + NSE 4 + Pentest)';
      const candidateName = user.name || 'Mamadou Diallo';
      const templateSubj = emailTemplates.admissionAcceptedSubject || '🎓 Félicitations ! Votre admission à la formation {{formationTitle}} est validée — NOB TECHNOLOGIES';
      subject = `[TEST] ${templateSubj.replace('{{formationTitle}}', formationTitle).replace('{{candidateName}}', candidateName)}`;

      const customMsg = emailTemplates.admissionAcceptedMessage || 'Nous avons le plaisir de vous informer que votre dossier de candidature a été examiné avec succès par notre comité pédagogique. Votre admission est officiellement validée.';

      html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#0b1120;color:#0f172a;">
  <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 10px 30px rgba(0,0,0,0.15);">
    <div style="background:linear-gradient(135deg,#059669 0%,#0d9488 50%,#0284c7 100%);padding:36px 30px;text-align:center;color:#ffffff;">
      <div style="display:inline-block;background:rgba(255,255,255,0.2);padding:4px 12px;border-radius:999px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:12px;">
        Test Modèle : Admission Validée
      </div>
      <h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.5px;">NOB TECHNOLOGIES</h1>
      <p style="margin:8px 0 0;font-size:13px;opacity:0.95;">Centre d'Excellence & Formation Haute Expertise IT — Dakar</p>
    </div>
    <div style="padding:32px 30px;">
      <p style="font-size:16px;margin:0 0 16px;color:#0f172a;">Bonjour <strong>${escapeHtml(candidateName)}</strong>,</p>
      <div style="font-size:14px;line-height:1.7;color:#334155;margin:0 0 20px;">
        ${escapeHtml(customMsg).replace(/\n/g, '<br/>')}
      </div>
      <div style="background:#f8fafc;border:1px solid #cbd5e1;border-left:4px solid #10b981;border-radius:10px;padding:18px 20px;margin-bottom:24px;">
        <div style="font-size:16px;font-weight:700;color:#0f172a;margin-bottom:6px;">${escapeHtml(formationTitle)}</div>
        <div style="font-size:13px;color:#475569;margin-bottom:4px;"><strong>Session retenue :</strong> Cohorte Prochaine Session 2026</div>
        <div style="font-size:13px;color:#475569;margin-bottom:4px;"><strong>Modalité :</strong> Hybride (Campus Dakar & Virtuel)</div>
        <div style="font-size:13px;color:#475569;"><strong>Statut :</strong> <span style="color:#059669;font-weight:700;">Place Réservée</span></div>
      </div>
      <div style="text-align:center;margin:30px 0 10px;">
        <a href="https://www.nobtech.fr" style="display:inline-block;background:#0284c7;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:14px 28px;border-radius:10px;">
          Accéder au portail NOB TECHNOLOGIES
        </a>
      </div>
    </div>
    <div style="background:#f8fafc;padding:22px 30px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;text-align:center;">
      <p style="margin:0 0 4px;"><strong>NOB TECHNOLOGIES</strong> — Dakar, Sénégal • contact@nobtech.fr</p>
      <p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">&copy; ${currentYear} NOB TECHNOLOGIES. Tous droits réservés.</p>
    </div>
  </div>
</body>
</html>`;
    } else if (templateType === 'admission_declined') {
      // 3. Admission Refusée / Liste d'attente
      const formationTitle = 'Cisco CCNA (200-301) — Réseaux & Commutation';
      const candidateName = user.name || 'Candidat NOBTECH';
      const templateSubj = emailTemplates.admissionDeclinedSubject || 'Mise à jour concernant votre candidature — NOB TECHNOLOGIES';
      subject = `[TEST] ${templateSubj.replace('{{formationTitle}}', formationTitle).replace('{{candidateName}}', candidateName)}`;

      const customMsg = emailTemplates.admissionDeclinedMessage || 'Après analyse attentive de votre dossier et au vu du nombre strictement limité de places par session sur nos infrastructures physiques, nous ne sommes malheureusement pas en mesure de donner une suite favorable à votre admission pour cette cohorte précise. Votre profil reste conservé dans notre base de talents pour les sessions ultérieures.';

      html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#0b1120;color:#0f172a;">
  <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 10px 30px rgba(0,0,0,0.15);">
    <div style="background:linear-gradient(135deg,#334155 0%,#1e293b 100%);padding:32px 30px;text-align:center;color:#ffffff;">
      <div style="display:inline-block;background:rgba(255,255,255,0.2);padding:4px 12px;border-radius:999px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">
        Test Modèle : Liste d'attente / Report
      </div>
      <h1 style="margin:0;font-size:24px;font-weight:800;letter-spacing:-0.5px;">NOB TECHNOLOGIES</h1>
      <p style="margin:6px 0 0;font-size:13px;opacity:0.9;text-transform:uppercase;letter-spacing:1px;">Comité Pédagogique des Formations</p>
    </div>
    <div style="padding:32px 30px;">
      <p style="font-size:15px;margin:0 0 16px;color:#0f172a;">Bonjour <strong>${escapeHtml(candidateName)}</strong>,</p>
      <div style="font-size:14px;line-height:1.7;color:#334155;margin:0 0 20px;">
        ${escapeHtml(customMsg).replace(/\n/g, '<br/>')}
      </div>
      <div style="background:#f8fafc;border:1px solid #cbd5e1;border-left:4px solid #64748b;border-radius:10px;padding:16px 18px;margin:20px 0;">
        <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:#475569;margin-bottom:4px;">
          Programme concerné :
        </div>
        <div style="font-size:14px;color:#1e293b;font-weight:600;">
          ${escapeHtml(formationTitle)}
        </div>
      </div>
      <p style="font-size:13px;line-height:1.6;color:#64748b;margin:20px 0 0;">
        Nous vous remercions à nouveau pour l'intérêt que vous portez à NOB TECHNOLOGIES. Nos conseillers se tiennent à votre disposition si vous souhaitez candidater à une session ultérieure.
      </p>
    </div>
    <div style="background:#f8fafc;padding:20px 30px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;text-align:center;">
      &copy; ${currentYear} NOB TECHNOLOGIES • Dakar, Sénégal
    </div>
  </div>
</body>
</html>`;
    } else if (templateType === 'quote') {
      // 4. Devis Commercial Officiel
      const quoteNumber = `DEV-${new Date().getFullYear()}-0089`;
      const templateSubj = emailTemplates.quoteEmailSubject || 'Devis Officiel N° {{quoteNumber}} — NOB TECHNOLOGIES';
      subject = `[TEST] ${templateSubj.replace('{{quoteNumber}}', quoteNumber).replace('{{customerName}}', 'Entreprise Partenaire')}`;

      const customMsg = emailTemplates.quoteEmailMessage || 'Nous avons le plaisir de vous transmettre notre proposition commerciale concernant vos besoins d\'infrastructure et de services IT. Vous trouverez ci-dessous le récapitulatif détaillé ainsi que l\'accès direct au document officiel.';

      html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#f1f5f9;color:#0f172a;">
  <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 10px 25px rgba(0,0,0,0.05);">
    <div style="background:linear-gradient(135deg,#0284C7 0%,#0369A1 100%);padding:32px 28px;text-align:center;color:#ffffff;">
      <div style="display:inline-block;background:rgba(255,255,255,0.2);padding:4px 12px;border-radius:999px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">
        Test Modèle : Devis Commercial
      </div>
      <h1 style="margin:0;font-size:24px;font-weight:800;letter-spacing:-0.5px;">NOB TECHNOLOGIES</h1>
      <p style="margin:6px 0 0;font-size:13px;opacity:0.9;text-transform:uppercase;letter-spacing:1px;">Solutions Informatiques & Télécoms de Pointe</p>
    </div>
    <div style="padding:32px 28px;">
      <p style="font-size:15px;margin:0 0 16px;">Bonjour <strong>Direction Informatique / Client Test</strong>,</p>
      <div style="font-size:14px;line-height:1.6;color:#334155;margin:0 0 24px;">
        ${escapeHtml(customMsg).replace(/\n/g, '<br/>')}
      </div>
      <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:12px;padding:20px;margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:12px;border-bottom:1px solid #e2e8f0;padding-bottom:8px;">
          <span style="font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;">Devis Réf :</span>
          <span style="font-size:13px;font-weight:800;color:#0284c7;">${quoteNumber}</span>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
          <thead>
            <tr style="background:#e2e8f0;">
              <th style="padding:8px 12px;font-size:11px;text-align:left;color:#475569;text-transform:uppercase;">Désignation</th>
              <th style="padding:8px 12px;font-size:11px;text-align:center;color:#475569;text-transform:uppercase;">Qté</th>
              <th style="padding:8px 12px;font-size:11px;text-align:right;color:#475569;text-transform:uppercase;">Montant</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:13px;color:#1e293b;">Audit & Déploiement Baie de Brassage Cat 6A</td>
              <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:13px;text-align:center;color:#64748b;">1</td>
              <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:13px;text-align:right;color:#1e293b;font-weight:600;">1 450 000 FCFA</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:13px;color:#1e293b;">Pare-feu Fortinet FortiGate 60F + Licence UTM 1 An</td>
              <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:13px;text-align:center;color:#64748b;">1</td>
              <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:13px;text-align:right;color:#1e293b;font-weight:600;">980 000 FCFA</td>
            </tr>
          </tbody>
        </table>
        <div style="text-align:right;border-top:2px solid #0284c7;padding-top:12px;">
          <span style="font-size:13px;color:#475569;">Total TTC : </span>
          <span style="font-size:20px;font-weight:900;color:#0f172a;margin-left:8px;">2 430 000 FCFA</span>
        </div>
      </div>
      <div style="text-align:center;margin:30px 0;">
        <a href="https://www.nobtech.fr" target="_blank" style="display:inline-block;background:linear-gradient(135deg,#0284C7,#0369A1);color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:14px 28px;border-radius:10px;">
          Consulter et Télécharger le Devis en PDF
        </a>
      </div>
    </div>
    <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 28px;text-align:center;font-size:12px;color:#64748b;">
      NOB TECHNOLOGIES S.A.R.L • Dakar, Sénégal • Contact : contact@nobtech.fr / +221 77 301 08 38
    </div>
  </div>
</body>
</html>`;
    } else if (templateType === 'admin_notify') {
      // 5. Notification alerte administrateur
      subject = `[TEST] 🚨 Nouvelle candidature reçue : Parcours Expert Cybersécurité`;
      html = generateAdminNotificationHtml({
        formType: 'Candidature Formation (Test Alerte Admin)',
        name: 'Fatou Sow',
        email: 'fatou.sow@example.com',
        phone: '+221 77 856 70 88',
        company: 'Cabinet Conseil Dakar',
        subject: 'Candidature — Parcours Expert Cybersécurité (Session Mai 2026)',
        message: 'Bonjour, je souhaite intégrer la prochaine cohorte pour valider mes certifications Cisco CCNA et Fortinet NSE 4 dans le cadre d\'une montée en compétences réseau de notre équipe.',
        fields: [
          { label: 'Session souhaitée', value: 'Cohorte Mai 2026' },
          { label: 'Format', value: 'Hybride (Soir & Weekend)' },
          { label: 'Niveau technique actuel', value: 'Technicien Réseaux (2 ans exp.)' },
          { label: 'Horaires choisis', value: '18h30 - 21h30 (Mardi & Jeudi) + Samedi matin' },
        ],
      });
    } else {
      // 6. Diagnostic SMTP Standard
      subject = `[Test NOBTECH] Validation réussie de vos paramètres SMTP`;
      html = generateAdminNotificationHtml({
        formType: 'Test de Validation SMTP (Back-Office)',
        name: user.name || 'Administrateur NOBTECH',
        email: user.email,
        phone: '+221 77 301 08 38',
        company: 'NOB TECHNOLOGIES',
        subject: 'Confirmation de fonctionnement du serveur SMTP',
        message: 'Ce message confirme que la liaison SMTP configurée dans les paramètres du Back-Office NOBTECH est opérationnelle.',
        fields: [
          { label: 'Date et heure', value: currentDateStr },
          { label: 'Destinataire testé', value: recipient },
          { label: 'Déclenché par', value: `${user.name || user.email} (${user.email})` },
        ],
      });
    }

    const result = await sendEmail({
      to: recipient,
      subject,
      html,
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `E-mail de test (${templateType}) envoyé avec succès à ${recipient} !`,
        messageId: (result as any).messageId,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: (result as any).message || 'Échec de l\'envoi de l\'email de test.',
          warning: (result as any).warning,
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
