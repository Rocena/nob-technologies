import React from 'react'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'

export default async function DevisPDFPage({ params }: { params: { id: string } }) {
  const payload = await getPayloadClient()
  
  let quote;
  try {
    quote = await payload.findByID({
      collection: 'quotes',
      id: params.id,
      depth: 1, // To get customer details
    })
  } catch (err) {
    return notFound()
  }

  if (!quote) return notFound()

  const customer = quote.customer as any;
  const items = quote.items as any[];

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', color: '#0f172a' }}>
      {/* Print-specific styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
        }
      `}} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #0f172a', paddingBottom: '20px', marginBottom: '40px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#0077b6', fontSize: '28px' }}>NOB TECHNOLOGIES</h1>
          <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>Solutions Informatiques & Télécoms</p>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>Dakar, Sénégal<br/>contact@nobtech.fr<br/>+221 77 123 45 67</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h2 style={{ margin: 0, fontSize: '32px', color: '#0f172a', textTransform: 'uppercase' }}>Devis</h2>
          <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>N° {quote.quoteNumber}</p>
          <p style={{ margin: '5px 0 0 0' }}>Date : {new Date(quote.date).toLocaleDateString('fr-FR')}</p>
          <p style={{ margin: '5px 0 0 0' }}>Valide jusqu'au : {new Date(quote.validUntil).toLocaleDateString('fr-FR')}</p>
        </div>
      </div>

      {/* Customer Info */}
      <div style={{ marginBottom: '40px', padding: '20px', background: '#f8fafc', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#0f172a', fontSize: '16px', textTransform: 'uppercase' }}>Facturé à :</h3>
        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', fontSize: '18px' }}>{customer.companyName}</p>
        {customer.contactName && <p style={{ margin: '0 0 5px 0' }}>Attn: {customer.contactName}</p>}
        {customer.address && <p style={{ margin: '0 0 5px 0', whiteSpace: 'pre-wrap' }}>{customer.address}</p>}
        <p style={{ margin: '0 0 5px 0' }}>Email: {customer.email}</p>
        {customer.phone && <p style={{ margin: '0 0 5px 0' }}>Tél: {customer.phone}</p>}
        {customer.taxId && <p style={{ margin: '0 0 5px 0' }}>NINEA/TVA: {customer.taxId}</p>}
      </div>

      {/* Items Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
        <thead>
          <tr style={{ background: '#0f172a', color: 'white' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Qté</th>
            <th style={{ padding: '12px', textAlign: 'right' }}>Prix Unitaire</th>
            <th style={{ padding: '12px', textAlign: 'right' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px', textAlign: 'left' }}>{item.description}</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>{item.quantity}</td>
              <td style={{ padding: '12px', textAlign: 'right' }}>{item.unitPrice.toLocaleString('fr-FR')} FCFA</td>
              <td style={{ padding: '12px', textAlign: 'right' }}>{(item.total || 0).toLocaleString('fr-FR')} FCFA</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{ width: '50%', marginLeft: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
          <span>Sous-total :</span>
          <span>{quote.subtotal?.toLocaleString('fr-FR')} FCFA</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>
          <span>TVA (18%) :</span>
          <span>{quote.tax?.toLocaleString('fr-FR')} FCFA</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontWeight: 'bold', fontSize: '20px', color: '#0077b6' }}>
          <span>Total TTC :</span>
          <span>{quote.total?.toLocaleString('fr-FR')} FCFA</span>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b', textAlign: 'center' }}>
        <p>NOB TECHNOLOGIES - SARL au capital de 1 000 000 FCFA - NINEA: 123456789</p>
        <p>Merci pour votre confiance !</p>
      </div>

      {/* Action Button */}
      <div className="no-print" style={{ position: 'fixed', bottom: '40px', right: '40px' }}>
        <button 
          onClick={() => window.print()}
          style={{ background: '#00B4D8', color: 'white', border: 'none', padding: '15px 25px', borderRadius: '50px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,180,216,0.4)' }}
        >
          🖨️ Imprimer / Sauvegarder en PDF
        </button>
      </div>
    </div>
  )
}
