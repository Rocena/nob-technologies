'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { CommandPalette } from '@/components/CommandPalette';

interface PaletteContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const PaletteContext = createContext<PaletteContextValue>({
  open: false,
  setOpen: () => {},
});

export function usePalette() {
  return useContext(PaletteContext);
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  // Global Ctrl+K / Cmd+K shortcut
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

  return (
    <PaletteContext.Provider value={{ open, setOpen }}>
      {children}
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </PaletteContext.Provider>
  );
}
