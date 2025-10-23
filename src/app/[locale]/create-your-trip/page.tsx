export const dynamic = 'force-dynamic';
import { create } from '@/assets/img';

import { Metadata } from 'next';
import { DefaultPageProps, ISeoMetadata } from '@/types';
import CreateYourTripFormWrapper from '@/components/Create-Your-Trip/CreateYourTripFormWrapper/CreateYourTripFormWrapper';
import { apiGet } from '../../../utils/serverApi';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const locale = (await params).locale;
  const pagePath = `/${locale}/create-your-trip`;

  const data = await apiGet<{ seo_metadata?: ISeoMetadata }>(
    `pages?page=${encodeURIComponent(pagePath)}`,
  );

  return {
    title: data?.seo_metadata?.title,
    description: data?.seo_metadata?.description,
    keywords: data?.seo_metadata?.keywords,
  };
}

export default async function page({ params }: DefaultPageProps) {
  const { locale } = await params;

  return (
    <section className="bg-[#16372D] w-full h-full min-h-[90svh] relative flex items-center">
      <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
      <ImageWithFallback
        src={create}
        alt="background-image"
        className="absolute top-0 object-cover"
      />
      <CreateYourTripFormWrapper locale={locale} />
    </section>
  );
}
