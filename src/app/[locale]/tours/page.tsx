import Hero from '@/components/Tours/Hero/Hero';
import MainSection from '@/components/Tours/MainSection/MainSection';
import { DefaultPageProps } from '@/types';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const MobileMenu = dynamic(() => import('@/components/Tours/MobileMenu/MobileMenu'));

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const slug = 'tours';
  const { locale } = await params;

  const data = await fetch(
    `https://api.minzifatravel.com/api/v1/pages/${slug}?locale=${locale}`,
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
