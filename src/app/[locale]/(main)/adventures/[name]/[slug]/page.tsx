export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { DefaultPageProps } from '@/types';
import FreeConsultationForm from '@/components/UI/FreeConsultationForm/FreeConsultationForm';

import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import { redirect } from 'next/navigation';
import Content, { ArticleDetail } from '@/components/Adventure/Content/Content';
import { BestSellersPackagesCardType } from '@/components/UI/BestSellersPackagesCard/_types';
import { getTranslations } from 'next-intl/server';
import { apiGet } from '../../../../../../utils/serverApi';
import { ArticleCardType } from '@/components/UI/ArticleCard/_types';

export const revalidate = 300;

// Универсальная безопасная функция для API
async function safeApiGet<T>(url: string, fallback: T, revalidateSeconds = revalidate): Promise<T> {
  try {
    return (await apiGet(url, { next: { revalidate: revalidateSeconds } })) as T;
  } catch (err: unknown) {
    const e = err as { status?: number; statusText?: string; url?: string };
    console.warn(`Failed API GET: ${url}`, e?.status, e?.statusText, e?.url);
    return fallback;
  }
}

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
  const paths: { locale: string; name: string; slug: string }[] = [];

  for (const locale of locales) {
    const articles = await safeApiGet<ArticleCardType[]>(`articles?all=1&locale=${locale}`, []);

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
  const rawLocale = (await params).locale;
  const locale = ['en', 'ru'].includes(rawLocale) ? rawLocale : 'en';

  const article = await safeApiGet<ArticleData>(`articles/${slug}?locale=${locale}`, { id: 0 });

  return {
    title: article?.seo_metadata?.title || 'Article - Minzifa Travel',
    description:
      article?.seo_metadata?.description || 'Read amazing travel articles with Minzifa Travel',
    keywords: article?.seo_metadata?.keywords || 'travel, articles, Central Asia',
  };
}

export default async function page({ params }: DefaultPageProps) {
  const rawLocale = (await params).locale;
  const slug = (await params).slug;
  const locale = ['en', 'ru'].includes(rawLocale) ? rawLocale : 'en';
  const t = await getTranslations({ locale });

  const article = await safeApiGet<ArticleDetail>(`articles/${slug}?locale=${locale}`, {
    id: 0,
    name: '',
    published: '',
    description: '',
    media: {
      file: '',
      alt: undefined,
    },
  });
  const tours = await safeApiGet<BestSellersPackagesCardType[]>(
    `tours?show_in_article=1&limit=2&random=1&locale=${locale}`,
    [],
  );

  if (!article?.id) redirect(`/${locale}`);

  return (
    <section className="pt-[150px] min-h-svh max-[1200px]:pt-[120px] max-[550px]:pt-[100px]">
      <div className="container">
        <Breadcrumbs
          locale={locale}
          link={{ title: t('breadcrumbs.articles'), link: `/${locale}/adventures` }}
          link2={{ title: article.name, link: '' }}
        />
        <Content locale={locale} articleDetail={article} tours={tours} />
      </div>

      <div className="container">
        <FreeConsultationForm />
      </div>
    </section>
  );
}
