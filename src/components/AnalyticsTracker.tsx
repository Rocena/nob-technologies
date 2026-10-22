'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface ClientGeoInfo {
  country?: string;
  countryCode?: string;
  city?: string;
}

const GEO_STORAGE_KEY = 'nob_geo_v2';

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

function detectClientDeviceInfo() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return { device: 'desktop' as const, os: 'Autre', browser: 'Autre' };
  }

  const ua = navigator.userAgent || '';
  const lower = ua.toLowerCase();
  const maxTouchPoints = navigator.maxTouchPoints || 0;
  const screenWidth = window.screen?.width || window.innerWidth || 1280;

  // Detect iPadOS 13+ (reports Macintosh in UA but has multi-touch)
  const isModernIpad = /macintosh/i.test(ua) && maxTouchPoints > 1;

  // Device category
  let device: 'mobile' | 'tablet' | 'desktop' = 'desktop';
  if (
    isModernIpad ||
    /ipad|tablet|playbook|silk|(android(?!.*mobile))/i.test(lower) ||
    (maxTouchPoints > 0 && screenWidth >= 600 && screenWidth <= 1024 && /android| touch/i.test(lower))
  ) {
    device = 'tablet';
  } else if (
    (navigator as any).userAgentData?.mobile === true ||
    /mobile|iphone|ipod|android.*mobile|blackberry|opera mini|iemobile|wpdesktop/i.test(lower) ||
    (maxTouchPoints > 0 && screenWidth < 600)
  ) {
    device = 'mobile';
  }

  // Operating System
  let os = 'Autre';
  if (isModernIpad || /ipad|iphone|ipod/i.test(lower)) os = 'iOS';
  else if (/android/i.test(lower)) os = 'Android';
  else if (/windows/i.test(lower)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(lower)) os = 'macOS';
  else if (/linux/i.test(lower)) os = 'Linux';

  // Browser
  let browser = 'Autre';
  if (/edg\//i.test(lower)) browser = 'Edge';
  else if (/opr\/|opera/i.test(lower)) browser = 'Opera';
  else if (/samsungbrowser/i.test(lower)) browser = 'Samsung Internet';
  else if (/chrome|crios/i.test(lower)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(lower)) browser = 'Firefox';
  else if (/safari/i.test(lower) && !/chrome|crios/i.test(lower)) browser = 'Safari';

  return { device, os, browser };
}

let geoPromise: Promise<ClientGeoInfo> | null = null;

async function resolveClientGeo(): Promise<ClientGeoInfo> {
  if (typeof window === 'undefined') return {};

  try {
    const cached = sessionStorage.getItem(GEO_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.countryCode) return parsed;
    }
  } catch {}

  if (!geoPromise) {
    geoPromise = (async () => {
      // 1. Primary silent GeoIP lookup (ipwho.is - fast, CORS enabled, no key required)
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 2500);
        const res = await fetch('https://ipwho.is/', {
          signal: controller.signal,
          cache: 'force-cache',
        });
        clearTimeout(timeout);
        if (res.ok) {
          const data = await res.json();
          if (data && data.success !== false && data.country_code) {
            const info: ClientGeoInfo = {
              countryCode: String(data.country_code).toUpperCase(),
              country: data.country || undefined,
              city: data.city || undefined,
            };
            try {
              sessionStorage.setItem(GEO_STORAGE_KEY, JSON.stringify(info));
            } catch {}
            return info;
          }
        }
      } catch {}

      // 2. Secondary silent fallback (freeipapi.com)
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 2500);
        const res = await fetch('https://freeipapi.com/api/json', {
          signal: controller.signal,
          cache: 'force-cache',
        });
        clearTimeout(timeout);
        if (res.ok) {
          const data = await res.json();
          if (data && data.countryCode) {
            const info: ClientGeoInfo = {
              countryCode: String(data.countryCode).toUpperCase(),
              country: data.countryName || undefined,
              city: data.cityName || undefined,
            };
            try {
              sessionStorage.setItem(GEO_STORAGE_KEY, JSON.stringify(info));
            } catch {}
            return info;
          }
        }
      } catch {}

      return {};
    })();
  }

  return geoPromise;
}

