import dynamic from 'next/dynamic';
import ContactUs from '@/components/Home/ContactUs/ContactUs';
import CreateYourTrip from '@/components/Home/CreateYourTrip/CreateYourTrip';
import HowToBook from '@/components/Home/HowToBook/HowToBook';
import { Metadata } from 'next';
import { DefaultPageProps } from '@/types';

const Hero = dynamic(() => import('@/components/Home/Hero/Hero'));
const Info = dynamic(() => import('@/components/Home/Info/Info'));
const BestSellers = dynamic(() => import('@/components/Home/BestSellers/BestSellers'));
const Destinations = dynamic(() => import('@/components/Home/Destinations/Destinations'));
const Adventure = dynamic(() => import('@/components/Home/Adventure/Adventure'));
const Articles = dynamic(() => import('@/components/Home/Articles/Articles'));
const Reviews = dynamic(() => import('@/components/UI/Reviews/Reviews'));

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const slug = 'home';
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

export default async function HomePage({ params }: DefaultPageProps) {
  const { locale } = await params;

  return (
    <>
      <Hero locale={locale} />
      <Info locale={locale} />
      <BestSellers locale={locale} />
      <Destinations locale={locale} />
      <HowToBook locale={locale} />
      <Adventure locale={locale} />
      <CreateYourTrip locale={locale} />
      <ContactUs locale={locale} />
      <Reviews locale={locale} />
      <Articles locale={locale} />
    </>
  );
}
