export const dynamic = 'force-static';

import { Metadata } from 'next';
import { Hero, Info, Info2, Mission, Values } from '@/components/About';
import { Reviews } from '@/components/UI/Reviews/Reviews';
import Destinations from '@/components/Home/Destinations/Destinations';
import { DefaultPageProps } from '@/types';

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const slug = 'about-us';
  const locale = (await params).locale;

  const data = await fetch(
    `https://api.minzifatravel.com/api/v1/pages/${slug}?locale=${locale}`,
    {},
  ).then((res) => res.json());

  return {
    title: data?.seo_metadata?.title,
    description: data?.seo_metadata?.description,
    keywords: data?.seo_metadata?.keywords,
  };
}

export default async function Page({ params }: DefaultPageProps) {
  const locale = await params;
  return (
    <>
      <Hero />
      <Info />
      <Info2 />
      <Mission />
      <Values />
      <Reviews />
      <Destinations locale={locale.locale} />
    </>
  );
}
