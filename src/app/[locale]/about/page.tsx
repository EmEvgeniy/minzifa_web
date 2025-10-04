export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { DefaultPageProps } from '@/types';
import Hero from '@/components/About/Hero/Hero';
import Info from '@/components/About/Info/Info';
import Info2 from '@/components/About/Info2/Info2';
import Mission from '@/components/About/Mission/Mission';
import Values from '@/components/About/Values/Values';
import Reviews from '@/components/UI/Reviews/Reviews';
import Destinations from '@/components/Home/Destinations/Destinations';
import { apiGet } from '@/utils/serverApi';

type PageData = {
  seo_metadata?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
};

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const locale = (await params).locale;
  const pagePath = `/${locale}/about`;

  const data = (await apiGet(`pages?page=${encodeURIComponent(pagePath)}`, {
    next: { revalidate: 300 },
  })) as PageData;

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
