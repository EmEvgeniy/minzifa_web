import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
    inlineCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.minzifatravel.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default withNextIntl(nextConfig);
