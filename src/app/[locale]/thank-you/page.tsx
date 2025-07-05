export const dynamic = 'force-static';

import { DefaultPageProps } from '@/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const slug = 'thank-you';
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

export default async function page({ params }: DefaultPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ThankYou' });

  return (
    <section className="h-screen">
      <div className="container h-full flex flex-col gap-5 items-center justify-center text-center">
        <h1 className="text-4xl font-bold">{t('title')}</h1>
        <h2>{t('subtitle')}</h2>
        <p>{t('text')}</p>
      </div>
    </section>
  );
}
