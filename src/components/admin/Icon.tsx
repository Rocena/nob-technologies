'use client'

import React from 'react';
import { NobLogo } from '../NobLogo';

export const Icon = () => (
  <span
    className="nob-header-center-logo"
    aria-label="Accueil NOBTECH"
    title="NOBTECH - Accueil"
    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
  >
    <NobLogo height={32} showText={false} />
  </span>
);
