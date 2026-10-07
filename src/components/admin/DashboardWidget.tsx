'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@payloadcms/ui';
import {
  ChatCircleText,
  FileText,
  Receipt,
  UsersThree,
  NewspaperClipping,
  Browsers,
  FilePlus,
  SquaresFour,
} from '@phosphor-icons/react';

type StatItem = {
  slug: string;
  label: string;
  Icon: React.ComponentType<{ size?: number | string; weight?: any; className?: string }>;
  href: string;
  color: string;
};

const STATS: StatItem[] = [
  { slug: 'contact-messages', label: 'Messages reçus', Icon: ChatCircleText, href: '/admin/collections/contact-messages', color: '#0284c7' },
  { slug: 'quotes', label: 'Devis', Icon: FileText, href: '/admin/collections/quotes', color: '#0ea5e9' },
  { slug: 'invoices', label: 'Factures', Icon: Receipt, href: '/admin/collections/invoices', color: '#0369a1' },
  { slug: 'customers', label: 'Clients', Icon: UsersThree, href: '/admin/collections/customers', color: '#38bdf8' },
  { slug: 'articles', label: 'Articles', Icon: NewspaperClipping, href: '/admin/collections/articles', color: '#0284c7' },
  { slug: 'pages', label: 'Pages', Icon: Browsers, href: '/admin/collections/pages', color: '#00b4d8' },
];

const QUICK = [
  { label: 'Nouveau devis', Icon: FilePlus, href: '/admin/collections/quotes/create' },
  { label: 'Nouvel article', Icon: NewspaperClipping, href: '/admin/collections/articles/create' },
  { label: 'Voir les messages', Icon: ChatCircleText, href: '/admin/collections/contact-messages' },
];

function useCountUp(target: number | null) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (target === null) return;
    const start = performance.now();
    const dur = 800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return v;
}

const StatCard: React.FC<{ s: StatItem; value: number | null; i: number }> = ({ s, value, i }) => {
  const shown = useCountUp(value);
  return (
    <a href={s.href} className="nh-stat" style={{ ['--c' as any]: s.color, animationDelay: `${0.2 + i * 0.05}s` }}>
      <div className="nh-stat-ic"><s.Icon size={18} weight="duotone" /></div>
      <div className="nh-stat-val">{value === null ? '—' : shown}</div>
      <div className="nh-stat-label">{s.label}</div>
    </a>
  );
};

