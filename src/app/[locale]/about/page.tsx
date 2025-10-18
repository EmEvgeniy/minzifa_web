import dynamic from 'next/dynamic';

import { Metadata } from 'next';
import { DefaultPageProps } from '@/types';
import { apiGet } from '@/utils/serverApi';

const Hero = dynamic(() => import('@/components/About/Hero/Hero'));
const Info = dynamic(() => import('@/components/About/Info/Info'));
const Info2 = dynamic(() => import('@/components/About/Info2/Info2'));
const Mission = dynamic(() => import('@/components/About/Mission/Mission'));
const Values = dynamic(() => import('@/components/About/Values/Values'));
const Reviews = dynamic(() => import('@/components/UI/Reviews/Reviews'));
const Destinations = dynamic(() => import('@/components/Home/Destinations/Destinations'));

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
  const pagePath = `/${locale}/about`;

  const data = (await apiGet(`pages?page=${encodeURIComponent(pagePath)}`, {
    next: { revalidate: 300 },
  })) as PageData;

  return {
    title: data?.seo_metadata?.title,
    description: data?.seo_metadata?.description,
    keywords: data?.seo_metadata?.keywords,
  };
}

export default async function Page({ params }: DefaultPageProps) {
  const { locale } = await params;

  return (
    <>
      <Hero locale={locale} />
      <Info locale={locale} />
      <Info2 locale={locale} />
      <Mission locale={locale} />
      <Values locale={locale} />
      <Reviews locale={locale} />
      <Destinations locale={locale} />
    </>
  );
}
