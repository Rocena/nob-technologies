'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Copy,
  Check,
  Smartphone,
  RefreshCw,
  Lock,
  Sparkles,
  ArrowLeft,
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
    }, 60);
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
        setError(data.error || 'Erreur lors de la génération de la clé Google Authenticator.');
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
      setError('Veuillez saisir les 6 chiffres affichés dans Google Authenticator.');
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
            'Protection Google Authenticator (2FA) activée et vérifiée avec succès !'
        );
      } else {
        setError(
          data.error ||
            'Code à 6 chiffres invalide ou expiré. Vérifiez que l’heure de votre téléphone est automatique.'
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

    // Auto-submit when all 6 digits are filled
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
        setSuccessMsg('La double authentification a été désactivée sur votre compte.');
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
    <div className="nob-mfa-studio">
      <style>{`
        .nob-mfa-studio {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(145deg, #0b1120 0%, #0f172a 100%);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 22px;
          padding: 28px;
          color: #f8fafc;
          max-width: 880px;
          box-shadow: 0 24px 60px -15px rgba(2, 6, 23, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.08);
          margin: 12px 0;
        }
        .nob-mfa-header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding-bottom: 22px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 24px;
        }
        .nob-mfa-title-wrap {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .nob-mfa-badge-icon {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .nob-mfa-badge-icon.active {
          background: rgba(16, 185, 129, 0.14);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #34d399;
          box-shadow: 0 0 25px rgba(16, 185, 129, 0.2);
        }
        .nob-mfa-badge-icon.inactive {
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #38bdf8;
        }
        .nob-mfa-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .nob-mfa-pill.active {
          background: rgba(16, 185, 129, 0.16);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #6ee7b7;
        }
        .nob-mfa-pill.inactive {
          background: rgba(245, 158, 11, 0.16);
          border: 1px solid rgba(245, 158, 11, 0.35);
          color: #fcd34d;
        }
        .nob-mfa-alert {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          border-radius: 14px;
          font-size: 13.5px;
          font-weight: 600;
          margin-bottom: 20px;
          line-height: 1.5;
        }
        .nob-mfa-alert.success {
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #6ee7b7;
        }
        .nob-mfa-alert.error {
          background: rgba(244, 63, 94, 0.12);
          border: 1px solid rgba(244, 63, 94, 0.35);
          color: #fda4af;
        }
        .nob-mfa-btn-primary {
          all: unset;
          box-sizing: border-box;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 12px 22px;
          border-radius: 13px;
          background: linear-gradient(135deg, #00D4FF 0%, #0284C7 100%);
          color: #020617;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.01em;
          box-shadow: 0 10px 25px -6px rgba(0, 212, 255, 0.45);
          transition: transform 0.18s ease, opacity 0.18s ease, box-shadow 0.18s ease;
        }
        .nob-mfa-btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 14px 30px -6px rgba(0, 212, 255, 0.6);
        }
        .nob-mfa-btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .nob-mfa-btn-secondary {
          all: unset;
          box-sizing: border-box;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 18px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #e2e8f0;
          font-size: 12.5px;
          font-weight: 700;
          transition: background 0.18s ease, border-color 0.18s ease;
        }
        .nob-mfa-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.11);
          border-color: rgba(255, 255, 255, 0.22);
        }
        .nob-mfa-btn-danger {
          all: unset;
          box-sizing: border-box;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 18px;
          border-radius: 12px;
          background: rgba(244, 63, 94, 0.12);
          border: 1px solid rgba(244, 63, 94, 0.3);
          color: #fda4af;
          font-size: 12.5px;
          font-weight: 700;
          transition: background 0.18s ease;
        }
        .nob-mfa-btn-danger:hover {
          background: rgba(244, 63, 94, 0.22);
        }
        .nob-mfa-setup-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 28px;
          align-items: center;
          background: rgba(2, 6, 23, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 24px;
        }
        @media (max-width: 720px) {
          .nob-mfa-setup-grid {
            grid-template-columns: 1fr;
          }
        }
        .nob-mfa-qr-box {
          background: #ffffff;
          border-radius: 18px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
        }
        .nob-mfa-otp-row {
          display: flex;
          gap: 10px;
          margin: 14px 0 18px;
          flex-wrap: wrap;
        }
        .nob-mfa-otp-digit {
          width: 48px;
          height: 56px;
          border-radius: 12px;
          background: #0f172a !important;
          border: 1.5px solid rgba(148, 163, 184, 0.3) !important;
          color: #00D4FF !important;
          font-family: 'JetBrains Mono', monospace;
          font-size: 22px;
          font-weight: 800;
          text-align: center;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
        }
        .nob-mfa-otp-digit:focus {
          border-color: #00D4FF !important;
          box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.22);
          transform: translateY(-1px);
        }
      `}</style>

      {/* HEADER */}
      <div className="nob-mfa-header">
        <div className="nob-mfa-title-wrap">
          <div className={`nob-mfa-badge-icon ${mfaEnabled ? 'active' : 'inactive'}`}>
            {mfaEnabled ? <ShieldCheck size={26} /> : <Lock size={26} />}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
                Double Authentification Google Authenticator (2FA)
              </h3>
              <span className={`nob-mfa-pill ${mfaEnabled ? 'active' : 'inactive'}`}>
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: mfaEnabled ? '#10b981' : '#f59e0b',
                  }}
                />
                {mfaEnabled ? 'PROTECTION ACTIVE' : 'NON CONFIGURÉ'}
              </span>
            </div>
            <p style={{ margin: '5px 0 0', fontSize: '12.5px', color: '#94a3b8' }}>
              Standard TOTP RFC 6238 • Compatible Google Authenticator, Microsoft Authenticator, Authy &amp; Apple Mot de passe
              {userEmail ? ` (${userEmail})` : ''}
            </p>
          </div>
        </div>
      </div>

      {loading && (
        <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: '13.5px' }}>
          <Loader2 size={24} style={{ margin: '0 auto 10px', color: '#00D4FF' }} />
          <div>Synchronisation de l&apos;état de sécurité MFA...</div>
        </div>
      )}

      {!loading && successMsg && (
        <div className="nob-mfa-alert success">
          <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
          <span>{successMsg}</span>
        </div>
      )}

      {!loading && error && (
        <div className="nob-mfa-alert error">
          <AlertTriangle size={20} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {/* CAS 1 : MFA ACTIF (ET PAS EN COURS DE RECONFIGURATION) */}
      {!loading && mfaEnabled && !setupData && (
        <div>
          <div
            style={{
              padding: '20px',
              borderRadius: '16px',
              background: 'rgba(16, 185, 129, 0.06)',
              border: '1px solid rgba(16, 185, 129, 0.22)',
              marginBottom: '20px',
            }}
          >
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#ecfdf5', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} color="#10b981" />
              <span>Votre compte administrateur est protégé par Google Authenticator.</span>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', lineHeight: 1.55 }}>
              À chaque connexion sur <code>/root</code>, un code temporaire à 6 chiffres généré sur votre téléphone est demandé après votre mot de passe.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            <button
              type="button"
              className="nob-mfa-btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowLiveTest((v) => !v);
                setError(null);
                setSuccessMsg(null);
                resetDigits();
              }}
            >
              <Smartphone size={15} color="#00D4FF" />
              <span>{showLiveTest ? 'Fermer le testeur' : 'Tester un code à 6 chiffres en direct'}</span>
            </button>

            <button
              type="button"
              className="nob-mfa-btn-secondary"
              onClick={handleStartSetup}
            >
              <RefreshCw size={15} />
              <span>Changer de téléphone / Nouveau QR Code</span>
            </button>

            {!confirmDisable ? (
              <button
                type="button"
                className="nob-mfa-btn-danger"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setConfirmDisable(true);
                }}
              >
                <ShieldAlert size={15} />
                <span>Désactiver la 2FA</span>
              </button>
            ) : (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(244,63,94,0.1)', padding: '6px 12px', borderRadius: '12px', border: '1px solid rgba(244,63,94,0.3)' }}>
                <span style={{ fontSize: '12px', color: '#fda4af', fontWeight: 700 }}>Confirmer la désactivation ?</span>
                <button
                  type="button"
                  onClick={handleDisable}
                  disabled={disabling}
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    background: '#e11d48',
                    color: '#fff',
                    fontSize: '11.5px',
                    fontWeight: 800,
                  }}
                >
                  {disabling ? 'Désactivation...' : 'Oui, désactiver'}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setConfirmDisable(false);
                  }}
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    padding: '5px 10px',
                    fontSize: '11.5px',
                    color: '#94a3b8',
                  }}
                >
                  Annuler
                </button>
              </div>
            )}
          </div>

          {/* Zone de test en direct */}
          {showLiveTest && (
            <div
              style={{
                marginTop: '20px',
                padding: '20px',
                borderRadius: '16px',
                background: 'rgba(2, 6, 23, 0.7)',
                border: '1px solid rgba(0, 212, 255, 0.25)',
              }}
            >
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                Vérification en direct de votre application Google Authenticator
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
                Saisissez le code actuel à 6 chiffres affiché sur votre téléphone pour vérifier la synchronisation :
              </div>

              <div className="nob-mfa-otp-row">
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
                    onPaste={handlePaste}
                    className="nob-mfa-otp-digit"
                  />
                ))}
              </div>

              <button
                type="button"
                disabled={testingLive || code.length !== 6}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  submitVerification(code, true);
                }}
                className="nob-mfa-btn-primary"
              >
                <ShieldCheck size={16} />
                <span>{testingLive ? 'Vérification...' : 'Tester ce code maintenant'}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* CAS 2 : ASSISTANT DE CONFIGURATION EN 3 ÉTAPES */}
      {!loading && setupData && (
        <div>
          {/* 3 Steps Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '12px',
              marginBottom: '22px',
            }}
          >
            {[
              {
                step: 'ÉTAPE 1',
                title: 'Ouvrez Google Authenticator',
                desc: 'Sur votre iPhone ou Android, appuyez sur le bouton « + » en bas à droite.',
              },
              {
                step: 'ÉTAPE 2',
                title: 'Scannez le QR Code',
                desc: 'Choisissez « Scanner un code QR » ou collez la clé secrète ci-dessous.',
              },
              {
                step: 'ÉTAPE 3',
                title: 'Saisissez les 6 chiffres',
                desc: 'Entrez le code temporaire affiché sur votre téléphone pour activer la 2FA.',
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: '14px 16px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#00D4FF', letterSpacing: '0.08em' }}>
                  {s.step}
                </div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff', marginTop: '3px' }}>
                  {s.title}
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px', lineHeight: 1.45 }}>
                  {s.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="nob-mfa-setup-grid">
            {/* Left : QR Code */}
            <div className="nob-mfa-qr-box">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={setupData.qrCodeDataUrl}
                alt="QR Code Google Authenticator"
                style={{ width: '196px', height: '196px', display: 'block', borderRadius: '8px' }}
              />
              <div
                style={{
                  marginTop: '10px',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <QrCode size={13} color="#0284c7" />
                <span>Scannez avec l&apos;application</span>
              </div>
            </div>

            {/* Right : Secret & 6-Digit Pin */}
            <div>
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>
                  Clé d&apos;enregistrement manuelle (si vous ne pouvez pas scanner) :
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: '#0f172a',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                  }}
                >
                  <code
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '13.5px',
                      fontWeight: 800,
                      color: '#38bdf8',
                      letterSpacing: '0.06em',
                      wordBreak: 'break-all',
                    }}
                  >
                    {formattedSecret}
                  </code>
                  <button
                    type="button"
                    onClick={copySecret}
                    className="nob-mfa-btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '11.5px', flexShrink: 0 }}
                  >
                    {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                    <span>{copied ? 'Copié' : 'Copier'}</span>
                  </button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                  Code de vérification à 6 chiffres :
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Saisissez les 6 chiffres générés par Google Authenticator (validation automatique dès le 6e chiffre) :
                </div>

                <div className="nob-mfa-otp-row">
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
                      onPaste={handlePaste}
                      className="nob-mfa-otp-digit"
                    />
                  ))}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                  <button
                    type="button"
                    disabled={verifying || code.length !== 6}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      submitVerification(code, false);
                    }}
                    className="nob-mfa-btn-primary"
                  >
                    <ShieldCheck size={17} />
                    <span>{verifying ? 'Activation en cours...' : 'Valider & Activer Google Authenticator'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSetupData(null);
                      setError(null);
                    }}
                    className="nob-mfa-btn-secondary"
                  >
                    <span>Annuler</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CAS 3 : MFA INACTIF ET PAS EN COURS DE CONFIGURATION */}
      {!loading && !mfaEnabled && !setupData && (
        <div>
          <div
            style={{
              padding: '18px 20px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '20px',
              fontSize: '13.5px',
              color: '#cbd5e1',
              lineHeight: 1.6,
            }}
          >
            Ajoutez une couche de sécurité supplémentaire à votre compte administrateur <strong>Nobtech OS</strong>. Une fois activée, un code dynamique à 6 chiffres renouvelé toutes les 30 secondes sur votre téléphone sera demandé lors de la connexion.
          </div>

          <button type="button" onClick={handleStartSetup} className="nob-mfa-btn-primary">
            <KeyRound size={17} />
            <span>Configurer Google Authenticator maintenant</span>
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * Vue dédiée plein écran accessible sur /admin/mfa (depuis le menu utilisateur en haut à droite)
 */
export const MfaSecurityView: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#020617',
        color: '#f8fafc',
        padding: '88px 24px 110px',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <a
            href="/admin"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#cbd5e1',
              fontSize: '12.5px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={15} />
            <span>Retour au tableau de bord</span>
          </a>

          <a
            href="/admin/globals/site-settings"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12.5px',
              fontWeight: 600,
              color: '#38bdf8',
              textDecoration: 'none',
            }}
          >
            <Sparkles size={14} />
            <span>Voir tous les Paramètres du site &amp; SMTP</span>
          </a>
        </div>

        <MfaSettingsField />
      </div>
    </div>
  );
};
