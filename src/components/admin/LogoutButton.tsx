'use client'

import React, { useState } from 'react'
import { LogOut, ShieldCheck, Lock } from 'lucide-react'

export const LogoutButton: React.FC = () => {
  const [loggingOut, setLoggingOut] = useState(false)
  const [stepText, setStepText] = useState('Chiffrement et purge de la session…')

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (loggingOut) return
    setLoggingOut(true)

    try {
      setTimeout(() => setStepText('Clôture des accès sécurisés…'), 500)
      setTimeout(() => setStepText('Session fermée avec succès.'), 1000)

      await Promise.all([
        fetch('/api/users/logout', {
          method: 'POST',
          credentials: 'same-origin',
        }),
        new Promise((resolve) => setTimeout(resolve, 1400)),
      ])
    } catch {}

    window.location.href = '/login'
  }

  return (
    <>
      <div style={{ padding: '12px 12px 24px 12px', marginTop: 'auto' }}>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            padding: '10px 14px',
            color: '#E2E8F0',
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            cursor: loggingOut ? 'wait' : 'pointer',
            fontWeight: '600',
            fontSize: '0.875rem',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            textAlign: 'left',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FFFFFF'
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)'
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)'
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(239, 68, 68, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#E2E8F0'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <LogOut size={16} className={loggingOut ? 'animate-pulse text-rose-400' : 'text-slate-400'} />
          <span>{loggingOut ? 'Déconnexion en cours…' : 'Se déconnecter'}</span>
        </button>
      </div>

      {/* Animation Overlay Plein Écran Haute Technologie */}
      {loggingOut && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999999,
            backgroundColor: 'rgba(2, 6, 23, 0.94)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.3s ease-out forwards',
            color: '#FFFFFF',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '84px',
              height: '84px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
            }}
          >
            {/* Halo rotatif */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '3px solid rgba(0, 212, 255, 0.15)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '3px solid #00D4FF',
                borderTopColor: 'transparent',
                animation: 'spin 1s linear infinite',
              }}
            />
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(2, 132, 199, 0.3))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(0, 212, 255, 0.35)',
              }}
            >
              <Lock size={26} color="#00D4FF" />
            </div>
          </div>

          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: '8px',
            }}
          >
            Fermeture sécurisée de la session
          </h3>

          <p
            style={{
              fontSize: '0.875rem',
              color: '#94A3B8',
              marginBottom: '20px',
              minHeight: '20px',
              textAlign: 'center',
            }}
          >
            {stepText}
          </p>

          {/* Barre de progression fluide */}
          <div
            style={{
              width: '240px',
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, #00D4FF, #10E760)',
                animation: 'progressFill 1.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              }}
            />
          </div>

          <div
            style={{
              marginTop: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              color: '#64748B',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            <ShieldCheck size={14} color="#10E760" />
            <span>NOBTECH OS &bull; Déconnexion Protégée</span>
          </div>

          <style>{`
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
            @keyframes progressFill { 0% { transform: translateX(-100%); } 100% { transform: translateX(0); } }
          `}</style>
        </div>
      )}
    </>
  )
}
