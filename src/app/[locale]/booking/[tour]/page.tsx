export const dynamic = "force-dynamic";

import { Tour } from '@/components/Tour/_types';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { apiGet } from '../../../../utils/serverApi';
import { getTranslations } from 'next-intl/server';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import BookingHeader from '@/components/Booking/BookingHeader/BookingHeader';
import FormWrapper from '@/components/Booking/FormWrapper/FormWrapper';
// import dynamic from 'next/dynamic';
// const Breadcrumbs = dynamic(() => import('@/components/UI/Breadcrumbs/Breadcrumbs'));
// const BookingHeader = dynamic(() => import('@/components/Booking/BookingHeader/BookingHeader'));
// const FormWrapper = dynamic(() => import('@/components/Booking/FormWrapper/FormWrapper'));

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
  const t = await getTranslations({ locale });

  const tourData = (await apiGet(`tours/${tour}?locale=${locale}`, {
    next: { revalidate: 60 * 20 },
  })) as Tour;

  if (!tourData?.id) redirect(`/${locale}`);

  return (
    <section className="relative pb-[0px] mt-[100px] md:mt-[150px] flex flex-col gap-5 min-h-[200px]">
      <Breadcrumbs locale={locale} link={{ title: t('breadcrumbs.booking'), link: '' }} className={'container'} />
      <BookingHeader tourData={tourData} />
      <FormWrapper locale={locale} tourData={tourData} />
    </section>
  );
}
