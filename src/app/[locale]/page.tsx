import {
  Adventure,
  Articles,
  BestSellers,
  ContactUs,
  CreateYourTrip,
  Destinations,
  Hero,
  HowToBook,
  Info,
} from '@/components';
import { Reviews } from '@/components/UI/Reviews/Reviews';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string; }>
}

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
  }
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
