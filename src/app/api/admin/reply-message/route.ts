import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { sendEmail, generateAdminReplyHtml } from '@/lib/email';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  try {
    const payload = await getPayloadClient();
    const reqHeaders = await headers();

    // Authenticate user via payload
    const { user } = await payload.auth({ headers: reqHeaders });
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé. Veuillez vous connecter au back-office.' }, { status: 401 });
    }

    const body = await req.json();
    const { messageId, replySubject, replyContent, recipientEmail, recipientName } = body;

    if (!messageId || !replyContent || !recipientEmail) {
      return NextResponse.json({ error: 'Données manquantes (ID du message, contenu ou email du destinataire).' }, { status: 400 });
    }

    // Fetch existing message to verify
    const existingMessage = await payload.findByID({
      collection: 'contact-messages',
      id: messageId,
    });

    if (!existingMessage) {
      return NextResponse.json({ error: 'Message introuvable.' }, { status: 404 });
    }

    const subjectToSend = replySubject || `Re: ${existingMessage.subject || 'Votre demande'}`;
    const adminDisplayName = (user as any)?.name || (user as any)?.email || 'NOB TECHNOLOGIES';

    // Generate responsive HTML email
    const htmlEmail = generateAdminReplyHtml({
      recipientName: recipientName || existingMessage.name || 'Client',
      originalSubject: existingMessage.subject || '',
      messageBody: replyContent,
      adminName: adminDisplayName,
    });

    // Attempt real email dispatch
    const emailResult = await sendEmail({
      to: recipientEmail,
      subject: subjectToSend,
      html: htmlEmail,
    });

    const now = new Date().toISOString();

    // Update the message in Payload CMS
    const updatedDoc = await payload.update({
      collection: 'contact-messages',
      id: messageId,
      data: {
        status: 'replied',
        replySubject: subjectToSend,
        replyBody: replyContent,
        repliedAt: now,
        repliedBy: adminDisplayName,
      },
    });

    return NextResponse.json({
      success: true,
      message: emailResult?.warning === 'SMTP_CONFIG_MISSING'
        ? 'Réponse enregistrée et statut mis à jour en Répondu. (Note : identifiants SMTP_USER/SMTP_PASS non configurés dans .env pour l\'expédition réelle).'
        : 'Email envoyé avec succès et statut mis à jour en Répondu !',
      warning: emailResult?.warning,
      doc: {
        status: 'replied',
        replySubject: subjectToSend,
        replyBody: replyContent,
        repliedAt: now,
        repliedBy: adminDisplayName,
      },
    });
  } catch (error: any) {
    console.error('Error replying to contact message:', error);
    return NextResponse.json(
      { error: error?.message || 'Erreur lors de l\'envoi de la réponse.' },
      { status: 500 }
    );
  }
}
