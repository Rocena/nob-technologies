"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Menu, X, ArrowRight, Phone, Mail, Layers, Globe, Star, Info, ChevronDown, Camera,
  ShieldCheck, Network, Cpu, Code2, PhoneCall, Server, GraduationCap, Award, ShieldAlert, Sparkles,
  Building2, Newspaper, HelpCircle, Users, Smartphone, MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedLogo } from "./AnimatedLogo";
import { useQuoteModal } from "./EngineerModalContext";
import { SearchButton } from "./SearchButton";
import { GlowButton } from "./GlowButton";

interface SubItem {
  name: string;
  href: string;
  desc?: string;
  tag?: string;
}

interface NavItem {
  id?: string;
  name: string;
  href: string;
  desc: string;
  order?: number;
  children?: SubItem[];
}

interface SpotlightInfo {
  badge: string;
  title: string;
  desc: string;
  linkText: string;
  href: string;
  tag: string;
}

const SPOTLIGHTS: Record<string, SpotlightInfo> = {
  solutions: {
    badge: "RÉFÉRENCE MAJEURE",
    title: "Délégation de l'Union Européenne",
    desc: "Câblage structuré cat 6A/7, baie 42U et sécurisation du LAN à Dakar.",
    linkText: "Voir l'étude de cas",
    href: "/realisations",
    tag: "Dakar • En production",
  },
  formations: {
    badge: "PROGRAMMES 2025",
    title: "Fortinet NSE 4 & Cisco CCNA",
    desc: "Sessions intensives sur bancs physiques et préparation aux examens internationaux.",
    linkText: "Découvrir les cursus",
    href: "/formations",
    tag: "Certifications Officielles",
  },
  partenaires: {
    badge: "ALLIANCES STRATÉGIQUES",
    title: "Constructeurs Mondiaux",
    desc: "Partenariats certifiés Sophos, Fortinet, Cisco, Dell Technologies & Microsoft 365.",
    linkText: "Consulter l'écosystème",
    href: "/partenaires",
    tag: "Support & Matériel Garanti",
  },
  realisations: {
    badge: "PROJETS EN PRODUCTION",
    title: "Infrastructures Clés en Main",
    desc: "Union Européenne, SETER (TER Dakar), Polyclinique P2A, Parc Exotique, Simplon & Dolima.",
    linkText: "Explorer la galerie",
    href: "/galerie",
    tag: "100% Photos Réelles",
  },
  'a-propos': {
    badge: "INGÉNIERIE SÉNÉGAL",
    title: "Cabinet Nob Technologies",
    desc: "Équipe d'ingénieurs réseaux, télécoms et cybersécurité sur la Route de l'Aéroport.",
    linkText: "Notre vision & équipe",
    href: "/a-propos",
    tag: "Intervention sous 24h",
  },
};

