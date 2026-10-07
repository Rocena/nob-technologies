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
        'fixed bottom-8 right-4 sm:right-8 z-50',
        'w-11 h-11 rounded-full',
        'bg-accent text-[#020617]',
        'flex items-center justify-center',
        'shadow-lg shadow-accent/30',
        'transition-all duration-300 ease-out',
        'hover:scale-110 hover:shadow-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
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
