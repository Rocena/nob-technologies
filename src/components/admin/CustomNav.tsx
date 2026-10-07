'use client'

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const CustomNav = () => {
  const pathname = usePathname();
  const isAuthPage = pathname === '/admin/login' || pathname === '/admin/create-first-user';

  useEffect(() => {
    if (!isAuthPage) return;
    document.body.classList.add('is-auth-page');
    return () => {
      document.body.classList.remove('is-auth-page');
    };
  }, [isAuthPage]);

  return null;
};
