import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { sendEmail } from '@/lib/email';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  try {
    const payload = await getPayloadClient();
    const reqHeaders = await headers();

    // 1. Authenticate admin user
    const { user } = await payload.auth({ headers: reqHeaders });
    if (!user) {
      return NextResponse.json(
        { error: 'Non autorisé. Veuillez vous connecter au back-office pour effectuer cette action.' },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { admissionId, decision, adminFeedback } = body;

    if (!admissionId || !decision) {
      return NextResponse.json(
        { error: 'Paramètres manquants : admissionId et decision sont requis.' },
        { status: 400 }
      );
    }

    if (decision !== 'accepted' && decision !== 'declined') {
      return NextResponse.json(
        { error: 'Décision invalide. Les valeurs possibles sont "accepted" ou "declined".' },
        { status: 400 }
      );
    }

    // 2. Retrieve admission record
    const admission = (await (payload as any).findByID({
      collection: 'admissions',
      id: admissionId,
    })) as any;

    if (!admission) {
      return NextResponse.json(
        { error: 'Dossier de candidature introuvable.' },
        { status: 404 }
      );
    }

    if (!admission.email || !admission.email.includes('@')) {
      return NextResponse.json(
        { error: "L'adresse email du candidat est manquante ou invalide." },
        { status: 400 }
      );
    }

    const candidateName = admission.candidateName || 'Candidat';
    const formationTitle = admission.formationTitle || 'Formation NOB TECHNOLOGIES';
    const targetSession = admission.targetSession || 'Prochaine session';
    const format = admission.format || 'Hybride (Présentiel Dakar & En Ligne)';
    const schedule = admission.preferredSchedule || 'Horaires définis selon la cohorte';
    const currentYear = new Date().getFullYear();

    // 3. Prepare Corporate HTML Email
    let subject = '';
    let emailHtml = '';

    if (decision === 'accepted') {
      subject = `🎓 Félicitations ! Votre admission à la formation ${formationTitle} est validée — NOB TECHNOLOGIES`;
      emailHtml = `
      <!DOCTYPE html>
      <html lang="fr">
      <head><meta charset="utf-8"></head>
      <body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b1120; color: #0f172a;">
        <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
          
          <!-- BANNER HEADER -->
          <div style="background: linear-gradient(135deg, #059669 0%, #0d9488 50%, #0284c7 100%); padding: 36px 30px; text-align: center; color: #ffffff;">
            <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px;">
              Admission Officielle Validée
            </div>
            <h1 style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">NOB TECHNOLOGIES</h1>
            <p style="margin: 8px 0 0; font-size: 13px; opacity: 0.95; letter-spacing: 0.5px;">Centre d'Excellence &amp; Formation Haute Expertise IT — Dakar</p>
          </div>

          <!-- BODY -->
          <div style="padding: 32px 30px;">
            <p style="font-size: 16px; margin: 0 0 16px; color: #0f172a;">Bonjour <strong>${candidateName}</strong>,</p>
            
            <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0 0 20px;">
              Nous avons le plaisir de vous informer que votre dossier de candidature a été examiné avec succès par notre comité pédagogique. <strong>Votre admission est officiellement validée</strong> pour le programme d'excellence suivant :
            </p>

            <!-- FORMATION HIGHLIGHT CARD -->
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 4px solid #10b981; border-radius: 10px; padding: 18px 20px; margin-bottom: 24px;">
              <div style="font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 6px;">
                ${formationTitle}
              </div>
              <div style="font-size: 13px; color: #475569; margin-bottom: 4px;">
                <strong>Session retenue :</strong> ${targetSession}
              </div>
              <div style="font-size: 13px; color: #475569; margin-bottom: 4px;">
                <strong>Modalité :</strong> ${format}
              </div>
              <div style="font-size: 13px; color: #475569;">
                <strong>Horaires :</strong> ${schedule}
              </div>
            </div>

            ${
              adminFeedback
                ? `
            <!-- NOTE PERSONNALISEE DES FORMATEURS -->
            <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px; padding: 16px 18px; margin-bottom: 24px;">
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #047857; margin-bottom: 4px;">
                Message personnalisé de l'équipe pédagogique :
              </div>
              <div style="font-size: 13px; color: #065f46; line-height: 1.5; white-space: pre-line;">
                ${adminFeedback}
              </div>
            </div>
            `
                : ''
            }

            <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0f172a; margin: 24px 0 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
              Prochaines étapes de votre intégration :
            </h3>

            <ol style="font-size: 13px; line-height: 1.7; color: #334155; margin: 0 0 24px; padding-left: 20px;">
              <li><strong>Finalisation administrative :</strong> Notre responsable pédagogique prendra contact avec vous sous 24h par téléphone / WhatsApp pour finaliser les modalités d'inscription et de règlement.</li>
              <li><strong>Accès aux plateformes :</strong> Dès validation, vous recevrez vos identifiants pour nos laboratoires virtuels et l'accès aux simulateurs d'examens officiels.</li>
              <li><strong>Démarrage de la cohorte :</strong> Une réunion d'accueil et d'orientation sera organisée quelques jours avant le lancement de la session.</li>
            </ol>

            <div style="text-align: center; margin: 30px 0 10px;">
              <a href="https://www.nobtech.fr" style="display: inline-block; background: #0284c7; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 28px; border-radius: 10px; box-shadow: 0 4px 12px rgba(2,132,199,0.3);">
                Accéder au portail NOB TECHNOLOGIES
              </a>
            </div>
          </div>

          <!-- FOOTER -->
          <div style="background: #f8fafc; padding: 22px 30px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; line-height: 1.5; text-align: center;">
            <p style="margin: 0 0 4px;"><strong>NOB TECHNOLOGIES</strong> — Dakar, Sénégal</p>
            <p style="margin: 0 0 4px;">Téléphone / WhatsApp : <a href="tel:+221774138586" style="color: #0284c7; text-decoration: none;">+221 77 413 85 86</a> | Email : <a href="mailto:contact@nobtech.fr" style="color: #0284c7; text-decoration: none;">contact@nobtech.fr</a></p>
            <p style="margin: 6px 0 0; font-size: 11px; color: #94a3b8;">&copy; ${currentYear} NOB TECHNOLOGIES. Tous droits réservés.</p>
          </div>

        </div>
      </body>
      </html>
      `;
    } else {
      subject = `Mise à jour concernant votre candidature — NOB TECHNOLOGIES`;
      emailHtml = `
      <!DOCTYPE html>
      <html lang="fr">
      <head><meta charset="utf-8"></head>
      <body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b1120; color: #0f172a;">
        <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
          
          <!-- BANNER HEADER -->
          <div style="background: linear-gradient(135deg, #334155 0%, #1e293b 100%); padding: 32px 30px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">NOB TECHNOLOGIES</h1>
            <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px;">Comité Pédagogique des Formations</p>
          </div>

          <!-- BODY -->
          <div style="padding: 32px 30px;">
            <p style="font-size: 15px; margin: 0 0 16px; color: #0f172a;">Bonjour <strong>${candidateName}</strong>,</p>
            
            <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0 0 18px;">
              Nous vous remercions sincèrement pour l'intérêt que vous portez aux programmes de perfectionnement technique de <strong>NOB TECHNOLOGIES</strong> et pour votre candidature à la formation <strong>${formationTitle}</strong> (${targetSession}).
            </p>

            <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0 0 18px;">
              Après analyse attentive de votre dossier et au vu du nombre strictement limité de places par session sur nos infrastructures physiques, nous ne sommes malheureusement pas en mesure de donner une suite favorable à votre admission pour cette cohorte précise.
            </p>

            ${
              adminFeedback
                ? `
            <!-- RETOUR DU JURY -->
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 4px solid #64748b; border-radius: 10px; padding: 16px 18px; margin: 20px 0;">
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #475569; margin-bottom: 4px;">
                Recommandation de l'équipe pédagogique :
              </div>
              <div style="font-size: 13px; color: #334155; line-height: 1.5; white-space: pre-line;">
                ${adminFeedback}
              </div>
            </div>
            `
                : ''
            }

            <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0 0 20px;">
              Cette décision ne remet nullement en question la qualité de votre parcours. Votre profil reste conservé dans notre base de talents pour les sessions ultérieures ou pour des parcours préparatoires plus adaptés.
            </p>

            <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0 0 24px;">
              Nos conseillers restent à votre entière disposition pour vous orienter vers les prérequis techniques recommandés ou discuter des prochaines ouvertures de sessions.
            </p>

            <div style="background: #f1f5f9; border-radius: 10px; padding: 16px; text-align: center; font-size: 13px; color: #475569;">
              Besoin de faire le point ? Contactez nos coordinateurs au <strong style="color: #0284c7;">+221 77 413 85 86</strong> ou par email à <a href="mailto:contact@nobtech.fr" style="color: #0284c7; text-decoration: none; font-weight: 600;">contact@nobtech.fr</a>.
            </div>
          </div>

          <!-- FOOTER -->
          <div style="background: #f8fafc; padding: 20px 30px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; line-height: 1.5; text-align: center;">
            <p style="margin: 0 0 4px;"><strong>NOB TECHNOLOGIES</strong> — Dakar, Sénégal</p>
            <p style="margin: 0;">&copy; ${currentYear} NOB TECHNOLOGIES. Tous droits réservés.</p>
          </div>

        </div>
      </body>
      </html>
      `;
    }

    // 4. Send official decision email to applicant
    let emailResult: any = { success: false };
    try {
      emailResult = await sendEmail({
        to: admission.email,
        subject,
        html: emailHtml,
        replyTo: 'contact@nobtech.fr',
      });
      console.log(`[ADMISSION DECISION] Email envoyé à ${admission.email} pour la décision : ${decision}`);
    } catch (emailErr) {
      console.error(`[ADMISSION DECISION] Erreur lors de l'envoi de l'email à ${admission.email}:`, emailErr);
    }

    // 5. Update admission record in Payload CMS
    const nowIso = new Date().toISOString();
    const reviewerName = `${user.name || user.email} (${user.role || 'Admin'})`;

    await (payload as any).update({
      collection: 'admissions',
      id: admissionId,
      data: {
        status: decision,
        decisionDate: nowIso,
        emailSentAt: nowIso,
        adminFeedback: adminFeedback || admission.adminFeedback || '',
        reviewedBy: reviewerName,
      },
    });

    // 6. Log admin activity in activity-logs
    try {
      await (payload as any).create({
        collection: 'activity-logs',
        data: {
          user: user.id,
          action: `Décision d'admission (${decision === 'accepted' ? 'Validée' : 'Déclinée'})`,
          details: `Décision d'admission "${decision === 'accepted' ? 'Validée' : 'Déclinée'}" pour ${candidateName} (${formationTitle}) enregistrée par ${user.email}. Réf admission: ${admissionId}.`,
        },
      });
    } catch {
      // Non-blocking log error
    }

    return NextResponse.json({
      success: true,
      decision,
      candidateEmail: admission.email,
      emailSent: emailResult.success !== false,
      message:
        decision === 'accepted'
          ? `L'admission de ${candidateName} a été validée avec succès. L'email de confirmation a été envoyé.`
          : `La candidature de ${candidateName} a été déclinée. L'email de notification a été envoyé.`,
    });
  } catch (error: any) {
    console.error('[ADMISSION DECISION ERROR]:', error);
    return NextResponse.json(
      { error: error?.message || 'Erreur interne lors du traitement de la décision.' },
      { status: 500 }
    );
  }
}
