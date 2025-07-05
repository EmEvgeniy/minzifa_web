import { Metadata } from 'next';
import { DefaultPageProps } from '@/types';

import Hero from '@/components/About/Hero/Hero';
import Info from '@/components/About/Info/Info';
import Info2 from '@/components/About/Info2/Info2';
import Mission from '@/components/About/Mission/Mission';
import Values from '@/components/About/Values/Values';
import dynamic from 'next/dynamic';
const Reviews = dynamic(() => import('@/components/UI/Reviews/Reviews'));
const Destinations = dynamic(() => import('@/components/Home/Destinations/Destinations'));

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const slug = 'about-us';
  const locale = (await params).locale;

  const data = await fetch(
    `https://api.minzifatravel.com/api/v1/pages/${slug}?locale=${locale}`,
  ).then((res) => res.json());

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
