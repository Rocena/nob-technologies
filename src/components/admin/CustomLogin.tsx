'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { NobLogo } from '../NobLogo';
import { TechConstellation } from './TechConstellation';
import { Eye, EyeOff, ShieldCheck, Lock, ArrowLeft, ArrowRight, CheckCircle2, Mail, KeyRound } from 'lucide-react';

type View = 'LOGIN' | 'MFA_CHALLENGE' | 'AUTHENTICATING' | 'SUCCESS' | 'FORGOT' | 'FORGOT_SENDING' | 'FORGOT_SENT';

const AUTH_STAGES = [
  'Vérification des identifiants…',
  'Chiffrement de la session…',
  'Contrôle des autorisations…',
  'Préparation de votre espace…',
];

const inputClass = "w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-[#00D4FF] focus:bg-slate-900 focus:ring-4 focus:ring-[#00D4FF]/10";
const primaryBtn = "mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0077b6] py-3.5 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]";

export const CustomLogin: React.FC = () => {
  const [view, setView] = useState<View>('LOGIN');
  const [stage, setStage] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (view !== 'AUTHENTICATING') return;
    setStage(0);
    const id = setInterval(() => setStage((s) => Math.min(s + 1, AUTH_STAGES.length - 1)), 800);
    return () => clearInterval(id);
  }, [view]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isFromMFA = view === 'MFA_CHALLENGE';
    setView('AUTHENTICATING');
    setError('');
    const minDelay = new Promise((r) => setTimeout(r, 1200));

    try {
      const [res] = await Promise.all([
        fetch('/api/admin/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, code: isFromMFA ? mfaCode : undefined }),
          credentials: 'same-origin',
        }),
        minDelay,
      ]);

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        if (data.mfaRequired) {
          setView('MFA_CHALLENGE');
          return;
        }

        setView('SUCCESS');
        setTimeout(() => {
          const params = new URLSearchParams(window.location.search);
          const redirectUrl = params.get('redirect');
          const target = (redirectUrl && redirectUrl.startsWith('/admin')) ? redirectUrl : '/admin';
          window.location.href = target;
        }, 1100);
      } else {
        setError(data.error || data.errors?.[0]?.message || 'Identifiants incorrects ou accès refusé.');
        if (isFromMFA) {
          setView('MFA_CHALLENGE');
        } else {
          setView('LOGIN');
        }
      }
    } catch {
      setError('Erreur de connexion au serveur.');
      setView(isFromMFA ? 'MFA_CHALLENGE' : 'LOGIN');
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setView('FORGOT_SENDING');
    setError('');
    try {
      await Promise.all([
        fetch('/api/users/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }).catch(() => null),
        new Promise((r) => setTimeout(r, 1400)),
      ]);
      setView('FORGOT_SENT');
    } catch {
      setError('Erreur de connexion au serveur.');
      setView('FORGOT');
    }
  };

  const errorBox = error && (
    <div className="rounded-lg bg-red-500/10 px-4 py-3 border border-red-500/20 flex items-start gap-3">
      <div className="mt-0.5 text-red-400 shrink-0"><ShieldCheck size={16} /></div>
      <p className="text-xs sm:text-sm text-red-400 font-medium leading-relaxed">{error}</p>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#020617] font-sans selection:bg-[#00D4FF]/30">

      {/* PARTIE GAUCHE : Formulaire */}
      <div className="flex w-full flex-col justify-center px-8 sm:px-16 md:w-1/2 lg:px-24 z-10 relative bg-[#020617]">
        <div className="w-full max-w-sm mx-auto min-h-[420px] flex flex-col justify-center">

          {/* En-tête avec Logo et Bouton Retour sur le site */}
          <div className="mb-8 flex items-center justify-between">
            <NobLogo height={38} showText={true} textColor="#FFFFFF" />
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all group"
              title="Retourner sur le site public NOBTECH"
            >
              <ArrowLeft size={13} className="text-[#00D4FF] group-hover:-translate-x-0.5 transition-transform" />
              <span>Retour au site</span>
            </Link>
          </div>

          {/* LOGIN */}
          {view === 'LOGIN' && (
            <div className="animate-[slide-up_0.5s_ease-out_forwards]">
              <h1 className="mb-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                Bon retour.
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Connectez-vous à <strong className="text-[#00D4FF]">Nobtech OS</strong> pour administrer votre plateforme.
              </p>
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="group flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-300 group-focus-within:text-[#00D4FF] transition-colors">Adresse Email</label>
                  <input autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="nom@entreprise.sn" className={inputClass} />
                </div>
                <div className="group flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-slate-300 group-focus-within:text-[#00D4FF] transition-colors">Mot de Passe</label>
                    <button type="button" onClick={() => { setError(''); setView('FORGOT'); }} className="text-xs font-medium text-[#00D4FF] hover:underline">
                      Mot de passe oublié ?
                    </button>
                  </div>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className={inputClass + ' pr-12'} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-[#00D4FF] transition-colors">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                {errorBox}
                <button type="submit" className={primaryBtn}>Se connecter</button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
                <p className="text-xs text-slate-500 mb-2">Premier démarrage ou compte non initialisé ?</p>
                <Link
                  href="/create-first-user"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00D4FF] hover:text-[#00F0FF] hover:underline transition-all"
                >
                  <span>Initialiser le compte Super-Admin</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}

          {/* MFA CHALLENGE */}
          {view === 'MFA_CHALLENGE' && (
            <div className="animate-[slide-up_0.4s_ease-out_forwards]">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00D4FF]/20 to-[#0284C7]/30 border border-[#00D4FF]/40 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(0,212,255,0.25)]">
                <ShieldCheck size={32} className="text-[#00D4FF]" />
              </div>
              <h1 className="mb-2 text-2xl font-extrabold text-white">
                Authentification à 2 Facteurs (MFA)
              </h1>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Ouvrez votre application d'authentification (Google Authenticator, Microsoft Authenticator, Authy) et saisissez le code à 6 chiffres pour <strong className="text-[#00D4FF]">{email}</strong>.
              </p>

              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="group flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <KeyRound size={14} className="text-[#00D4FF]" />
                    <span>Code de sécurité TOTP (6 chiffres)</span>
                  </label>
                  <input
                    autoFocus
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                    required
                    placeholder="000000"
                    className="w-full text-center tracking-[0.45em] font-mono font-black text-2xl py-3 rounded-xl border border-slate-700 bg-slate-900/90 text-[#00D4FF] outline-none focus:border-[#00D4FF] focus:ring-4 focus:ring-[#00D4FF]/20 transition-all placeholder:text-slate-700"
                  />
                </div>

                {errorBox}

                <button type="submit" disabled={mfaCode.length !== 6} className={primaryBtn + ' disabled:opacity-50 disabled:cursor-not-allowed'}>
                  Valider et accéder à Nobtech OS
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setMfaCode('');
                    setView('LOGIN');
                  }}
                  className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft size={13} /> Revenir aux identifiants
                </button>
              </form>
            </div>
          )}

          {/* AUTHENTICATING */}
          {view === 'AUTHENTICATING' && (
            <div className="flex flex-col items-center text-center py-8 animate-[fade-in_0.4s_ease-out_forwards]">
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-4 border-[#00D4FF]/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-[#00D4FF] rounded-full border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock size={30} className="text-[#00D4FF]" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Connexion sécurisée</h2>
              <p key={stage} className="text-sm text-slate-400 animate-[fade-in_0.4s_ease-out_forwards]">{AUTH_STAGES[stage]}</p>
              <div className="mt-6 flex gap-2">
                {AUTH_STAGES.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i <= stage ? 'w-8 bg-[#00D4FF]' : 'w-2 bg-slate-800'}`} />
                ))}
              </div>
            </div>
          )}

          {/* SUCCESS */}
          {view === 'SUCCESS' && (
            <div className="flex flex-col items-center text-center py-8 animate-[scale-in_0.5s_ease-out_forwards]">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle2 size={40} className="text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Accès autorisé</h2>
              <p className="text-sm text-slate-400">Redirection vers votre espace…</p>
            </div>
          )}

          {/* FORGOT */}
          {(view === 'FORGOT' || view === 'FORGOT_SENDING') && (
            <div className="animate-[slide-left_0.4s_ease-out_forwards]">
              <h1 className="mb-3 text-2xl font-bold text-white">Mot de passe oublié</h1>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                Saisissez votre adresse email. Si un compte existe, vous recevrez un lien pour réinitialiser votre mot de passe.
              </p>
              <form onSubmit={handleForgot} className="flex flex-col gap-5">
                <div className="group flex flex-col gap-2">
                  <label className="text-xs font-medium text-slate-400 group-focus-within:text-[#00D4FF] transition-colors">Adresse Email</label>
                  <input autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="exemple@domaine.com" className={inputClass} />
                </div>
                {errorBox}
                <button type="submit" disabled={view === 'FORGOT_SENDING'} className={primaryBtn + ' disabled:opacity-60 disabled:cursor-not-allowed'}>
                  {view === 'FORGOT_SENDING'
                    ? <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    : 'Envoyer le lien'}
                </button>
                <button type="button" onClick={() => setView('LOGIN')} className="flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft size={16} /> Retour à la connexion
                </button>
              </form>
            </div>
          )}

          {/* FORGOT SENT */}
          {view === 'FORGOT_SENT' && (
            <div className="flex flex-col items-center text-center py-4 animate-[scale-in_0.5s_ease-out_forwards]">
              <div className="w-20 h-20 bg-[#00D4FF]/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,212,255,0.2)]">
                <Mail size={36} className="text-[#00D4FF]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Vérifiez votre boîte mail</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                Si un compte est associé à <strong className="text-white">{email}</strong>, un lien de réinitialisation vient d'être envoyé.
              </p>
              <button onClick={() => setView('LOGIN')} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/15 border border-white/5">
                <ArrowLeft size={16} className="text-[#00D4FF]" /> Retour à la connexion
              </button>
            </div>
          )}

        </div>
      </div>

      {/* PARTIE DROITE : Ambiance Deep Tech / Brand */}
      <div className="relative hidden w-1/2 overflow-hidden bg-[#020617] md:block border-l border-white/5">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ 
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)'
          }}
        />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D4FF]/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        
        <TechConstellation />

        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-xs text-slate-500 font-medium tracking-widest uppercase">
          <span className="flex items-center gap-1.5 text-emerald-500">
            <Lock size={14} /> Connexion Chiffrée &bull; MFA 2FA Actif
          </span>
          <span>Nobtech OS v3.9</span>
        </div>
      </div>
      <style>{`
        @keyframes slide-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes slide-left { 0% { opacity: 0; transform: translateX(20px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes scale-in { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};