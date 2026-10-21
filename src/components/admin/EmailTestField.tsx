'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertTriangle, Loader2, Sparkles } from 'lucide-react';

const EMAIL_STUDIO_CSS = `
  .nob-email-studio {
    --es-bg: #ffffff;
    --es-bg-sub: #f8fafc;
    --es-border: #e2e8f0;
    --es-text: #0f172a;
    --es-text-sub: #475569;
    --es-text-muted: #64748b;
    --es-input-bg: #ffffff;
    --es-input-border: #cbd5e1;

    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--es-bg);
    border: 1px solid var(--es-border);
    border-radius: 18px;
    padding: 24px;
    color: var(--es-text);
    max-width: 880px;
    margin-top: 16px;
    box-shadow: 0 4px 20px -4px rgba(15, 23, 42, 0.05);
  }

  html[data-nob-theme="dark"] .nob-email-studio {
    --es-bg: #0f172a;
    --es-bg-sub: #1e293b;
    --es-border: rgba(255, 255, 255, 0.1);
    --es-text: #f8fafc;
    --es-text-sub: #cbd5e1;
    --es-text-muted: #94a3b8;
    --es-input-bg: #020617;
    --es-input-border: rgba(148, 163, 184, 0.28);
    box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.35);
  }

  .nob-email-studio h4 {
    margin: 0 !important;
    font-size: 16px !important;
    font-weight: 800 !important;
    color: var(--es-text) !important;
  }

  .nob-email-studio select.nob-es-select,
  .nob-email-studio input.nob-es-input {
    width: 100% !important;
    box-sizing: border-box !important;
    padding: 11px 14px !important;
    border-radius: 10px !important;
    background: var(--es-input-bg) !important;
    border: 1px solid var(--es-input-border) !important;
    color: var(--es-text) !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    outline: none !important;
  }

  .nob-email-studio select.nob-es-select:focus,
  .nob-email-studio input.nob-es-input:focus {
    border-color: #0284c7 !important;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.14) !important;
  }
`;

const TEMPLATE_OPTIONS = [
  {
    id: 'diagnostic',
    label: 'Diagnostic SMTP Standard',
    description: "Vérifie la liaison brute avec le serveur SMTP et les identifiants d'authentification.",
  },
  {
    id: 'ack',
    label: 'Modèle 1 : Accusé de réception Client',
    description: "Teste l'email officiel envoyé instantanément au client après soumission d'un formulaire.",
  },
  {
    id: 'admin_notify',
    label: 'Modèle 2 : Notification Alerte Administrateur',
    description: "Teste l'alerte haute priorité transmise aux administrateurs avec récapitulatif.",
  },
  {
    id: 'admission_accepted',
    label: 'Modèle 3 : Candidature Formation — Admission Validée',
    description: "Teste l'email d'acceptation officiel avec la session, cohorte et félicitations.",
  },
  {
    id: 'admission_declined',
    label: 'Modèle 4 : Candidature Formation — Non Retenue / Reportée',
    description: "Teste l'email bienveillant de refus ou de mise en liste d'attente.",
  },
  {
    id: 'quote',
    label: 'Modèle 5 : Envoi de Devis Commercial Officiel',
    description: "Teste l'email accompagnant un devis chiffré avec le lien de téléchargement PDF.",
  },
];

