"use client";

import React, { useState, useEffect } from "react";
import { X, Check, Settings2 } from "lucide-react";

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

  // Bloquer le scroll et l'interaction avec le site tant que le consentement n'est pas donné
  useEffect(() => {
    if (isVisible) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isVisible]);

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
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
    >
      <div className="w-full max-w-lg bg-[#020617] border border-slate-700/60 rounded-xl shadow-2xl overflow-hidden backdrop-blur-2xl relative my-auto">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        {!showSettings ? (
          <div className="p-6 md:p-8">
            <h3 id="cookie-consent-title" className="text-white font-bold mb-3 flex items-center gap-2.5 text-lg md:text-xl">
              <span>🍪</span> Vos préférences de cookies
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Afin d'améliorer votre expérience, assurer la sécurité de vos sessions et adapter nos contenus, nous utilisons des cookies. Vous devez définir vos préférences avant de poursuivre votre navigation sur notre site.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                type="button"
                onClick={handleAcceptAll} 
                className="flex-1 bg-accent text-[#020617] font-bold py-3 px-4 rounded-lg hover:bg-[#00B4D8] transition-colors text-sm text-center shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Tout accepter
              </button>
              <button 
                type="button"
                onClick={handleDeclineAll} 
                className="flex-1 bg-slate-800 text-white hover:bg-slate-700 py-3 px-4 rounded-lg transition-colors text-sm text-center border border-slate-700 cursor-pointer"
              >
                Tout refuser
              </button>
            </div>
            <button 
              type="button"
              onClick={() => setShowSettings(true)} 
              className="w-full text-slate-400 hover:text-accent transition-colors text-sm text-center mt-5 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Settings2 className="w-4 h-4" /> Personnaliser mes choix
            </button>
          </div>
        ) : (
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 id="cookie-consent-title" className="text-white font-bold text-lg md:text-xl">Paramètres des cookies</h3>
              <button 
                type="button"
                onClick={() => setShowSettings(false)} 
                className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
                title="Retour"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6 max-h-[45vh] overflow-y-auto pr-2 custom-scrollbar">
              {/* Nécessaires */}
              <div className="flex items-start justify-between p-3.5 bg-white/5 rounded-lg border border-white/10">
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
              <div className="flex items-start justify-between p-3.5 bg-white/5 rounded-lg border border-white/10">
                <div className="pr-4">
                  <h4 className="text-slate-200 text-sm font-semibold mb-1">Mesure d'audience (Analytiques)</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">Permettent de comprendre comment les visiteurs interagissent avec le site pour en améliorer l'ergonomie (ex: Google Analytics, Matomo).</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                  className={`shrink-0 relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${preferences.analytics ? 'bg-accent' : 'bg-slate-600'}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${preferences.analytics ? 'translate-x-4.5' : 'translate-x-1'}`} />
                </button>
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between p-3.5 bg-white/5 rounded-lg border border-white/10">
                <div className="pr-4">
                  <h4 className="text-slate-200 text-sm font-semibold mb-1">Marketing & Publicité</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">Permettent d'adapter nos offres de formation et mesurer l'efficacité de nos communications.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                  className={`shrink-0 relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${preferences.marketing ? 'bg-accent' : 'bg-slate-600'}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${preferences.marketing ? 'translate-x-4.5' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={handleSavePreferences} 
                className="flex-1 bg-accent text-[#020617] font-bold py-2.5 px-4 rounded-lg hover:bg-[#00B4D8] transition-colors text-sm shadow-[0_0_15px_rgba(0,212,255,0.15)] cursor-pointer text-center"
              >
                Enregistrer mes préférences
              </button>
              <button 
                type="button"
                onClick={() => setShowSettings(false)} 
                className="py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm border border-slate-700 transition-colors cursor-pointer text-center"
              >
                Retour
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
