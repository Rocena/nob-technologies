"use client";

import React, { useState, useEffect } from "react";
import { X, Check, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [preferences, setPreferences] = useState({
    necessary: true, // Toujours vrai
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Vérifier si le choix a déjà été fait
    const consent = localStorage.getItem("nobtech_cookie_consent");
    if (!consent) {
      setIsVisible(true);
    } else {
      // Appliquer les préférences enregistrées (pour les scripts tiers)
      try {
        const parsed = JSON.parse(consent);
        applyConsent(parsed);
      } catch(e) {}
    }
  }, []);

  const applyConsent = (prefs: typeof preferences) => {
    // Dispatch un événement custom pour que les outils d'analyse (GTM, Matomo, Plausible) puissent réagir
    window.dispatchEvent(new CustomEvent('cookie_consent_update', { detail: prefs }));
    
    // Exemple d'intégration : Pousser dans le dataLayer Google
    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'consent_update',
        consent: prefs
      });
    }
  };

  const handleAcceptAll = () => {
    const all = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem("nobtech_cookie_consent", JSON.stringify(all));
    applyConsent(all);
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    const none = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem("nobtech_cookie_consent", JSON.stringify(none));
    applyConsent(none);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("nobtech_cookie_consent", JSON.stringify(preferences));
    applyConsent(preferences);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-[450px]">
      <div className="bg-[#020617] border border-slate-700/50 rounded-sm shadow-2xl overflow-hidden backdrop-blur-xl relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2"></div>
        
        {!showSettings ? (
          <div className="p-6">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2 text-lg">
              <span>🍪</span> Vos préférences de cookies
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Afin d'améliorer votre expérience, nous utilisons des cookies pour réaliser des statistiques d'audience et adapter nos contenus.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleAcceptAll} className="flex-1 bg-accent text-[#020617] font-bold py-2.5 px-4 rounded-sm hover:bg-[#00B4D8] transition-colors text-sm text-center">
                Tout accepter
              </button>
              <button onClick={handleDeclineAll} className="flex-1 bg-slate-800 text-white hover:bg-slate-700 py-2.5 px-4 rounded-sm transition-colors text-sm text-center border border-slate-700">
                Tout refuser
              </button>
            </div>
            <button onClick={() => setShowSettings(true)} className="w-full text-slate-400 hover:text-accent transition-colors text-sm text-center mt-4 flex items-center justify-center gap-1">
              <Settings2 className="w-3.5 h-3.5" /> Personnaliser mes choix
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold text-lg">Paramètres des cookies</h3>
              <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {/* Nécessaires */}
              <div className="flex items-start justify-between p-3 bg-white/5 rounded-sm border border-white/10">
                <div className="pr-4">
                  <h4 className="text-slate-200 text-sm font-semibold mb-1">Strictement nécessaires</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">Indispensables au fonctionnement du site (navigation, sécurité). Ils ne peuvent pas être désactivés.</p>
                </div>
                <div className="shrink-0 flex items-center justify-center w-8 h-5 rounded-full bg-accent/50 opacity-70">
                  <div className="w-4 h-4 bg-white rounded-full translate-x-1.5 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-accent" />
                  </div>
                </div>
              </div>

              {/* Analytiques */}
              <div className="flex items-start justify-between p-3 bg-white/5 rounded-sm border border-white/10">
                <div className="pr-4">
                  <h4 className="text-slate-200 text-sm font-semibold mb-1">Mesure d'audience (Analytiques)</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">Permettent de comprendre comment les visiteurs interagissent avec le site pour en améliorer l'ergonomie (ex: Google Analytics, Matomo).</p>
                </div>
                <button 
                  onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                  className={`shrink-0 relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${preferences.analytics ? 'bg-accent' : 'bg-slate-600'}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${preferences.analytics ? 'translate-x-4.5' : 'translate-x-1'}`} />
                </button>
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between p-3 bg-white/5 rounded-sm border border-white/10">
                <div className="pr-4">
                  <h4 className="text-slate-200 text-sm font-semibold mb-1">Marketing & Publicité</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">Permettent d'afficher des publicités ciblées et d'en mesurer l'efficacité.</p>
                </div>
                <button 
                  onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                  className={`shrink-0 relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${preferences.marketing ? 'bg-accent' : 'bg-slate-600'}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${preferences.marketing ? 'translate-x-4.5' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            <button onClick={handleSavePreferences} className="w-full bg-accent text-[#020617] font-bold py-2.5 rounded-sm hover:bg-[#00B4D8] transition-colors text-sm shadow-[0_0_15px_rgba(0,212,255,0.15)]">
              Enregistrer mes préférences
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
