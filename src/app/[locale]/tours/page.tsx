export const dynamic = 'force-static';

import Hero from '@/components/Tours/Hero/Hero';
import {
  DestinationDataResponse,
  ToursResponse,
  TourTypeDataResponse,
} from '@/components/Tours/MainSection/_types';
import MainSection from '@/components/Tours/MainSection/MainSection';
import MobileMenu from '@/components/Tours/MobileMenu/MobileMenu';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    prices: string[];
    days: string[];
    seasons: string[];
    hotels: string[];
    types: string[];
    destinations: string[];
    sort?: string;
    page?: string;
  }>;
};

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = 'tours';
  const { locale } = await params;

  const data = await fetch(`https://api.minzifatravel.com/api/v1/pages/${slug}?locale=${locale}`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return {
    title: data?.seo_metadata?.title,
    description: data?.seo_metadata?.description,
    keywords: data?.seo_metadata?.keywords,
  };
}

export default async function Tours({ params, searchParams }: Props) {
  const { locale } = await params;
  const API_URL = 'https://api.minzifatravel.com/api/v1';

  const buildFilterQuery = async (): Promise<string> => {
    const { prices, days, seasons, hotels, types, destinations, sort, page } = await searchParams;

    const params = new URLSearchParams();

    const appendRange = (key: string, values?: string[] | number[]) => {
      if (Array.isArray(values) && values.length === 2) {
        params.append(`${key}[]`, values[0].toString());
        params.append(`${key}[]`, values[1].toString());
      }
    };

    const appendArray = (key: string, values?: string[] | string) => {
      if (Array.isArray(values)) {
        values.forEach((v) => params.append(`${key}[]`, v));
      } else if (typeof values === 'string') {
        params.append(`${key}[]`, values);
      }
    };

    appendRange('prices', prices);
    appendRange('days', days);
    appendArray('seasons', seasons);
    appendArray('hotels', hotels);
    appendArray('types', types);
    appendArray('destinations', destinations);

    if (sort) params.append('sort', sort);
    if (page) params.append('page', page);

    return params.toString();
  };

  const filterQuery = await buildFilterQuery();

  const request = `${API_URL}/tours?locale=${locale}&perPage=5&${filterQuery}`;

  const tourData: ToursResponse = await fetch(request, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  const [tourTypesData, destinationsData]: [TourTypeDataResponse, DestinationDataResponse] =
    await Promise.all([
      fetch(`${API_URL}/types?all=true&locale=${locale}`, { next: { revalidate: 60 } }).then(
        (res) => res.json(),
      ),
      fetch(`${API_URL}/destinations?all=true&locale=${locale}`, { next: { revalidate: 60 } }).then(
        (res) => res.json(),
      ),
    ]);

  return (
    <section className="w-full relative">
      <Hero />
      <MainSection
        tourData={tourData}
        tourTypesData={tourTypesData}
        destinationsData={destinationsData}
      />
      <MobileMenu tourTypesData={tourTypesData} destinationsData={destinationsData} />
    </section>
  );
}
