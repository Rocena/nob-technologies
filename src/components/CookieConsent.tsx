"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Lock, BarChart3, Sliders, X, Check, Settings2, ExternalLink } from "lucide-react";
import Link from "next/link";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Vérifier si le consentement a déjà été exprimé
    try {
      const consent = localStorage.getItem("nobtech_cookie_consent");
      if (!consent) {
        // Apparition fluide après 800ms
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 800);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(consent);
        setPreferences(parsed);
        applyConsent(parsed);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const applyConsent = (prefs: CookiePreferences) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cookie_consent_update", { detail: prefs }));

      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "consent_update",
        consent: prefs,
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
      role="region"
      aria-label="Gestion des cookies et de la confidentialité"
      className="fixed bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[440px] z-[80] animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto"
    >
      <div className="relative bg-slate-950/95 border border-cyan-500/25 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(0,212,255,0.12)] backdrop-blur-2xl text-slate-100 overflow-hidden">
        {/* Liseré haut signature gradient NOBTECH */}
        <div className="h-1 w-full bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]" />

        {/* Effet d'ambiance halo cyber */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {!showSettings ? (
          /* Vue Principale */
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/15 to-emerald-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 shadow-sm shadow-cyan-500/10">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10E760] animate-pulse" />
                  CDP Sénégal &amp; RGPD
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-snug">
                  Gestion des cookies &amp; confidentialité
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              NOB TECHNOLOGIES protège vos données conformément aux normes de la Commission des Données Personnelles (CDP Sénégal) et du RGPD. Nous utilisons des traceurs sécurisés pour optimiser votre navigation et mesurer l&apos;audience du site.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] text-slate-950 font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-md shadow-cyan-500/20 text-center cursor-pointer"
              >
                Tout accepter
              </button>
              <button
                type="button"
                onClick={handleDeclineAll}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs border border-slate-800 hover:border-slate-700 transition-all text-center cursor-pointer"
              >
                Tout refuser
              </button>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px]">
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="text-slate-400 hover:text-cyan-300 font-mono transition-colors flex items-center gap-1.5 cursor-pointer py-1"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Personnaliser mes choix</span>
              </button>

              <Link
                href="/confidentialite"
                className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
              >
                <span>Politique</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ) : (
          /* Vue Personnalisation Détaillée */
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Paramètres de confidentialité
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                aria-label="Retour"
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-[45vh] overflow-y-auto pr-1">
              {/* 1. Cookies Strictement Nécessaires */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-bold text-slate-200">Strictement nécessaires</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    Requis
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Essentiels à la sécurité, à l&apos;authentification et au bon fonctionnement technique de la plateforme. Ils ne peuvent être désactivés.
                </p>
              </div>

              {/* 2. Mesure d'Audience (Analytics) */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-bold text-slate-200">Mesure d&apos;audience</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreferences((p) => ({ ...p, analytics: !p.analytics }))}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                      preferences.analytics ? "bg-cyan-500" : "bg-slate-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-slate-950 shadow-md transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                        preferences.analytics ? "translate-x-4 bg-white" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Permettent de comprendre la fréquentation de nos pages de façon anonymisée pour améliorer la navigation.
                </p>
              </div>

              {/* 3. Contenus multimédias & Marketing */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-bold text-slate-200">Vidéos &amp; Contenus tiers</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreferences((p) => ({ ...p, marketing: !p.marketing }))}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                      preferences.marketing ? "bg-cyan-500" : "bg-slate-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-slate-950 shadow-md transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                        preferences.marketing ? "translate-x-4 bg-white" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Autorisent le chargement fluide des vidéos de démonstration et des contenus interactifs hébergés.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleSavePreferences}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] text-slate-950 font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-md shadow-cyan-500/20 text-center cursor-pointer"
              >
                Enregistrer mes choix
              </button>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-800 transition-all text-center cursor-pointer"
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
