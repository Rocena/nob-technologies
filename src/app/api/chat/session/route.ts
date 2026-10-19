import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import {
  sendEmail,
  getAdminRecipientEmails,
  generateAdminNotificationHtml,
  generateClientAcknowledgmentHtml,
} from '@/lib/email';
import { saveLearnedPattern } from '@/lib/chat-learner';

interface ChatTranscriptMessage {
  id?: string;
  role: 'bot' | 'user';
  text: string;
  time: string;
}

interface SessionVisitor {
  name: string;
  email: string;
  phone: string;
  company?: string;
}

interface ConversationAnalysis {
  isSerious: boolean;
  qualificationLabel: string;
  detectedTopics: string[];
  detectedVolumeOrContext: string[];
  clientKeyPoints: string[];
  executiveSummaryText: string;
}

function analyzeSeriousConversation(
  messages: ChatTranscriptMessage[],
  visitor: SessionVisitor
): ConversationAnalysis {
  const userMessages = (messages || []).filter((m) => m.role === 'user');
  const combinedUserText = userMessages.map((m) => m.text).join(' \n ');
  const normalized = combinedUserText
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // Filter out pure greetings or single-word trivial messages
  const substantiveMessages = userMessages.filter((m) => {
    const clean = m.text
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    if (clean.length < 4) return false;
    if (
      /^(bonjour|salut|bonsoir|hello|coucou|yo|bjr|merci|ok|d'accord|super|top|parfait|oui|non|nanga def|salaam|salam)[.!?\s]*$/i.test(
        clean
      )
    ) {
      return false;
    }
    if (/(blague|pizza|burger|meteo|football)/i.test(clean) && clean.length < 45) {
      return false;
    }
    return true;
  });

  const detectedTopics: string[] = [];

  if (/(devis|prix|tarif|cout|budget|combien|chiffr|factur|offre|proposition)/i.test(normalized)) {
    detectedTopics.push('Demande de Devis / Chiffrage');
  }
  if (
    /(cyber|securite|firewall|pare-?feu|sophos|fortinet|fortigate|acronis|wallix|ransomware|pentest|intrusion|audit|antivirus)/i.test(
      normalized
    )
  ) {
    detectedTopics.push('Cybersécurité & Pare-feux');
  }
  if (
    /(reseau|cablage|baie|42u|brassage|fibre|wifi|wi-?fi|switch|routeur|cisco|aruba|voip|telephonie|fluke)/i.test(
      normalized
    )
  ) {
    detectedTopics.push('Réseaux, Câblage & Infrastructure');
  }
  if (
    /(erp|odoo|dolibarr|logiciel|gestion|stock|comptabilite|crm|rh|site web|site internet|application|mobile|flutter|digital)/i.test(
      normalized
    )
  ) {
    detectedTopics.push('ERP, Logiciels & Développement');
  }
  if (
    /(formation|certif|ccna|nse|power bi|phishing|ethical|hacking|iso 27001|nist|cours|apprendre|programme)/i.test(
      normalized
    )
  ) {
    detectedTopics.push('Formations & Certifications');
  }
  if (/(serveur|dell|poweredge|materiel|ordinateur|pc|onduleur|licence|microsoft 365|achat|acheter)/i.test(normalized)) {
    detectedTopics.push('Matériel Informatique & Licences');
  }
  if (/(urgence|urgent|panne|bloque|sos|incident|coupure|astreinte|maintenance|infogerance)/i.test(normalized)) {
    detectedTopics.push('Support Technique / Urgence / Infogérance');
  }
  if (/(rendez-?vous|rdv|visite|locaux|bureaux|appeler|rappeler|contact|whatsapp)/i.test(normalized)) {
    detectedTopics.push('Prise de Rendez-vous / Contact Ingénieur');
  }

  // Extract volume / sizing mentions (e.g., "20 postes", "50 utilisateurs", "nouveaux locaux")
  const detectedVolumeOrContext: string[] = [];
  const volumeMatches = combinedUserText.match(
    /(?:moins de \d+|entre \d+ et \d+|plus de \d+|\d+)\s*(?:postes|ordinateurs|pc|utilisateurs|employés|salaries|personnes|prises|bureaux|salles)/gi
  );
  if (volumeMatches) {
    detectedVolumeOrContext.push(...volumeMatches.map((v) => v.trim()));
  }
  if (/nouveau[x]?\s+(?:locaux|bureaux|batiment|siege)/i.test(normalized)) {
    detectedVolumeOrContext.push('Nouveaux locaux / bureaux à équiper');
  }

  // A conversation is considered serious if at least 1 business topic is detected
  // OR if the user sent at least 1 substantive message (> 12 chars) with real content
  const isSerious =
    detectedTopics.length > 0 ||
    substantiveMessages.some((m) => m.text.trim().length >= 12) ||
    substantiveMessages.length >= 2;

  let qualificationLabel = '💬 Échange d\'information';
  if (detectedTopics.includes('Support Technique / Urgence / Infogérance')) {
    qualificationLabel = '🚨 URGENCE / Support Technique Critique';
  } else if (detectedTopics.includes('Demande de Devis / Chiffrage')) {
    qualificationLabel = '🔥 Prospect Chaud — Demande de Devis';
  } else if (detectedTopics.includes('Formations & Certifications')) {
    qualificationLabel = '🎓 Candidat / Demande de Formation';
  } else if (detectedTopics.length > 0) {
    qualificationLabel = `💼 Projet Qualifié (${detectedTopics[0]})`;
  } else if (isSerious) {
    qualificationLabel = '💼 Conversation Sérieuse avec Koffi';
  }

  const clientKeyPoints = substantiveMessages.map((m) => `• "${m.text.trim()}" (${m.time})`);

  const summaryLines = [
    `📌 SYNTHÈSE EXÉCUTIVE DE LA CONVERSATION`,
    `• Qualification : ${qualificationLabel}`,
    `• Interlocuteur : ${visitor.name}${visitor.company ? ` — Entreprise : ${visitor.company}` : ''}`,
    `• Contact direct : ${visitor.phone || 'Non renseigné'} | ${visitor.email}`,
    detectedTopics.length > 0
      ? `• Sujets & Expertises abordés : ${detectedTopics.join(', ')}`
      : `• Sujet : Renseignement général`,
    detectedVolumeOrContext.length > 0
      ? `• Envergure / Contexte détecté : ${detectedVolumeOrContext.join(', ')}`
      : null,
    ``,
    `🗣️ DEMANDES EXPRIMÉES PAR LE CLIENT :`,
    ...(clientKeyPoints.length > 0
      ? clientKeyPoints
      : userMessages.map((m) => `• "${m.text.trim()}" (${m.time})`)),
  ].filter((line): line is string => line !== null);

  return {
    isSerious,
    qualificationLabel,
    detectedTopics,
    detectedVolumeOrContext,
    clientKeyPoints,
    executiveSummaryText: summaryLines.join('\n'),
  };
}

