export const dynamic = 'force-static';

import Hero from '@/components/Tours/Hero/Hero';
import MainSection from '@/components/Tours/MainSection/MainSection';
import MobileMenu from '@/components/Tours/MobileMenu/MobileMenu';
import { DefaultPageProps } from '@/types';
import { Metadata } from 'next';

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const { locale } = await params;
  const slug = `https://minzifatravel.com/${locale}/tours`;

  const data = await fetch(
    `https://api.minzifatravel.com/api/v1/pages?page=${slug}`,
  ).then((res) => res.json());

  return {
    title: data?.seo_metadata?.title,
    description: data?.seo_metadata?.description,
    keywords: data?.seo_metadata?.keywords,
  };
}

export default async function Tours({ params }: DefaultPageProps) {
  const { locale } = await params;

  return (
    <section className="w-full relative">
      <Hero locale={locale} />
      <MainSection locale={locale} />
      <MobileMenu locale={locale} />
    </section>
  );
}
