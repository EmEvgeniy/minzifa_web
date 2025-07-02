import Loader from '@/components/UI/Loader/Loader';
import { Reviews } from '@/components/UI/Reviews/Reviews';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Hero = dynamic(() => import('@/components/Home/Hero/Hero'), {
  loading: () => <div>Загрузка направлений...</div>,
});
const Info = dynamic(() => import('@/components/Home/Info/Info'));
const BestSellers = dynamic(() => import('@/components/Home/BestSellers/BestSellers'));
const Destinations = dynamic(() => import('@/components/Home/Destinations/Destinations'));
const HowToBook = dynamic(() => import('@/components/Home/HowToBook/HowToBook'));
const Adventure = dynamic(() => import('@/components/Home/Adventure/Adventure'));
const CreateYourTrip = dynamic(() => import('@/components/Home/CreateYourTrip/CreateYourTrip'));
const ContactUs = dynamic(() => import('@/components/Home/ContactUs/ContactUs'));
const Articles = dynamic(() => import('@/components/Home/Articles/Articles'));

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = 'home';
  const locale = (await params).locale;

  const data = await fetch(`https://api.minzifatravel.com/api/v1/pages/${slug}?locale=${locale}`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return {
    title: data?.seo_metadata?.title,
    description: data?.seo_metadata?.description,
    keywords: data?.seo_metadata?.keywords,
  };
}

export default function Home() {
  return (
    <Suspense fallback={<Loader />}>
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
    </Suspense>
  );
}
