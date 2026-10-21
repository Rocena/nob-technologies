'use client';

import React, { useState, useEffect } from 'react';
import {
  ChartBar,
  UsersThree,
  Eye,
  CursorClick,
  TrendUp,
  GlobeHemisphereWest,
  DeviceMobile,
  Desktop,
  ArrowClockwise,
  DownloadSimple,
  MapPin,
  ShareNetwork,
  Clock,
  CheckCircle,
} from '@phosphor-icons/react';

type Period = 'today' | '7d' | '30d' | 'all';

export const AnalyticsDashboard: React.FC = () => {
  const [period, setPeriod] = useState<Period>('7d');
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeGeoTab, setActiveGeoTab] = useState<'cities' | 'countries'>('cities');

  const fetchData = async (selectedPeriod: Period) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/analytics/stats?period=${selectedPeriod}`, {
        credentials: 'same-origin',
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        setError('Impossible de charger les données statistiques.');
      }
    } catch {
      setError('Erreur de connexion au serveur analytics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(period);
  }, [period]);

  const handleExportCSV = () => {
    if (!data) return;
    const rows = [
      ['Rapport Analytics NOBTECH', `Periode: ${period}`],
      [],
      ['KPIs'],
      ['Visiteurs Uniques', data.kpis.uniqueVisitors],
      ['Pages Vues', data.kpis.totalPageviews],
      ['Clics & Interactions', data.kpis.totalClicks],
      ['Taux Engagement', `${data.kpis.engagementRate}%`],
      [],
      ['Top Pages'],
      ['Chemin', 'Titre', 'Vues', 'Visiteurs Uniques'],
      ...data.topPages.map((p: any) => [p.path, p.title, p.views, p.uniqueVisitors]),
      [],
      ['Top Clics & CTAs'],
      ['Libellé Élément', 'Type', 'Page', 'Clics'],
      ...data.topClicks.map((c: any) => [c.elementText, c.type, c.path, c.count]),
      [],
      ['Top Villes'],
      ['Ville', 'Pays', 'Interactions', 'Part'],
      ...data.locations.cities.map((ci: any) => [ci.city, ci.country, ci.count, `${ci.percentage}%`]),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(';')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nobtech-analytics-${period}-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const kpis = data?.kpis || {
    uniqueVisitors: 0,
    totalPageviews: 0,
    totalClicks: 0,
    engagementRate: '0.0',
    avgPagesPerVisitor: '1.0',
  };

  const maxTimelineVal = Math.max(
    ...(data?.timeline?.map((t: any) => Math.max(t.pageviews, t.clicks)) || [10]),
    1
  );

  return (
    <div className="min-h-screen bg-[#070D1F] text-slate-100 p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#00D4FF]/30">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* 1. Header Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00D4FF]/20 to-[#0284C7]/30 border border-[#00D4FF]/40 flex items-center justify-center text-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.2)]">
              <ChartBar size={28} weight="duotone" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Marketing &amp; Analytics
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/25">
                  Live
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Suivi en temps réel de votre audience, vos pages les plus consultées, vos clics et la localisation de vos visiteurs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Period Switcher */}
            <div className="bg-slate-900/90 border border-white/10 p-1 rounded-xl flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setPeriod('today')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  period === 'today'
                    ? 'bg-[#00D4FF] text-[#020617] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Aujourd’hui
              </button>
              <button
                type="button"
                onClick={() => setPeriod('7d')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  period === '7d'
                    ? 'bg-[#00D4FF] text-[#020617] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                7 jours
              </button>
              <button
                type="button"
                onClick={() => setPeriod('30d')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  period === '30d'
                    ? 'bg-[#00D4FF] text-[#020617] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                30 jours
              </button>
              <button
                type="button"
                onClick={() => setPeriod('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  period === 'all'
                    ? 'bg-[#00D4FF] text-[#020617] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Historique
              </button>
            </div>

            {/* Refresh */}
            <button
              type="button"
              onClick={() => fetchData(period)}
              title="Rafraîchir les données"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowClockwise size={16} className={loading ? 'animate-spin text-[#00D4FF]' : ''} />
            </button>

            {/* Export CSV */}
            <button
              type="button"
              onClick={handleExportCSV}
              disabled={!data}
              title="Exporter le rapport au format CSV"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer disabled:opacity-50"
            >
              <DownloadSimple size={15} className="text-[#00D4FF]" />
              <span className="hidden sm:inline">Exporter CSV</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
            {error}
          </div>
        )}

        {/* 2. Key Performance Indicators (Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* KPI 1 : Visiteurs Uniques */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Visiteurs Uniques
              </span>
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <UsersThree size={20} weight="duotone" />
              </div>
            </div>
            <div className="text-3xl font-black text-white">
              {kpis.uniqueVisitors.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
              <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                <TrendUp size={14} /> +18.4%
              </span>
              <span>vs période préc.</span>
            </div>
          </div>

          {/* KPI 2 : Pages Vues */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Pages Consultées
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Eye size={20} weight="duotone" />
              </div>
            </div>
            <div className="text-3xl font-black text-white">
              {kpis.totalPageviews.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
              <span className="text-slate-300 font-semibold">{kpis.avgPagesPerVisitor}</span>
              <span>pages / visiteur</span>
            </div>
          </div>

          {/* KPI 3 : Clics & Actions Marketing */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Clics &amp; Actions Marketing
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CursorClick size={20} weight="duotone" />
              </div>
            </div>
            <div className="text-3xl font-black text-emerald-400">
              {kpis.totalClicks.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
              <span className="text-emerald-400 font-semibold">Devis, WhatsApp, Formations</span>
            </div>
          </div>

          {/* KPI 4 : Taux d'engagement */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Taux d'Engagement
              </span>
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <TrendUp size={20} weight="duotone" />
              </div>
            </div>
            <div className="text-3xl font-black text-white">
              {kpis.engagementRate}%
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
              <span className="text-slate-300 font-semibold">Proportion de visiteurs actifs</span>
            </div>
          </div>

        </div>

        {/* 3. Graphique d'évolution du trafic */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Évolution du Trafic &amp; des Clics</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Comparatif quotidien entre les consultations de pages (bleu) et les interactions sur les boutons d&apos;action (vert).
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-3 h-3 rounded-sm bg-[#00D4FF]" />
                Pages Vues
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-3 h-3 rounded-sm bg-[#10E760]" />
                Clics / Conversions
              </span>
            </div>
          </div>

          {/* Histogram Chart */}
          <div className="pt-4 pb-2">
            <div className="h-48 flex items-end gap-2 sm:gap-3 border-b border-white/10 pb-2">
              {data?.timeline?.map((t: any, idx: number) => {
                const pvHeight = Math.max(Math.round((t.pageviews / maxTimelineVal) * 100), 6);
                const clHeight = Math.max(Math.round((t.clicks / maxTimelineVal) * 100), 4);

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                      <div className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-white/20 text-[10px] text-white shadow-xl whitespace-nowrap">
                        <strong className="block text-slate-300 mb-0.5">{t.label}</strong>
                        <div className="text-[#00D4FF] font-semibold">{t.pageviews} vues ({t.visitors} visiteurs)</div>
                        <div className="text-[#10E760] font-semibold">{t.clicks} clics &amp; actions</div>
                      </div>
                      <div className="w-2 h-2 bg-slate-950 border-r border-b border-white/20 rotate-45 -mt-1" />
                    </div>

                    <div className="w-full flex items-end justify-center gap-1">
                      {/* Pageviews bar */}
                      <div
                        style={{ height: `${pvHeight}%` }}
                        className="w-1/2 rounded-t-md bg-gradient-to-t from-[#0077b6] to-[#00D4FF] group-hover:brightness-125 transition-all"
                      />
                      {/* Clicks bar */}
                      <div
                        style={{ height: `${clHeight}%` }}
                        className="w-1/2 rounded-t-md bg-gradient-to-t from-emerald-600 to-[#10E760] group-hover:brightness-125 transition-all"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono mt-2 truncate w-full text-center">
                      {t.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. Split Row 1 : Top Pages & Top Clics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left: Pages les plus vues */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Eye size={18} className="text-[#00D4FF]" />
                  <h3 className="text-base font-bold text-white">Pages les plus visitées</h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">Top 10</span>
              </div>

              <div className="space-y-3.5">
                {data?.topPages?.map((p: any, idx: number) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-[10px] font-bold text-slate-400 shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-mono text-cyan-300 font-medium truncate" title={p.path}>
                          {p.path}
                        </span>
                        <span className="text-slate-400 truncate hidden sm:inline" title={p.title}>
                          &bull; {p.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 font-mono">
                        <strong className="text-white">{p.views}</strong>
                        <span className="text-slate-500">({p.percentage}%)</span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        style={{ width: `${Math.max(p.percentage, 3)}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0284c7]"
                      />
                    </div>
                  </div>
                ))}

                {(!data?.topPages || data.topPages.length === 0) && (
                  <p className="text-xs text-slate-500 py-6 text-center">Aucune visite enregistrée pour cette période.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right: Zones & Boutons les plus cliqués */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <CursorClick size={18} className="text-[#10E760]" />
                  <h3 className="text-base font-bold text-white">Boutons &amp; Actions les plus cliqués</h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">Conversions</span>
              </div>

              <div className="space-y-3.5">
                {data?.topClicks?.map((c: any, idx: number) => {
                  const isWhatsApp = c.type === 'whatsapp_click';
                  const isBrochure = c.type === 'download_brochure';

                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                            isWhatsApp
                              ? 'bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30'
                              : isBrochure
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {isWhatsApp ? 'WhatsApp' : isBrochure ? 'Syllabus PDF' : 'Bouton CTA'}
                          </span>
                          <span className="font-semibold text-slate-200 truncate" title={c.elementText}>
                            {c.elementText}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 font-mono">
                          <strong className="text-emerald-400">{c.count} clics</strong>
                          <span className="text-slate-500">({c.percentage}%)</span>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          style={{ width: `${Math.max(c.percentage, 3)}%` }}
                          className={`h-full rounded-full ${
                            isWhatsApp
                              ? 'bg-[#25D366]'
                              : 'bg-gradient-to-r from-emerald-500 to-[#10E760]'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}

                {(!data?.topClicks || data.topClicks.length === 0) && (
                  <p className="text-xs text-slate-500 py-6 text-center">Aucun clic enregistré pour cette période.</p>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* 5. Split Row 2 : Localisations & Appareils / Canaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left: Localisations des visiteurs (Dakar, Thiès, Paris, etc.) */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <GlobeHemisphereWest size={18} className="text-[#00D4FF]" />
                <h3 className="text-base font-bold text-white">Localisation des Visiteurs</h3>
              </div>
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveGeoTab('cities')}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    activeGeoTab === 'cities' ? 'bg-[#00D4FF] text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  Villes
                </button>
                <button
                  type="button"
                  onClick={() => setActiveGeoTab('countries')}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    activeGeoTab === 'countries' ? 'bg-[#00D4FF] text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  Pays
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {activeGeoTab === 'cities' &&
                data?.locations?.cities?.map((ci: any, idx: number) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-cyan-400 shrink-0" />
                        <strong className="text-slate-200">{ci.city}</strong>
                        <span className="text-slate-500 text-[11px]">({ci.country})</span>
                      </div>
                      <div className="font-mono text-slate-300">
                        {ci.count} visites <span className="text-slate-500">({ci.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        style={{ width: `${Math.max(ci.percentage, 3)}%` }}
                        className="h-full rounded-full bg-cyan-400"
                      />
                    </div>
                  </div>
                ))}

              {activeGeoTab === 'countries' &&
                data?.locations?.countries?.map((co: any, idx: number) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-cyan-300 font-bold">
                          {co.code}
                        </span>
                        <strong className="text-slate-200">{co.country}</strong>
                      </div>
                      <div className="font-mono text-slate-300">
                        {co.count} visites <span className="text-slate-500">({co.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        style={{ width: `${Math.max(co.percentage, 3)}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Right: Appareils & Canaux d'acquisition */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <ShareNetwork size={18} className="text-[#00D4FF]" />
                  <h3 className="text-base font-bold text-white">Appareils &amp; Canaux d'Acquisition</h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">Répartition</span>
              </div>

              {/* Devices */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
                  Appareils Utilisés
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {data?.devices?.map((dev: any, idx: number) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                      <div className="text-slate-400 flex items-center justify-center mb-1">
                        {dev.name === 'Mobile' ? (
                          <DeviceMobile size={20} />
                        ) : dev.name === 'Ordinateur' ? (
                          <Desktop size={20} />
                        ) : (
                          <DeviceMobile size={20} />
                        )}
                      </div>
                      <div className="text-base font-bold text-white">{dev.percentage}%</div>
                      <div className="text-[11px] text-slate-400">{dev.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sources */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
                  Sources de Trafic
                </h4>
                <div className="space-y-2">
                  {data?.sources?.map((s: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-white/[0.02] border border-white/5">
                      <span className="text-slate-300 font-medium">{s.name}</span>
                      <span className="font-mono text-cyan-300 font-bold">{s.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 6. Live Activity Stream (Recent Events) */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[#00D4FF]" />
              <h3 className="text-base font-bold text-white">Flux d&apos;activité récent en direct</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Temps réel
            </span>
          </div>

          <div className="divide-y divide-white/5 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
            {data?.recentEvents?.map((ev: any, idx: number) => {
              const isPageview = ev.type === 'pageview';
              const isWhatsApp = ev.type === 'whatsapp_click';

              return (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${
                      isWhatsApp ? 'bg-[#25D366]' : isPageview ? 'bg-[#00D4FF]' : 'bg-emerald-400'
                    }`} />
                    <span className="font-mono text-slate-400 shrink-0">
                      {ev.createdAt ? new Date(ev.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                    <span className="text-slate-300 truncate">
                      Visiteur de <strong className="text-white">{ev.city || 'Dakar'}</strong> ({ev.country || 'Sénégal'}) :{' '}
                      {isPageview ? (
                        <span>a consulté <strong className="text-cyan-300 font-mono">{ev.path}</strong></span>
                      ) : (
                        <span>a cliqué sur <strong className="text-emerald-300">&ldquo;{ev.elementText || ev.type}&rdquo;</strong></span>
                      )}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase shrink-0">
                    {ev.device || 'desktop'}
                  </span>
                </div>
              );
            })}

            {(!data?.recentEvents || data.recentEvents.length === 0) && (
              <p className="text-xs text-slate-500 py-4 text-center">Aucun événement récent.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
