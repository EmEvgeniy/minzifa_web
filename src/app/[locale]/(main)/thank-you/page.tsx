export const dynamic = 'force-dynamic';

import { DefaultPageProps } from '@/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { apiGet } from '../../../../utils/serverApi';

type PageData = {
  seo_metadata?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
};

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const rawLocale = (await params).locale;
  const locale = ['en', 'ru'].includes(rawLocale) ? rawLocale : 'en';
  const pagePath = `/${locale}/thank-you`;

  const data = (await apiGet(`pages?page=${encodeURIComponent(pagePath)}`, {
    next: { revalidate: 300 },
  })) as PageData;

  return {
    title: data?.seo_metadata?.title,
    description: data?.seo_metadata?.description,
    keywords: data?.seo_metadata?.keywords,
  };
}

export default async function page({ params, searchParams }: DefaultPageProps & { searchParams: Promise<{ status?: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'thankYou' });
  const resolvedSearchParams = await searchParams;
  const status = resolvedSearchParams.status;

  const title = status === 'failed'
    ? (locale === 'en' ? 'Payment Failed' : 'Оплата не прошла')
    : t('title');

  const subtitle = status === 'failed'
    ? (locale === 'en' ? 'Unfortunately, your payment was not processed. Please try again or contact support.' : 'К сожалению, ваш платеж не был обработан. Пожалуйста, попробуйте еще раз или обратитесь в службу поддержки.')
    : t('subtitle');

  return (
    <section className="h-screen">
      <div className="container h-full flex flex-col gap-5 items-center justify-center text-center">
        <h1 className="text-4xl font-bold">{title}</h1>
        <h2>{subtitle}</h2>
        <p>{t('text')}</p>
      </div>
    </section>
  );
}
