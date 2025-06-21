import { Articles } from '@/components';
import { Content } from '@/components/Adventure';
import { FreeConsultationForm } from '@/components/UI/FreeConsultationForm/FreeConsultationForm';
import React from 'react';
import { ArticleCardType } from '@/components/UI/ArticleCard/_types';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const locale = (await params).locale;

  const tour: ArticleCardType = await fetch(`https://api.minzifatravel.com/api/v1/articles/${slug}?locale=${locale}`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return {
    title: tour?.seo_metadata?.title,
    description: tour?.seo_metadata?.description,
    keywords: tour?.seo_metadata?.keywords,
  }
}

export default function page() {
  return (
    <section className=" pt-[150px] min-h-[100svh] max-[1200px]:pt-[120px] max-[550px]:pt-[100px]">
      <div className="container">
        <Content />
      </div>
      <Articles />
      <div className="container">
        <FreeConsultationForm />
      </div>
    </section>
  );
}
