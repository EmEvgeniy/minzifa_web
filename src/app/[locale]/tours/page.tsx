export const dynamic = 'force-dynamic';

import Hero from '@/components/Tours/Hero/Hero';
import MainSection from '@/components/Tours/MainSection/MainSection';
import MobileMenu from '@/components/Tours/MobileMenu/MobileMenu';
import { DefaultPageProps } from '@/types';
import { Metadata } from 'next';

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const { locale } = await params;
  const pagePath = `/${locale}/tours`;

  const data = await fetch(
    `https://api.minzifatravel.com/api/v1/pages?page=${encodeURIComponent(pagePath)}`,
  ).then((res) => res.json());

  const title = data?.seo_metadata?.title || 'Tours - Minzifa Travel';
  const description =
    data?.seo_metadata?.description ||
    'Explore amazing tour packages to Central Asia. Group and private tours to Uzbekistan, Kyrgyzstan, Tajikistan, Kazakhstan and Turkmenistan.';

  return {
    title,
    description,
    keywords: data?.seo_metadata?.keywords || 'tours, travel packages, Central Asia tours',
    alternates: {
      canonical: `https://minzifatravel.com/${locale}/tours`,
      languages: {
        en: `https://minzifatravel.com/en/tours`,
        ru: `https://minzifatravel.com/ru/tours`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://minzifatravel.com/${locale}/tours`,
      siteName: 'Minzifa Travel',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function Tours({ params }: DefaultPageProps) {
  const { locale } = await params;

  return (
    <section className="w-full relative">
      <Hero locale={locale} />
      <MainSection locale={locale} />
      <MobileMenu locale={locale} />
    </section>
  );
}
