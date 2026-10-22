import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getPayloadClient } from '@/lib/payload';

export const dynamic = 'force-dynamic';

const COUNTRY_NAME_TO_CODE: Record<string, string> = {
  sénégal: 'SN',
  senegal: 'SN',
  france: 'FR',
  "côte d'ivoire": 'CI',
  'côte d’ivoire': 'CI',
  mali: 'ML',
  guinée: 'GN',
  'burkina faso': 'BF',
  cameroun: 'CM',
  gabon: 'GA',
  congo: 'CG',
  'rd congo': 'CD',
  togo: 'TG',
  bénin: 'BJ',
  niger: 'NE',
  mauritanie: 'MR',
  maroc: 'MA',
  algérie: 'DZ',
  tunisie: 'TN',
  belgique: 'BE',
  suisse: 'CH',
  canada: 'CA',
  'états-unis': 'US',
  'royaume-uni': 'GB',
  allemagne: 'DE',
  espagne: 'ES',
  italie: 'IT',
  'émirats arabes unis': 'AE',
};

function normalizeCountryCode(rawCode?: string, countryName?: string): string {
  const clean = (rawCode || '').trim().toUpperCase();
  if (clean.length === 2 && /^[A-Z]{2}$/.test(clean)) {
    return clean;
  }
  const lowerName = (countryName || '').trim().toLowerCase();
  if (lowerName && COUNTRY_NAME_TO_CODE[lowerName]) {
    return COUNTRY_NAME_TO_CODE[lowerName];
  }
  return 'SN';
}

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
  const start = new Date(now);
  start.setDate(start.getDate() - 365);
  return start;
}

// Nettoyer automatiquement les anciennes données fictives de démonstration (v_seed_*)
let seedPurged = false;
async function purgeFakeSeedAnalytics(payload: any) {
  if (seedPurged) return;
  seedPurged = true;
  try {
    const adapter: any = payload.db;
    if (adapter?.pool?.query) {
      await adapter.pool.query(`DELETE FROM "analytics_events" WHERE "visitor_id" LIKE 'v_seed_%';`);
    } else if (adapter?.client?.execute) {
      await adapter.client.execute(`DELETE FROM \`analytics_events\` WHERE \`visitor_id\` LIKE 'v_seed_%';`);
    } else {
      await payload.delete({
        collection: 'analytics-events',
        where: {
          visitorId: { like: 'v_seed_' },
        },
        overrideAccess: true,
      });
    }
  } catch (err: any) {
    console.warn('[Analytics] Purge seed warning:', err?.message);
  }
}

