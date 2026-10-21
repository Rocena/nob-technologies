import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getPayloadClient } from '@/lib/payload';

const COUNTRY_NAMES: Record<string, string> = {
  SN: 'Sénégal',
  FR: 'France',
  CI: 'Côte d’Ivoire',
  ML: 'Mali',
  GN: 'Guinée',
  BF: 'Burkina Faso',
  CM: 'Cameroun',
  GA: 'Gabon',
  TG: 'Togo',
  BJ: 'Bénin',
  US: 'États-Unis',
  CA: 'Canada',
  BE: 'Belgique',
  CH: 'Suisse',
  MA: 'Maroc',
  ES: 'Espagne',
  IT: 'Italie',
  DE: 'Allemagne',
  GB: 'Royaume-Uni',
  AE: 'Émirats Arabes Unis',
};

function parseUserAgent(ua: string) {
  const lower = ua.toLowerCase();

  // Device
  let device: 'mobile' | 'desktop' | 'tablet' = 'desktop';
  if (/ipad|tablet|(android(?!.*mobile))/i.test(lower)) {
    device = 'tablet';
  } else if (/mobile|iphone|android|blackberry|opera mini|iemobile/i.test(lower)) {
    device = 'mobile';
  }

  // Browser
  let browser = 'Autre';
  if (/edg\//i.test(lower)) browser = 'Edge';
  else if (/chrome|crios/i.test(lower) && !/opr|opera/i.test(lower)) browser = 'Chrome';
  else if (/safari/i.test(lower) && !/chrome/i.test(lower)) browser = 'Safari';
  else if (/firefox|fxios/i.test(lower)) browser = 'Firefox';
  else if (/opr|opera/i.test(lower)) browser = 'Opera';
  else if (/samsungbrowser/i.test(lower)) browser = 'Samsung Internet';

  // OS
  let os = 'Autre';
  if (/windows/i.test(lower)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(lower)) os = 'macOS';
  else if (/iphone|ipad|ipod/i.test(lower)) os = 'iOS';
  else if (/android/i.test(lower)) os = 'Android';
  else if (/linux/i.test(lower)) os = 'Linux';

  return { device, browser, os };
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
    } = body;

    // Ne pas tracer les requêtes internes d'administration
    if (typeof path === 'string' && (path.startsWith('/admin') || path === '/root')) {
      return NextResponse.json({ success: true, ignored: true });
    }

    const headersList = await headers();
    const ua = headersList.get('user-agent') || '';
    const { device, browser, os } = parseUserAgent(ua);

    // Résolution GeoIP (Vercel, Cloudflare, ou Dakar par défaut en environnement local)
    const rawCountryCode = (
      headersList.get('x-vercel-ip-country') ||
      headersList.get('cf-ipcountry') ||
      headersList.get('x-country-code') ||
      'SN'
    ).toUpperCase();

    const countryCode = rawCountryCode.length === 2 ? rawCountryCode : 'SN';
    const country = COUNTRY_NAMES[countryCode] || countryCode;

    let city = headersList.get('x-vercel-ip-city') || headersList.get('x-city') || '';
    if (city) {
      try {
        city = decodeURIComponent(city);
      } catch {}
    }

    if (!city || city === 'Unknown' || city === 'localhost') {
      city = countryCode === 'SN' ? 'Dakar' : (countryCode === 'FR' ? 'Paris' : (countryCode === 'CI' ? 'Abidjan' : 'Dakar'));
    }

    const payload = await getPayloadClient();

    await (payload as any).create({
      collection: 'analytics-events',
      data: {
        type: type as any,
        path: typeof path === 'string' ? path.slice(0, 200) : '/',
        title: typeof title === 'string' ? title.slice(0, 200) : '',
        referrer: typeof referrer === 'string' ? referrer.slice(0, 200) : '',
        elementText: typeof elementText === 'string' ? elementText.slice(0, 100) : '',
        elementId: typeof elementId === 'string' ? elementId.slice(0, 100) : '',
        visitorId: typeof visitorId === 'string' ? visitorId.slice(0, 100) : 'v_anon',
        sessionId: typeof sessionId === 'string' ? sessionId.slice(0, 100) : '',
        country,
        countryCode,
        city,
        device,
        browser,
        os,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.warn('Analytics track warning:', err?.message);
    return NextResponse.json({ success: false }, { status: 200 }); // Always 200 to not block client
  }
}
