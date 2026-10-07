'use client'

import React from 'react';
import { NobLogo } from '../NobLogo';

export const Icon = () => (
  <span
    className="nob-header-center-logo"
    aria-label="Accueil NOB TECHNOLOGIES"
    title="NOB TECHNOLOGIES - Accueil"
    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
  >
    <NobLogo height={34} showText={true} />
  </span>
);
