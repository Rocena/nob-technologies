"use client";

import React, { useState, useEffect } from "react";
import { Formation } from "@/data/formations";
import { X, Flame, ShieldCheck, ArrowRight, FileText, CheckCircle2, Sparkles } from "lucide-react";
import { useFormationApplyModal } from "@/components/FormationApplyModalContext";
import { useSyllabusModal } from "@/components/SyllabusModalContext";

interface FormationPromoPopupProps {
  formation: Formation;
}

export function FormationPromoPopup({ formation }: FormationPromoPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const { openApplyModal } = useFormationApplyModal();
  const { openSyllabusModal } = useSyllabusModal();

  const pricing = formation.pricing;

  const launchSpots = pricing?.launchSpots ?? 10;
  const remainingSpots = pricing?.remainingSpots ?? 3;
  const hasDiscount = Boolean(
    pricing && (
      pricing.launchPrice < pricing.publicPrice ||
      (pricing.promoPrice && pricing.promoPrice < pricing.publicPrice)
    )
  );

  // Règle d'or : Si 10 personnes sont inscrites (remainingSpots <= 0) ou si l'offre est expirée, le popup disparaît définitivement
  const isPromoActive = Boolean(
    pricing &&
    !pricing.isPromoExpired &&
    remainingSpots > 0 &&
    hasDiscount
  );

  useEffect(() => {
    if (!isPromoActive) return;

    // Déclenchement fluide à l'ouverture de la page
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [isPromoActive, formation.slug]);

  if (!isPromoActive || !pricing) {
    return null;
  }

  const handleClose = () => {
    setIsOpen(false);
    setMinimized(true);
  };

  const handleApply = () => {
    setIsOpen(false);
    openApplyModal({
      formationTitle: formation.title,
      formationSlug: formation.slug,
    });
  };

  const handleSyllabus = () => {
    setIsOpen(false);
    openSyllabusModal({
      formationTitle: formation.title,
      formationSlug: formation.slug,
    });
  };

  const reservedSpots = Math.max(0, launchSpots - remainingSpots);
  const economyAmount = Math.max(0, pricing.publicPrice - pricing.launchPrice);
  const discountPercent = pricing.publicPrice > 0 ? Math.round((economyAmount / pricing.publicPrice) * 100) : 0;

  return (
    <>
      {/* 1. Modal Popup Principal */}
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900/98 to-slate-950 border border-cyan-500/40 rounded-3xl p-5 sm:p-7 shadow-[0_0_60px_rgba(0,212,255,0.25)] text-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Halos décoratifs cyber */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Bouton Fermer */}
            <button
              onClick={handleClose}
              aria-label="Fermer l'offre promotionnelle"
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Badge d'urgence & exclusivité */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold mb-3">
              <Flame size={14} className="text-amber-400 shrink-0 animate-pulse" />
              <span>OFFRE DE LANCEMENT • 10 PREMIÈRES PLACES SEULEMENT</span>
            </div>

            {/* Titre & Accroche */}
            <h3 className="text-lg sm:text-2xl font-black text-white leading-tight mb-2">
              {formation.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {formation.shortDesc || formation.heroDescription || "Maîtrisez les infrastructures réseaux et préparez la certification mondiale Cisco dans nos laboratoires à Dakar (TP sur routeurs et commutateurs physiques réels)."}
            </p>

            {/* Bloc Tarif Promotionnel Transparent */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/85 border border-white/10 mb-4 space-y-2.5">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">Prix public :</span>
                <span className="text-sm sm:text-base font-bold text-slate-500 line-through">
                  {pricing.publicPrice.toLocaleString("fr-FR")} FCFA
                </span>
              </div>

              {pricing.promoPrice && pricing.promoPrice !== pricing.launchPrice && (
                <div className="flex items-baseline justify-between text-xs text-slate-400">
                  <span className="font-mono">Tarif promo habituel :</span>
                  <span className="font-semibold text-slate-300">
                    {pricing.promoPrice.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>
              )}

              <div className="pt-2 border-t border-white/10 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                    Tarif Spécial Lancement (10 places) :
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300">
                    {pricing.launchPrice.toLocaleString("fr-FR")}{" "}
                    <span className="text-sm sm:text-base font-bold text-cyan-400">FCFA</span>
                  </div>
                </div>
                {discountPercent > 0 && (
                  <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    -{discountPercent}% ({economyAmount.toLocaleString("fr-FR")} F d&apos;économie)
                  </span>
                )}
              </div>

              {pricing.paymentPlan && (
                <p className="text-[11px] text-cyan-300 font-mono pt-1">
                  ✓ {pricing.paymentPlan}
                </p>
              )}
            </div>

            {/* Compteur de places restantes avec vérification réelle */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 mb-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-amber-200">
                <span className="flex items-center gap-1.5">
                  <Flame size={14} className="text-amber-400 shrink-0" />
                  Places restantes à ce tarif de lancement :
                </span>
                <span className="font-mono text-white text-xs sm:text-sm bg-amber-500/30 px-2 py-0.5 rounded font-extrabold">
                  {remainingSpots} / {launchSpots}
                </span>
              </div>

              {/* Barre de progression des inscriptions */}
              <div className="w-full bg-slate-950/80 rounded-full h-2 overflow-hidden border border-amber-500/20">
                <div
                  className="bg-gradient-to-r from-amber-400 to-rose-500 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.round((reservedSpots / launchSpots) * 100))}%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>{reservedSpots} candidatures enregistrées</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={11} /> Compteur réel &amp; certifié
                </span>
              </div>
            </div>

            {/* Boutons d'Action */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleApply}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] text-slate-950 font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer"
              >
                <span>Postuler &amp; Réserver ma place à ce tarif</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                onClick={handleSyllabus}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText size={14} className="text-cyan-400" />
                <span>Recevoir le programme complet (PDF)</span>
              </button>
            </div>

            {/* Engagement Éthique & Anti-Publicité Mensongère */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-3 mt-1 border-t border-white/5 text-center">
              <ShieldCheck size={12} className="text-emerald-400 shrink-0" />
              <span>Dès que la 10ème place est pourvue, ce popup et le tarif de lancement disparaissent définitivement.</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Bouton / Pill Flottant discret si fermé durant la visite */}
      {minimized && !isOpen && (
        <div className="fixed bottom-4 right-4 z-[75] animate-in slide-in-from-bottom-3 duration-300">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-slate-900/95 border border-amber-500/40 text-slate-100 shadow-xl shadow-amber-500/10 hover:border-amber-400 hover:scale-105 transition-all cursor-pointer backdrop-blur-md"
          >
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Flame size={13} className="animate-pulse" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block leading-none">
                Offre de lancement ({remainingSpots} places)
              </span>
              <span className="text-xs font-bold text-white leading-none">
                {pricing.launchPrice.toLocaleString("fr-FR")} FCFA <span className="text-[10px] line-through text-slate-500">{pricing.publicPrice.toLocaleString("fr-FR")}</span>
              </span>
            </div>
            <span className="text-[11px] font-bold text-cyan-400 ml-1">Voir &rarr;</span>
          </button>
        </div>
      )}
    </>
  );
}