export const EmailTestField: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [templateType, setTemplateType] = useState('diagnostic');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message?: string;
    error?: string;
    messageId?: string;
    templateTested?: string;
  } | null>(null);

  const selectedTemplate = TEMPLATE_OPTIONS.find((t) => t.id === templateType) || TEMPLATE_OPTIONS[0];

  const handleTestSend = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSending(true);
    setResult(null);

    try {
      const res = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: recipient.trim(),
          templateType,
        }),
        credentials: 'same-origin',
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setResult({
          success: true,
          message: data.message || 'E-mail de test envoyé avec succès !',
          messageId: data.messageId,
          templateTested: selectedTemplate.label,
        });
      } else {
        setResult({
          success: false,
          error: data.error || "Erreur lors de l'envoi de l'e-mail de test. Vérifiez vos identifiants SMTP.",
        });
      }
    } catch (err: any) {
      setResult({
        success: false,
        error: err?.message || 'Erreur réseau lors de la communication avec le serveur.',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="nob-email-studio">
      <style dangerouslySetInnerHTML={{ __html: EMAIL_STUDIO_CSS }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(2, 132, 199, 0.1)',
            border: '1px solid rgba(2, 132, 199, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0284c7',
            flexShrink: 0,
          }}
        >
          <Mail size={22} />
        </div>
        <div>
          <h4>Console de Test SMTP &amp; Modèles d&apos;E-mails en Direct</h4>
          <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: 'var(--es-text-sub)' }}>
            Envoyez un e-mail réel pour vérifier votre configuration SMTP ou prévisualiser vos modèles personnalisés.
          </p>
        </div>
      </div>

      <div
        style={{
          padding: '12px 16px',
          borderRadius: '12px',
          background: 'var(--es-bg-sub)',
          border: '1px solid var(--es-border)',
          fontSize: '12.5px',
          color: 'var(--es-text-sub)',
          marginBottom: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Sparkles size={15} color="#0284c7" style={{ flexShrink: 0 }} />
        <span>
          Si vous venez de modifier un paramètre SMTP ou un texte ci-dessus, cliquez d&apos;abord sur{' '}
          <strong style={{ color: 'var(--es-text)' }}>« Enregistrer »</strong> en haut à droite avant de lancer le test.
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          marginBottom: '16px',
        }}
      >
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '12.5px',
              fontWeight: 700,
              color: 'var(--es-text)',
              marginBottom: '6px',
            }}
          >
            Modèle d&apos;e-mail à tester :
          </label>
          <select
            className="nob-es-select"
            value={templateType}
            onChange={(e) => setTemplateType(e.target.value)}
          >
            {TEMPLATE_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
          <div style={{ fontSize: '11.5px', color: 'var(--es-text-muted)', marginTop: '6px' }}>
            {selectedTemplate.description}
          </div>
        </div>

        <div>
          <label
            style={{
              display: 'block',
              fontSize: '12.5px',
              fontWeight: 700,
              color: 'var(--es-text)',
              marginBottom: '6px',
            }}
          >
            Adresse email destinataire du test :
          </label>
          <input
            type="email"
            className="nob-es-input"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                handleTestSend();
              }
            }}
            placeholder="ex: contact@nobtech.fr (ou laissez vide pour votre email)"
          />
          <div style={{ fontSize: '11.5px', color: 'var(--es-text-muted)', marginTop: '6px' }}>
            Laissez vide pour envoyer par défaut à votre adresse administrateur connectée.
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled={sending}
        onClick={handleTestSend}
        style={{
          all: 'unset',
          boxSizing: 'border-box',
          cursor: sending ? 'wait' : 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '11px 20px',
          borderRadius: '11px',
          background: '#0284c7',
          color: '#ffffff',
          fontSize: '13px',
          fontWeight: 800,
          boxShadow: '0 6px 16px -4px rgba(2, 132, 199, 0.35)',
        }}
      >
        {sending ? <Loader2 size={15} /> : <Send size={15} />}
        <span>{sending ? 'Envoi du test en cours...' : 'Envoyer l’e-mail de test maintenant'}</span>
      </button>

      {result && (
        <div
          style={{
            marginTop: '16px',
            padding: '14px 16px',
            borderRadius: '12px',
            background: result.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${result.success ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)'}`,
            color: result.success ? '#059669' : '#e11d48',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {result.success ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          <div>
            <div style={{ fontWeight: 700 }}>{result.success ? result.message : result.error}</div>
            {result.messageId && (
              <div style={{ fontSize: '11px', opacity: 0.85, marginTop: '2px', fontFamily: 'monospace' }}>
                Message ID : {result.messageId}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
