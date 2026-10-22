'use client';

import { useEffect, useCallback, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setProgress(scrolled);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div
      className="fixed top-0 left-0 w-full z-[100] h-[2px] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] transition-none shadow-[0_0_8px_rgba(0,212,255,0.7)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
