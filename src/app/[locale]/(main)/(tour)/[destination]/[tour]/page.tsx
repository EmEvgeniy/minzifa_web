export const dynamic = 'force-dynamic';

import type { Tour as TourData } from '@/components/Tour/_types';
import type { Metadata } from 'next';
import { apiGet } from '../../../../../../utils/serverApi';
import TourWrapper from '@/components/Tour/TourWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string; tour: string }>;
};

// Универсальная безопасная обертка для API
async function safeApiGet<T>(url: string, fallback: T, revalidateSeconds = revalidate): Promise<T> {
  try {
    return (await apiGet(url, { next: { revalidate: revalidateSeconds } })) as T;
  } catch (err: unknown) {
    const e = err as { status?: number; statusText?: string; url?: string };
    console.warn(`Failed API GET: ${url}`, e?.status, e?.statusText, e?.url);
    return fallback;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tour: slug, locale } = await params;

  const tour = await safeApiGet<TourData>(`tours/${slug}?locale=${locale}`, {} as TourData);

  if (!tour?.id) {
    return {
      title: 'Tour - Minzifa Travel',
      description: 'Discover amazing tours with Minzifa Travel',
      keywords: 'tours, travel, Minzifa',
    };
  }

  return {
    title: tour.seo_metadata?.title ?? tour.name,
    description: tour.seo_metadata?.description ?? 'Discover amazing tours with Minzifa Travel',
    keywords: tour.seo_metadata?.keywords ?? 'tours, travel, Minzifa',
  };
}

export default async function Tour({ params }: Props) {
  const { tour: slug, locale } = await params;

  const t = await getTranslations({ locale, namespace: 'breadcrumbs' });

  const tourData = await safeApiGet<TourData>(`tours/${slug}?locale=${locale}`, {
    id: 0,
    tour_type: '',
    lang: '',
    trip_code: '',
    name: '',
    subtitle: '',
    description: '',
    hightlights: {
      title: '',
      content: [],
    },
    facts: {
      title: '',
      content: {
        duration: '',
        group_size: '',
        hotels: '',
        transport: '',
      },
    },
    seo_metadata: {
      title: '',
      description: '',
      keywords: '',
    },
    slug: '',
    photo: {
      id: 0,
      file: '',
      alt_text: '',
    },
    gallery: [],
    days: 0,
    seasons: [],
    destinations: [],
    types: [],
    itineraries: [],
    prices: {
      valute: '',
    },
    hotels: [],
    includes: [],
    reviews: [],
    transports: {
      one_two_people: '',
      six_twelve_people: '',
      three_five_people: '',
    },
  });

  if (!tourData?.id) return notFound();

  return (
    <div className="w-full min-h-[200vh]">
      <div className="container !px-0 pt-[150px] flex flex-col gap-10 max-[920px]:pt-[56px]">
        <Breadcrumbs
          locale={locale}
          link={{ title: t('allTours'), link: `/${locale}/tours` }}
          link2={{ title: tourData.name, link: '' }}
          className="hidden md:block"
        />
        <TourWrapper locale={locale} tourData={tourData} />
      </div>
    </div>
  );
}
