"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "./ui/layout";
import { Menu, X, ArrowRight, Phone, Mail, Layers, Globe, Star, BookOpen, Info, DollarSign, Search, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedLogo } from "./AnimatedLogo";
import { GlowButton } from "./GlowButton";
import { useQuoteModal } from "./EngineerModalContext";
import { SearchButton } from "./SearchButton";
import { usePalette } from "./CommandPaletteProvider";

interface NavItem {
  id?: string;
  name: string;
  href: string;
  badge?: string;
  desc: string;
  order?: number;
}

const DEFAULT_NAV: NavItem[] = [
  { 
    id: 'solutions',
    name: 'Services', 
    href: '/services', 
    badge: 'Infrastructures & Infogérance',
    desc: 'Infrastructures haute disponibilité, réseaux & fibre, cybersécurité d’entreprise (Sophos, Fortinet), Cloud hybride, conception d’ERP sur-mesure (Dolibarr, Odoo), téléphonie VoIP et infogérance 24/7.',
    order: 1,
  },
  { 
    id: 'formations',
    name: 'Formations', 
    href: '/formations', 
    badge: 'Cursus 6 Mois & Labs',
    desc: 'Cursus intensifs d’excellence sur 6 mois, préparation aux certifications mondiales (Cisco CCNA/CCNP, Fortinet NSE, Sophos, ISO 27001), ateliers pratiques dirigés et automatisation IA.',
    order: 2,
  },
  { 
    id: 'partenaires',
    name: 'Partenaires', 
    href: '/partenaires', 
    badge: 'Écosystème Certifié',
    desc: 'Alliances technologiques et agréments constructeurs officiels avec les leaders mondiaux de l’IT : Sophos, Fortinet, Cisco, Dell Technologies, Microsoft 365, Acronis et Veritas.',
    order: 3,
  },
  { 
    id: 'realisations',
    name: 'Réalisations', 
    href: '/realisations', 
    badge: 'Projets Déployés',
    desc: 'Déploiements d’infrastructures informatiques critiques, success stories d’entreprises (Parc Exotique du Sénégal), intégrations ERP et modernisation de parcs informatiques.',
    order: 4,
  },
  { 
    id: 'a-propos',
    name: 'Entreprise', 
    href: '/a-propos', 
    badge: 'Cabinet d’Ingénierie',
    desc: 'Découvrez NOB TECHNOLOGIES : notre culture d’ingénierie pure, notre équipe d’experts certifiés, nos engagements de cyber-résilience, nos actualités technologiques et nos carrières.',
    order: 5,
  },
  { 
    id: 'contact',
    name: 'Contact', 
    href: '/contact', 
    badge: 'Étude & Devis 24h',
    desc: 'Échangez directement avec un ingénieur d’affaires, auditez vos systèmes et recevez une proposition technique personnalisée sous 24h ouvrées.',
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
            const existingIndex = updatedNav.findIndex((i: NavItem) => i.href === p.href);
            if (existingIndex === -1) {
              updatedNav.push({
                name: p.name,
                href: p.href,
                desc: p.desc,
                badge: 'Page Dédiée',
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
              <nav className="hidden lg:flex items-center gap-2 xl:gap-5">
                {navItems.map((item) => (
                  <div key={item.name} className="relative group">
                    <Link 
                      href={item.href} 
                      className="text-sm font-semibold text-slate-700 hover:text-cyan-600 transition-colors py-6 px-1.5 flex items-center gap-1"
                    >
                      {item.name}
                    </Link>

                    {/* Desktop Single Menu Summary Hover Card */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50 w-[380px]">
                      <div className="bg-white/98 backdrop-blur-2xl border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-2xl p-4 sm:p-5 relative overflow-hidden">
                        {/* Discrete NOBTECH Shield Watermark in top-right */}
                        <div className="absolute -top-2 -right-2 w-20 h-20 opacity-[0.08] pointer-events-none select-none overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src="/images/nobtech-shield.png" 
                            alt="" 
                            className="w-full h-full object-contain" 
                          />
                        </div>
                        
                        <div className="flex items-center justify-between gap-2 mb-2 relative z-10">
                          {item.badge && (
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 border border-cyan-200/60 px-2 py-0.5 rounded-md">
                              {item.badge}
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-slate-400">NOBTECH</span>
                        </div>

                        <Link href={item.href} className="block group/link relative z-10">
                          <h5 className="text-slate-900 font-bold mb-1.5 group-hover/link:text-cyan-600 transition-colors flex items-center justify-between text-sm">
                            <span>{item.name}</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-cyan-600" />
                          </h5>
                          <p className="text-xs text-slate-500 leading-relaxed mb-3">{item.desc}</p>
                          
                          <div className="pt-2.5 border-t border-slate-100 flex items-center text-xs font-semibold text-cyan-600 group-hover/link:underline">
                            <span>Découvrir la page {item.name}</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </div>
                        </Link>
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
                Menu &bull; Nobtech Navigation
              </p>
              <span className="text-[10px] font-mono font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded">
                NOBTECH OS
              </span>
            </div>

            <nav className="flex flex-col gap-2.5">
              {navItems.map((item) => {
                const IconComponent = getNavIcon(item.name);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-start justify-between p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-cyan-50/70 hover:border-cyan-300 transition-all group"
                  >
                    <div className="flex items-start gap-3.5 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm shrink-0 group-hover:text-cyan-600 group-hover:border-cyan-200 transition-colors mt-0.5">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-700 bg-cyan-100/70 px-1.5 py-0.5 rounded">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-600">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="p-2 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
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
                Azura de l’Aéroport, 1SS lot N° 79, Dakar Sénégal
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
