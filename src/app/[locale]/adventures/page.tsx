export const dynamic = 'force-static';
import { DefaultPageProps } from '@/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Hero from '@/components/Adventures/Hero/Hero';
import ArticlesMain from '@/components/Adventures/ArticlesMain/ArticlesMain';
import FreeConsultationForm from '@/components/UI/FreeConsultationForm/FreeConsultationForm';

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const locale = (await params).locale;
  const slug = `https://minzifatravel.com/${locale}/adventures`;

  const data = await fetch(
    `https://api.minzifatravel.com/api/v1/pages?page=${slug}`,
  ).then((res) => res.json());

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

  const categories: ArticleCategory[] = await fetch(`https://api.minzifatravel.com/api/v1/categories?locale=${locale}`, { next: { revalidate: 60 } }).then((res) => res.json());
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
