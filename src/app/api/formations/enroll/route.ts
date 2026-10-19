import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { sendEmail, getAdminRecipientEmails, resolveEmailTemplates } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      candidateName,
      email,
      phone,
      formationTitle,
      formationSlug,
      targetSession,
      preferredSchedule,
      currentLevel,
      currentStatus,
      format,
      motivation,
      captcha_a,
      captcha_b,
      captcha_answer,
    } = body;

    // 1. Anti-spam Captcha validation
    if (
      captcha_a !== undefined &&
      captcha_b !== undefined &&
      Number(captcha_answer) !== Number(captcha_a) + Number(captcha_b)
    ) {
      return NextResponse.json(
        { error: 'Réponse au calcul de sécurité anti-spam incorrecte. Veuillez réessayer.' },
        { status: 400 }
      );
    }

    // 2. Required fields validation
    if (!candidateName?.trim() || !email?.trim() || !phone?.trim() || !formationTitle?.trim()) {
      return NextResponse.json(
        { error: 'Veuillez renseigner tous les champs obligatoires (Nom, Email, Téléphone, Formation).' },
        { status: 400 }
      );
    }

    const payload = await getPayloadClient();

    // 3. Create document in Admissions collection
    const admissionData: any = {
      candidateName: candidateName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      formationTitle: formationTitle.trim(),
      formationSlug: (formationSlug || '').trim(),
      targetSession: (targetSession || 'Prochaine session').trim(),
      preferredSchedule: (preferredSchedule || 'Cours du soir').trim(),
      currentLevel: (currentLevel || 'Intermédiaire').trim(),
      currentStatus: (currentStatus || 'En activité / Étudiant').trim(),
      format: (format || 'Hybride').trim(),
      motivation: (motivation || '').trim(),
      status: 'pending',
    };

    const newAdmission = await (payload as any).create({
      collection: 'admissions',
      data: admissionData,
    });

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.nobtech.fr';
    const backOfficeAdmissionUrl = `${origin}/admin/collections/admissions/${newAdmission.id}`;
    const currentYear = new Date().getFullYear();

    // 4. Send Immediate Notification Email to Admins (contact@nobtech.fr, rolva.iqra@gmail.com, etc.)
    try {
      const adminEmails = await getAdminRecipientEmails(payload);

      const adminEmailHtml = `
      <!DOCTYPE html>
      <html lang="fr">
      <head><meta charset="utf-8"></head>
      <body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b1120; color: #0f172a;">
        <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
          
          <!-- BANNER HEADER -->
          <div style="background: linear-gradient(135deg, #0284C7 0%, #0369A1 100%); padding: 30px; text-align: center; color: #ffffff;">
            <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px;">
              Nouvelle Candidature Reçue
            </div>
            <h1 style="margin: 0; font-size: 24px; font-weight: 800;">NOB TECHNOLOGIES — Back-Office</h1>
            <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.9;">Dossier d'inscription candidat à examiner</p>
          </div>

          <!-- BODY -->
          <div style="padding: 28px 30px;">
            <div style="margin-bottom: 20px;">
              <span style="font-size: 18px; font-weight: 800; color: #0284c7;">
                ${candidateName}
              </span>
              <div style="font-size: 13px; color: #64748b; margin-top: 2px;">
                Candidat pour la formation : <strong>${formationTitle}</strong>
              </div>
            </div>

            <!-- TABLE OF DETAILS -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
              <tbody>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 9px 0; color: #64748b; width: 40%; font-weight: 600;">Formation demandée :</td>
                  <td style="padding: 9px 0; color: #0f172a; font-weight: 700;">${formationTitle}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 9px 0; color: #64748b; font-weight: 600;">Session / Rentrée :</td>
                  <td style="padding: 9px 0; color: #0284c7; font-weight: 700;">${targetSession}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 9px 0; color: #64748b; font-weight: 600;">Email :</td>
                  <td style="padding: 9px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 9px 0; color: #64748b; font-weight: 600;">Téléphone / WhatsApp :</td>
                  <td style="padding: 9px 0; color: #0f172a; font-weight: 700;"><a href="tel:${phone}" style="color: #059669; text-decoration: none;">${phone}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 9px 0; color: #64748b; font-weight: 600;">Horaires préférés :</td>
                  <td style="padding: 9px 0; color: #0f172a;">${preferredSchedule}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 9px 0; color: #64748b; font-weight: 600;">Profil / Situation :</td>
                  <td style="padding: 9px 0; color: #0f172a;">${currentStatus} (${currentLevel})</td>
                </tr>
              </tbody>
            </table>

            ${
              motivation
                ? `
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; margin-bottom: 24px;">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 6px;">
                Projet &amp; Motivation du candidat :
              </div>
              <div style="font-size: 13px; color: #334155; line-height: 1.5; white-space: pre-line;">
                ${motivation}
              </div>
            </div>
            `
                : ''
            }

            <!-- 1-CLICK ACTION BUTTON IN BACK-OFFICE -->
            <div style="text-align: center; margin: 26px 0 10px;">
              <a href="${backOfficeAdmissionUrl}" style="display: inline-block; background: #059669; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 28px; border-radius: 10px; box-shadow: 0 4px 14px rgba(5,150,105,0.3);">
                Examiner &bull; Valider ou Décliner en 1 clic
              </a>
            </div>
          </div>

          <!-- FOOTER -->
          <div style="background: #f8fafc; padding: 18px 30px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
            Système d'admission automatisé NOB TECHNOLOGIES &bull; &copy; ${currentYear}
          </div>

        </div>
      </body>
      </html>
      `;

      await sendEmail({
        to: adminEmails.join(', '),
        subject: `🎓 Nouvelle Candidature Formation : ${candidateName} — ${formationTitle}`,
        html: adminEmailHtml,
        replyTo: email,
      });
      console.log(`[ENROLLMENT API] Email notification envoyé aux administrateurs (${adminEmails.join(', ')}).`);
    } catch (adminEmailErr) {
      console.error('[ENROLLMENT API] Erreur envoi email administrateurs:', adminEmailErr);
    }

    // 5. Send Immediate Confirmation / Receipt Email to Candidate
    try {
      const templates = await resolveEmailTemplates(payload);
      const ackHeading = templates.ackEmailHeading || 'Accusé de Réception de Candidature';
      const ackMessage = templates.ackEmailMessage
        ? templates.ackEmailMessage.replace(/\n/g, '<br/>')
        : 'Notre équipe pédagogique examine actuellement les places disponibles et votre profil technique. <strong>Vous recevrez un email officiel sous 24 à 48 heures</strong> vous confirmant la décision d\'admission ainsi que les modalités de rentrée.';
      const ackHelp = templates.ackEmailHelpText || 'En cas de question urgente ou pour planifier un entretien téléphonique direct avec un instructeur, nos équipes sont joignables au <strong style="color: #0284c7;">+221 77 301 08 38</strong>.';

      const candidateSubject = templates.ackEmailSubject
        ? templates.ackEmailSubject.replace(/\{\{subject\}\}/g, `Dossier d'admission ${formationTitle}`)
        : `Confirmation de réception de votre dossier d'admission — NOB TECHNOLOGIES`;

      const candidateReceiptHtml = `
      <!DOCTYPE html>
      <html lang="fr">
      <head><meta charset="utf-8"></head>
      <body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b1120; color: #0f172a;">
        <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
          
          <!-- BANNER HEADER -->
          <div style="background: linear-gradient(135deg, #0284C7 0%, #0369A1 100%); padding: 32px 30px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">NOB TECHNOLOGIES</h1>
            <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px;">${ackHeading}</p>
          </div>

          <!-- BODY -->
          <div style="padding: 30px;">
            <p style="font-size: 15px; margin: 0 0 16px; color: #0f172a;">Bonjour <strong>${candidateName}</strong>,</p>
            
            <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0 0 20px;">
              Nous confirmons la bonne réception de votre dossier de candidature pour la formation <strong>${formationTitle}</strong> (${targetSession}).
            </p>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 4px solid #0284c7; border-radius: 10px; padding: 16px 18px; margin-bottom: 22px;">
              <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">
                Récapitulatif de votre demande :
              </div>
              <div style="font-size: 13px; color: #475569; margin-bottom: 3px;">
                <strong>Programme :</strong> ${formationTitle}
              </div>
              <div style="font-size: 13px; color: #475569; margin-bottom: 3px;">
                <strong>Session demandée :</strong> ${targetSession}
              </div>
              <div style="font-size: 13px; color: #475569;">
                <strong>Créneau :</strong> ${preferredSchedule}
              </div>
            </div>

            <div style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0 0 16px;">
              ${ackMessage}
            </div>

            <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0 0 24px;">
              ${ackHelp}
            </p>

            <div style="text-align: center; margin: 20px 0 10px;">
              <a href="https://www.nobtech.fr" style="display: inline-block; background: #0284c7; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 10px;">
                Découvrir nos solutions &amp; réalisations
              </a>
            </div>
          </div>

          <!-- FOOTER -->
          <div style="background: #f8fafc; padding: 18px 30px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
            <p style="margin: 0 0 4px;"><strong>NOB TECHNOLOGIES</strong> — Dakar, Sénégal</p>
            <p style="margin: 0;">&copy; ${currentYear} NOB TECHNOLOGIES. Tous droits réservés.</p>
          </div>

        </div>
      </body>
      </html>
      `;

      await sendEmail({
        to: email,
        subject: candidateSubject,
        html: candidateReceiptHtml,
        replyTo: 'contact@nobtech.fr',
      });
      console.log(`[ENROLLMENT API] Accusé de réception envoyé au candidat ${email}.`);
    } catch (candidateEmailErr) {
      console.error('[ENROLLMENT API] Erreur envoi accusé candidat:', candidateEmailErr);
    }

    // 6. Activity log
    try {
      await (payload as any).create({
        collection: 'activity-logs',
        data: {
          action: 'Candidature reçue',
          details: `Nouvelle candidature d'admission reçue : ${candidateName} pour ${formationTitle} (${targetSession}). Réf: ${newAdmission.id}.`,
        },
      });
    } catch {
      // Non-blocking
    }

    return NextResponse.json({
      success: true,
      admissionId: newAdmission.id,
      message: 'Votre candidature a été transmise avec succès ! Un email de confirmation vous a été envoyé.',
    });
  } catch (error: any) {
    console.error('[ENROLLMENT API ERROR]:', error);
    return NextResponse.json(
      { error: error?.message || "Une erreur est survenue lors de l'enregistrement de votre candidature." },
      { status: 500 }
    );
  }
}
