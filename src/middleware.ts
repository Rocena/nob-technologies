import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('payload-token')?.value;

  // Redirection des routes d'authentification internes Payload vers nos pages personnalisées
  if (pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (pathname === '/admin/create-first-user') {
    return NextResponse.redirect(new URL('/create-first-user', request.url));
  }

  // Protection des routes d'administration : si aucun token, rediriger immédiatement vers /login
  if (pathname.startsWith('/admin') && pathname !== '/admin/logout' && !token) {
    const redirectParam = pathname !== '/admin' ? `?redirect=${encodeURIComponent(pathname)}` : '';
    return NextResponse.redirect(new URL(`/login${redirectParam}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
