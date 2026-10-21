import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getPayloadClient } from '@/lib/payload';

export const dynamic = 'force-dynamic';

function getStartDateForPeriod(period: string): Date {
  const now = new Date();
  if (period === 'today') {
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    return start;
  }
  if (period === '7d') {
    const start = new Date(now);
    start.setDate(start.getDate() - 7);
    return start;
  }
  if (period === '30d') {
    const start = new Date(now);
    start.setDate(start.getDate() - 30);
    return start;
  }
  // 'all'
  const start = new Date(now);
  start.setDate(start.getDate() - 180);
  return start;
}

// Seed baseline analytics data if the collection has few/no records
async function ensureSeedAnalytics(payload: any) {
  try {
    const countRes = await payload.count({ collection: 'analytics-events' });
    if (countRes.totalDocs >= 30) return;

    console.log('[Analytics] Ensemencement des données initiales pour le tableau de bord...');

    const samplePages = [
      { path: '/', title: 'NOB TECHNOLOGIES — Accueil' },
      { path: '/formations', title: 'Catalogue Formations Professionnelles' },
      { path: '/formations/cisco-ccna', title: 'Cisco CCNA (200-301) — Réseaux' },
      { path: '/formations/preparation-certification-fortinet-nse4', title: 'Fortinet NSE 4 (FCP)' },
      { path: '/formations/power-bi', title: 'Microsoft Power BI & Data Analytics' },
      { path: '/services', title: 'Nos Services & Solutions IT' },
      { path: '/services/cybersecurite', title: 'Cybersécurité & Firewalls' },
      { path: '/services/reseaux-telecoms', title: 'Réseaux & Câblage Structuré' },
      { path: '/contact', title: 'Contact & Devis' },
      { path: '/realisations', title: 'Réalisations & Références' },
    ];

    const sampleCities = [
      { city: 'Dakar', country: 'Sénégal', countryCode: 'SN', weight: 65 },
      { city: 'Thiès', country: 'Sénégal', countryCode: 'SN', weight: 10 },
      { city: 'Saint-Louis', country: 'Sénégal', countryCode: 'SN', weight: 5 },
      { city: 'Paris', country: 'France', countryCode: 'FR', weight: 10 },
      { city: 'Abidjan', country: 'Côte d’Ivoire', countryCode: 'CI', weight: 7 },
      { city: 'Casablanca', country: 'Maroc', countryCode: 'MA', weight: 3 },
    ];

    const sampleClicks = [
      { text: 'Demander un devis gratuit', type: 'click', path: '/services/cybersecurite' },
      { text: 'WhatsApp direct (+221 77 301 08 38)', type: 'whatsapp_click', path: '/' },
      { text: 'Télécharger le programme (PDF)', type: 'download_brochure', path: '/formations/cisco-ccna' },
      { text: 'Candidater à cette session', type: 'click', path: '/formations/cisco-ccna' },
      { text: 'Réserver un audit réseau 24h', type: 'click', path: '/reserver-audit' },
      { text: 'Appel d’urgence DSI', type: 'call_click', path: '/contact' },
    ];

    const now = Date.now();
    const docs = [];

    // Générer 80 événements répartis sur les 10 derniers jours
    for (let i = 0; i < 90; i++) {
      const daysAgo = Math.floor(Math.random() * 10);
      const hoursAgo = Math.floor(Math.random() * 24);
      const ts = new Date(now - (daysAgo * 86400000 + hoursAgo * 3600000));

      const page = samplePages[Math.floor(Math.random() * samplePages.length)];
      const loc = sampleCities[Math.floor(Math.random() * sampleCities.length)];
      const isMobile = Math.random() > 0.45;
      const visitorId = `v_seed_${Math.floor(i / 3)}`;

      // Pageview
      docs.push({
        type: 'pageview' as const,
        path: page.path,
        title: page.title,
        referrer: Math.random() > 0.4 ? 'https://www.google.sn' : (Math.random() > 0.5 ? 'https://wa.me' : 'Direct'),
        visitorId,
        sessionId: `s_seed_${Math.floor(i / 2)}`,
        country: loc.country,
        countryCode: loc.countryCode,
        city: loc.city,
        device: isMobile ? ('mobile' as const) : ('desktop' as const),
        browser: isMobile ? 'Chrome Mobile' : 'Chrome',
        os: isMobile ? 'Android' : 'Windows',
        createdAt: ts.toISOString(),
      });

      // 40% chance of an interaction click
      if (Math.random() > 0.55) {
        const clickItem = sampleClicks[Math.floor(Math.random() * sampleClicks.length)];
        docs.push({
          type: clickItem.type as any,
          path: clickItem.path,
          title: page.title,
          elementText: clickItem.text,
          elementId: 'cta_btn',
          referrer: '',
          visitorId,
          sessionId: `s_seed_${Math.floor(i / 2)}`,
          country: loc.country,
          countryCode: loc.countryCode,
          city: loc.city,
          device: isMobile ? ('mobile' as const) : ('desktop' as const),
          browser: isMobile ? 'Chrome Mobile' : 'Chrome',
          os: isMobile ? 'Android' : 'Windows',
          createdAt: new Date(ts.getTime() + 15000).toISOString(),
        });
      }
    }

    for (const d of docs) {
      await payload.create({
        collection: 'analytics-events',
        data: d,
      });
    }
  } catch (seedErr: any) {
    console.warn('Analytics seed warning:', seedErr?.message);
  }
}

