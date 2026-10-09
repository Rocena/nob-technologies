"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "./ui/layout";
import { 
  Menu, X, ArrowRight, Phone, Mail, Layers, Globe, Star, BookOpen, Info, DollarSign, Camera, ChevronDown,
  ShieldCheck, Network, Cpu, Code2, PhoneCall, Server, GraduationCap, Award, ShieldAlert, Sparkles,
  Building2, Newspaper, HelpCircle, Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedLogo } from "./AnimatedLogo";
import { GlowButton } from "./GlowButton";
import { useQuoteModal } from "./EngineerModalContext";
import { SearchButton } from "./SearchButton";
import { usePalette } from "./CommandPaletteProvider";

interface SubItem {
  name: string;
  href: string;
  desc?: string;
}

interface NavItem {
  id?: string;
  name: string;
  href: string;
  desc: string;
  order?: number;
  children?: SubItem[];
}

const DEFAULT_NAV: NavItem[] = [
  { 
    id: 'solutions',
    name: 'Services', 
    href: '/services', 
    desc: 'Infrastructures haute disponibilité, Cloud, ERP, cybersécurité & infogérance',
    order: 1,
    children: [
      { name: 'Cybersécurité & Firewalls', href: '/services/cybersecurite', desc: 'Protection périmétrique Sophos & Fortinet, audits et SOC managé' },
      { name: 'Réseaux & Câblage', href: '/services/reseaux-telecoms', desc: 'Câblage structuré cat 6A/7, fibre optique, Cisco & HPE Aruba' },
      { name: 'ERP & Digitalisation', href: '/services/erp-digitalisation', desc: 'Intégration Dolibarr & Odoo, automatisation et workflows métiers' },
      { name: 'Développement Web & Mobile', href: '/services/developpement-web-mobile', desc: 'Portails d’entreprise, applications sur-mesure & plateformes SaaS' },
      { name: 'Téléphonie IP & VoIP', href: '/services/telephone-ip', desc: 'Autocommutateurs IPBX Yeastar, communications unifiées & SIP' },
      { name: 'Matériel & Licences IT', href: '/services/materiel-licences', desc: 'Serveurs Dell EMC, baies de serveurs et licences Microsoft 365' },
    ]
  },
  { 
    id: 'formations',
    name: 'Formations', 
    href: '/formations', 
    desc: 'Cursus d’immersion sur 6 mois et préparation aux certifications d’élite',
    order: 2,
    children: [
      { name: 'Catalogue Formations (6 Mois)', href: '/formations', desc: 'Cursus d’excellence et ateliers pratiques à Dakar (max 6h/sem)' },
      { name: 'Préparation Certifications IT', href: '/formations/preparation-certifications-it', desc: 'Préparation officielle Cisco CCNA, Fortinet NSE, Sophos & CompTIA' },
      { name: 'Cybersécurité & Audit SOC', href: '/formations/cybersecurite-audit-soc', desc: 'Gouvernance ISO 27001, surveillance SOC et techniques de pentest' },
      { name: 'Automatisation & IA', href: '/formations/automatisation-ia', desc: 'Workflows n8n, scripting Python, agents IA et productivité' },
    ]
  },
  { 
    id: 'partenaires',
    name: 'Partenaires', 
    href: '/partenaires', 
    desc: 'Alliances technologiques stratégiques avec les constructeurs mondiaux',
    order: 3,
    children: [
      { name: 'Partenaires Constructeurs', href: '/partenaires', desc: 'Alliances avec Sophos, Fortinet, Cisco, Dell, Microsoft 365, Acronis' },
      { name: 'Secteurs d’Activité', href: '/secteurs', desc: 'Solutions spécialisées pour PME, Banques, Écoles, Hôpitaux & Commerces' },
    ]
  },
  { 
    id: 'realisations',
    name: 'Réalisations', 
    href: '/realisations', 
    desc: 'Déploiements d’infrastructures critiques et plateformes web en production',
    order: 4,
    children: [
      { name: 'Projets & Déploiements', href: '/realisations', desc: 'Études de cas concrètes dont le Parc Exotique du Sénégal' },
      { name: 'Galerie d’Installations', href: '/galerie', desc: 'Photos réelles de baies de brassage, salles serveurs et câblage' },
    ]
  },
  { 
    id: 'a-propos',
    name: 'Entreprise', 
    href: '/a-propos', 
    desc: 'Présentation de Nob Technologies, notre équipe d’ingénieurs et actualités',
    order: 5,
    children: [
      { name: 'À Propos de Nobtech', href: '/a-propos', desc: 'Notre histoire, nos valeurs et nos standards d’excellence à Dakar' },
      { name: 'Actualités & Blog', href: '/actualites', desc: 'Veille technologique, cyberdéfense, bonnes pratiques et annonces' },
      { name: 'Foire Aux Questions (FAQ)', href: '/faq', desc: 'Réponses à vos questions sur les délais, contrats et garanties SLA' },
      { name: 'Carrières & Recrutement', href: '/carrieres', desc: 'Rejoindre notre équipe d’ingénieurs réseaux et consultants IT' },
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
  if (item.id === 'solutions') return "w-[720px]";
  if (item.id === 'formations' || item.id === 'a-propos') return "w-[640px]";
  if (item.id === 'partenaires' || item.id === 'realisations') return "w-[560px]";
  if (item.id === 'contact') return "w-[380px]";
  return item.children && item.children.length > 2 ? "w-[640px]" : "w-[480px]";
};

const getDropdownAlign = (index: number, total: number) => {
  if (index === 0) return "left-0";
  if (index === 1) return "left-[-40px]";
  if (index >= total - 2) return "right-0";
  return "left-1/2 -translate-x-1/2";
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [navItems, setNavItems] = useState<NavItem[]>(DEFAULT_NAV);
  const { setOpen: openSearch } = usePalette();
  const { openQuoteModal } = useQuoteModal();

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
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setOpenMobileSubmenu(null);
  };

  return (
    <>
      {/* Main Header Bar */}
      <header className="fixed top-0 sm:top-4 inset-x-0 z-50 sm:px-6">
        <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-xl sm:rounded-2xl border-b sm:border border-slate-200/80 shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300">
          <Container className="px-4 sm:px-6">
            <div className="flex h-16 sm:h-20 items-center justify-between">
              {/* Brand Logo */}
              <div className="flex items-center shrink-0 max-w-[200px] sm:max-w-none">
                <AnimatedLogo />
              </div>
              
              {/* Desktop Navigation (large screens) */}
              <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                {navItems.map((item, index) => {
                  const hasChildren = Boolean(item.children && item.children.length > 0);
                  const ParentIcon = getNavIcon(item.name);

                  return (
                    <div key={item.name} className="relative group">
                      <Link 
                        href={item.href} 
                        className="group/link text-[15px] font-semibold text-slate-800 hover:text-cyan-600 transition-colors py-5 px-1 flex items-center"
                      >
                        <span className="px-3 py-1.5 rounded-xl group-hover/link:bg-slate-100/90 group-hover/link:text-cyan-600 transition-all flex items-center gap-1.5">
                          <span>{item.name}</span>
                          {(hasChildren || item.id === 'contact') && (
                            <ChevronDown className="w-4 h-4 text-slate-400 group-hover/link:text-cyan-600 group-hover:rotate-180 transition-transform duration-200" />
                          )}
                        </span>
                      </Link>

                      {/* Desktop Mega-Menu Hover Card */}
                      {hasChildren ? (
                        <div className={cn(
                          "absolute top-full pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50",
                          getDropdownAlign(index, navItems.length),
                          getDropdownWidth(item)
                        )}>
                          <div className="bg-white/98 backdrop-blur-2xl border border-slate-200/90 shadow-[0_24px_50px_-12px_rgba(15,23,42,0.18),0_0_0_1px_rgba(15,23,42,0.04)] rounded-2xl p-5 sm:p-6 relative overflow-hidden ring-1 ring-slate-900/5">
                            {/* Discrete NOBTECH Shield Watermark in top-right */}
                            <div className="absolute -top-3 -right-3 w-28 h-28 opacity-[0.06] pointer-events-none select-none overflow-hidden">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img 
                                src="/images/nobtech-shield.png" 
                                alt="" 
                                className="w-full h-full object-contain" 
                              />
                            </div>
                            
                            <div className="relative z-10">
                              {/* Dropdown Header Banner */}
                              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 border border-cyan-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                                    <ParentIcon className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-700">
                                      Pôle {item.name}
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-1">
                                      {item.desc}
                                    </p>
                                  </div>
                                </div>
                                <Link
                                  href={item.href}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-cyan-600 hover:bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/70 transition-colors shrink-0"
                                >
                                  <span>Voir tout</span>
                                  <ArrowRight className="w-3.5 h-3.5 text-cyan-600" />
                                </Link>
                              </div>

                              {/* Grid of Child Services & Offerings */}
                              <div className="grid grid-cols-2 gap-2.5">
                                {item.children!.map((child) => {
                                  const ChildIcon = getSubItemIcon(child.name, child.href);

                                  return (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      className="group/child p-3 rounded-xl hover:bg-slate-50/90 border border-transparent hover:border-slate-200/80 transition-all flex items-start gap-3.5 relative"
                                    >
                                      <div className="w-10 h-10 rounded-xl bg-slate-100/80 border border-slate-200/60 flex items-center justify-center text-slate-700 group-hover/child:bg-cyan-50 group-hover/child:text-cyan-600 group-hover/child:border-cyan-200 transition-colors shrink-0 shadow-2xs">
                                        <ChildIcon className="w-5 h-5 stroke-[2]" />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-1">
                                          <span className="text-[14px] font-bold text-slate-900 group-hover/child:text-cyan-600 transition-colors">
                                            {child.name}
                                          </span>
                                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover/child:opacity-100 group-hover/child:translate-x-0.5 group-hover/child:text-cyan-600 transition-all shrink-0" />
                                        </div>
                                        {child.desc && (
                                          <p className="text-[12px] text-slate-500 leading-snug mt-1 font-normal line-clamp-2">
                                            {child.desc}
                                          </p>
                                        )}
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>

                              {/* Dropdown Footer Strip */}
                              <div className="mt-4 pt-3.5 border-t border-slate-100/90 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 px-5 sm:px-6 py-3 bg-slate-50/80 rounded-b-2xl flex items-center justify-between text-xs text-slate-600">
                                <span className="flex items-center gap-2">
                                  <span className="font-semibold text-slate-800">Support & Ingénierie Dakar</span>
                                  <span className="text-slate-400">&bull;</span>
                                  <span>Interventions garanties sous 24h</span>
                                </span>
                                <button
                                  type="button"
                                  onClick={() => openQuoteModal(item.name)}
                                  className="font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1 hover:underline cursor-pointer"
                                >
                                  <span>Demander un devis</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : item.id === 'contact' ? (
                        <div className={cn(
                          "absolute top-full pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50",
                          getDropdownAlign(index, navItems.length),
                          getDropdownWidth(item)
                        )}>
                          <div className="bg-white/98 backdrop-blur-2xl border border-slate-200/90 shadow-[0_24px_50px_-12px_rgba(15,23,42,0.18)] rounded-2xl p-5 relative overflow-hidden ring-1 ring-slate-900/5">
                            <div className="relative z-10 space-y-3">
                              <div className="pb-3 border-b border-slate-100">
                                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-700">
                                  Contact Direct &bull; Dakar
                                </div>
                                <h5 className="text-[15px] font-bold text-slate-900 mt-1">
                                  Parlons de votre infrastructure
                                </h5>
                                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                  Nos ingénieurs certifiés répondent sous 24h ouvrées.
                                </p>
                              </div>

                              <div className="space-y-2 pt-0.5">
                                <a
                                  href="tel:+221773010838"
                                  className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50/70 border border-slate-200/60 hover:border-cyan-200 transition-colors group/tel"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-cyan-600 shadow-2xs shrink-0">
                                    <Phone className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-xs font-bold text-slate-900 group-hover/tel:text-cyan-600 transition-colors">
                                      +221 77 301 08 38
                                    </div>
                                    <div className="text-[11px] text-slate-500">
                                      Ligne directe d’astreinte & devis
                                    </div>
                                  </div>
                                </a>

                                <a
                                  href="mailto:contact@nobtech.fr"
                                  className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50/70 border border-slate-200/60 hover:border-cyan-200 transition-colors group/mail"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-cyan-600 shadow-2xs shrink-0">
                                    <Mail className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-xs font-bold text-slate-900 group-hover/mail:text-cyan-600 transition-colors">
                                      contact@nobtech.fr
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
                                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
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

              {/* Desktop Quick Actions */}
              <div className="hidden lg:flex items-center gap-3">
                <SearchButton />
                <GlowButton onClick={() => openQuoteModal()}>Demander un devis</GlowButton>
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
          </Container>
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
          "absolute inset-x-0 top-16 sm:top-24 bottom-0 bg-white shadow-2xl flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-out",
          isOpen ? "translate-y-0" : "-translate-y-4"
        )}>
          {/* Main Navigation Links */}
          <div className="p-5 sm:p-8 max-w-3xl mx-auto w-full space-y-4">
            <div className="pb-2.5 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                MENU
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
                          &rarr; Voir la vue d’ensemble ({item.name})
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
                className="w-full h-12 text-sm sm:text-base shadow-md"
              >
                Demander un devis en ligne
              </GlowButton>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href="tel:+221773010838"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-cyan-600 hover:border-cyan-200 transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span className="truncate">+221 77 301 08 38</span>
                </a>

                <a
                  href="mailto:contact@nobtech.fr"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-cyan-600 hover:border-cyan-200 transition-colors shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span className="truncate">contact@nobtech.fr</span>
                </a>
              </div>

              <p className="text-center text-[11px] text-slate-400 font-mono">
                Route de l&apos;Aéroport LSS lot N° 79, Dakar Sénégal
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
