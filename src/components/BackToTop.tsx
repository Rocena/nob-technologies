'use client';

import { useEffect, useCallback, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > 400);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Retour en haut"
      className={[
        'fixed bottom-20 right-4 sm:bottom-24 sm:right-8 z-40',
        'w-10 h-10 sm:w-11 sm:h-11 rounded-full',
        'bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white',
        'hover:bg-[#00D4FF] hover:border-[#00D4FF] hover:text-[#020617]',
        'flex items-center justify-center',
        'shadow-lg shadow-black/40',
        'transition-all duration-300 ease-out',
        'hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none',
      ].join(' ')}
    >
      {/* Up arrow SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
