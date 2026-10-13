"use client";

import React, { useState, useEffect } from "react";
import { Container, Section } from "@/components/ui/layout";
import { FadeUp } from "@/components/animations";
import { ClientLogoImg } from "./ClientLogoImg";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useQuoteModal } from "./EngineerModalContext";
import {
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Eye,
  X,
  Sparkles,
} from "lucide-react";

export const defaultTrustedBrands = [
  {
    name: "Sophos",
    category: "Firewalls XGS & Sécurité",
    badge: "Pare-feu",
    categoryGroup: "cyber",
    url: "https://www.sophos.com/",
    logo: "/images/partners/sophos.svg",
  },
  {
    name: "Fortinet",
    category: "Next-Gen Firewall FortiGate",
    badge: "NGFW",
    categoryGroup: "cyber",
    url: "https://www.fortinet.com/",
    logo: "/images/partners/fortinet.svg",
  },
  {
    name: "Microsoft 365",
    category: "Licences ESD & CSP",
    badge: "Cloud & Office",
    categoryGroup: "cloud",
    url: "https://www.microsoft.com/microsoft-365",
    logo: "/images/partners/microsoft.svg",
  },
  {
    name: "Cisco",
    category: "Réseaux & Commutation",
    badge: "Réseaux",
    categoryGroup: "infra",
    url: "https://www.cisco.com/",
    logo: "/images/partners/cisco-color.svg",
  },
  {
    name: "Dell Technologies",
    category: "Serveurs & Stockage",
    badge: "Hardware",
    categoryGroup: "infra",
    url: "https://www.dell.com/",
    logo: "/images/partners/dell-color.svg",
  },
  {
    name: "VMware",
    category: "Virtualisation d'Entreprise",
    badge: "Virtualisation",
    categoryGroup: "cloud",
    url: "https://www.vmware.com/",
    logo: "/images/partners/vmware.svg",
  },
  {
    name: "Acronis",
    category: "Sauvegarde & Anti-Ransomware",
    badge: "Backup",
    categoryGroup: "cloud",
    url: "https://www.acronis.com/",
    logo: "/images/partners/acronis.svg",
  },
  {
    name: "Kaspersky",
    category: "Cyberdéfense Applicative",
    badge: "Sécurité",
    categoryGroup: "cyber",
    url: "https://www.kaspersky.com/",
    logo: "/images/partners/kaspersky.svg",
  },
  {
    name: "Wallix",
    category: "Gestion des Accès à Privilèges",
    badge: "IAM / PAM",
    categoryGroup: "cyber",
    url: "https://www.wallix.com/",
    logo: "/images/partners/wallix.svg",
  },
  {
    name: "Yeastar",
    category: "Téléphonie IP d'Entreprise",
    badge: "VoIP",
    categoryGroup: "telecom",
    url: "https://www.yeastar.com/",
    logo: "/images/partners/yeastar.svg",
  },
  {
    name: "Paessler",
    category: "Supervision Réseau & Monitoring",
    badge: "PRTG",
    categoryGroup: "telecom",
    url: "https://www.paessler.com/",
    logo: "/images/partners/paessler.svg",
  },
  {
    name: "HP Enterprise",
    category: "Infrastructures IT",
    badge: "Hardware",
    categoryGroup: "infra",
    url: "https://www.hpe.com/",
    logo: "/images/partners/hpe.svg",
  },
];