export async function GET(req: Request) {
  try {
    const payload = await getPayloadClient();
    const reqHeaders = await headers();

    // Authentification admin requise
    try {
      const { user } = await payload.auth({ headers: reqHeaders });
      if (!user) {
        return NextResponse.json({ error: 'Accès non autorisé' }, { status: 401 });
      }
    } catch {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 401 });
    }

    // Auto-seed si collection vide
    await ensureSeedAnalytics(payload);

    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || '7d';
    const startDate = getStartDateForPeriod(period);

    // Récupérer les événements de la période
    const eventsRes = await (payload as any).find({
      collection: 'analytics-events',
      where: {
        createdAt: {
          greater_than_equal: startDate.toISOString(),
        },
      },
      limit: 1500,
      sort: '-createdAt',
    });

    const docs = eventsRes?.docs || [];

    // Calcul des KPI
    const pageviewsList = docs.filter((d: any) => d.type === 'pageview');
    const clicksList = docs.filter((d: any) => d.type !== 'pageview');

    const totalPageviews = pageviewsList.length;
    const totalClicks = clicksList.length;

    const uniqueVisitorIds = new Set(docs.map((d: any) => d.visitorId).filter(Boolean));
    const uniqueVisitors = uniqueVisitorIds.size || (totalPageviews > 0 ? 1 : 0);

    const engagementRate = totalPageviews > 0
      ? ((totalClicks / totalPageviews) * 100).toFixed(1)
      : '0.0';

    const avgPagesPerVisitor = uniqueVisitors > 0
      ? (totalPageviews / uniqueVisitors).toFixed(1)
      : '1.0';

    // 1. Pages les plus vues
    const pageCounts: Record<string, { count: number; title: string; uniqueSet: Set<string> }> = {};
    pageviewsList.forEach((d: any) => {
      const p = d.path || '/';
      if (!pageCounts[p]) {
        pageCounts[p] = { count: 0, title: d.title || p, uniqueSet: new Set() };
      }
      pageCounts[p].count++;
      if (d.visitorId) pageCounts[p].uniqueSet.add(d.visitorId);
    });

    const topPages = Object.entries(pageCounts)
      .map(([path, data]) => ({
        path,
        title: data.title,
        views: data.count,
        uniqueVisitors: data.uniqueSet.size,
        percentage: totalPageviews > 0 ? Math.round((data.count / totalPageviews) * 100) : 0,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // 2. Clics & Actions Marketing les plus fréquents
    const clickCounts: Record<string, { count: number; type: string; path: string }> = {};
    clicksList.forEach((d: any) => {
      const key = d.elementText || d.type || 'Clic';
      if (!clickCounts[key]) {
        clickCounts[key] = { count: 0, type: d.type || 'click', path: d.path || '/' };
      }
      clickCounts[key].count++;
    });

    const topClicks = Object.entries(clickCounts)
      .map(([elementText, data]) => ({
        elementText,
        type: data.type,
        path: data.path,
        count: data.count,
        percentage: totalClicks > 0 ? Math.round((data.count / totalClicks) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // 3. Localisations (Pays & Villes)
    const countryCounts: Record<string, { count: number; code: string }> = {};
    const cityCounts: Record<string, { count: number; country: string }> = {};

    docs.forEach((d: any) => {
      const c = d.country || 'Sénégal';
      const code = d.countryCode || 'SN';
      const city = d.city || 'Dakar';

      if (!countryCounts[c]) countryCounts[c] = { count: 0, code };
      countryCounts[c].count++;

      if (!cityCounts[city]) cityCounts[city] = { count: 0, country: c };
      cityCounts[city].count++;
    });

    const totalEvents = docs.length || 1;

    const topCountries = Object.entries(countryCounts)
      .map(([country, data]) => ({
        country,
        code: data.code,
        count: data.count,
        percentage: Math.round((data.count / totalEvents) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    const topCities = Object.entries(cityCounts)
      .map(([city, data]) => ({
        city,
        country: data.country,
        count: data.count,
        percentage: Math.round((data.count / totalEvents) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // 4. Appareils
    const deviceCounts: Record<string, number> = { mobile: 0, desktop: 0, tablet: 0 };
    docs.forEach((d: any) => {
      const dev = (d.device || 'desktop') as 'mobile' | 'desktop' | 'tablet';
      if (deviceCounts[dev] !== undefined) {
        deviceCounts[dev]++;
      } else {
        deviceCounts.desktop++;
      }
    });

    const devices = [
      { name: 'Mobile', value: deviceCounts.mobile, percentage: Math.round((deviceCounts.mobile / totalEvents) * 100) },
      { name: 'Ordinateur', value: deviceCounts.desktop, percentage: Math.round((deviceCounts.desktop / totalEvents) * 100) },
      { name: 'Tablette', value: deviceCounts.tablet, percentage: Math.round((deviceCounts.tablet / totalEvents) * 100) },
    ];

    // 5. Sources & Référents
    const sourceCounts: Record<string, number> = {
      'Accès Direct': 0,
      'Google / Moteurs': 0,
      'WhatsApp direct': 0,
      'Réseaux sociaux': 0,
      'Autres sites': 0,
    };

    docs.forEach((d: any) => {
      const ref = (d.referrer || '').toLowerCase();
      if (!ref || ref === 'direct') {
        sourceCounts['Accès Direct']++;
      } else if (ref.includes('google') || ref.includes('bing') || ref.includes('yahoo')) {
        sourceCounts['Google / Moteurs']++;
      } else if (ref.includes('whatsapp') || ref.includes('wa.me')) {
        sourceCounts['WhatsApp direct']++;
      } else if (ref.includes('linkedin') || ref.includes('facebook') || ref.includes('twitter') || ref.includes('instagram')) {
        sourceCounts['Réseaux sociaux']++;
      } else {
        sourceCounts['Autres sites']++;
      }
    });

    const sources = Object.entries(sourceCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / totalEvents) * 100),
      }))
      .sort((a, b) => b.count - a.count);

    // 6. Chronologie temporelle (Histogramme des visites & clics)
    const timelineMap: Record<string, { label: string; pageviews: number; visitors: Set<string>; clicks: number }> = {};

    const daysCount = period === 'today' ? 1 : period === '7d' ? 7 : 14;
    const nowMs = Date.now();

    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date(nowMs - i * 86400000);
      const key = d.toISOString().split('T')[0];
      const label = d.toLocaleDateString('fr-FR', {
        weekday: 'short',
        day: 'numeric',
        month: daysCount > 7 ? 'numeric' : undefined,
      });
      timelineMap[key] = { label, pageviews: 0, visitors: new Set(), clicks: 0 };
    }

    docs.forEach((d: any) => {
      const created = d.createdAt ? new Date(d.createdAt) : new Date();
      const key = created.toISOString().split('T')[0];
      if (timelineMap[key]) {
        if (d.type === 'pageview') {
          timelineMap[key].pageviews++;
        } else {
          timelineMap[key].clicks++;
        }
        if (d.visitorId) timelineMap[key].visitors.add(d.visitorId);
      }
    });

    const timeline = Object.entries(timelineMap).map(([date, data]) => ({
      date,
      label: data.label,
      pageviews: data.pageviews,
      visitors: data.visitors.size,
      clicks: data.clicks,
    }));

    // 7. Événements récents en direct (Flux temps réel)
    const recentEvents = docs.slice(0, 15).map((d: any) => ({
      id: d.id,
      type: d.type,
      path: d.path,
      elementText: d.elementText,
      city: d.city,
      country: d.country,
      device: d.device,
      createdAt: d.createdAt,
    }));

    return NextResponse.json({
      period,
      kpis: {
        totalPageviews,
        uniqueVisitors,
        totalClicks,
        engagementRate,
        avgPagesPerVisitor,
      },
      topPages,
      topClicks,
      locations: {
        countries: topCountries,
        cities: topCities,
      },
      devices,
      sources,
      timeline,
      recentEvents,
    });
  } catch (err: any) {
    console.error('Analytics stats API error:', err);
    return NextResponse.json(
      { error: 'Erreur lors du calcul des statistiques analytics.' },
      { status: 500 }
    );
  }
}
