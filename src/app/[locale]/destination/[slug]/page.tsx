export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { DestinationData } from './_types';
import { ToursResponse } from '@/components/Tours/MainSection/_types';
import Hero from '@/components/Destination/Hero/Hero';
import Tours from '@/components/Destination/Tours/Tours';
import Reviews from '@/components/UI/Reviews/Reviews';
import Articles from '@/components/Home/Articles/Articles';
import { getTranslations } from 'next-intl/server';

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

export default async function page({ params, searchParams }: Props) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale });

  const page = Number((await searchParams).page) || 1;

  const destination: DestinationData = await fetch(
    `https://api.minzifatravel.com/api/v1/destinations/${slug}?locale=${locale}`,
  ).then((res) => res.json());

  const tours: ToursResponse = await fetch(
    `https://api.minzifatravel.com/api/v1/tours?locale=${locale}&destinations[]=${destination.name}&page=${page}&perPage=6`,
  ).then((res) => res.json());

  return (
    <>
      <Hero destination={destination} locale={locale} />
      <Tours
        tours={tours}
        locale={locale}
        days={t('all_tours.days')}
        from={t('all_tours.from')}
        view_itinerary={t('all_tours.view_itinerary')}
        byRequest={t('all_tours.byRequest')}
      />
      <Reviews locale={locale} />
      <Articles locale={locale} />
    </>
  );
}
