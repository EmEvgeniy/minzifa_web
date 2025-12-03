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

export const revalidate = 60 * 60;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateStaticParams() {
  const locales = ['en', 'ru'];
  const paths = [];

  for (const locale of locales) {
    const destinations = await apiGet<DestinationData[]>(`destinations?all=1&locale=${locale}`);

    for (const destination of destinations) {
      paths.push({
        locale,
        slug: destination.slug,
      });
    }
  }

  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;

  const destination = (await apiGet(`destinations/${slug}?locale=${locale}`)) as DestinationData;

  return {
    title: destination?.seo_metadata?.title,
    description: destination?.seo_metadata?.description,
    keywords: destination?.seo_metadata?.keywords,
  };
}

export default async function page({ params }: Props) {
  const { slug, locale } = await params;

  const destination = (await apiGet(`destinations/${slug}?locale=${locale}`)) as DestinationData;

  const initTours = (await apiGet(`tours?locale=${locale}&perPage=10&destinations[]=${destination.name}`)) as PaginatedData<AllToursCardType>;

  const initDestinations = (await apiGet(`destinations?locale=${locale}&all=1`)) as DestinationCard[];

  const initTourTypes = (await apiGet(`types?locale=${locale}&all=1`)) as TourType[];

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
