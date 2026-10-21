"use client";

import React from "react";
import { Building2, Zap, UserCheck, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { useEngineerModal } from "@/components/EngineerModalContext";
import { useFormationApplyModal } from "@/components/FormationApplyModalContext";

interface FormationOfferingsSectionProps {
  formationTitle?: string;
}

export function FormationOfferingsSection({ formationTitle }: FormationOfferingsSectionProps) {
  const { openQuoteModal } = useEngineerModal();
  const { openApplyModal } = useFormationApplyModal();

  const offerings = [
    {
      id: "entreprise",
      badge: "Pour les Entreprises",
      title: "Formation Entreprise & DSI",
      icon: Building2,
      accentColor: "from-blue-500 to-indigo-600",
      borderColor: "hover:border-blue-500/50",
      targetAudience: "DSI, équipes IT, techniciens & ingénieurs en poste",
      description:
        "Faites monter en compétences vos collaborateurs directement sur vos problématiques réseau et cybersécurité, sans impacter la continuité de service.",
      rhythm: "Sur-mesure (intra-entreprise ou max 6h / semaine)",
      features: [
        "Planning et horaires flexibles adaptés aux impératifs métiers",
        "Travaux pratiques et labs configurés sur vos infrastructures",
        "Rapports d'assiduité et bilans d'évaluation remis à la direction",
        "Éligible au financement 3FPT & budgets formation continue",
      ],
      ctaText: "Devis & Plan Entreprise",
      action: () =>
        openQuoteModal(
          formationTitle
            ? `Formation Entreprise: ${formationTitle}`
            : "Formation Entreprise & DSI"
        ),
    },
    {
      id: "bootcamp",
      badge: "Bootcamp Pratique",
      title: "Bootcamp Accélérateur",
      icon: Zap,
      accentColor: "from-amber-500 to-orange-600",
      borderColor: "hover:border-amber-500/50",
      targetAudience: "Professionnels & techniciens visant une certification rapide",
      description:
        "Immersion condensée 100% axée sur la manipulation réelle, les scénarios d'incidents et la préparation intensive aux examens officiels constructeurs.",
      rhythm: "Sessions intensives ciblées (max 6h / semaine)",
      features: [
        "100% axé travaux pratiques sur baies réelles et émulateurs",
        "Simulations chronométrées au format d'examen Pearson VUE",
        "Mentorat resserré par des ingénieurs certifiés seniors",
        "Vouchers d'examen et entraînement intensif sur questions pièges",
      ],
      ctaText: "Postuler au Bootcamp",
      action: () =>
        openApplyModal({
          formationTitle,
          targetSession: "Cursus accéléré / Bootcamp",
        }),
    },
    {
      id: "particulier",
      badge: "Pour Particuliers",
      title: "Particuliers & Salariés",
      icon: UserCheck,
      accentColor: "from-emerald-500 to-teal-600",
      borderColor: "hover:border-emerald-500/50",
      targetAudience: "Salariés en reconversion, indépendants & étudiants",
      description:
        "Suivez votre formation en toute sérénité sans quitter votre emploi ni vos cours. Un rythme allégé de max 6h par semaine, en soirée ou le samedi matin.",
      rhythm: "Max 6h / semaine (soirs 18h-20h ou samedi matin)",
      features: [
        "Rythme allégé (max 6h/semaine) compatible avec un emploi",
        "Accès 24/7 aux labs virtuels, environnements cloud et cours enregistrés",
        "Parrainage technique et coaching individuel par un ingénieur senior",
        "Facilités de paiement mensuel échelonné sans frais",
      ],
      ctaText: "Postuler à cette formation",
      action: () =>
        openApplyModal({
          formationTitle,
          targetSession: "Prochaine Rentrée Officielle (dans les 30 jours)",
        }),
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-extrabold flex items-center justify-center gap-2 flex-wrap">
          <span className="text-[#0284C7] dark:text-sky-400">
            ACCOMPAGNEMENT &bull; FLEXIBILITÉ
          </span>
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
          3 Formats Adaptés à Vos Objectifs
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Pour garantir votre réussite, nos formations sont calibrées à un rythme accessible de <span className="text-cyan-400 font-semibold">maximum 6 heures par semaine</span>, conciliant parfaitement votre activité quotidienne et votre montée en compétences.
        </p>
      </div>

      {/* 3 Offering Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {offerings.map((offering) => {
          const Icon = offering.icon;
          return (
            <div
              key={offering.id}
              className={`p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-white/10 ${offering.borderColor} transition-all duration-300 flex flex-col justify-between shadow-xl relative group`}
            >
              <div>
                {/* Header card */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                    {offering.badge}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {offering.title}
                </h3>

                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {offering.description}
                </p>

                {/* Rhythm pill badge */}
                <div className="mb-5 p-3 rounded-xl bg-slate-950/80 border border-white/5 flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">Rythme horaire</p>
                    <p className="text-xs font-semibold text-white">{offering.rhythm}</p>
                  </div>
                </div>

                {/* Features checklist */}
                <div className="space-y-2.5 mb-6">
                  {offering.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={offering.action}
                className="w-full py-3 px-4 rounded-xl text-white font-bold text-xs bg-[#0284C7] hover:bg-[#0369A1] hover:brightness-105 active:scale-95 transition-all shadow-[0_4px_14px_0_rgba(0,212,255,0.35)] hover:shadow-[0_6px_20px_rgba(16,231,96,0.35)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{offering.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#020617]" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
