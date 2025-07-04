export const dynamic = 'force-static';

import BookingFormPage from '@/components/Booking/BookingFormPage';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
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

export default async function Booking() {
  return <BookingFormPage />;
}
