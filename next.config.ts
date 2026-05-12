import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin();
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  allowedDevOrigins: ['minzifatravel.com'],
  experimental: {
    useCache: true,
    inlineCss: true,
  },
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    qualities: [70, 75, 85, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.minzifatravel.com',
      },
      {
        protocol: 'https',
        hostname: 'api.minzifatravel.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'articles.minzifatravel.com',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async rewrites() {
    const rewrites = [
      {
        source: '/.well-known/:path*',
        destination: '/404',
      },
    ];

    if (process.env.NODE_ENV === 'development') {
      const apiTarget = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

      rewrites.push(
        {
          source: '/auth/:path*',
          destination: `${apiTarget}/auth/:path*`,
        },
        {
          source: '/api/:path*',
          destination: `${apiTarget}/api/:path*`,
        },
        {
          source: '/sanctum/:path*',
          destination: `${apiTarget}/sanctum/:path*`,
        },
        {
          source: '/storage/:path*',
          destination: `${apiTarget}/storage/:path*`,
        },
      );
    }

    return rewrites;
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
