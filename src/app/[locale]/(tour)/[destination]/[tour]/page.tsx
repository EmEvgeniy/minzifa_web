export const dynamic = 'force-static';
import { Tour as TourData } from '@/components/Tour/_types';
import TourWrapper from '@/components/Tour/TourWrapper';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string; tour: string }>;
};

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

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

  return <TourWrapper slug={slug} locale={locale} />;
}
