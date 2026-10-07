'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Home, Layers, Globe, Star, Info, DollarSign, Briefcase, Award, Mail, HelpCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const COMMANDS = [
  { id: 'home',          label: 'Accueil',         href: '/',              icon: Home,       desc: 'Page principale de NOB TECHNOLOGIES' },
  { id: 'solutions',     label: 'Solutions',        href: '/services',      icon: Layers,     desc: 'Nos services IT, réseau et cybersécurité' },
  { id: 'secteurs',      label: 'Secteurs',         href: '/secteurs',      icon: Globe,      desc: 'Industries et secteurs que nous accompagnons' },
  { id: 'realisations',  label: 'Réalisations',     href: '/realisations',  icon: Star,       desc: 'Études de cas et projets réalisés' },
  { id: 'a-propos',      label: 'À propos',         href: '/a-propos',      icon: Info,       desc: 'Notre histoire, équipe et valeurs' },
  { id: 'tarifs',        label: 'Tarifs',           href: '/tarifs',        icon: DollarSign, desc: 'Nos offres et grilles tarifaires' },
  { id: 'carrieres',     label: 'Carrières',        href: '/carrieres',     icon: Briefcase,  desc: 'Rejoignez l\'équipe NOB TECHNOLOGIES' },
  { id: 'certifications',label: 'Certifications',   href: '/certifications',icon: Award,      desc: 'Nos certifications et partenariats' },
  { id: 'contact',       label: 'Contact',          href: '/contact',       icon: Mail,       desc: 'Contactez-nous, obtenez un devis' },
  { id: 'faq',           label: 'FAQ',              href: '/faq',           icon: HelpCircle, desc: 'Questions fréquemment posées' },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = COMMANDS.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.desc.toLowerCase().includes(query.toLowerCase())
  );

  // Reset state when opening
  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Scroll active item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.children[activeIndex] as HTMLElement | undefined;
    active?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const navigate = useCallback((href: string) => {
    router.push(href);
    onClose();
  }, [router, onClose]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[activeIndex]) navigate(filtered[activeIndex].href);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, filtered, activeIndex, navigate, onClose]);

  // Reset activeIndex on query change
  useEffect(() => { setActiveIndex(0); }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[8vh] sm:pt-[10vh] px-3 sm:px-4"
    >
      {/* Backdrop with click and touch close */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer" 
        onClick={onClose}
        onTouchEnd={(e) => {
          e.preventDefault();
          onClose();
        }}
        aria-hidden="true" 
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Palette de commandes"
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-xl rounded-2xl border border-white/10 bg-[#020617]/95 shadow-[0_32px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Search input header */}
        <div className="flex items-center gap-3 px-4 py-3.5 sm:py-4 border-b border-white/10">
          <Search className="w-5 h-5 text-[#00D4FF] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une page ou un service..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm sm:text-base outline-none min-w-0"
            aria-label="Recherche"
          />
          {query && (
            <button 
              type="button"
              onClick={() => setQuery('')} 
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
              aria-label="Effacer le texte"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Explicit Close Button (always accessible on tactile, tablet & computer) */}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-slate-300 hover:text-white transition-all text-xs font-medium cursor-pointer"
            aria-label="Fermer la recherche"
          >
            <X className="w-4 h-4 text-slate-300" />
            <span className="hidden sm:inline font-mono text-[11px]">Fermer</span>
          </button>
        </div>

        {/* Results list */}
        <ul
          ref={listRef}
          className="max-h-[400px] overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-white/10"
          role="listbox"
        >
          {filtered.length === 0 && (
            <li className="px-4 py-8 text-center text-slate-500 text-sm">
              Aucune page trouvée pour &ldquo;{query}&rdquo;
            </li>
          )}
          {filtered.map((cmd, i) => {
            const Icon = cmd.icon;
            return (
              <li
                key={cmd.id}
                role="option"
                aria-selected={i === activeIndex}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => navigate(cmd.href)}
                className={cn(
                  'mx-2 flex items-center gap-3 rounded-lg px-3 py-3 cursor-pointer transition-all duration-150',
                  i === activeIndex
                    ? 'bg-[#00D4FF]/10 text-[#00D4FF]'
                    : 'text-slate-300 hover:bg-white/5'
                )}
              >
                <div className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-colors',
                  i === activeIndex
                    ? 'bg-[#00D4FF]/10 border-[#00D4FF]/30'
                    : 'bg-white/5 border-white/10'
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold leading-tight">{cmd.label}</div>
                  <div className={cn(
                    'text-xs leading-tight mt-0.5 truncate',
                    i === activeIndex ? 'text-[#00D4FF]/60' : 'text-slate-500'
                  )}>
                    {cmd.desc}
                  </div>
                </div>
                {i === activeIndex && (
                  <kbd className="shrink-0 rounded border border-[#00D4FF]/30 bg-[#00D4FF]/10 px-1.5 py-0.5 text-[10px] font-mono text-[#00D4FF]">
                    ↵
                  </kbd>
                )}
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5">↑↓</kbd>
              naviguer
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5">↵</kbd>
              ouvrir
            </span>
          </div>
          <div className="text-[10px] font-mono text-slate-600">
            Ctrl+K pour ouvrir · Échap pour fermer
          </div>
        </div>
      </div>
    </div>
  );
}

/** Hook: opens palette on Ctrl+K / Cmd+K */
export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return { open, setOpen };
}
