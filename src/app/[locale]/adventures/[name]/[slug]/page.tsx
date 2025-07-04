export const dynamic = 'force-static';

import { Content } from '@/components/Adventure';
import { FreeConsultationForm } from '@/components/UI/FreeConsultationForm/FreeConsultationForm';
import { ArticleCardType } from '@/components/UI/ArticleCard/_types';
import { Metadata } from 'next';
import { DefaultPageProps } from '@/types';
import Articles from '@/components/Home/Articles/Articles';

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const locale = (await params).locale;

  const tour: ArticleCardType = await fetch(
    `https://api.minzifatravel.com/api/v1/articles/${slug}?locale=${locale}`,
  ).then((res) => res.json());

  return {
    title: tour?.seo_metadata?.title,
    description: tour?.seo_metadata?.description,
    keywords: tour?.seo_metadata?.keywords,
  };
}

export default async function page({ params }: DefaultPageProps) {
  const locale = await params;
  return (
    <section className=" pt-[150px] min-h-[100svh] max-[1200px]:pt-[120px] max-[550px]:pt-[100px]">
      <div className="container">
        <Content />
      </div>

      <Articles locale={locale.locale} />

      <div className="container">
        <FreeConsultationForm />
      </div>
    </section>
  );
}
