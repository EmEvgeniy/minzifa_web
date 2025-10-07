export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { DestinationData } from './_types';
import Hero from '@/components/Destination/Hero/Hero';
import ToursSection from '@/components/Tours/ToursSection/ToursSection';
import Reviews from '@/components/UI/Reviews/Reviews';
import Articles from '@/components/Home/Articles/Articles';
import MobileMenu from '@/components/Tours/MobileMenu/MobileMenu';
import { getTranslations } from 'next-intl/server';
import { apiGet } from '../../../../utils/serverApi';

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
  const t = await getTranslations({ locale });
  const tAllTours = await getTranslations({ locale, namespace: 'all_tours' });

  const destination = (await apiGet(`destinations/${slug}?locale=${locale}`, {
    next: { revalidate: 60 * 20 },
  })) as DestinationData;

  const menu = t.raw('all_tours.sort') as { title: string; value: string }[];
  const seasonData = tAllTours.raw('seasons') as { title: string; value: string }[];
  const hotelData = tAllTours.raw('hotels') as { title: string; value: string }[];

  const translations = {
    showing: t('all_tours.showing'),
    out: t('all_tours.out'),
    nf: t('all_tours.not_found'),
    days: t('all_tours.days'),
    from: t('all_tours.from'),
    location: t('all_tours.location'),
    view_itinerary: t('all_tours.view_itinerary'),
    byRequest: t('all_tours.byRequest'),
    f_top_btn: tAllTours('f_top_btn'),
    pl: tAllTours('pl'),
    before: tAllTours('before'),
    pl2: tAllTours('pl2'),
    pl3: tAllTours('pl3'),
    pl4: tAllTours('pl4'),
    pl5: tAllTours('pl5'),
    pl6: tAllTours('pl6'),
    pl7: tAllTours('pl7'),
    find_destination: tAllTours('find_destination'),
  };

  return (
    <>
      <Hero destination={destination} locale={locale} />
      <div className="container py-[70px] w-full">
        <ToursSection
          locale={locale}
          destination={destination}
          showFilter={['price', 'duration', 'seasons', 'hotels', 'tourType']}
          seasonData={seasonData}
          hotelData={hotelData}
          types={tAllTours.raw('types') as { title: string; value: string }[]}
          menu={menu}
          translations={translations}
        />
      </div>
      <Reviews locale={locale} />
      <Articles locale={locale} />
      <MobileMenu locale={locale} />
    </>
  );
}
