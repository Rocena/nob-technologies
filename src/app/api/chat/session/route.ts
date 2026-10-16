import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import {
  sendEmail,
  getAdminRecipientEmails,
  generateAdminNotificationHtml,
  generateClientAcknowledgmentHtml,
} from '@/lib/email';

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

function formatTranscript(messages: ChatTranscriptMessage[], visitorName: string): string {
  if (!Array.isArray(messages) || messages.length === 0) {
    return 'Aucun message échangé.';
  }
  return messages
    .map((m) => {
      const speaker = m.role === 'user' ? visitorName || 'Visiteur' : 'Koffi (NOBTECH)';
      return `[${m.time || '--:--'}] ${speaker} :\n${m.text}`;
    })
    .join('\n\n----------------------------------------\n\n');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      action, // 'sync' | 'end'
      sessionId,
      contactMessageId,
      visitor,
      messages,
      rating,
      notifyAdminsNow,
    }: {
      action: 'sync' | 'end';
      sessionId: string;
      contactMessageId?: string | number | null;
      visitor: SessionVisitor;
      messages: ChatTranscriptMessage[];
      rating?: number | null;
      notifyAdminsNow?: boolean;
    } = body;

    if (!visitor || !visitor.name || (!visitor.email && !visitor.phone)) {
      return NextResponse.json(
        { error: 'Coordonnées du visiteur incomplètes' },
        { status: 400 }
      );
    }

    const cleanName = visitor.name.trim();
    const cleanEmail = (visitor.email || 'non-renseigne@nobtech.fr').trim();
    const cleanPhone = (visitor.phone || '').trim();
    const cleanCompany = (visitor.company || '').trim();
    const cleanSessionId = (sessionId || `SES-${Date.now().toString(36).toUpperCase()}`).trim();

    const userMessages = Array.isArray(messages)
      ? messages.filter((m) => m.role === 'user')
      : [];
    const firstUserQuestion =
      userMessages.length > 0 ? userMessages[0].text.slice(0, 80) : 'Session ouverte';

    const statusLabel = action === 'end' ? 'Session clôturée' : 'Session active';
    const ratingStr = rating ? `${'⭐'.repeat(rating)} (${rating}/5)` : undefined;

    const transcriptText = formatTranscript(messages || [], cleanName);

    const fullRecordMessage = [
      `=== SESSION DE CHAT KOFFI (${cleanSessionId}) ===`,
      `Statut : ${statusLabel}`,
      `Visiteur : ${cleanName}`,
      `Email : ${cleanEmail}`,
      `Téléphone / WhatsApp : ${cleanPhone || 'Non renseigné'}`,
      cleanCompany ? `Entreprise : ${cleanCompany}` : null,
      ratingStr ? `Évaluation client : ${ratingStr}` : null,
      `Nombre de messages client : ${userMessages.length}`,
      ``,
      `=== TRANSCRIPTION COMPLÈTE ===`,
      transcriptText,
    ]
      .filter(Boolean)
      .join('\n');

    const subjectLine = `[Chat #${cleanSessionId}] ${cleanName}${cleanCompany ? ` (${cleanCompany})` : ''} — ${firstUserQuestion}`;

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
        // If record was deleted or ID invalid, create a new one
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
    } else {
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

    // Send email notifications when requested (first user interaction or session close)
    if (notifyAdminsNow || action === 'end') {
      try {
        const adminEmails = await getAdminRecipientEmails(payload);
        const formTypeBadge =
          action === 'end'
            ? `Session Chat Clôturée (#${cleanSessionId})`
            : `Nouveau Lead Chat En Direct (#${cleanSessionId})`;

        const adminHtml = generateAdminNotificationHtml({
          formType: formTypeBadge,
          referenceId: savedDocId || cleanSessionId,
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone || undefined,
          company: cleanCompany || undefined,
          subject: subjectLine,
          message: transcriptText,
          fields: [
            { label: 'ID de Session', value: `#${cleanSessionId}` },
            { label: 'Statut de la session', value: statusLabel },
            { label: 'Messages échangés', value: `${(messages || []).length} messages (${userMessages.length} du visiteur)` },
            { label: 'Satisfaction client', value: ratingStr || 'Non renseignée' },
          ],
        });

        await sendEmail({
          to: adminEmails.join(', '),
          replyTo: cleanEmail.includes('@') ? cleanEmail : undefined,
          subject:
            action === 'end'
              ? `[Chat Clôturé #${cleanSessionId}] Transcription de ${cleanName}${cleanCompany ? ` (${cleanCompany})` : ''}`
              : `[Nouveau Chat #${cleanSessionId}] ${cleanName} discute avec Koffi`,
          html: adminHtml,
        });

        // If session ended and visitor provided a valid email, send them their session transcript
        if (action === 'end' && cleanEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) && !cleanEmail.startsWith('non-renseigne@')) {
          const clientHtml = generateClientAcknowledgmentHtml({
            name: cleanName,
            subject: `Votre session d'assistance avec Koffi (#${cleanSessionId})`,
            summary: transcriptText,
            referenceId: cleanSessionId,
          });

          await sendEmail({
            to: cleanEmail,
            subject: `Récapitulatif de votre échange avec Koffi (#${cleanSessionId}) - NOB TECHNOLOGIES`,
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
    });
  } catch (error) {
    console.error('[CHAT SESSION] Error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la synchronisation de la session' },
      { status: 500 }
    );
  }
}
