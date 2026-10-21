"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/ui/layout";
import { QuoteRequestButton } from "@/components/QuoteRequestButton";
import { CorporateMetrics } from "@/components/CorporateMetrics";
import {
  ExternalLink,
  ArrowRight,
  Lock,
  Quote,
  Check,
} from "lucide-react";

export function ParcExotiqueShowcase({ projects: _projects = [] }: { projects?: any[] } = {}) {
  const keyDeliverables = [
    "Plateforme sur-mesure & réservations directes sans commission",
    "Gestion et animation active des réseaux sociaux (Instagram & Facebook)",
    "Hébergement Cloud haute disponibilité, sécurité SSL & infogérance",
  ];

  return (
    <Section
      id="realisations"
      className="py-20 md:py-28 bg-[#F7F8FA] dark:bg-[#070D1F] border-b border-slate-200/90 dark:border-slate-800/80 relative"
    >
      <Container className="relative z-10">
        {/* Editorial Left-Aligned Section Header */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold text-sky-700 dark:text-sky-400 mb-2">
              Études de cas &amp; Déploiements en production
            </div>
            <h2
              className="font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
              style={{ fontSize: "clamp(1.85rem, 1.3rem + 2vw, 3rem)" }}
            >
              Des réalisations mesurables, de la salle serveur à l&apos;expérience client.
            </h2>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <Link
              href="/realisations"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-xs sm:text-sm transition-colors group"
            >
              <span>Voir toutes nos références</span>
              <ArrowRight className="w-4 h-4 text-[#0284C7] transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Corporate Metrics Strip */}
        <CorporateMetrics />

        {/* Master Case Study Card */}
        <div className="bg-white dark:bg-[#0B132B] rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-8 md:p-10 items-center">
            {/* Left Column: Browser Frame */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 group">
                <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800 text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300">
                    <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>https://parcexotique.sn/fr</span>
                  </div>

                  <a
                    href="https://parcexotique.sn/fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                    title="Ouvrir dans un nouvel onglet"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <Image
                    src="/images/parc-exotique-preview.png"
                    alt="Plateforme officielle de l'Hôtel du Parc Exotique du Sénégal"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top"
                    unoptimized
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {["Next.js & React", "Réservations Directes", "Instagram & Facebook", "Cloud Haute Disponibilité", "SEO Google"].map((tech, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono font-medium px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Case Study Details */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-sky-700 dark:text-sky-400 mb-2">
                  Hôtellerie &amp; Tourisme · Somone, Sénégal
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                  Hôtel du Parc Exotique
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  Conception sur-mesure de la plateforme web officielle avec moteur de réservation direct sans commission pour l&apos;hôtel et la réserve animalière à Somone, complétée par la gestion et l&apos;animation continue de leurs réseaux sociaux officiels (Instagram et Facebook).
                </p>

                {/* Saad Diakhité Testimonial Box */}
                <div className="mb-5 p-4 sm:p-5 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Retour de la Direction Générale
                    </span>
                    <Quote className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed mb-3">
                    &laquo; Excellent travail franchement, très professionnel et surtout très réactif. Je ne pourrais pas trouver mieux ailleurs. &raquo;
                  </p>

                  <div className="flex items-center gap-2.5 pt-2.5 border-t border-slate-200/70 dark:border-slate-800">
                    <div className="w-7 h-7 rounded-full bg-[#0A2540] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                      SD
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Saad Diakhité</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Directeur Général Adjoint (DGA), Hôtel du Parc</div>
                    </div>
                  </div>
                </div>

                {/* Bullet Deliverables */}
                <div className="space-y-2 mb-6">
                  {keyDeliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <QuoteRequestButton
                  service="Développement Web & Plateformes"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-semibold text-xs sm:text-sm bg-[#0284C7] hover:bg-[#0369A1] transition-colors cursor-pointer group"
                >
                  <span>Demander un devis similaire</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </QuoteRequestButton>

                <a
                  href="https://parcexotique.sn/fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-xs sm:text-sm transition-colors"
                >
                  <span>Consulter parcexotique.sn</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
