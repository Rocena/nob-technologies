'use client';

import { useEffect, useCallback, useState } from 'react';
import { GlowButton } from '@/components/GlowButton';

export default function StickyCallout() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check sessionStorage on mount
    if (typeof window !== 'undefined') {
      const wasDismissed = sessionStorage.getItem('stickyCalloutDismissed') === 'true';
      if (wasDismissed) setDismissed(true);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    setVisible(progress >= 0.4);
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
      aria-label="Démarrer un projet"
      className={[
        'fixed bottom-0 left-0 right-0 z-40',
        'border-t border-white/10',
        'bg-[#020617]/95 backdrop-blur-md',
        'transition-all duration-500 ease-out',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-full pointer-events-none',
      ].join(' ')}
    >
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
        <div className="text-center sm:text-left">
          <p className="text-sm sm:text-base font-medium text-white">
            Besoin d&apos;une solution informatique sur mesure&nbsp;?
          </p>
          <p className="text-xs sm:text-sm text-white/50 hidden sm:block">
            Nos experts répondent sous 24h.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <GlowButton
            href="/contact"
            className="!h-10 !px-6 !text-sm"
          >
            Démarrer un projet
          </GlowButton>

          <button
            onClick={dismiss}
            aria-label="Fermer"
            className="text-white/40 hover:text-white/80 transition-colors flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
