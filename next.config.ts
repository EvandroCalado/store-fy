import type { NextConfig } from 'next';

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

export default nextConfig;