export const DashboardWidget: React.FC = () => {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'super_admin';
  const firstName = user?.name?.split(' ')[0] || (user?.email ? user.email.split('@')[0] : (isSuperAdmin ? 'Admin' : 'vous'));

  const [now, setNow] = useState<Date | null>(null);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [counts, setCounts] = useState<Record<string, number | null>>({});
  const [newMessagesCount, setNewMessagesCount] = useState<number | null>(null);
    const [isDarkWall, setIsDarkWall] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return document.documentElement.getAttribute('data-nob-theme') === 'dark'
          || localStorage.getItem('nob_dark_wallpaper') === 'true'
          || localStorage.getItem('nob-admin-dark-wallpaper') === 'true';
      } catch {
        return false;
      }
    }
    return false;
  });

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Poll for counts and unread/new messages every 10 seconds so stats update dynamically
  useEffect(() => {
    let alive = true;

    const fetchAllCounts = () => {
      STATS.forEach((s) => {
        fetch(`/api/${s.slug}?limit=0&depth=0`, { credentials: 'same-origin' })
          .then((r) => (r.ok ? r.json() : null))
          .then((d) => {
            if (!alive) return;
            const total = typeof d?.totalDocs === 'number' ? d.totalDocs : null;
            setCounts((prev) => ({ ...prev, [s.slug]: total }));
          })
          .catch(() => {});
      });

      // Specifically check for new/unread contact messages
      fetch(`/api/contact-messages?where[status][equals]=new&limit=0&depth=0`, { credentials: 'same-origin' })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (!alive) return;
          if (typeof d?.totalDocs === 'number') {
            setNewMessagesCount(d.totalDocs);
          }
        })
        .catch(() => {});
    };

    fetchAllCounts();
    const poller = setInterval(fetchAllCounts, 10000);

    return () => {
      alive = false;
      clearInterval(poller);
    };
  }, []);

  // Dynamic context-aware phrases based on real-time activity
  const phrases = useMemo(() => {
    const list: string[] = [`Bienvenue, ${firstName}`];

    if (newMessagesCount && newMessagesCount > 0) {
      list.push(
        newMessagesCount === 1
          ? '🔔 1 nouveau message en attente'
          : `🔔 ${newMessagesCount} nouveaux messages en attente`
      );
    }

    if (counts['quotes'] && counts['quotes'] > 0) {
      list.push(`💼 ${counts['quotes']} devis enregistrés`);
    }

    if (counts['invoices'] && counts['invoices'] > 0) {
      list.push(`📄 ${counts['invoices']} factures dans le système`);
    }

    list.push('NOB TECHNOLOGIES — Excellence numérique');
    list.push('Plateforme opérationnelle');

    return list;
  }, [firstName, newMessagesCount, counts]);

  useEffect(() => {
    const p = setInterval(() => setPhraseIdx((i) => (i + 1) % phrases.length), 4500);
    return () => clearInterval(p);
  }, [phrases.length]);

  useEffect(() => {
    const updateDark = () => {
      const isDark = document.documentElement.getAttribute('data-nob-theme') === 'dark'
        || localStorage.getItem('nob-admin-dark-wallpaper') === 'true';
      setIsDarkWall(isDark);
    };
    updateDark();
    window.addEventListener('nob:wallpaper-changed', updateDark);
    window.addEventListener('nob:theme-changed', updateDark);
    return () => {
      window.removeEventListener('nob:wallpaper-changed', updateDark);
      window.removeEventListener('nob:theme-changed', updateDark);
    };
  }, []);

  const time = now ? now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '··:··';
  const date = now ? now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '';

  return (
    <div className={`nh-root ${isDarkWall ? 'is-dark' : 'is-light'} custom-os-dashboard`}>
      <style>{`
        /* WALLPAPERS */
        .nh-wall { position: fixed; inset: 0; z-index: 0; background: #F8FAFC url('/admin-wallpaper.jpg') center/cover no-repeat; transition: background-image 0.5s ease; animation: nhWall 1.2s ease-out both; }
        .nh-wall.dark { background: #020617 url('/admin-wallpaper-dark.jpg') center/cover no-repeat; }
        
        /* AUCUN FILTRE / CONTOUR */
        .nh-wall::after { display: none !important; }
        .nh-wall.dark::after { display: none !important; }
        
        @keyframes nhWall { from { opacity: 0; transform: scale(1.03); } to { opacity: 1; transform: scale(1); } }
        
        /* CONTENEUR PLEIN VIEWPORT SANS AUCUN SCROLL */
        .nh-root { position: relative; z-index: 1; height: 100vh; max-height: 100vh; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: clamp(14px, 2.5vh, 26px); padding: 20px 20px 84px; font-family: 'Inter', system-ui, -apple-system, sans-serif; text-align: center; box-sizing: border-box; }
        
        /* TYPOGRAPHIE MODE CLAIR */
        .nh-root.is-light { color: #0F172A; }
        .nh-root.is-light .nh-time { font-size: clamp(2.8rem, 6vw, 4.8rem); font-weight: 800; letter-spacing: -0.045em; line-height: 1; background: linear-gradient(180deg, #0284C7 0%, #0369A1 70%); -webkit-background-clip: text; background-clip: text; color: transparent; text-shadow: 0 10px 30px rgba(2,132,199,0.2); animation: nhUp .8s cubic-bezier(.16,1,.3,1) both; font-variant-numeric: tabular-nums; }
        .nh-root.is-light .nh-date { margin-top: 4px; font-size: clamp(0.9rem, 1.8vw, 1.15rem); font-weight: 600; color: #475569; text-transform: capitalize; animation: nhUp .8s .1s cubic-bezier(.16,1,.3,1) both; }
        .nh-root.is-light .nh-greet { height: 1.6em; margin: 6px 0 8px; font-size: clamp(1rem, 2.2vw, 1.35rem); font-weight: 700; color: #1E293B; letter-spacing: -0.01em; display: flex; align-items: center; justify-content: center; }
        
        /* BOUTONS ACTIONS MODE CLAIR */
        .nh-root.is-light .nh-btn { all: unset; box-sizing: border-box; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; height: 38px; padding: 0 16px; border-radius: 999px; font-size: 13px; font-weight: 600; color: #0F172A; background: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.9); box-shadow: 0 8px 20px -6px rgba(0,0,0,0.08); backdrop-filter: blur(20px) saturate(160%); -webkit-backdrop-filter: blur(20px) saturate(160%); transition: transform .2s ease, background .2s ease, box-shadow .2s ease; }
        .nh-root.is-light .nh-btn:hover { background: #FFFFFF; transform: translateY(-2px); box-shadow: 0 12px 24px -6px rgba(0,0,0,0.12); }
        .nh-root.is-light .nh-btn.primary { background: linear-gradient(135deg, #0284C7, #0369A1); color: #FFFFFF; border-color: transparent; box-shadow: 0 10px 26px -8px rgba(2,132,199,0.5); }
        .nh-root.is-light .nh-btn.primary:hover { background: linear-gradient(135deg, #0369A1, #075985); color: #FFFFFF; }
        
        /* CARTES STATS MODE CLAIR */
        .nh-root.is-light .nh-stat { text-decoration: none !important; color: #0F172A !important; text-align: left; padding: 12px 14px; border-radius: 16px; background: rgba(255,255,255,0.65); border: 1px solid rgba(255,255,255,0.85); backdrop-filter: blur(24px) saturate(180%); -webkit-backdrop-filter: blur(24px) saturate(180%); box-shadow: 0 14px 30px -12px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5); animation: nhUp .7s cubic-bezier(.16,1,.3,1) both; transition: transform .25s ease, background-color .25s ease, border-color .25s ease, box-shadow .25s ease; will-change: transform; transform: translate3d(0, 0, 0); }
        .nh-root.is-light .nh-stat:hover { transform: translate3d(0, -4px, 0); background-color: rgba(255,255,255,0.92); border-color: #FFFFFF; box-shadow: 0 18px 36px -8px rgba(0,0,0,0.14), 0 0 16px -4px var(--c); }
        .nh-root.is-light .nh-stat-label { margin-top: 4px; font-size: 11.5px; color: #475569; font-weight: 600; }
        .nh-root.is-light .nh-stat-val { font-size: 1.6rem; font-weight: 800; color: #0F172A; letter-spacing: -0.03em; line-height: 1; font-variant-numeric: tabular-nums; }

        /* TYPOGRAPHIE & STYLE MODE SOMBRE */
        .nh-root.is-dark { color: #FFFFFF; }
        .nh-root.is-dark .nh-time { font-size: clamp(3.2rem, 7vw, 5.5rem); font-weight: 700; letter-spacing: -0.045em; line-height: 1; background: linear-gradient(180deg, #fff 40%, rgba(255,255,255,.65)); -webkit-background-clip: text; background-clip: text; color: transparent; text-shadow: 0 10px 40px rgba(0,212,255,.2); animation: nhUp .8s cubic-bezier(.16,1,.3,1) both; font-variant-numeric: tabular-nums; }
        .nh-root.is-dark .nh-date { margin-top: 4px; font-size: clamp(0.95rem, 2vw, 1.25rem); font-weight: 500; color: rgba(255,255,255,.75); text-transform: capitalize; animation: nhUp .8s .1s cubic-bezier(.16,1,.3,1) both; }
        .nh-root.is-dark .nh-greet { height: 1.8em; margin: 8px 0 10px; font-size: clamp(1.05rem, 2.4vw, 1.45rem); font-weight: 600; color: #FFFFFF; letter-spacing: -0.01em; display: flex; align-items: center; justify-content: center; }
        
        /* BOUTONS ACTIONS MODE SOMBRE */
        .nh-root.is-dark .nh-btn { all: unset; box-sizing: border-box; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; height: 38px; padding: 0 16px; border-radius: 999px; font-size: 13px; font-weight: 600; color: #fff; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.18); backdrop-filter: blur(20px) saturate(160%); -webkit-backdrop-filter: blur(20px) saturate(160%); transition: transform .2s ease, background .2s ease; }
        .nh-root.is-dark .nh-btn:hover { background: rgba(255,255,255,.18); transform: translateY(-2px); }
        .nh-root.is-dark .nh-btn.primary { background: linear-gradient(135deg, #00D4FF, #0077b6); border-color: transparent; box-shadow: 0 10px 26px -8px rgba(0,212,255,.5); }
        
        /* CARTES STATS MODE SOMBRE */
        .nh-root.is-dark .nh-stat { text-decoration: none !important; color: #fff !important; text-align: left; padding: 14px 16px; border-radius: 18px; background: rgba(15,23,42,0.65); border: 1px solid rgba(255,255,255,0.12); backdrop-filter: blur(20px) saturate(160%); -webkit-backdrop-filter: blur(20px) saturate(160%); box-shadow: 0 14px 30px -14px rgba(0,0,0,0.6); animation: nhUp .7s cubic-bezier(.16,1,.3,1) both; transition: transform .25s ease, background-color .25s ease, border-color .25s ease, box-shadow .25s ease; will-change: transform; transform: translate3d(0, 0, 0); }
        .nh-root.is-dark .nh-stat:hover { transform: translate3d(0, -4px, 0); background-color: rgba(30,41,59,0.75); border-color: rgba(255,255,255,0.22); box-shadow: 0 18px 36px -10px rgba(0,0,0,0.8), 0 0 16px -4px var(--c); }
        .nh-root.is-dark .nh-stat-label { margin-top: 4px; font-size: 12px; color: rgba(255,255,255,.7); font-weight: 500; }
        .nh-root.is-dark .nh-stat-val { font-size: 1.8rem; font-weight: 700; color: #FFFFFF; letter-spacing: -0.03em; line-height: 1; font-variant-numeric: tabular-nums; }

        .nh-greet span { animation: nhPhrase 4.5s ease-in-out both; display: block; }
        @keyframes nhPhrase { 0% { opacity: 0; transform: translateY(8px); filter: blur(4px); } 12%, 88% { opacity: 1; transform: none; filter: none; } 100% { opacity: 0; transform: translateY(-8px); filter: blur(4px); } }
        @keyframes nhUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        
        .nh-actions { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 12px; animation: nhUp .8s .15s cubic-bezier(.16,1,.3,1) both; }
        .nh-btn:active { transform: scale(.97); }

        .nh-stats { width: 100%; max-width: 960px; display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; }
        .nh-stat:active { transform: translate3d(0, -1px, 0); }
        .nh-stat-ic { width: 30px; height: 30px; border-radius: 9px; display: flex; align-items: center; justify-content: center; background: var(--c); color: #FFFFFF; box-shadow: 0 5px 12px -3px var(--c); margin-bottom: 8px; }
        
        @media (max-width: 640px) { .nh-stats { grid-template-columns: repeat(2, 1fr); } .nh-root { padding-top: 10px; } }
        @media (prefers-reduced-motion: reduce) { .nh-root *, .nh-wall { animation: none !important; transition: none !important; } }
      `}</style>

      <div className={`nh-wall ${isDarkWall ? 'dark' : ''}`} aria-hidden />

      <div>
        <div className="nh-time">{time}</div>
        <div className="nh-date">{date}</div>
        <div className="nh-greet" aria-live="polite">
          <span key={phraseIdx % phrases.length}>{phrases[phraseIdx % phrases.length]}</span>
        </div>
      </div>

      <div className="nh-actions">
        <button className="nh-btn primary" onClick={() => window.dispatchEvent(new Event('nob:open-launcher'))}>
          <SquaresFour size={16} weight="bold" /> Ouvrir les applications
        </button>
        {QUICK.map((q) => (
          <a key={q.href} href={q.href} className="nh-btn"><q.Icon size={15} weight="duotone" /> {q.label}</a>
        ))}
      </div>

      <div className="nh-stats">
        {STATS.map((s, i) => (
          <StatCard key={s.slug} s={s} value={counts[s.slug] ?? null} i={i} />
        ))}
      </div>
    </div>
  );
};