export const featuredClientReferences = [
  {
    id: "ue-dakar",
    name: "Union Européenne",
    subName: "Délégation au Sénégal • Bureau de Dakar",
    location: "Dakar (Plateau)",
    sector: "Diplomatique & Institutionnel",
    sectorGroup: "institutionnel",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    hoverBorder: "hover:border-blue-400",
    accentColor: "text-blue-600",
    logo: "/images/partners/union-europeenne-logo.svg",
    logoWidth: 220,
    logoHeight: 52,
    href: "/realisations#union-europeenne-dakar",
    scope: "Câblage réseau structuré Cat 6A & baies de brassage 42U",
    missions: [
      "Câblage cuivre blindé Cat 6A/7 et raccordement optique",
      "Fourniture, montage et peignage méthodique de baies 42U",
      "Certification Fluke Networks et conformité ISO/IEC 11801",
    ],
    techTags: ["Câblage Cat 6A", "Baies 42U", "Peignage", "Certification Fluke"],
  },
  {
    id: "seter-ter",
    name: "SETER (TER de Dakar)",
    subName: "Société d'Exploitation du Train Express Régional",
    location: "Dakar, Sénégal",
    sector: "Transport Ferroviaire & Télécoms",
    sectorGroup: "transport",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    hoverBorder: "hover:border-amber-400",
    accentColor: "text-amber-600",
    logo: "/images/partners/seter-ter-dakar.png",
    logoWidth: 160,
    logoHeight: 52,
    href: "/realisations#seter-ter-dakar",
    scope: "Formation spécialisée des techniciens au système de radiocommunication GSM-R",
    missions: [
      "Formation technique approfondie des techniciens et agents de maintenance au réseau GSM-R",
      "Maîtrise des télécommunications ferroviaires sol-train et architecture du réseau radio",
      "Protocoles de maintenance, diagnostic des anomalies et continuité des communications critiques",
      "Sécurisation des échanges voix et données conformément aux standards ferroviaires du TER de Dakar",
    ],
    techTags: ["Formation GSM-R", "Télécoms Ferroviaires", "Radio Sol-Train", "Maintenance TER"],
  },
  {
    id: "parc-exotique",
    name: "Hôtel du Parc Exotique",
    subName: "Établissement Hôtelier & Réserve Naturelle",
    location: "Somone, Petite-Côte",
    sector: "Hôtellerie & Tourisme",
    sectorGroup: "sante-tourisme",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    hoverBorder: "hover:border-cyan-400",
    accentColor: "text-cyan-600",
    logo: "/images/parc-exotique-logo.png",
    logoWidth: 150,
    logoHeight: 55,
    href: "/realisations#parc-exotique",
    scope: "Plateforme web officielle, réseaux sociaux (Instagram & Facebook) & ERP",
    missions: [
      "Conception et mise en production de la vitrine numérique complète (parcexotique.sn)",
      "Système de réservation en ligne pour les chambres et le restaurant La Plume",
      "Gestion et animation active des réseaux sociaux officiels (Instagram & Facebook)",
      "Installation et intégration de l'ERP de gestion d'établissement",
    ],
    techTags: ["Plateforme Web", "Gestion Instagram & Facebook", "ERP Gestion", "Réservation Directe"],
  },
  {
    id: "polyclinique-p2a",
    name: "Polyclinique P2A",
    subName: "Amitié & Alliance • Établissement de Santé",
    location: "Dakar (Keur Massar / Yoff)",
    sector: "Santé & Milieu Médical",
    sectorGroup: "sante-tourisme",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    hoverBorder: "hover:border-emerald-400",
    accentColor: "text-emerald-600",
    logo: "/images/partners/polyclinique-p2a.svg",
    logoWidth: 180,
    logoHeight: 45,
    href: "/realisations#polyclinique-p2a",
    scope: "Infrastructure physique, virtualisation serveurs, VoIP & Firewall",
    missions: [
      "Installation complète de l’infrastructure réseau physique et baies",
      "Virtualisation des serveurs de la polyclinique sous VMware",
      "Téléphonie d'entreprise VoIP avec standard IP Yeastar",
      "Sécurisation périmétrique et pare-feu Fortinet FortiGate (NGFW)",
    ],
    techTags: ["Réseau Physique", "Virtualisation VMware", "VoIP Yeastar", "Fortinet FortiGate"],
  },
  {
    id: "dolima",
    name: "Dolima",
    subName: "La Laiterie du Berger • Marque Nationale",
    location: "Sénégal (Dakar & Richard-Toll)",
    sector: "Agro-Industrie & Production",
    sectorGroup: "industrie-formation",
    badgeColor: "bg-green-50 text-green-700 border-green-200",
    hoverBorder: "hover:border-green-400",
    accentColor: "text-green-600",
    logo: "/images/partners/dolima.png",
    logoWidth: 48,
    logoHeight: 48,
    href: "/realisations#dolima-senegal",
    scope: "Ingénierie & déploiement de l’infrastructure réseau d'entreprise",
    missions: [
      "Ingénierie et déploiement de l'infrastructure réseau d'entreprise",
      "Fiabilisation de la connectivité et continuité de service",
      "Interconnexion des équipements et sécurisation des flux locaux",
    ],
    techTags: ["Infrastructure Réseau", "Connectivité", "LAN Industriel", "Haute Disponibilité"],
  },
  {
    id: "simplon",
    name: "Simplon Sénégal",
    subName: "Centre de Formation & Certifications Tech",
    location: "Dakar, Sénégal",
    sector: "Formation & Éducation Tech",
    sectorGroup: "industrie-formation",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    hoverBorder: "hover:border-rose-400",
    accentColor: "text-rose-600",
    logo: "/images/partners/simplon.svg",
    logoWidth: 140,
    logoHeight: 32,
    href: "/formations",
    scope: "Formation professionnelle et ateliers pratiques pour les apprenants",
    missions: [
      "Formation technique des apprenants aux infrastructures réseaux",
      "Ateliers pratiques sur les architectures d'entreprise et cybersécurité",
      "Accompagnement et préparation aux certifications professionnelles",
    ],
    techTags: ["Formation Apprenants", "Infrastructures IT", "Cybersécurité", "Certifications"],
  },
];

