import { Metadata } from 'next';
import { DefaultPageProps, ISeoMetadata } from '@/types';
import { apiGet } from '@/utils/serverApi';

import Hero from '@/components/Home/Hero/Hero';
import Info from '@/components/Home/Info/Info';
import BestSellers from '@/components/Home/BestSellers/BestSellers';
import NewsletterCTA from '@/components/Home/NewsletterCTA/NewsletterCTA';
import Destinations from '@/components/Home/Destinations/Destinations';
import WhyUs from '@/components/Home/WhyUs/WhyUs';
import Adventure from '@/components/Home/Adventure/Adventure';
import Reviews from '@/components/UI/Reviews/Reviews';
import NewsletterSignup from '@/components/Home/NewsletterSignup/NewsletterSignup';

// Универсальный безопасный запрос к API
async function safeApiGet<T>(url: string, fallback: T, revalidateSeconds = 300): Promise<T> {
  try {
    return (await apiGet(url, { next: { revalidate: revalidateSeconds } })) as T;
  } catch (err: unknown) {
    const e = err as { status?: number; statusText?: string; url?: string };
    console.warn(`Failed API GET: ${url}`, e?.status, e?.statusText, e?.url);
    return fallback;
  }
}

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const rawLocale = (await params).locale;
  const locale = ['en', 'ru'].includes(rawLocale) ? rawLocale : 'en';
  const pagePath = `/${locale}`;

  // Безопасный запрос к API
  const data = await safeApiGet<{ seo_metadata?: ISeoMetadata }>(
    `pages/?page=${encodeURIComponent(pagePath)}`,
    {},
  );

  const title = data?.seo_metadata?.title || 'Minzifa Travel - Best Travel Agency in Central Asia';
  const description =
    data?.seo_metadata?.description ||
    'Discover amazing tours and adventures in Central Asia with Minzifa Travel. Explore Uzbekistan, Kyrgyzstan, Tajikistan, Kazakhstan and Turkmenistan.';
  const keywords =
    data?.seo_metadata?.keywords ||
    'tourism, travel, Central Asia, Uzbekistan, Kyrgyzstan, Tajikistan';

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://minzifatravel.com/${locale}`,
      languages: {
        en: `https://minzifatravel.com/en`,
        ru: `https://minzifatravel.com/ru`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://minzifatravel.com/${locale}`,
      siteName: 'Minzifa Travel',
      images: [
        {
          url: 'https://minzifatravel.com/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Minzifa Travel - Best Tours in Central Asia',
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://minzifatravel.com/images/og-image.jpg'],
    },
  };
}

export default async function HomePage({ params }: DefaultPageProps) {
  const rawLocale = (await params).locale;
  const locale = ['en', 'ru'].includes(rawLocale) ? rawLocale : 'en';

  return (
    <div className="flex flex-col">
      <Hero locale={locale} />
      <Info locale={locale} />
      <BestSellers locale={locale} />
      <NewsletterCTA />
      <Destinations locale={locale} />
      <WhyUs locale={locale} />
      <Adventure locale={locale} />
      <Reviews />
      <NewsletterSignup />
    </div>
  );
}
