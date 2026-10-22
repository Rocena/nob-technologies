import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getPayloadClient } from '@/lib/payload';

const TIMEZONE_TO_LOCATION: Record<string, { code: string; city: string }> = {
  'Africa/Dakar': { code: 'SN', city: 'Dakar' },
  'Africa/Abidjan': { code: 'CI', city: 'Abidjan' },
  'Africa/Bamako': { code: 'ML', city: 'Bamako' },
  'Africa/Conakry': { code: 'GN', city: 'Conakry' },
  'Africa/Ouagadougou': { code: 'BF', city: 'Ouagadougou' },
  'Africa/Lome': { code: 'TG', city: 'Lomé' },
  'Africa/Porto-Novo': { code: 'BJ', city: 'Cotonou' },
  'Africa/Niamey': { code: 'NE', city: 'Niamey' },
  'Africa/Nouakchott': { code: 'MR', city: 'Nouakchott' },
  'Africa/Banjul': { code: 'GM', city: 'Banjul' },
  'Africa/Bissau': { code: 'GW', city: 'Bissau' },
  'Africa/Douala': { code: 'CM', city: 'Douala' },
  'Africa/Libreville': { code: 'GA', city: 'Libreville' },
  'Africa/Brazzaville': { code: 'CG', city: 'Brazzaville' },
  'Africa/Kinshasa': { code: 'CD', city: 'Kinshasa' },
  'Africa/Lubumbashi': { code: 'CD', city: 'Lubumbashi' },
  'Africa/Ndjamena': { code: 'TD', city: "N'Djaména" },
  'Africa/Bangui': { code: 'CF', city: 'Bangui' },
  'Africa/Casablanca': { code: 'MA', city: 'Casablanca' },
  'Africa/Algiers': { code: 'DZ', city: 'Alger' },
  'Africa/Tunis': { code: 'TN', city: 'Tunis' },
  'Africa/Lagos': { code: 'NG', city: 'Lagos' },
  'Africa/Accra': { code: 'GH', city: 'Accra' },
  'Africa/Nairobi': { code: 'KE', city: 'Nairobi' },
  'Africa/Johannesburg': { code: 'ZA', city: 'Johannesburg' },
  'Europe/Paris': { code: 'FR', city: 'Paris' },
  'Europe/Brussels': { code: 'BE', city: 'Bruxelles' },
  'Europe/Zurich': { code: 'CH', city: 'Genève' },
  'Europe/London': { code: 'GB', city: 'Londres' },
  'Europe/Berlin': { code: 'DE', city: 'Berlin' },
  'Europe/Madrid': { code: 'ES', city: 'Madrid' },
  'Europe/Rome': { code: 'IT', city: 'Rome' },
  'Europe/Lisbon': { code: 'PT', city: 'Lisbonne' },
  'Europe/Amsterdam': { code: 'NL', city: 'Amsterdam' },
  'America/Montreal': { code: 'CA', city: 'Montréal' },
  'America/Toronto': { code: 'CA', city: 'Toronto' },
  'America/Vancouver': { code: 'CA', city: 'Vancouver' },
  'America/New_York': { code: 'US', city: 'New York' },
  'America/Chicago': { code: 'US', city: 'Chicago' },
  'America/Los_Angeles': { code: 'US', city: 'Los Angeles' },
  'Asia/Dubai': { code: 'AE', city: 'Dubaï' },
};

const COUNTRY_DEFAULT_CAPITAL: Record<string, string> = {
  SN: 'Dakar',
  FR: 'Paris',
  CI: 'Abidjan',
  ML: 'Bamako',
  GN: 'Conakry',
  BF: 'Ouagadougou',
  CM: 'Douala',
  GA: 'Libreville',
  CG: 'Brazzaville',
  CD: 'Kinshasa',
  TG: 'Lomé',
  BJ: 'Cotonou',
  NE: 'Niamey',
  MR: 'Nouakchott',
  MA: 'Casablanca',
  DZ: 'Alger',
  TN: 'Tunis',
  BE: 'Bruxelles',
  CH: 'Genève',
  CA: 'Montréal',
  US: 'New York',
  GB: 'Londres',
  DE: 'Berlin',
  ES: 'Madrid',
  IT: 'Rome',
  AE: 'Dubaï',
};

function getFrenchCountryName(code: string, fallback?: string): string {
  const cleanCode = (code || '').trim().toUpperCase();
  if (cleanCode.length === 2) {
    try {
      const displayNames = new Intl.DisplayNames(['fr'], { type: 'region' });
      const name = displayNames.of(cleanCode);
      if (name && name !== cleanCode) return name;
    } catch {}
  }
  return fallback || cleanCode || 'International';
}

function parseUserAgent(ua: string) {
  const lower = ua.toLowerCase();

  let device: 'mobile' | 'desktop' | 'tablet' = 'desktop';
  if (/ipad|tablet|playbook|silk|(android(?!.*mobile))/i.test(lower)) {
    device = 'tablet';
  } else if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(lower)) {
    device = 'mobile';
  }

  let browser = 'Autre';
  if (/edg\//i.test(lower)) browser = 'Edge';
  else if (/opr\/|opera/i.test(lower)) browser = 'Opera';
  else if (/samsungbrowser/i.test(lower)) browser = 'Samsung Internet';
  else if (/chrome|crios/i.test(lower)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(lower)) browser = 'Firefox';
  else if (/safari/i.test(lower) && !/chrome|crios/i.test(lower)) browser = 'Safari';

  let os = 'Autre';
  if (/windows/i.test(lower)) os = 'Windows';
  else if (/iphone|ipad|ipod/i.test(lower)) os = 'iOS';
  else if (/android/i.test(lower)) os = 'Android';
  else if (/macintosh|mac os x/i.test(lower)) os = 'macOS';
  else if (/linux/i.test(lower)) os = 'Linux';

  return { device, browser, os };
}

