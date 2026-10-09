import React from "react";
import { Container, Section } from "@/components/ui/layout";
import { FadeUp } from "@/components/animations";
import { ClientLogoImg } from "./ClientLogoImg";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Building2,
  ShieldCheck,
  Server,
  Activity,
  GraduationCap,
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
    subName: "Pôle Formation Numérique & Certifications IT",
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

  return (
    <Section className="py-14 md:py-20 bg-slate-50/80 border-b border-slate-200/80 overflow-hidden">
      <Container>
        {/* Section Header: Constructeurs & Éditeurs Partenaires */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
              Écosystème Technologique International
            </div>
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-3">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                Références Clients &amp; Déploiements Majeurs
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
                Ils Nous Font Confiance
              </h3>
              <p className="text-sm sm:text-base text-slate-600">
                De l&apos;institution diplomatique aux fleurons industriels et structures de santé, découvrez les organisations qui confient leurs infrastructures critiques, plateformes web et systèmes de gestion à NOB TECHNOLOGIES.
              </p>
            </FadeUp>
          </div>

          {/* Row 1: 2 Flagship Institutional Clients (Union Européenne & Hôtel du Parc Exotique) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 mb-5 lg:mb-6">
            {featuredClientReferences.slice(0, 2).map((client, idx) => (
              <FadeUp key={client.id} delay={0.1 * idx}>
                <Link
                  href={client.href}
                  className={`group bg-white hover:bg-slate-50/70 rounded-2xl border border-slate-200/90 ${client.hoverBorder} p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full relative overflow-hidden`}
                >
                  <div className="w-full">
                    {/* Header: Logo Frame + Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100">
                      <div className="h-14 sm:h-16 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100/80 flex items-center justify-center shrink-0 max-w-[240px]">
                        <Image
                          src={client.logo}
                          alt={client.name}
                          width={client.logoWidth}
                          height={client.logoHeight}
                          unoptimized
                          className="max-h-11 sm:max-h-12 w-auto object-contain"
                        />
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className={`text-[11px] font-semibold font-mono px-2.5 py-0.5 rounded-full border ${client.badgeColor}`}>
                          {client.sector}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {client.location}
                        </span>
                      </div>
                    </div>

                    {/* Titles */}
                    <div className="mb-3">
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {client.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {client.subName}
                      </p>
                    </div>

                    {/* Core Scope Summary */}
                    <div className="mb-4">
                      <p className="text-xs sm:text-sm font-semibold text-blue-700 bg-blue-50/60 rounded-lg p-2.5 border border-blue-100/60">
                        {client.scope}
                      </p>
                    </div>

                    {/* Key Realized Deliverables */}
                    <ul className="space-y-2 mb-5">
                      {client.missions.map((m, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer: Tech Tags & CTA Link */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                      {client.techTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors shrink-0">
                      <span>Voir la réalisation</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
                    </span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>

          {/* Row 2: 3 Corporate & Tech Clients (Polyclinique P2A, Dolima, Simplon) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {featuredClientReferences.slice(2).map((client, idx) => (
              <FadeUp key={client.id} delay={0.15 + 0.08 * idx}>
                <Link
                  href={client.href}
                  className={`group bg-white hover:bg-slate-50/70 rounded-2xl border border-slate-200/90 ${client.hoverBorder} p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full relative overflow-hidden`}
                >
                  <div className="w-full">
                    {/* Header: Logo Frame + Badges */}
                    <div className="flex items-center justify-between gap-2.5 pb-4 mb-4 border-b border-slate-100">
                      <div className="h-12 sm:h-14 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100/80 flex items-center justify-center shrink-0 max-w-[180px]">
                        <Image
                          src={client.logo}
                          alt={client.name}
                          width={client.logoWidth}
                          height={client.logoHeight}
                          unoptimized
                          className="max-h-9 sm:max-h-10 w-auto object-contain"
                        />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-[10px] font-semibold font-mono px-2 py-0.5 rounded-full border ${client.badgeColor}`}>
                          {client.sector}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                          <MapPin className="w-2.5 h-2.5 text-slate-400" />
                          {client.location}
                        </span>
                      </div>
                    </div>

                    {/* Titles */}
                    <div className="mb-2.5">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                        {client.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium truncate">
                        {client.subName}
                      </p>
                    </div>

                    {/* Core Scope Summary */}
                    <div className="mb-3.5">
                      <p className="text-xs font-semibold text-slate-800 bg-slate-100/70 rounded-lg p-2 border border-slate-200/60 leading-snug">
                        {client.scope}
                      </p>
                    </div>

                    {/* Key Realized Deliverables */}
                    <ul className="space-y-1.5 mb-4">
                      {client.missions.map((m, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-1.5 text-xs text-slate-600 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer: Tech Tags & CTA Link */}
                  <div className="pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 mt-auto">
                    <div className="flex flex-wrap gap-1">
                      {client.techTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:text-cyan-700 transition-colors shrink-0">
                      <span>Détails</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-cyan-700 group-hover:translate-x-0.5 transition-all" />
                    </span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>

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
