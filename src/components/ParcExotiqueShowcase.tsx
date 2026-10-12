"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { FadeUp } from "@/components/animations";
import { QuoteRequestButton } from "@/components/QuoteRequestButton";
import { ProjectCard } from "@/components/ProjectCard";
import {
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Globe,
  Zap,
  ShieldCheck,
  Smartphone,
  CalendarCheck,
  Layers,
  Share2,
} from "lucide-react";

export function ParcExotiqueShowcase({ projects = [] }: { projects?: any[] }) {
  const otherProjects = projects.filter((p: any) => p.slug !== "parc-exotique");

  const highlights = [
    {
      icon: CalendarCheck,
      title: "Réservations directes & zéro commission",
      description:
        "Module de réservation intuitif pour les chambres d'hôtel et visites guidées, réduisant la dépendance aux plateformes tierces.",
    },
    {
      icon: Share2,
      title: "Gestion Réseaux Sociaux (Instagram & Facebook)",
      description:
        "Community management complet et animation active des pages officielles de l'hôtel pour générer des réservations et fidéliser.",
    },
    {
      icon: Zap,
      title: "Temps de chargement < 1.2s sur mobile",
      description:
        "Architecture ultra-légère conçue pour les réseaux 4G/5G, assurant une navigation fluide pour les touristes et visiteurs sur place.",
    },
    {
      icon: ShieldCheck,
      title: "Hébergement haute disponibilité & SSL",
      description:
        "Infrastructure Cloud infogérée avec sauvegardes automatisées, chiffrement HTTPS et protection continue contre les coupures.",
    },
  ];

  const techBadges = [
    "Next.js & React",
    "Community Management (Insta & FB)",
    "UX Mobile-First",
    "Cloud Haute Disponibilité",
    "SEO & Référencement Google",
    "Sécurité SSL & Chiffrement",
  ];

  return (
    <Section
      id="realisations"
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50 to-slate-100/70 border-b border-slate-200/90 relative overflow-hidden"
    >
      {/* Decorative ambient background glows */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
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

        {/* Master Showcase Card */}
        <FadeUp delay={0.15}>
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/60 overflow-hidden transition-all duration-300">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-8 md:p-10 lg:p-12 items-center">
              
              {/* Left Column: Interactive Browser Frame */}
              <div className="lg:col-span-6 flex flex-col gap-4">
                <div className="relative group rounded-2xl overflow-hidden border border-slate-300/80 shadow-2xl bg-slate-950">
                  {/* Browser Chrome Header */}
                  <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300 max-w-[240px] truncate">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
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

                  {/* Screenshot with subtle hover zoom */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <Image
                      src="/images/parc-exotique-preview.png"
                      alt="Plateforme officielle de l'Hôtel du Parc Exotique du Sénégal réalisée par Nob Technologies"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      unoptimized
                    />
                    
                    {/* Live Badge Overlay */}
                    <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md border border-slate-800/80 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
                      <Globe className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Plateforme active & en ligne</span>
                    </div>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-[11px] font-mono uppercase font-bold text-slate-400 mr-1 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-cyan-600" /> Stack :
                  </span>
                  {techBadges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: High-Impact Sales Arguments & CTAs */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold text-cyan-800 bg-cyan-50 border border-cyan-200 mb-4">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                    <span>Projet Déployé en Production</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                    Parc Exotique du Sénégal &mdash; Plateforme Web Officielle &amp; Réservations
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                    Pour l&apos;Hôtel du Parc à Somone (chambres climatisées, restaurant La Plume, piscine et réserve naturelle), nous avons créé une vitrine numérique haut de gamme pour booster les réservations directes, tout en assurant la gestion et l&apos;animation complète de leurs réseaux sociaux officiels (Instagram et Facebook).
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {highlights.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1.5 hover:border-cyan-300 transition-colors"
                        >
                          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs sm:text-sm">
                            <Icon className="w-4 h-4 text-cyan-600 shrink-0" />
                            <span>{item.title}</span>
                          </div>
                          <p className="text-[12px] text-slate-500 leading-normal">
                            {item.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Conversion Buttons & Links */}
                <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Primary Action: Quote modal popup */}
                  <QuoteRequestButton
                    service="Développement Web & Plateformes"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[#020617] font-bold text-xs sm:text-sm bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] hover:brightness-105 transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_16px_0_rgba(0,212,255,0.35)] hover:shadow-[0_6px_24px_rgba(16,231,96,0.35)] cursor-pointer active:scale-95 group"
                  >
                    <span>Vous avez un projet ? Demander un devis</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </QuoteRequestButton>

                  {/* Secondary Action: Visit live site */}
                  <a
                    href="https://parcexotique.sn/fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-cyan-50/70 border border-slate-300 hover:border-cyan-400 text-slate-800 hover:text-cyan-800 font-semibold text-xs sm:text-sm transition-all duration-200 shadow-xs hover:shadow-sm active:scale-95"
                  >
                    <span>Tester le site en direct</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-600" />
                  </a>
                </div>

                {/* Tertiary link to all realizations */}
                <div className="mt-4 text-center sm:text-left">
                  <Link
                    href="/realisations"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 hover:text-cyan-800 hover:underline transition-colors"
                  >
                    <span>Découvrir l&apos;ensemble de nos réalisations d&apos;ingénierie</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </FadeUp>

        {/* Dynamic Additional Projects if published in Back Office */}
        {otherProjects.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <div className="text-center mb-8">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Autres Projets Déployés
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((p, idx) => (
                <FadeUp key={p.id || p.slug || idx} delay={0.1 * idx}>
                  <ProjectCard project={p} />
                </FadeUp>
              ))}
            </div>
          </div>
        )}

        {/* Action Link to Realisations */}
        <div className="mt-12 text-center">
          <Link
            href="/realisations"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-cyan-500/25"
          >
            <span>Voir toutes nos réalisations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
