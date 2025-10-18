export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { DestinationData } from './_types';
import Hero from '@/components/Destination/Hero/Hero';
import ToursSection from '@/components/Tours/ToursSection/ToursSection';
import Reviews from '@/components/UI/Reviews/Reviews';
import Articles from '@/components/Home/Articles/Articles';
import MobileMenu from '@/components/Tours/MobileMenu/MobileMenu';
import { apiGet } from '../../../../utils/serverApi';
import { AllToursCardType, TourType } from '@/components/Tours/MainSection/_types';
import { DestinationCard } from '@/components/Home/Destinations/_types';
import { PaginatedData } from '@/types';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;

  const destination = (await apiGet(`destinations/${slug}?locale=${locale}`, {
    next: { revalidate: 60 * 20 },
  })) as DestinationData;

  return {
    title: destination?.seo_metadata?.title,
    description: destination?.seo_metadata?.description,
    keywords: destination?.seo_metadata?.keywords,
  };
}

export default async function page({ params }: Props) {
  const { slug, locale } = await params;

  const destination = (await apiGet(`destinations/${slug}?locale=${locale}`, {
    next: { revalidate: 60 * 20 },
  })) as DestinationData;

  const initTours = (await apiGet(`tours?locale=${locale}&perPage=10&destinations[]=${destination.name}`, {
    next: { revalidate: 60 * 20 },
  })) as PaginatedData<AllToursCardType>;

  const initDestinations = (await apiGet(`destinations?locale=${locale}&all=1`, {
    next: { revalidate: 60 * 20 },
  })) as DestinationCard[];

  const initTourTypes = (await apiGet(`types?locale=${locale}&all=1`, {
    next: { revalidate: 60 * 20 },
  })) as TourType[];

  return (
    <>
      <Hero destination={destination} locale={locale} />
      <div className="container py-[70px] w-full">
        <ToursSection
          locale={locale}
          destination={destination}
          showFilter={['price', 'duration', 'seasons', 'hotels', 'tourType']}
          initTours={initTours}
          initDestinations={initDestinations}
          initTourTypes={initTourTypes}
        />
      </div>
      <Reviews locale={locale} />
      <Articles locale={locale} />
      <MobileMenu locale={locale} />
    </>
  );
}
