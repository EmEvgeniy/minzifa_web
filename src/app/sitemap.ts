export const dynamic = 'force-dynamic';

import type { MetadataRoute } from 'next';
import { AllToursCardType } from '@/components/Tours/MainSection/_types';
import { DestinationData } from './[locale]/(main)/destination/[slug]/_types';
import { ArticleCardType } from '@/components/UI/ArticleCard/_types';
import { apiGet } from '@/utils/serverApi';

const SITENAME = 'https://minzifatravel.com';
const LOCALES: ('en' | 'ru')[] = ['en', 'ru'];

const staticRoutes = [
  '/{locale}/',
  '/{locale}/about',
  '/{locale}/adventures',
  '/{locale}/company-sustainable-development-policy',
  '/{locale}/contact',
  '/{locale}/create-your-trip',
  '/{locale}/destination',
  '/{locale}/eco-travel',
  '/{locale}/hotel-booking-rules',
  '/{locale}/privacy-policy',
  '/{locale}/term-and-conditions-of-booking-tours',
  '/{locale}/tours',
];

export default async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [];

  const toursByLocale: Record<string, AllToursCardType[]> = {};
  const destinationByLocale: Record<string, DestinationData[]> = {};
  const articleByLocale: Record<string, ArticleCardType[]> = {};

  for (const locale of LOCALES) {
    const [tourRes, destinationRes, articleRes] = await Promise.all([
      apiGet<AllToursCardType[]>(`tours?all=1&locale=${locale}`, { next: { revalidate: 3600 } }),
      apiGet<DestinationData[]>(`destinations?all=1&locale=${locale}`, {
        next: { revalidate: 300 },
      }),
      apiGet<ArticleCardType[]>(`articles?all=1&locale=${locale}`, { next: { revalidate: 3600 } }),
    ]);

    toursByLocale[locale] = tourRes;
    destinationByLocale[locale] = destinationRes;
    articleByLocale[locale] = articleRes;
  }

  // 1. Статические страницы
  for (const locale of LOCALES) {
    const altLocale = LOCALES.find((l) => l !== locale)!;

    for (const route of staticRoutes) {
      const path = route.replace('{locale}', locale);
      const altPath = route.replace('{locale}', altLocale);

      const entry: MetadataRoute.Sitemap[number] = {
        url: `${SITENAME}${path}`,
        lastModified: new Date(),
        priority: path.endsWith('/') ? 1.0 : 0.7,
      };

      if (staticRoutes.includes(route)) {
        entry.alternates = {
          languages: {
            [altLocale]: `${SITENAME}${altPath}`,
          },
        };
      }

      sitemap.push(entry);
    }
  }

  // 2. Туры
  for (const locale of LOCALES) {
    const altLocale = LOCALES.find((l) => l !== locale)!;

    for (const tour of toursByLocale[locale]) {
      const path = `/${locale}/${tour.destination.slug}/${tour.slug}`;
      const altTour = toursByLocale[altLocale].find((t) => t.slug === tour.slug);

      const entry: MetadataRoute.Sitemap[number] = {
        url: `${SITENAME}${path}`,
        lastModified: new Date(tour?.updated_at || tour?.created_at || Date.now()),
        priority: 0.6,
      };

      if (altTour) {
        entry.alternates = {
          languages: {
            [altLocale]: `${SITENAME}/${altLocale}/${altTour.destination.slug}/${altTour.slug}`,
          },
        };
      }

      sitemap.push(entry);
    }
  }

  // 3. Направления
  for (const locale of LOCALES) {
    const altLocale = LOCALES.find((l) => l !== locale)!;

    for (const destination of destinationByLocale[locale]) {
      const path = `/${locale}/destination/${destination.slug}`;
      const altDestination = destinationByLocale[altLocale].find(
        (d) => d.slug === destination.slug,
      );

      const entry: MetadataRoute.Sitemap[number] = {
        url: `${SITENAME}${path}`,
        lastModified: new Date(destination?.updated_at || destination?.created_at || Date.now()),
        priority: 0.6,
      };

      if (altDestination) {
        entry.alternates = {
          languages: {
            [altLocale]: `${SITENAME}/${altLocale}/destination/${altDestination.slug}`,
          },
        };
      }

      sitemap.push(entry);
    }
  }

  // 4. Статьи
  for (const locale of LOCALES) {
    const altLocale = LOCALES.find((l) => l !== locale)!;

    for (const article of articleByLocale[locale]) {
      const path = `/${locale}/adventures/${article.category.slug}/${article.slug}`;
      const altArticle = articleByLocale[altLocale].find((a) => a.slug === article.slug);

      const entry: MetadataRoute.Sitemap[number] = {
        url: `${SITENAME}${path}`,
        lastModified: new Date(article?.updated_at || article?.created_at || Date.now()),
        priority: 0.5,
      };

      if (altArticle) {
        entry.alternates = {
          languages: {
            [altLocale]: `${SITENAME}/${altLocale}/adventures/${altArticle.category.slug}/${altArticle.slug}`,
          },
        };
      }

      sitemap.push(entry);
    }
  }

  return sitemap;
}
