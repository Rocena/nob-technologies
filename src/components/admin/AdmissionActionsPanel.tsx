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
} from 'lucide-react';

export const AdmissionActionsPanel: React.FC = () => {
  const idField = useFormFields(([fields]) => fields.id);
  const statusField = useFormFields(([fields]) => fields.status);
  const candidateNameField = useFormFields(([fields]) => fields.candidateName);
  const emailField = useFormFields(([fields]) => fields.email);
  const formationTitleField = useFormFields(([fields]) => fields.formationTitle);
  const targetSessionField = useFormFields(([fields]) => fields.targetSession);
  const emailSentAtField = useFormFields(([fields]) => fields.emailSentAt);
  const adminFeedbackField = useFormFields(([fields]) => fields.adminFeedback);

  const [loading, setLoading] = useState(false);
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
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 text-center">
        Enregistrez le dossier pour débloquer les actions de validation et l&apos;envoi d&apos;email automatique.
      </div>
    );
  }

  const handleTriggerDecision = (decision: 'accepted' | 'declined') => {
    setPendingDecision(decision);
    setShowFeedbackInput(true);
    setFeedback(null);
  };

  const handleConfirmDecision = async () => {
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
        // Refresh page after 1.5s to display updated CMS fields
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

  return (
    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 space-y-4 mb-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <GraduationCap size={16} className="text-[#00D4FF]" />
          Décision Admission
        </span>
        <span
          className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
            currentStatus === 'accepted'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : currentStatus === 'declined'
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
          }`}
        >
          {currentStatus === 'accepted'
            ? 'Admis / Validé'
            : currentStatus === 'declined'
            ? 'Candidature Déclinée'
            : 'En attente d’examen'}
        </span>
      </div>

      {/* Target details reminder */}
      <div className="text-[11px] text-slate-400 space-y-1 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
        <div>
          <span className="text-slate-500 font-mono">Candidat :</span>{' '}
          <strong className="text-slate-200">{candidateName}</strong>
        </div>
        <div>
          <span className="text-slate-500 font-mono">Session :</span>{' '}
          <span className="text-cyan-400">{targetSession}</span>
        </div>
        {emailSentAt && (
          <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/50 flex items-center gap-1">
            <Clock size={11} className="text-cyan-500" />
            Dernier email envoyé le : {new Date(emailSentAt).toLocaleString('fr-FR')}
          </div>
        )}
      </div>

      {feedback && (
        <div
          className={`p-3 rounded-xl text-xs flex items-center gap-2.5 ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle size={16} className="text-rose-400 shrink-0" />
          )}
          <span className="leading-snug">{feedback.message}</span>
        </div>
      )}

      {/* Decision confirmation modal / drawer */}
      {showFeedbackInput && pendingDecision && (
        <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white">
            <Sparkles size={14} className="text-cyan-400" />
            <span>
              {pendingDecision === 'accepted'
                ? 'Validation & Envoi de la convocation'
                : 'Confirmation de refus & Notification'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Un email officiel corporate sera envoyé immédiatement à{' '}
            <strong className="text-slate-200">{candidateEmail}</strong>.
          </p>

          <div>
            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
              Instructions ou message personnalisé (Optionnel) :
            </label>
            <textarea
              value={customFeedback}
              onChange={(e) => setCustomFeedback(e.target.value)}
              placeholder={
                pendingDecision === 'accepted'
                  ? 'Ex: Félicitations ! Votre entretien préliminaire est validé. Votre tuteur pédagogique sera M. Ndiaye.'
                  : 'Ex: Votre profil est prometteur mais nécessite de consolider au préalable les bases réseau. Nous vous recommandons...'
              }
              rows={3}
              className="w-full text-xs p-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              disabled={loading}
              onClick={handleConfirmDecision}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                pendingDecision === 'accepted'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-lg shadow-rose-500/20'
              } disabled:opacity-50`}
            >
              {loading ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <Send size={13} />
                  <span>
                    Confirmer &amp; Envoyer l&apos;email
                  </span>
                </>
              )}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setShowFeedbackInput(false);
                setPendingDecision(null);
              }}
              className="py-2 px-3 rounded-lg text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Main 1-Click Action Buttons */}
      {!showFeedbackInput && (
        <div className="space-y-2">
          {/* Valider l'admission */}
          <button
            type="button"
            onClick={() => handleTriggerDecision('accepted')}
            disabled={loading}
            className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-50"
          >
            <CheckCircle2 size={15} />
            <span>Valider l&apos;admission &bull; Envoyer email</span>
          </button>

          {/* Décliner la candidature */}
          <button
            type="button"
            onClick={() => handleTriggerDecision('declined')}
            disabled={loading}
            className="w-full py-2 px-3.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-semibold text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <XCircle size={15} className="text-rose-400" />
            <span>Décliner la candidature &bull; Notifier</span>
          </button>

          {/* Direct candidate email */}
          {candidateEmail && (
            <a
              href={`mailto:${candidateEmail}?subject=${encodeURIComponent(
                `[NOB TECHNOLOGIES] Votre candidature à la formation ${formationTitle}`
              )}`}
              className="w-full py-2 px-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-medium text-xs transition-colors flex items-center justify-center gap-2 border border-slate-700"
            >
              <Mail size={14} className="text-slate-400" />
              <span>Contacter directement par email</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
};
