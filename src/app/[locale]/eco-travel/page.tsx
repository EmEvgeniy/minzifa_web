export const dynamic = 'force-static';

import {
  Animal,
  Children,
  Economy,
  Environment,
  Hero,
  Mission,
  MobileSlider,
  Respect,
  Team,
} from '@/components/Eco-travel';
import EnvironmentCircle from '@/components/UI/DynamicCircle/index.desktop';
import { FreeConsultationForm } from '@/components/UI/FreeConsultationForm/FreeConsultationForm';
import React from 'react';

import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = 'responsible-conscious-travel';
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

export default async function page() {
  return (
    <>
      <Hero />
      <Team />
      <Mission />
      <EnvironmentCircle />
      <MobileSlider />
      <Environment />
      <Respect />
      <Children />
      <Animal />
      <Economy />
      <div className="container">
        <FreeConsultationForm />
      </div>
    </>
  );
}
