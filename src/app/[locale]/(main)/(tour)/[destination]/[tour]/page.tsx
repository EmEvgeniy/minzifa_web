export const dynamic = 'force-dynamic';

// import type { AllToursCardType } from '@/components/Tours/MainSection/_types';
import type { Tour as TourData } from '@/components/Tour/_types';
import type { Metadata } from 'next';
import { apiGet } from '../../../../../../utils/serverApi';
import TourWrapper from '@/components/Tour/TourWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string; tour: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tour: slug, locale } = await params;

  try {
    const tour = await apiGet<TourData>(`tours/${slug}?locale=${locale}`);
    if (!tour?.id)
      return {
        title: 'Tour - Minzifa Travel',
        description: 'Discover amazing tours with Minzifa Travel',
      };

    return {
      title: tour.seo_metadata?.title ?? tour.name,
      description: tour.seo_metadata?.description ?? 'Discover amazing tours with Minzifa Travel',
      keywords: tour.seo_metadata?.keywords ?? 'tours, travel, Minzifa',
    };
  } catch (error) {
    console.error('Error generating metadata for tour:', slug, error);
    return {
      title: 'Tour - Minzifa Travel',
      description: 'Discover amazing tours with Minzifa Travel',
    };
  }
}

export default async function Tour({ params }: Props) {
  const { tour: slug, locale } = await params;

  const t = await getTranslations({ locale, namespace: 'breadcrumbs' });

  let tourData: TourData | null = null;
  try {
    tourData = await apiGet<TourData>(`tours/${slug}?locale=${locale}`);
  } catch (err) {
    console.error('Failed to fetch tour data:', slug, err);
  }

  if (!tourData?.id) return notFound();

  return (
    <div className="w-full min-h-[200vh]">
      <div className="container !px-0 pt-[150px] flex flex-col gap-10 max-[920px]:pt-[56px]">
        <Breadcrumbs
          locale={locale}
          link={{ title: t('allTours'), link: `/${locale}/tours` }}
          link2={{ title: tourData.name, link: '' }}
          className="hidden md:block"
        />
        <TourWrapper locale={locale} tourData={tourData} />
      </div>
    </div>
  );
}
