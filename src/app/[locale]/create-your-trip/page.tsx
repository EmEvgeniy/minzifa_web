import { create } from '@/assets/img';
import { CreateYourTripFormWrapper } from '@/components/Create-Your-Trip';
import Image from 'next/image';
import React from 'react';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string; }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = 'create-your-trip';
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
    <section className="bg-[#16372D] w-full h-full min-h-[90svh] relative flex items-center">
      <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
      <Image src={create} alt="background-image" fill className="absolute top-0 object-cover" />
      <CreateYourTripFormWrapper />
    </section>
  );
}
