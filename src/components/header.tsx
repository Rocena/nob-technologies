"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "./ui/layout";
import { Menu, X, ArrowRight, Phone, Mail, Layers, Globe, Star, BookOpen, Info, DollarSign, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedLogo } from "./AnimatedLogo";
import { GlowButton } from "./GlowButton";
import { SearchButton } from "./SearchButton";
import { usePalette } from "./CommandPaletteProvider";

interface NavItem {
  name: string;
  href: string;
  desc: string;
}

const DEFAULT_NAV: NavItem[] = [
  { name: 'Solutions', href: '/services', desc: 'Réseaux, Cloud & Cybersécurité pour entreprises' },
  { name: 'Secteurs', href: '/secteurs', desc: 'Écosystèmes taillés pour vos opérations critiques' },
  { name: 'Réalisations', href: '/realisations', desc: 'Études de cas et déploiements à grande échelle' },
  { name: 'Blog', href: '/articles', desc: 'Chroniques tech et retours d’expérience terrain' },
  { name: 'À propos', href: '/a-propos', desc: 'Culture d’ingénierie et expertise certifiée' },
  { name: 'Tarifs', href: '/tarifs', desc: 'Grille tarifaire et devis sur-mesure' },
];

const getNavIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'solutions': return Layers;
    case 'secteurs': return Globe;
    case 'réalisations': return Star;
    case 'blog': return BookOpen;
    case 'à propos': return Info;
    case 'tarifs': return DollarSign;
    default: return ArrowRight;
  }
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>(DEFAULT_NAV);
  const { setOpen: openSearch } = usePalette();

  // Fetch dynamic pages marked to be included in navigation
  useEffect(() => {
    fetch('/api/navigation-pages')
      .then((res) => res.json())
      .then((data) => {
        if (data?.pages && Array.isArray(data.pages) && data.pages.length > 0) {
          const existingHrefs = new Set(DEFAULT_NAV.map((i) => i.href));
          const dynamicPages = data.pages.filter((p: NavItem) => !existingHrefs.has(p.href));
          setNavItems([...DEFAULT_NAV, ...dynamicPages]);
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
                    <Link href={item.href} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors py-6 flex items-center gap-1">
                      {item.name}
                      <svg className="w-3 h-3 text-slate-400 group-hover:text-accent transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>

                    {/* Desktop Hover Card Preview */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_16px_40px_rgba(0,0,0,0.08)] rounded-xl p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-bl-full pointer-events-none" />
                        <Link href={item.href} className="block group/link relative z-10">
                          <h5 className="text-slate-900 font-bold mb-1.5 group-hover/link:text-accent transition-colors flex items-center justify-between text-sm">
                            {item.name}
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-accent" />
                          </h5>
                          <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </nav>

              {/* Desktop Quick Actions (Search is computer only xl, CTA is lg+) */}
              <div className="hidden lg:flex items-center gap-3">
                <SearchButton />
                <GlowButton href="/contact">Nous contacter</GlowButton>
              </div>

              {/* Mobile & Tablet Toggle Button (Strictly Burger Toggle only) */}
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

      {/* Mobile & Tablet Navigation Overlay (Clean full width toggle, no side clipping) */}
      <div 
        id="mobile-nav-drawer"
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop Tint with touch & click dismiss */}
        <div 
          onClick={closeMenu} 
          onTouchEnd={(e) => {
            e.preventDefault();
            closeMenu();
          }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          aria-hidden="true" 
        />

        {/* Drawer Content Body: Full width on mobile & tablet, cleanly attached below header bar */}
        <div className={cn(
          "absolute inset-x-0 top-16 sm:top-24 bottom-0 bg-white shadow-2xl flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-out",
          isOpen ? "translate-y-0" : "-translate-y-4"
        )}>
          {/* Main Navigation Links */}
          <div className="p-5 sm:p-8 max-w-3xl mx-auto w-full space-y-4">
            <div className="pb-2 border-b border-slate-100">
              <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                Menu Principal
              </p>
            </div>

            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {navItems.map((item) => {
                const IconComponent = getNavIcon(item.name);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-slate-50 hover:bg-cyan-50/70 border border-slate-100 hover:border-cyan-200 active:scale-[0.99] transition-all group"
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
                );
              })}
            </nav>
          </div>

          {/* Drawer Footer with Quick Calls & Primary CTA */}
          <div className="p-5 sm:p-8 bg-slate-50/90 border-t border-slate-200 mt-auto shrink-0">
            <div className="max-w-3xl mx-auto w-full space-y-3">
              <GlowButton href="/contact" onClick={closeMenu} className="w-full h-12 text-sm sm:text-base shadow-md">
                Démarrer un projet
              </GlowButton>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href="tel:+221338140435"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-cyan-600 hover:border-cyan-200 transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span className="truncate">+221 33 814 04 35</span>
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
                Dakar, Sénégal • Pôle Ingénierie 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
