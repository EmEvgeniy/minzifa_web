export const dynamic = 'force-static';
import { create } from '@/assets/img';

import Image from 'next/image';

import { Metadata } from 'next';
import { DefaultPageProps } from '@/types';
import CreateYourTripFormWrapper from '@/components/Create-Your-Trip/CreateYourTripFormWrapper/CreateYourTripFormWrapper';

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const slug = 'create-your-trip';
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

export default async function page({ params }: DefaultPageProps) {
  const { locale } = await params;

  return (
    <section className="bg-[#16372D] w-full h-full min-h-[90svh] relative flex items-center">
      <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
      <Image
        src={create}
        alt="background-image"
        fill
        className="absolute top-0 object-cover"
        loading="lazy"
      />
      <CreateYourTripFormWrapper locale={locale} />
    </section>
  );
}
