'use client'

import React from 'react';
import { AdminAnimatedLogo } from './AdminAnimatedLogo';

/**
 * Payload entoure déjà ce composant d'un lien (accueil / login).
 * Ne pas ajouter de <a> ici : un lien imbriqué provoque une erreur d'hydratation.
 */
export const Logo = () => {
  return (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <AdminAnimatedLogo size="normal" />
    </span>
  );
};
