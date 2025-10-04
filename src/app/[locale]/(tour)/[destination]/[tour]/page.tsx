export const dynamic = 'force-dynamic';
import { Tour as TourData } from '@/components/Tour/_types';
import TourWrapper from '@/components/Tour/TourWrapper';
import type { Metadata } from 'next';
import { apiGet } from '../../../../../utils/serverApi';

type Props = {
  params: Promise<{ locale: string; tour: string }>;
};

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tour: slug, locale } = await params;

  try {
    const tour = await apiGet<TourData>(`tours/${slug}?locale=${locale}`);

    return {
      title: tour?.seo_metadata?.title,
      description: tour?.seo_metadata?.description,
      keywords: tour?.seo_metadata?.keywords,
    };
  } catch (error) {
    console.error('Error generating metadata for tour:', slug, error);

    // Возвращаем базовые метаданные при ошибке
    return {
      title: 'Tour - Minzifa Travel',
      description: 'Discover amazing tours with Minzifa Travel',
    };
  }
}

export default async function Tour({ params }: Props) {
  const { tour: slug, locale } = await params;

  return <TourWrapper slug={slug} locale={locale} />;
}
