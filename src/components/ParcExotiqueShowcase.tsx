"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { FadeUp } from "@/components/animations";
import { QuoteRequestButton } from "@/components/QuoteRequestButton";
import {
  ExternalLink,
  ArrowRight,
  Globe,
  Lock,
  Quote,
  Check,
} from "lucide-react";

export function ParcExotiqueShowcase({ projects = [] }: { projects?: any[] } = {}) {
  const kpiStats = [
    { value: "100%", label: "Satisfaction Client", detail: "Qualité d'intervention & suivi rigoureux" },
    { value: "15+ Ans", label: "Expérience Fondateur", detail: "Ingénierie, maintenance & systèmes" },
    { value: "< 1.2s", label: "Performance Web", detail: "Temps de chargement moyen sur mobile" },
    { value: "24/7", label: "Disponibilité & Support", detail: "Infogérance & réactivité continue" },
  ];

  const keyDeliverables = [
    "Plateforme sur-mesure & réservations directes sans commission",
    "Gestion et animation active des réseaux sociaux (Instagram & Facebook)",
    "Hébergement Cloud haute disponibilité, sécurité SSL & infogérance",
  ];

  return (
    <Section
      id="realisations"
      className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-200/90 relative"
    >
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <FadeUp>
            <Heading
              level={2}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18] mb-4"
            >
              Nos Réalisations
            </Heading>

            <Text className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Ils nous ont fait confiance : découvrez nos projets déployés en production et les résultats concrets apportés à nos clients.
            </Text>
          </FadeUp>
        </div>

        {/* Corporate Metrics Strip */}
        <FadeUp delay={0.08}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
            {kpiStats.map((kpi, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mb-1">
                    {kpi.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-cyan-800 mb-1">
                    {kpi.label}
                  </div>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                  {kpi.detail}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Master Showcase: Parc Exotique du Sénégal (Clean Silicon Valley / Corporate Style) */}
        <FadeUp delay={0.12}>
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-8 md:p-10 items-center">
              
              {/* Left Column: Clean Minimalist Browser View */}
              <div className="lg:col-span-6 flex flex-col gap-3">
                <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-950 group">
                  {/* Minimalist Browser Chrome */}
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

                  {/* Screenshot */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <Image
                      src="/images/parc-exotique-preview.png"
                      alt="Plateforme officielle de l'Hôtel du Parc Exotique du Sénégal"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-102"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Minimalist Tech Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {["Next.js & React", "Réservations Directes", "Instagram & Facebook", "Cloud Haute Disponibilité", "SEO Google"].map((tech, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Clean Silicon Valley Presentation */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-cyan-800 mb-2">
                    Hôtellerie &bull; Somone, Sénégal
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                    Hôtel du Parc Exotique
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5">
                    Conception sur-mesure de la plateforme web officielle avec moteur de réservation direct sans commission pour l&apos;hôtel et la réserve animalière à Somone, complétée par la gestion et l&apos;animation continue de leurs réseaux sociaux officiels (Instagram et Facebook).
                  </p>

                  {/* Saad Diakhité Testimonial Box */}
                  <div className="mb-5 p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/90 relative">
                    <Quote className="w-5 h-5 text-slate-300 absolute top-3 right-3" />
                    <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed mb-3">
                      &laquo; Excellent travail franchement, très professionnel et surtout très réactif. Je ne pourrais pas trouver mieux ailleurs. &raquo;
                    </p>
                    <div className="flex items-center gap-2.5 pt-2 border-t border-slate-200/70">
                      <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[11px]">
                        SD
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Saad Diakhité</div>
                        <div className="text-[11px] text-slate-500">Directeur Général Adjoint (DGA), Hôtel du Parc</div>
                      </div>
                    </div>
                  </div>

                  {/* Bullet Deliverables */}
                  <div className="space-y-2 mb-6">
                    {keyDeliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conversion Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <QuoteRequestButton
                    service="Développement Web & Plateformes"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm cursor-pointer group"
                  >
                    <span>Demander un devis</span>
                    <ArrowRight className="w-4 h-4 text-cyan-400 transition-transform group-hover:translate-x-1" />
                  </QuoteRequestButton>

                  <a
                    href="https://parcexotique.sn/fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-xs sm:text-sm transition-colors shadow-2xs"
                  >
                    <span>Voir le site en ligne</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </FadeUp>

        {/* Clean Link to All Realisations */}
        <div className="mt-12 text-center">
          <Link
            href="/realisations"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs sm:text-sm transition-colors shadow-2xs group"
          >
            <span>Découvrir l&apos;ensemble de nos réalisations d&apos;ingénierie</span>
            <ArrowRight className="w-4 h-4 text-cyan-700 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
