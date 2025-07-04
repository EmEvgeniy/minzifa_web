export const dynamic = 'force-static';

import { Hero, Tours } from '@/components/Destination';
import { Reviews } from '@/components/UI/Reviews/Reviews';

import type { Metadata } from 'next';
import { DestinationData } from './_types';
import { ToursResponse } from '@/components/Tours/MainSection/_types';
import Articles from '@/components/Home/Articles/Articles';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

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

  const page = Number((await searchParams).page) || 1;

  const destination: DestinationData = await fetch(
    `https://api.minzifatravel.com/api/v1/destinations/${slug}?locale=${locale}`,
  ).then((res) => res.json());

  const tours: ToursResponse = await fetch(
    `https://api.minzifatravel.com/api/v1/tours?locale=${locale}&destinations[]=${slug}&page=${page}&perPage=6`,
  ).then((res) => res.json());

  return (
    <>
      <Hero destination={destination} />
      <Tours tours={tours} />
      <Reviews />
      <Articles locale={locale} />
    </>
  );
}