const DEFAULT_NAV: NavItem[] = [
  { 
    id: 'solutions',
    name: 'Services', 
    href: '/services', 
    desc: 'Infrastructures haute disponibilité, Cloud, ERP, cybersécurité & infogérance',
    order: 1,
    children: [
      { name: 'Cybersécurité & Firewalls', href: '/services/cybersecurite', desc: 'Protection périmétrique Sophos & Fortinet, audits et SOC managé', tag: 'Sophos • Fortinet' },
      { name: 'Réseaux & Câblage', href: '/services/reseaux-telecoms', desc: 'Câblage structuré cat 6A/7, fibre optique, Cisco & HPE Aruba', tag: 'Cat 6A • Fibre • Cisco' },
      { name: 'ERP & Digitalisation', href: '/services/erp-digitalisation', desc: 'Intégration Dolibarr & Odoo, automatisation et workflows métiers', tag: 'Dolibarr • Odoo' },
      { name: 'Développement Web & Mobile', href: '/services/developpement-web-mobile', desc: 'Portails d’entreprise, applications sur-mesure & plateformes SaaS', tag: 'SaaS • Web & Mobile' },
      { name: 'Téléphonie IP & VoIP', href: '/services/telephone-ip', desc: 'Autocommutateurs IPBX Yeastar, communications unifiées & SIP', tag: 'Yeastar • IPBX & SIP' },
      { name: 'Matériel & Licences IT', href: '/services/materiel-licences', desc: 'Serveurs Dell EMC, baies de serveurs et licences Microsoft 365', tag: 'Dell EMC • Microsoft 365' },
    ]
  },
  { 
    id: 'formations',
    name: 'Formations', 
    href: '/formations', 
    desc: 'Cursus d’immersion sur 6 mois et préparation aux certifications d’élite',
    order: 2,
    children: [
      { name: 'Catalogue Formations (6 Mois)', href: '/formations', desc: 'Cursus d’excellence et ateliers pratiques à Dakar (max 6h/sem)', tag: 'Immersion • 6 Mois' },
      { name: 'Préparation Certifications IT', href: '/formations/preparation-certifications-it', desc: 'Préparation officielle Cisco CCNA, Fortinet NSE, Sophos & CompTIA', tag: 'CCNA • NSE 4 • Sophos' },
      { name: 'Cybersécurité & Audit SOC', href: '/formations/cybersecurite-audit-soc', desc: 'Gouvernance ISO 27001, surveillance SOC et techniques de pentest', tag: 'ISO 27001 • Pentest' },
      { name: 'Automatisation & IA', href: '/formations/automatisation-ia', desc: 'Workflows Make, scripting Python, agents IA et productivité', tag: 'Make • Python • IA' },
    ]
  },
  { 
    id: 'partenaires',
    name: 'Partenaires', 
    href: '/partenaires', 
    desc: 'Alliances technologiques stratégiques avec les constructeurs mondiaux',
    order: 3,
    children: [
      { name: 'Partenaires Constructeurs', href: '/partenaires', desc: 'Alliances avec Sophos, Fortinet, Cisco, Dell, Microsoft 365, Acronis', tag: 'Constructeurs Mondiaux' },
      { name: 'Secteurs d’Activité', href: '/secteurs', desc: 'Solutions spécialisées pour PME, Banques, Écoles, Hôpitaux & Commerces', tag: 'PME • Banques • Santé' },
    ]
  },
  { 
    id: 'realisations',
    name: 'Réalisations', 
    href: '/realisations', 
    desc: 'Déploiements d’infrastructures critiques et plateformes web en production',
    order: 4,
    children: [
      { name: 'Projets & Déploiements', href: '/realisations', desc: 'Études de cas concrètes : Union Européenne, SETER, P2A, Parc Exotique', tag: 'Projets & Déploiements' },
      { name: 'Galerie d’Installations', href: '/galerie', desc: 'Photos réelles de baies de brassage, salles serveurs et câblage', tag: '100% Photos Terrain' },
    ]
  },
  { 
    id: 'a-propos',
    name: 'Entreprise', 
    href: '/a-propos', 
    desc: 'Présentation de Nob Technologies, notre équipe d’ingénieurs et actualités',
    order: 5,
    children: [
      { name: 'À Propos de Nobtech', href: '/a-propos', desc: 'Notre histoire, nos valeurs et nos standards d’excellence à Dakar', tag: 'Cabinet Dakar' },
      { name: 'Actualités & Blog', href: '/actualites', desc: 'Veille technologique, cyberdéfense, bonnes pratiques et annonces', tag: 'Veille & Sécurité' },
      { name: 'Foire Aux Questions (FAQ)', href: '/faq', desc: 'Réponses à vos questions sur les délais, contrats et garanties SLA', tag: 'SLA & Garanties' },
      { name: 'Carrières & Recrutement', href: '/carrieres', desc: 'Rejoindre notre équipe d’ingénieurs réseaux et consultants IT', tag: 'Rejoindre l’Équipe' },
    ]
  },
  { 
    id: 'contact',
    name: 'Contact', 
    href: '/contact', 
    desc: 'Échangez directement avec un ingénieur et obtenez un devis sous 24h',
    order: 6,
  },
];

const getNavIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('solution') || n.includes('service')) return Layers;
  if (n.includes('format')) return GraduationCap;
  if (n.includes('partenaire')) return Building2;
  if (n.includes('réalisation') || n.includes('realisation')) return Star;
  if (n.includes('propos') || n.includes('entreprise')) return Info;
  if (n.includes('contact')) return Phone;
  return ArrowRight;
};

