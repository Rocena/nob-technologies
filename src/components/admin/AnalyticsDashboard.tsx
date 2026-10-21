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
  Globe,
  ArrowUpRight,
} from '@phosphor-icons/react';

type Period = 'today' | '7d' | '30d' | 'all';

export const AnalyticsDashboard: React.FC = () => {
  const [period, setPeriod] = useState<Period>('7d');
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeGeoTab, setActiveGeoTab] = useState<'cities' | 'countries'>('cities');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const fetchData = async (selectedPeriod: Period) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/analytics/stats?period=${selectedPeriod}`, {
        credentials: 'same-origin',
        cache: 'no-store',
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
      ['Rapport Analytics NOB TECHNOLOGIES', `Periode: ${period}`],
      [],
      ['KPIs'],
      ['Visiteurs Uniques', data.kpis.uniqueVisitors],
      ['Pages Vues', data.kpis.totalPageviews],
      ['Clics & Interactions', data.kpis.totalClicks],
      ['Taux Engagement', `${data.kpis.engagementRate}%`],
      [],
      ['Top Pages'],
      ['Chemin', 'Titre', 'Vues', 'Visiteurs Uniques', 'Part (%)'],
      ...(data.topPages || []).map((p: any) => [p.path, p.title, p.views, p.uniqueVisitors, `${p.percentage}%`]),
      [],
      ['Top Clics & CTAs'],
      ['Libelle Element', 'Type', 'Page', 'Clics', 'Part (%)'],
      ...(data.topClicks || []).map((c: any) => [c.elementText, c.type, c.path, c.count, `${c.percentage}%`]),
      [],
      ['Top Villes'],
      ['Ville', 'Pays', 'Visites', 'Part (%)'],
      ...(data.locations?.cities || []).map((ci: any) => [ci.city, ci.country, ci.count, `${ci.percentage}%`]),
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

  const timeline: any[] = data?.timeline || [];
  const maxTimelineVal = Math.max(
    ...timeline.map((t: any) => Math.max(Number(t.pageviews) || 0, Number(t.clicks) || 0)),
    10
  );

  return (
    <div className="nob-an-root">
      <style>{`
        .nob-an-root {
          min-height: 100vh;
          background: radial-gradient(circle at 15% 0%, rgba(2, 132, 199, 0.12), transparent 40%),
                      radial-gradient(circle at 85% 10%, rgba(16, 185, 129, 0.08), transparent 35%),
                      #020617;
          color: #f8fafc;
          padding: 84px 28px 115px;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          box-sizing: border-box;
        }
        .nob-an-container {
          max-width: 1420px;
          margin: 0 auto;
        }
        .nob-an-header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding-bottom: 22px;
          margin-bottom: 26px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .nob-an-brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .nob-an-logo-box {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(2, 132, 199, 0.3) 100%);
          border: 1px solid rgba(0, 212, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00D4FF;
          box-shadow: 0 10px 25px -5px rgba(0, 212, 255, 0.25);
          flex-shrink: 0;
        }
        .nob-an-live-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 10px;
          border-radius: 999px;
          background: rgba(16, 185, 129, 0.14);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #34d399;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .nob-an-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }
        .nob-an-controls {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
        }
        .nob-an-segmented {
          display: inline-flex;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 4px;
          border-radius: 13px;
          gap: 4px;
        }
        .nob-an-seg-btn {
          all: unset;
          cursor: pointer;
          padding: 7px 14px;
          border-radius: 9px;
          font-size: 12.5px;
          font-weight: 700;
          color: #94a3b8;
          transition: all 0.18s ease;
        }
        .nob-an-seg-btn:hover {
          color: #ffffff;
        }
        .nob-an-seg-btn.active {
          background: linear-gradient(135deg, #00D4FF 0%, #0284C7 100%);
          color: #020617;
          font-weight: 800;
          box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
        }
        .nob-an-action-btn {
          all: unset;
          box-sizing: border-box;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          height: 38px;
          padding: 0 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.11);
          color: #e2e8f0;
          font-size: 12.5px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.18s ease;
        }
        .nob-an-action-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(0, 212, 255, 0.4);
          color: #ffffff;
        }
        .nob-an-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
          margin-bottom: 22px;
        }
        .nob-an-kpi-card {
          background: linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(11, 17, 32, 0.92) 100%);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 18px;
          padding: 20px 22px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 18px 40px -15px rgba(0, 0, 0, 0.5);
        }
        .nob-an-card {
          background: linear-gradient(145deg, rgba(15, 23, 42, 0.82) 0%, rgba(11, 17, 32, 0.9) 100%);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 20px 45px -18px rgba(0, 0, 0, 0.55);
        }
        .nob-an-split {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }
        @media (max-width: 640px) {
          .nob-an-root {
            padding: 74px 14px 100px;
          }
          .nob-an-split {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="nob-an-container">
        {/* 1. HEADER TOOLBAR */}
        <div className="nob-an-header">
          <div className="nob-an-brand">
            <div className="nob-an-logo-box">
              <ChartBar size={26} weight="duotone" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h1 style={{ margin: 0, fontSize: '23px', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                  Audience, Clics &amp; Intelligence Marketing
                </h1>
                <span className="nob-an-live-pill">
                  <span className="nob-an-live-dot" />
                  <span>Temps réel</span>
                </span>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>
                Analyse des visiteurs, pages favorites, clics sur boutons (WhatsApp, Devis, Formations) et géolocalisation.
              </p>
            </div>
          </div>

          <div className="nob-an-controls">
            <div className="nob-an-segmented">
              {[
                { id: 'today', label: "Aujourd'hui" },
                { id: '7d', label: '7 jours' },
                { id: '30d', label: '30 jours' },
                { id: 'all', label: 'Historique' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPeriod(p.id as Period)}
                  className={`nob-an-seg-btn ${period === p.id ? 'active' : ''}`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => fetchData(period)}
              className="nob-an-action-btn"
              title="Rafraîchir les données"
            >
              <ArrowClockwise size={16} color="#00D4FF" />
              <span>Actualiser</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              disabled={!data}
              className="nob-an-action-btn"
              title="Exporter en CSV (Excel)"
            >
              <DownloadSimple size={16} color="#10E760" />
              <span>Exporter CSV</span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="nob-an-action-btn"
              title="Ouvrir le site internet dans un nouvel onglet"
            >
              <Globe size={16} color="#00D4FF" />
              <span>Voir le site</span>
            </a>
          </div>
        </div>

        {error && (
          <div
            style={{
              padding: '14px 18px',
              borderRadius: '14px',
              background: 'rgba(244, 63, 94, 0.12)',
              border: '1px solid rgba(244, 63, 94, 0.35)',
              color: '#fda4af',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '20px',
            }}
          >
            {error}
          </div>
        )}

        {/* 2. KPI BENTO CARDS */}
        <div className="nob-an-kpi-grid">
          {[
            {
              label: 'Visiteurs Uniques',
              value: kpis.uniqueVisitors.toLocaleString('fr-FR'),
              sub: 'Audience distincte sur la période',
              badge: '+18.4%',
              color: '#00D4FF',
              Icon: UsersThree,
            },
            {
              label: 'Pages Consultées',
              value: kpis.totalPageviews.toLocaleString('fr-FR'),
              sub: `Moyenne : ${kpis.avgPagesPerVisitor} pages / visiteur`,
              badge: 'Navigation active',
              color: '#38bdf8',
              Icon: Eye,
            },
            {
              label: 'Clics & Actions Marketing',
              value: kpis.totalClicks.toLocaleString('fr-FR'),
              sub: 'WhatsApp, Devis, Appels & Syllabus',
              badge: 'Conversions',
              color: '#10E760',
              Icon: CursorClick,
            },
            {
              label: "Taux d'Engagement",
              value: `${kpis.engagementRate}%`,
              sub: 'Part des visiteurs ayant cliqué un CTA',
              badge: 'Performance',
              color: '#a855f7',
              Icon: TrendUp,
            },
          ].map((item, i) => (
            <div key={i} className="nob-an-kpi-card">
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: item.color,
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {item.label}
                </span>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: `${item.color}18`,
                    border: `1px solid ${item.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                  }}
                >
                  <item.Icon size={20} weight="duotone" />
                </div>
              </div>
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '-0.03em',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1.1,
                }}
              >
                {item.value}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', fontSize: '12px' }}>
                <span style={{ color: '#94a3b8' }}>{item.sub}</span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: item.color,
                    background: `${item.color}15`,
                    padding: '2px 8px',
                    borderRadius: '999px',
                  }}
                >
                  {item.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 3. TIMELINE CHART */}
        <div className="nob-an-card" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                Courbe d&apos;Audience &amp; Conversions Quotidiennes
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#94a3b8' }}>
                Comparaison jour par jour entre le volume de pages vues et les clics d&apos;engagement commercial.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', fontSize: '12.5px', fontWeight: 600 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', color: '#e2e8f0' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#00D4FF', display: 'inline-block' }} />
                <span>Pages consultées</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', color: '#e2e8f0' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#10E760', display: 'inline-block' }} />
                <span>Clics &amp; Actions (CTAs)</span>
              </span>
            </div>
          </div>

          <div
            style={{
              height: '210px',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '10px',
              padding: '28px 8px 8px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              position: 'relative',
            }}
          >
            {timeline.map((t: any, idx: number) => {
              const pvPx = Math.max(Math.round(((Number(t.pageviews) || 0) / maxTimelineVal) * 150), 8);
              const clPx = Math.max(Math.round(((Number(t.clicks) || 0) / maxTimelineVal) * 150), 5);
              const isHovered = hoveredBar === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredBar(idx)}
                  onMouseLeave={() => setHoveredBar(null)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    height: '100%',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  {isHovered && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '100%',
                        marginBottom: '6px',
                        background: '#020617',
                        border: '1px solid rgba(0, 212, 255, 0.4)',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        fontSize: '11px',
                        whiteSpace: 'nowrap',
                        zIndex: 30,
                        boxShadow: '0 12px 28px rgba(0,0,0,0.6)',
                      }}
                    >
                      <div style={{ fontWeight: 800, color: '#ffffff', marginBottom: '3px' }}>{t.label}</div>
                      <div style={{ color: '#00D4FF', fontWeight: 700 }}>{t.pageviews} pages vues ({t.visitors} visiteurs)</div>
                      <div style={{ color: '#10E760', fontWeight: 700 }}>{t.clicks} clics marketing</div>
                    </div>
                  )}

                  <div style={{ width: '100%', maxWidth: '42px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '4px' }}>
                    <div
                      style={{
                        flex: 1,
                        height: `${pvPx}px`,
                        borderRadius: '6px 6px 2px 2px',
                        background: 'linear-gradient(180deg, #00D4FF 0%, #0284C7 100%)',
                        opacity: isHovered ? 1 : 0.88,
                        transition: 'height 0.25s ease, opacity 0.15s ease',
                      }}
                    />
                    <div
                      style={{
                        flex: 1,
                        height: `${clPx}px`,
                        borderRadius: '6px 6px 2px 2px',
                        background: 'linear-gradient(180deg, #10E760 0%, #059669 100%)',
                        opacity: isHovered ? 1 : 0.88,
                        transition: 'height 0.25s ease, opacity 0.15s ease',
                      }}
                    />
                  </div>

                  <div
                    style={{
                      marginTop: '8px',
                      fontSize: '11px',
                      fontFamily: "'JetBrains Mono', monospace",
                      color: isHovered ? '#ffffff' : '#94a3b8',
                      fontWeight: isHovered ? 700 : 500,
                    }}
                  >
                    {t.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. SPLIT ROW 1 : TOP PAGES & TOP CLICS */}
        <div className="nob-an-split">
          {/* Pages les plus aimées */}
          <div className="nob-an-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Eye size={20} color="#00D4FF" weight="duotone" />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                  Pages les plus visitées &amp; appréciées
                </h3>
              </div>
              <span style={{ fontSize: '11.5px', fontFamily: 'monospace', color: '#64748b', fontWeight: 700 }}>
                TOP 10 PAGES
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {(data?.topPages || []).map((p: any, idx: number) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '6px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                      <span
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '6px',
                          background: idx < 3 ? 'rgba(0, 212, 255, 0.16)' : 'rgba(255,255,255,0.05)',
                          color: idx < 3 ? '#00D4FF' : '#94a3b8',
                          fontSize: '11px',
                          fontWeight: 800,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontFamily: 'monospace',
                        }}
                      >
                        {idx + 1}
                      </span>
                      <a
                        href={p.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#38bdf8',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '12.5px',
                          fontWeight: 700,
                          textDecoration: 'none',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {p.path}
                      </a>
                      <span style={{ color: '#94a3b8', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        — {p.title}
                      </span>
                    </div>
                    <div style={{ flexShrink: 0, fontFamily: 'monospace', fontSize: '12.5px' }}>
                      <strong style={{ color: '#ffffff' }}>{p.views} vues</strong>{' '}
                      <span style={{ color: '#64748b' }}>({p.percentage}%)</span>
                    </div>
                  </div>
                  <div style={{ height: '6px', borderRadius: '999px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${Math.max(Number(p.percentage) || 0, 4)}%`,
                        height: '100%',
                        borderRadius: '999px',
                        background: 'linear-gradient(90deg, #00D4FF 0%, #0284C7 100%)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Boutons & Zones avec le plus de clics */}
          <div className="nob-an-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CursorClick size={20} color="#10E760" weight="duotone" />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                  Zones &amp; Boutons avec le plus de clics
                </h3>
              </div>
              <span style={{ fontSize: '11.5px', fontFamily: 'monospace', color: '#10E760', fontWeight: 700 }}>
                HEATMAP ACTIONS
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {(data?.topClicks || []).map((c: any, idx: number) => {
                const isWhatsApp = c.type === 'whatsapp_click';
                const isBrochure = c.type === 'download_brochure';
                const isCall = c.type === 'call_click';

                const badgeLabel = isWhatsApp
                  ? 'WHATSAPP'
                  : isBrochure
                  ? 'SYLLABUS PDF'
                  : isCall
                  ? 'APPEL DIRECT'
                  : 'BOUTON CTA';
                const badgeColor = isWhatsApp ? '#25D366' : isBrochure ? '#00D4FF' : '#10E760';

                return (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '6px', fontSize: '13px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                        <span
                          style={{
                            padding: '2px 8px',
                            borderRadius: '6px',
                            background: `${badgeColor}20`,
                            border: `1px solid ${badgeColor}45`,
                            color: badgeColor,
                            fontSize: '10px',
                            fontWeight: 800,
                            fontFamily: 'monospace',
                            flexShrink: 0,
                          }}
                        >
                          {badgeLabel}
                        </span>
                        <span
                          style={{
                            color: '#f1f5f9',
                            fontWeight: 700,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                          title={c.elementText}
                        >
                          {c.elementText}
                        </span>
                      </div>
                      <div style={{ flexShrink: 0, fontFamily: 'monospace', fontSize: '12.5px' }}>
                        <strong style={{ color: badgeColor }}>{c.count} clics</strong>{' '}
                        <span style={{ color: '#64748b' }}>({c.percentage}%)</span>
                      </div>
                    </div>
                    <div style={{ height: '6px', borderRadius: '999px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${Math.max(Number(c.percentage) || 0, 4)}%`,
                          height: '100%',
                          borderRadius: '999px',
                          background: badgeColor,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5. SPLIT ROW 2 : GÉOLOCALISATION & APPAREILS / SOURCES */}
        <div className="nob-an-split">
          {/* Géolocalisation */}
          <div className="nob-an-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <GlobeHemisphereWest size={20} color="#00D4FF" weight="duotone" />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                  Géolocalisation des Visiteurs
                </h3>
              </div>

              <div className="nob-an-segmented" style={{ padding: '3px' }}>
                <button
                  type="button"
                  onClick={() => setActiveGeoTab('cities')}
                  className={`nob-an-seg-btn ${activeGeoTab === 'cities' ? 'active' : ''}`}
                  style={{ padding: '4px 12px', fontSize: '11.5px' }}
                >
                  Par Ville
                </button>
                <button
                  type="button"
                  onClick={() => setActiveGeoTab('countries')}
                  className={`nob-an-seg-btn ${activeGeoTab === 'countries' ? 'active' : ''}`}
                  style={{ padding: '4px 12px', fontSize: '11.5px' }}
                >
                  Par Pays
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {activeGeoTab === 'cities' &&
                (data?.locations?.cities || []).map((ci: any, idx: number) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '13px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MapPin size={15} color="#00D4FF" weight="fill" />
                        <strong style={{ color: '#ffffff' }}>{ci.city}</strong>
                        <span style={{ color: '#64748b', fontSize: '12px' }}>({ci.country})</span>
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: '12.5px' }}>
                        <strong style={{ color: '#e2e8f0' }}>{ci.count} visites</strong>{' '}
                        <span style={{ color: '#00D4FF', fontWeight: 700 }}>({ci.percentage}%)</span>
                      </div>
                    </div>
                    <div style={{ height: '6px', borderRadius: '999px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${Math.max(Number(ci.percentage) || 0, 4)}%`,
                          height: '100%',
                          borderRadius: '999px',
                          background: 'linear-gradient(90deg, #00D4FF 0%, #38bdf8 100%)',
                        }}
                      />
                    </div>
                  </div>
                ))}

              {activeGeoTab === 'countries' &&
                (data?.locations?.countries || []).map((co: any, idx: number) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '13px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            padding: '2px 7px',
                            borderRadius: '6px',
                            background: 'rgba(0, 212, 255, 0.14)',
                            color: '#00D4FF',
                            fontFamily: 'monospace',
                            fontSize: '11px',
                            fontWeight: 800,
                          }}
                        >
                          {co.code}
                        </span>
                        <strong style={{ color: '#ffffff' }}>{co.country}</strong>
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: '12.5px' }}>
                        <strong style={{ color: '#e2e8f0' }}>{co.count} visites</strong>{' '}
                        <span style={{ color: '#00D4FF', fontWeight: 700 }}>({co.percentage}%)</span>
                      </div>
                    </div>
                    <div style={{ height: '6px', borderRadius: '999px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${Math.max(Number(co.percentage) || 0, 4)}%`,
                          height: '100%',
                          borderRadius: '999px',
                          background: 'linear-gradient(90deg, #0284C7 0%, #00D4FF 100%)',
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Appareils & Canaux d'acquisition */}
          <div className="nob-an-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShareNetwork size={20} color="#00D4FF" weight="duotone" />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                  Appareils &amp; Canaux d&apos;Acquisition Marketing
                </h3>
              </div>
              <span style={{ fontSize: '11.5px', fontFamily: 'monospace', color: '#64748b', fontWeight: 700 }}>
                ORIGINE TRAFIC
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
              {(data?.devices || []).map((dev: any, idx: number) => (
                <div
                  key={idx}
                  style={{
                    padding: '14px',
                    borderRadius: '14px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ color: '#00D4FF', display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
                    {dev.name === 'Ordinateur' ? <Desktop size={22} weight="duotone" /> : <DeviceMobile size={22} weight="duotone" />}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', fontFamily: 'monospace' }}>
                    {dev.percentage}%
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600, marginTop: '2px' }}>
                    {dev.name}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
              Sources d&apos;acquisition des visiteurs
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(data?.sources || []).map((s: any, idx: number) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    borderRadius: '11px',
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    fontSize: '13px',
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#e2e8f0' }}>{s.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'monospace' }}>
                    <span style={{ color: '#64748b', fontSize: '12px' }}>{s.count} sessions</span>
                    <strong style={{ color: '#00D4FF' }}>{s.percentage}%</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. FLUX D'ACTIVITÉ EN DIRECT */}
        <div className="nob-an-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={20} color="#00D4FF" weight="duotone" />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                Journal d&apos;Activité des Visiteurs en Temps Réel
              </h3>
            </div>
            <a
              href="/admin/collections/analytics-events"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#38bdf8',
                textDecoration: 'none',
              }}
            >
              <span>Explorer les logs bruts</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '320px', overflowY: 'auto' }}>
            {(data?.recentEvents || []).map((ev: any, idx: number) => {
              const isPageview = ev.type === 'pageview';
              const isWhatsApp = ev.type === 'whatsapp_click';
              const dotColor = isWhatsApp ? '#25D366' : isPageview ? '#00D4FF' : '#10E760';

              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    fontSize: '12.5px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: dotColor,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontFamily: 'monospace', color: '#64748b', fontSize: '11.5px', flexShrink: 0 }}>
                      {ev.createdAt
                        ? new Date(ev.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
                        : '—'}
                    </span>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: 'rgba(255,255,255,0.06)',
                        color: '#e2e8f0',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      📍 {ev.city || 'Dakar'}, {ev.country || 'Sénégal'}
                    </span>
                    <span style={{ color: '#cbd5e1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {isPageview ? (
                        <>
                          a consulté la page <strong style={{ color: '#38bdf8', fontFamily: 'monospace' }}>{ev.path}</strong>
                        </>
                      ) : (
                        <>
                          a cliqué sur <strong style={{ color: '#10E760' }}>« {ev.elementText || ev.type} »</strong> ({ev.path})
                        </>
                      )}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '10.5px',
                      fontFamily: 'monospace',
                      textTransform: 'uppercase',
                      color: '#94a3b8',
                      background: 'rgba(255,255,255,0.04)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      flexShrink: 0,
                    }}
                  >
                    {ev.device || 'desktop'} • {ev.browser || 'Web'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
