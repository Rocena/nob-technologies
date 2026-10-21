'use client';

import React, { useState } from 'react';
import { useFormFields } from '@payloadcms/ui';
import { FileText, Send, CheckCircle2, AlertTriangle, Loader2, ExternalLink, BadgeCheck } from 'lucide-react';

export const InvoiceActionsPanel: React.FC = () => {
  const idField = useFormFields(([fields]) => fields.id);
  const statusField = useFormFields(([fields]) => fields.status);

  const [sending, setSending] = useState(false);
  const [markingPaid, setMarkingPaid] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const docId = idField?.value as string | undefined;
  const currentStatus = statusField?.value as string | undefined;

  if (!docId) {
    return (
      <div
        style={{
          padding: '16px',
          borderRadius: '14px',
          background: '#0f172a',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#94a3b8',
          fontSize: '12px',
          textAlign: 'center',
          marginBottom: '16px',
        }}
      >
        Enregistrez la facture une première fois pour générer le PDF officiel et l&apos;envoyer par email.
      </div>
    );
  }

  const pdfUrl = `/document/facture/${docId}`;

  const handleSendEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm('Souhaitez-vous envoyer automatiquement cette facture par email au client ?')) {
      return;
    }

    try {
      setSending(true);
      setFeedback(null);

      const res = await fetch('/api/admin/invoices/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceId: docId }),
        credentials: 'same-origin',
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setFeedback({
          type: 'success',
          message: data.message || 'Facture envoyée avec succès au client !',
        });
      } else {
        setFeedback({
          type: 'error',
          message: data.error || "Erreur lors de l'envoi de la facture.",
        });
      }
    } catch {
      setFeedback({
        type: 'error',
        message: "Erreur réseau lors de l'envoi de la facture.",
      });
    } finally {
      setSending(false);
    }
  };

  const handleMarkPaid = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setMarkingPaid(true);
      setFeedback(null);

      const res = await fetch('/api/admin/invoices/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceId: docId, action: 'mark_paid' }),
        credentials: 'same-origin',
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setFeedback({
          type: 'success',
          message: data.message || 'Facture marquée comme payée !',
        });
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setFeedback({
          type: 'error',
          message: data.error || 'Erreur lors de la mise à jour.',
        });
      }
    } catch {
      setFeedback({
        type: 'error',
        message: 'Erreur réseau.',
      });
    } finally {
      setMarkingPaid(false);
    }
  };

  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '16px',
        background: 'linear-gradient(145deg, #0b1120 0%, #0f172a 100%)',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        color: '#f8fafc',
        marginBottom: '16px',
        boxShadow: '0 14px 32px -12px rgba(2, 6, 23, 0.6)',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          paddingBottom: '10px',
          marginBottom: '12px',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: 800,
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FileText size={15} color="#00D4FF" />
          Actions Facture &amp; PDF
        </span>
        <span
          style={{
            fontSize: '10px',
            fontFamily: 'monospace',
            padding: '2px 8px',
            borderRadius: '999px',
            background: currentStatus === 'paid' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.08)',
            color: currentStatus === 'paid' ? '#6ee7b7' : '#cbd5e1',
            fontWeight: 700,
            textTransform: 'uppercase',
          }}
        >
          {currentStatus === 'paid' ? 'Payée' : currentStatus || 'Brouillon'}
        </span>
      </div>

      {feedback && (
        <div
          style={{
            padding: '10px 12px',
            borderRadius: '10px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
            background: feedback.type === 'success' ? 'rgba(16, 185, 129, 0.14)' : 'rgba(244, 63, 94, 0.14)',
            border: `1px solid ${feedback.type === 'success' ? 'rgba(16, 185, 129, 0.35)' : 'rgba(244, 63, 94, 0.35)'}`,
            color: feedback.type === 'success' ? '#6ee7b7' : '#fda4af',
          }}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0 }} />
          ) : (
            <AlertTriangle size={16} color="#fb7185" style={{ flexShrink: 0 }} />
          )}
          <span style={{ lineHeight: 1.4 }}>{feedback.message}</span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '11px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxSizing: 'border-box',
          }}
        >
          <FileText size={14} color="#00D4FF" />
          <span>Ouvrir / Imprimer la Facture PDF</span>
          <ExternalLink size={12} color="#94a3b8" style={{ marginLeft: 'auto' }} />
        </a>

        <button
          type="button"
          onClick={handleSendEmail}
          disabled={sending}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '11px',
            background: 'linear-gradient(135deg, #00D4FF 0%, #0284c7 100%)',
            border: 'none',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            cursor: sending ? 'wait' : 'pointer',
            opacity: sending ? 0.6 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          {sending ? <Loader2 size={14} /> : <Send size={14} />}
          <span>{sending ? 'Envoi en cours...' : 'Envoyer par email en 1 clic'}</span>
        </button>

        {currentStatus !== 'paid' && (
          <button
            type="button"
            onClick={handleMarkPaid}
            disabled={markingPaid}
            style={{
              width: '100%',
              padding: '9px 14px',
              borderRadius: '11px',
              background: 'rgba(16, 185, 129, 0.16)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              color: '#6ee7b7',
              fontSize: '12px',
              fontWeight: 700,
              cursor: markingPaid ? 'wait' : 'pointer',
              opacity: markingPaid ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {markingPaid ? <Loader2 size={14} /> : <BadgeCheck size={14} />}
            <span>Marquer comme Acquittée (Payée)</span>
          </button>
        )}
      </div>

      <p style={{ margin: '10px 0 0', fontSize: '10.5px', color: '#64748b', lineHeight: 1.45 }}>
        Génère la facture officielle NOB TECHNOLOGIES (avec cachet « Acquittée » si payée) et l&apos;envoie directement au client.
      </p>
    </div>
  );
};