function formatTranscript(messages: ChatTranscriptMessage[], visitorName: string): string {
  if (!Array.isArray(messages) || messages.length === 0) {
    return 'Aucun message échangé.';
  }
  return messages
    .map((m) => {
      const speaker = m.role === 'user' ? visitorName || 'Visiteur' : 'Koffi (Conseiller virtuel NOBTECH)';
      return `[${m.time || '--:--'}] ${speaker} :\n${m.text}`;
    })
    .join('\n\n----------------------------------------\n\n');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      action, // 'sync' | 'summary' | 'end'
      sessionId,
      contactMessageId,
      visitor,
      messages,
      rating,
      notifyAdminsNow,
    }: {
      action: 'sync' | 'summary' | 'end';
      sessionId: string;
      contactMessageId?: string | number | null;
      visitor: SessionVisitor;
      messages: ChatTranscriptMessage[];
      rating?: number | null;
      notifyAdminsNow?: boolean;
    } = body;

    const cleanSessionId = (sessionId || `SES-${Date.now().toString(36).toUpperCase()}`).trim();
    const cleanName = (visitor?.name || 'Visiteur en ligne').trim();
    const cleanEmail = (
      visitor?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(visitor.email.trim())
        ? visitor.email.trim()
        : `visiteur-${cleanSessionId.toLowerCase()}@nobtech.fr`
    );
    const cleanPhone = (visitor?.phone || '').trim();
    const cleanCompany = (visitor?.company || '').trim();

    const userMessages = Array.isArray(messages)
      ? messages.filter((m) => m.role === 'user')
      : [];

    // Analyze conversation seriousness & build executive summary
    const analysis = analyzeSeriousConversation(messages || [], {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      company: cleanCompany,
    });

    const statusLabel =
      action === 'end'
        ? 'Session clôturée'
        : action === 'summary'
          ? 'Conversation sérieuse qualifiée'
          : 'Session en cours';
    const ratingStr = rating ? `${'⭐'.repeat(rating)} (${rating}/5)` : undefined;

    const transcriptText = formatTranscript(messages || [], cleanName);

    const fullRecordMessage = [
      analysis.executiveSummaryText,
      ratingStr ? `\n⭐ Évaluation client : ${ratingStr}` : null,
      ``,
      `========================================`,
      `📜 TRANSCRIPTION HORODATÉE COMPLÈTE (#${cleanSessionId})`,
      `========================================`,
      transcriptText,
    ]
      .filter(Boolean)
      .join('\n');

    const mainTopicShort =
      analysis.detectedTopics.length > 0
        ? analysis.detectedTopics[0]
        : userMessages.length > 0
          ? userMessages[0].text.slice(0, 50)
          : 'Session Chat';

    const subjectLine = `[Chat #${cleanSessionId}] ${cleanName}${cleanCompany ? ` (${cleanCompany})` : ''} — ${mainTopicShort}`;

    const payload = await getPayloadClient();
    let savedDocId = contactMessageId ? String(contactMessageId) : undefined;

    if (savedDocId) {
      try {
        await payload.update({
          collection: 'contact-messages',
          id: savedDocId,
          data: {
            name: cleanName,
            email: cleanEmail,
            phone: cleanPhone || undefined,
            company: cleanCompany || undefined,
            subject: subjectLine.slice(0, 145),
            message: fullRecordMessage.slice(0, 5000),
          },
        });
      } catch {
        const created = await payload.create({
          collection: 'contact-messages',
          data: {
            name: cleanName,
            email: cleanEmail,
            phone: cleanPhone || undefined,
            company: cleanCompany || undefined,
            subject: subjectLine.slice(0, 145),
            message: fullRecordMessage.slice(0, 5000),
            status: 'new',
          },
        });
        savedDocId = created?.id ? String(created.id) : undefined;
      }
    } else if (userMessages.length > 0) {
      const created = await payload.create({
        collection: 'contact-messages',
        data: {
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone || undefined,
          company: cleanCompany || undefined,
          subject: subjectLine.slice(0, 145),
          message: fullRecordMessage.slice(0, 5000),
          status: 'new',
        },
      });
      savedDocId = created?.id ? String(created.id) : undefined;
    }

    // Apprentissage continu : mémoriser les formulations des conversations qualifiées ou bien notées
    if (userMessages.length > 0 && ((rating && rating >= 4) || analysis.isSerious)) {
      const topTopic = analysis.detectedTopics.length > 0 ? analysis.detectedTopics[0] : 'general';
      for (const uMsg of userMessages) {
        if (uMsg.text && uMsg.text.length >= 6 && uMsg.text.length <= 80) {
          saveLearnedPattern(uMsg.text, topTopic);
        }
      }
    }

    // Send email summary to all admins ONLY when the conversation is serious
    // and triggered by 'summary', 'end', or explicit notifyAdminsNow
    let emailSent = false;
    let emailWarning: string | undefined;

    if ((notifyAdminsNow || action === 'summary' || action === 'end') && analysis.isSerious) {
      try {
        const adminEmails = await getAdminRecipientEmails(payload);
        const formTypeBadge =
          action === 'end'
            ? `Résumé Chat Clôturé (#${cleanSessionId})`
            : `Résumé Conversation Sérieuse (#${cleanSessionId})`;

        const adminHtml = generateAdminNotificationHtml({
          formType: formTypeBadge,
          referenceId: savedDocId || cleanSessionId,
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone || undefined,
          company: cleanCompany || undefined,
          subject: `${analysis.qualificationLabel} — ${cleanName}`,
          message: fullRecordMessage,
          fields: [
            { label: 'Qualification', value: analysis.qualificationLabel },
            {
              label: 'Expertises détectées',
              value:
                analysis.detectedTopics.length > 0
                  ? analysis.detectedTopics.join(' • ')
                  : 'Renseignement général',
            },
            {
              label: 'Volume / Contexte',
              value:
                analysis.detectedVolumeOrContext.length > 0
                  ? analysis.detectedVolumeOrContext.join(' • ')
                  : undefined,
            },
            { label: 'Référence Session', value: `#${cleanSessionId} (${statusLabel})` },
            {
              label: 'Messages échangés',
              value: `${(messages || []).length} messages (${userMessages.length} du client)`,
            },
            { label: 'Évaluation client', value: ratingStr },
          ],
        });

        const sendRes = await sendEmail({
          to: adminEmails.join(', '),
          replyTo: cleanEmail.includes('@') ? cleanEmail : undefined,
          subject: `[Chat Koffi] ${analysis.qualificationLabel} — ${cleanName}${cleanCompany ? ` (${cleanCompany})` : ''}`,
          html: adminHtml,
        });

        emailSent = Boolean(sendRes?.success);
        emailWarning = sendRes?.warning;

        // If session ended and visitor provided a genuine email, send them their session summary
        if (
          action === 'end' &&
          cleanEmail &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) &&
          !cleanEmail.startsWith('non-renseigne@') &&
          !cleanEmail.startsWith('visiteur-')
        ) {
          const clientHtml = generateClientAcknowledgmentHtml({
            name: cleanName,
            subject: `Votre échange avec Koffi (#${cleanSessionId})`,
            summary: `${analysis.executiveSummaryText}\n\n---\n\n${transcriptText}`,
            referenceId: cleanSessionId,
          });

          await sendEmail({
            to: cleanEmail,
            subject: `Récapitulatif de votre conversation avec Koffi (#${cleanSessionId}) - NOB TECHNOLOGIES`,
            html: clientHtml,
          });
        }
      } catch (emailErr) {
        console.warn('[CHAT SESSION] Email notification warning:', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      sessionId: cleanSessionId,
      contactMessageId: savedDocId,
      isSerious: analysis.isSerious,
      qualification: analysis.qualificationLabel,
      emailSent,
      emailWarning,
    });
  } catch (error) {
    console.error('[CHAT SESSION] Error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la synchronisation de la session' },
      { status: 500 }
    );
  }
}
