import { withPayload } from '@payloadcms/next/withPayload';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/admin/login', destination: '/login', permanent: false },
      { source: '/admin/create-first-user', destination: '/create-first-user', permanent: false },
    ]
  },
};

export default withPayload(nextConfig);
