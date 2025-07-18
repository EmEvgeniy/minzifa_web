export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { DestinationData } from './_types';
import Hero from '@/components/Destination/Hero/Hero';
import Tours from '@/components/Destination/Tours/Tours';
import Reviews from '@/components/UI/Reviews/Reviews';
import Articles from '@/components/Home/Articles/Articles';
import { getTranslations } from 'next-intl/server';
import Filter from '@/components/Tours/MainSection/Filter';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;

  const destination: DestinationData = await fetch(
    `https://api.minzifatravel.com/api/v1/destinations/${slug}?locale=${locale}`,
  ).then((res) => res.json());

  return {
    title: destination?.seo_metadata?.title,
    description: destination?.seo_metadata?.description,
    keywords: destination?.seo_metadata?.keywords,
  };
}

export default async function page({ params }: Props) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale });

  const destination: DestinationData = await fetch(
    `https://api.minzifatravel.com/api/v1/destinations/${slug}?locale=${locale}`,
  ).then((res) => res.json());

  return (
    <>
      <Hero destination={destination} locale={locale} />
      <div className="container py-[70px] w-full grid max-[1024px]:grid-cols-1 grid-cols-[300px_1fr] items-start justify-between gap-7">
        <div className="block [@media(max-width:1024px)]:hidden">
          <Filter locale={locale} />
        </div>
        <Tours
          locale={locale}
          days={t('all_tours.days')}
          from={t('all_tours.from')}
          view_itinerary={t('all_tours.view_itinerary')}
          byRequest={t('all_tours.byRequest')}
          // location={t('all_tours.location')}
          // destination={destination}
        />
      </div>
      <Reviews locale={locale} />
      <Articles locale={locale} />
    </>
  );
}
