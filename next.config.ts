import type { NextConfig } from 'next';

import removeImports from 'next-remove-imports';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'l98uhn0g5q.ufs.sh',
        port: '',
      },
    ],
  },
};

export default removeImports()(nextConfig);
