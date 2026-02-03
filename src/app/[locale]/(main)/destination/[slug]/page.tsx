export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { DestinationData } from './_types';
import Hero from '@/components/Destination/Hero/Hero';
import ToursSection from '@/components/Tours/ToursSection/ToursSection';
import Reviews from '@/components/UI/Reviews/Reviews';
import Articles from '@/components/Home/Articles/Articles';
import MobileMenu from '@/components/Tours/MobileMenu/MobileMenu';
import { apiGet } from '../../../../../utils/serverApi';
import { AllToursCardType, TourType } from '@/components/Tours/MainSection/_types';
import { DestinationCard } from '@/components/Home/Destinations/_types';
import { PaginatedData } from '@/types';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;

  try {
    const destination = await apiGet<DestinationData>(`destinations/${slug}?locale=${locale}`);
    if (!destination?.id)
      return {
        title: 'Destination - Minzifa Travel',
        description: 'Explore destinations with Minzifa Travel',
      };

    return {
      title: destination.seo_metadata?.title ?? destination.name,
      description:
        destination.seo_metadata?.description ?? 'Explore destinations with Minzifa Travel',
      keywords: destination.seo_metadata?.keywords ?? 'travel, tours, destinations',
    };
  } catch (err) {
    console.error('Error fetching destination metadata:', slug, err);
    return {
      title: 'Destination - Minzifa Travel',
      description: 'Explore destinations with Minzifa Travel',
    };
  }
}

export default async function DestinationPage({ params }: Props) {
  const { slug, locale } = await params;

  let destination: DestinationData | null = null;
  try {
    destination = await apiGet<DestinationData>(`destinations/${slug}?locale=${locale}`);
  } catch (err) {
    console.error('Failed to fetch destination:', slug, err);
  }

  if (!destination?.id) return notFound();

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
    initTours = await apiGet(
      `tours?locale=${locale}&perPage=10&destinations[]=${destination.name}`,
    );
  } catch (err) {
    console.warn('Failed to fetch tours for destination:', destination.name, err);
  }

  try {
    initDestinations = await apiGet(`destinations?locale=${locale}&all=1`);
  } catch (err) {
    console.warn('Failed to fetch all destinations', err);
  }

  try {
    initTourTypes = await apiGet(`types?locale=${locale}&all=1`);
  } catch (err) {
    console.warn('Failed to fetch tour types', err);
  }

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
      <Reviews />
      <Articles locale={locale} />
      <MobileMenu locale={locale} />
    </>
  );
}
