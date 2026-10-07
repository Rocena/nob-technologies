'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'
import { FileText } from 'lucide-react'

export const GeneratePDFButton: React.FC = () => {
  const idField = useFormFields(([fields]) => fields.id)
  
  if (!idField?.value) {
    return (
      <div style={{ padding: '20px 0', color: '#64748b' }}>
        Enregistrez le document une première fois pour générer le PDF.
      </div>
    )
  }

  // We check the URL to know if it's a quote or invoice
  const isInvoice = typeof window !== 'undefined' && window.location.pathname.includes('/invoices/')
  const type = isInvoice ? 'facture' : 'devis'
  const url = `/document/${type}/${idField.value}`

  return (
    <div style={{ margin: '20px 0' }}>
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#00B4D8',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600',
          transition: 'transform 0.2s ease',
          boxShadow: '0 4px 14px 0 rgba(0, 180, 216, 0.4)'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)' }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
      >
        <FileText size={18} />
        Ouvrir le PDF (Imprimer)
      </a>
      <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px' }}>
        Cliquez sur ce bouton pour ouvrir le document au format imprimable, puis faites Ctrl+P (ou Cmd+P) pour l'enregistrer en PDF.
      </p>
    </div>
  )
}
