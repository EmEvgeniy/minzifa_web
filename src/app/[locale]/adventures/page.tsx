export const dynamic = 'force-static';

import { ArticlesMain, Hero } from '@/components/Adventures';
import { FreeConsultationForm } from '@/components/UI/FreeConsultationForm/FreeConsultationForm';
import { DefaultPageProps } from '@/types';
import { Metadata } from 'next';

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

  console.log(locale);

  return (
    <>
      <Hero />
      <ArticlesMain />
      <div className="container">
        <FreeConsultationForm />
      </div>
    </>
  );
}
