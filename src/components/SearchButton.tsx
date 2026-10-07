'use client';

import { usePalette } from './CommandPaletteProvider';
import { Search } from 'lucide-react';

export function SearchButton() {
  const { setOpen } = usePalette();
  return (
    <button
      onClick={() => setOpen(true)}
      aria-label="Ouvrir la recherche (Ctrl+K)"
      className="hidden xl:flex items-center gap-2 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 text-sm text-slate-400 hover:text-slate-600 transition-all duration-200 font-mono group"
    >
      <Search className="w-3.5 h-3.5 shrink-0 text-slate-500" />
      <span className="text-xs">Recherche</span>
      <kbd className="inline-flex items-center rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-400 group-hover:border-slate-300 transition-colors">
        Ctrl+K
      </kbd>
    </button>
  );
}
