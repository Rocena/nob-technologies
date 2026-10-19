"use client";

import React, { useState } from "react";
import { FormationPricing } from "@/data/formations";
import { CheckCircle2, Download, ArrowRight, Sparkles, Building2, User, Clock, ShieldCheck, Flame } from "lucide-react";
import { useEngineerModal } from "@/components/EngineerModalContext";
import { useFormationApplyModal } from "@/components/FormationApplyModalContext";
import { BrochureDownloadModal } from "./BrochureDownloadModal";

interface FormationPricingBoxProps {
  formationTitle: string;
  formationSlug: string;
  duration: string;
  pricing: FormationPricing;
}

export function FormationPricingBox({
  formationTitle,
  formationSlug,
  duration,
  pricing,
}: FormationPricingBoxProps) {
  const [activeTab, setActiveTab] = useState<"particulier" | "entreprise">("particulier");
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const { openQuoteModal } = useEngineerModal();
  const { openApplyModal } = useFormationApplyModal();

  const discountPercent = Math.round(
    ((pricing.publicPrice - pricing.launchPrice) / pricing.publicPrice) * 100
  );

  return (
    <div className="w-full">
      {/* Sélecteur de profil (Particulier vs Entreprise) */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-white/10 shadow-lg">
          <button
            type="button"
            onClick={() => setActiveTab("particulier")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "particulier"
                ? "bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <User size={15} />
            <span>Tarifs Particuliers &amp; Salariés</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("entreprise")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "entreprise"
                ? "bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Building2 size={15} />
            <span>Offre Entreprises &amp; DSI</span>
          </button>
        </div>
      </div>

      {/* CONTENU ONGLET 1 : PARTICULIER */}
      {activeTab === "particulier" && (
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-cyan-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Halo d'ambiance */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Colonne gauche : Prix barré & offre de lancement */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                <Sparkles size={14} className="text-cyan-400" />
                <span>OFFRE DE LANCEMENT LIMITÉE • ÉCONOMIE -{discountPercent}%</span>
              </div>

              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Tarif de Référence &amp; Prix Public :
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-slate-500 line-through">
                    {pricing.publicPrice.toLocaleString("fr-FR")} FCFA
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    -{discountPercent}%
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-1">
                  Prix Spécial Lancement ({duration}) :
                </p>
                <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 tracking-tight">
                  {pricing.launchPrice.toLocaleString("fr-FR")} <span className="text-lg font-bold text-cyan-400">FCFA</span>
                </div>
                {pricing.promoPrice && pricing.promoPrice !== pricing.launchPrice && (
                  <p className="text-xs text-slate-400 mt-1">
                    Tarif promotionnel standard : {pricing.promoPrice.toLocaleString("fr-FR")} FCFA
                  </p>
                )}
              </div>

              {/* Places limitées */}
              {pricing.launchSpots && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs flex items-center gap-2.5">
                  <Flame size={18} className="text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold">10 premières places seulement à ce tarif.</span>
                    <span className="text-amber-300/80 block text-[11px]">
                      Il ne reste que {pricing.remainingSpots || 3} places disponibles pour la prochaine session.
                    </span>
                  </div>
                </div>
              )}

              {/* Échelonnement */}
              {pricing.paymentPlan && (
                <div className="text-xs text-slate-300 bg-white/5 p-3 rounded-xl border border-white/10">
                  <span className="text-cyan-400 font-bold">Facilité de paiement :</span> {pricing.paymentPlan}
                </div>
              )}

              {/* Boutons d'action */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setBrochureModalOpen(true)}
                  className="flex-1 py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
                >
                  <Download size={16} />
                  <span>Télécharger la brochure PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => openApplyModal({ formationTitle, formationSlug })}
                  className="py-3.5 px-5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Postuler</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Colonne droite : Inclusions de qualité supérieure (évite l'effet pas cher = moins bien) */}
            <div className="lg:col-span-6 bg-slate-950/70 p-6 sm:p-7 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck size={18} className="text-cyan-400" />
                  Ce qui est inclus dans votre formation :
                </h4>
              </div>

              <ul className="space-y-3">
                {(pricing.includedInPrice || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 size={16} className="text-[#10E760] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 text-[11px] font-mono text-slate-400 border-t border-white/5 flex items-center gap-2">
                <Clock size={14} className="text-cyan-400" />
                <span>Rythme adapté : max 6h / semaine (cours du soir ou samedi matin).</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENU ONGLET 2 : ENTREPRISE */}
      {activeTab === "entreprise" && (
        <div className="max-w-3xl mx-auto rounded-3xl bg-slate-900 border border-white/15 p-8 sm:p-10 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
            <Building2 size={32} />
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-white mb-2">
              Formation Sur-Mesure Entreprise &amp; DSI
            </h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Vous souhaitez former vos équipes réseaux, systèmes ou cybersécurité ? Nous déployons des sessions intra ou inter-entreprises adaptées à vos impératifs de production et éligibles aux financements formation (3FPT / OPCO).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-300">
              <strong className="text-cyan-400 block mb-1">Planning Flexible</strong>
              Horaires adaptés aux contraintes d&apos;exploitation de votre DSI.
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-300">
              <strong className="text-cyan-400 block mb-1">Labs sur vos Réseaux</strong>
              Cas d&apos;usage configurés directement sur vos infrastructures.
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-300">
              <strong className="text-cyan-400 block mb-1">Rapports d&apos;Évaluation</strong>
              Suivi d&apos;assiduité et bilans de compétences remis à la direction.
            </div>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={() => openQuoteModal(`Formation Entreprise : ${formationTitle}`)}
              className="py-4 px-8 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] text-slate-950 font-bold text-sm uppercase tracking-wider hover:opacity-95 transition-all shadow-lg shadow-cyan-500/25 inline-flex items-center gap-2"
            >
              <span>Demander un devis entreprise sur-mesure</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Modal de téléchargement de la brochure PDF */}
      <BrochureDownloadModal
        formationTitle={formationTitle}
        formationSlug={formationSlug}
        isOpen={brochureModalOpen}
        onClose={() => setBrochureModalOpen(false)}
      />
    </div>
  );
}
