'use client';

import React from 'react';
import { Printer, ArrowLeft } from 'lucide-react';

interface DocumentPrintBarProps {
  title?: string;
  backHref?: string;
}

export const DocumentPrintBar: React.FC<DocumentPrintBarProps> = ({
  title = 'Document Officiel NOB TECHNOLOGIES',
  backHref = '/admin',
}) => {
  return (
    <div
      className="no-print"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(16px)',
        padding: '10px 14px',
        borderRadius: '999px',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      <a
        href={backHref}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: '#cbd5e1',
          textDecoration: 'none',
          fontSize: '12.5px',
          fontWeight: 600,
          padding: '8px 14px',
          borderRadius: '999px',
          background: 'rgba(255, 255, 255, 0.06)',
        }}
      >
        <ArrowLeft size={14} />
        <span>Back-Office</span>
      </a>

      <button
        type="button"
        onClick={() => window.print()}
        title={title}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'linear-gradient(135deg, #00D4FF 0%, #0284C7 100%)',
          color: '#020617',
          border: 'none',
          padding: '9px 20px',
          borderRadius: '999px',
          fontSize: '13px',
          fontWeight: 800,
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(0, 212, 255, 0.35)',
        }}
      >
        <Printer size={15} />
        <span>Imprimer / Télécharger PDF</span>
      </button>
    </div>
  );
};
