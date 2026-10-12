"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { FadeUp } from "@/components/animations";
import { QuoteRequestButton } from "@/components/QuoteRequestButton";
import { ProjectCard, ProjectItem } from "@/components/ProjectCard";
import {
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Globe,
  Zap,
  ShieldCheck,
  CalendarCheck,
  Layers,
  Share2,
  Quote,
  Lock,
  Building2,
  Server,
  Network,
  Award,
  Sparkles,
} from "lucide-react";

const corporateReferences: ProjectItem[] = [
  {
    id: "union-europeenne-dakar",
    title: "Délégation de l’Union Européenne à Dakar",
    sector: "Diplomatique & Institutionnel",
    description: "Câblage structuré Cat 6A/7, pose et peignage méthodique des baies de brassage 42U, et certification Fluke Networks pour le siège diplomatique.",
    tags: ["Union Européenne", "Baies 42U", "Cat 6A/7", "Fluke Networks"],
    coverImage: "/images/projects/union-europeenne-baie-42u.jpg",
    clientLogo: "/images/partners/union-europeenne-logo.svg",
  },
  {
    id: "seter-ter-dakar",
    title: "SETER — Train Express Régional (TER Dakar)",
    sector: "Transport Ferroviaire & Télécoms",
    description: "Programme de formation technique spécialisée sur les architectures sol-train GSM-R, radiocommunications critiques et sûreté opérationnelle.",
    tags: ["SETER", "TER Dakar", "GSM-R", "Télécoms Ferroviaires"],
    coverImage: "/images/projects/seter-gsmr-formation-rack.jpg",
    clientLogo: "/images/partners/seter-ter-dakar.png",
  },
  {
    id: "polyclinique-p2a",
    title: "Polyclinique P2A (Dakar)",
    sector: "Santé & Établissement Médical",
    description: "Infrastructure réseau médicale, virtualisation VMware des serveurs de santé, téléphonie d'entreprise Yeastar VoIP et pare-feu Fortinet NGFW.",
    tags: ["Polyclinique P2A", "VMware", "VoIP Yeastar", "Fortinet NGFW"],
    coverImage: "/images/projects/polyclinique-medical.jpg",
    clientLogo: "/images/partners/polyclinique-p2a.svg",
  },
  {
    id: "dolima-senegal",
    title: "Dolima — La Laiterie du Berger",
    sector: "Agro-Industrie & Production",
    description: "Ingénierie du réseau d'entreprise, commutation LAN haute densité, segmentation VLAN et fiabilisation de la connectivité continue.",
    tags: ["Dolima", "Switching LAN", "Segmentation VLAN", "Haute Disponibilité"],
    coverImage: "/images/projects/reseau-switching-datacenter.jpg",
    clientLogo: "/images/partners/dolima.png",
  },
];

