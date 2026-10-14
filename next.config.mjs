import { withPayload } from '@payloadcms/next/withPayload';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: 'https', hostname: 'logo.clearbit.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'www.hp.com' },
      { protocol: 'https', hostname: 'dolima.sn' },
      { protocol: 'https', hostname: 'simplon.co' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        // Back-office et pages d'authentification : jamais indexées ni mises en cache
        source: '/(admin|login|create-first-user)/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
        ],
      },
      {
        source: '/(admin|login|create-first-user)',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/admin/login', destination: '/login', permanent: false },
      { source: '/admin/create-first-user', destination: '/create-first-user', permanent: false },
      { source: '/backoffice', destination: '/admin', permanent: false },
      { source: '/back-office', destination: '/admin', permanent: false },
      { source: '/bakoffice', destination: '/admin', permanent: false },
      { source: '/bak-office', destination: '/admin', permanent: false },
      { source: '/dashboard', destination: '/admin', permanent: false },
    ];
  },
};

export default withPayload(nextConfig);
