import BookingFormPage from '@/components/Booking/BookingFormPage';
import { Tour } from '@/components/Tour/_types';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ locale: string; tour: string }>;
};

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = 'booking-tour';
  const locale = (await params).locale;

  const data = await fetch(
    `https://api.minzifatravel.com/api/v1/pages/${slug}?locale=${locale}`,
  ).then((res) => res.json());

  return {
    title: data?.seo_metadata?.title,
    description: data?.seo_metadata?.description,
    keywords: data?.seo_metadata?.keywords,
  };
}

export default async function Booking({ params }: Props) {
  const { tour, locale } = await params;

  const res = await fetch(`https://api.minzifatravel.com/api/v1/tours/${tour}?locale=${locale}`, {
    next: { revalidate: 60 * 20 },
  });

  if (!res.ok) redirect(`/${locale}`);

  const tourData: Tour = await res.json();

  return <BookingFormPage tourData={tourData} locale={locale} />;
}
