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
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 text-center">
        Enregistrez la facture une première fois pour générer le PDF officiel et l&apos;envoyer par email.
      </div>
    );
  }

  const pdfUrl = `/document/facture/${docId}`;

  const handleSendEmail = async () => {
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

  const handleMarkPaid = async () => {
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
    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 space-y-3.5 mb-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <FileText size={15} className="text-[#00D4FF]" />
          Actions Facture &amp; PDF
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold uppercase">
          {currentStatus === 'paid' ? 'Payée' : currentStatus || 'Brouillon'}
        </span>
      </div>

      {feedback && (
        <div
          className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle size={16} className="text-rose-400 shrink-0" />
          )}
          <span className="leading-snug">{feedback.message}</span>
        </div>
      )}

      <div className="space-y-2">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 group"
        >
          <FileText size={14} className="text-[#00D4FF]" />
          <span>Ouvrir / Imprimer la Facture PDF</span>
          <ExternalLink size={12} className="text-slate-500 group-hover:text-white transition-colors ml-auto" />
        </a>

        <button
          type="button"
          onClick={handleSendEmail}
          disabled={sending}
          className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0077b6] text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00D4FF]/20"
        >
          {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          <span>{sending ? 'Envoi en cours...' : 'Envoyer par email en 1 clic'}</span>
        </button>

        {currentStatus !== 'paid' && (
          <button
            type="button"
            onClick={handleMarkPaid}
            disabled={markingPaid}
            className="w-full py-2 px-3.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            {markingPaid ? <Loader2 size={14} className="animate-spin" /> : <BadgeCheck size={14} />}
            <span>Marquer comme Acquittée (Payée)</span>
          </button>
        )}
      </div>

      <p className="text-[10px] text-slate-500 leading-normal pt-1">
        Génère la facture officielle NOB TECHNOLOGIES (avec cachet « Acquittée » si payée) et l&apos;envoie directement au client.
      </p>
    </div>
  );
};
