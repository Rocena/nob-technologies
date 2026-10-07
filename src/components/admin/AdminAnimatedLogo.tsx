'use client'

import React from 'react';
import { NobLogo } from '../NobLogo';

export const AdminAnimatedLogo = ({ size = 'normal' }) => {
  const height = size === 'large' ? 48 : 32;

  return (
    <div 
      className="nob-admin-logo-wrapper"
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        color: 'var(--theme-text)', 
        transition: 'transform 0.2s ease',
      }}
    >
      <NobLogo height={height} />
    </div>
  );
};
