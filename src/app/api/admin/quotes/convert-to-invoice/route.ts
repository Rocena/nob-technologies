import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
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
    const { quoteId } = body;

    if (!quoteId) {
      return NextResponse.json({ error: 'ID du devis manquant.' }, { status: 400 });
    }

    const quote = await payload.findByID({
      collection: 'quotes',
      id: quoteId,
      depth: 0,
    });

    if (!quote) {
      return NextResponse.json({ error: 'Devis introuvable.' }, { status: 404 });
    }

    // Vérifier si une facture existe déjà pour ce devis
    const existing = await payload.find({
      collection: 'invoices',
      where: {
        quote: { equals: quote.id },
      },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      const inv = existing.docs[0];
      return NextResponse.json({
        success: true,
        invoiceId: inv.id,
        invoiceNumber: inv.invoiceNumber,
        message: `Une facture (${inv.invoiceNumber}) existe déjà pour ce devis.`,
      });
    }

    const now = new Date();
    const dueDate = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000); // Échéance +15 jours

    const createdInvoice = await payload.create({
      collection: 'invoices',
      data: {
        invoiceNumber: `FAC-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        customer: typeof quote.customer === 'object' ? (quote.customer as any).id : quote.customer,
        quote: quote.id,
        date: now.toISOString(),
        dueDate: dueDate.toISOString(),
        status: 'draft',
        items: (quote.items || []).map((item: any) => ({
          description: item.description,
          quantity: item.quantity || 1,
          unitPrice: item.unitPrice || 0,
          total: item.total || (item.quantity || 1) * (item.unitPrice || 0),
        })),
        notes: quote.notes || `Facture générée à partir du devis N° ${quote.quoteNumber}`,
      },
    });

    // Marquer le devis comme accepté
    await payload.update({
      collection: 'quotes',
      id: quote.id,
      data: {
        status: 'accepted',
      },
    });

    return NextResponse.json({
      success: true,
      invoiceId: createdInvoice.id,
      invoiceNumber: createdInvoice.invoiceNumber,
      message: `Devis converti en Facture N° ${createdInvoice.invoiceNumber} avec succès !`,
    });
  } catch (err: any) {
    console.error('Convert quote to invoice error:', err);
    return NextResponse.json(
      { error: err.message || 'Erreur lors de la conversion en facture.' },
      { status: 500 }
    );
  }
}
