'use client';

import { useEffect, useCallback, useState } from 'react';
import Link from 'next/link';
import { Phone, ArrowRight, X } from 'lucide-react';
import { useQuoteModal } from '@/components/EngineerModalContext';

export default function StickyCallout() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { openQuoteModal } = useQuoteModal();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wasDismissed = sessionStorage.getItem('stickyCalloutDismissed') === 'true';
      if (wasDismissed) setDismissed(true);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    setVisible(progress >= 0.35);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('stickyCalloutDismissed', 'true');
  };

  if (dismissed) return null;

  return (
    <div
      role="complementary"
      aria-label="Accès rapide devis et ingénieur"
      className={[
        'fixed bottom-4 left-4 sm:bottom-6 sm:left-6 right-20 sm:right-auto z-40 max-w-md',
        'rounded-2xl border border-white/15',
        'bg-[#020617]/95 backdrop-blur-xl shadow-corporate-floating',
        'transition-all duration-300 ease-out',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-6 pointer-events-none',
      ].join(' ')}
    >
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <p className="text-xs sm:text-sm font-bold text-white truncate">
              Un projet réseau, sécurité ou ERP ?
            </p>
          </div>
          <p className="text-[11px] text-slate-400 truncate mt-0.5 hidden sm:block">
            Devis détaillé &amp; réponse d&apos;un ingénieur sous 24h.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="tel:+221773010838"
            title="Appeler le +221 77 301 08 38"
            className="hidden md:inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-emerald-400 border border-white/10 hover:border-emerald-500/40 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00D4FF] hover:bg-[#38BDF8] text-[#020617] font-bold text-xs transition-all cursor-pointer shadow-sm"
          >
            <span>Devis 24h</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold border border-white/10 transition-colors"
          >
            Contact
          </Link>

          <button
            type="button"
            onClick={dismiss}
            aria-label="Fermer"
            className="p-1 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/10 shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
