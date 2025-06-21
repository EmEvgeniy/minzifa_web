import { Destinations } from '@/components';
import { Hero, Info, Info2, Mission, Values } from '@/components/About';
import { Reviews } from '@/components/UI/Reviews/Reviews';
import { Metadata } from 'next';
import React from 'react';

type Props = {
  params: Promise<{ locale: string; }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = 'about-us';
  const locale = (await params).locale;

  const data = await fetch(`https://api.minzifatravel.com/api/v1/pages/${slug}?locale=${locale}`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return {
    title: data?.seo_metadata?.title,
    description: data?.seo_metadata?.description,
    keywords: data?.seo_metadata?.keywords,
  }
}

export default function page() {
  return (
    <>
      <Hero />
      <Info />
      <Info2 />
      <Mission />
      <Values />
      <Reviews />
      <Destinations />
    </>
  );
}
