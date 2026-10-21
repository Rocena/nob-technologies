'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertTriangle, Loader2, Sparkles } from 'lucide-react';

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
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        background: 'linear-gradient(145deg, #0b1120 0%, #0f172a 100%)',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        borderRadius: '20px',
        padding: '24px',
        color: '#f8fafc',
        maxWidth: '880px',
        marginTop: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(0, 212, 255, 0.12)',
            border: '1px solid rgba(0, 212, 255, 0.28)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00D4FF',
          }}
        >
          <Mail size={22} />
        </div>
        <div>
          <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
            Console de Test SMTP &amp; Modèles d&apos;E-mails en Direct
          </h4>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>
            Envoyez un e-mail réel pour vérifier votre configuration SMTP ou prévisualiser vos modèles personnalisés.
          </p>
        </div>
      </div>

      <div
        style={{
          padding: '12px 16px',
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          fontSize: '12px',
          color: '#cbd5e1',
          marginBottom: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Sparkles size={15} color="#00D4FF" style={{ flexShrink: 0 }} />
        <span>
          Si vous venez de modifier un paramètre SMTP ou un texte ci-dessus, cliquez d&apos;abord sur <strong>« Enregistrer »</strong> en haut à droite avant de lancer le test.
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
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
            Modèle d&apos;e-mail à tester :
          </label>
          <select
            value={templateType}
            onChange={(e) => setTemplateType(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '10px',
              background: '#020617',
              border: '1px solid rgba(148,163,184,0.28)',
              color: '#ffffff',
              fontSize: '12.5px',
              fontWeight: 600,
            }}
          >
            {TEMPLATE_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id} style={{ background: '#0f172a', color: '#ffffff' }}>
                {opt.label}
              </option>
            ))}
          </select>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>{selectedTemplate.description}</div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
            Adresse email destinataire du test :
          </label>
          <input
            type="email"
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
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '10px 12px',
              borderRadius: '10px',
              background: '#020617',
              border: '1px solid rgba(148,163,184,0.28)',
              color: '#ffffff',
              fontSize: '12.5px',
            }}
          />
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
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
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #00D4FF 0%, #0284C7 100%)',
          color: '#020617',
          fontSize: '12.5px',
          fontWeight: 800,
          boxShadow: '0 8px 20px -6px rgba(0, 212, 255, 0.45)',
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
            background: result.success ? 'rgba(16, 185, 129, 0.12)' : 'rgba(244, 63, 94, 0.12)',
            border: `1px solid ${result.success ? 'rgba(16, 185, 129, 0.35)' : 'rgba(244, 63, 94, 0.35)'}`,
            color: result.success ? '#6ee7b7' : '#fda4af',
            fontSize: '12.5px',
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
