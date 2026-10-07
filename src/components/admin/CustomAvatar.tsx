'use client';

import React from 'react';
import { useAuth } from '@payloadcms/ui';

export const CustomAvatar: React.FC = () => {
  const { user } = useAuth();

  // If user has an avatar uploaded with a URL (from Media relation)
  const avatarObj = user?.avatar as any;
  const avatarUrl = avatarObj?.url || (typeof avatarObj === 'string' ? avatarObj : null);
  const displayName = (user?.name || user?.email || 'Admin') as string;
  const initials = displayName
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'AD';

  return (
    <span
      style={{ display: 'inline-flex' }}
      title={`Profil de ${displayName}`}
    >
      <span
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: avatarUrl ? 'transparent' : 'linear-gradient(135deg, #0A2540 0%, #0284C7 100%)',
          boxShadow: '0 0 0 2px rgba(0, 180, 216, 0.55)',
          overflow: 'hidden',
          color: '#FFFFFF',
          fontSize: '13px',
          fontWeight: '700',
          letterSpacing: '0.02em',
        }}
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={displayName}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span>{initials}</span>
        )}
      </span>
    </span>
  );
};
