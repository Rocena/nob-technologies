'use client';

import React, { useState } from 'react';
import { useFormFields } from '@payloadcms/ui';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  Loader2,
  Mail,
  GraduationCap,
  AlertCircle,
  Sparkles,
  Award,
  ExternalLink,
} from 'lucide-react';

export const AdmissionActionsPanel: React.FC = () => {
  const idField = useFormFields(([fields]) => fields.id);
  const statusField = useFormFields(([fields]) => fields.status);
  const candidateNameField = useFormFields(([fields]) => fields.candidateName);
  const emailField = useFormFields(([fields]) => fields.email);
  const formationTitleField = useFormFields(([fields]) => fields.formationTitle);
  const targetSessionField = useFormFields(([fields]) => fields.targetSession);
  const emailSentAtField = useFormFields(([fields]) => fields.emailSentAt);

  const [loading, setLoading] = useState(false);
  const [sendingCert, setSendingCert] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [customFeedback, setCustomFeedback] = useState<string>('');
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [pendingDecision, setPendingDecision] = useState<'accepted' | 'declined' | null>(null);

  const docId = idField?.value as string | undefined;
  const currentStatus = (statusField?.value as string) || 'pending';
  const candidateName = (candidateNameField?.value as string) || 'Candidat';
  const candidateEmail = emailField?.value as string | undefined;
  const formationTitle = (formationTitleField?.value as string) || 'Formation';
  const targetSession = (targetSessionField?.value as string) || 'Session Prochaine';
  const emailSentAt = emailSentAtField?.value as string | undefined;

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
        Enregistrez le dossier pour débloquer les actions de validation, le certificat PDF et l&apos;envoi d&apos;email automatique.
      </div>
    );
  }

  const handleTriggerDecision = (e: React.MouseEvent, decision: 'accepted' | 'declined') => {
    e.preventDefault();
    e.stopPropagation();
    setPendingDecision(decision);
    setShowFeedbackInput(true);
    setFeedback(null);
  };

  const handleConfirmDecision = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!pendingDecision) return;

    try {
      setLoading(true);
      setFeedback(null);

      const res = await fetch('/api/admin/admissions/decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          admissionId: docId,
          decision: pendingDecision,
          adminFeedback: customFeedback.trim() || undefined,
        }),
        credentials: 'same-origin',
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setFeedback({
          type: 'success',
          message:
            pendingDecision === 'accepted'
              ? `Admission validée ! Email d'acceptation envoyé à ${candidateEmail}.`
              : `Candidature déclinée. Email de notification envoyé à ${candidateEmail}.`,
        });
        setShowFeedbackInput(false);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setFeedback({
          type: 'error',
          message: data.error || "Erreur lors du traitement de la décision d'admission.",
        });
      }
    } catch {
      setFeedback({
        type: 'error',
        message: 'Erreur réseau lors de la communication avec le serveur.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendCertificate = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm(`Envoyer le Certificat Officiel de réussite par email à ${candidateEmail} ?`)) {
      return;
    }

    try {
      setSendingCert(true);
      setFeedback(null);

      const res = await fetch('/api/admin/admissions/send-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ admissionId: docId }),
        credentials: 'same-origin',
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setFeedback({
          type: 'success',
          message: data.message || 'Certificat envoyé par email avec succès !',
        });
      } else {
        setFeedback({
          type: 'error',
          message: data.error || "Erreur lors de l'envoi du certificat.",
        });
      }
    } catch {
      setFeedback({
        type: 'error',
        message: "Erreur réseau lors de l'envoi du certificat.",
      });
    } finally {
      setSendingCert(false);
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
      {/* Header */}
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
          <GraduationCap size={16} color="#00D4FF" />
          Décision &amp; Certification
        </span>
        <span
          style={{
            fontSize: '10px',
            fontFamily: 'monospace',
            padding: '2px 9px',
            borderRadius: '999px',
            fontWeight: 700,
            textTransform: 'uppercase',
            background:
              currentStatus === 'accepted'
                ? 'rgba(16, 185, 129, 0.2)'
                : currentStatus === 'declined'
                ? 'rgba(244, 63, 94, 0.2)'
                : 'rgba(245, 158, 11, 0.2)',
            color:
              currentStatus === 'accepted'
                ? '#34d399'
                : currentStatus === 'declined'
                ? '#fb7185'
                : '#fbbf24',
          }}
        >
          {currentStatus === 'accepted'
            ? 'Admis / Validé'
            : currentStatus === 'declined'
            ? 'Déclinée'
            : 'En attente'}
        </span>
      </div>

      {/* Target details reminder */}
      <div
        style={{
          fontSize: '11.5px',
          color: '#94a3b8',
          background: 'rgba(2, 6, 23, 0.6)',
          padding: '10px 12px',
          borderRadius: '11px',
          border: '1px solid rgba(255,255,255,0.07)',
          marginBottom: '12px',
        }}
      >
        <div style={{ marginBottom: '4px' }}>
          <span style={{ color: '#64748b', fontFamily: 'monospace' }}>Candidat :</span>{' '}
          <strong style={{ color: '#e2e8f0' }}>{candidateName}</strong>
        </div>
        <div>
          <span style={{ color: '#64748b', fontFamily: 'monospace' }}>Session :</span>{' '}
          <span style={{ color: '#38bdf8', fontWeight: 600 }}>{targetSession}</span>
        </div>
        {emailSentAt && (
          <div
            style={{
              fontSize: '10px',
              color: '#64748b',
              paddingTop: '6px',
              marginTop: '6px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <Clock size={11} color="#00D4FF" />
            Dernier email : {new Date(emailSentAt).toLocaleString('fr-FR')}
          </div>
        )}
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
            <AlertCircle size={16} color="#fb7185" style={{ flexShrink: 0 }} />
          )}
          <span style={{ lineHeight: 1.4 }}>{feedback.message}</span>
        </div>
      )}

      {/* Decision confirmation modal / drawer */}
      {showFeedbackInput && pendingDecision && (
        <div
          style={{
            padding: '14px',
            borderRadius: '12px',
            background: '#020617',
            border: '1px solid rgba(0, 212, 255, 0.35)',
            marginBottom: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
            <Sparkles size={14} color="#00D4FF" />
            <span>
              {pendingDecision === 'accepted'
                ? 'Validation & Envoi de la convocation'
                : 'Confirmation de refus & Notification'}
            </span>
          </div>
          <p style={{ margin: '0 0 10px', fontSize: '11px', color: '#94a3b8' }}>
            Un email officiel corporate sera envoyé immédiatement à{' '}
            <strong style={{ color: '#e2e8f0' }}>{candidateEmail}</strong>.
          </p>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '10px', fontFamily: 'monospace', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>
              Instructions ou message personnalisé (Optionnel) :
            </label>
            <textarea
              value={customFeedback}
              onChange={(e) => setCustomFeedback(e.target.value)}
              placeholder={
                pendingDecision === 'accepted'
                  ? 'Ex: Félicitations ! Votre entretien préliminaire est validé...'
                  : 'Ex: Votre profil est prometteur mais nécessite de consolider...'
              }
              rows={3}
              style={{
                width: '100%',
                fontSize: '12px',
                padding: '8px',
                borderRadius: '8px',
                background: '#0f172a',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#ffffff',
                resize: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              disabled={loading}
              onClick={handleConfirmDecision}
              style={{
                flex: 1,
                padding: '9px 12px',
                borderRadius: '9px',
                fontSize: '12px',
                fontWeight: 700,
                border: 'none',
                color: '#ffffff',
                cursor: loading ? 'wait' : 'pointer',
                background:
                  pendingDecision === 'accepted'
                    ? 'linear-gradient(135deg, #059669 0%, #0d9488 100%)'
                    : 'linear-gradient(135deg, #e11d48 0%, #dc2626 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              {loading ? <Loader2 size={13} /> : <Send size={13} />}
              <span>{loading ? 'Envoi en cours...' : 'Confirmer & Envoyer'}</span>
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowFeedbackInput(false);
                setPendingDecision(null);
              }}
              style={{
                padding: '9px 12px',
                borderRadius: '9px',
                fontSize: '12px',
                color: '#cbd5e1',
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Main 1-Click Action Buttons */}
      {!showFeedbackInput && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            type="button"
            onClick={(e) => handleTriggerDecision(e, 'accepted')}
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '11px',
              background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
              border: 'none',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <CheckCircle2 size={15} />
            <span>Valider l&apos;admission &bull; Envoyer email</span>
          </button>

          <button
            type="button"
            onClick={(e) => handleTriggerDecision(e, 'declined')}
            disabled={loading}
            style={{
              width: '100%',
              padding: '9px 14px',
              borderRadius: '11px',
              background: 'rgba(244, 63, 94, 0.12)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              color: '#fda4af',
              fontWeight: 700,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <XCircle size={15} color="#fb7185" />
            <span>Décliner la candidature &bull; Notifier</span>
          </button>

          {/* SECTION CERTIFICAT OFFICIEL NOBTECH ACADEMY */}
          <div
            style={{
              paddingTop: '10px',
              marginTop: '6px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div
              style={{
                fontSize: '10px',
                fontFamily: 'monospace',
                color: '#38bdf8',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Award size={13} />
              <span>Certificat &amp; Attestation PDF</span>
            </div>

            <a
              href={`/document/certificat/${docId}`}
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
              <Award size={14} color="#00D4FF" />
              <span>Générer / Imprimer le Certificat PDF</span>
              <ExternalLink size={12} color="#94a3b8" style={{ marginLeft: 'auto' }} />
            </a>

            <button
              type="button"
              onClick={handleSendCertificate}
              disabled={sendingCert}
              style={{
                width: '100%',
                padding: '9px 14px',
                borderRadius: '11px',
                background: 'rgba(0, 212, 255, 0.14)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                color: '#7dd3fc',
                fontWeight: 700,
                fontSize: '12px',
                cursor: sendingCert ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {sendingCert ? <Loader2 size={14} /> : <Send size={13} />}
              <span>{sendingCert ? 'Envoi du certificat...' : 'Envoyer le Certificat par Email'}</span>
            </button>
          </div>

          {candidateEmail && (
            <a
              href={`mailto:${candidateEmail}?subject=${encodeURIComponent(
                `[NOB TECHNOLOGIES] Votre candidature à la formation ${formationTitle}`
              )}`}
              style={{
                width: '100%',
                padding: '8px 14px',
                borderRadius: '11px',
                background: 'rgba(30, 41, 59, 0.7)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#cbd5e1',
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxSizing: 'border-box',
              }}
            >
              <Mail size={14} color="#94a3b8" />
              <span>Contacter directement par email</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
};