function sendAnalyticsEvent(payload: Record<string, any>) {
  try {
    const dataStr = JSON.stringify(payload);
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([dataStr], { type: 'application/json' });
      const queued = navigator.sendBeacon('/api/analytics/track', blob);
      if (queued) return;
    }
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: dataStr,
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  // 1. Détecteur invisible des Pages Vues (Pageview)
  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin') || pathname === '/root') {
      return;
    }

    if (lastTrackedPath.current === pathname) {
      return;
    }
    lastTrackedPath.current = pathname;

    let cancelled = false;

    (async () => {
      const visitorId = getOrSetId(localStorage, 'nob_vid', 'v');
      const sessionId = getOrSetId(sessionStorage, 'nob_sid', 's');
      const { device, os, browser } = detectClientDeviceInfo();
      const timezone =
        typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone || '' : '';
      const geo = await resolveClientGeo();

      if (cancelled) return;

      sendAnalyticsEvent({
        type: 'pageview',
        path: pathname,
        title: typeof document !== 'undefined' ? document.title : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        visitorId,
        sessionId,
        clientDevice: device,
        clientOs: os,
        clientBrowser: browser,
        timezone,
        geoCountry: geo.country,
        geoCountryCode: geo.countryCode,
        geoCity: geo.city,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  // 2. Détecteur invisible des Clics & Formulaires (Capture Phase pour ne rater aucun bouton)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleClick = async (e: MouseEvent) => {
      const currentPath = window.location.pathname || pathname || '/';
      if (currentPath.startsWith('/admin') || currentPath === '/root') {
        return;
      }

      const target = (e.target as HTMLElement)?.closest(
        'a, button, [role="button"], input[type="submit"], [data-track]'
      ) as HTMLElement | null;
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const rawText =
        target.getAttribute('data-track') ||
        target.innerText ||
        target.getAttribute('title') ||
        target.getAttribute('aria-label') ||
        (target as HTMLInputElement).value ||
        '';
      const text = rawText.replace(/\s+/g, ' ').trim();
      const id = target.id || target.getAttribute('name') || '';

      let type: string = 'click';
      const lowerHref = href.toLowerCase();
      const lowerText = text.toLowerCase();

      if (lowerHref.includes('wa.me') || lowerHref.includes('whatsapp') || lowerText.includes('whatsapp')) {
        type = 'whatsapp_click';
      } else if (lowerHref.startsWith('tel:') || lowerText.includes('appel')) {
        type = 'call_click';
      } else if (
        lowerHref.includes('/brochure') ||
        lowerText.includes('programme') ||
        lowerText.includes('syllabus') ||
        lowerText.includes('brochure')
      ) {
        type = 'download_brochure';
      }

      if (!text && type === 'click' && !href) return;

      const cleanText = (text || href || 'Bouton').slice(0, 90);
      const visitorId = getOrSetId(localStorage, 'nob_vid', 'v');
      const sessionId = getOrSetId(sessionStorage, 'nob_sid', 's');
      const { device, os, browser } = detectClientDeviceInfo();
      const timezone =
        typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone || '' : '';
      const geo = await resolveClientGeo();

      sendAnalyticsEvent({
        type,
        path: currentPath,
        title: typeof document !== 'undefined' ? document.title : '',
        elementText: cleanText,
        elementId: (id || href).slice(0, 90),
        visitorId,
        sessionId,
        clientDevice: device,
        clientOs: os,
        clientBrowser: browser,
        timezone,
        geoCountry: geo.country,
        geoCountryCode: geo.countryCode,
        geoCity: geo.city,
      });
    };

    const handleSubmit = async (e: SubmitEvent) => {
      const currentPath = window.location.pathname || pathname || '/';
      if (currentPath.startsWith('/admin') || currentPath === '/root') {
        return;
      }

      const form = e.target as HTMLFormElement | null;
      if (!form) return;

      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]') as HTMLElement | null;
      const label =
        (submitBtn?.innerText || (submitBtn as HTMLInputElement)?.value || `Formulaire (${currentPath})`)
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 90);

      const visitorId = getOrSetId(localStorage, 'nob_vid', 'v');
      const sessionId = getOrSetId(sessionStorage, 'nob_sid', 's');
      const { device, os, browser } = detectClientDeviceInfo();
      const timezone =
        typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone || '' : '';
      const geo = await resolveClientGeo();

      sendAnalyticsEvent({
        type: 'form_submit',
        path: currentPath,
        title: typeof document !== 'undefined' ? document.title : '',
        elementText: `Envoi : ${label}`,
        elementId: form.id || form.getAttribute('name') || currentPath,
        visitorId,
        sessionId,
        clientDevice: device,
        clientOs: os,
        clientBrowser: browser,
        timezone,
        geoCountry: geo.country,
        geoCountryCode: geo.countryCode,
        geoCity: geo.city,
      });
    };

    document.addEventListener('click', handleClick, { capture: true, passive: true });
    document.addEventListener('submit', handleSubmit, { capture: true, passive: true });
    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
      document.removeEventListener('submit', handleSubmit, { capture: true });
    };
  }, [pathname]);

  return null;
}