const getHeaderCategoryLabel = (idOrName: string) => {
  const s = idOrName.toLowerCase();
  if (s.includes('solution') || s.includes('service')) return "Solutions & Infrastructures d'Entreprise";
  if (s.includes('format')) return "Programmes de Formation & Certifications";
  if (s.includes('partenaire')) return "Alliances Stratégiques & Constructeurs";
  if (s.includes('réalis') || s.includes('realis')) return "Déploiements & Références en Production";
  if (s.includes('propos') || s.includes('entreprise')) return "Cabinet d'Ingénierie & Organisation";
  return idOrName;
};

const getSubItemIcon = (name: string, href: string = "") => {
  const n = (name + " " + href).toLowerCase();
  if (n.includes('cyber') || n.includes('firewall')) return ShieldCheck;
  if (n.includes('réseau') || n.includes('reseau') || n.includes('câblage') || n.includes('telecom')) return Network;
  if (n.includes('erp') || n.includes('digitalis')) return Cpu;
  if (n.includes('web') || n.includes('mobile') || n.includes('dev')) return Code2;
  if (n.includes('téléphon') || n.includes('telephon') || n.includes('voip')) return PhoneCall;
  if (n.includes('matériel') || n.includes('materiel') || n.includes('serveur') || n.includes('licence')) return Server;
  if (n.includes('certif')) return Award;
  if (n.includes('soc') || n.includes('audit')) return ShieldAlert;
  if (n.includes('ia') || n.includes('auto')) return Sparkles;
  if (n.includes('format')) return GraduationCap;
  if (n.includes('constructeur') || n.includes('partenaire')) return Building2;
  if (n.includes('secteur')) return Globe;
  if (n.includes('galerie')) return Camera;
  if (n.includes('projet') || n.includes('déploiement') || n.includes('realis')) return Layers;
  if (n.includes('actualit') || n.includes('blog')) return Newspaper;
  if (n.includes('faq') || n.includes('question')) return HelpCircle;
  if (n.includes('carrière') || n.includes('carriere') || n.includes('recrut')) return Users;
  if (n.includes('propos')) return Info;
  return ArrowRight;
};

const getDropdownWidth = (item: NavItem) => {
  if (item.id === 'solutions') return "w-[800px] xl:w-[860px]";
  if (item.id === 'formations' || item.id === 'a-propos') return "w-[760px] xl:w-[820px]";
  if (item.id === 'partenaires' || item.id === 'realisations') return "w-[720px] xl:w-[760px]";
  if (item.id === 'contact') return "w-[380px]";
  return item.children && item.children.length > 2 ? "w-[760px]" : "w-[540px]";
};

