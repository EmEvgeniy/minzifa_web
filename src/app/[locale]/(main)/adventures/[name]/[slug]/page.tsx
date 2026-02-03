export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { DefaultPageProps } from '@/types';
import Articles from '@/components/Home/Articles/Articles';
import FreeConsultationForm from '@/components/UI/FreeConsultationForm/FreeConsultationForm';

import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import { redirect } from 'next/navigation';
import Content, { ArticleDetail } from '@/components/Adventure/Content/Content';
import { BestSellersPackagesCardType } from '@/components/UI/BestSellersPackagesCard/_types';
import { getTranslations } from 'next-intl/server';
import { apiGet } from '../../../../../../utils/serverApi';
import { ArticleCardType } from '@/components/UI/ArticleCard/_types';

export const revalidate = 300;

type ArticleData = {
  id: number;
  seo_metadata?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
};

export async function generateStaticParams() {
  const locales = ['en', 'ru'];
  const paths = [];

  for (const locale of locales) {
    const articles = await apiGet<ArticleCardType[]>(`articles?all=1&locale=${locale}`, {
      next: { revalidate: revalidate },
    });

    for (const article of articles) {
      paths.push({
        locale,
        name: article?.category?.slug,
        slug: article?.slug,
      });
    }
  }

  return paths;
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const locale = (await params).locale;

  const article = (await apiGet(`articles/${slug}?locale=${locale}`, {
    next: { revalidate: revalidate },
  })) as ArticleData;

  return {
    title: article?.seo_metadata?.title,
    description: article?.seo_metadata?.description,
    keywords: article?.seo_metadata?.keywords,
  };
}

export default async function page({ params }: DefaultPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });

  const article = (await apiGet(`articles/${slug}?locale=${locale}`, {
    next: { revalidate: revalidate },
  })) as ArticleDetail;

  const tours = (await apiGet(`tours?show_in_article=1&limit=2&random=1&locale=${locale}`, {
    next: { revalidate: revalidate },
  })) as BestSellersPackagesCardType[];

  if (!article?.id) redirect(`/${locale}`);

  return (
    <section className=" pt-[150px] min-h-[100svh] max-[1200px]:pt-[120px] max-[550px]:pt-[100px]">
      <div className="container">
        <Breadcrumbs
          locale={locale}
          link={{ title: t('breadcrumbs.articles'), link: `/${locale}/adventures` }}
          link2={{ title: article.name, link: '' }}
        />
        <Content locale={locale} articleDetail={article} tours={tours} />
      </div>

      <Articles locale={locale} />

      <div className="container">
        <FreeConsultationForm />
      </div>
    </section>
  );
}
