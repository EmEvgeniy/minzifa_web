import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { DestinationData } from './_types';
import { ToursResponse } from '@/components/Tours/MainSection/_types';
const Hero = dynamic(() => import('@/components/Destination/Hero/Hero'));
const Tours = dynamic(() => import('@/components/Destination/Tours/Tours'));
const Articles = dynamic(() => import('@/components/Home/Articles/Articles'));
const Reviews = dynamic(() => import('@/components/UI/Reviews/Reviews'));

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

  const page = Number((await searchParams).page) || 1;

  const destination: DestinationData = await fetch(
    `https://api.minzifatravel.com/api/v1/destinations/${slug}?locale=${locale}`,
  ).then((res) => res.json());

  const tours: ToursResponse = await fetch(
    `https://api.minzifatravel.com/api/v1/tours?locale=${locale}&destinations[]=${slug}&page=${page}&perPage=6`,
  ).then((res) => res.json());

  return (
    <>
      <Hero destination={destination} locale={locale} />
      <Tours tours={tours} />
      <Reviews locale={locale} />
      <Articles locale={locale} />
    </>
  );
}
