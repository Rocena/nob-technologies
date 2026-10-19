import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { sendEmail, resolveEmailTemplates } from '@/lib/email';
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

    const body = await req.json().catch(() => ({}));
    const { quoteId } = body;

    if (!quoteId) {
      return NextResponse.json({ error: 'ID du devis manquant.' }, { status: 400 });
    }

    // Fetch quote with customer details
    const quote = await payload.findByID({
      collection: 'quotes',
      id: quoteId,
      depth: 1,
    });

    if (!quote) {
      return NextResponse.json({ error: 'Devis introuvable.' }, { status: 404 });
    }

    const customer = quote.customer as any;
    if (!customer?.email) {
      return NextResponse.json({ error: 'Le client associé à ce devis n\'a pas d\'adresse email enregistrée.' }, { status: 400 });
    }

    const quoteNumber = quote.quoteNumber || `DEV-${quote.id}`;
    const totalFormatted = (quote.total || 0).toLocaleString('fr-FR');
    const items = (quote.items || []) as any[];

    // Host URL for PDF
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.nobtech.fr';
    const documentUrl = `${origin}/document/devis/${quote.id}`;

    // Resolve Custom Email Templates configured in Back-Office
    const templates = await resolveEmailTemplates(payload);
    const customerDisplayName = customer.contactName || customer.companyName || 'Cher Client';

    const defaultSubj = `Devis N° ${quoteNumber} — NOB TECHNOLOGIES (${customer.companyName || customer.contactName || ''})`;
    const customSubj = templates.quoteEmailSubject
      ? templates.quoteEmailSubject
          .replace(/\{\{quoteNumber\}\}/g, quoteNumber)
          .replace(/\{\{customerName\}\}/g, customerDisplayName)
          .replace(/\{\{totalAmount\}\}/g, `${totalFormatted} FCFA`)
      : defaultSubj;

    const defaultMessage = `Nous avons le plaisir de vous transmettre notre proposition commerciale concernant vos besoins d'infrastructure et de services IT. Vous trouverez ci-dessous le récapitulatif de votre devis officiel <strong>N° ${quoteNumber}</strong>.`;
    const introMsg = templates.quoteEmailMessage
      ? templates.quoteEmailMessage
          .replace(/\{\{quoteNumber\}\}/g, quoteNumber)
          .replace(/\{\{customerName\}\}/g, customerDisplayName)
          .replace(/\{\{totalAmount\}\}/g, `${totalFormatted} FCFA`)
          .replace(/\n/g, '<br/>')
      : defaultMessage;

    const itemsHtml = items.map((it) => `
      <tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #1e293b;">
          ${it.description || 'Prestation IT'}
        </td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; text-align: center; color: #64748b;">
          ${it.quantity || 1}
        </td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; text-align: right; color: #1e293b; font-weight: 600;">
          ${((it.unitPrice || 0) * (it.quantity || 1)).toLocaleString('fr-FR')} FCFA
        </td>
      </tr>
    `).join('');

    const emailHtml = `
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="utf-8"></head>
    <body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #0f172a;">
      <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
        
        <!-- HEADER -->
        <div style="background: linear-gradient(135deg, #0284C7 0%, #0369A1 100%); padding: 32px 28px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">NOB TECHNOLOGIES</h1>
          <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px;">Solutions Informatiques & Télécoms de Pointe</p>
        </div>

        <!-- BODY -->
        <div style="padding: 32px 28px;">
          <p style="font-size: 15px; margin: 0 0 16px;">Bonjour <strong>${customerDisplayName}</strong>,</p>
          <div style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0 0 24px;">
            ${introMsg}
          </div>

          <!-- SUMMARY CARD -->
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
              <span style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase;">Devis Réf :</span>
              <span style="font-size: 13px; font-weight: 800; color: #0284c7;">${quoteNumber}</span>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
              <thead>
                <tr style="background: #e2e8f0;">
                  <th style="padding: 8px 12px; font-size: 11px; text-align: left; color: #475569; text-transform: uppercase;">Désignation</th>
                  <th style="padding: 8px 12px; font-size: 11px; text-align: center; color: #475569; text-transform: uppercase;">Qté</th>
                  <th style="padding: 8px 12px; font-size: 11px; text-align: right; color: #475569; text-transform: uppercase;">Montant</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div style="text-align: right; border-top: 2px solid #0284c7; padding-top: 12px;">
              <span style="font-size: 13px; color: #475569;">Total TTC : </span>
              <span style="font-size: 20px; font-weight: 900; color: #0f172a; margin-left: 8px;">${totalFormatted} FCFA</span>
            </div>
          </div>

          <!-- CTA BUTTON -->
          <div style="text-align: center; margin: 32px 0;">
            <a href="${documentUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #0284C7, #0369A1); color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 28px; border-radius: 10px; box-shadow: 0 4px 15px rgba(2, 132, 199, 0.4);">
              Consulter et Télécharger le Devis en PDF
            </a>
          </div>

          <p style="font-size: 13px; line-height: 1.5; color: #64748b; margin: 0 0 8px;">
            Pour valider cette offre ou pour toute question technique complémentaire, il vous suffit de répondre directement à cet email ou de joindre votre interlocuteur dédié au <strong>+221 77 301 08 38</strong>.
          </p>
        </div>

        <!-- FOOTER -->
        <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 28px; text-align: center; font-size: 12px; color: #64748b;">
          <strong>NOB TECHNOLOGIES S.A.R.L</strong><br>
          Route de l'Aéroport LSS, Lot N°79 — Dakar, Sénégal<br>
          Téléphone : +221 77 301 08 38 / +221 33 814 04 35 • Email : contact@nobtech.fr
        </div>

      </div>
    </body>
    </html>
    `;

    // Dispatch email
    await sendEmail({
      to: customer.email,
      subject: customSubj,
      html: emailHtml,
    });

    // Update status to 'sent'
    await payload.update({
      collection: 'quotes',
      id: quoteId,
      data: {
        status: 'sent',
      },
    });

    return NextResponse.json({
      success: true,
      message: `Le devis N° ${quoteNumber} a été envoyé avec succès à ${customer.email} !`,
    });
  } catch (error: any) {
    console.error('Error sending quote email:', error);
    return NextResponse.json({ error: error.message || 'Erreur lors de l\'envoi du devis par email.' }, { status: 500 });
  }
}