export function ParcExotiqueShowcase({ projects = [] }: { projects?: any[] }) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const otherProjects = projects.filter((p: any) => p.slug !== "parc-exotique");
  const displayProjects = otherProjects.length > 0 ? otherProjects : corporateReferences;

  const filteredProjects = displayProjects.filter((p: ProjectItem) => {
    if (activeTab === "all") return true;
    if (activeTab === "infra") {
      return (
        p.sector?.toLowerCase().includes("institutionnel") ||
        p.sector?.toLowerCase().includes("diplomatique") ||
        p.sector?.toLowerCase().includes("agro-industrie") ||
        p.tags?.some((t) => t.toLowerCase().includes("baies") || t.toLowerCase().includes("lan"))
      );
    }
    if (activeTab === "telecoms") {
      return (
        p.sector?.toLowerCase().includes("transport") ||
        p.sector?.toLowerCase().includes("télécom") ||
        p.tags?.some((t) => t.toLowerCase().includes("gsm-r") || t.toLowerCase().includes("radio"))
      );
    }
    if (activeTab === "health") {
      return (
        p.sector?.toLowerCase().includes("santé") ||
        p.sector?.toLowerCase().includes("médical") ||
        p.tags?.some((t) => t.toLowerCase().includes("vmware") || t.toLowerCase().includes("fortinet"))
      );
    }
    return true;
  });

  const kpiStats = [
    { value: "100%", label: "Satisfaction Client", detail: "Projets livrés & validés en production" },
    { value: "15+ Ans", label: "Expertise Ingénierie", detail: "Consultants & ingénieurs certifiés" },
    { value: "< 1.2s", label: "Performance Web", detail: "Temps de réponse mobile 4G/5G" },
    { value: "24/7", label: "Infogérance & SLA", detail: "Supervision proactive & astreinte continue" },
  ];

  const highlights = [
    {
      icon: CalendarCheck,
      title: "Réservations directes sans commission",
      description:
        "Module de réservation intuitif pour les chambres d'hôtel et visites guidées, réduisant immédiatement les coûts d'intermédiation.",
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
        "Architecture Next.js ultra-légère conçue pour les réseaux 4G/5G, assurant une navigation fluide pour les touristes et résidents.",
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
    "Moteur de Réservations",
    "Community Management (Insta & FB)",
    "UX Mobile-First",
    "Cloud Haute Disponibilité",
    "Sécurité SSL & Chiffrement",
    "SEO Local Google",
  ];

  return (
    <Section
      id="realisations"
      className="py-16 md:py-24 lg:py-28 bg-slate-50/70 border-b border-slate-200/90 relative overflow-hidden"
    >
      {/* Discreet corporate ambient lighting */}
      <div
        className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-slate-300/20 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <FadeUp>
            {/* Corporate Overline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-semibold mb-4 border border-slate-200/90 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-slate-700 font-medium">
                Études de Cas &amp; Déploiements en Production
              </span>
            </div>

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

        {/* Corporate Metrics Ribbon */}
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
            {kpiStats.map((kpi, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
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

        {/* Master Showcase: Parc Exotique du Sénégal */}
        <FadeUp delay={0.15}>
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden mb-16">
            {/* Master Card Executive Header Bar */}
            <div className="px-6 py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold tracking-wide uppercase text-slate-300">
                  Référence Majeure &bull; Hôtellerie &amp; Écotourisme (Somone, Sénégal)
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="hidden sm:inline text-slate-400">Projet déployé &amp; infogéré</span>
                <span className="text-slate-600 hidden sm:inline">&bull;</span>
                <a
                  href="https://parcexotique.sn/fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
                >
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>parcexotique.sn</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-8 md:p-10 lg:p-12 items-center">
              
              {/* Left Column: Workstation & Platform View */}
              <div className="lg:col-span-6 flex flex-col gap-4">
                <div className="relative group rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-950">
                  {/* Clean Corporate Frame Header */}
                  <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800 text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 max-w-[240px] truncate">
                      <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">https://parcexotique.sn/fr</span>
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

                  {/* Screenshot with clean hover effect */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <Image
                      src="/images/parc-exotique-preview.png"
                      alt="Plateforme officielle de l'Hôtel du Parc Exotique du Sénégal réalisée par Nob Technologies"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                      unoptimized
                    />
                    
                    {/* Live Badge Overlay */}
                    <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md border border-slate-800/80 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
                      <Globe className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Plateforme active &amp; accessible 24/7</span>
                    </div>
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mr-1 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-cyan-700" /> Périmètre :
                  </span>
                  {techBadges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100/90 text-slate-700 border border-slate-200/80"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Corporate Case Study & Testimonial */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold text-cyan-900 bg-cyan-50 border border-cyan-200/80 mb-3.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-700" />
                    <span>Déploiement Clé-en-Main &bull; Production</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                    Hôtel du Parc Exotique &mdash; Plateforme Web &amp; Moteur de Réservation
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5">
                    Pour l&apos;Hôtel du Parc à Somone (chambres de charme, restaurant La Plume, piscine et réserve animalière), Nob Technologies a conçu une vitrine digitale haute performance avec système de réservation sans commission, tout en assurant la gestion et l&apos;animation continue de leurs réseaux sociaux officiels (Instagram et Facebook).
                  </p>

                  {/* Executive Client Testimonial Box */}
                  <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-cyan-50/30 border border-slate-200/90 relative">
                    <Quote className="w-6 h-6 text-cyan-500/30 absolute top-3 right-3" />
                    <p className="text-xs sm:text-sm text-slate-800 font-medium italic leading-relaxed mb-3">
                      &laquo; Excellent travail franchement, très professionnel et surtout très réactif. Je ne pourrais pas trouver mieux ailleurs. &raquo;
                    </p>
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                      <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                        SD
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Saad Diakhité</div>
                        <div className="text-[11px] text-slate-500">Directeur Général Adjoint (DGA), Hôtel du Parc</div>
                      </div>
                      <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Témoignage Vérifié
                      </span>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {highlights.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 flex flex-col gap-1 hover:border-slate-300 transition-colors"
                        >
                          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs sm:text-sm">
                            <Icon className="w-4 h-4 text-cyan-700 shrink-0" />
                            <span>{item.title}</span>
                          </div>
                          <p className="text-[11.5px] text-slate-500 leading-normal">
                            {item.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Conversion Buttons & Links */}
                <div className="pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Primary Corporate Action */}
                  <QuoteRequestButton
                    service="Développement Web & Plateformes"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 transition-all shadow-md hover:shadow-lg cursor-pointer group"
                  >
                    <span>Demander une étude pour votre projet</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-cyan-400" />
                  </QuoteRequestButton>

                  {/* Secondary Action */}
                  <a
                    href="https://parcexotique.sn/fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-xs sm:text-sm transition-all shadow-2xs hover:shadow-xs"
                  >
                    <span>Tester le site en direct</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-600" />
                  </a>
                </div>

              </div>
            </div>
          </div>
        </FadeUp>

        {/* Corporate Institutional References Grid */}
        <div className="mt-14 sm:mt-18">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-800 block mb-1">
                Portefeuille Entreprises &amp; Institutions
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Déploiements Majeurs en Production
              </h3>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "all"
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Tous les déploiements
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("infra")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "infra"
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Infrastructures &amp; Réseaux
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("telecoms")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "telecoms"
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Télécoms Critiques
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("health")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "health"
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Santé &amp; Virtualisation
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProjects.map((p, idx) => (
              <FadeUp key={p.id || p.slug || idx} delay={0.08 * idx}>
                <ProjectCard project={p} />
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Action Link to Realisations */}
        <div className="mt-14 text-center">
          <Link
            href="/realisations"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md group"
          >
            <span>Consulter l&apos;ensemble de nos références d&apos;ingénierie</span>
            <ArrowRight className="w-4 h-4 text-cyan-600 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
