'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NobLogo } from '../NobLogo';
import { TechConstellation } from './TechConstellation';
import { Eye, EyeOff, ShieldCheck, Database, Cloud, Cpu, Network, Code, Lock, ArrowLeft, CheckCircle2, Mail } from 'lucide-react';

type View = 'LOGIN' | 'AUTHENTICATING' | 'SUCCESS' | 'FORGOT' | 'FORGOT_SENDING' | 'FORGOT_SENT';

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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (view !== 'AUTHENTICATING') return;
    setStage(0);
    const id = setInterval(() => setStage((s) => Math.min(s + 1, AUTH_STAGES.length - 1)), 900);
    return () => clearInterval(id);
  }, [view]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setView('AUTHENTICATING');
    setError('');
    const minDelay = new Promise((r) => setTimeout(r, 1800));

    try {
      const [res] = await Promise.all([
        fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
          credentials: 'same-origin', // SÉCURITÉ: cookie JWT HttpOnly retourné par Payload
        }),
        minDelay,
      ]);

      if (res.ok) {
        setView('SUCCESS');
        setTimeout(() => { window.location.href = '/admin'; }, 1200);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.errors?.[0]?.message || 'Identifiants incorrects ou accès refusé.');
        setView('LOGIN');
      }
    } catch {
      setError('Erreur de connexion au serveur.');
      setView('LOGIN');
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setView('FORGOT_SENDING');
    setError('');
    try {
      // Réponse volontairement identique que l'email existe ou non (anti-énumération)
      await Promise.all([
        fetch('/api/users/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }).catch(() => null),
        new Promise((r) => setTimeout(r, 1500)),
      ]);
      setView('FORGOT_SENT');
    } catch {
      setError('Erreur de connexion au serveur.');
      setView('FORGOT');
    }
  };

  const errorBox = error && (
    <div className="rounded-lg bg-red-500/10 px-4 py-3 border border-red-500/20 flex items-start gap-3">
      <div className="mt-0.5 text-red-400"><ShieldCheck size={16} /></div>
      <p className="text-sm text-red-400 font-medium">{error}</p>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#020617] font-sans selection:bg-[#00D4FF]/30">

      {/* PARTIE GAUCHE : Formulaire */}
      <div className="flex w-full flex-col justify-center px-8 sm:px-16 md:w-1/2 lg:px-24 z-10 relative bg-[#020617]">
        <div className="w-full max-w-sm mx-auto min-h-[400px] flex flex-col justify-center">

          <div className="mb-8">
            <NobLogo height={40} showText={true} textColor="#FFFFFF" />
          </div>

          {/* LOGIN */}
          {view === 'LOGIN' && (
            <div className="animate-[slide-up_0.5s_ease-out_forwards]">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                Bon retour.
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                Connectez-vous à <strong className="text-[#00D4FF]">Nobtech OS</strong> pour gérer votre plateforme.
              </p>
              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <div className="group flex flex-col gap-2">
                  <label className="text-xs font-medium text-slate-400 group-focus-within:text-[#00D4FF] transition-colors">Adresse Email</label>
                  <input autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="exemple@domaine.com" className={inputClass} />
                </div>
                <div className="group flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-slate-400 group-focus-within:text-[#00D4FF] transition-colors">Mot de Passe</label>
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
            </div>
          )}

          {/* AUTHENTICATING */}
          {view === 'AUTHENTICATING' && (
            <div className="flex flex-col items-center text-center py-8 animate-[fade-in_0.4s_ease-out_forwards]">
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-4 border-[#00D4FF]/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-[#00D4FF] rounded-full border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock size={30} className="text-[#00D4FF] animate-pulse" />
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
        {/* Grille de fond */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ 
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)'
          }}
        />
        
        {/* Halo Cyan Central */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D4FF]/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        
        {/* Tech Constellation */}
        <TechConstellation />

        {/* Footer info Right Panel */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-xs text-slate-500 font-medium tracking-widest uppercase">
          <span className="flex items-center gap-1.5 text-emerald-500">
            <Lock size={14} /> Connexion Chiffrée
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