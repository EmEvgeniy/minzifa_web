import { Articles } from '@/components';
import { Hero, Tours } from '@/components/Destination';
import { Reviews } from '@/components/UI/Reviews/Reviews';
import React from 'react';

import type { Metadata } from 'next'
import { Destination } from '@/components/Tour/_types';

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export type DestinationData = {
  id: number;
  name: string;
  description: string;
  parent: Destination;
  slug: string;
  seo_metadata: {
    title: string;
    description: string;
    keywords: string;
  }
  media: {
    id: number;
    file: string;
    alt_text: string;
  };
  icon: {
    id: number;
    file: string;
    alt_text: string;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const locale = (await params).locale;

  const destination: DestinationData = await fetch(`https://api.minzifatravel.com/api/v1/destinations/${slug}?locale=${locale}`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return {
    title: destination?.seo_metadata?.title,
    description: destination?.seo_metadata?.description,
    keywords: destination?.seo_metadata?.keywords,
  }
}

export default function page() {
  return (
    <>
      <Hero />
      <Tours />
      <Reviews />
      <Articles />
    </>
  );
}
