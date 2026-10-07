import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'logo.clearbit.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'www.hp.com' },
      { protocol: 'https', hostname: 'dolima.sn' },
      { protocol: 'https', hostname: 'simplon.co' },
    ],
  },
};

export default nextConfig;

