"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "./ui/layout";
import { Menu, X, ArrowRight, Phone, Mail, Layers, Globe, Star, BookOpen, Info, DollarSign, Search, ChevronDown, Camera } from "lucide-react";
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
    name: 'Solutions & Services', 
    href: '/services', 
    desc: 'Infrastructures haute disponibilité, Cloud, ERP & Cybersécurité d’entreprise',
    order: 1,
    children: [
      { name: 'Tous nos Services', href: '/services', desc: 'Catalogue complet d’ingénierie et d’infogérance' },
      { name: 'Cybersécurité & Firewalls', href: '/services/cybersecurite', desc: 'Sophos, Fortinet, SOC & protection des données' },
      { name: 'Réseaux & Câblage', href: '/services/reseaux-cablage', desc: 'Cisco, HPE Aruba, fibre & baies de brassage' },
      { name: 'ERP & Digitalisation', href: '/services/erp-digitalisation', desc: 'Conception sur-mesure, Dolibarr, Odoo & automatisation' },
      { name: 'Développement Web & Mobile', href: '/services/developpement-web-mobile', desc: 'Applications sur-mesure & portails d’entreprise' },
      { name: 'Sauvegarde & Cloud Hybride', href: '/services/sauvegarde-cloud', desc: 'Acronis, Veritas, PCA/PRA & continuité d’activité' },
      { name: 'Téléphonie IP & VoIP', href: '/services/telephonie-ip', desc: 'Yeastar, Sangoma & télécoms unifiées' },
      { name: 'Matériel & Licences IT', href: '/services/materiel-licences', desc: 'Microsoft 365 (ESD/CSP) & serveurs Dell' },
    ]
  },
  { 
    id: 'formations',
    name: 'Formations', 
    href: '/formations', 
    desc: 'Cycles d’excellence et préparation aux certifications sur 6 mois',
    order: 2,
    children: [
      { name: 'Catalogue Formations (6 Mois)', href: '/formations', desc: 'Tous nos cursus intensifs pour professionnels' },
      { name: 'Préparation Certifications IT', href: '/formations/preparation-certifications-it', desc: 'Cisco CCNA/CCNP, Fortinet NSE, Sophos, CompTIA' },
      { name: 'Cybersécurité & Audit', href: '/formations/cybersecurite-audit', desc: 'Gouvernance ISO 27001, surveillance SOC & pentest' },
      { name: 'Automatisation & IA', href: '/formations/automatisation-ia', desc: 'Workflows n8n, Python, agents LLM & ERP' },
    ]
  },
  { 
    id: 'ecosysteme',
    name: 'Partenaires & Écosystème', 
    href: '/partenaires', 
    desc: 'Alliances technologiques, références et réalisations de Nobtech',
    order: 3,
    children: [
      { name: 'Partenaires Constructeurs', href: '/partenaires', desc: 'Sophos, Fortinet, Cisco, Dell, Microsoft 365, Acronis...' },
      { name: 'Secteurs d’Activité', href: '/secteurs', desc: 'PME, ETI, PMI, Commerces & Banques' },
      { name: 'Réalisations & Références', href: '/realisations', desc: 'Parc Exotique du Sénégal & projets d’ingénierie' },
      { name: 'Galerie d’Installations', href: '/galerie', desc: 'Photos de baies, salles serveurs & câblages' },
    ]
  },
  { 
    id: 'entreprise',
    name: 'L’Entreprise', 
    href: '/a-propos', 
    desc: 'Notre culture d’ingénierie, notre équipe et nos actualités',
    order: 4,
    children: [
      { name: 'À Propos de Nobtech', href: '/a-propos', desc: 'Notre histoire, nos valeurs & présence internationale' },
      { name: 'Actualités & Blog', href: '/actualites', desc: 'Veille technologique, cyberdéfense & annonces' },
      { name: 'Foire Aux Questions (FAQ)', href: '/faq', desc: 'Réponses à vos questions sur nos prestations' },
      { name: 'Carrières & Recrutement', href: '/carrieres', desc: 'Rejoindre nos talents en ingénierie' },
    ]
  },
  { 
    id: 'contact',
    name: 'Contact', 
    href: '/contact', 
    desc: 'Échangez avec un ingénieur et obtenez un devis sous 24h',
    order: 5,
  },
];

const getNavIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('solution') || n.includes('service')) return Layers;
  if (n.includes('secteur')) return Globe;
  if (n.includes('réalisation')) return Star;
  if (n.includes('galerie')) return Camera;
  if (n.includes('partenaire') || n.includes('certif') || n.includes('format')) return BookOpen;
  if (n.includes('propos')) return Info;
  if (n.includes('tarif') || n.includes('devis')) return DollarSign;
  return ArrowRight;
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
            if (p.placement === 'submenu') {
              // Attach to parent category
              const parentNav = updatedNav.find((item: NavItem) => 
                item.id === p.parent || item.name.toLowerCase().includes(p.parent?.toLowerCase() || '')
              );
              if (parentNav) {
                if (!parentNav.children) parentNav.children = [];
                parentNav.children.push({
                  name: p.name,
                  href: p.href,
                  desc: p.desc,
                });
              }
            } else {
              // Direct main menu item
              const existingIndex = updatedNav.findIndex((i: NavItem) => i.href === p.href);
              if (existingIndex === -1) {
                updatedNav.push({
                  name: p.name,
                  href: p.href,
                  desc: p.desc,
                  order: p.order ?? 20,
                });
              }
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
              <nav className="hidden lg:flex items-center gap-3 xl:gap-6">
                {navItems.map((item) => (
                  <div key={item.name} className="relative group">
                    <Link 
                      href={item.href} 
                      className="text-sm font-semibold text-slate-700 hover:text-cyan-600 transition-colors py-6 flex items-center gap-1.5"
                    >
                      {item.name}
                      {item.children && item.children.length > 0 && (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 transition-transform duration-300 group-hover:rotate-180" />
                      )}
                    </Link>

                    {/* Desktop Dropdown / Submenu Hover Card */}
                    {item.children && item.children.length > 0 && (
                      <div className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50",
                        item.children.length > 4 ? "w-[580px]" : "w-[360px]"
                      )}>
                        <div className="bg-white/98 backdrop-blur-2xl border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.14)] rounded-2xl p-4 sm:p-5 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-bl-full pointer-events-none" />
                          
                          <Link href={item.href} className="block group/link pb-3 mb-2.5 border-b border-slate-100">
                            <h5 className="text-slate-900 font-bold mb-1 group-hover/link:text-cyan-600 transition-colors flex items-center justify-between text-sm">
                              <span>{item.name} &bull; Vue globale</span>
                              <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-cyan-600" />
                            </h5>
                            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                          </Link>

                          {/* Child submenus */}
                          <div className={cn(
                            "gap-1 pt-1",
                            item.children.length > 4 ? "grid grid-cols-2" : "flex flex-col space-y-1"
                          )}>
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className="block p-2 rounded-lg hover:bg-cyan-50/70 transition-colors group/sub"
                              >
                                <div className="text-xs font-semibold text-slate-800 group-hover/sub:text-cyan-700 flex items-center justify-between">
                                  <span>{child.name}</span>
                                  <ArrowRight className="w-3 h-3 text-cyan-500 opacity-0 group-hover/sub:opacity-100 transition-opacity shrink-0 ml-1" />
                                </div>
                                {child.desc && (
                                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                    {child.desc}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
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
            <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
              <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                Menu &bull; Nobtech Navigation
              </p>
              <span className="text-[10px] font-mono font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded">
                NOBTECH OS
              </span>
            </div>

            <nav className="flex flex-col gap-2.5">
              {navItems.map((item) => {
                const IconComponent = getNavIcon(item.name);
                const hasChildren = item.children && item.children.length > 0;
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
                        {item.children!.map((c) => (
                          <Link
                            key={c.name}
                            href={c.href}
                            onClick={closeMenu}
                            className="block p-2 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            <div className="text-xs font-semibold text-slate-800">
                              {c.name}
                            </div>
                            {c.desc && (
                              <div className="text-[10px] text-slate-400 line-clamp-1">
                                {c.desc}
                              </div>
                            )}
                          </Link>
                        ))}
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
                  href="tel:+221773108318"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-cyan-600 hover:border-cyan-200 transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span className="truncate">+221 77 310 83 18</span>
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
                Azura de l’Aéroport, 1SS lot N° 79, Dakar Sénégal
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
