'use client'

import React, { useLayoutEffect, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CustomNav } from './CustomNav';
import { AdminDock } from './AdminDock';
import { AdminTopBar } from './AdminTopBar';
import { InactivityGuard } from './InactivityGuard';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const GlobalUIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname() || '';

  const [darkWallpaper, setDarkWallpaper] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('nob_dark_wallpaper') === 'true'
          || localStorage.getItem('nob-admin-dark-wallpaper') === 'true'
          || document.documentElement.getAttribute('data-nob-theme') === 'dark';
      } catch {
        return false;
      }
    }
    return false;
  });

  // Applique les attributs de thème de façon synchrone sur <html> avant le paint
  useIsomorphicLayoutEffect(() => {
    try {
      const isDark = localStorage.getItem('nob_dark_wallpaper') === 'true'
        || localStorage.getItem('nob-admin-dark-wallpaper') === 'true';
      const theme = isDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-nob-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const onToggle = () => {
      setDarkWallpaper((prev) => {
        const next = !prev;
        const theme = next ? 'dark' : 'light';
        document.documentElement.setAttribute('data-nob-theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        try {
          localStorage.setItem('nob_dark_wallpaper', String(next));
          localStorage.setItem('nob-admin-dark-wallpaper', String(next));
        } catch { /* ignore */ }

        // Différé hors de la passe de rendu pour éviter d'invalider d'autres composants en cours de rendu
        setTimeout(() => {
          window.dispatchEvent(new Event('nob:wallpaper-changed'));
          window.dispatchEvent(new Event('nob:theme-changed'));
        }, 0);

        return next;
      });
    };

    window.addEventListener('nob:toggle-dark-wallpaper', onToggle);
    return () => window.removeEventListener('nob:toggle-dark-wallpaper', onToggle);
  }, []);

  return (
    <>
      {children}
      <CustomNav />
      <InactivityGuard />
      <AdminTopBar darkWallpaper={darkWallpaper} />
      <AdminDock darkWallpaper={darkWallpaper} />
    </>
  );
};
