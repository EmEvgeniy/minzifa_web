export const dynamic = 'force-dynamic';

import { apiGet } from '@/api';
import Hero from '@/components/Tours/Hero/Hero';
import { AllToursCardType, TourType } from '@/components/Tours/MainSection/_types';
import MainSection from '@/components/Tours/MainSection/MainSection';
import MobileMenu from '@/components/Tours/MobileMenu/MobileMenu';
import { DefaultPageProps, PaginatedData } from '@/types';
import { Metadata } from 'next';
import { DestinationCard } from '@/components/Home/Destinations/_types';

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const { locale } = await params;

  const allowedLocales = ['en', 'ru'];
  const safeLocale = allowedLocales.includes(locale) ? locale : 'en';

  const pagePath = `/${safeLocale}/tours`;

  let data: any = {};
  try {
    const res = await fetch(
      `https://api.minzifatravel.com/api/v1/pages?page=${encodeURIComponent(pagePath)}`,
    );
    if (res.ok) {
      data = await res.json();
    } else {
      console.warn(`Failed to fetch metadata: HTTP ${res.status}`);
    }
  } catch (err) {
    console.warn('Error fetching page metadata:', err);
  }

  const title = data?.seo_metadata?.title || 'Tours - Minzifa Travel';
  const description =
    data?.seo_metadata?.description ||
    'Explore amazing tour packages to Central Asia. Group and private tours to Uzbekistan, Kyrgyzstan, Tajikistan, Kazakhstan and Turkmenistan.';
  const keywords = data?.seo_metadata?.keywords || 'tours, travel packages, Central Asia tours';

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://minzifatravel.com/${safeLocale}/tours`,
      languages: {
        en: `https://minzifatravel.com/en/tours`,
        ru: `https://minzifatravel.com/ru/tours`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://minzifatravel.com/${safeLocale}/tours`,
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

export default async function Tours({
  params,
}: DefaultPageProps & {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;

  // ✅ Валидация locale
  const allowedLocales = ['en', 'ru'];
  const safeLocale = allowedLocales.includes(locale) ? locale : 'en';

  // Инициализация данных с обработкой ошибок
  let initTours: PaginatedData<AllToursCardType> = {
    data: [],
    meta: {
      current_page: 0,
      first_page_url: '',
      from: 0,
      last_page: 0,
      last_page_url: null,
      next_page_url: null,
      path: '',
      per_page: 0,
      prev_page_url: null,
      to: 0,
      total: 0,
    },
  };
  let initDestinations: DestinationCard[] = [];
  let initTourTypes: TourType[] = [];

  try {
    initTours = (await apiGet(`tours?locale=${safeLocale}&perPage=10`, {
      next: { revalidate: 60 * 20 },
    })) as PaginatedData<AllToursCardType>;
  } catch (err: any) {
    console.warn('Failed to fetch tours:', err?.status, err?.statusText, err?.url);
  }

  try {
    initDestinations = (await apiGet(`destinations?locale=${safeLocale}&all=1`, {
      next: { revalidate: 60 * 20 },
    })) as DestinationCard[];
  } catch (err: any) {
    console.warn('Failed to fetch destinations:', err?.status, err?.statusText, err?.url);
  }

  try {
    initTourTypes = (await apiGet(`types?locale=${safeLocale}&all=1`, {
      next: { revalidate: 60 * 20 },
    })) as TourType[];
  } catch (err: any) {
    console.warn('Failed to fetch tour types:', err?.status, err?.statusText, err?.url);
  }

  return (
    <section className="w-full relative">
      <Hero locale={safeLocale} />
      <MainSection
        locale={safeLocale}
        initTours={initTours}
        initDestinations={initDestinations}
        initTourTypes={initTourTypes}
      />
      <MobileMenu locale={safeLocale} />
    </section>
  );
}
