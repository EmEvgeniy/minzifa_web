import { Hero, MainSection, MobileMenu } from '@/components/Tours';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string; }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = 'tours';
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

export default function Tours() {
  return (
    <div className="w-full relative">
      <Hero />
      <MainSection />
      <MobileMenu />
    </div>
  );
}
