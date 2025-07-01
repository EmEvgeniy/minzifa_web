import React from 'react';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

// Статический импорт компонентов, важных для first screen
import { Hero, Info, Mission, Values } from '@/components/About';

// Динамический импорт остальных компонентов
const Info2 = dynamic(() => import('@/components/About/Info2').then((mod) => mod.Info2), {
  loading: () => <div>Загрузка секции...</div>,
});

const Reviews = dynamic(() => import('@/components/UI/Reviews/Reviews').then((mod) => mod.Reviews), {
  loading: () => <div>Загрузка отзывов...</div>,
});

const Destinations = dynamic(() => import('@/components/Home/Destinations').then((mod) => mod.Destinations), {
  loading: () => <div>Загрузка направлений...</div>,
});

type Props = {
  params: Promise<{ locale: string }>;
};

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
  };
}

export default function Page() {
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
