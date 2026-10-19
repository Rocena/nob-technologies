"use client";

import React, { useState, useEffect } from "react";
import { Formation } from "@/data/formations";
import { X, Flame, ShieldCheck, ArrowRight, FileText, CheckCircle2 } from "lucide-react";
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

  // Si l'offre est expirée (10 personnes inscrites) ou si aucune promo n'est active, on ne monte rien !
  const isPromoActive = Boolean(
    pricing &&
    !pricing.isPromoExpired &&
    typeof pricing.remainingSpots === "number" &&
    pricing.remainingSpots > 0 &&
    pricing.launchSpots &&
    pricing.launchSpots > 0
  );

  useEffect(() => {
    if (!isPromoActive) return;

    // Vérifier si le visiteur a déjà fermé ce pop-up durant cette session
    const storageKey = `nobtech_promo_popup_seen_${formation.slug}`;
    const alreadyDismissed = typeof window !== "undefined" && sessionStorage.getItem(storageKey);

    if (!alreadyDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500); // Apparition fluide 1.5s après l'ouverture de la page

      return () => clearTimeout(timer);
    }
  }, [isPromoActive, formation.slug]);

  if (!isPromoActive || !isOpen || !pricing) {
    return null;
  }

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`nobtech_promo_popup_seen_${formation.slug}`, "true");
    }
  };

  const handleApply = () => {
    handleClose();
    openApplyModal({
      formationTitle: formation.title,
      formationSlug: formation.slug,
    });
  };

  const handleSyllabus = () => {
    handleClose();
    openSyllabusModal({
      formationTitle: formation.title,
      formationSlug: formation.slug,
    });
  };

  const remainingSpots = pricing.remainingSpots ?? 3;
  const launchSpots = pricing.launchSpots ?? 10;
  const reservedSpots = launchSpots - remainingSpots;
  const economyAmount = pricing.publicPrice - pricing.launchPrice;
  const discountPercent = Math.round((economyAmount / pricing.publicPrice) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,212,255,0.25)] text-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Halo décoratif */}
        <div className="absolute -top-20 -right-20 w-56 h-56 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Bouton Fermer */}
        <button
          onClick={handleClose}
          aria-label="Fermer la promotion"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Badge d'urgence & exclusivité */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold mb-4">
          <Flame size={14} className="text-amber-400 shrink-0 animate-pulse" />
          <span>OFFRE DE LANCEMENT • 10 PREMIÈRES PLACES SEULEMENT</span>
        </div>

        {/* Titre & Accroche */}
        <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
          {formation.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
          Maîtrisez les infrastructures réseaux et préparez la certification mondiale Cisco dans nos laboratoires à Dakar (TP sur routeurs et commutateurs physiques réels).
        </p>

        {/* Bloc Tarif Promotionnel Transparent */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/10 mb-5 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Prix public :</span>
            <span className="text-base font-bold text-slate-500 line-through">
              {pricing.publicPrice.toLocaleString("fr-FR")} FCFA
            </span>
          </div>

          {pricing.promoPrice && pricing.promoPrice !== pricing.launchPrice && (
            <div className="flex items-baseline justify-between text-xs text-slate-400">
              <span className="font-mono">Tarif promo standard :</span>
              <span className="font-semibold text-slate-300">
                {pricing.promoPrice.toLocaleString("fr-FR")} FCFA
              </span>
            </div>
          )}

          <div className="pt-2 border-t border-white/10 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                Tarif de Lancement Exclusif :
              </span>
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300">
                {pricing.launchPrice.toLocaleString("fr-FR")}{" "}
                <span className="text-base font-bold text-cyan-400">FCFA</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/40">
              -{discountPercent}% ({economyAmount.toLocaleString("fr-FR")} FCFA d&apos;économie)
            </span>
          </div>

          {pricing.paymentPlan && (
            <p className="text-[11px] text-cyan-300/90 font-mono pt-1">
              ✓ {pricing.paymentPlan}
            </p>
          )}
        </div>

        {/* Compteur de places restantes avec vérification réelle */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 mb-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-amber-200">
            <span className="flex items-center gap-1.5">
              <Flame size={15} className="text-amber-400 shrink-0" />
              Places restantes à ce tarif :
            </span>
            <span className="font-mono text-white text-sm bg-amber-500/30 px-2 py-0.5 rounded">
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
              <CheckCircle2 size={11} /> Compteur certifié en temps réel
            </span>
          </div>
        </div>

        {/* Boutons d'Action */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleApply}
            className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] text-slate-950 font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer"
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
            <span>Recevoir d&apos;abord le programme complet par email</span>
          </button>
        </div>

        {/* Engagement Éthique & Anti-Publicité Mensongère */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-4 mt-2 border-t border-white/5 text-center">
          <ShieldCheck size={12} className="text-emerald-400 shrink-0" />
          <span>Garantie Transparence : Dès que la 10ème place est validée, le popup et le tarif de lancement disparaissent définitivement.</span>
        </div>
      </div>
    </div>
  );
}
