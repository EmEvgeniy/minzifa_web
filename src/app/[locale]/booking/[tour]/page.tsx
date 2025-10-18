export const dynamic = 'force-dynamic';
import BookingFormPage from '@/components/Booking/BookingFormPage';
import { Tour } from '@/components/Tour/_types';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { apiGet } from '../../../../utils/serverApi';

type Props = {
  params: Promise<{ locale: string; tour: string }>;
};

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;

  return {
    title: locale === 'en' ? 'Booking' : 'Бронирование',
    description: locale === 'en' ? 'Booking' : 'Бронирование',
    keywords: locale === 'en' ? 'Booking' : 'Бронирование',
  };
}

export default async function Booking({ params }: Props) {
  const { tour, locale } = await params;

  const tourData = (await apiGet(`tours/${tour}?locale=${locale}`, {
    next: { revalidate: 60 * 20 },
  })) as Tour;

  if (!tourData?.id) redirect(`/${locale}`);

  return <BookingFormPage tourData={tourData} locale={locale} />;
}