async function lookupIpGeoServerSide(ip: string): Promise<{ countryCode?: string; country?: string; city?: string }> {
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return {};
  }
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,countryCode,city&lang=fr`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (data?.status === 'success' && data?.countryCode) {
        return {
          countryCode: String(data.countryCode).toUpperCase(),
          country: data.country || undefined,
          city: data.city || undefined,
        };
      }
    }
  } catch {}
  return {};
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      type = 'pageview',
      path = '/',
      title = '',
      referrer = '',
      elementText = '',
      elementId = '',
      visitorId = '',
      sessionId = '',
      clientDevice,
      clientOs,
      clientBrowser,
      timezone = '',
      geoCountry,
      geoCountryCode,
      geoCity,
    } = body;

    if (typeof path === 'string' && (path.startsWith('/admin') || path === '/root')) {
      return NextResponse.json({ success: true, ignored: true });
    }

    const headersList = await headers();
    const ua = headersList.get('user-agent') || '';
    const parsedUa = parseUserAgent(ua);

    const device: 'mobile' | 'desktop' | 'tablet' =
      clientDevice === 'mobile' || clientDevice === 'tablet' || clientDevice === 'desktop'
        ? clientDevice
        : parsedUa.device;
    const os = typeof clientOs === 'string' && clientOs ? clientOs : parsedUa.os;
    const browser = typeof clientBrowser === 'string' && clientBrowser ? clientBrowser : parsedUa.browser;

    // 1. Vérifier les en-têtes Edge (Vercel / Cloudflare)
    const headerCountryCode = (
      headersList.get('x-vercel-ip-country') ||
      headersList.get('cf-ipcountry') ||
      headersList.get('x-country-code') ||
      ''
    )
      .trim()
      .toUpperCase();

    let headerCity =
      headersList.get('x-vercel-ip-city') ||
      headersList.get('cf-ipcity') ||
      headersList.get('x-city') ||
      '';
    if (headerCity) {
      try {
        headerCity = decodeURIComponent(headerCity);
      } catch {}
    }

    // 2. Combiner avec la géolocalisation IP publique côté client ou serveur
    let resolvedCode =
      (typeof geoCountryCode === 'string' && geoCountryCode.trim().length === 2
        ? geoCountryCode.trim().toUpperCase()
        : '') ||
      (headerCountryCode.length === 2 ? headerCountryCode : '');

    let resolvedCity =
      (typeof geoCity === 'string' && geoCity.trim() ? geoCity.trim() : '') ||
      (headerCity && headerCity !== 'Unknown' && headerCity !== 'localhost' ? headerCity : '');

    let resolvedCountryName =
      typeof geoCountry === 'string' && geoCountry.trim() ? geoCountry.trim() : '';

    // 3. Si aucun code pays ni en-tête n'est présent, tenter la résolution IP serveur
    if (!resolvedCode) {
      const forwardedFor = headersList.get('x-forwarded-for');
      const clientIp = forwardedFor?.split(',')[0]?.trim() || headersList.get('x-real-ip') || '';
      const ipGeo = await lookupIpGeoServerSide(clientIp);
      if (ipGeo.countryCode) {
        resolvedCode = ipGeo.countryCode;
        if (!resolvedCity && ipGeo.city) resolvedCity = ipGeo.city;
        if (!resolvedCountryName && ipGeo.country) resolvedCountryName = ipGeo.country;
      }
    }

    // 4. Fallback intelligent sur le fuseau horaire réel du navigateur (ex: Africa/Dakar, Europe/Paris, Africa/Libreville)
    if (!resolvedCode && typeof timezone === 'string' && TIMEZONE_TO_LOCATION[timezone]) {
      resolvedCode = TIMEZONE_TO_LOCATION[timezone].code;
      if (!resolvedCity) resolvedCity = TIMEZONE_TO_LOCATION[timezone].city;
    } else if (!resolvedCity && typeof timezone === 'string' && TIMEZONE_TO_LOCATION[timezone]) {
      if (!resolvedCode || TIMEZONE_TO_LOCATION[timezone].code === resolvedCode) {
        resolvedCity = TIMEZONE_TO_LOCATION[timezone].city;
      }
    }

    const finalCountryCode = resolvedCode && resolvedCode.length === 2 ? resolvedCode : 'SN';
    const finalCountry = getFrenchCountryName(finalCountryCode, resolvedCountryName);
    const finalCity =
      resolvedCity ||
      COUNTRY_DEFAULT_CAPITAL[finalCountryCode] ||
      finalCountry;

    const validTypes = ['pageview', 'click', 'whatsapp_click', 'call_click', 'download_brochure', 'form_submit'];
    const safeType = validTypes.includes(type) ? type : 'click';

    const payload = await getPayloadClient();

    await (payload as any).create({
      collection: 'analytics-events',
      data: {
        type: safeType as any,
        path: typeof path === 'string' ? path.slice(0, 200) : '/',
        title: typeof title === 'string' ? title.slice(0, 200) : '',
        referrer: typeof referrer === 'string' ? referrer.slice(0, 200) : '',
        elementText: typeof elementText === 'string' ? elementText.slice(0, 100) : '',
        elementId: typeof elementId === 'string' ? elementId.slice(0, 100) : '',
        visitorId: typeof visitorId === 'string' && visitorId ? visitorId.slice(0, 100) : 'v_anon',
        sessionId: typeof sessionId === 'string' ? sessionId.slice(0, 100) : '',
        country: finalCountry,
        countryCode: finalCountryCode,
        city: finalCity,
        device,
        browser,
        os,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.warn('Analytics track warning:', err?.message);
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
