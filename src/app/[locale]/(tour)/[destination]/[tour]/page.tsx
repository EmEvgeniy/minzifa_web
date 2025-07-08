import { Tour as TourData } from '@/components/Tour/_types';
import TourWrapper from '@/components/Tour/TourWrapper';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ locale: string; tour: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tour: slug, locale } = await params;

  const tour: TourData = await fetch(
    `https://api.minzifatravel.com/api/v1/tours/${slug}?locale=${locale}`,
  ).then((res) => res.json());

  return {
    title: tour?.seo_metadata?.title,
    description: tour?.seo_metadata?.description,
    keywords: tour?.seo_metadata?.keywords,
  };
}

export default async function Tour({ params }: Props) {
  const { tour: slug, locale } = await params;

  const res = await fetch(`https://api.minzifatravel.com/api/v1/tours/${slug}?locale=${locale}`, {
    next: { revalidate: 60 * 20 },
  });

  if (!res.ok) redirect(`/${locale}`);

  const tourData: TourData = await res.json();

  if (!tourData?.id) redirect(`/${locale}`);

  if (tourData?.photo) {
    tourData?.gallery.unshift(tourData?.photo);
  }

  return <TourWrapper tourData={tourData} locale={locale} />;
}
