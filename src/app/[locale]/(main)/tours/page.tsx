import { apiGet } from '@/api';
import Hero from '@/components/Tours/Hero/Hero';
import { AllToursCardType, TourType } from '@/components/Tours/MainSection/_types';
import MainSection from '@/components/Tours/MainSection/MainSection';
import MobileMenu from '@/components/Tours/MobileMenu/MobileMenu';
import { DefaultPageProps, PaginatedData } from '@/types';
import { Metadata } from 'next';
import { DestinationCard } from '@/components/Home/Destinations/_types';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const { locale } = await params;
  const pagePath = `/${locale}/tours`;

  const data = await fetch(
    `https://api.minzifatravel.com/api/v1/pages?page=${encodeURIComponent(pagePath)}`,
    { next: { revalidate: 3600 } },
  ).then((res) => res.json());

  if (!data.ok) notFound();

  const title = data?.seo_metadata?.title || 'Tours - Minzifa Travel';
  const description =
    data?.seo_metadata?.description ||
    'Explore amazing tour packages to Central Asia. Group and private tours to Uzbekistan, Kyrgyzstan, Tajikistan, Kazakhstan and Turkmenistan.';

  return {
    title,
    description,
    keywords: data?.seo_metadata?.keywords || 'tours, travel packages, Central Asia tours',
    alternates: {
      canonical: `https://minzifatravel.com/${locale}/tours`,
      languages: {
        en: `https://minzifatravel.com/en/tours`,
        ru: `https://minzifatravel.com/ru/tours`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://minzifatravel.com/${locale}/tours`,
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

  const initTours = (await apiGet(`tours?locale=${locale}&perPage=10`, {
    next: { revalidate: 60 * 20 },
  })) as PaginatedData<AllToursCardType>;

  const initDestinations = (await apiGet(`destinations?locale=${locale}&all=1`, {
    next: { revalidate: 60 * 20 },
  })) as DestinationCard[];

  const initTourTypes = (await apiGet(`types?locale=${locale}&all=1`, {
    next: { revalidate: 60 * 20 },
  })) as TourType[];

  return (
    <section className="w-full relative">
      <Hero locale={locale} />
      <MainSection
        locale={locale}
        initTours={initTours}
        initDestinations={initDestinations}
        initTourTypes={initTourTypes}
      />
      <MobileMenu locale={locale} />
    </section>
  );
}
