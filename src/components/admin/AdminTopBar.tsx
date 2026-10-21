'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@payloadcms/ui';
import { Camera, LogOut, Moon, Sun, UserRound, Loader2, ShieldCheck, ExternalLink, Globe } from 'lucide-react';
import { NobLogo } from '../NobLogo';

type Props = { darkWallpaper?: boolean };

export const AdminTopBar: React.FC<Props> = ({ darkWallpaper = false }) => {
  const pathname = usePathname() || '';
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const isAuthPage =
    pathname === '/admin/login' ||
    pathname === '/admin/create-first-user' ||
    pathname.startsWith('/admin/forgot') ||
    pathname.startsWith('/admin/reset') ||
    pathname.startsWith('/admin/logout');
  const visible = pathname.startsWith('/admin') && !isAuthPage && !!user;

  useEffect(() => {
    if (visible) document.body.classList.add('has-nob-topbar');
    return () => document.body.classList.remove('has-nob-topbar');
  }, [visible]);

  // Résout l'URL de l'avatar (objet peuplé ou simple identifiant)
  useEffect(() => {
    const av: any = (user as any)?.avatar;
    if (!av) { setAvatarUrl(null); return; }
    if (typeof av === 'object' && av.url) { setAvatarUrl(av.url); return; }
    const id = typeof av === 'object' ? av.id : av;
    if (!id) return;
    let alive = true;
    fetch(`/api/media/${id}?depth=0`, { credentials: 'same-origin' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (alive && d?.url) setAvatarUrl(d.url); })
      .catch(() => {});
    return () => { alive = false; };
  }, [user]);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const onPickFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !user) return;
    if (!file.type.startsWith('image/')) { setError('Veuillez choisir une image.'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Image trop lourde (max 5 Mo).'); return; }
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('_payload', JSON.stringify({ alt: `Avatar de ${(user as any).name || user.email}` }));
      const up = await fetch('/api/media', { method: 'POST', body: fd, credentials: 'same-origin' });
      const upJson = await up.json();
      if (!up.ok || !upJson?.doc?.id) throw new Error(upJson?.errors?.[0]?.message || 'Échec du téléversement');
      const patch = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar: upJson.doc.id }),
      });
      if (!patch.ok) throw new Error('Impossible d\u2019enregistrer l\u2019avatar');
      setAvatarUrl(upJson.doc.url);
    } catch (err: any) {
      setError(err?.message || 'Une erreur est survenue.');
    } finally {
      setBusy(false);
    }
  }, [user]);

  if (!visible) return null;

  const displayName = ((user as any)?.name || user?.email || 'Admin') as string;
  const initials = displayName.split(/[\s@.]+/).filter(Boolean).map((w) => w[0]).join('').substring(0, 2).toUpperCase() || 'AD';
  const roleLabel = (user as any)?.role === 'super_admin' ? 'Super administrateur' : 'Éditeur';
  const dark = darkWallpaper;

  const Avatar = ({ size }: { size: number }) => (
    <span className="ntb-avatar" style={{ width: size, height: size, fontSize: size * 0.36 }}>
      {avatarUrl
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={avatarUrl} alt={displayName} />
        : <span>{initials}</span>}
    </span>
  );

  return (
    <>
      <style>{`
        .ntb { position: fixed; top: 0; left: 0; right: 0; height: 60px; z-index: 8800; display: grid; grid-template-columns: 1fr auto; align-items: center; padding: 0 20px; pointer-events: none; transition: background .25s ease, border-color .25s ease; }
        .ntb > * { pointer-events: auto; }
        .ntb.is-light { background: rgba(248,250,252,.72); backdrop-filter: blur(18px) saturate(180%); -webkit-backdrop-filter: blur(18px) saturate(180%); border: none !important; border-bottom: none !important; box-shadow: none !important; }
        .ntb.is-dark { background: rgba(2,6,23,.6); backdrop-filter: blur(18px) saturate(160%); -webkit-backdrop-filter: blur(18px) saturate(160%); border: none !important; border-bottom: none !important; box-shadow: none !important; }
        body:has(.custom-os-dashboard) .ntb { background: transparent; backdrop-filter: none; -webkit-backdrop-filter: none; border-bottom: none !important; }
        .ntb-logo { grid-column: 1; justify-self: start; display: inline-flex; align-items: center; padding: 6px 10px; border-radius: 12px; transition: transform .2s ease, opacity .2s ease; text-decoration: none; }
        .ntb-logo:hover { transform: scale(1.02); }
        .ntb-right { grid-column: 2; justify-self: end; position: relative; display: flex; align-items: center; gap: 10px; }
        .ntb-site-btn { all: unset; box-sizing: border-box; cursor: pointer; display: inline-flex; align-items: center; gap: 7px; height: 34px; padding: 0 13px; border-radius: 999px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 12.5px; font-weight: 600; text-decoration: none !important; transition: all .2s ease; }
        .ntb.is-light .ntb-site-btn { background: rgba(255,255,255,.85); color: #0F172A; border: 1px solid rgba(15,23,42,.12); box-shadow: 0 4px 12px -4px rgba(15,23,42,.08); }
        .ntb.is-light .ntb-site-btn:hover { background: #fff; border-color: #0284C7; color: #0284C7; transform: translateY(-1px); }
        .ntb.is-dark .ntb-site-btn { background: rgba(15,23,42,.75); color: #F8FAFC; border: 1px solid rgba(255,255,255,.15); box-shadow: 0 4px 14px -4px rgba(0,0,0,.5); }
        .ntb.is-dark .ntb-site-btn:hover { background: rgba(30,41,59,.95); border-color: #38BDF8; color: #38BDF8; transform: translateY(-1px); }
        .ntb-trigger { all: unset; box-sizing: border-box; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; padding: 4px; border-radius: 999px; transition: background .15s ease, box-shadow .15s ease; }
        .ntb.is-light .ntb-trigger:hover, .ntb.is-light .ntb-trigger[aria-expanded="true"] { background: rgba(15,23,42,.06); }
        .ntb.is-dark .ntb-trigger:hover, .ntb.is-dark .ntb-trigger[aria-expanded="true"] { background: rgba(255,255,255,.1); }
        .ntb-trigger:focus-visible { box-shadow: 0 0 0 3px rgba(0,180,216,.45); }
                .ntb-avatar { display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; overflow: hidden; flex-shrink: 0; background: linear-gradient(135deg, #0A2540 0%, #0284C7 100%); color: #fff; font-weight: 700; letter-spacing: .02em; box-shadow: 0 0 0 2px rgba(0,180,216,.55), 0 4px 12px rgba(2,132,199,.25); transition: transform .28s cubic-bezier(.34,1.56,.64,1), box-shadow .28s ease; will-change: transform; }
        .ntb-trigger:hover .ntb-avatar, .ntb-trigger[aria-expanded="true"] .ntb-avatar { transform: scale(1.08) rotate(3deg); box-shadow: 0 0 0 2.5px #22d3ee, 0 8px 24px -2px rgba(34,211,238,.45), 0 0 16px rgba(14,165,233,.35); }
        .ntb-trigger:active .ntb-avatar { transform: scale(0.95); }
        .ntb-avatar img { transition: transform .3s ease; }
        .ntb-trigger:hover .ntb-avatar img { transform: scale(1.06); }
        .ntb-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ntb-menu { position: absolute; top: calc(100% + 10px); right: 0; width: 280px; border-radius: 18px; padding: 8px; animation: ntbIn .16s cubic-bezier(.16,1,.3,1) both; transform-origin: top right; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        .ntb.is-light .ntb-menu { background: rgba(255,255,255,.96); border: 1px solid rgba(15,23,42,.08); box-shadow: 0 24px 60px -12px rgba(15,23,42,.25); color: #0F172A; }
        .ntb.is-dark .ntb-menu { background: rgba(15,23,42,.96); border: 1px solid rgba(255,255,255,.1); box-shadow: 0 24px 60px -12px rgba(0,0,0,.7); color: #F8FAFC; }
        @keyframes ntbIn { from { opacity: 0; transform: translateY(-6px) scale(.97); } to { opacity: 1; transform: none; } }
        .ntb-head { display: flex; align-items: center; gap: 12px; padding: 12px 10px 14px; }
        .ntb-name { font-size: 14px; font-weight: 700; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ntb-mail { font-size: 12px; opacity: .65; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ntb-role { display: inline-block; margin-top: 4px; font-size: 10.5px; font-weight: 600; padding: 2px 8px; border-radius: 999px; background: rgba(0,180,216,.14); color: #0284C7; }
        .ntb.is-dark .ntb-role { color: #38BDF8; }
        .ntb-sep { height: 1px; margin: 4px 6px; background: currentColor; opacity: .08; }
        .ntb-item { all: unset; box-sizing: border-box; cursor: pointer; width: 100%; min-height: 44px; display: flex; align-items: center; gap: 12px; padding: 0 12px; border-radius: 12px; font-size: 13.5px; font-weight: 500; transition: background .12s ease; text-decoration: none; color: inherit; }
        .ntb-item:hover, .ntb-item:focus-visible { background: rgba(0,180,216,.12); }
        .ntb-item.danger:hover { background: rgba(239,68,68,.12); color: #EF4444; }
        .ntb-item svg { opacity: .75; flex-shrink: 0; }
        .ntb-err { margin: 4px 8px 6px; font-size: 12px; color: #EF4444; }
        .ntb-spin { animation: ntbSpin .9s linear infinite; }
        @keyframes ntbSpin { to { transform: rotate(360deg); } }
        .ntb-logo-wrap { color: #0F172A; } .ntb.is-dark .ntb-logo-wrap { color: #fff; }
        @media (max-width: 640px) { .ntb { padding: 0 12px; height: 56px; } .ntb-menu { position: fixed; top: 64px; left: 12px; right: 12px; width: auto; } }
      `}</style>

      <header className={`ntb ${dark ? 'is-dark' : 'is-light'}`}>
        <a href="/admin" className="ntb-logo ntb-logo-wrap" aria-label="NOB TECHNOLOGIES — Accueil" title="Accueil">
          <NobLogo height={28} textColor="currentColor" />
        </a>

        <div className="ntb-right" ref={wrapRef}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="ntb-site-btn"
            title="Ouvrir le site internet dans un nouvel onglet"
          >
            <Globe size={14} className="text-[#00D4FF]" />
            <span>Voir le site</span>
            <ExternalLink size={12} style={{ opacity: 0.6 }} />
          </a>

          <button
            type="button"
            className="ntb-trigger"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label="Menu du compte"
            onClick={() => setOpen((o) => !o)}
          >
            <Avatar size={38} />
          </button>

          {open && (
            <div className="ntb-menu" role="menu">
              <div className="ntb-head">
                <Avatar size={48} />
                <div style={{ minWidth: 0 }}>
                  <div className="ntb-name">{displayName}</div>
                  {(user as any)?.name && <div className="ntb-mail">{user?.email}</div>}
                  <span className="ntb-role">{roleLabel}</span>
                </div>
              </div>

              <div className="ntb-sep" />

              <button type="button" role="menuitem" className="ntb-item" onClick={() => fileRef.current?.click()} disabled={busy}>
                {busy ? <Loader2 size={18} className="ntb-spin" /> : <Camera size={18} />}
                {busy ? 'Envoi en cours…' : avatarUrl ? 'Changer ma photo' : 'Ajouter une photo'}
              </button>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPickFile} />
              {error && <div className="ntb-err" role="alert">{error}</div>}

              <a role="menuitem" className="ntb-item" href="/admin/account">
                <UserRound size={18} /> Mon profil
              </a>
              <a role="menuitem" className="ntb-item" href="/admin/mfa">
                <ShieldCheck size={18} style={{ color: '#00D4FF' }} /> Sécurité MFA (2FA)
              </a>
              <button type="button" role="menuitem" className="ntb-item" onClick={() => window.dispatchEvent(new Event('nob:toggle-dark-wallpaper'))}>
                {dark ? <Sun size={18} /> : <Moon size={18} />} {dark ? 'Mode clair' : 'Mode sombre'}
              </button>

              <div className="ntb-sep" />

              <a role="menuitem" className="ntb-item danger" href="/admin/logout">
                <LogOut size={18} /> Se déconnecter
              </a>
            </div>
          )}
        </div>
      </header>
    </>
  );
};



