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
    name: 'Solutions', 
    href: '/services', 
    desc: 'Réseaux, Cloud, ERP & Cybersécurité pour entreprises',
    order: 1,
    children: [
      { name: 'Cybersécurité & Firewalls', href: '/services', desc: 'Sophos, Fortinet, protection des données' },
      { name: 'Développement Web & Mobile', href: '/services', desc: 'Sites sur-mesure, apps mobiles & portails' },
      { name: 'ERP & Digitalisation', href: '/services', desc: 'Déploiement Odoo, Dolibarr' },
      { name: 'Marketing Digital', href: '/services', desc: 'Visibilité, SEO & acquisition' },
      { name: 'Licences Office 365', href: '/services', desc: 'Vente officielle ESD & CSP' },
    ]
  },
  { 
    id: 'secteurs',
    name: 'Secteurs', 
    href: '/secteurs', 
    desc: 'Écosystèmes taillés pour vos opérations critiques',
    order: 2,
    children: [
      { name: 'PME & ETI', href: '/secteurs/pme-eti', desc: 'Infrastructures scalables et résilientes' },
      { name: 'PMI & Industrie', href: '/secteurs/pmi-industrie', desc: 'Câblage durci et continuité OT' },
      { name: 'Commerces & Banques', href: '/secteurs/commerces-institutions', desc: 'Plateformes transactionnelles sécurisées' },
      { name: 'Startups', href: '/secteurs/particuliers-startups', desc: 'Agilité, Wi-Fi mesh & accompagnement' },
    ]
  },
  { 
    id: 'realisations',
    name: 'Réalisations', 
    href: '/realisations', 
    desc: 'Études de cas, Parc Exotique du Sénégal & projets déployés',
    order: 3,
  },
  { 
    id: 'galerie',
    name: 'Galerie', 
    href: '/galerie', 
    desc: 'Photos de nos installations, câblages et baies de brassage',
    order: 4,
  },
  { 
    id: 'certifications',
    name: 'Partenaires & Formations', 
    href: '/certifications', 
    desc: 'Sophos, Fortinet, Acronis & préparation aux certifications',
    order: 5,
  },
  { 
    id: 'apropos',
    name: 'À propos', 
    href: '/a-propos', 
    desc: 'Culture d’ingénierie sénégalaise et présence internationale',
    order: 6,
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

  const closeMenu = () => setIsOpen(false);

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
              <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
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
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 min-w-[280px] w-max max-w-sm opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                      <div className="bg-white/98 backdrop-blur-2xl border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-2xl p-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full pointer-events-none" />
                        
                        <Link href={item.href} className="block group/link pb-3 mb-2 border-b border-slate-100">
                          <h5 className="text-slate-900 font-bold mb-1 group-hover/link:text-cyan-600 transition-colors flex items-center justify-between text-sm">
                            <span>{item.name} &bull; Vue globale</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-cyan-600" />
                          </h5>
                          <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                        </Link>

                        {/* Child submenus if available */}
                        {item.children && item.children.length > 0 && (
                          <div className="space-y-1 pt-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className="block p-2 rounded-lg hover:bg-cyan-50/70 transition-colors group/sub"
                              >
                                <div className="text-xs font-semibold text-slate-800 group-hover/sub:text-cyan-700 flex items-center justify-between">
                                  <span>{child.name}</span>
                                  <ArrowRight className="w-3 h-3 text-cyan-500 opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                                </div>
                                {child.desc && (
                                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                    {child.desc}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
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
                Menu & Navigation
              </p>
              <span className="text-[10px] font-mono font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded">
                NOBTECH OS
              </span>
            </div>

            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {navItems.map((item) => {
                const IconComponent = getNavIcon(item.name);
                return (
                  <div key={item.name} className="flex flex-col rounded-xl bg-slate-50 border border-slate-100 overflow-hidden">
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between p-3.5 sm:p-4 hover:bg-cyan-50/70 active:scale-[0.99] transition-all group"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 group-hover:text-cyan-600 group-hover:border-cyan-200 shadow-sm transition-colors shrink-0">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-cyan-600 transition-colors truncate">
                            {item.name}
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1">
                            {item.desc}
                          </div>
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                    </Link>

                    {/* Submenu items on mobile */}
                    {item.children && item.children.length > 0 && (
                      <div className="px-4 pb-3 pt-1 border-t border-slate-200/50 flex flex-wrap gap-1.5 bg-white/40">
                        {item.children.slice(0, 3).map((c) => (
                          <Link
                            key={c.name}
                            href={c.href}
                            onClick={closeMenu}
                            className="text-[11px] font-medium text-slate-600 bg-white hover:text-cyan-600 hover:border-cyan-300 border border-slate-200 rounded px-2 py-0.5 transition-colors"
                          >
                            {c.name}
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