const BRAND_CATEGORIES = [
  { id: "all", label: "Tous les partenaires", count: 12 },
  { id: "cyber", label: "Cybersécurité", count: 4 },
  { id: "infra", label: "Réseaux & Hardware", count: 3 },
  { id: "cloud", label: "Cloud & Virtualisation", count: 3 },
  { id: "telecom", label: "VoIP & Supervision", count: 2 },
] as const;

const CLIENT_SECTORS = [
  { id: "all", label: "Toutes les références", count: 6 },
  { id: "institutionnel", label: "Diplomatique & Institutionnel", count: 1 },
  { id: "transport", label: "Transport Ferroviaire", count: 1 },
  { id: "sante-tourisme", label: "Hôtellerie & Santé", count: 2 },
  { id: "industrie-formation", label: "Industrie & Éducation", count: 2 },
] as const;

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 240,
      damping: 22,
    },
  },
};


export function Clients({ clients = [] }: { clients: any[] }) {
  const dynamicClients = clients.filter((c: any) => c.displayStatus !== false);
  const [selectedClient, setSelectedClient] = useState<(typeof featuredClientReferences)[0] | null>(null);
  const [brandFilter, setBrandFilter] = useState<string>("all");
  const [clientFilter, setClientFilter] = useState<string>("all");
  const { openQuoteModal } = useQuoteModal();

  const filteredBrands = defaultTrustedBrands.filter((b) =>
    brandFilter === "all" ? true : b.categoryGroup === brandFilter
  );

  const filteredClients = featuredClientReferences.filter((c) =>
    clientFilter === "all" ? true : c.sectorGroup === clientFilter
  );

  useEffect(() => {
    if (selectedClient) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedClient(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedClient]);

  return (
    <Section className="py-14 md:py-20 bg-slate-50/80 border-b border-slate-200/80 overflow-hidden relative">
      {/* Halo lumineux ambiant moderne (Silicon Valley style) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-400/10 via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

      <Container>
        {/* Section Header: Constructeurs & Éditeurs Partenaires */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <FadeUp>
            <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
              ÉCOSYSTÈME TECHNOLOGIQUE INTERNATIONAL
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
              Partenaires Technologiques &amp; Constructeurs
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Des partenariats certifiés avec les constructeurs et éditeurs leaders mondiaux pour garantir la fiabilité, la sécurité et la haute disponibilité de vos systèmes d’information.
            </p>
          </FadeUp>
        </div>

        {/* Dynamic Category Filter Pills - Partenaires */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {BRAND_CATEGORIES.map((cat) => {
            const isActive = brandFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setBrandFilter(cat.id)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? "bg-[#020617] text-[#00D4FF] border-[#00D4FF]/40 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200/80 hover:border-cyan-300 hover:text-slate-900"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? "bg-[#00D4FF]/20 text-[#00D4FF]" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 12 Partner Brands with Authentic Logos & Dynamic Motion on Scroll */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 md:gap-4 mb-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredBrands.map((brand) => (
              <motion.div
                key={brand.name}
                layout
                variants={cardItemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                whileHover={{ y: -8, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="h-full"
              >
                <a
                  href={brand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Visiter le site officiel de ${brand.name}`}
                  className="group relative bg-white hover:bg-slate-50/95 rounded-2xl border border-slate-200/90 hover:border-cyan-400 p-3.5 sm:p-4 flex flex-col justify-between items-center text-center transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,212,255,0.25)] h-full min-h-[148px] overflow-hidden"
                >
                  {/* Top animated gradient shine beam */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Top Badge & External Link Icon */}
                  <div className="w-full flex items-center justify-between gap-1 mb-2.5">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60 group-hover:bg-cyan-50 group-hover:text-cyan-700 group-hover:border-cyan-200 transition-colors truncate max-w-[85px]">
                      {brand.badge}
                    </span>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center bg-slate-50 group-hover:bg-cyan-50 border border-transparent group-hover:border-cyan-200 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                    </span>
                  </div>

                  {/* Real Authentic Logo */}
                  <div className="relative h-14 w-full flex items-center justify-center py-1">
                    <Image
                      src={brand.logo}
                      alt={`Logo officiel ${brand.name}`}
                      width={130}
                      height={42}
                      unoptimized
                      className="max-h-9 sm:max-h-10 max-w-[125px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-108"
                    />
                  </div>

                  {/* Brand Name Footer */}
                  <div className="mt-2.5 pt-2 w-full border-t border-slate-100 flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-cyan-600 transition-colors truncate max-w-full">
                      {brand.name}
                    </span>
                  </div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Premier Corporate Section: Ils nous font confiance */}
        <div className="pt-12 border-t border-slate-200/90 relative">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
            <FadeUp>
              <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                RÉFÉRENCES CLIENTS &amp; DÉPLOIEMENTS MAJEURS
              </p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
                Ils Nous Font Confiance
              </h3>
              <p className="text-sm sm:text-base text-slate-600">
                Institutions diplomatiques, fleurons industriels, complexes hôteliers et établissements médicaux : cliquez sur un logo pour consulter le détail des architectures et réalisations techniques déployées par NOB TECHNOLOGIES.
              </p>
            </FadeUp>
          </div>

          {/* Dynamic Sector Filter Pills - Références Clients */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {CLIENT_SECTORS.map((sec) => {
              const isActive = clientFilter === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setClientFilter(sec.id)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 border ${
                    isActive
                      ? "bg-[#020617] text-[#00D4FF] border-[#00D4FF]/40 shadow-sm"
                      : "bg-white text-slate-600 border-slate-200/80 hover:border-cyan-300 hover:text-slate-900"
                  }`}
                >
                  <span>{sec.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? "bg-[#00D4FF]/20 text-[#00D4FF]" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {sec.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 6 Flagship Client Cards - Dynamic Motion Grid on Scroll */}
          <motion.div
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-4 xl:gap-4 mb-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredClients.map((client) => (
                <motion.div
                  key={client.id}
                  layout
                  variants={cardItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                  whileHover={{ y: -10, scale: 1.025 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-full"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedClient(client)}
                    className={`w-full text-left group bg-white hover:bg-slate-50/95 rounded-2xl border border-slate-200/90 ${client.hoverBorder} hover:border-cyan-400 p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_24px_50px_-15px_rgba(0,212,255,0.32)] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 min-h-[260px] h-full relative overflow-hidden`}
                  >
                    {/* Top animated gradient beam */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Top sector & quick view indicator */}
                    <div className="w-full flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border truncate max-w-[135px] ${client.badgeColor}`}>
                        {client.sector}
                      </span>
                      <span className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#00D4FF] text-slate-400 group-hover:text-[#020617] border border-slate-200/70 group-hover:border-[#00D4FF] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 shadow-xs">
                        <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Logo Center Frame */}
                    <div className="relative h-20 sm:h-24 w-full px-3 py-2 rounded-xl bg-slate-50/80 group-hover:bg-white border border-slate-100 group-hover:border-cyan-100 flex items-center justify-center transition-all duration-300">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        width={client.logoWidth}
                        height={client.logoHeight}
                        unoptimized
                        className="max-h-12 max-w-[150px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-108"
                      />
                    </div>

                    {/* Client Name & Location */}
                    <div className="mt-3.5 mb-2">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 transition-colors line-clamp-1">
                        {client.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-slate-400 group-hover:text-cyan-500 transition-colors shrink-0" />
                        <span className="truncate">{client.location}</span>
                      </p>
                    </div>

                    {/* Scope Preview (Smooth subtle hover cue) */}
                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-cyan-600 transition-colors">
                      <span className="text-[11px] font-mono">Détails de la mission</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Modal Popup with Full Mission Details */}
          <AnimatePresence>
            {selectedClient && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedClient(null)}
                  className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
                />

                {/* Modal Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 my-auto"
                >
                  {/* Modal Top Header with Corporate Accent */}
                  <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-7 text-white relative">
                    <div className="flex items-start justify-between gap-4">
                      {/* Logo in White Frame */}
                      <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-lg border border-white/20 shrink-0 max-w-[200px]">
                        <Image
                          src={selectedClient.logo}
                          alt={selectedClient.name}
                          width={selectedClient.logoWidth}
                          height={selectedClient.logoHeight}
                          unoptimized
                          className="max-h-12 sm:max-h-14 w-auto object-contain"
                        />
                      </div>

                      {/* Close Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedClient(null)}
                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors shrink-0"
                        title="Fermer la fenêtre (Échap)"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-4">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border bg-white/10 text-cyan-300 border-cyan-400/30">
                          {selectedClient.sector}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-300 font-medium">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          {selectedClient.location}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                        {selectedClient.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                        {selectedClient.subName}
                      </p>
                    </div>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6 sm:p-7 space-y-5 max-h-[60vh] overflow-y-auto">
                    {/* Mission Scope Highlight Box */}
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-2">
                        Périmètre Technique Déployé
                      </div>
                      <div className="p-3.5 sm:p-4 rounded-xl bg-cyan-50/70 border border-cyan-200/80 text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                        {selectedClient.scope}
                      </div>
                    </div>

                    {/* Missions & Deliverables List */}
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-3">
                        Livrables &amp; Réalisations Clés
                      </div>
                      <ul className="space-y-2.5">
                        {selectedClient.missions.map((mission: string, mIdx: number) => (
                          <li
                            key={mIdx}
                            className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{mission}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies & Expertise Tags */}
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-2">
                        Technologies &amp; Domaines d&apos;Intervention
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedClient.techTags.map((tag: string) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer Actions */}
                  <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <Link
                      href={selectedClient.href}
                      onClick={() => setSelectedClient(null)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-800 hover:text-slate-900 font-semibold text-xs transition-all shadow-2xs"
                    >
                      <span>Voir la fiche réalisation complète</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    </Link>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          const clientName = selectedClient.name;
                          setSelectedClient(null);
                          openQuoteModal(clientName);
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[#020617] font-bold text-xs bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] hover:brightness-105 active:scale-95 transition-all shadow-[0_4px_14px_0_rgba(0,212,255,0.35)] hover:shadow-[0_6px_20px_rgba(16,231,96,0.35)] cursor-pointer"
                      >
                        Demander un projet similaire
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedClient(null)}
                        className="hidden sm:inline-flex px-3.5 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 font-semibold text-xs transition-colors"
                      >
                        Fermer
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Dynamic CMS References if any additional clients are published */}
          {dynamicClients.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200/80">
              <div className="text-center mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Autres Déploiements &amp; Partenaires
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 md:gap-4">
                {dynamicClients.map((client: any, idx: number) => {
                  const logoUrl = client.logo?.url || "";
                  return (
                    <FadeUp key={client.id || idx} delay={0.03 * (idx % 6)}>
                      <div className="group h-20 bg-white rounded-xl border border-slate-200 hover:border-cyan-400 p-4 flex items-center justify-center transition-all duration-300 hover:shadow-md">
                        {logoUrl ? (
                          <ClientLogoImg
                            src={logoUrl}
                            alt={client.name || "Client"}
                            className="max-h-12 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                          />
                        ) : (
                          <span className="text-xs font-bold text-slate-700 group-hover:text-cyan-600 text-center">
                            {client.name}
                          </span>
                        )}
                      </div>
                    </FadeUp>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
