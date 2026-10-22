"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, ArrowRight, Phone, Mail, Layers, Globe, Star, Info, ChevronDown, Camera,
  ShieldCheck, Network, Cpu, Code2, PhoneCall, Server, GraduationCap, Award, ShieldAlert, Sparkles,
  Building2, Newspaper, HelpCircle, Users, Smartphone, MapPin, Activity, Lock, CalendarCheck, MessageSquare
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
  highlights: string[];
}

const SPOTLIGHTS: Record<string, SpotlightInfo> = {
  solutions: {
    badge: "INTERVENTION SUR SITE",
    title: "Diagnostic Réseau & Sécurité",
    desc: "Inspection complète de vos baies, pare-feux et conformité réglementaire CDP sous 24h à 48h.",
    linkText: "Planifier un audit sur site",
    href: "/reserver-audit",
    tag: "Dakar & Régions",
    highlights: ["Rapport d'audit détaillé", "Tests de charge & failover", "Plan de remédiation chiffré"],
  },
  formations: {
    badge: "CURSUS CERTIFIANTS",
    title: "Fortinet NSE 4, Cisco CCNA & Power BI",
    desc: "Sessions pratiques sur équipements physiques à Dakar et préparation intensive aux examens.",
    linkText: "Explorer le catalogue",
    href: "/formations",
    tag: "Certifications Internationales",
    highlights: ["Labs sur matériel réel", "Rythme soir ou week-end", "Coaching jusqu'à l'examen"],
  },
  partenaires: {
    badge: "ALLIANCES CONSTRUCTEURS",
    title: "Écosystème Technologique Certifié",
    desc: "Déploiement officiel Sophos, Fortinet, Cisco, Dell Technologies, Yeastar & Microsoft 365.",
    linkText: "Voir nos accréditations",
    href: "/partenaires",
    tag: "Garantie Constructeur",
    highlights: ["Licences CSP/ESD officielles", "Matériel garanti d'origine", "Support escalade niveau 3"],
  },
  realisations: {
    badge: "RÉFÉRENCES EN PRODUCTION",
    title: "Études de Cas & Architectures",
    desc: "Découvrez nos déploiements pour l'Union Européenne, la SETER (TER), P2A et le Parc Exotique.",
    linkText: "Consulter les études de cas",
    href: "/etudes-de-cas",
    tag: "Projets Livrés à 100%",
    highlights: ["Indicateurs de disponibilité", "Photos réelles des baies", "Témoignages DSI & Directions"],
  },
  'a-propos': {
    badge: "CABINET D'INGÉNIERIE",
    title: "L'Excellence IT au Sénégal",
    desc: "Une équipe d'ingénieurs réseaux, sécurité et développeurs seniors mobilisés pour votre continuité.",
    linkText: "Découvrir Nob Technologies",
    href: "/a-propos",
    tag: "Proximité & Réactivité",
    highlights: ["Astreinte technique 24/7", "SLA contractuel garanti", "Basé Route de l'Aéroport, Dakar"],
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
      { name: 'Réserver un Audit Réseau', href: '/reserver-audit', desc: 'Diagnostic complet sur site : baies, règles de filtrage et conformité', tag: 'Intervention 24h' },
      { name: 'ERP & Digitalisation', href: '/services/erp-digitalisation', desc: 'Intégration Dolibarr & Odoo, automatisation et workflows métiers', tag: 'Dolibarr • Odoo' },
      { name: 'Développement Web & Mobile', href: '/services/developpement-web-mobile', desc: 'Portails d’entreprise, applications sur-mesure & plateformes SaaS', tag: 'SaaS • Web & Mobile' },
      { name: 'Téléphonie IP & VoIP', href: '/services/telephone-ip', desc: 'Autocommutateurs IPBX Yeastar, communications unifiées & SIP', tag: 'Yeastar • IPBX & SIP' },
      { name: 'Matériel & Licences IT', href: '/services/vente-materiels-licences', desc: 'Serveurs Dell EMC, baies de brassage et licences Microsoft 365', tag: 'Dell EMC • Microsoft 365' },
    ]
  },
  { 
    id: 'formations',
    name: 'Formations', 
    href: '/formations', 
    desc: 'Cursus d’immersion pratique et préparation aux certifications d’élite',
    order: 2,
    children: [
      { name: 'Catalogue Formations', href: '/formations', desc: 'Cursus opérationnels et ateliers pratiques à Dakar (rythme flexible)', tag: 'Pratique & Certifications' },
      { name: 'Certifications Réseaux & Sécurité', href: '/formations/cisco-ccna', desc: 'Préparation officielle Cisco CCNA, Fortinet NSE, Sophos & CompTIA', tag: 'CCNA • NSE 4 • Sophos' },
      { name: 'Business Intelligence & Power BI', href: '/formations/power-bi', desc: 'Modélisation DAX, tableaux de bord interactifs et reporting décisionnel', tag: 'Power BI • DAX' },
      { name: 'Automatisation & IA', href: '/formations/initiation-intelligence-artificielle', desc: 'Workflows Make, scripting Python, agents IA et productivité métier', tag: 'Make • Python • IA' },
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
      { name: 'Secteurs d’Activité', href: '/secteurs', desc: 'Solutions dédiées pour Banques, Institutions, Santé, Industrie & PME', tag: 'PME • Banques • Santé' },
    ]
  },
  { 
    id: 'realisations',
    name: 'Réalisations', 
    href: '/realisations', 
    desc: 'Déploiements d’infrastructures critiques et plateformes web en production',
    order: 4,
    children: [
      { name: 'Études de Cas & Résultats', href: '/etudes-de-cas', desc: 'Analyses détaillées : défis, architectures déployées et résultats', tag: 'Cas Clients Chiffrés' },
      { name: 'Projets & Déploiements', href: '/realisations', desc: 'Chantiers livrés : Union Européenne, SETER, P2A, Parc Exotique', tag: 'Références Terrain' },
      { name: 'Galerie d’Installations', href: '/galerie', desc: 'Photos réelles de nos baies de brassage, salles serveurs et câblages', tag: 'Photos Terrain' },
    ]
  },
  { 
    id: 'a-propos',
    name: 'Entreprise', 
    href: '/a-propos', 
    desc: 'Présentation de Nob Technologies et de notre équipe d’ingénieurs',
    order: 5,
    children: [
      { name: 'À Propos de Nobtech', href: '/a-propos', desc: 'Notre histoire, nos engagements et nos standards d’ingénierie à Dakar', tag: 'Cabinet Dakar' },
      { name: 'Actualités & Articles', href: '/articles', desc: 'Analyses techniques, conseils en cybersécurité et vie du cabinet', tag: 'Veille & Analyses' },
      { name: 'Foire Aux Questions (FAQ)', href: '/faq', desc: 'Modalités d’intervention, garanties matériel et contrats de support', tag: 'SLA & Garanties' },
      { name: 'Carrières & Recrutement', href: '/carrieres', desc: 'Rejoignez notre équipe d’ingénieurs réseaux et développeurs', tag: 'Recrutement' },
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
  if (s.includes('solution') || s.includes('service')) return "Ingénierie & Infrastructures d'Entreprise";
  if (s.includes('format')) return "Programmes de Formation & Certifications";
  if (s.includes('partenaire')) return "Alliances Stratégiques & Constructeurs";
  if (s.includes('réalis') || s.includes('realis')) return "Déploiements & Références en Production";
  if (s.includes('propos') || s.includes('entreprise')) return "Le Cabinet Nob Technologies";
  return idOrName;
};

const getSubItemIcon = (name: string, href: string = "") => {
  const n = (name + " " + href).toLowerCase();
  if (n.includes('power bi') || n.includes('business intelligence') || n.includes('data')) return Activity;
  if (n.includes('conformit') || n.includes('norme')) return Lock;
  if (n.includes('audit') || n.includes('soc')) return ShieldAlert;
  if (n.includes('cyber') || n.includes('firewall')) return ShieldCheck;
  if (n.includes('réseau') || n.includes('reseau') || n.includes('câblage') || n.includes('telecom')) return Network;
  if (n.includes('erp') || n.includes('digitalis')) return Cpu;
  if (n.includes('web') || n.includes('mobile') || n.includes('dev')) return Code2;
  if (n.includes('téléphon') || n.includes('telephon') || n.includes('voip')) return PhoneCall;
  if (n.includes('matériel') || n.includes('materiel') || n.includes('serveur') || n.includes('licence')) return Server;
  if (n.includes('certif')) return Award;
  if (n.includes('ia') || n.includes('auto')) return Sparkles;
  if (n.includes('format')) return GraduationCap;
  if (n.includes('constructeur') || n.includes('partenaire')) return Building2;
  if (n.includes('secteur')) return Globe;
  if (n.includes('galerie')) return Camera;
  if (n.includes('étude') || n.includes('etude') || n.includes('cas') || n.includes('projet') || n.includes('déploiement') || n.includes('realis')) return Layers;
  if (n.includes('actualit') || n.includes('blog') || n.includes('article')) return Newspaper;
  if (n.includes('faq') || n.includes('question')) return HelpCircle;
  if (n.includes('carrière') || n.includes('carriere') || n.includes('recrut')) return Users;
  if (n.includes('propos')) return Info;
  return ArrowRight;
};

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [navItems, setNavItems] = useState<NavItem[]>(DEFAULT_NAV);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const [hoveredSubItem, setHoveredSubItem] = useState<SubItem | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { openQuoteModal } = useQuoteModal();

  const handleMenuEnter = (id: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (activeHover !== id) {
      setHoveredSubItem(null);
    }
    setActiveHover(id);
  };

  const handleMenuLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveHover(null);
      setHoveredSubItem(null);
    }, 150);
  };

  // Fetch dynamic pages marked to be included in navigation from CMS
  useEffect(() => {
    fetch('/api/navigation-pages')
      .then((res) => res.json())
      .then((data) => {
        if (data?.pages && Array.isArray(data.pages) && data.pages.length > 0) {
          const updatedNav = JSON.parse(JSON.stringify(DEFAULT_NAV));

          data.pages.forEach((p: any) => {
            const pName = (p.name || '').toLowerCase().trim();
            const pHref = (p.href || '').toLowerCase().trim();
            if (
              pName === 'home' ||
              pName === 'accueil' ||
              pHref === '/' ||
              pHref === '/home' ||
              pHref === '/accueil'
            ) {
              return;
            }
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
        setHoveredSubItem(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setOpenMobileSubmenu(null);
    setActiveHover(null);
    setHoveredSubItem(null);
  };

  const activeNavItem = navItems.find((item) => (item.id || item.name) === activeHover) || null;
  const activeSpotlight = activeNavItem?.id ? SPOTLIGHTS[activeNavItem.id] : null;
  const ActiveParentIcon = activeNavItem ? getNavIcon(activeNavItem.name) : Layers;

  return (
    <>
      {/* Subtle Backdrop Dim Layer */}
      <div 
        className={cn(
          "fixed inset-0 top-[96px] sm:top-[112px] bg-slate-950/20 backdrop-blur-[2px] pointer-events-none transition-opacity duration-200 z-40 hidden lg:block",
          activeHover ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      />

      {/* Main Header Bar */}
      <header 
        onMouseLeave={handleMenuLeave}
        className="fixed top-0 inset-x-0 z-50 w-full bg-white/95 dark:bg-[#020617]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-[0_4px_25px_rgba(15,23,42,0.03)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)] transition-all duration-300"
      >
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
                <a 
                  href="tel:+221773010838"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors group"
                  title="Ligne directe mobile & WhatsApp"
                >
                  <Smartphone className="w-3 h-3 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-400 hidden md:inline font-normal">Tél :</span>
                  <span className="font-semibold text-slate-200 group-hover:text-emerald-400 whitespace-nowrap text-[10.5px] sm:text-xs">+221 77 301 08 38</span>
                </a>

                <span className="text-slate-700 hidden sm:inline select-none" aria-hidden="true">|</span>

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

        <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex h-16 sm:h-20 items-center justify-between gap-3 sm:gap-4">
            {/* Brand Logo */}
            <div className="flex items-center shrink-0">
              <AnimatedLogo />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Navigation principale">
              {navItems.map((item) => {
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const itemKey = item.id || item.name;
                const isHovered = activeHover === itemKey;
                const isActiveRoute = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href + '/'));

                return (
                  <div 
                    key={item.name} 
                    className="relative"
                    onMouseEnter={() => handleMenuEnter(itemKey)}
                  >
                    <Link 
                      href={item.href} 
                      onFocus={() => handleMenuEnter(itemKey)}
                      aria-expanded={hasChildren || item.id === 'contact' ? isHovered : undefined}
                      className={cn(
                        "text-[13.5px] xl:text-[14px] font-semibold transition-colors py-4 px-0.5 flex items-center",
                        isHovered || isActiveRoute
                          ? "text-cyan-600 dark:text-cyan-400" 
                          : "text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400"
                      )}
                    >
                      <span className={cn(
                        "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap relative",
                        isHovered 
                          ? "bg-slate-100/90 dark:bg-slate-800/90 text-cyan-600 dark:text-cyan-400" 
                          : isActiveRoute
                            ? "bg-cyan-50/70 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300"
                            : "hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                      )}>
                        <span>{item.name}</span>
                        {(hasChildren || item.id === 'contact') && (
                          <ChevronDown className={cn(
                            "w-3.5 h-3.5 transition-transform duration-200",
                            isHovered ? "rotate-180 text-cyan-600 dark:text-cyan-400" : "text-slate-400"
                          )} />
                        )}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* Desktop Corporate Actions */}
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

          {/* ==========================================================================
             UNIFIED DESKTOP MEGA MENU PANEL (Stripe / Linear / Cloudflare Architecture)
             Zero horizontal jumping, instant visual hierarchy, live sub-item preview
             ========================================================================== */}
          <div
            onMouseEnter={() => {
              if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
                closeTimeoutRef.current = null;
              }
            }}
            onMouseLeave={handleMenuLeave}
            className={cn(
              "hidden lg:block absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 transition-all duration-200 ease-out",
              activeNavItem && (activeNavItem.children?.length || activeNavItem.id === 'contact')
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-1.5 pointer-events-none",
              activeNavItem?.id === 'contact'
                ? "w-[680px]"
                : "w-[920px] xl:w-[980px]"
            )}
          >
            {activeNavItem && (
              <div className="bg-white/98 dark:bg-slate-900/98 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-corporate-floating rounded-2xl overflow-hidden ring-1 ring-slate-900/5 dark:ring-white/10">
                {activeNavItem.children && activeNavItem.children.length > 0 ? (
                  <div>
                    {/* Top Section Header Bar */}
                    <div className="px-6 py-4 bg-slate-50/70 dark:bg-slate-900/60 border-b border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shrink-0">
                          <ActiveParentIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                              {getHeaderCategoryLabel(activeNavItem.id || activeNavItem.name)}
                            </span>
                            <span className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700 px-2 py-0.5 rounded-full font-medium">
                              {activeNavItem.children.length} rubriques
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {activeNavItem.desc}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={activeNavItem.href}
                        onClick={() => setActiveHover(null)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-700 transition-all shrink-0 shadow-2xs"
                      >
                        <span>Vue d&apos;ensemble {activeNavItem.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      </Link>
                    </div>

                    {/* Main 2-Zone Executive Grid */}
                    <div className="grid grid-cols-12 divide-x divide-slate-200/70 dark:divide-slate-800/80">
                      {/* Left Zone: Scannable Navigation List (8 cols) */}
                      <div className={cn(
                        "p-5",
                        activeSpotlight ? "col-span-8" : "col-span-12",
                        activeNavItem.children.length <= 3
                          ? "grid grid-cols-1 gap-2"
                          : "grid grid-cols-2 gap-2"
                      )}>
                        {activeNavItem.children.map((child) => {
                          const ChildIcon = getSubItemIcon(child.name, child.href);
                          const isChildActive = pathname === child.href;

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setActiveHover(null)}
                              onMouseEnter={() => setHoveredSubItem(child)}
                              className={cn(
                                "group/item relative rounded-xl p-3 transition-all duration-150 flex items-start gap-3.5 border",
                                isChildActive
                                  ? "bg-slate-100/90 dark:bg-slate-800/70 border-slate-300/80 dark:border-slate-700"
                                  : "bg-transparent hover:bg-slate-50/90 dark:hover:bg-slate-800/50 border-transparent hover:border-slate-200/80 dark:hover:border-slate-700/80"
                              )}
                            >
                              <div className={cn(
                                "w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-150",
                                isChildActive
                                  ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900"
                                  : "bg-slate-50 dark:bg-slate-800/90 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 group-hover/item:bg-slate-900 group-hover/item:text-white group-hover/item:border-slate-900 dark:group-hover/item:bg-white dark:group-hover/item:text-slate-900"
                              )}>
                                <ChildIcon className="w-4 h-4 stroke-[2]" />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400 transition-colors leading-snug">
                                    {child.name}
                                  </span>
                                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400 transition-all shrink-0" />
                                </div>

                                {child.desc && (
                                  <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5 line-clamp-2">
                                    {child.desc}
                                  </p>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Right Zone: Sober Corporate Details & Spotlight Card (4 cols) */}
                      {activeSpotlight && (
                        <div className="col-span-4 p-5 bg-slate-50/60 dark:bg-slate-900/50 flex flex-col justify-between">
                          <div className="rounded-xl bg-white dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 p-4.5 border border-slate-200/90 dark:border-slate-700/80 shadow-xs relative overflow-hidden flex-1 flex flex-col justify-between">
                            <div className="relative z-10">
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/70 border border-slate-200/80 dark:border-slate-600/60 px-2.5 py-0.5 rounded-md">
                                  {hoveredSubItem?.tag || activeSpotlight.badge}
                                </span>
                              </div>

                              <h5 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                                {hoveredSubItem ? hoveredSubItem.name : activeSpotlight.title}
                              </h5>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1.5">
                                {hoveredSubItem?.desc || activeSpotlight.desc}
                              </p>

                              {/* Key highlights list */}
                              <ul className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-700/70 space-y-1.5">
                                {activeSpotlight.highlights.map((pt, idx) => (
                                  <li key={idx} className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                                    <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0" />
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="relative z-10 pt-3.5 mt-4 border-t border-slate-100 dark:border-slate-700/70 flex items-center justify-between">
                              <span className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium">
                                {activeSpotlight.tag}
                              </span>
                              <Link
                                href={hoveredSubItem ? hoveredSubItem.href : activeSpotlight.href}
                                onClick={() => setActiveHover(null)}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                              >
                                <span>{hoveredSubItem ? "Consulter la page" : activeSpotlight.linkText}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Bar: 1-Click Direct Actions (No green dot) */}
                    <div className="px-6 py-3 bg-slate-50/90 dark:bg-slate-900/90 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                          Ingénieurs disponibles à Dakar
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">|</span>
                        <Link
                          href="/reserver-audit"
                          onClick={() => setActiveHover(null)}
                          className="inline-flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        >
                          <CalendarCheck className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                          <span>Réserver un audit sur site</span>
                        </Link>
                        <span className="text-slate-300 dark:text-slate-700">|</span>
                        <a
                          href="https://wa.me/221773010838"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                          <span>WhatsApp Direct (+221 77 301 08 38)</span>
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveHover(null);
                          openQuoteModal(activeNavItem.name);
                        }}
                        className="font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <span>Chiffrer un projet ({activeNavItem.name})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : activeNavItem.id === 'contact' ? (
                  /* Contact Mega Panel */
                  <div className="p-6">
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Contact Direct &bull; Siège Dakar
                        </span>
                        <h5 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                          Échangez avec un ingénieur Nob Technologies
                        </h5>
                      </div>
                      <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        Réponse sous 24h
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <a
                        href="tel:+221773010838"
                        className="group/card p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 hover:border-emerald-400 transition-all"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover/card:text-emerald-600 dark:group-hover/card:text-emerald-400">
                          +221 77 301 08 38
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Ligne directe &amp; WhatsApp
                        </div>
                      </a>

                      <a
                        href="tel:+221338140435"
                        className="group/card p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 hover:border-cyan-400 transition-all"
                      >
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-2.5">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover/card:text-cyan-600 dark:group-hover/card:text-cyan-400">
                          +221 33 814 04 35
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Standard Fixe Dakar
                        </div>
                      </a>

                      <a
                        href="mailto:contact@nobtech.fr"
                        className="group/card p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 hover:border-cyan-400 transition-all"
                      >
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-2.5">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover/card:text-cyan-600 dark:group-hover/card:text-cyan-400">
                          contact@nobtech.fr
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Cahier des charges &amp; Devis
                        </div>
                      </a>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                      <Link
                        href="/contact"
                        onClick={() => setActiveHover(null)}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                      >
                        <span>Ouvrir le formulaire de contact</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href="/reserver-audit"
                        onClick={() => setActiveHover(null)}
                        className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
                      >
                        Réserver un audit sur site
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
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
          "absolute inset-x-0 top-[96px] sm:top-[116px] bottom-0 bg-white dark:bg-[#070d1f] shadow-2xl flex flex-col justify-between overflow-y-auto custom-scrollbar transition-transform duration-300 ease-out",
          isOpen ? "translate-y-0" : "-translate-y-4"
        )}>
          {/* Main Navigation Links */}
          <div className="p-5 sm:p-8 max-w-3xl mx-auto w-full space-y-4">
            <div className="pb-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Menu Principal
              </span>
              <span className="text-[11px] text-slate-400">
                Touchez le logo pour revenir à l&apos;accueil
              </span>
            </div>

            <nav className="flex flex-col gap-2.5">
              {navItems
                .filter((item) => {
                  const nameLower = (item.name || '').toLowerCase().trim();
                  const hrefLower = (item.href || '').toLowerCase().trim();
                  return (
                    nameLower !== 'home' &&
                    nameLower !== 'accueil' &&
                    hrefLower !== '/' &&
                    hrefLower !== '/home' &&
                    hrefLower !== '/accueil'
                  );
                })
                .map((item) => {
                const IconComponent = getNavIcon(item.name);
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isExpanded = openMobileSubmenu === item.name;

                return (
                  <div key={item.name} className="flex flex-col rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 overflow-hidden">
                    <div className="flex items-center justify-between p-3 sm:p-3.5 hover:bg-cyan-50/60 dark:hover:bg-slate-800/60 transition-colors">
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="flex items-center gap-3 min-w-0 flex-1"
                      >
                        <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-cyan-400 shadow-sm shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                            {item.desc}
                          </div>
                        </div>
                      </Link>

                      {hasChildren ? (
                        <button
                          type="button"
                          onClick={() => setOpenMobileSubmenu(isExpanded ? null : item.name)}
                          className="p-2 rounded-lg text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-white dark:hover:bg-slate-800 transition-colors ml-2"
                          aria-label={`Ouvrir le sous-menu de ${item.name}`}
                        >
                          <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isExpanded && "rotate-180 text-cyan-600 dark:text-cyan-400")} />
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className="p-2 text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors ml-2"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>

                    {/* Submenu Accordion on Mobile */}
                    {hasChildren && isExpanded && (
                      <div className="px-3 pb-3 pt-1 border-t border-slate-200/60 dark:border-slate-800 bg-white/70 dark:bg-slate-950/60 space-y-1">
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className="block p-2 rounded-lg text-xs font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50/50 dark:bg-cyan-950/40 hover:bg-cyan-100/60 dark:hover:bg-cyan-900/60 transition-colors"
                        >
                          &rarr; Voir toute la rubrique {item.name}
                        </Link>
                        {item.children!.map((c) => {
                          const SubIcon = getSubItemIcon(c.name, c.href);
                          return (
                            <Link
                              key={c.href}
                              href={c.href}
                              onClick={closeMenu}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100/90 dark:hover:bg-slate-800/80 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-cyan-400 shrink-0 mt-0.5">
                                <SubIcon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                                  {c.name}
                                </div>
                                {c.desc && (
                                  <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 leading-snug">
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
          <div className="p-5 sm:p-8 bg-slate-50/90 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 mt-auto shrink-0">
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
                  className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-700 transition-colors shadow-2xs"
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="truncate">+221 77 301 08 38</span>
                </a>

                <a
                  href="tel:+221338140435"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-200 dark:hover:border-cyan-700 transition-colors shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span className="truncate">+221 33 814 04 35</span>
                </a>
              </div>

              <a
                href="mailto:contact@nobtech.fr"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-200 dark:hover:border-cyan-700 transition-colors shadow-2xs"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span className="truncate font-medium">contact@nobtech.fr</span>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=QG3J%2BHP+Dakar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-[11px] text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center justify-center gap-1.5 transition-colors group"
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
