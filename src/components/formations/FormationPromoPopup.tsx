"use client";

import React, { useState, useEffect } from "react";
import { Formation } from "@/data/formations";
import { X, Flame, ShieldCheck, ArrowRight, FileText, Server, Award, Users, CheckCircle2 } from "lucide-react";
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

  // Règle d'or : Dès que 10 personnes sont inscrites (remainingSpots <= 0) ou si l'offre est expirée, le popup disparaît définitivement
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] overflow-y-auto p-3 sm:p-5 flex min-h-full items-center justify-center">
          {/* Backdrop sombre immersif */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#020617]/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Carte Modale Pro Designer & Marketing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-popup-title"
            className="relative w-full max-w-lg bg-[#030712] border border-cyan-500/35 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(0,212,255,0.18)] text-slate-100 my-auto z-10 overflow-hidden"
          >
            {/* Liseré supérieur signature gradient NOBTECH */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]" />

            {/* Halos d'ambiance high-tech */}
            <div className="absolute -top-24 -right-24 w-56 h-56 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Bouton Fermer */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Fermer l'offre promotionnelle"
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer z-20"
            >
              <X size={18} />
            </button>

            <div className="p-5 sm:p-7 space-y-4">
              {/* Badge d'Urgence Clarté Marketing */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] sm:text-xs font-mono font-bold tracking-wider">
                <Flame size={14} className="text-amber-400 shrink-0 animate-pulse" />
                <span>OFFRE DE LANCEMENT • 10 PREMIÈRES PLACES SEULEMENT</span>
              </div>

              {/* Titre & Promesse principale */}
              <div>
                <h3 id="promo-popup-title" className="text-lg sm:text-2xl font-black text-white tracking-tight leading-tight pr-6">
                  {formation.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {formation.shortDesc || "Cycle d'ingénierie et de certification intensive avec travaux pratiques sur baies physiques à Dakar."}
                </p>
              </div>

              {/* Bloc Tarif Unifié & Sans Confusion */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-slate-400">Prix public standard :</span>
                  <span className="text-sm sm:text-base font-bold text-slate-500 line-through decoration-slate-500 decoration-2">
                    {pricing.publicPrice.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
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
                    <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/40 shrink-0">
                      -{discountPercent}% ({economyAmount.toLocaleString("fr-FR")} F d&apos;économie)
                    </span>
                  )}
                </div>

                {pricing.paymentPlan && (
                  <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-cyan-300 font-mono">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>{pricing.paymentPlan}</span>
                  </div>
                )}
              </div>

              {/* Compteur de Rareté Transparent */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-200">
                  <span className="flex items-center gap-1.5">
                    <Flame size={14} className="text-amber-400 shrink-0" />
                    Places restantes à ce tarif préférentiel :
                  </span>
                  <span className="font-mono text-white text-xs sm:text-sm bg-amber-500/30 px-2 py-0.5 rounded font-black">
                    {remainingSpots} / {launchSpots}
                  </span>
                </div>

                {/* Barre de progression des attributions */}
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-amber-500/20">
                  <div
                    className="bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, Math.round((reservedSpots / launchSpots) * 100))}%`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>{reservedSpots} candidatures déjà reçues</span>
                  <span className="text-slate-400">Attribution selon l&apos;ordre d&apos;arrivée</span>
                </div>
              </div>

              {/* Les 3 Piliers de Valeur (Conversion & Rassurance) */}
              <div className="grid grid-cols-1 gap-2 pt-1">
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 flex items-center justify-center shrink-0">
                    <Server size={13} />
                  </div>
                  <span><strong>80% Pratique Réelle :</strong> Labs sur racks physiques Cisco &amp; simulateurs avancés</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center justify-center shrink-0">
                    <Award size={13} />
                  </div>
                  <span><strong>Certification Visée :</strong> Standard international reconnu par les employeurs</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="w-6 h-6 rounded-lg bg-purple-500/10 border border-purple-500/25 text-purple-400 flex items-center justify-center shrink-0">
                    <Users size={13} />
                  </div>
                  <span><strong>Mentorat Direct :</strong> Formateurs certifiés en activité + soutenance de projet</span>
                </div>
              </div>

              {/* Boutons d'Action Clairs et Hiérarchisés */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleApply}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider hover:opacity-95 hover:shadow-cyan-500/35 transition-all flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 cursor-pointer active:scale-98"
                >
                  <span>Postuler &amp; Réserver ma place à ce tarif</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={handleSyllabus}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText size={14} className="text-cyan-400" />
                  <span>Recevoir d&apos;abord le programme complet (PDF)</span>
                </button>
              </div>

              {/* Rassurance & Engagement Éthique */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1 text-center">
                <ShieldCheck size={12} className="text-emerald-400 shrink-0" />
                <span>Règle d&apos;intégrité : Dès la 10ème place pourvue, cette offre et ce tarif sont définitivement clôturés.</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
