import dynamic from 'next/dynamic';
import { DefaultPageProps } from '@/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Hero from '@/components/Adventures/Hero/Hero';
const ArticlesMain = dynamic(() => import('@/components/Adventures/ArticlesMain/ArticlesMain'));
const FreeConsultationForm = dynamic(
  () => import('@/components/UI/FreeConsultationForm/FreeConsultationForm'),
);

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const locale = (await params).locale;

  const data: {
    [key: string]: {
      seo_metadata: {
        title: string;
        description: string;
        keywords: string;
      };
    };
  } = {
    en: {
      seo_metadata: {
        title: 'Adventures',
        description: 'Adventures',
        keywords: 'Adventures',
      },
    },
    ru: {
      seo_metadata: {
        title: 'Путешествия',
        description: 'Путешествия',
        keywords: 'Путешествия',
      },
    },
  };

  return {
    title: data[locale].seo_metadata?.title,
    description: data[locale]?.seo_metadata?.description,
    keywords: data[locale]?.seo_metadata?.keywords,
  };
}

export default async function page({ params }: DefaultPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'articles' });
  const btns = t.raw('btns') as { title: string; value: string }[];
  const menu = t.raw('sort') as { title: string; value: string }[];

  return (
    <>
      <Hero title={t('main_title')} subTitle="" />
      <ArticlesMain btns={btns} menu={menu} titleT={t('title')} btn={t('show_more')} />
      <div className="container">
        <FreeConsultationForm />
      </div>
    </>
  );
}
