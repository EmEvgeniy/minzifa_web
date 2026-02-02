import dynamic from 'next/dynamic';

import { Metadata } from 'next';
import { DefaultPageProps, ISeoMetadata } from '@/types';
import { apiGet } from '@/utils/serverApi';

const Hero = dynamic(() => import('@/components/Home/Hero/Hero'));
const Info = dynamic(() => import('@/components/Home/Info/Info'));
const BestSellers = dynamic(() => import('@/components/Home/BestSellers/BestSellers'));
const Destinations = dynamic(() => import('@/components/Home/Destinations/Destinations'));
const HowToBook = dynamic(() => import('@/components/Home/HowToBook/HowToBook'));
const Adventure = dynamic(() => import('@/components/Home/Adventure/Adventure'));
const CreateYourTrip = dynamic(() => import('@/components/Home/CreateYourTrip/CreateYourTrip'));
const ContactUs = dynamic(() => import('@/components/Home/ContactUs/ContactUs'));
const Reviews = dynamic(() => import('@/components/UI/Reviews/Reviews'));
const Articles = dynamic(() => import('@/components/Home/Articles/Articles'));

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const locale = (await params).locale;
  const pagePath = `/${locale}`;

  let data: { seo_metadata?: ISeoMetadata } | undefined;

  try {
    data = await apiGet<{ seo_metadata?: ISeoMetadata }>(
      `pages?page=${encodeURIComponent(pagePath)}`,
    );
  } catch (error) {
    console.error('Failed to fetch page metadata:', error);
    // Игнорируем ошибку и используем дефолтные метаданные
  }

  const title = data?.seo_metadata?.title || 'Minzifa Travel - Best Travel Agency in Central Asia';
  const description =
    data?.seo_metadata?.description ||
    'Discover amazing tours and adventures in Central Asia with Minzifa Travel. Explore Uzbekistan, Kyrgyzstan, Tajikistan, Kazakhstan and Turkmenistan.';

  return {
    title,
    description,
    keywords:
      data?.seo_metadata?.keywords ||
      'tourism, travel, Central Asia, Uzbekistan, Kyrgyzstan, Tajikistan',
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
  const { locale } = await params;

  return (
    <>
      <Hero locale={locale} />
      <Info locale={locale} />
      <BestSellers locale={locale} />
      <Destinations locale={locale} />
      <HowToBook locale={locale} />
      <Adventure locale={locale} />
      <CreateYourTrip locale={locale} />
      <ContactUs locale={locale} />
      <Reviews />
      <Articles locale={locale} />
    </>
  );
}
