export const dynamic = 'force-static';

import { Main } from '@/components/Destination';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};
export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = 'destination';
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

export default async function page() {
  return (
    <section
      className="container flex items-center justify-center min-h-[50svh] h-full py-[150px] 
  max-[768px]:py-[100px] max-[500px]:pt-[100px]"
    >
      <Main />
    </section>
  );
}
