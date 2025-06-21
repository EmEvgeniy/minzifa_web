import { ArticlesMain, Hero } from '@/components/Adventures';
import { FreeConsultationForm } from '@/components/UI/FreeConsultationForm/FreeConsultationForm';
import { Metadata } from 'next';
import React from 'react';

type Props = {
  params: Promise<{ locale: string; }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;

  const data: {
    [key: string]: {
      seo_metadata: {
        title: string;
        description: string;
        keywords: string;
      }
    }
  } = {
    en: {
      seo_metadata: {
        title: 'Adventures',
        description: 'Adventures',
        keywords: 'Adventures',
      }
    },
    ru: {
      seo_metadata: {
        title: 'Путешествия',
        description: 'Путешествия',
        keywords: 'Путешествия',
      }
    }
  }

  return {
    title: data[locale].seo_metadata?.title,
    description: data[locale]?.seo_metadata?.description,
    keywords: data[locale]?.seo_metadata?.keywords,
  }
}

export default function page() {
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
