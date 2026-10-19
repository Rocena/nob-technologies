import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, getAdminRecipientEmails, generateAdminNotificationHtml } from '@/lib/email';
import { getPayloadClient } from '@/lib/payload';

export const dynamic = 'force-dynamic';

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
    const recipient = (body.recipient || '').trim() || user.email || 'contact@nobtech.fr';

    const testHtml = generateAdminNotificationHtml({
      formType: 'Test de Validation SMTP (Back-Office)',
      name: user.name || 'Administrateur NOBTECH',
      email: user.email,
      phone: '+221 77 301 08 38',
      company: 'NOB TECHNOLOGIES',
      subject: 'Confirmation de fonctionnement du serveur SMTP',
      message: 'Ce message confirme que la liaison SMTP configurée dans les paramètres du Back-Office NOBTECH est opérationnelle.',
      fields: [
        { label: 'Date et heure', value: new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Dakar' }) },
        { label: 'Destinataire testé', value: recipient },
        { label: 'Déclenché par', value: `${user.name || user.email} (${user.email})` },
      ],
    });

    const result = await sendEmail({
      to: recipient,
      subject: '[Test NOBTECH] Validation réussie de vos paramètres SMTP',
      html: testHtml,
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `E-mail de test envoyé avec succès à ${recipient} !`,
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

