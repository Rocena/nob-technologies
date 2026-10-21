import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { sendEmail } from '@/lib/email';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  try {
    const payload = await getPayloadClient();
    const reqHeaders = await headers();

    const { user } = await payload.auth({ headers: reqHeaders });
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const recipientEmail = body.email || user.email;

    if (!recipientEmail) {
      return NextResponse.json({ error: 'Aucune adresse email destinataire disponible.' }, { status: 400 });
    }

    // Récupérer les données des collections existantes
    const [quotesRes, invoicesRes, admissionsRes, messagesRes, analyticsRes] = await Promise.all([
      payload.find({ collection: 'quotes', limit: 200, depth: 1 }).catch(() => ({ docs: [] })),
      payload.find({ collection: 'invoices', limit: 200, depth: 1 }).catch(() => ({ docs: [] })),
      payload.find({ collection: 'admissions', limit: 200, depth: 0 }).catch(() => ({ docs: [] })),
      payload.find({ collection: 'contact-messages', limit: 200, depth: 0 }).catch(() => ({ docs: [] })),
      (payload as any).find({ collection: 'analytics-events', limit: 500, depth: 0 }).catch(() => ({ docs: [] })),
    ]);

    const quotes = quotesRes.docs as any[];
    const invoices = invoicesRes.docs as any[];
    const admissions = admissionsRes.docs as any[];
    const messages = messagesRes.docs as any[];
    const events = analyticsRes.docs as any[];

    const quotesTotal = quotes.reduce((acc, q) => acc + (Number(q.total) || 0), 0);
    const quotesAcceptedTotal = quotes
      .filter((q) => q.status === 'accepted')
      .reduce((acc, q) => acc + (Number(q.total) || 0), 0);

    const invoicesPaidTotal = invoices
      .filter((inv) => inv.status === 'paid')
      .reduce((acc, inv) => acc + (Number(inv.total) || 0), 0);
    const invoicesPendingTotal = invoices
      .filter((inv) => inv.status === 'sent' || inv.status === 'overdue')
      .reduce((acc, inv) => acc + (Number(inv.total) || 0), 0);

    const admissionsPending = admissions.filter((a) => a.status === 'pending' || !a.status).length;
    const admissionsAccepted = admissions.filter((a) => a.status === 'accepted').length;

    const unreadMessages = messages.filter((m) => m.status === 'new' || !m.status).length;
    const pageviews = events.filter((e) => e.type === 'pageview').length;
    const uniqueVisitors = new Set(events.map((e) => e.visitorId).filter(Boolean)).size;

    const reportDate = new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const emailHtml = `
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="utf-8"></head>
    <body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0f172a; color: #0f172a;">
      <div style="max-width: 660px; margin: 0 auto; background: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.25);">
        <div style="background: linear-gradient(135deg, #020617 0%, #0284C7 100%); padding: 34px 30px; color: #ffffff;">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #38bdf8; margin-bottom: 6px;">
            NOBTECH OS • EXECUTIVE BRIEFING
          </div>
          <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">Rapport Exécutif d'Activité &amp; Pipeline</h1>
          <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.85; text-transform: capitalize;">${reportDate}</p>
        </div>

        <div style="padding: 30px;">
          <h3 style="margin: 0 0 14px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #64748b;">
            1. Performance Commerciale &amp; Facturation
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 26px;">
            <tr>
              <td style="padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; width: 50%;">
                <div style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase;">Volume Devis Émis (${quotes.length})</div>
                <div style="font-size: 20px; font-weight: 900; color: #0f172a; margin-top: 4px;">${quotesTotal.toLocaleString('fr-FR')} FCFA</div>
                <div style="font-size: 12px; color: #059669; font-weight: 600; margin-top: 2px;">Dont validés : ${quotesAcceptedTotal.toLocaleString('fr-FR')} FCFA</div>
              </td>
              <td style="width: 12px;"></td>
              <td style="padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; width: 50%;">
                <div style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase;">Chiffre d'Affaires Encaissé</div>
                <div style="font-size: 20px; font-weight: 900; color: #0284c7; margin-top: 4px;">${invoicesPaidTotal.toLocaleString('fr-FR')} FCFA</div>
                <div style="font-size: 12px; color: #d97706; font-weight: 600; margin-top: 2px;">En attente : ${invoicesPendingTotal.toLocaleString('fr-FR')} FCFA</div>
              </td>
            </tr>
          </table>

          <h3 style="margin: 0 0 14px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #64748b;">
            2. Académie, Prospects &amp; Audience Web
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-size: 14px; color: #334155;">🎓 Candidatures Formations (Total : ${admissions.length})</td>
              <td style="padding: 10px 0; font-size: 14px; font-weight: 800; text-align: right; color: #0f172a;">
                ${admissionsAccepted} admis • ${admissionsPending} en attente
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-size: 14px; color: #334155;">📩 Messages &amp; Demandes Clients</td>
              <td style="padding: 10px 0; font-size: 14px; font-weight: 800; text-align: right; color: #0284c7;">
                ${messages.length} reçus (${unreadMessages} nouveaux)
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 14px; color: #334155;">🌐 Audience Site Web (Analytics)</td>
              <td style="padding: 10px 0; font-size: 14px; font-weight: 800; text-align: right; color: #0f172a;">
                ${uniqueVisitors} visiteurs uniques • ${pageviews} pages vues
              </td>
            </tr>
          </table>
        </div>

        <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 30px; text-align: center; font-size: 12px; color: #64748b;">
          <strong>NOB TECHNOLOGIES S.A.R.L</strong> — Rapport généré depuis Nobtech OS
        </div>
      </div>
    </body>
    </html>
    `;

    await sendEmail({
      to: recipientEmail,
      subject: `📊 Rapport Exécutif NOB TECHNOLOGIES — ${reportDate}`,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      message: `Rapport exécutif envoyé avec succès à ${recipientEmail} !`,
    });
  } catch (err: any) {
    console.error('Executive report error:', err);
    return NextResponse.json(
      { error: err.message || "Erreur lors de l'envoi du rapport exécutif." },
      { status: 500 }
    );
  }
}
