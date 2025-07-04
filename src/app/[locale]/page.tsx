export const dynamic = 'force-static';

import Adventure from '@/components/Home/Adventure/Adventure';
import Articles from '@/components/Home/Articles/Articles';
import BestSellers from '@/components/Home/BestSellers/BestSellers';
import ContactUs from '@/components/Home/ContactUs/ContactUs';
import CreateYourTrip from '@/components/Home/CreateYourTrip/CreateYourTrip';
import Destinations from '@/components/Home/Destinations/Destinations';
import Hero from '@/components/Home/Hero/Hero';
import HowToBook from '@/components/Home/HowToBook/HowToBook';
import Info from '@/components/Home/Info/Info';
import { Reviews } from '@/components/UI/Reviews/Reviews';
import { DefaultPageProps } from '@/types';
import { Metadata } from 'next';

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const slug = 'home';
  const locale = (await params).locale;

  const data = await fetch(`https://api.minzifatravel.com/api/v1/pages/${slug}?locale=${locale}`, {
    cache: 'force-cache',
  }).then((res) => res.json());

  return {
    title: data?.seo_metadata?.title,
    description: data?.seo_metadata?.description,
    keywords: data?.seo_metadata?.keywords,
  };
}

export default async function HomePage({ params }: DefaultPageProps) {
  const locale = await params;

  return (
    <>
      <Hero locale={locale.locale} />
      <Info locale={locale.locale} />
      <BestSellers locale={locale.locale} />
      <Destinations locale={locale.locale} />
      <HowToBook locale={locale.locale} />
      <Adventure locale={locale.locale} />
      <CreateYourTrip locale={locale.locale} />
      <ContactUs locale={locale.locale} />
      <Reviews />
      <Articles locale={locale.locale} />
    </>
  );
}
