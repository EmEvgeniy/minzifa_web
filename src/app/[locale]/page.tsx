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
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

export default function Home() {
  return (
    <>
      <Hero />
      <Info />
      <BestSellers />
      <Destinations />
      <HowToBook />
      <Adventure />
      <CreateYourTrip />
      <ContactUs />
      <Reviews />
      <Articles />
    </>
  );
}
