'use client'

import React, { useState } from 'react'
import { LogOut } from 'lucide-react'

export const LogoutButton: React.FC = () => {
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (loggingOut) return
    setLoggingOut(true)
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'same-origin',
      })
    } catch {}
    window.location.href = '/login'
  }

  return (
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
          padding: '8px 12px',
          color: '#E2E8F0',
          background: 'transparent',
          border: 'none',
          borderRadius: '6px',
          cursor: loggingOut ? 'wait' : 'pointer',
          fontWeight: '500',
          fontSize: '0.9rem',
          transition: 'all 0.15s ease',
          textAlign: 'left',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#FFFFFF'
          e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#E2E8F0'
          e.currentTarget.style.background = 'transparent'
        }}
      >
        <LogOut size={16} />
        <span>{loggingOut ? 'Déconnexion…' : 'Se déconnecter'}</span>
      </button>
    </div>
  )
}

