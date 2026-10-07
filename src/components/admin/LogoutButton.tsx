'use client'

import React from 'react'
import { LogOut } from 'lucide-react'

export const LogoutButton: React.FC = () => {
  return (
    <div style={{ padding: '12px 12px 24px 12px', marginTop: 'auto' }}>
      <a 
        href="/admin/logout" 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          color: '#E2E8F0',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: '500',
          fontSize: '0.9rem',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#FFFFFF'
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#E2E8F0'
          e.currentTarget.style.background = 'transparent'
        }}
      >
        <LogOut size={16} />
        <span>Se déconnecter</span>
      </a>
    </div>
  )
}
