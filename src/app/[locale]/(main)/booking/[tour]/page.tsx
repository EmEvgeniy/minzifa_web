export const dynamic = 'force-dynamic';

import { Tour } from '@/components/Tour/_types';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { apiGet } from '../../../../../utils/serverApi';
import { getTranslations } from 'next-intl/server';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import BookingHeader from '@/components/Booking/BookingHeader/BookingHeader';
import FormWrapper from '@/components/Booking/FormWrapper/FormWrapper';

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

  let tourData: Tour | null = null;

  try {
    tourData = await apiGet(`tours/${tour}?locale=${locale}`, {
      next: { revalidate: 60 * 20 },
    });
  } catch (err) {
    console.warn(`Failed to fetch tour ${tour}:`, err);
  }

  // Если данных нет — редирект на главную локали
  if (!tourData?.id) redirect(`/${locale}`);

  return (
    <section className="relative pb-[0px] mt-[100px] md:mt-[150px] flex flex-col gap-5 min-h-[200px]">
      <Breadcrumbs
        locale={locale}
        link={{ title: t('breadcrumbs.booking'), link: '' }}
        className="container"
      />
      <BookingHeader tourData={tourData} />
      <FormWrapper locale={locale} tourData={tourData} />
    </section>
  );
}
