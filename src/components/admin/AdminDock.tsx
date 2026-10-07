'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@payloadcms/ui';
import { Home, LayoutGrid, Search, ArrowLeft, X, Moon, Sun } from 'lucide-react';
import { appGroups, findAppByPath, pushRecent, type AdminApp } from './adminApps';

/**
 * Palette de dégradés raffinés style Silicon Valley / Apple Pro Tech :
 * Surfaces en verre fumé, fond ardoise et reflets cyan subtils (évite l'effet bariolé / coloriage)
 */
const APP_GRADIENTS: Record<string, string> = {
  // Navigation & Contenu : Nuances d'ardoise et bleu acier
  'Pages': 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
  'FAQ': 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
  'Médias': 'linear-gradient(145deg, #1e293b 0%, #0b1329 100%)',

  // Solutions & Offres : Signature Cyan NOB TECHNOLOGIES
  'Services': 'linear-gradient(145deg, #0369a1 0%, #082f49 100%)',
  'Plans Tarifaires': 'linear-gradient(145deg, #0284c7 0%, #075985 100%)',
  "Offres d'emploi": 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',

  // Portfolio & Entreprise : Ardoise profonde & métal brossé
  'Réalisations': 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
  'Clients Web': 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
  'Partenaires': 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
  'Témoignages': 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',

  // CRM & Business : Bleu marine tech & cyan profond
  'Clients (CRM)': 'linear-gradient(145deg, #0a2540 0%, #041426 100%)',
  'Devis': 'linear-gradient(145deg, #0c4a6e 0%, #082f49 100%)',
  'Factures': 'linear-gradient(145deg, #0a2540 0%, #021a30 100%)',

  // Communication & Support
  'Articles': 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
  'News': 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
  'Messages Contact': 'linear-gradient(145deg, #0284c7 0%, #0a2540 100%)',
  'Aide & Tutoriel': 'linear-gradient(145deg, #334155 0%, #1e293b 100%)',

  // Système & Sécurité
  'Utilisateurs': 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
  "Journaux d'activité": 'linear-gradient(145deg, #1e293b 0%, #0b0f19 100%)',
  'Paramètres du site': 'linear-gradient(145deg, #334155 0%, #0f172a 100%)',
};

