'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

const IDLE_LIMIT_MS = 5 * 60 * 1000 // 5 min d'inactivité avant la question
const COUNTDOWN_S = 60 // délai de réponse avant déconnexion automatique
const KEEPALIVE_MS = 20 * 60 * 1000 // renouvellement silencieux du jeton tant que l'utilisateur est actif
const STORAGE_KEY = 'nob_last_activity'
const ACTIVITY_EVENTS = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'wheel'] as const

const markActivity = () => {
  try { localStorage.setItem(STORAGE_KEY, String(Date.now())) } catch { /* ignore */ }
}
const readActivity = () => {
  try { return Number(localStorage.getItem(STORAGE_KEY)) || Date.now() } catch { return Date.now() }
}

/**
 * Surveille l'inactivité dans le back-office.
 * Après 5 min sans action : demande « Continuer ? ». Sans réponse (ou refus) → déconnexion.
 * Synchronisé entre onglets via localStorage ; basé sur des horodatages (fiable même si l'onglet est throttlé).
 */
export const InactivityGuard: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [remaining, setRemaining] = useState(COUNTDOWN_S)
  const openRef = useRef(false)
  const deadlineRef = useRef(0)
  const lastRefreshRef = useRef(Date.now())
  const loggingOutRef = useRef(false)

  const logout = useCallback(async () => {
    if (loggingOutRef.current) return
    loggingOutRef.current = true
    try {
      await fetch('/api/users/logout', { method: 'POST', credentials: 'same-origin' })
    } catch { /* ignore */ }
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
    window.location.href = '/login'
  }, [])

  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch('/api/users/refresh-token', { method: 'POST', credentials: 'same-origin' })
      if (res.ok) {
        lastRefreshRef.current = Date.now()
        return true
      }
      if (res.status === 401 || res.status === 403) { await logout() }
    } catch { /* réseau : on réessaiera */ }
    return false
  }, [logout])

  const stayConnected = useCallback(async () => {
    openRef.current = false
    setOpen(false)
    markActivity()
    await refreshSession()
  }, [refreshSession])

  useEffect(() => {
    markActivity()

    // Throttle des événements (1 écriture / seconde max)
    let lastWrite = 0
    const onActivity = () => {
      if (openRef.current) return // une fois la question posée, seul un clic explicite prolonge la session
      const now = Date.now()
      if (now - lastWrite > 1000) { lastWrite = now; markActivity() }
    }
    ACTIVITY_EVENTS.forEach((e) => window.addEventListener(e, onActivity, { passive: true }))

    const tick = setInterval(() => {
      const now = Date.now()
      if (openRef.current) {
        const left = Math.max(0, Math.ceil((deadlineRef.current - now) / 1000))
        setRemaining(left)
        // Une autre onglet a confirmé l'activité → on ferme la question ici aussi
        if (readActivity() > deadlineRef.current - COUNTDOWN_S * 1000) {
          openRef.current = false
          setOpen(false)
          return
        }
        if (left <= 0) void logout()
        return
      }

      const idleFor = now - readActivity()
      if (idleFor >= IDLE_LIMIT_MS) {
        deadlineRef.current = now + COUNTDOWN_S * 1000
        openRef.current = true
        setRemaining(COUNTDOWN_S)
        setOpen(true)
        return
      }

      // Renouvellement silencieux si l'utilisateur est actif
      if (now - lastRefreshRef.current > KEEPALIVE_MS) {
        lastRefreshRef.current = now
        void refreshSession()
      }
    }, 1000)

    return () => {
      clearInterval(tick)
      ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, onActivity))
    }
  }, [logout, refreshSession])

  if (!open) return null

  const pct = Math.max(0, Math.min(100, (remaining / COUNTDOWN_S) * 100))

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="nob-idle-title"
      style={{
        position: 'fixed', inset: 0, zIndex: 2147483000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(2,6,23,0.72)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', padding: 16,
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          width: '100%', maxWidth: 420, borderRadius: 20, padding: '28px 28px 24px', color: '#F8FAFC',
          background: 'linear-gradient(180deg, #0B1220 0%, #020617 100%)',
          border: '1px solid rgba(148,163,184,0.18)', boxShadow: '0 30px 80px -20px rgba(0,0,0,0.7)',
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', background: 'linear-gradient(90deg,#00D4FF,#0077b6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
          Sécurité de session
        </div>
        <h2 id="nob-idle-title" style={{ margin: '8px 0 8px', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>
          Souhaitez-vous continuer ?
        </h2>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#94A3B8' }}>
          Aucune activité détectée depuis 5 minutes. Pour protéger votre espace, vous serez déconnecté dans{' '}
          <strong style={{ color: '#F8FAFC', fontVariantNumeric: 'tabular-nums' }}>{remaining}s</strong>.
        </p>

        <div style={{ height: 4, borderRadius: 999, background: 'rgba(148,163,184,0.18)', margin: '18px 0 22px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#00D4FF,#0077b6)', transition: 'width 1s linear' }} />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="button"
            onClick={() => void logout()}
            style={{ flex: 1, height: 42, borderRadius: 12, cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#E2E8F0', background: 'transparent', border: '1px solid rgba(148,163,184,0.3)' }}
          >
            Se déconnecter
          </button>
          <button
            type="button"
            autoFocus
            onClick={() => void stayConnected()}
            style={{ flex: 1, height: 42, borderRadius: 12, cursor: 'pointer', fontSize: 14, fontWeight: 700, color: '#fff', border: 'none', background: 'linear-gradient(135deg,#00D4FF,#0077b6)', boxShadow: '0 10px 26px -8px rgba(0,212,255,0.5)' }}
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  )
}
