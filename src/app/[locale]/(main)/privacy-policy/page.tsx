export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import { DefaultPageProps, ISeoMetadata } from '@/types';
import { getTranslations } from 'next-intl/server';
import Markdown from 'markdown-to-jsx';
import { apiGet } from '../../../../utils/serverApi';

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const rawLocale = (await params).locale;
  const locale = ['en', 'ru'].includes(rawLocale) ? rawLocale : 'en';
  const pagePath = `/${locale}/privacy-policy`;

  const data = await apiGet<{ seo_metadata?: ISeoMetadata }>(
    `pages?page=${encodeURIComponent(pagePath)}`,
  );

  return {
    title: data?.seo_metadata?.title,
    description: data?.seo_metadata?.description,
    keywords: data?.seo_metadata?.keywords,
  };
}

export default async function page({ params }: DefaultPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <section className="container py-[150px] flex flex-col gap-5 max-[768px]:py-[100px]">
      <Breadcrumbs locale={locale} link={{ link: '', title: t('breadcrumbs.privacy') }} />
      <h1 className="text-[42px] max-[768px]:text-[30px] max-[550px]:text-[24px] font-title">
        {t('privacy.title')}
      </h1>
      <Markdown className="text-[18px] max-[550px]:text-[14px]">{t('privacy.text') || ''}</Markdown>
    </section>
  );
}