const getDropdownAlign = (index: number, total: number) => {
  if (index === 0) return "left-0";
  if (index === 1) return "left-[-80px]";
  if (index === 2) return "left-1/2 -translate-x-1/2";
  if (index >= total - 2) return "right-0";
  return "left-1/2 -translate-x-1/2";
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [navItems, setNavItems] = useState<NavItem[]>(DEFAULT_NAV);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { openQuoteModal } = useQuoteModal();

  const handleMenuEnter = (id: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveHover(id);
  };

  const handleMenuLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveHover(null);
    }, 140);
  };

  // Fetch dynamic pages marked to be included in navigation from CMS
  useEffect(() => {
    fetch('/api/navigation-pages')
      .then((res) => res.json())
      .then((data) => {
        if (data?.pages && Array.isArray(data.pages) && data.pages.length > 0) {
          const updatedNav = JSON.parse(JSON.stringify(DEFAULT_NAV));

          data.pages.forEach((p: any) => {
            const existingIndex = updatedNav.findIndex((i: NavItem) => i.href === p.href);
            if (existingIndex === -1) {
              updatedNav.push({
                name: p.name,
                href: p.href,
                desc: p.desc,
                order: p.order ?? 20,
              });
            }
          });

          // Sort by order
          updatedNav.sort((a: NavItem, b: NavItem) => (a.order ?? 10) - (b.order ?? 10));
          setNavItems(updatedNav);
        }
      })
      .catch(() => { /* keep default */ });
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setActiveHover(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setOpenMobileSubmenu(null);
    setActiveHover(null);
  };

  return (
    <>
      {/* Subtle Backdrop Dim Layer - Silicon Valley / Tesla pattern */}
      <div 
        className={cn(
          "fixed inset-0 top-[96px] sm:top-[112px] bg-slate-950/25 backdrop-blur-[2px] pointer-events-none transition-opacity duration-300 z-40 hidden lg:block",
          activeHover ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      />

      {/* Main Header Bar - Corporate Silicon Valley Standard */}
      <header className="fixed top-0 inset-x-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_25px_rgba(15,23,42,0.03)] transition-all duration-300">
        {/* Executive Top Utility Bar - Direct Corporate Contacts */}
        <div className="w-full bg-[#030712] border-b border-slate-800/80 text-slate-300">
          <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-8 sm:h-9 items-center justify-between text-[11px] sm:text-xs">
              {/* Left: HQ Location Link */}
              <div className="flex items-center text-slate-400 min-w-0 pr-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=QG3J%2BHP+Dakar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors group flex items-center gap-1.5 min-w-0"
                  title="Localisation Google Maps : QG3J+HP Dakar (Route de l'Aéroport)"
                >
                  <MapPin className="w-3 h-3 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="hidden md:inline font-medium text-slate-300 group-hover:text-cyan-300 tracking-tight whitespace-nowrap">
                    Dakar, Sénégal <span className="text-slate-600">•</span> Route de l&apos;Aéroport LSS
                  </span>
                  <span className="hidden sm:inline md:hidden font-medium text-slate-300 group-hover:text-cyan-300 tracking-tight whitespace-nowrap">
                    Dakar <span className="text-slate-600">•</span> Route de l&apos;Aéroport
                  </span>
                  <span className="sm:hidden font-medium text-slate-300 group-hover:text-cyan-300 tracking-tight text-[10.5px] truncate">
                    Dakar <span className="text-slate-600">•</span> Route Aéroport
                  </span>
                </a>
              </div>

              {/* Right: Direct Contacts (Tél Direct, Fixe, Mail) */}
              <div className="flex items-center gap-2.5 sm:gap-4 md:gap-5 shrink-0">
                {/* Tél Direct (+221 77 301 08 38) */}
                <a 
                  href="tel:+221773010838"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors group"
                  title="Ligne directe mobile & WhatsApp"
                >
                  <Smartphone className="w-3 h-3 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-400 hidden md:inline font-normal">Tél :</span>
                  <span className="font-semibold text-slate-200 group-hover:text-emerald-400 whitespace-nowrap text-[10.5px] sm:text-xs">+221 77 301 08 38</span>
                </a>

                {/* Séparateur pour écran tablette/desktop */}
                <span className="text-slate-700 hidden sm:inline select-none" aria-hidden="true">|</span>

                {/* Fixe Dakar (+221 33 814 04 35) - Visible dès sm: pour laisser toute la place à l'adresse sur mobile */}
                <a 
                  href="tel:+221338140435"
                  className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors group"
                  title="Téléphone fixe standard Dakar"
                >
                  <Phone className="w-3 h-3 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-400 hidden md:inline font-normal">Fixe :</span>
                  <span className="font-semibold text-slate-200 group-hover:text-cyan-400 whitespace-nowrap text-[10.5px] sm:text-xs">+221 33 814 04 35</span>
                </a>

                <span className="text-slate-700 hidden lg:inline select-none" aria-hidden="true">|</span>

                {/* Email Direct */}
                <a 
                  href="mailto:contact@nobtech.fr"
                  className="hidden lg:flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors group"
                  title="Courriel officiel Nob Technologies"
                >
                  <Mail className="w-3 h-3 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-slate-200 group-hover:text-cyan-400 whitespace-nowrap">contact@nobtech.fr</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between gap-3 sm:gap-4">
            {/* Brand Logo */}
            <div className="flex items-center shrink-0">
              <AnimatedLogo />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {navItems.map((item, index) => {
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const ParentIcon = getNavIcon(item.name);
                const isHovered = activeHover === (item.id || item.name);
                const spotlight = item.id ? SPOTLIGHTS[item.id] : null;

                return (
                  <div 
                    key={item.name} 
                    className="relative"
                    onMouseEnter={() => handleMenuEnter(item.id || item.name)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <Link 
                      href={item.href} 
                      className={cn(
                        "text-[13.5px] xl:text-[14px] font-semibold transition-colors py-5 px-0.5 flex items-center",
                        isHovered ? "text-cyan-600" : "text-slate-800 hover:text-cyan-600"
                      )}
                    >
                      <span className={cn(
                        "px-2.5 xl:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 xl:gap-1.5 whitespace-nowrap",
                        isHovered ? "bg-slate-100 text-cyan-600" : "hover:bg-slate-100/80"
                      )}>
                        <span>{item.name}</span>
                        {(hasChildren || item.id === 'contact') && (
                          <ChevronDown className={cn(
                            "w-3.5 h-3.5 transition-transform duration-200",
                            isHovered ? "rotate-180 text-cyan-600" : "text-slate-400"
                          )} />
                        )}
                      </span>
                    </Link>

                    {/* Desktop Mega-Menu Panel */}
                    {hasChildren ? (
                      <div className={cn(
                        "absolute top-full pt-2 transition-all duration-200 z-50",
                        isHovered 
                          ? "opacity-100 translate-y-0 pointer-events-auto" 
                          : "opacity-0 translate-y-2 pointer-events-none",
                        getDropdownAlign(index, navItems.length),
                        getDropdownWidth(item)
                      )}>
                        <div className="bg-white/98 backdrop-blur-2xl border border-slate-200/90 shadow-[0_24px_50px_-12px_rgba(15,23,42,0.18),0_0_0_1px_rgba(15,23,42,0.04)] rounded-2xl p-5 sm:p-6 relative overflow-hidden ring-1 ring-slate-900/5">
                          {/* Discrete NOBTECH Shield Watermark in top-right */}
                          <div className="absolute -top-3 -right-3 w-28 h-28 opacity-[0.05] pointer-events-none select-none overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src="/images/nobtech-shield.png" 
                              alt="" 
                              className="w-full h-full object-contain" 
                            />
                          </div>
                          
                          <div className="relative z-10">
                            {/* Dropdown Header Banner (Clean Corporate, Zero "Pôle") */}
                            <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 border border-cyan-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                                  <ParentIcon className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-700">
                                    {getHeaderCategoryLabel(item.id || item.name)}
                                  </div>
                                  <p className="text-xs text-slate-500 line-clamp-1">
                                    {item.desc}
                                  </p>
                                </div>
                              </div>
                              <Link
                                href={item.href}
                                onClick={() => setActiveHover(null)}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-cyan-600 hover:bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/70 transition-colors shrink-0"
                              >
                                <span>Voir tout</span>
                                <ArrowRight className="w-3.5 h-3.5 text-cyan-600" />
                              </Link>
                            </div>

                            {/* Bento Box Grid: Modular Cells (Left) + Silicon Valley Spotlight Card (Right) */}
                            <div className="grid grid-cols-12 gap-3.5 items-stretch">
                              {/* Left: Interactive Bento Cells */}
                              <div className={cn(
                                spotlight ? "col-span-8" : "col-span-12",
                                item.children!.length === 2 
                                  ? "grid grid-cols-1 sm:grid-cols-2 gap-3" 
                                  : "grid grid-cols-2 gap-2.5"
                              )}>
                                {item.children!.map((child) => {
                                  const ChildIcon = getSubItemIcon(child.name, child.href);

                                  return (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={() => setActiveHover(null)}
                                      className="group/bento relative rounded-xl p-3 sm:p-3.5 bg-slate-50/70 hover:bg-white border border-slate-200/70 hover:border-cyan-300 hover:shadow-[0_8px_20px_-6px_rgba(0,212,255,0.16),0_2px_6px_-1px_rgba(15,23,42,0.04)] transition-all duration-200 flex flex-col justify-between overflow-hidden"
                                    >
                                      {/* Micro top shine edge on hover */}
                                      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                      <div>
                                        {/* Header of Bento Card: Icon + Micro Tag */}
                                        <div className="flex items-center justify-between gap-2">
                                          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center text-slate-700 group-hover/bento:text-cyan-600 group-hover/bento:border-cyan-200 transition-colors shrink-0">
                                            <ChildIcon className="w-4 h-4 stroke-[2]" />
                                          </div>
                                          {child.tag && (
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 group-hover/bento:text-cyan-700 bg-white/90 group-hover/bento:bg-cyan-50/80 border border-slate-200/60 group-hover/bento:border-cyan-200/60 px-2 py-0.5 rounded-md transition-colors truncate max-w-[150px]">
                                              {child.tag}
                                            </span>
                                          )}
                                        </div>

                                        {/* Title & Arrow */}
                                        <div className="flex items-center justify-between gap-1 mt-2.5">
                                          <span className="text-[13px] font-bold text-slate-900 group-hover/bento:text-cyan-600 transition-colors leading-snug">
                                            {child.name}
                                          </span>
                                          <ArrowRight className="w-3 h-3 text-slate-300 opacity-0 group-hover/bento:opacity-100 group-hover/bento:translate-x-0.5 group-hover/bento:text-cyan-600 transition-all shrink-0" />
                                        </div>

                                        {/* Description */}
                                        {child.desc && (
                                          <p className="text-[11px] text-slate-500 group-hover/bento:text-slate-600 leading-snug mt-1 font-normal line-clamp-2">
                                            {child.desc}
                                          </p>
                                        )}
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>

                              {/* Right: Signature Tesla / Silicon Valley Spotlight Bento Card */}
                              {spotlight && (
                                <div className="col-span-4 rounded-xl bg-gradient-to-br from-[#020617] via-slate-900 to-[#0B1528] text-white p-4 sm:p-4.5 border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden group/spotlight">
                                  {/* Ambient radial glow inside the Bento Spotlight */}
                                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-tr from-cyan-500/20 to-emerald-500/15 rounded-full blur-2xl pointer-events-none group-hover/spotlight:scale-125 transition-transform duration-500" />
                                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 opacity-80" />

                                  <div className="relative z-10">
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="inline-block text-[9.5px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-700/60 px-2 py-0.5 rounded-md shadow-xs">
                                        {spotlight.badge}
                                      </span>
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    </div>

                                    <h5 className="text-[13.5px] font-bold text-white mt-3 leading-snug group-hover/spotlight:text-cyan-200 transition-colors">
                                      {spotlight.title}
                                    </h5>
                                    <p className="text-[11.5px] text-slate-300 leading-relaxed mt-1.5 font-normal">
                                      {spotlight.desc}
                                    </p>
                                  </div>

                                  <div className="relative z-10 pt-3.5 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-slate-400">
                                      {spotlight.tag}
                                    </span>
                                    <Link
                                      href={spotlight.href}
                                      onClick={() => setActiveHover(null)}
                                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-cyan-300 hover:text-cyan-200 transition-colors group-hover/spotlight:translate-x-0.5"
                                    >
                                      <span>{spotlight.linkText}</span>
                                      <ArrowRight className="w-3 h-3 text-cyan-400" />
                                    </Link>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Dropdown Footer Strip */}
                            <div className="mt-4 pt-3 border-t border-slate-100/90 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 px-5 sm:px-6 py-2.5 bg-slate-50/80 rounded-b-2xl flex items-center justify-between text-xs text-slate-600">
                              <span className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  Support Dakar 24/7
                                </span>
                                <span className="text-slate-400">&bull;</span>
                                <span className="text-slate-500">Interventions garanties sous 24h</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveHover(null);
                                  openQuoteModal(item.name);
                                }}
                                className="font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1 hover:underline cursor-pointer"
                              >
                                <span>Demander un devis pour {item.name}</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : item.id === 'contact' ? (
                      <div className={cn(
                        "absolute top-full pt-2 transition-all duration-200 z-50",
                        isHovered 
                          ? "opacity-100 translate-y-0 pointer-events-auto" 
                          : "opacity-0 translate-y-2 pointer-events-none",
                        getDropdownAlign(index, navItems.length),
                        getDropdownWidth(item)
                      )}>
                        <div className="bg-white/98 backdrop-blur-2xl border border-slate-200/90 shadow-[0_24px_50px_-12px_rgba(15,23,42,0.18)] rounded-2xl p-5 relative overflow-hidden ring-1 ring-slate-900/5">
                          <div className="relative z-10 space-y-3">
                            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                              <div>
                                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-700">
                                  Contact Direct &bull; Dakar
                                </div>
                                <h5 className="text-[14px] font-bold text-slate-900 mt-0.5">
                                  Parlons de votre projet IT
                                </h5>
                              </div>
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Support 24/7
                              </span>
                            </div>

                            {/* Bento Contact Cards */}
                            <div className="space-y-2 pt-0.5">
                              <a
                                href="tel:+221773010838"
                                className="group/bento relative flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 hover:bg-white border border-slate-200/70 hover:border-emerald-300 hover:shadow-md transition-all overflow-hidden"
                              >
                                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity pointer-events-none" />
                                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-2xs shrink-0 group-hover/bento:border-emerald-200">
                                  <Smartphone className="w-4 h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-900 group-hover/bento:text-emerald-600 transition-colors">
                                      +221 77 301 08 38
                                    </span>
                                    <span className="text-[9.5px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                                      Astreinte 24/7
                                    </span>
                                  </div>
                                  <div className="text-[11px] text-slate-500">
                                    Portable direct & WhatsApp
                                  </div>
                                </div>
                              </a>

                              <a
                                href="tel:+221338140435"
                                className="group/bento relative flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 hover:bg-white border border-slate-200/70 hover:border-cyan-300 hover:shadow-md transition-all overflow-hidden"
                              >
                                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity pointer-events-none" />
                                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-cyan-600 shadow-2xs shrink-0 group-hover/bento:border-cyan-200">
                                  <Phone className="w-4 h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-900 group-hover/bento:text-cyan-600 transition-colors">
                                      +221 33 814 04 35
                                    </span>
                                    <span className="text-[9.5px] font-mono text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded border border-cyan-100">
                                      Standard Fixe
                                    </span>
                                  </div>
                                  <div className="text-[11px] text-slate-500">
                                    Bureau Dakar • Route Aéroport
                                  </div>
                                </div>
                              </a>

                              <a
                                href="mailto:contact@nobtech.fr"
                                className="group/bento relative flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 hover:bg-white border border-slate-200/70 hover:border-cyan-300 hover:shadow-md transition-all overflow-hidden"
                              >
                                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity pointer-events-none" />
                                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-cyan-600 shadow-2xs shrink-0 group-hover/bento:border-cyan-200">
                                  <Mail className="w-4 h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-900 group-hover/bento:text-cyan-600 transition-colors">
                                      contact@nobtech.fr
                                    </span>
                                    <span className="text-[9.5px] font-mono text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded border border-cyan-100">
                                      Courriel Pro
                                    </span>
                                  </div>
                                  <div className="text-[11px] text-slate-500">
                                    Devis & cahier des charges
                                  </div>
                                </div>
                              </a>
                            </div>

                            <div className="pt-1">
                              <Link
                                href="/contact"
                                onClick={() => setActiveHover(null)}
                                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                              >
                                <span>Ouvrir la page de contact</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            {/* Desktop Corporate Actions - Silicon Valley Executive Style */}
            <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
              <SearchButton />
              
              <GlowButton
                size="sm"
                onClick={() => openQuoteModal()}
                className="!h-10 sm:!h-10 !px-4 xl:!px-5 text-[13px] font-bold shadow-md hover:shadow-cyan-500/30 rounded-xl"
              >
                Demander un devis
              </GlowButton>
            </div>

            {/* Mobile & Tablet Burger Button */}
            <div className="flex lg:hidden items-center">
              <button 
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 text-white hover:bg-slate-800 active:scale-95 transition-all cursor-pointer shadow-sm"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="mobile-nav-drawer"
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isOpen ? <X className="h-5 w-5 stroke-[2.4]" /> : <Menu className="h-5 w-5 stroke-[2.4]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Navigation Overlay */}
      <div 
        id="mobile-nav-drawer"
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div 
          onClick={closeMenu} 
          onTouchEnd={(e) => {
            e.preventDefault();
            closeMenu();
          }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          aria-hidden="true" 
        />

        <div className={cn(
          "absolute inset-x-0 top-[96px] sm:top-[116px] bottom-0 bg-white shadow-2xl flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-out",
          isOpen ? "translate-y-0" : "-translate-y-4"
        )}>
          {/* Main Navigation Links */}
          <div className="p-5 sm:p-8 max-w-3xl mx-auto w-full space-y-4">
            <div className="pb-2.5 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                NAVIGATION
              </span>
            </div>

            <nav className="flex flex-col gap-2.5">
              {navItems.map((item) => {
                const IconComponent = getNavIcon(item.name);
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isExpanded = openMobileSubmenu === item.name;

                return (
                  <div key={item.name} className="flex flex-col rounded-xl bg-slate-50 border border-slate-200/80 overflow-hidden">
                    <div className="flex items-center justify-between p-3 sm:p-3.5 hover:bg-cyan-50/60 transition-colors">
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="flex items-center gap-3 min-w-0 flex-1"
                      >
                        <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-slate-900 truncate">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">
                            {item.desc}
                          </div>
                        </div>
                      </Link>

                      {hasChildren ? (
                        <button
                          type="button"
                          onClick={() => setOpenMobileSubmenu(isExpanded ? null : item.name)}
                          className="p-2 rounded-lg text-slate-400 hover:text-cyan-600 hover:bg-white transition-colors ml-2"
                          aria-label={`Ouvrir le sous-menu de ${item.name}`}
                        >
                          <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isExpanded && "rotate-180 text-cyan-600")} />
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className="p-2 text-slate-400 hover:text-cyan-600 transition-colors ml-2"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>

                    {/* Submenu Accordion on Mobile */}
                    {hasChildren && isExpanded && (
                      <div className="px-3 pb-3 pt-1 border-t border-slate-200/60 bg-white/70 space-y-1">
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className="block p-2 rounded-lg text-xs font-bold text-cyan-700 bg-cyan-50/50 hover:bg-cyan-100/60 transition-colors"
                        >
                          &rarr; Vue d’ensemble ({item.name})
                        </Link>
                        {item.children!.map((c) => {
                          const SubIcon = getSubItemIcon(c.name, c.href);
                          return (
                            <Link
                              key={c.href}
                              href={c.href}
                              onClick={closeMenu}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100/90 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
                                <SubIcon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs sm:text-sm font-bold text-slate-900">
                                  {c.name}
                                </div>
                                {c.desc && (
                                  <div className="text-[11px] text-slate-500 line-clamp-1 leading-snug">
                                    {c.desc}
                                  </div>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Drawer Footer with Quick Calls & Devis CTA */}
          <div className="p-5 sm:p-8 bg-slate-50/90 border-t border-slate-200 mt-auto shrink-0">
            <div className="max-w-3xl mx-auto w-full space-y-3">
              <GlowButton
                onClick={() => {
                  closeMenu();
                  openQuoteModal();
                }}
                className="w-full !h-12 rounded-xl text-sm sm:text-base font-bold shadow-md hover:shadow-cyan-500/30"
              >
                Demander un devis en ligne
              </GlowButton>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="tel:+221773010838"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-emerald-600 hover:border-emerald-200 transition-colors shadow-2xs"
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="truncate">+221 77 301 08 38</span>
                </a>

                <a
                  href="tel:+221338140435"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-cyan-600 hover:border-cyan-200 transition-colors shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span className="truncate">+221 33 814 04 35</span>
                </a>
              </div>

              <a
                href="mailto:contact@nobtech.fr"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-cyan-600 hover:border-cyan-200 transition-colors shadow-2xs"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span className="truncate font-medium">contact@nobtech.fr</span>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=QG3J%2BHP+Dakar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-[11px] text-slate-400 hover:text-cyan-600 font-mono flex items-center justify-center gap-1.5 transition-colors group"
                title="Localisation Google Maps : QG3J+HP Dakar"
              >
                <MapPin className="w-3 h-3 text-cyan-500 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">Route de l&apos;Aéroport LSS lot N° 79, Dakar Sénégal</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
