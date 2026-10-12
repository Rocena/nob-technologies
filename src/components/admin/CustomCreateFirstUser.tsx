'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NobLogo } from '../NobLogo';
import { TechConstellation } from './TechConstellation';
import { Eye, EyeOff, ShieldCheck, Database, Cloud, Cpu, Network, Code, Lock, ArrowRight, CheckCircle2, MonitorPlay, FileText, Users, Settings, Rocket, Shield } from 'lucide-react';

type Step = 'WELCOME' | 'CREATE_ADMIN' | 'CREATING' | 'SUCCESS' | 'GUIDE' | 'FINISH';

export const CustomCreateFirstUser: React.FC = () => {
  const [step, setStep] = useState<Step>('WELCOME');
  const [guideIndex, setGuideIndex] = useState(0);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [error, setError] = useState('');
  const router = useRouter();

  const guides = [
    {
      title: "Tableau de Bord",
      description: "Une vue d'ensemble de vos statistiques, de vos derniers messages de contact et de vos activités récentes.",
      icon: <MonitorPlay size={48} className="text-[#00D4FF] drop-shadow-[0_0_15px_rgba(0,212,255,0.4)]" />
    },
    {
      title: "Gestion du Contenu",
      description: "Modifiez vos pages dynamiques, publiez des actualités et organisez votre bibliothèque de médias facilement.",
      icon: <FileText size={48} className="text-[#00D4FF] drop-shadow-[0_0_15px_rgba(0,212,255,0.4)]" />
    },
    {
      title: "Espace CRM & Ventes",
      description: "Générez des devis professionnels, éditez vos factures et gérez votre base de données clients.",
      icon: <Users size={48} className="text-[#00D4FF] drop-shadow-[0_0_15px_rgba(0,212,255,0.4)]" />
    },
    {
      title: "Sécurité Maximale",
      description: "Contrôlez les accès, ajoutez des collaborateurs et modifiez les paramètres globaux. Votre plateforme est scellée et chiffrée.",
      icon: <Shield size={48} className="text-[#00D4FF] drop-shadow-[0_0_15px_rgba(0,212,255,0.4)]" />
    }
  ];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Le mot de passe doit comporter au moins 8 caractères.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    
    setStep('CREATING');
    setError('');

    try {
      const res = await fetch('/api/users/first-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role: 'super_admin' }),
        credentials: 'same-origin',
      });

      if (res.ok) {
        // En cas de secours, s'assurer que la session est également rafraîchie
        try {
          await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'same-origin',
          });
        } catch {}
        
        setTimeout(() => {
          setStep('SUCCESS');
        }, 1500);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.errors?.[0]?.message || 'Erreur lors de la configuration.');
        setStep('CREATE_ADMIN');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur.');
      setStep('CREATE_ADMIN');
    }
  };

  const handleNextGuide = () => {
    if (guideIndex < guides.length - 1) {
      setGuideIndex(prev => prev + 1);
    } else {
      setStep('FINISH');
    }
  };

  const finishSetup = () => {
    window.location.href = '/admin';
    
  };

  return (
    <div className="flex min-h-screen bg-[#020617] font-sans selection:bg-[#00D4FF]/30">
      
      {/* PARTIE GAUCHE : Setup Wizard */}
      <div className="flex w-full flex-col justify-center px-8 sm:px-16 md:w-1/2 lg:px-24 z-10 relative bg-[#020617]">
        <div className="w-full max-w-sm mx-auto min-h-[400px] flex flex-col justify-center">
          
          <div className="mb-8">
            <NobLogo height={40} showText={true} textColor="#FFFFFF" />
          </div>

          {/* STEP 1: WELCOME */}
          {step === 'WELCOME' && (
            <div className="animate-[slide-up_0.5s_ease-out_forwards]">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                Bienvenue.
              </h1>
              <p className="text-slate-400 leading-relaxed mb-8">
                Vous êtes sur le point d'initialiser le système de gestion de votre plateforme digitale. <br /><br />
                Cet assistant va vous guider étape par étape pour configurer votre accès sécurisé et découvrir les fonctionnalités de <strong>Nobtech OS</strong>.
              </p>
              <button
                onClick={() => setStep('CREATE_ADMIN')}
                className="group flex w-full items-center justify-between rounded-xl bg-white/10 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-white/15 hover:scale-[1.02] border border-white/5 hover:border-white/20"
              >
                Commencer la configuration
                <ArrowRight size={18} className="text-[#00D4FF] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}

          {/* STEP 2: CREATE_ADMIN */}
          {step === 'CREATE_ADMIN' && (
            <div className="animate-[slide-left_0.4s_ease-out_forwards]">
              <h1 className="mb-3 text-2xl font-bold text-white">
                Compte Super Administrateur
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                Créez le compte racine. Il aura un accès absolu au système de gestion du site internet.
              </p>

              <form onSubmit={handleCreate} className="flex flex-col gap-5">
                <div className="group flex flex-col gap-2">
                  <label className="text-xs font-medium text-slate-400 group-focus-within:text-[#00D4FF] transition-colors">
                    Nom & Prénom
                  </label>
                  <input
                    autoFocus
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ex: Ozias Nzongo"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-[#00D4FF] focus:bg-slate-900 focus:ring-4 focus:ring-[#00D4FF]/10"
                  />
                </div>

                <div className="group flex flex-col gap-2">
                  <label className="text-xs font-medium text-slate-400 group-focus-within:text-[#00D4FF] transition-colors">
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="exemple@domaine.com"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-[#00D4FF] focus:bg-slate-900 focus:ring-4 focus:ring-[#00D4FF]/10"
                  />
                </div>

                <div className="group flex flex-col gap-2">
                  <label className="text-xs font-medium text-slate-400 group-focus-within:text-[#00D4FF] transition-colors">
                    Mot de Passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/50 pl-4 pr-12 py-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-[#00D4FF] focus:bg-slate-900 focus:ring-4 focus:ring-[#00D4FF]/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-[#00D4FF] transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="group flex flex-col gap-2">
                  <label className="text-xs font-medium text-slate-400 group-focus-within:text-[#00D4FF] transition-colors">
                    Confirmer le Mot de Passe
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/50 pl-4 pr-12 py-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-[#00D4FF] focus:bg-slate-900 focus:ring-4 focus:ring-[#00D4FF]/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-[#00D4FF] transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg bg-red-500/10 px-4 py-3 border border-red-500/20 flex items-start gap-3">
                    <div className="mt-0.5 text-red-400"><ShieldCheck size={16} /></div>
                    <p className="text-sm text-red-400 font-medium">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0077b6] py-3.5 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                >
                  Continuer
                </button>
              </form>
            </div>
          )}

          {/* STEP 3: CREATING ANIMATION */}
          {step === 'CREATING' && (
            <div className="flex flex-col items-center justify-center animate-[fade-in_0.5s_ease-out_forwards] py-12">
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-4 border-[#00D4FF]/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-[#00D4FF] rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield size={32} className="text-[#00D4FF]" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Configuration en cours...</h2>
              <p className="text-sm text-slate-400">Génération des clés de sécurité</p>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 'SUCCESS' && (
            <div className="flex flex-col items-center justify-center text-center animate-[scale-in_0.5s_ease-out_forwards] py-8">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle2 size={40} className="text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Système configuré !</h2>
              <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                Votre compte Super Administrateur a été créé avec succès et votre session est sécurisée.
              </p>
              <button
                onClick={() => setStep('GUIDE')}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-white/15 hover:scale-[1.02] border border-white/5"
              >
                Découvrir la plateforme
                <ArrowRight size={18} className="text-[#00D4FF] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}

          {/* STEP 5: GUIDE (Wizard) */}
          {step === 'GUIDE' && (
            <div className="animate-[slide-up_0.4s_ease-out_forwards] flex flex-col h-[350px]">
              <div className="flex justify-between items-center mb-8">
                <div className="flex gap-2">
                  {guides.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === guideIndex ? 'w-8 bg-[#00D4FF]' : 'w-2 bg-slate-800'}`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                  {guideIndex + 1} / {guides.length}
                </span>
              </div>

              <div className="flex-1 flex flex-col items-center text-center">
                <div className="mb-6 p-4 rounded-2xl bg-[#00D4FF]/5 border border-[#00D4FF]/10">
                  {guides[guideIndex].icon}
                </div>
                <h2 className="text-xl font-bold text-white mb-3">{guides[guideIndex].title}</h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {guides[guideIndex].description}
                </p>
              </div>

              <button
                onClick={handleNextGuide}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/15 hover:scale-[1.02] border border-white/5"
              >
                {guideIndex < guides.length - 1 ? 'Suivant' : 'Terminer'}
              </button>
            </div>
          )}

          {/* STEP 6: FINISH */}
          {step === 'FINISH' && (
            <div className="flex flex-col items-center justify-center text-center animate-[fade-in_0.6s_ease-out_forwards] py-8">
              <div className="mb-8">
                <Rocket size={64} className="text-[#00D4FF] animate-[float_6s_ease-in-out_infinite] drop-shadow-[0_0_20px_rgba(0,212,255,0.5)]" />
              </div>
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-4">
                Vous êtes prêt.
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-10">
                Nobtech OS est maintenant pleinement opérationnel. C'est à vous de jouer.
              </p>
              <button
                onClick={finishSetup}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0077b6] py-4 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]"
              >
                Accéder à l'interface
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
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
            <ShieldCheck size={14} /> Accès Sécurisé
          </span>
          <span>Nobtech OS v3.9</span>
        </div>
      </div>
      
      {/* Tailwind Custom Animations for Wizard */}
      <style>{`
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-left {
          0% { opacity: 0; transform: translateX(20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
