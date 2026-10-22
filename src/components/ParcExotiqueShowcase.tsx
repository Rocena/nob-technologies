"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { FadeUp } from "@/components/animations";
import { QuoteRequestButton } from "@/components/QuoteRequestButton";
import { CorporateMetrics } from "@/components/CorporateMetrics";
import {
  ExternalLink,
  ArrowRight,
  Globe,
  Lock,
  Quote,
  Check,
} from "lucide-react";

export function ParcExotiqueShowcase({ projects = [] }: { projects?: any[] } = {}) {
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
            <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-extrabold flex items-center justify-center gap-2 flex-wrap">
              <span className="text-[#00D4FF] font-black select-none text-sm sm:text-base font-mono tracking-tighter inline-flex items-center">&gt;<span className="text-[#10E760] animate-pulse">_</span></span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                PROJETS &bull; DÉPLOIEMENTS EN PRODUCTION
              </span>
            </p>
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

        {/* Corporate Metrics Strip with Count-up Animation & Silicon Valley Styling */}
        <FadeUp delay={0.08}>
          <CorporateMetrics />
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
                  <div className="mb-5 p-4 sm:p-5 rounded-xl bg-slate-50/90 border border-slate-200/90">
                    <div className="flex items-center justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-1 text-amber-500 text-xs">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                        <span className="text-[11px] font-bold text-slate-700 ml-1.5 not-italic">5.0 &bull; Avis Vérifié</span>
                      </div>
                      <Quote className="w-4 h-4 text-cyan-600/50 shrink-0" />
                    </div>

                    <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed mb-3">
                      &laquo; Excellent travail franchement, très professionnel et surtout très réactif. Je ne pourrais pas trouver mieux ailleurs. &raquo;
                    </p>

                    <div className="flex items-center gap-2.5 pt-2.5 border-t border-slate-200/70">
                      <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                        SD
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Saad Diakhité</div>
                        <div className="text-[11px] text-slate-500 font-medium">Directeur Général Adjoint (DGA), Hôtel du Parc</div>
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
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[#020617] font-bold text-xs sm:text-sm bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] hover:brightness-105 active:scale-95 transition-all shadow-[0_4px_16px_0_rgba(0,212,255,0.35)] hover:shadow-[0_6px_24px_rgba(16,231,96,0.35)] cursor-pointer group"
                  >
                    <span>Demander un devis</span>
                    <ArrowRight className="w-4 h-4 text-[#020617] transition-transform group-hover:translate-x-1" />
                  </QuoteRequestButton>

                  <a
                    href="https://parcexotique.sn/fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-800 hover:text-slate-900 font-semibold text-xs sm:text-sm transition-all shadow-2xs"
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
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-800 hover:text-slate-900 font-semibold text-xs sm:text-sm transition-all shadow-2xs group"
          >
            <span>Découvrir l&apos;ensemble de nos réalisations d&apos;ingénierie</span>
            <ArrowRight className="w-4 h-4 text-cyan-700 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
