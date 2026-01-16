export const dynamic = 'force-dynamic';

import { Main } from '@/components/Destination';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import { DefaultPageProps, PaginatedData } from '@/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { apiGet } from '../../../../utils/serverApi';
import { DestinationCard } from '@/components/Home/Destinations/_types';

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
  const slug = `https://minzifatravel.com/${locale}/destination`;

  const data = (await apiGet(`pages?page=${slug}`, {
    next: { revalidate: 300 },
  })) as PageData;

  return {
    title: data?.seo_metadata?.title,
    description: data?.seo_metadata?.description,
    keywords: data?.seo_metadata?.keywords,
  };
}

export default async function page({ params, searchParams }: DefaultPageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  const t = await getTranslations({ locale });
  const currentPage = Number(sp?.page) || 1;

  const destinations = (await apiGet(
    `destinations?locale=${locale}&page=${currentPage}&parent=0`,
    {
      next: { revalidate: 60 * 5 },
    },
  )) as PaginatedData<DestinationCard>;

  return (
    <section className="container mt-[100px] md:mt-[150px] flex flex-col gap-5">
      <Breadcrumbs locale={locale} link={{ link: '', title: t('breadcrumbs.destination') }} />
      <h1 className="text-[56px] max-[1024px]:text-[42px] max-[768px]:text-[35px] max-[768px]:font-semibold font-title">
        {t('breadcrumbs.destination')}
      </h1>
      <Main destinations={destinations} currentPage={currentPage} />
    </section>
  );
}
