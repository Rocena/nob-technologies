import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get('payload-token')?.value;

  // Redirection des routes d'authentification vers /root
  if (pathname === '/admin/login' || pathname === '/login') {
    return NextResponse.redirect(new URL(`/root${search}`, request.url));
  }
  if (pathname === '/admin/create-first-user') {
    return NextResponse.redirect(new URL('/create-first-user', request.url));
  }

  // Protection des routes d'administration : si aucun token, rediriger immédiatement vers /root
  if (pathname.startsWith('/admin') && pathname !== '/admin/logout' && !token) {
    const redirectParam = pathname !== '/admin' ? `?redirect=${encodeURIComponent(pathname)}` : '';
    return NextResponse.redirect(new URL(`/root${redirectParam}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
