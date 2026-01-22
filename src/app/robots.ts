import type { MetadataRoute } from 'next';

// default
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/en/', '/ru/'],
      disallow: ['/en/booking/', '/ru/booking/'],
    },
    sitemap: ['https://minzifatravel.com/sitemap.xml'],
  };
}