export async function GET(req: Request) {
  try {
    const payload = await getPayloadClient();
    const reqHeaders = await headers();

    try {
      const { user } = await payload.auth({ headers: reqHeaders });
      if (!user) {
        return NextResponse.json({ error: 'Accès non autorisé' }, { status: 401 });
      }
    } catch {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 401 });
    }

    // Supprimer définitivement les événements de démo fictifs pour ne garder que les données 100% réelles
    await purgeFakeSeedAnalytics(payload);

    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || '7d';
    const startDate = getStartDateForPeriod(period);

    const eventsRes = await (payload as any).find({
      collection: 'analytics-events',
      where: {
        and: [
          {
            createdAt: {
              greater_than_equal: startDate.toISOString(),
            },
          },
          {
            visitorId: {
              not_like: 'v_seed_',
            },
          },
        ],
      },
      limit: 5000,
      sort: '-createdAt',
    });

    const docs = (eventsRes?.docs || []).filter(
      (d: any) => !String(d.visitorId || '').startsWith('v_seed_')
    );

    // Visiteurs en ligne dans les 15 dernières minutes
    const fifteenMinAgo = Date.now() - 15 * 60 * 1000;
    const liveVisitorSet = new Set<string>();
    docs.forEach((d: any) => {
      const ts = d.createdAt ? new Date(d.createdAt).getTime() : 0;
      if (ts >= fifteenMinAgo && d.visitorId) {
        liveVisitorSet.add(d.visitorId);
      }
    });
    const liveVisitors = liveVisitorSet.size;

    const pageviewsList = docs.filter((d: any) => d.type === 'pageview');
    const clicksList = docs.filter((d: any) => d.type !== 'pageview');

    const totalPageviews = pageviewsList.length;
    const totalClicks = clicksList.length;

    const uniqueVisitorIds = new Set(docs.map((d: any) => d.visitorId).filter(Boolean));
    const uniqueVisitors = uniqueVisitorIds.size || (totalPageviews > 0 ? 1 : 0);

    const engagementRate =
      totalPageviews > 0 ? ((totalClicks / totalPageviews) * 100).toFixed(1) : '0.0';

    const avgPagesPerVisitor =
      uniqueVisitors > 0 ? (totalPageviews / uniqueVisitors).toFixed(1) : '0.0';

    // Base d'analyse d'audience : privilégier les pageviews pour les répartitions (ou tous les événements si aucun pageview)
    const audienceDocs = pageviewsList.length > 0 ? pageviewsList : docs;
    const totalAudienceEvents = audienceDocs.length || 1;

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
        uniqueVisitors: data.uniqueSet.size || 1,
        percentage: totalPageviews > 0 ? Math.round((data.count / totalPageviews) * 100) : 0,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 15);

    // 2. Clics & Actions Marketing les plus fréquents
    const clickCounts: Record<string, { count: number; type: string; path: string }> = {};
    clicksList.forEach((d: any) => {
      const key = `${d.elementText || d.type || 'Clic'}__${d.path || '/'}`;
      if (!clickCounts[key]) {
        clickCounts[key] = {
          count: 0,
          type: d.type || 'click',
          path: d.path || '/',
        };
      }
      clickCounts[key].count++;
    });

    const topClicks = Object.entries(clickCounts)
      .map(([compositeKey, data]) => {
        const elementText = compositeKey.split('__')[0];
        return {
          elementText,
          type: data.type,
          path: data.path,
          count: data.count,
          percentage: totalClicks > 0 ? Math.round((data.count / totalClicks) * 100) : 0,
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    // 3. Localisations (Pays & Villes avec codes ISO normalisés pour les drapeaux)
    const countryCounts: Record<string, { count: number; code: string; visitors: Set<string> }> = {};
    const cityCounts: Record<string, { count: number; country: string; code: string; visitors: Set<string> }> = {};

    audienceDocs.forEach((d: any) => {
      const c = (d.country || 'Sénégal').trim();
      const code = normalizeCountryCode(d.countryCode, c);
      const city = (d.city || 'Dakar').trim();

      if (!countryCounts[c]) {
        countryCounts[c] = { count: 0, code, visitors: new Set() };
      }
      countryCounts[c].count++;
      if (d.visitorId) countryCounts[c].visitors.add(d.visitorId);

      const cityKey = `${city}__${c}`;
      if (!cityCounts[cityKey]) {
        cityCounts[cityKey] = { count: 0, country: c, code, visitors: new Set() };
      }
      cityCounts[cityKey].count++;
      if (d.visitorId) cityCounts[cityKey].visitors.add(d.visitorId);
    });

    const topCountries = Object.entries(countryCounts)
      .map(([country, data]) => ({
        country,
        code: data.code,
        countryCode: data.code,
        count: data.count,
        uniqueVisitors: data.visitors.size || 1,
        percentage:
          audienceDocs.length > 0 ? Math.round((data.count / totalAudienceEvents) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 12);

    const topCities = Object.entries(cityCounts)
      .map(([cityKey, data]) => ({
        city: cityKey.split('__')[0],
        country: data.country,
        code: data.code,
        countryCode: data.code,
        count: data.count,
        uniqueVisitors: data.visitors.size || 1,
        percentage:
          audienceDocs.length > 0 ? Math.round((data.count / totalAudienceEvents) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 12);

    // 4. Appareils, Systèmes d'exploitation (OS) & Navigateurs
    const deviceCounts: Record<'mobile' | 'desktop' | 'tablet', number> = {
      mobile: 0,
      desktop: 0,
      tablet: 0,
    };
    const osCounts: Record<string, number> = {};
    const browserCounts: Record<string, number> = {};

    audienceDocs.forEach((d: any) => {
      const rawDev = String(d.device || 'desktop').toLowerCase();
      if (rawDev === 'mobile') deviceCounts.mobile++;
      else if (rawDev === 'tablet') deviceCounts.tablet++;
      else deviceCounts.desktop++;

      const osName = (d.os || 'Autre').trim();
      osCounts[osName] = (osCounts[osName] || 0) + 1;

      const brName = (d.browser || 'Autre').trim();
      browserCounts[brName] = (browserCounts[brName] || 0) + 1;
    });

    const hasEvents = audienceDocs.length > 0;
    const devices = [
      {
        key: 'desktop',
        device: 'Ordinateur',
        name: 'Ordinateur',
        count: deviceCounts.desktop,
        value: deviceCounts.desktop,
        percentage: hasEvents ? Math.round((deviceCounts.desktop / totalAudienceEvents) * 100) : 0,
      },
      {
        key: 'mobile',
        device: 'Mobile (Smartphone)',
        name: 'Mobile (Smartphone)',
        count: deviceCounts.mobile,
        value: deviceCounts.mobile,
        percentage: hasEvents ? Math.round((deviceCounts.mobile / totalAudienceEvents) * 100) : 0,
      },
      {
        key: 'tablet',
        device: 'Tablette',
        name: 'Tablette',
        count: deviceCounts.tablet,
        value: deviceCounts.tablet,
        percentage: hasEvents ? Math.round((deviceCounts.tablet / totalAudienceEvents) * 100) : 0,
      },
    ];

    const osList = Object.entries(osCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: hasEvents ? Math.round((count / totalAudienceEvents) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const browsers = Object.entries(browserCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: hasEvents ? Math.round((count / totalAudienceEvents) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    // 5. Sources & Référents
    const sourceCounts: Record<string, number> = {
      'Accès Direct': 0,
      'Google / Moteurs de recherche': 0,
      'WhatsApp direct': 0,
      'Réseaux sociaux (LinkedIn, Facebook...)': 0,
      'Autres sites référents': 0,
    };

    audienceDocs.forEach((d: any) => {
      const ref = (d.referrer || '').toLowerCase();
      if (!ref || ref === 'direct' || ref.includes('nobtech') || ref.includes('localhost')) {
        sourceCounts['Accès Direct']++;
      } else if (ref.includes('google') || ref.includes('bing') || ref.includes('yahoo') || ref.includes('duckduckgo')) {
        sourceCounts['Google / Moteurs de recherche']++;
      } else if (ref.includes('whatsapp') || ref.includes('wa.me')) {
        sourceCounts['WhatsApp direct']++;
      } else if (
        ref.includes('linkedin') ||
        ref.includes('facebook') ||
        ref.includes('twitter') ||
        ref.includes('x.com') ||
        ref.includes('instagram')
      ) {
        sourceCounts['Réseaux sociaux (LinkedIn, Facebook...)']++;
      } else {
        sourceCounts['Autres sites référents']++;
      }
    });

    const sources = Object.entries(sourceCounts)
      .map(([name, count]) => ({
        source: name,
        name,
        count,
        percentage: hasEvents ? Math.round((count / totalAudienceEvents) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // 6. Chronologie temporelle
    const timelineMap: Record<
      string,
      { label: string; pageviews: number; visitors: Set<string>; clicks: number }
    > = {};

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

    // 7. Flux temps réel des dernières visites & actions réelles
    const recentEvents = docs.slice(0, 20).map((d: any) => {
      const code = normalizeCountryCode(d.countryCode, d.country);
      return {
        id: d.id,
        type: d.type,
        path: d.path,
        title: d.title || d.path,
        elementText: d.elementText,
        city: d.city || 'Dakar',
        country: d.country || 'Sénégal',
        countryCode: code,
        device: d.device || 'desktop',
        browser: d.browser || 'Autre',
        os: d.os || 'Autre',
        createdAt: d.createdAt,
      };
    });

    return NextResponse.json({
      period,
      liveVisitors,
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
      osList,
      browsers,
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
