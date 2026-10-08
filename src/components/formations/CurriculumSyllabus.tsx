"use client";

import React, { useState } from "react";
import { FormationMonth } from "@/data/formations";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Calendar,
  CheckCircle2,
  Terminal,
  FileCheck,
  BookOpen,
  Award,
  Download,
  Users,
  Layers,
  ArrowRight
} from "lucide-react";
import { useEngineerModal } from "@/components/EngineerModalContext";

interface CurriculumSyllabusProps {
  months: FormationMonth[];
  formationTitle: string;
}

export function CurriculumSyllabus({ months, formationTitle }: CurriculumSyllabusProps) {
  // Par défaut, le premier mois est ouvert pour donner un aperçu immédiat
  const [openMonths, setOpenMonths] = useState<Record<number, boolean>>({
    1: true,
  });
  const [activeTab, setActiveTab] = useState<number | "all">("all");
  const { openQuoteModal } = useEngineerModal();

  const toggleMonth = (m: number) => {
    setOpenMonths((prev) => ({
      ...prev,
      [m]: !prev[m],
    }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    months.forEach((m) => {
      all[m.month] = true;
    });
    setOpenMonths(all);
  };

  const collapseAll = () => {
    setOpenMonths({});
  };

  const isAllExpanded = months.every((m) => openMonths[m.month]);

  const displayedMonths = activeTab === "all" ? months : months.filter((m) => m.month === activeTab);

  return (
    <div className="w-full">
      {/* Header du Syllabus inspiré des plateformes d'apprentissage de référence */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
              Programme d&apos;études &amp; Syllabus détaillé
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              24 semaines intensives d&apos;apprentissage structurées en 6 modules progressifs. Chaque mois articule fondements théoriques, travaux pratiques sur banc d&apos;essai et évaluation continue par projet.
            </p>
          </div>

          {/* Contrôles Déplier / Replier */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={isAllExpanded ? collapseAll : expandAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              {isAllExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>Tout replier</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span>Tout déplier</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Barre de métriques clés du cursus (Style Coursera / edX) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="flex items-center gap-2.5 text-cyan-400 mb-1">
              <Calendar className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Durée du cycle</span>
            </div>
            <p className="text-lg font-bold text-white">6 Mois (24 semaines)</p>
            <p className="text-xs text-slate-400 mt-0.5">Rythme progressif et continu</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="flex items-center gap-2.5 text-cyan-400 mb-1">
              <Clock className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Volume encadré</span>
            </div>
            <p className="text-lg font-bold text-white">180 Heures</p>
            <p className="text-xs text-slate-400 mt-0.5">30h / mois (cours &amp; labs dirigés)</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="flex items-center gap-2.5 text-cyan-400 mb-1">
              <Terminal className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pratique réelle</span>
            </div>
            <p className="text-lg font-bold text-white">6 Labs &amp; Ateliers</p>
            <p className="text-xs text-slate-400 mt-0.5">Matériel physique &amp; émulateurs</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="flex items-center gap-2.5 text-cyan-400 mb-1">
              <Award className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Validation</span>
            </div>
            <p className="text-lg font-bold text-white">Examens Blancs</p>
            <p className="text-xs text-slate-400 mt-0.5">Simulations format Pearson VUE</p>
          </div>
        </div>

        {/* Sélecteur de mois / Navigation par onglets */}
        <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === "all"
                ? "bg-cyan-500 text-slate-950 font-bold"
                : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            Vue complète ({months.length} mois)
          </button>
          {months.map((m) => (
            <button
              key={m.month}
              type="button"
              onClick={() => {
                setActiveTab(m.month);
                setOpenMonths((prev) => ({ ...prev, [m.month]: true }));
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === m.month
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              Mois {m.month}
            </button>
          ))}
        </div>
      </div>

      {/* Accordéon interactif modulaire (Pattern Coursera / edX / Springboard) */}
      <div className="space-y-4">
        {displayedMonths.map((m) => {
          const isOpen = activeTab === m.month || !!openMonths[m.month];

          return (
            <div
              key={m.month}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-slate-900 border-white/20 shadow-lg"
                  : "bg-slate-900/60 border-white/10 hover:border-white/20"
              }`}
            >
              {/* En-tête de module cliquable */}
              <button
                type="button"
                onClick={() => toggleMonth(m.month)}
                className="w-full text-left p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 transition-colors hover:bg-white/[0.02]"
                aria-expanded={isOpen}
              >
                <div className="flex items-start sm:items-center gap-4">
                  {/* Badge d'index de mois épuré */}
                  <div className="shrink-0 w-11 h-11 rounded-lg bg-slate-800 border border-white/10 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 leading-none">Mois</span>
                    <span className="text-sm font-bold text-white leading-none mt-0.5">{String(m.month).padStart(2, "0")}</span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-1">
                      <span className="text-xs font-medium text-cyan-400">
                        {m.duration}
                      </span>
                      <span className="text-slate-500 text-xs">•</span>
                      <span className="text-xs text-slate-400">
                        {m.topics.length} sujets au programme
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300">
                      {m.title}
                    </h3>
                  </div>
                </div>

                {/* Chevron d'état */}
                <div className="shrink-0 flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-transform duration-200 ${
                      isOpen
                        ? "bg-white/10 border-white/20 text-white rotate-180"
                        : "bg-white/5 border-white/10 text-slate-400 rotate-0"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* Contenu détaillé du module */}
              {isOpen && (
                <div className="px-5 pb-6 sm:px-6 sm:pb-8 pt-2 border-t border-white/10">
                  {/* Objectif d'apprentissage */}
                  <div className="mb-6 p-4 rounded-lg bg-slate-950/70 border border-white/5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Objectif pédagogique du mois
                    </p>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {m.objectives}
                    </p>
                  </div>

                  {/* Grille : Cours théoriques & Pratique */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Colonne gauche : Notions & Compétences (7 colonnes) */}
                    <div className="lg:col-span-7">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-cyan-400" />
                        <span>Sujets &amp; Compétences enseignées</span>
                      </h4>
                      <ul className="space-y-2.5">
                        {m.topics.map((topic, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-white/[0.02] p-2.5 rounded-lg border border-white/5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Colonne droite : Atelier pratique & Jalon de validation (5 colonnes) */}
                    <div className="lg:col-span-5 space-y-4">
                      {/* Carte Lab Pratique */}
                      <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/20">
                        <div className="flex items-center gap-2 text-cyan-400 mb-2">
                          <Terminal className="w-4 h-4" />
                          <h5 className="text-xs font-bold uppercase tracking-wider">
                            Atelier Lab en conditions réelles
                          </h5>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {m.practicalLab}
                        </p>
                      </div>

                      {/* Carte Livrable & Validation */}
                      <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/20">
                        <div className="flex items-center gap-2 text-emerald-400 mb-2">
                          <FileCheck className="w-4 h-4" />
                          <h5 className="text-xs font-bold uppercase tracking-wider">
                            Livrable &amp; Jalon d&apos;évaluation
                          </h5>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {m.deliverable}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bannière de téléchargement du syllabus / Échange avec un conseiller */}
      <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-lg sm:text-xl font-bold text-white mb-1.5">
            Vous souhaitez soumettre ce programme à votre direction ou OPCO ?
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Téléchargez la plaquette complète incluant le calendrier des sessions, le détail des labs et les modalités de prise en charge entreprise.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <a
            href="#candidature"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs text-center transition-colors shadow-md"
          >
            Recevoir la brochure PDF
          </a>
          <button
            type="button"
            onClick={() => openQuoteModal(`Programme Formation: ${formationTitle}`)}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs text-center transition-colors"
          >
            Échanger avec un conseiller
          </button>
        </div>
      </div>
    </div>
  );
}
