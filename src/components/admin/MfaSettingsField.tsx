'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, KeyRound, QrCode, CheckCircle2, AlertTriangle, Loader2, Copy, Check } from 'lucide-react';

export const MfaSettingsField: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [setupData, setSetupData] = useState<{ secret: string; qrCodeDataUrl: string } | null>(null);
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [disabling, setDisabling] = useState(false);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/admin/mfa/status', { credentials: 'same-origin' });
      if (res.ok) {
        const data = await res.json();
        setMfaEnabled(Boolean(data.mfaEnabled));
      }
    } catch {
      setError('Impossible de récupérer le statut de sécurité.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleStartSetup = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMsg(null);
      const res = await fetch('/api/admin/mfa/setup', {
        method: 'POST',
        credentials: 'same-origin',
      });
      if (res.ok) {
        const data = await res.json();
        setSetupData(data);
      } else {
        const err = await res.json().catch(() => ({}));
        setError(err.error || 'Erreur lors de la génération des clés MFA.');
      }
    } catch {
      setError('Erreur réseau lors de la configuration.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.trim().length !== 6) {
      setError('Veuillez saisir un code à 6 chiffres.');
      return;
    }

    try {
      setVerifying(true);
      setError(null);
      const res = await fetch('/api/admin/mfa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() }),
        credentials: 'same-origin',
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setMfaEnabled(true);
        setSetupData(null);
        setCode('');
        setSuccessMsg('Félicitations ! Votre double authentification TOTP (MFA) est désormais active.');
      } else {
        setError(data.error || 'Code invalide ou expiré. Assurez-vous que l\'heure de votre téléphone est synchronisée.');
      }
    } catch {
      setError('Erreur lors de la validation du code.');
    } finally {
      setVerifying(false);
    }
  };

  const handleDisable = async () => {
    if (!confirm('Attention : Désactiver le MFA réduit la sécurité de votre compte administrateur. Confirmez-vous ?')) {
      return;
    }

    try {
      setDisabling(true);
      setError(null);
      setSuccessMsg(null);
      const res = await fetch('/api/admin/mfa/disable', {
        method: 'POST',
        credentials: 'same-origin',
      });
      if (res.ok) {
        setMfaEnabled(false);
        setSetupData(null);
        setSuccessMsg('La double authentification a été désactivée.');
      } else {
        const err = await res.json().catch(() => ({}));
        setError(err.error || 'Erreur lors de la désactivation.');
      }
    } catch {
      setError('Erreur réseau.');
    } finally {
      setDisabling(false);
    }
  };

  const copySecret = () => {
    if (setupData?.secret) {
      navigator.clipboard.writeText(setupData.secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-slate-900/60 rounded-2xl border border-slate-800 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-[#00D4FF] animate-spin" />
        <span className="text-sm text-slate-400">Vérification de la sécurité MFA...</span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-slate-900/80 rounded-2xl border border-slate-800 text-slate-100 shadow-xl max-w-3xl">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${mfaEnabled ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
            {mfaEnabled ? <ShieldCheck size={28} /> : <ShieldAlert size={28} />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Authentification à Deux Facteurs (MFA / 2FA)
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${mfaEnabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                {mfaEnabled ? 'ACTIF' : 'INACTIF'}
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Standard ouvert TOTP (RFC 6238) — Compatible Google Authenticator, Microsoft Authenticator, Authy, FreeOTP.
            </p>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* ETAT 1 : MFA DEJA ACTIF */}
      {mfaEnabled && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-slate-300 space-y-2">
            <p className="flex items-center gap-2 text-white font-medium">
              <CheckCircle2 size={16} className="text-emerald-400" /> Votre compte est protégé au niveau maximal.
            </p>
            <p className="text-xs text-slate-400">
              Lors de chaque connexion sur le back office NOBTECH, un code temporaire à 6 chiffres généré par votre application d&apos;authentification est exigé après votre mot de passe.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleDisable}
              disabled={disabling}
              className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-semibold transition-all flex items-center gap-2"
            >
              {disabling ? <Loader2 size={14} className="animate-spin" /> : <AlertTriangle size={14} />}
              {disabling ? 'Désactivation...' : 'Désactiver la double authentification'}
            </button>
            <button
              type="button"
              onClick={handleStartSetup}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-all flex items-center gap-2"
            >
              <KeyRound size={14} />
              Reconfigurer sur un nouvel appareil
            </button>
          </div>
        </div>
      )}

      {/* ETAT 2 : CONFIGURATION EN COURS */}
      {setupData && (
        <div className="mt-6 p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h4 className="font-semibold text-white text-sm flex items-center gap-2">
              <QrCode size={18} className="text-[#00D4FF]" /> Configuration de votre application d&apos;authentification
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Ouvrez Google Authenticator, Microsoft Authenticator ou Authy sur votre smartphone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* QR Code */}
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={setupData.qrCodeDataUrl}
                alt="QR Code MFA Nobtech"
                className="w-48 h-48 rounded"
              />
              <span className="text-[11px] text-slate-600 font-medium mt-2">Scannez ce QR Code avec l&apos;application</span>
            </div>

            {/* Saisie Manuelle */}
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Clé secrète (si vous ne pouvez pas scanner) :</label>
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-2.5">
                  <code className="text-xs font-mono text-[#00D4FF] select-all flex-1 tracking-wider">
                    {setupData.secret}
                  </code>
                  <button
                    type="button"
                    onClick={copySecret}
                    className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                    title="Copier la clé"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <form onSubmit={handleVerify} className="space-y-3 pt-2">
                <label className="text-xs font-medium text-slate-300 block">
                  Entrez le code à 6 chiffres affiché sur votre téléphone :
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="w-full text-center tracking-[0.5em] font-mono text-2xl py-3 px-4 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={verifying || code.length !== 6}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0077b6] text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00D4FF]/20"
                >
                  {verifying ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                  {verifying ? 'Vérification...' : 'Valider et activer le MFA'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ETAT 3 : MFA INACTIF ET PAS EN COURS DE SETUP */}
      {!mfaEnabled && !setupData && (
        <div className="space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            Pour sécuriser les données confidentielles de NOBTECH, les devis, factures et contenus du site, nous vous recommandons fortement d&apos;activer la double authentification.
          </p>
          <button
            type="button"
            onClick={handleStartSetup}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0077b6] text-white text-xs font-bold uppercase tracking-wider hover:scale-[1.02] transition-all flex items-center gap-2 shadow-lg shadow-[#00D4FF]/20"
          >
            <KeyRound size={16} />
            Activer la double authentification (TOTP)
          </button>
        </div>
      )}
    </div>
  );
};
