'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Copy,
  Check,
  Smartphone,
  RefreshCw,
  Lock,
  ArrowLeft,
  HelpCircle,
} from 'lucide-react';

export const MfaSettingsField: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [setupData, setSetupData] = useState<{ secret: string; qrCodeDataUrl: string } | null>(null);
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [verifying, setVerifying] = useState(false);
  const [testingLive, setTestingLive] = useState(false);
  const [showLiveTest, setShowLiveTest] = useState(false);
  const [showManualKey, setShowManualKey] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [disabling, setDisabling] = useState(false);
  const [confirmDisable, setConfirmDisable] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const code = digits.join('');

  const fetchStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/admin/mfa/status', {
        credentials: 'same-origin',
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        setMfaEnabled(Boolean(data.mfaEnabled));
        if (data.email) setUserEmail(data.email);
      }
    } catch {
      setError('Impossible de vérifier le statut MFA.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const resetDigits = () => {
    setDigits(['', '', '', '', '', '']);
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 80);
  };

  const handleStartSetup = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      setLoading(true);
      setError(null);
      setSuccessMsg(null);
      setShowLiveTest(false);
      setConfirmDisable(false);
      setShowManualKey(false);

      const res = await fetch('/api/admin/mfa/setup', {
        method: 'POST',
        credentials: 'same-origin',
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.secret) {
        setSetupData({ secret: data.secret, qrCodeDataUrl: data.qrCodeDataUrl });
        if (data.email) setUserEmail(data.email);
        resetDigits();
      } else {
        setError(data.error || 'Erreur lors de la génération du QR Code.');
      }
    } catch {
      setError('Erreur réseau lors de l’initialisation MFA.');
    } finally {
      setLoading(false);
    }
  };

  const submitVerification = async (sixDigitCode: string, isLiveTest = false) => {
    const clean = sixDigitCode.replace(/\D/g, '');
    if (clean.length !== 6) {
      setError('Veuillez entrer les 6 chiffres affichés sur votre téléphone.');
      return;
    }

    try {
      if (isLiveTest) setTestingLive(true);
      else setVerifying(true);
      setError(null);
      setSuccessMsg(null);

      const res = await fetch('/api/admin/mfa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: clean,
          secret: isLiveTest ? undefined : setupData?.secret,
          action: isLiveTest ? 'test_live' : 'enable',
        }),
        credentials: 'same-origin',
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setMfaEnabled(true);
        if (!isLiveTest) {
          setSetupData(null);
        }
        setShowLiveTest(false);
        setDigits(['', '', '', '', '', '']);
        setSuccessMsg(
          data.message ||
            'Parfait ! Google Authenticator est maintenant activé sur votre compte.'
        );
      } else {
        setError(
          data.error ||
            'Code incorrect ou expiré. Vérifiez les 6 chiffres actuels sur votre téléphone.'
        );
      }
    } catch {
      setError('Erreur réseau lors de la vérification du code.');
    } finally {
      setVerifying(false);
      setTestingLive(false);
    }
  };

  const handleDigitChange = (idx: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[idx] = digit;
    setDigits(next);
    setError(null);

    if (digit && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }

    const joined = next.join('');
    if (joined.length === 6 && next.every((d) => d.length === 1)) {
      submitVerification(joined, showLiveTest);
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      submitVerification(digits.join(''), showLiveTest);
      return;
    }
    if (e.key === 'Backspace') {
      if (!digits[idx] && idx > 0) {
        const next = [...digits];
        next[idx - 1] = '';
        setDigits(next);
        inputRefs.current[idx - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const next = ['', '', '', '', '', ''];
    for (let i = 0; i < 6; i++) {
      next[i] = pasted[i] || '';
    }
    setDigits(next);
    if (pasted.length === 6) {
      submitVerification(pasted, showLiveTest);
    } else {
      inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  const handleDisable = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      setDisabling(true);
      setError(null);
      setSuccessMsg(null);
      const res = await fetch('/api/admin/mfa/disable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
        credentials: 'same-origin',
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setMfaEnabled(false);
        setSetupData(null);
        setConfirmDisable(false);
        setShowLiveTest(false);
        setSuccessMsg('La double authentification a été désactivée.');
      } else {
        setError(data.error || 'Erreur lors de la désactivation.');
      }
    } catch {
      setError('Erreur réseau.');
    } finally {
      setDisabling(false);
    }
  };

  const copySecret = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (setupData?.secret) {
      navigator.clipboard.writeText(setupData.secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formattedSecret = setupData?.secret
    ? setupData.secret.match(/.{1,4}/g)?.join(' ') || setupData.secret
    : '';

  return (
    <div className="nob-mfa-wrap">
      <style>{`
        .nob-mfa-wrap {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 28px;
          color: #0f172a;
          max-width: 820px;
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.06);
          margin: 8px 0;
          box-sizing: border-box;
        }
        html[data-nob-theme="dark"] .nob-mfa-wrap {
          background: #0f172a;
          border-color: rgba(255, 255, 255, 0.1);
          color: #f8fafc;
          box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.6);
        }

        .nob-mfa-top {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f1f5f9;
          margin-bottom: 24px;
        }
        html[data-nob-theme="dark"] .nob-mfa-top {
          border-bottom-color: rgba(255, 255, 255, 0.08);
        }

        .nob-mfa-top-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .nob-mfa-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .nob-mfa-icon.on {
          background: #ecfdf5;
          color: #059669;
          border: 1px solid #a7f3d0;
        }
        html[data-nob-theme="dark"] .nob-mfa-icon.on {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border-color: rgba(16, 185, 129, 0.3);
        }
        .nob-mfa-icon.off {
          background: #f0f9ff;
          color: #0284c7;
          border: 1px solid #bae6fd;
        }
        html[data-nob-theme="dark"] .nob-mfa-icon.off {
          background: rgba(56, 189, 248, 0.14);
          color: #38bdf8;
          border-color: rgba(56, 189, 248, 0.3);
        }

        .nob-mfa-heading {
          font-size: 18px;
          font-weight: 800;
          line-height: 1.25;
          color: #0f172a;
          margin: 0;
        }
        html[data-nob-theme="dark"] .nob-mfa-heading {
          color: #ffffff;
        }
        .nob-mfa-sub {
          font-size: 13.5px;
          color: #64748b;
          margin: 3px 0 0;
        }
        html[data-nob-theme="dark"] .nob-mfa-sub {
          color: #94a3b8;
        }

        .nob-mfa-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12.5px;
          font-weight: 700;
        }
        .nob-mfa-status-badge.on {
          background: #ecfdf5;
          color: #047857;
          border: 1px solid #a7f3d0;
        }
        html[data-nob-theme="dark"] .nob-mfa-status-badge.on {
          background: rgba(16, 185, 129, 0.16);
          color: #34d399;
          border-color: rgba(16, 185, 129, 0.35);
        }
        .nob-mfa-status-badge.off {
          background: #f8fafc;
          color: #475569;
          border: 1px solid #cbd5e1;
        }
        html[data-nob-theme="dark"] .nob-mfa-status-badge.off {
          background: rgba(255, 255, 255, 0.05);
          color: #cbd5e1;
          border-color: rgba(255, 255, 255, 0.12);
        }

        /* Alertes */
        .nob-mfa-banner {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 14px;
          font-size: 13.5px;
          font-weight: 600;
          margin-bottom: 20px;
          line-height: 1.45;
        }
        .nob-mfa-banner.ok {
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #065f46;
        }
        html[data-nob-theme="dark"] .nob-mfa-banner.ok {
          background: rgba(16, 185, 129, 0.14);
          border-color: rgba(16, 185, 129, 0.35);
          color: #6ee7b7;
        }
        .nob-mfa-banner.err {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
        }
        html[data-nob-theme="dark"] .nob-mfa-banner.err {
          background: rgba(239, 68, 68, 0.14);
          border-color: rgba(239, 68, 68, 0.35);
          color: #fca5a5;
        }

        /* Boutons ergonomiques */
        .nob-mfa-btn {
          all: unset;
          box-sizing: border-box;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 12px 22px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          transition: all 0.18s ease;
          user-select: none;
        }
        .nob-mfa-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }
        .nob-mfa-btn.primary {
          background: #0284c7;
          color: #ffffff;
          box-shadow: 0 6px 18px -4px rgba(2, 132, 199, 0.4);
        }
        .nob-mfa-btn.primary:hover:not(:disabled) {
          background: #0369a1;
          transform: translateY(-1px);
        }
        .nob-mfa-btn.success {
          background: #059669;
          color: #ffffff;
          box-shadow: 0 6px 18px -4px rgba(5, 150, 105, 0.4);
        }
        .nob-mfa-btn.success:hover:not(:disabled) {
          background: #047857;
          transform: translateY(-1px);
        }
        .nob-mfa-btn.outline {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          color: #334155;
        }
        .nob-mfa-btn.outline:hover:not(:disabled) {
          background: #f1f5f9;
          border-color: #94a3b8;
          color: #0f172a;
        }
        html[data-nob-theme="dark"] .nob-mfa-btn.outline {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.14);
          color: #e2e8f0;
        }
        html[data-nob-theme="dark"] .nob-mfa-btn.outline:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }
        .nob-mfa-btn.danger {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
        }
        .nob-mfa-btn.danger:hover:not(:disabled) {
          background: #fee2e2;
        }
        html[data-nob-theme="dark"] .nob-mfa-btn.danger {
          background: rgba(239, 68, 68, 0.12);
          border-color: rgba(239, 68, 68, 0.3);
          color: #f87171;
        }

        /* Grille d'étapes 1 - 2 - 3 */
        .nob-mfa-steps-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 22px;
        }
        .nob-mfa-step-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
        }
        html[data-nob-theme="dark"] .nob-mfa-step-pill {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
          color: #cbd5e1;
        }
        .nob-mfa-step-num {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #0284c7;
          color: #ffffff;
          font-size: 12px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Zone de configuration 2 colonnes */
        .nob-mfa-wizard-grid {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 24px;
          align-items: stretch;
        }
        @media (max-width: 720px) {
          .nob-mfa-steps-bar {
            grid-template-columns: 1fr;
          }
          .nob-mfa-wizard-grid {
            grid-template-columns: 1fr;
          }
        }

        .nob-mfa-qr-panel {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          justify-content: center;
        }
        html[data-nob-theme="dark"] .nob-mfa-qr-panel {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .nob-mfa-qr-box {
          background: #ffffff;
          padding: 12px;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
          margin-bottom: 12px;
        }

        .nob-mfa-verify-panel {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        html[data-nob-theme="dark"] .nob-mfa-verify-panel {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
        }

        /* 6 cases OTP protégées contre .field-type input de Payload */
        .nob-mfa-otp-row {
          display: flex;
          gap: 10px;
          justify-content: flex-start;
          margin: 16px 0 20px;
          flex-wrap: wrap;
        }
        .nob-mfa-wrap input.nob-mfa-otp-digit {
          width: 52px !important;
          min-width: 52px !important;
          max-width: 52px !important;
          height: 60px !important;
          padding: 0 !important;
          margin: 0 !important;
          border-radius: 12px !important;
          background: #ffffff !important;
          border: 2px solid #cbd5e1 !important;
          color: #0f172a !important;
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 24px !important;
          font-weight: 800 !important;
          text-align: center !important;
          outline: none !important;
          transition: all 0.15s ease !important;
          box-sizing: border-box !important;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04) !important;
        }
        html[data-nob-theme="dark"] .nob-mfa-wrap input.nob-mfa-otp-digit {
          background: #020617 !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          color: #ffffff !important;
        }
        .nob-mfa-wrap input.nob-mfa-otp-digit:focus {
          border-color: #0284c7 !important;
          box-shadow: 0 0 0 4px rgba(2, 132, 199, 0.18) !important;
          transform: translateY(-2px);
        }
        html[data-nob-theme="dark"] .nob-mfa-wrap input.nob-mfa-otp-digit:focus {
          border-color: #38bdf8 !important;
          box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.22) !important;
        }
        .nob-mfa-wrap input.nob-mfa-otp-digit.filled {
          border-color: #0284c7 !important;
          background: #f0f9ff !important;
        }
        html[data-nob-theme="dark"] .nob-mfa-wrap input.nob-mfa-otp-digit.filled {
          border-color: #38bdf8 !important;
          background: rgba(56, 189, 248, 0.1) !important;
        }
      `}</style>

      {/* EN-TÊTE CLAIR ET RASSURANT */}
      <div className="nob-mfa-top">
        <div className="nob-mfa-top-left">
          <div className={`nob-mfa-icon ${mfaEnabled ? 'on' : 'off'}`}>
            {mfaEnabled ? <ShieldCheck size={24} /> : <Smartphone size={24} />}
          </div>
          <div>
            <div className="nob-mfa-heading">
              Double Authentification (Google Authenticator)
            </div>
            <div className="nob-mfa-sub">
              {userEmail
                ? `Protection du compte administrateur ${userEmail}`
                : 'Protection de votre accès administrateur par code temporaire à 6 chiffres'}
            </div>
          </div>
        </div>

        <div className={`nob-mfa-status-badge ${mfaEnabled ? 'on' : 'off'}`}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: mfaEnabled ? '#10b981' : '#94a3b8',
            }}
          />
          <span>{mfaEnabled ? 'Protection activée' : 'Non activée'}</span>
        </div>
      </div>

      {/* MESSAGES DE CONFIRMATION OU D'ERREUR */}
      {successMsg && (
        <div className="nob-mfa-banner ok" role="status">
          <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="nob-mfa-banner err" role="alert">
          <AlertTriangle size={20} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '24px 0', color: '#64748b', fontSize: 14 }}>
          <Loader2 size={18} />
          <span>Chargement de votre configuration de sécurité...</span>
        </div>
      ) : (
        <>
          {/* CAS 1 : MFA NON ACTIVÉ ET PAS ENCORE EN COURS DE CONFIGURATION */}
          {!mfaEnabled && !setupData && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
                padding: '22px',
                borderRadius: '16px',
                background: 'rgba(2, 132, 199, 0.05)',
                border: '1px solid rgba(2, 132, 199, 0.18)',
              }}
            >
              <div style={{ maxWidth: 480 }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>
                  Protégez votre compte en moins d&apos;une minute
                </div>
                <div style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.55 }}>
                  Lors de votre connexion sur <strong>/root</strong>, un code à 6 chiffres généré par l&apos;application <strong>Google Authenticator</strong> sur votre téléphone vous sera demandé en plus de votre mot de passe.
                </div>
              </div>

              <button
                type="button"
                onClick={handleStartSetup}
                className="nob-mfa-btn primary"
              >
                <QrCode size={18} />
                <span>Configurer Google Authenticator</span>
              </button>
            </div>
          )}

          {/* CAS 2 : ASSISTANT GUIDÉ EN 3 ÉTAPES SIMPLES */}
          {setupData && (
            <div>
              {/* Barre des 3 étapes */}
              <div className="nob-mfa-steps-bar">
                <div className="nob-mfa-step-pill">
                  <span className="nob-mfa-step-num">1</span>
                  <span>Ouvrez Google Authenticator</span>
                </div>
                <div className="nob-mfa-step-pill">
                  <span className="nob-mfa-step-num">2</span>
                  <span>Scannez le QR Code</span>
                </div>
                <div className="nob-mfa-step-pill">
                  <span className="nob-mfa-step-num">3</span>
                  <span>Tapez les 6 chiffres</span>
                </div>
              </div>

              <div className="nob-mfa-wizard-grid">
                {/* Colonne Gauche : QR Code */}
                <div className="nob-mfa-qr-panel">
                  <div className="nob-mfa-qr-box">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={setupData.qrCodeDataUrl}
                      alt="QR Code Google Authenticator"
                      width={180}
                      height={180}
                      style={{ display: 'block', width: 180, height: 180 }}
                    />
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 8 }}>
                    Scannez avec votre téléphone
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowManualKey((v) => !v);
                    }}
                    style={{
                      all: 'unset',
                      cursor: 'pointer',
                      fontSize: 12,
                      color: '#0284c7',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <HelpCircle size={13} />
                    <span>{showManualKey ? 'Masquer la clé manuelle' : 'Impossible de scanner ?'}</span>
                  </button>

                  {showManualKey && (
                    <div
                      style={{
                        marginTop: 10,
                        padding: '10px',
                        borderRadius: 10,
                        background: 'rgba(15, 23, 42, 0.06)',
                        width: '100%',
                        boxSizing: 'border-box',
                      }}
                    >
                      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>
                        Clé de saisie manuelle :
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, wordBreak: 'break-all', marginBottom: 6 }}>
                        {formattedSecret}
                      </div>
                      <button
                        type="button"
                        onClick={copySecret}
                        className="nob-mfa-btn outline"
                        style={{ padding: '6px 12px', fontSize: 11.5, width: '100%' }}
                      >
                        {copied ? <Check size={13} /> : <Copy size={13} />}
                        <span>{copied ? 'Clé copiée !' : 'Copier la clé'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Colonne Droite : Saisie des 6 chiffres */}
                <div className="nob-mfa-verify-panel">
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 6 }}>
                      Entrez le code à 6 chiffres affiché sur votre téléphone
                    </div>
                    <div style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.5 }}>
                      Une fois le QR code scanné, Google Authenticator affiche un code à 6 chiffres qui change toutes les 30 secondes. Tapez-le ci-dessous :
                    </div>

                    <div className="nob-mfa-otp-row" onPaste={handlePaste}>
                      {digits.map((d, idx) => (
                        <input
                          key={idx}
                          ref={(el) => {
                            inputRefs.current[idx] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={1}
                          value={d}
                          onChange={(e) => handleDigitChange(idx, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(idx, e)}
                          className={`nob-mfa-otp-digit ${d ? 'filled' : ''}`}
                          aria-label={`Chiffre ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, paddingTop: 12, borderTop: '1px solid rgba(100,116,139,0.15)' }}>
                    <button
                      type="button"
                      disabled={verifying || code.length !== 6}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        submitVerification(code, false);
                      }}
                      className="nob-mfa-btn success"
                    >
                      {verifying ? <Loader2 size={17} /> : <CheckCircle2 size={17} />}
                      <span>{verifying ? 'Vérification...' : 'Valider et activer'}</span>
                    </button>

                    <button
                      type="button"
                      disabled={verifying}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSetupData(null);
                        setError(null);
                      }}
                      className="nob-mfa-btn outline"
                    >
                      <span>Annuler</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CAS 3 : MFA DÉJÀ ACTIVÉ */}
          {mfaEnabled && !setupData && (
            <div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  padding: '20px 22px',
                  borderRadius: 16,
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: 'rgba(16, 185, 129, 0.18)',
                      color: '#059669',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Lock size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>
                      Votre compte est protégé par Google Authenticator
                    </div>
                    <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
                      Un code à 6 chiffres vous sera demandé à chaque connexion sur <strong>/root</strong>.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowLiveTest((v) => !v);
                      setConfirmDisable(false);
                      setError(null);
                      setSuccessMsg(null);
                      resetDigits();
                    }}
                    className="nob-mfa-btn outline"
                    style={{ padding: '9px 15px', fontSize: 13 }}
                  >
                    <Smartphone size={15} />
                    <span>{showLiveTest ? 'Fermer le test' : 'Tester un code'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleStartSetup}
                    className="nob-mfa-btn outline"
                    style={{ padding: '9px 15px', fontSize: 13 }}
                  >
                    <RefreshCw size={15} />
                    <span>Changer de téléphone</span>
                  </button>

                  {!confirmDisable ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setConfirmDisable(true);
                        setShowLiveTest(false);
                      }}
                      className="nob-mfa-btn danger"
                      style={{ padding: '9px 15px', fontSize: 13 }}
                    >
                      <span>Désactiver</span>
                    </button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button
                        type="button"
                        disabled={disabling}
                        onClick={handleDisable}
                        className="nob-mfa-btn danger"
                        style={{ padding: '9px 14px', fontSize: 13 }}
                      >
                        <span>{disabling ? 'Désactivation...' : 'Confirmer la désactivation'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setConfirmDisable(false);
                        }}
                        className="nob-mfa-btn outline"
                        style={{ padding: '9px 12px', fontSize: 13 }}
                      >
                        <span>Annuler</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Zone de test d'un code à 6 chiffres en direct */}
              {showLiveTest && (
                <div className="nob-mfa-verify-panel" style={{ marginTop: 16 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
                    Vérifier que votre application Google Authenticator fonctionne
                  </div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>
                    Tapez le code à 6 chiffres actuellement affiché sur votre téléphone :
                  </div>

                  <div className="nob-mfa-otp-row" onPaste={handlePaste}>
                    {digits.map((d, idx) => (
                      <input
                        key={idx}
                        ref={(el) => {
                          inputRefs.current[idx] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={d}
                        onChange={(e) => handleDigitChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        className={`nob-mfa-otp-digit ${d ? 'filled' : ''}`}
                      />
                    ))}
                  </div>

                  <div>
                    <button
                      type="button"
                      disabled={testingLive || code.length !== 6}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        submitVerification(code, true);
                      }}
                      className="nob-mfa-btn primary"
                    >
                      {testingLive ? <Loader2 size={16} /> : <CheckCircle2 size={16} />}
                      <span>{testingLive ? 'Vérification...' : 'Tester ce code'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const MfaSecurityView: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: '920px',
        margin: '0 auto',
        padding: '32px 24px 120px',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <a
          href="/admin"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            borderRadius: '10px',
            background: 'rgba(2, 132, 199, 0.1)',
            color: '#0284c7',
            fontSize: '13px',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={15} />
          <span>Retour au Launchpad</span>
        </a>

        <a
          href="/admin/globals/site-settings"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            borderRadius: '10px',
            border: '1px solid rgba(100, 116, 139, 0.25)',
            color: 'inherit',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          <span>Paramètres généraux du site</span>
        </a>
      </div>

      <MfaSettingsField />
    </div>
  );
};

export default MfaSettingsField;
