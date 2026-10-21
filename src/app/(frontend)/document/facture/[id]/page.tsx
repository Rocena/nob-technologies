import React from 'react';
import { notFound } from 'next/navigation';
import { getPayloadClient } from '@/lib/payload';
import { DocumentPrintBar } from '@/components/DocumentPrintBar';

export default async function InvoicePDFPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const payload = await getPayloadClient();

  let invoice: any;
  try {
    invoice = await payload.findByID({
      collection: 'invoices',
      id,
      depth: 1,
    });
  } catch {
    return notFound();
  }

  if (!invoice) return notFound();

  const customer = (invoice.customer || {}) as any;
  const items = (invoice.items || []) as any[];
  const statusMap: Record<string, { label: string; color: string; bg: string }> = {
    draft: { label: 'FACTURE PROFORMA / BROUILLON', color: '#475569', bg: '#f1f5f9' },
    sent: { label: 'EN ATTENTE DE RÈGLEMENT', color: '#0284c7', bg: '#e0f2fe' },
    paid: { label: 'FACTURE ACQUITTÉE / PAYÉE', color: '#059669', bg: '#d1fae5' },
    overdue: { label: 'ÉCHÉANCE DÉPASSÉE', color: '#dc2626', bg: '#fee2e2' },
    cancelled: { label: 'ANNULÉE', color: '#64748b', bg: '#f1f5f9' },
  };
  const badge = statusMap[invoice.status] || statusMap.draft;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
        padding: '48px 20px 100px',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        color: '#0f172a',
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              body, html { background: #ffffff !important; margin: 0 !important; padding: 0 !important; }
              .no-print, header, footer { display: none !important; }
              .doc-sheet { box-shadow: none !important; border: none !important; margin: 0 !important; padding: 24px !important; max-width: 100% !important; }
            }
          `,
        }}
      />

      <div
        className="doc-sheet"
        style={{
          maxWidth: '840px',
          margin: '0 auto',
          background: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 24px 60px -15px rgba(15, 23, 42, 0.08)',
          padding: '48px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top Accent Bar */}
        <div
          style={{
            height: '6px',
            background: 'linear-gradient(90deg, #0f172a 0%, #0284C7 55%, #10b981 100%)',
            borderRadius: '999px',
            marginBottom: '36px',
          }}
        />

        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '28px',
            marginBottom: '32px',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '26px',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: '#0f172a',
              }}
            >
              NOB <span style={{ color: '#0284C7' }}>TECHNOLOGIES</span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '12.5px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Ingénierie Réseaux, Cybersécurité & Solutions Digitales
            </p>
            <div style={{ marginTop: '12px', fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
              Route de l&apos;Aéroport LSS, Lot N°79 — Dakar, Sénégal<br />
              Tél : +221 77 301 08 38 / +221 33 814 04 35 • Email : contact@nobtech.fr
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '11px',
                fontWeight: 800,
                padding: '5px 12px',
                borderRadius: '999px',
                color: badge.color,
                background: badge.bg,
                letterSpacing: '0.06em',
                marginBottom: '10px',
              }}
            >
              {badge.label}
            </span>
            <h1 style={{ margin: 0, fontSize: '30px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>
              FACTURE OFFICIELLE
            </h1>
            <p style={{ margin: '6px 0 0', fontSize: '15px', fontWeight: 800, color: '#0284C7', fontFamily: 'monospace' }}>
              N° {invoice.invoiceNumber}
            </p>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
              Date d&apos;émission : <strong>{invoice.date ? new Date(invoice.date).toLocaleDateString('fr-FR') : '—'}</strong>
            </p>
            <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>
              Date d&apos;échéance : <strong>{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString('fr-FR') : 'À réception'}</strong>
            </p>
          </div>
        </div>

        {/* Destinataire & Modalités */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginBottom: '36px',
          }}
        >
          <div
            style={{
              padding: '20px 24px',
              background: '#f8fafc',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Facturé à
            </div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
              {customer.companyName || customer.contactName || 'Client Entreprise'}
            </div>
            {customer.contactName && (
              <div style={{ fontSize: '13.5px', color: '#334155', marginBottom: '4px' }}>
                Contact : <strong>{customer.contactName}</strong>
              </div>
            )}
            {customer.address && (
              <div style={{ fontSize: '13px', color: '#475569', whiteSpace: 'pre-wrap', marginBottom: '4px' }}>
                {customer.address}
              </div>
            )}
            <div style={{ fontSize: '13px', color: '#475569' }}>
              {customer.email && <span>Email : {customer.email}</span>}
              {customer.phone && <span> • Tél : {customer.phone}</span>}
            </div>
            {customer.taxId && (
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', fontFamily: 'monospace' }}>
                NINEA / RC : {customer.taxId}
              </div>
            )}
          </div>

          <div
            style={{
              padding: '20px 24px',
              background: '#f8fafc',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                Modalités de Règlement
              </div>
              <p style={{ margin: 0, fontSize: '12.5px', color: '#475569', lineHeight: 1.55 }}>
                Règlement par virement bancaire, chèque certifié à l&apos;ordre de <strong>NOB TECHNOLOGIES SARL</strong>, ou paiement mobile entreprise (Wave / Orange Money Business).
              </p>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', fontWeight: 700, color: '#0284c7' }}>
              Référence à rappeler : {invoice.invoiceNumber}
            </div>
          </div>
        </div>

        {/* Table of Items */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px' }}>
          <thead>
            <tr style={{ background: '#0f172a', color: '#ffffff' }}>
              <th style={{ padding: '13px 16px', textAlign: 'left', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', borderTopLeftRadius: '10px' }}>
                Description des Prestations / Livrables
              </th>
              <th style={{ padding: '13px 16px', textAlign: 'center', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', width: '80px' }}>
                Qté
              </th>
              <th style={{ padding: '13px 16px', textAlign: 'right', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', width: '150px' }}>
                Prix Unitaire HT
              </th>
              <th style={{ padding: '13px 16px', textAlign: 'right', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', width: '160px', borderTopRightRadius: '10px' }}>
                Total HT
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 1 ? '#f8fafc' : '#ffffff' }}>
                <td style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13.5px', fontWeight: 600, color: '#1e293b' }}>
                  {item.description}
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'center', fontSize: '13.5px', color: '#475569', fontWeight: 600 }}>
                  {item.quantity}
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'right', fontSize: '13.5px', color: '#475569', fontFamily: 'monospace' }}>
                  {(item.unitPrice || 0).toLocaleString('fr-FR')} FCFA
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'right', fontSize: '13.5px', fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>
                  {(item.total || (item.quantity || 1) * (item.unitPrice || 0)).toLocaleString('fr-FR')} FCFA
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals & Stamp */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '12.5px', color: '#475569' }}>
            {invoice.notes && (
              <div style={{ marginBottom: '16px', padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong style={{ display: 'block', color: '#0f172a', marginBottom: '4px' }}>Notes de facturation :</strong>
                <span style={{ whiteSpace: 'pre-wrap' }}>{invoice.notes}</span>
              </div>
            )}
            {invoice.status === 'paid' && (
              <div style={{ padding: '12px 0' }}>
                <span
                  style={{
                    border: '3px solid #10b981',
                    color: '#059669',
                    background: 'rgba(16, 185, 129, 0.06)',
                    padding: '8px 24px',
                    borderRadius: '8px',
                    fontSize: '18px',
                    fontWeight: 900,
                    letterSpacing: '0.1em',
                    transform: 'rotate(-5deg)',
                    display: 'inline-block',
                  }}
                >
                  FACTURE ACQUITTÉE
                </span>
              </div>
            )}
          </div>

          <div
            style={{
              background: '#f8fafc',
              padding: '22px 24px',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '13.5px', color: '#475569' }}>
              <span>Sous-total HT :</span>
              <strong style={{ fontFamily: 'monospace', color: '#0f172a' }}>{(invoice.subtotal || 0).toLocaleString('fr-FR')} FCFA</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0 12px', fontSize: '13.5px', color: '#475569', borderBottom: '1px solid #cbd5e1' }}>
              <span>TVA (18%) :</span>
              <strong style={{ fontFamily: 'monospace', color: '#0f172a' }}>{(invoice.tax || 0).toLocaleString('fr-FR')} FCFA</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px' }}>
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase' }}>Total TTC :</span>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#0284C7', fontFamily: 'monospace' }}>
                {(invoice.total || 0).toLocaleString('fr-FR')} FCFA
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: '48px',
            paddingTop: '20px',
            borderTop: '1px solid #e2e8f0',
            fontSize: '11.5px',
            color: '#64748b',
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          <strong>NOB TECHNOLOGIES S.A.R.L</strong> — Route de l&apos;Aéroport LSS, Lot N°79, Dakar, Sénégal<br />
          Les factures sont payables à réception sauf accord contractuel particulier. Merci pour votre confiance.
        </div>
      </div>

      <DocumentPrintBar
        title={`Imprimer la Facture ${invoice.invoiceNumber}`}
        backHref={`/admin/collections/invoices/${invoice.id}`}
      />
    </div>
  );
}
