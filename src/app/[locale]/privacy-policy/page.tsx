export const dynamic = 'force-static';

import { Metadata } from 'next';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import { DefaultPageProps } from '@/types';
import { getTranslations } from 'next-intl/server';

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const slug = 'privacy-policy';
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
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <section className="container py-[150px] flex flex-col gap-5 max-[768px]:py-[100px]">
      <Breadcrumbs />
      <h1 className="text-[42px] max-[768px]:text-[30px] max-[550px]:text-[24px] font-title">
        {t('title')}
      </h1>
      <div
        dangerouslySetInnerHTML={{ __html: t('text') || '' }}
        className="text-[18px] max-[550px]:text-[14px]"
      />
    </section>
  );
}
