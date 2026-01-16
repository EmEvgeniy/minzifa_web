export const dynamic = 'force-dynamic';
import { DefaultPageProps } from '@/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Hero from '@/components/Adventures/Hero/Hero';
import ArticlesMain from '@/components/Adventures/ArticlesMain/ArticlesMain';
import FreeConsultationForm from '@/components/UI/FreeConsultationForm/FreeConsultationForm';
import { apiGet } from '../../../../utils/serverApi';

export const revalidate = 3600;

type PageData = {
  seo_metadata?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
};

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const locale = (await params).locale;
  const pagePath = `/${locale}/adventures`;

  const data = (await apiGet(`pages?page=${encodeURIComponent(pagePath)}`, {
    next: { revalidate: revalidate },
  })) as PageData;

  return {
    title: data?.seo_metadata?.title,
    description: data?.seo_metadata?.description,
    keywords: data?.seo_metadata?.keywords,
  };
}

export type ArticleCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

export default async function page({ params }: DefaultPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const categories = (await apiGet(`categories?locale=${locale}`, {
    next: { revalidate: revalidate },
  })) as ArticleCategory[];

  const menu = t.raw('articles.sort') as { title: string; value: string }[];
  const all_categories: string = t.raw('articles.all_categories');

  return (
    <>
      <Hero
        title={t('articles.main_title')}
        subTitle=""
        locale={locale}
        link={{ link: '', title: t('breadcrumbs.articles') }}
      />
      <ArticlesMain
        categories={categories}
        locale={locale}
        menu={menu}
        titleT={t('articles.title')}
        btn={t('articles.show_more')}
        all_categories={all_categories}
      />
      <div className="container">
        <FreeConsultationForm />
      </div>
    </>
  );
}
