"use client";

import React, { useState, useEffect } from "react";
import { Container, Section } from "@/components/ui/layout";
import { FadeUp } from "@/components/animations";
import { ClientLogoImg } from "./ClientLogoImg";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
    url: "https://www.sophos.com/",
    logo: "/images/partners/sophos.svg",
  },
  {
    name: "Fortinet",
    category: "Next-Gen Firewall FortiGate",
    badge: "NGFW",
    url: "https://www.fortinet.com/",
    logo: "/images/partners/fortinet.svg",
  },
  {
    name: "Microsoft 365",
    category: "Licences ESD & CSP",
    badge: "Cloud & Office",
    url: "https://www.microsoft.com/microsoft-365",
    logo: "/images/partners/microsoft.svg",
  },
  {
    name: "Cisco",
    category: "Réseaux & Commutation",
    badge: "Réseaux",
    url: "https://www.cisco.com/",
    logo: "/images/partners/cisco-color.svg",
  },
  {
    name: "Dell Technologies",
    category: "Serveurs & Stockage",
    badge: "Hardware",
    url: "https://www.dell.com/",
    logo: "/images/partners/dell-color.svg",
  },
  {
    name: "VMware",
    category: "Virtualisation d'Entreprise",
    badge: "Virtualisation",
    url: "https://www.vmware.com/",
    logo: "/images/partners/vmware.svg",
  },
  {
    name: "Acronis",
    category: "Sauvegarde & Anti-Ransomware",
    badge: "Backup",
    url: "https://www.acronis.com/",
    logo: "/images/partners/acronis.svg",
  },
  {
    name: "Kaspersky",
    category: "Cyberdéfense Applicative",
    badge: "Sécurité",
    url: "https://www.kaspersky.com/",
    logo: "/images/partners/kaspersky.svg",
  },
  {
    name: "Wallix",
    category: "Gestion des Accès à Privilèges",
    badge: "IAM / PAM",
    url: "https://www.wallix.com/",
    logo: "/images/partners/wallix.svg",
  },
  {
    name: "Yeastar",
    category: "Téléphonie IP d'Entreprise",
    badge: "VoIP",
    url: "https://www.yeastar.com/",
    logo: "/images/partners/yeastar.svg",
  },
  {
    name: "Paessler",
    category: "Supervision Réseau & Monitoring",
    badge: "PRTG",
    url: "https://www.paessler.com/",
    logo: "/images/partners/paessler.svg",
  },
  {
    name: "HP Enterprise",
    category: "Infrastructures IT",
    badge: "Hardware",
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
    id: "parc-exotique",
    name: "Hôtel du Parc Exotique",
    subName: "Établissement Hôtelier & Réserve Naturelle",
    location: "Somone, Petite-Côte",
    sector: "Hôtellerie & Tourisme",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    hoverBorder: "hover:border-cyan-400",
    accentColor: "text-cyan-600",
    logo: "/images/parc-exotique-logo.png",
    logoWidth: 150,
    logoHeight: 55,
    href: "/realisations#parc-exotique",
    scope: "Plateforme web officielle & déploiement ERP de gestion",
    missions: [
      "Conception et mise en production de la vitrine numérique complète",
      "Système de réservation en ligne pour les chambres et restaurant",
      "Installation et intégration de l'ERP de gestion d'établissement",
    ],
    techTags: ["Plateforme Web", "ERP Gestion", "Réservation Directe", "Mobile First"],
  },
  {
    id: "polyclinique-p2a",
    name: "Polyclinique P2A",
    subName: "Amitié & Alliance • Établissement de Santé",
    location: "Dakar (Keur Massar / Yoff)",
    sector: "Santé & Milieu Médical",
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

export function Clients({ clients = [] }: { clients: any[] }) {
  const dynamicClients = clients.filter((c: any) => c.displayStatus !== false);
  const [selectedClient, setSelectedClient] = useState<(typeof featuredClientReferences)[0] | null>(null);
  const { openQuoteModal } = useQuoteModal();

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
    <Section className="py-14 md:py-20 bg-slate-50/80 border-b border-slate-200/80 overflow-hidden">
      <Container>
        {/* Section Header: Constructeurs & Éditeurs Partenaires */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <FadeUp>
            <p className="font-mono text-cyan-600 text-sm md:text-base tracking-[0.25em] uppercase mb-4 font-bold">
              &gt;_ ÉCOSYSTÈME TECHNOLOGIQUE INTERNATIONAL
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
              Partenaires Technologiques &amp; Constructeurs
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Des partenariats certifiés avec les constructeurs et éditeurs leaders mondiaux pour garantir la fiabilité, la sécurité et la haute disponibilité de vos systèmes d’information.
            </p>
          </FadeUp>
        </div>

        {/* 12 Partner Brands with Authentic Logos & Outbound Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 md:gap-4 mb-16">
          {defaultTrustedBrands.map((brand, idx) => (
            <FadeUp key={brand.name} delay={0.03 * idx}>
              <a
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visiter le site officiel de ${brand.name}`}
                className="group relative bg-white hover:bg-slate-50/90 rounded-2xl border border-slate-200/90 hover:border-cyan-500/80 p-3.5 sm:p-4 flex flex-col justify-between items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full min-h-[140px]"
              >
                {/* Top Badge & External Link Icon */}
                <div className="w-full flex items-center justify-between gap-1 mb-2.5">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60 group-hover:bg-cyan-50 group-hover:text-cyan-700 group-hover:border-cyan-200 transition-colors truncate max-w-[85px]">
                    {brand.badge}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 transition-colors opacity-70 group-hover:opacity-100 shrink-0" />
                </div>

                {/* Real Authentic Logo */}
                <div className="relative h-14 w-full flex items-center justify-center py-1">
                  <Image
                    src={brand.logo}
                    alt={`Logo officiel ${brand.name}`}
                    width={130}
                    height={42}
                    unoptimized
                    className="max-h-9 sm:max-h-10 max-w-[125px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Brand Name Footer */}
                <div className="mt-2.5 pt-2 w-full border-t border-slate-100 flex flex-col items-center">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-cyan-600 transition-colors truncate max-w-full">
                    {brand.name}
                  </span>
                </div>
              </a>
            </FadeUp>
          ))}
        </div>

        {/* Premier Corporate Section: Ils nous font confiance */}
        <div className="pt-10 border-t border-slate-200/90">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
            <FadeUp>
              <p className="font-mono text-cyan-600 text-sm md:text-base tracking-[0.25em] uppercase mb-4 font-bold">
                &gt;_ RÉFÉRENCES CLIENTS &amp; DÉPLOIEMENTS MAJEURS
              </p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
                Ils Nous Font Confiance
              </h3>
              <p className="text-sm sm:text-base text-slate-600">
                Institutions diplomatiques, fleurons industriels, complexes hôteliers et établissements médicaux : cliquez sur un logo pour consulter le détail des architectures et réalisations techniques déployées par NOB TECHNOLOGIES.
              </p>
            </FadeUp>
          </div>

          {/* 5 Flagship Client Cards - Ultra Corporate Logo Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mb-8">
            {featuredClientReferences.map((client, idx) => (
              <FadeUp key={client.id} delay={0.06 * idx}>
                <button
                  type="button"
                  onClick={() => setSelectedClient(client)}
                  className={`w-full text-left group bg-white hover:bg-slate-50/90 rounded-2xl border border-slate-200/90 ${client.hoverBorder} p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 min-h-[250px] relative overflow-hidden`}
                >
                  {/* Top sector & quick view indicator */}
                  <div className="w-full flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border truncate max-w-[130px] ${client.badgeColor}`}>
                      {client.sector}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-cyan-50 text-slate-400 group-hover:text-cyan-600 border border-slate-200/70 group-hover:border-cyan-200 flex items-center justify-center shrink-0 transition-colors">
                      <Eye className="w-3 h-3" />
                    </span>
                  </div>

                  {/* Logo Center Frame */}
                  <div className="relative h-20 sm:h-24 w-full px-3 py-2 rounded-xl bg-slate-50/80 group-hover:bg-white border border-slate-100 flex items-center justify-center transition-colors">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={client.logoWidth}
                      height={client.logoHeight}
                      unoptimized
                      className="max-h-12 max-w-[150px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Client Name & Location */}
                  <div className="mt-3.5 mb-2">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 transition-colors line-clamp-1">
                      {client.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                      <span className="truncate">{client.location}</span>
                    </p>
                  </div>

                  {/* Scope Preview (Smooth subtle hover cue) */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-cyan-600 transition-colors">
                    <span className="text-[11px] font-mono">Détails de la mission</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </FadeUp>
            ))}
          </div>

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
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-sm hover:shadow-cyan-500/20 transition-all active:scale-95"
                    >
                      <span>Voir la fiche réalisation complète</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          const clientName = selectedClient.name;
                          setSelectedClient(null);
                          openQuoteModal(clientName);
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
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
