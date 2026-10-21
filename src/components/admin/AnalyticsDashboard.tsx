'use client';

import React, { useState, useEffect } from 'react';
import {
  ChartBar,
  UsersThree,
  Eye,
  CursorClick,
  GlobeHemisphereWest,
  DeviceMobile,
  Desktop,
  ArrowClockwise,
  DownloadSimple,
  MapPin,
  ShareNetwork,
  Globe,
  ArrowUpRight,
  ArrowLeft,
  Sparkle,
} from '@phosphor-icons/react';

type Period = 'today' | '7d' | '30d' | 'all';
type SectionTab = 'all' | 'pages' | 'clicks' | 'geo';

export const AnalyticsDashboard: React.FC = () => {
  const [period, setPeriod] = useState<Period>('7d');
  const [activeTab, setActiveTab] = useState<SectionTab>('all');
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
        setError('Impossible de charger les statistiques de visite.');
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
      ['Indicateurs Cles'],
      ['Visiteurs Uniques', data.kpis.uniqueVisitors],
      ['Pages Vues', data.kpis.totalPageviews],
      ['Clics sur Boutons', data.kpis.totalClicks],
      ['Taux Engagement', `${data.kpis.engagementRate}%`],
      [],
      ['Pages les plus aimees'],
      ['Chemin', 'Nom de la page', 'Vues', 'Visiteurs Uniques', 'Part (%)'],
      ...(data.topPages || []).map((p: any) => [p.path, p.title, p.views, p.uniqueVisitors, `${p.percentage}%`]),
      [],
      ['Boutons les plus cliques'],
      ['Bouton', 'Categorie', 'Page', 'Clics', 'Part (%)'],
      ...(data.topClicks || []).map((c: any) => [c.elementText, c.type, c.path, c.count, `${c.percentage}%`]),
      [],
      ['Villes des visiteurs'],
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

  const topCity = data?.locations?.cities?.[0]?.city || 'Dakar';
  const topPage = data?.topPages?.[0]?.title || 'Accueil';
  const topClick = data?.topClicks?.[0]?.elementText || 'Demander un devis';

  return (
    <div className="nob-an-page">
      <style>{`
        .nob-an-page {
          max-width: 1280px;
          margin: 0 auto;
          padding: 28px 24px 120px;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #0f172a;
          box-sizing: border-box;
        }
        html[data-nob-theme="dark"] .nob-an-page {
          color: #f8fafc;
        }

        /* BARRE SUPÉRIEURE DE RETOUR & PÉRIODE */
        .nob-an-topbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 20px;
        }
        .nob-an-back {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 14px;
          border-radius: 10px;
          background: rgba(2, 132, 199, 0.1);
          color: #0284c7;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.15s ease;
        }
        .nob-an-back:hover {
          background: rgba(2, 132, 199, 0.18);
        }
        html[data-nob-theme="dark"] .nob-an-back {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
        }

        /* BANNIÈRE PRINCIPALE ERGONOMIQUE */
        .nob-an-hero {
          border-radius: 22px;
          padding: 28px 30px;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
          border: 1px solid #e2e8f0;
          box-shadow: 0 12px 30px -12px rgba(2, 132, 199, 0.1);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        html[data-nob-theme="dark"] .nob-an-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 45px -15px rgba(0, 0, 0, 0.55);
        }

        .nob-an-hero-title {
          font-size: clamp(1.35rem, 2.2vw, 1.75rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          margin: 0 0 6px;
          color: #0f172a;
        }
        html[data-nob-theme="dark"] .nob-an-hero-title {
          color: #ffffff;
        }
        .nob-an-hero-sub {
          font-size: 14px;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }
        html[data-nob-theme="dark"] .nob-an-hero-sub {
          color: #94a3b8;
        }

        /* SÉLECTEUR DE PÉRIODE */
        .nob-an-period-group {
          display: inline-flex;
          flex-wrap: wrap;
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          padding: 4px;
          border-radius: 12px;
          gap: 4px;
        }
        html[data-nob-theme="dark"] .nob-an-period-group {
          background: #020617;
          border-color: rgba(255, 255, 255, 0.12);
        }
        .nob-an-period-btn {
          all: unset;
          cursor: pointer;
          padding: 8px 14px;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 700;
          color: #475569;
          transition: all 0.15s ease;
        }
        html[data-nob-theme="dark"] .nob-an-period-btn {
          color: #94a3b8;
        }
        .nob-an-period-btn:hover {
          color: #0f172a;
        }
        html[data-nob-theme="dark"] .nob-an-period-btn:hover {
          color: #ffffff;
        }
        .nob-an-period-btn.active {
          background: #0284c7;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(2, 132, 199, 0.3);
        }

        /* BOUTONS OUTILS */
        .nob-an-btn {
          all: unset;
          box-sizing: border-box;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 15px;
          border-radius: 11px;
          font-size: 13px;
          font-weight: 700;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #334155;
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .nob-an-btn:hover {
          border-color: #0284c7;
          color: #0284c7;
        }
        html[data-nob-theme="dark"] .nob-an-btn {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.14);
          color: #e2e8f0;
        }
        html[data-nob-theme="dark"] .nob-an-btn:hover {
          border-color: #38bdf8;
          color: #38bdf8;
        }

        /* SYNTHÈSE MARKETING EN 1 CLIN D'ŒIL */
        .nob-an-summary-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          padding: 14px 20px;
          border-radius: 14px;
          background: rgba(2, 132, 199, 0.07);
          border: 1px solid rgba(2, 132, 199, 0.2);
          margin-bottom: 22px;
          font-size: 13.5px;
        }
        html[data-nob-theme="dark"] .nob-an-summary-bar {
          background: rgba(56, 189, 248, 0.08);
          border-color: rgba(56, 189, 248, 0.22);
        }

        /* 4 CARTES DE CHIFFRES CLÉS */
        .nob-an-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        .nob-an-kpi {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 20px 22px;
          box-shadow: 0 6px 20px -8px rgba(15, 23, 42, 0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        html[data-nob-theme="dark"] .nob-an-kpi {
          background: #0f172a;
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.45);
        }
        .nob-an-kpi-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .nob-an-kpi-label {
          font-size: 13px;
          font-weight: 700;
          color: #475569;
        }
        html[data-nob-theme="dark"] .nob-an-kpi-label {
          color: #cbd5e1;
        }
        .nob-an-kpi-val {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 8px;
        }
        .nob-an-kpi-help {
          font-size: 12.5px;
          color: #64748b;
          line-height: 1.4;
        }
        html[data-nob-theme="dark"] .nob-an-kpi-help {
          color: #94a3b8;
        }

        /* ONGLETS DE FILTRAGE POUR NAVIGATION FACILE */
        .nob-an-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 22px;
        }
        .nob-an-tab {
          all: unset;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 700;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #475569;
          transition: all 0.15s ease;
        }
        html[data-nob-theme="dark"] .nob-an-tab {
          background: #0f172a;
          border-color: rgba(255, 255, 255, 0.1);
          color: #94a3b8;
        }
        .nob-an-tab:hover {
          border-color: #0284c7;
          color: #0284c7;
        }
        .nob-an-tab.active {
          background: #0284c7;
          border-color: #0284c7;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(2, 132, 199, 0.3);
        }

        /* CARTES DE CONTENU */
        .nob-an-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 22px;
          box-shadow: 0 8px 25px -10px rgba(15, 23, 42, 0.05);
        }
        html[data-nob-theme="dark"] .nob-an-card {
          background: #0f172a;
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 16px 40px -15px rgba(0, 0, 0, 0.5);
        }
        .nob-an-card-title {
          font-size: 17px;
          font-weight: 800;
          margin: 0 0 4px;
          display: flex;
          align-items: center;
          gap: 9px;
          color: #0f172a;
        }
        html[data-nob-theme="dark"] .nob-an-card-title {
          color: #ffffff;
        }
        .nob-an-card-sub {
          font-size: 13px;
          color: #64748b;
          margin: 0 0 20px;
        }
        html[data-nob-theme="dark"] .nob-an-card-sub {
          color: #94a3b8;
        }

        /* GRILLE 2 COLONNES */
        .nob-an-grid-2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
          gap: 22px;
        }
        @media (max-width: 720px) {
          .nob-an-page {
            padding: 20px 14px 100px;
          }
          .nob-an-grid-2 {
            grid-template-columns: 1fr;
          }
        }

        /* LIGNES DE CLASSEMENT FACILES À LIRE */
        .nob-an-row {
          padding: 14px 16px;
          border-radius: 14px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          margin-bottom: 10px;
          transition: border-color 0.15s ease;
        }
        .nob-an-row:hover {
          border-color: #0284c7;
        }
        html[data-nob-theme="dark"] .nob-an-row {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
        }
        html[data-nob-theme="dark"] .nob-an-row:hover {
          border-color: #38bdf8;
        }
      `}</style>

      {/* BARRE HAUTE : RETOUR + ACTIONS */}
      <div className="nob-an-topbar">
        <a href="/admin" className="nob-an-back">
          <ArrowLeft size={15} weight="bold" />
          <span>Retour au Launchpad</span>
        </a>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <a href="/" target="_blank" rel="noopener noreferrer" className="nob-an-btn">
            <Globe size={16} color="#0284c7" />
            <span>Voir le site</span>
            <ArrowUpRight size={13} />
          </a>

          <button type="button" onClick={() => fetchData(period)} className="nob-an-btn">
            <ArrowClockwise size={16} />
            <span>Actualiser</span>
          </button>

          <button type="button" onClick={handleExportCSV} className="nob-an-btn">
            <DownloadSimple size={16} color="#059669" />
            <span>Exporter (Excel / CSV)</span>
          </button>
        </div>
      </div>

      {/* BANNIÈRE PRINCIPALE + CHOIX DE LA PÉRIODE */}
      <div className="nob-an-hero">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
            <h1 className="nob-an-hero-title" style={{ margin: 0 }}>
              Audience, Visites &amp; Performances Marketing
            </h1>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 11px',
                borderRadius: 999,
                background: 'rgba(16, 185, 129, 0.14)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#059669',
                fontSize: 11.5,
                fontWeight: 800,
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981' }} />
              <span>{data?.liveVisitors || 1} visiteur(s) en ligne</span>
            </span>
          </div>
          <p className="nob-an-hero-sub">
            Suivez simplement combien de personnes visitent votre site, quelles pages les intéressent le plus et d&apos;où elles viennent.
          </p>
        </div>

        <div className="nob-an-period-group">
          {[
            { id: 'today', label: "Aujourd'hui" },
            { id: '7d', label: '7 derniers jours' },
            { id: '30d', label: '30 derniers jours' },
            { id: 'all', label: 'Tout' },
          ].map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPeriod(p.id as Period)}
              className={`nob-an-period-btn ${period === p.id ? 'active' : ''}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: '14px 18px',
            borderRadius: 14,
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#b91c1c',
            marginBottom: 20,
            fontSize: 13.5,
            fontWeight: 600,
          }}
        >
          {error}
        </div>
      )}

      {/* SYNTHÈSE EN LANGAGE CLAIR */}
      <div className="nob-an-summary-bar">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 800, color: '#0284c7' }}>
          <Sparkle size={18} weight="fill" />
          <span>Résumé rapide :</span>
        </span>
        <span>
          Page la plus consultée : <strong>{topPage}</strong>
        </span>
        <span style={{ opacity: 0.4 }}>•</span>
        <span>
          Bouton le plus cliqué : <strong>{topClick}</strong>
        </span>
        <span style={{ opacity: 0.4 }}>•</span>
        <span>
          Ville principale : <strong>{topCity}</strong>
        </span>
      </div>

      {/* 4 CARTES DE CHIFFRES CLÉS */}
      <div className="nob-an-kpi-grid">
        {/* 1. Visiteurs */}
        <div className="nob-an-kpi">
          <div className="nob-an-kpi-top">
            <span className="nob-an-kpi-label">1. Personnes ayant visité le site</span>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(2, 132, 199, 0.12)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UsersThree size={20} weight="duotone" />
            </div>
          </div>
          <div className="nob-an-kpi-val">
            {loading ? '...' : kpis.uniqueVisitors.toLocaleString('fr-FR')}
          </div>
          <div className="nob-an-kpi-help">
            Visiteurs uniques sur la période choisie
          </div>
        </div>

        {/* 2. Pages vues */}
        <div className="nob-an-kpi">
          <div className="nob-an-kpi-top">
            <span className="nob-an-kpi-label">2. Pages consultées au total</span>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(14, 165, 233, 0.12)', color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Eye size={20} weight="duotone" />
            </div>
          </div>
          <div className="nob-an-kpi-val">
            {loading ? '...' : kpis.totalPageviews.toLocaleString('fr-FR')}
          </div>
          <div className="nob-an-kpi-help">
            Environ <strong>{kpis.avgPagesPerVisitor} pages</strong> lues par visiteur
          </div>
        </div>

        {/* 3. Clics */}
        <div className="nob-an-kpi">
          <div className="nob-an-kpi-top">
            <span className="nob-an-kpi-label">3. Clics sur vos boutons</span>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(16, 185, 129, 0.12)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CursorClick size={20} weight="duotone" />
            </div>
          </div>
          <div className="nob-an-kpi-val" style={{ color: '#059669' }}>
            {loading ? '...' : kpis.totalClicks.toLocaleString('fr-FR')}
          </div>
          <div className="nob-an-kpi-help">
            <strong>{kpis.engagementRate}%</strong> des visites génèrent un clic
          </div>
        </div>

        {/* 4. Localisation */}
        <div className="nob-an-kpi">
          <div className="nob-an-kpi-top">
            <span className="nob-an-kpi-label">4. Provenance géographique</span>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(245, 158, 11, 0.12)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GlobeHemisphereWest size={20} weight="duotone" />
            </div>
          </div>
          <div className="nob-an-kpi-val">
            {loading ? '...' : `${data?.locations?.cities?.length || 0} villes`}
          </div>
          <div className="nob-an-kpi-help">
            Réparties dans <strong>{data?.locations?.countries?.length || 0} pays</strong> (N°1 : {topCity})
          </div>
        </div>
      </div>

      {/* ONGLETS ERGONOMIQUES POUR FILTRER LA VUE */}
      <div className="nob-an-tabs">
        {[
          { id: 'all', label: 'Vue complète', Icon: ChartBar },
          { id: 'pages', label: 'Pages les plus aimées', Icon: Eye },
          { id: 'clicks', label: 'Boutons les plus cliqués', Icon: CursorClick },
          { id: 'geo', label: 'Localisation & Appareils', Icon: MapPin },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as SectionTab)}
            className={`nob-an-tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            <tab.Icon size={17} weight="duotone" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* GRAPHIQUE D'ÉVOLUTION PAR JOUR */}
      {activeTab === 'all' && (
        <div className="nob-an-card">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div>
              <div className="nob-an-card-title">
                <ChartBar size={20} color="#0284c7" weight="duotone" />
                <span>Évolution des visites jour par jour</span>
              </div>
              <div className="nob-an-card-sub" style={{ marginBottom: 0 }}>
                Survolez une barre pour voir le détail exact des pages lues et des clics du jour.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12.5, fontWeight: 700 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: 4, background: '#0284c7' }} />
                <span>Pages vues</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: 4, background: '#10b981' }} />
                <span>Clics sur boutons</span>
              </span>
            </div>
          </div>

          <div
            style={{
              height: 230,
              display: 'flex',
              alignItems: 'flex-end',
              gap: timeline.length > 14 ? 6 : 14,
              padding: '28px 10px 8px',
              borderBottom: '1px solid rgba(100, 116, 139, 0.2)',
            }}
          >
            {timeline.map((item: any, idx: number) => {
              const pv = Number(item.pageviews) || 0;
              const cl = Number(item.clicks) || 0;
              const pvPx = Math.max(Math.round((pv / maxTimelineVal) * 165), pv > 0 ? 10 : 4);
              const clPx = Math.max(Math.round((cl / maxTimelineVal) * 165), cl > 0 ? 8 : 3);
              const isHovered = hoveredBar === idx;
              const dateLabel = String(item.date || '').split('-').slice(1).reverse().join('/');

              return (
                <div
                  key={item.date || idx}
                  onMouseEnter={() => setHoveredBar(idx)}
                  onMouseLeave={() => setHoveredBar(null)}
                  style={{
                    flex: 1,
                    minWidth: 18,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  {isHovered && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: Math.max(pvPx, clPx) + 32,
                        background: '#0f172a',
                        color: '#ffffff',
                        padding: '8px 12px',
                        borderRadius: 10,
                        fontSize: 11.5,
                        whiteSpace: 'nowrap',
                        zIndex: 30,
                        boxShadow: '0 10px 25px rgba(0,0,0,0.35)',
                      }}
                    >
                      <div style={{ fontWeight: 800, marginBottom: 2 }}>{dateLabel}</div>
                      <div style={{ color: '#38bdf8' }}>{pv} pages vues</div>
                      <div style={{ color: '#34d399' }}>{cl} clics</div>
                    </div>
                  )}

                  <div style={{ fontSize: 10.5, fontWeight: 700, color: '#64748b', marginBottom: 4 }}>
                    {pv > 0 ? pv : ''}
                  </div>

                  <div style={{ width: '100%', maxWidth: 42, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 3 }}>
                    <div
                      style={{
                        flex: 1,
                        height: pvPx,
                        borderRadius: '6px 6px 2px 2px',
                        background: isHovered ? '#0369a1' : '#0284c7',
                        transition: 'height 0.25s ease',
                      }}
                    />
                    <div
                      style={{
                        flex: 1,
                        height: clPx,
                        borderRadius: '6px 6px 2px 2px',
                        background: '#10b981',
                        transition: 'height 0.25s ease',
                      }}
                    />
                  </div>

                  <div style={{ marginTop: 8, fontSize: 11, fontWeight: 600, color: '#64748b' }}>
                    {dateLabel}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 1 & 2 : PAGES LES PLUS AIMÉES & BOUTONS LES PLUS CLIQUÉS */}
      {(activeTab === 'all' || activeTab === 'pages' || activeTab === 'clicks') && (
        <div className={activeTab === 'all' ? 'nob-an-grid-2' : ''}>
          {/* PAGES LES PLUS AIMÉES */}
          {(activeTab === 'all' || activeTab === 'pages') && (
            <div className="nob-an-card">
              <div className="nob-an-card-title">
                <Eye size={20} color="#0284c7" weight="duotone" />
                <span>Pages les plus aimées par vos visiteurs</span>
              </div>
              <div className="nob-an-card-sub">
                Classement des pages les plus consultées sur votre site internet.
              </div>

              {(data?.topPages || []).slice(0, activeTab === 'pages' ? 15 : 7).map((page: any, idx: number) => (
                <div key={page.path} className="nob-an-row">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                      <span
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 8,
                          background: idx < 3 ? '#0284c7' : 'rgba(100,116,139,0.15)',
                          color: idx < 3 ? '#ffffff' : 'inherit',
                          fontSize: 12,
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {idx + 1}
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {page.title}
                        </div>
                        <div style={{ fontSize: 11.5, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span>{page.path}</span>
                          <a
                            href={page.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 700 }}
                          >
                            Ouvrir ↗
                          </a>
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: '#0284c7' }}>
                        {page.views} vues
                      </div>
                      <div style={{ fontSize: 11.5, color: '#64748b' }}>
                        {page.uniqueVisitors} visiteurs ({page.percentage}%)
                      </div>
                    </div>
                  </div>

                  <div style={{ height: 6, borderRadius: 999, background: 'rgba(100,116,139,0.15)', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${Math.max(page.percentage, 4)}%`,
                        background: '#0284c7',
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* BOUTONS & ZONES LES PLUS CLIQUÉS */}
          {(activeTab === 'all' || activeTab === 'clicks') && (
            <div className="nob-an-card">
              <div className="nob-an-card-title">
                <CursorClick size={20} color="#059669" weight="duotone" />
                <span>Où cliquent vos visiteurs ? (Boutons &amp; Actions)</span>
              </div>
              <div className="nob-an-card-sub">
                Les appels à l&apos;action (Devis, WhatsApp, Formations, Audit) qui convertissent le mieux.
              </div>

              {(data?.topClicks || []).slice(0, activeTab === 'clicks' ? 15 : 7).map((click: any, idx: number) => (
                <div key={idx} className="nob-an-row">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: 10.5,
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: 6,
                            background: 'rgba(16, 185, 129, 0.14)',
                            color: '#059669',
                            textTransform: 'uppercase',
                          }}
                        >
                          {click.type}
                        </span>
                        <span style={{ fontSize: 14, fontWeight: 700 }}>
                          {click.elementText}
                        </span>
                      </div>
                      <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 3 }}>
                        Cliqué depuis la page : <strong>{click.path}</strong>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: '#059669' }}>
                        {click.count} clics
                      </div>
                      <div style={{ fontSize: 11.5, color: '#64748b' }}>
                        {click.percentage}% des clics
                      </div>
                    </div>
                  </div>

                  <div style={{ height: 6, borderRadius: 999, background: 'rgba(100,116,139,0.15)', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${Math.max(click.percentage, 4)}%`,
                        background: '#10b981',
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 3 : LOCALISATION & APPAREILS */}
      {(activeTab === 'all' || activeTab === 'geo') && (
        <div className="nob-an-grid-2">
          {/* LOCALISATION (VILLES & PAYS) */}
          <div className="nob-an-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
              <div>
                <div className="nob-an-card-title">
                  <MapPin size={20} color="#d97706" weight="duotone" />
                  <span>Localisation de vos visiteurs</span>
                </div>
                <div className="nob-an-card-sub" style={{ marginBottom: 0 }}>
                  Villes et pays d&apos;où proviennent vos visiteurs.
                </div>
              </div>

              <div className="nob-an-period-group">
                <button
                  type="button"
                  onClick={() => setActiveGeoTab('cities')}
                  className={`nob-an-period-btn ${activeGeoTab === 'cities' ? 'active' : ''}`}
                  style={{ padding: '6px 12px', fontSize: 12 }}
                >
                  Par Ville
                </button>
                <button
                  type="button"
                  onClick={() => setActiveGeoTab('countries')}
                  className={`nob-an-period-btn ${activeGeoTab === 'countries' ? 'active' : ''}`}
                  style={{ padding: '6px 12px', fontSize: 12 }}
                >
                  Par Pays
                </button>
              </div>
            </div>

            {activeGeoTab === 'cities'
              ? (data?.locations?.cities || []).map((loc: any, idx: number) => (
                  <div key={idx} className="nob-an-row">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 20 }}>{getCountryFlag(loc.countryCode)}</span>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700 }}>{loc.city}</div>
                          <div style={{ fontSize: 11.5, color: '#64748b' }}>{loc.country}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 14.5, fontWeight: 800 }}>{loc.count} visites</div>
                        <div style={{ fontSize: 11.5, color: '#0284c7', fontWeight: 700 }}>{loc.percentage}%</div>
                      </div>
                    </div>
                    <div style={{ height: 6, borderRadius: 999, background: 'rgba(100,116,139,0.15)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.max(loc.percentage, 4)}%`, background: '#f59e0b', borderRadius: 999 }} />
                    </div>
                  </div>
                ))
              : (data?.locations?.countries || []).map((c: any, idx: number) => (
                  <div key={idx} className="nob-an-row">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 20 }}>{getCountryFlag(c.countryCode)}</span>
                        <div style={{ fontSize: 14, fontWeight: 700 }}>{c.country}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 14.5, fontWeight: 800 }}>{c.count} visites</div>
                        <div style={{ fontSize: 11.5, color: '#0284c7', fontWeight: 700 }}>{c.percentage}%</div>
                      </div>
                    </div>
                    <div style={{ height: 6, borderRadius: 999, background: 'rgba(100,116,139,0.15)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.max(c.percentage, 4)}%`, background: '#f59e0b', borderRadius: 999 }} />
                    </div>
                  </div>
                ))}
          </div>

          {/* APPAREILS & SOURCES D'ACQUISITION */}
          <div className="nob-an-card">
            <div className="nob-an-card-title">
              <ShareNetwork size={20} color="#0284c7" weight="duotone" />
              <span>Appareils utilisés &amp; Provenance du trafic</span>
            </div>
            <div className="nob-an-card-sub">
              Comment vos visiteurs accèdent à votre site (Téléphone vs Ordinateur, Google, Réseaux sociaux).
            </div>

            <div style={{ fontSize: 12.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: 10 }}>
              Appareils des visiteurs
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 22 }}>
              {(data?.devices || []).map((dev: any, idx: number) => {
                const isMobile = dev.device?.toLowerCase().includes('mobile');
                const Icon = isMobile ? DeviceMobile : Desktop;
                return (
                  <div
                    key={idx}
                    style={{
                      padding: 14,
                      borderRadius: 14,
                      background: 'rgba(2, 132, 199, 0.06)',
                      border: '1px solid rgba(2, 132, 199, 0.18)',
                      textAlign: 'center',
                    }}
                  >
                    <Icon size={22} color="#0284c7" weight="duotone" />
                    <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>{dev.percentage}%</div>
                    <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'capitalize' }}>{dev.device}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>{dev.count} visites</div>
                  </div>
                );
              })}
            </div>

            <div style={{ fontSize: 12.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: 10 }}>
              Canaux d&apos;acquisition (D&apos;où viennent-ils ?)
            </div>
            {(data?.sources || []).map((s: any, idx: number) => (
              <div key={idx} className="nob-an-row">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700 }}>{s.source}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#0284c7' }}>
                    {s.count} visites ({s.percentage}%)
                  </span>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: 'rgba(100,116,139,0.15)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.max(s.percentage, 4)}%`, background: '#0284c7', borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function getCountryFlag(countryCode: string): string {
  const code = (countryCode || 'SN').toUpperCase();
  const map: Record<string, string> = {
    SN: '🇸🇳',
    FR: '🇫🇷',
    CI: '🇨🇮',
    ML: '🇲🇱',
    MA: '🇲🇦',
    CA: '🇨🇦',
    US: '🇺🇸',
    BE: '🇧🇪',
    CH: '🇨🇭',
    GB: '🇬🇧',
    DE: '🇩🇪',
    GN: '🇬🇳',
    BF: '🇧🇫',
    TG: '🇹🇬',
    BJ: '🇧🇯',
    CM: '🇨🇲',
    GA: '🇬🇦',
  };
  return map[code] || '🌍';
}

export default AnalyticsDashboard;
