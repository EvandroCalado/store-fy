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
    ],
  },
};

export default removeImports()(nextConfig);