export const AdminDock: React.FC<{ darkWallpaper?: boolean }> = ({ darkWallpaper = false }) => {
  const pathname = usePathname() || '';
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'super_admin';
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  const isAuthPage = pathname === '/admin/login' || pathname === '/admin/create-first-user' || pathname.startsWith('/admin/forgot') || pathname.startsWith('/admin/reset') || pathname.startsWith('/admin/logout');
  const visible = pathname.startsWith('/admin') && !isAuthPage && !!user;
  const isHome = pathname === '/admin';
  const current = findAppByPath(pathname);

  useEffect(() => {
    if (visible) document.body.classList.add('has-nob-dock');
    return () => document.body.classList.remove('has-nob-dock');
  }, [visible]);

  useEffect(() => { setOpen(false); setQuery(''); setActiveCategory('all'); }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === 'Escape') setOpen(false);
    };
    const onCustomOpen = () => setOpen(true);

    window.addEventListener('keydown', onKey);
    window.addEventListener('nob:open-launcher', onCustomOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('nob:open-launcher', onCustomOpen);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  // Categories list for iPad style segmented pill bar
  const categories = useMemo(() => {
    const list = [{ id: 'all', label: 'Toutes' }];
    appGroups
      .filter((g) => !g.adminOnly || isSuperAdmin)
      .forEach((g) => {
        const short = g.title.split('&')[0].trim();
        list.push({ id: g.title, label: short });
      });
    return list;
  }, [isSuperAdmin]);

  // Flat list of matching apps filtered by category & search
  const filteredApps = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list: { app: AdminApp; groupTitle: string }[] = [];

    appGroups
      .filter((g) => !g.adminOnly || isSuperAdmin)
      .forEach((g) => {
        if (activeCategory !== 'all' && g.title !== activeCategory) return;
        g.apps.forEach((a) => {
          if (!q || a.name.toLowerCase().includes(q) || g.title.toLowerCase().includes(q)) {
            list.push({ app: a, groupTitle: g.title });
          }
        });
      });

    return list;
  }, [query, activeCategory, isSuperAdmin]);

  if (!visible) return null;

  const firstApp = filteredApps[0]?.app;

  return (
    <>
      <style>{`
        body.has-nob-dock { padding-bottom: 0 !important; }

        /* ========================================================
           DOCK FLOTTANT : MODE CLAIR ET MODE SOMBRE
           ======================================================== */
        .nob-dock { position: fixed; left: 50%; bottom: 18px; transform: translateX(-50%); z-index: 9000; display: flex; align-items: center; gap: 6px; padding: 7px 10px; border-radius: 22px; transition: all 0.3s ease; max-width: calc(100vw - 24px); }
        .nob-dock button, .nob-dock a { all: unset; box-sizing: border-box; cursor: pointer; display: flex; align-items: center; gap: 8px; height: 42px; padding: 0 14px; border-radius: 14px; font: 600 13px 'Plus Jakarta Sans', system-ui, sans-serif; transition: background .18s, color .18s, transform .22s cubic-bezier(.34,1.56,.64,1); white-space: nowrap; }
        .nob-dock button:active, .nob-dock a:active { transform: scale(0.94); }

        /* DOCK EN MODE CLAIR */
        .nob-dock.is-light { background: rgba(255, 255, 255, 0.85); border: 1px solid rgba(255, 255, 255, 0.95); backdrop-filter: blur(28px) saturate(190%); -webkit-backdrop-filter: blur(28px) saturate(190%); box-shadow: 0 20px 48px -10px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04); }
        .nob-dock.is-light button, .nob-dock.is-light a { color: #334155; }
        .nob-dock.is-light button:hover, .nob-dock.is-light a:hover { background: rgba(0, 0, 0, 0.06); color: #0F172A; transform: translateY(-2px); }
        .nob-dock.is-light .active { background: rgba(2, 132, 199, 0.12); color: #0284C7; box-shadow: inset 0 0 0 1px rgba(2, 132, 199, 0.25); }
        .nob-dock.is-light .sep { width: 1px; height: 22px; background: rgba(0, 0, 0, 0.1); margin: 0 2px; }
        .nob-dock.is-light .where { padding: 0 10px; color: #64748B; font: 500 12px 'Plus Jakarta Sans', system-ui, sans-serif; max-width: 180px; overflow: hidden; text-overflow: ellipsis; }
        .nob-dock.is-light .where b { color: #0F172A; font-weight: 600; }
        .nob-dock.is-light kbd { font: 600 10px 'Inter', sans-serif; padding: 2px 6px; border-radius: 6px; background: rgba(0, 0, 0, 0.06); color: #64748B; }

        /* DOCK EN MODE SOMBRE */
        .nob-dock.is-dark { background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(255, 255, 255, 0.14); backdrop-filter: blur(24px) saturate(180%); -webkit-backdrop-filter: blur(24px) saturate(180%); box-shadow: 0 24px 60px -10px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06); }
        .nob-dock.is-dark button, .nob-dock.is-dark a { color: #CBD5E1; }
        .nob-dock.is-dark button:hover, .nob-dock.is-dark a:hover { background: rgba(255, 255, 255, 0.12); color: #fff; transform: translateY(-2px); }
        .nob-dock.is-dark .active { background: rgba(0, 212, 255, 0.18); color: #00D4FF; box-shadow: inset 0 0 0 1px rgba(0, 212, 255, 0.25); }
        .nob-dock.is-dark .sep { width: 1px; height: 22px; background: rgba(255, 255, 255, 0.14); margin: 0 2px; }
        .nob-dock.is-dark .where { padding: 0 10px; color: #94A3B8; font: 500 12px 'Plus Jakarta Sans', system-ui, sans-serif; max-width: 180px; overflow: hidden; text-overflow: ellipsis; }
        .nob-dock.is-dark .where b { color: #fff; font-weight: 600; }
        .nob-dock.is-dark kbd { font: 600 10px 'Inter', sans-serif; padding: 2px 6px; border-radius: 6px; background: rgba(255, 255, 255, 0.1); color: #94A3B8; }

        @media (max-width: 640px) { .nob-dock .label, .nob-dock .where, .nob-dock kbd { display: none; } .nob-dock button, .nob-dock a { padding: 0 14px; } }

        /* ========================================================
           LANCEUR IPAD / IPHONE SPRINGBOARD : LIGHT & DARK
           ======================================================== */
        .nob-launcher { position: fixed; inset: 0; z-index: 9500; display: flex; flex-direction: column; align-items: center; padding: 5vh 20px 40px; overflow-y: auto; animation: nobSpringIn .28s cubic-bezier(.16,1,.3,1) both; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; transition: background 0.3s ease; }
        @keyframes nobSpringIn { from { opacity: 0; transform: scale(1.04); filter: blur(12px); } to { opacity: 1; transform: scale(1); filter: blur(0); } }

        /* FOND & EFFET DU LANCEUR EN MODE CLAIR (APPLE FROSTED DAYLIGHT) */
        .nob-launcher.is-light { background: rgba(248, 250, 252, 0.88); backdrop-filter: blur(45px) saturate(190%); -webkit-backdrop-filter: blur(45px) saturate(190%); color: #0F172A; }
        
        /* FOND & EFFET DU LANCEUR EN MODE SOMBRE (APPLE MIDNIGHT) */
        .nob-launcher.is-dark { background: rgba(2, 6, 23, 0.90); backdrop-filter: blur(45px) saturate(180%); -webkit-backdrop-filter: blur(45px) saturate(180%); color: #F8FAFC; }

        /* SPOTLIGHT SEARCH */
        .nob-spotlight { width: 100%; max-width: 440px; display: flex; align-items: center; gap: 12px; padding: 0 16px; height: 46px; border-radius: 999px; transition: all .2s ease; }
        .nob-launcher.is-light .nob-spotlight { background: rgba(255, 255, 255, 0.85); border: 1px solid rgba(0, 0, 0, 0.1); box-shadow: 0 10px 28px -6px rgba(0,0,0,0.08); }
        .nob-launcher.is-light .nob-spotlight:focus-within { background: #FFFFFF; border-color: #0284C7; box-shadow: 0 0 0 3px rgba(2,132,199,0.2), 0 14px 32px -6px rgba(0,0,0,0.12); }
        .nob-launcher.is-light .nob-spotlight input { color: #0F172A; }
        .nob-launcher.is-light .nob-spotlight input::placeholder { color: #94A3B8; }
        .nob-launcher.is-light .nob-spotlight-close { color: #64748B; }
        .nob-launcher.is-light .nob-spotlight-close:hover { background: rgba(0,0,0,0.06); color: #0F172A; }

        .nob-launcher.is-dark .nob-spotlight { background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.18); box-shadow: 0 10px 30px -8px rgba(0,0,0,0.5); }
        .nob-launcher.is-dark .nob-spotlight:focus-within { background: rgba(255, 255, 255, 0.18); border-color: #00D4FF; box-shadow: 0 0 0 3px rgba(0,212,255,0.25), 0 16px 36px -8px rgba(0,0,0,0.6); }
        .nob-launcher.is-dark .nob-spotlight input { color: #FFFFFF; }
        .nob-launcher.is-dark .nob-spotlight input::placeholder { color: rgba(255,255,255,0.55); }
        .nob-launcher.is-dark .nob-spotlight-close { color: rgba(255,255,255,0.6); }
        .nob-launcher.is-dark .nob-spotlight-close:hover { background: rgba(255,255,255,0.15); color: #fff; }

        .nob-spotlight input { all: unset; flex: 1; font-size: 14.5px; font-weight: 500; }
        .nob-spotlight-close { all: unset; cursor: pointer; display: flex; padding: 5px; border-radius: 50%; transition: background .15s, color .15s; }

        /* PILLS CATÉGORIES */
        .nob-categories { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; margin-top: 18px; max-width: 700px; }
        .nob-cat-pill { all: unset; box-sizing: border-box; cursor: pointer; padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 500; transition: all .18s ease; }
        
        .nob-launcher.is-light .nob-cat-pill { color: #475569; background: rgba(255, 255, 255, 0.65); border: 1px solid rgba(0, 0, 0, 0.08); }
        .nob-launcher.is-light .nob-cat-pill:hover { background: #FFFFFF; color: #0F172A; }
        .nob-launcher.is-light .nob-cat-pill.active { background: #0284C7; color: #FFFFFF; font-weight: 600; border-color: #0284C7; box-shadow: 0 4px 12px rgba(2,132,199,0.3); }

        .nob-launcher.is-dark .nob-cat-pill { color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); }
        .nob-launcher.is-dark .nob-cat-pill:hover { background: rgba(255,255,255,0.12); color: #fff; }
        .nob-launcher.is-dark .nob-cat-pill.active { background: #fff; color: #020617; font-weight: 600; border-color: #fff; box-shadow: 0 4px 14px rgba(255,255,255,0.25); }

        /* GRILLE SPRINGBOARD */
        .nob-springboard { width: 100%; max-width: 860px; margin-top: 32px; display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 26px 18px; justify-items: center; }
        .nob-app-item { all: unset; box-sizing: border-box; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 10px; width: 106px; text-decoration: none !important; text-align: center; border-radius: 22px; padding: 6px 2px; transition: transform .22s cubic-bezier(.34,1.56,.64,1); }
        .nob-app-item:hover, .nob-app-item.focused { transform: scale(1.08) translateY(-4px); }
        .nob-app-item:active { transform: scale(0.92); }

        /* ICÔNE SQUIRCLE APPLE / SILICON VALLEY TECH */
        /* ICÔNE SQUIRCLE APPLE / SILICON VALLEY TECH : LIQUID GLASS PRO */
        .nob-app-icon {
          width: 72px;
          height: 72px;
          border-radius: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease, border-color .25s ease;
        }

        /* Thème clair : icône sombre très lisible sur verre fumé clair satiné */
        .nob-launcher.is-light .nob-app-icon {
          background: linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(241,245,249,0.7) 100%) !important;
          border: 1px solid rgba(15,23,42,0.12);
          box-shadow: 0 10px 24px -6px rgba(15,23,42,0.12), 0 2px 6px rgba(15,23,42,0.06), inset 0 1.5px 1px #ffffff;
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          color: #0284c7;
        }
        .nob-launcher.is-light .nob-app-icon::before {
          content: '';
          position: absolute;
          top: 0; left: 8%; right: 8%; height: 42%;
          border-radius: 0 0 50% 50% / 0 0 100% 100%;
          background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0));
          pointer-events: none;
        }
        .nob-launcher.is-light .nob-app-icon::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 85% 15%, rgba(14,165,233,0.18), transparent 50%);
          pointer-events: none;
        }
        .nob-launcher.is-light .nob-app-item:hover .nob-app-icon {
          transform: translateY(-4px) scale(1.06);
          border-color: #0284c7;
          color: #0284c7;
          box-shadow: 0 18px 36px -8px rgba(2,132,199,0.32), 0 4px 12px rgba(2,132,199,0.18), inset 0 2px 1px #ffffff;
        }

        /* Thème sombre : verre fumé ardoise profond, reflets cyan NOB */
        .nob-launcher.is-dark .nob-app-icon {
          background: linear-gradient(145deg, rgba(30,41,59,0.7) 0%, rgba(15,23,42,0.85) 100%) !important;
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: 0 12px 28px -6px rgba(0,0,0,0.6), inset 0 1.5px 1px rgba(255,255,255,0.22);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          color: #38bdf8;
        }
        .nob-launcher.is-dark .nob-app-icon::before {
          content: '';
          position: absolute;
          top: 0; left: 8%; right: 8%; height: 42%;
          border-radius: 0 0 50% 50% / 0 0 100% 100%;
          background: linear-gradient(180deg, rgba(255,255,255,0.25), rgba(255,255,255,0));
          pointer-events: none;
        }
        .nob-launcher.is-dark .nob-app-icon::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 85% 15%, rgba(56,189,248,0.2), transparent 55%);
          pointer-events: none;
        }
        .nob-launcher.is-dark .nob-app-item:hover .nob-app-icon {
          transform: translateY(-4px) scale(1.06);
          border-color: #38bdf8;
          color: #38bdf8;
          box-shadow: 0 18px 36px -8px rgba(56,189,248,0.35), 0 0 20px -2px rgba(56,189,248,0.25), inset 0 2px 1px rgba(255,255,255,0.4);
        }

        .nob-app-icon svg { position: relative; z-index: 1; filter: drop-shadow(0 1px 2px rgba(2,6,23,0.15)); }
        /* LIBELLÉ DE L'APPLICATION */
        .nob-app-label { font-size: 12px; font-weight: 500; line-height: 1.25; letter-spacing: -0.015em; font-family: 'Plus Jakarta Sans', sans-serif; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; max-width: 100px; word-break: break-word; margin-top: 2px; }
        
        /* MODE CLAIR : TEXTE SOMBRE ET NET */
        .nob-launcher.is-light .nob-app-label { color: #334155; }
        .nob-launcher.is-light .nob-app-item:hover .nob-app-label { font-weight: 600; color: #0284C7; }
        
        /* MODE SOMBRE : TEXTE BLANC LUMINEUX */
        .nob-launcher.is-dark .nob-app-label { color: #E2E8F0; }
        .nob-launcher.is-dark .nob-app-item:hover .nob-app-label { font-weight: 600; color: #38BDF8; }

        .nob-spring-empty { grid-column: 1 / -1; text-align: center; margin-top: 40px; font-size: 14.5px; }
        .nob-launcher.is-light .nob-spring-empty { color: #64748B; }
        .nob-launcher.is-dark .nob-spring-empty { color: rgba(255,255,255,0.6); }

        .nob-spring-footer { margin-top: 36px; text-align: center; font-size: 11.5px; letter-spacing: 0.02em; }
        .nob-launcher.is-light .nob-spring-footer { color: #94A3B8; }
        .nob-launcher.is-dark .nob-spring-footer { color: rgba(255,255,255,0.4); }
        
        @media (max-width: 640px) {
          .nob-springboard { grid-template-columns: repeat(4, 1fr); gap: 18px 8px; }
          .nob-app-icon { width: 54px; height: 54px; border-radius: 15px; }
          .nob-app-item { width: 76px; }
          .nob-app-label { font-size: 10.5px; }
        }
      `}</style>

      <nav className={`nob-dock ${darkWallpaper ? 'is-dark' : 'is-light'}`} aria-label="Navigation principale">
        <button type="button" onClick={() => window.history.back()} aria-label="Retour" title="Retour">
          <ArrowLeft size={18} />
        </button>
        <a href="/admin" className={isHome ? 'active' : ''} aria-label="Accueil" title="Accueil">
          <Home size={18} /> <span className="label">Accueil</span>
        </a>
        <button type="button" onClick={() => setOpen(true)} className={open ? 'active' : ''} aria-label="Toutes les applications" title="Applications (Ctrl+K)">
          <LayoutGrid size={18} /> <span className="label">Applications</span> <kbd>Ctrl K</kbd>
        </button>
        
        {/* BOUTON TOGGLE WALLPAPER MODE SOMBRE */}
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event('nob:toggle-dark-wallpaper'))}
          aria-label={darkWallpaper ? 'Wallpaper lumineux' : 'Wallpaper ultra-sombre'}
          title={darkWallpaper ? 'Passer en mode clair' : 'Passer en mode sombre'}
        >
          {darkWallpaper ? <Sun size={17} color="#F59E0B" /> : <Moon size={17} color="#64748B" />}
          <span className="label">{darkWallpaper ? 'Clair' : 'Sombre'}</span>
        </button>

        {current && (
          <>
            <span className="sep" />
            <span className="where">Vous êtes dans <b>{current.app.name}</b></span>
          </>
        )}
      </nav>

      {open && (
        <div className={`nob-launcher ${darkWallpaper ? 'is-dark' : 'is-light'}`} onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="Applications">
          {/* BARRE SPOTLIGHT SEARCH */}
          <div className="nob-spotlight" onClick={(e) => e.stopPropagation()}>
            <Search size={18} color={darkWallpaper ? "rgba(255,255,255,0.7)" : "#64748B"} />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && firstApp) {
                  pushRecent(firstApp.href);
                  window.location.href = firstApp.href;
                }
              }}
              placeholder="Rechercher une application… (Entrée pour ouvrir)"
            />
            {query ? (
              <button className="nob-spotlight-close" onClick={() => setQuery('')} aria-label="Effacer">
                <X size={16} />
              </button>
            ) : (
              <button className="nob-spotlight-close" onClick={() => setOpen(false)} aria-label="Fermer">
                <X size={16} />
              </button>
            )}
          </div>

          {/* PILLS CATÉGORIES STYLE IPAD */}
          {!query && (
            <div className="nob-categories" onClick={(e) => e.stopPropagation()}>
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`nob-cat-pill ${activeCategory === c.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}

          {/* SPRINGBOARD GRILLE IPAD / IPHONE */}
          <div className="nob-springboard" onClick={(e) => e.stopPropagation()}>
            {filteredApps.length === 0 ? (
              <div className="nob-spring-empty">Aucune application trouvée pour « {query} ».</div>
            ) : (
              filteredApps.map(({ app }, index) => {
                const gradient = APP_GRADIENTS[app.name] || 'linear-gradient(135deg, #0284c7, #0369a1)';
                const isFirst = index === 0 && !!query;
                return (
                  <a
                    key={app.href}
                    href={app.href}
                    className={`nob-app-item ${isFirst ? 'focused' : ''}`}
                    onClick={() => pushRecent(app.href)}
                    title={app.name}
                  >
                    <div className="nob-app-icon" >
                      <app.Icon size={32} weight="duotone" />
                    </div>
                    <span className="nob-app-label">{app.name}</span>
                  </a>
                );
              })
            )}
          </div>

          <div className="nob-spring-footer">
            Appuyez sur Échap pour fermer · Ctrl + K pour ouvrir de n'importe où
          </div>
        </div>
      )}
    </>
  );
};



