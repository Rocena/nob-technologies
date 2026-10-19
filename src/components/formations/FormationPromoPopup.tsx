"use client";

import React, { useState, useEffect } from "react";
import { Formation } from "@/data/formations";
import { X, Flame, ShieldCheck, ArrowRight, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormationApplyModal } from "@/components/FormationApplyModalContext";
import { useSyllabusModal } from "@/components/SyllabusModalContext";

interface FormationPromoPopupProps {
  formation: Formation;
}

export function FormationPromoPopup({ formation }: FormationPromoPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
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
    }, 350);

    return () => clearTimeout(timer);
  }, [isPromoActive, formation.slug]);

  if (!isPromoActive || !pricing) {
    return null;
  }

  const handleClose = () => {
    setIsOpen(false);
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
      {/* 1. Modal Popup Principal responsive Mobile & Desktop */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[999] overflow-y-auto p-3 sm:p-4 flex min-h-full items-center justify-center">
            {/* Backdrop sombre avec flou interactif */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Carte Modale animée et scrollable sur mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", damping: 25, stiffness: 320 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="promo-popup-title"
              className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900/98 to-slate-950 border border-cyan-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-[0_0_60px_rgba(0,212,255,0.25)] text-slate-100 my-auto z-10"
            >
              {/* Halos décoratifs cyber */}
              <div className="absolute -top-20 -right-20 w-48 sm:w-60 h-48 sm:h-60 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-48 sm:w-60 h-48 sm:h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Bouton Fermer */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Fermer la promotion"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer z-20"
              >
                <X size={18} />
              </button>

              {/* Badge d'urgence & exclusivité */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] sm:text-xs font-mono font-bold mb-2.5 sm:mb-3">
                <Flame size={13} className="text-amber-400 shrink-0 animate-pulse" />
                <span>OFFRE DE LANCEMENT • 10 PREMIÈRES PLACES SEULEMENT</span>
              </div>

              {/* Titre & Accroche */}
              <h3 id="promo-popup-title" className="text-base sm:text-xl font-black text-white leading-tight mb-1.5 sm:mb-2 pr-6">
                {formation.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed mb-3 sm:mb-4">
                {formation.shortDesc || formation.heroDescription || "Maîtrisez les infrastructures réseaux et préparez la certification mondiale Cisco dans nos laboratoires à Dakar (TP sur routeurs et commutateurs physiques réels)."}
              </p>

              {/* Bloc Tarif Promotionnel */}
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/85 border border-white/10 mb-3 sm:mb-4 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Prix public :</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-500 line-through">
                    {pricing.publicPrice.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>

                {pricing.promoPrice && pricing.promoPrice !== pricing.launchPrice && (
                  <div className="flex items-baseline justify-between text-[11px] text-slate-400">
                    <span className="font-mono">Tarif promo habituel :</span>
                    <span className="font-semibold text-slate-300">
                      {pricing.promoPrice.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t border-white/10 flex items-baseline justify-between">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Tarif Spécial Lancement (10 places) :
                    </span>
                    <div className="text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300">
                      {pricing.launchPrice.toLocaleString("fr-FR")}{" "}
                      <span className="text-xs sm:text-base font-bold text-cyan-400">FCFA</span>
                    </div>
                  </div>
                  {discountPercent > 0 && (
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      -{discountPercent}% ({economyAmount.toLocaleString("fr-FR")} F d&apos;économie)
                    </span>
                  )}
                </div>

                {pricing.paymentPlan && (
                  <p className="text-[10px] sm:text-[11px] text-cyan-300 font-mono pt-1">
                    ✓ {pricing.paymentPlan}
                  </p>
                )}
              </div>

              {/* Compteur de places restantes (sans la mention 'compteur réel et certifié') */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 mb-3 sm:mb-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-amber-200">
                  <span className="flex items-center gap-1.5 text-[11px] sm:text-xs">
                    <Flame size={13} className="text-amber-400 shrink-0" />
                    Places restantes à ce tarif de lancement :
                  </span>
                  <span className="font-mono text-white text-[11px] sm:text-sm bg-amber-500/30 px-2 py-0.5 rounded font-extrabold">
                    {remainingSpots} / {launchSpots}
                  </span>
                </div>

                {/* Barre de progression des inscriptions */}
                <div className="w-full bg-slate-950/80 rounded-full h-1.5 sm:h-2 overflow-hidden border border-amber-500/20">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-rose-500 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, Math.round((reservedSpots / launchSpots) * 100))}%`,
                    }}
                  />
                </div>

                <div className="text-[10px] text-slate-400 text-left">
                  <span>{reservedSpots} candidatures enregistrées</span>
                </div>
              </div>

              {/* Boutons d'Action */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleApply}
                  className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] text-slate-950 font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer"
                >
                  <span>Postuler &amp; Réserver ma place à ce tarif</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  type="button"
                  onClick={handleSyllabus}
                  className="w-full py-2 sm:py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText size={13} className="text-cyan-400" />
                  <span>Recevoir le programme complet (PDF)</span>
                </button>
              </div>

              {/* Engagement Éthique & Anti-Publicité Mensongère */}
              <div className="flex items-center justify-center gap-1.5 text-[9px] sm:text-[10px] text-slate-400 pt-2.5 mt-1 border-t border-white/5 text-center">
                <ShieldCheck size={11} className="text-emerald-400 shrink-0" />
                <span>Dès que la 10ème place est pourvue, ce popup et le tarif de lancement disparaissent définitivement.</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
