'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function getOrSetId(storage: Storage, key: string, prefix: string): string {
  try {
    let id = storage.getItem(key);
    if (!id) {
      id = `${prefix}_${Math.random().toString(36).substring(2, 11)}_${Date.now().toString(36)}`;
      storage.setItem(key, id);
    }
    return id;
  } catch {
    return `${prefix}_fallback_${Date.now()}`;
  }
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  // 1. Suivi des Pages Vues (Pageview)
  useEffect(() => {
    // Ne pas tracer les pages d'administration internes
    if (!pathname || pathname.startsWith('/admin') || pathname === '/root') {
      return;
    }

    if (lastTrackedPath.current === pathname) {
      return;
    }
    lastTrackedPath.current = pathname;

    const visitorId = getOrSetId(localStorage, 'nob_vid', 'v');
    const sessionId = getOrSetId(sessionStorage, 'nob_sid', 's');

    const payload = {
      type: 'pageview',
      path: pathname,
      title: typeof document !== 'undefined' ? document.title : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      visitorId,
      sessionId,
    };

    try {
      const dataStr = JSON.stringify(payload);
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([dataStr], { type: 'application/json' });
        navigator.sendBeacon('/api/analytics/track', blob);
      } else {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: dataStr,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {}
  }, [pathname]);

  // 2. Suivi des Clics & Actions Marketing (Boutons, WhatsApp, Devis, Appels, Brochures)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleClick = (e: MouseEvent) => {
      if (!pathname || pathname.startsWith('/admin') || pathname === '/root') {
        return;
      }

      const target = (e.target as HTMLElement)?.closest('a, button, [role="button"]') as HTMLElement | null;
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const text = (target.innerText || target.getAttribute('title') || target.getAttribute('aria-label') || '').trim();
      const id = target.id || target.getAttribute('name') || '';

      let type: string = 'click';

      if (href.includes('wa.me') || href.includes('whatsapp')) {
        type = 'whatsapp_click';
      } else if (href.startsWith('tel:')) {
        type = 'call_click';
      } else if (href.includes('/brochure') || text.toLowerCase().includes('programme') || text.toLowerCase().includes('syllabus')) {
        type = 'download_brochure';
      } else if (text.toLowerCase().includes('devis') || href.includes('/devis') || href.includes('/contact')) {
        type = 'click';
      } else if (text.toLowerCase().includes('candidat') || text.toLowerCase().includes('inscr')) {
        type = 'click';
      }

      // Si le texte est vide et ce n'est pas un lien spécial, ne pas saturer
      if (!text && type === 'click' && !href) return;

      const cleanText = (text || href || 'Bouton sans texte').slice(0, 80);

      const visitorId = getOrSetId(localStorage, 'nob_vid', 'v');
      const sessionId = getOrSetId(sessionStorage, 'nob_sid', 's');

      const payload = {
        type,
        path: pathname,
        title: typeof document !== 'undefined' ? document.title : '',
        elementText: cleanText,
        elementId: id || href.slice(0, 80),
        visitorId,
        sessionId,
      };

      try {
        const dataStr = JSON.stringify(payload);
        if (navigator.sendBeacon) {
          const blob = new Blob([dataStr], { type: 'application/json' });
          navigator.sendBeacon('/api/analytics/track', blob);
        } else {
          fetch('/api/analytics/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: dataStr,
            keepalive: true,
          }).catch(() => {});
        }
      } catch {}
    };

    document.addEventListener('click', handleClick, { passive: true });
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [pathname]);

  return null;
}
