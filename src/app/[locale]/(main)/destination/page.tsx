export const dynamic = 'force-dynamic';

import { Main } from '@/components/Destination';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import { DefaultPageProps, PaginatedData } from '@/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { apiGet } from '../../../../utils/serverApi';
import { DestinationCard } from '@/components/Home/Destinations/_types';

// Универсальный безопасный запрос к API
async function safeApiGet<T>(url: string, fallback: T, revalidateSeconds = 300): Promise<T> {
  try {
    return (await apiGet(url, { next: { revalidate: revalidateSeconds } })) as T;
  } catch (err: unknown) {
    const e = err as { status?: number; statusText?: string; url?: string };
    console.warn(`Failed API GET: ${url}`, e?.status, e?.statusText, e?.url);
    return fallback;
  }
}

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
  const safeLocale = ['en', 'ru'].includes(locale) ? locale : 'en';
  const slug = `/${safeLocale}/destination`;

  const data = await safeApiGet<PageData>(`pages?page=${slug}`, {}, 300);

  return {
    title: data?.seo_metadata?.title || 'Destinations - Minzifa Travel',
    description: data?.seo_metadata?.description || 'Explore destinations with Minzifa Travel',
    keywords: data?.seo_metadata?.keywords || 'travel, destinations, tours',
  };
}

export default async function page({ params, searchParams }: DefaultPageProps) {
  const locale = (await params).locale;
  const safeLocale = ['en', 'ru'].includes(locale) ? locale : 'en';

  const sp = await searchParams;
  const t = await getTranslations({ locale: safeLocale });
  const currentPage = Number(sp?.page) || 1;

  const emptyDestinations: PaginatedData<DestinationCard> = {
    data: [],
    meta: {
      current_page: 0,
      first_page_url: '',
      from: 0,
      last_page: 0,
      last_page_url: null,
      next_page_url: null,
      path: '',
      per_page: 0,
      prev_page_url: null,
      to: 0,
      total: 0,
    },
  };

  const destinations = await safeApiGet<PaginatedData<DestinationCard>>(
    `destinations?locale=${safeLocale}&page=${currentPage}&parent=0`,
    emptyDestinations,
    60 * 5,
  );

  return (
    <section className="container mt-[100px] md:mt-[150px] flex flex-col gap-5">
      <Breadcrumbs locale={safeLocale} link={{ link: '', title: t('breadcrumbs.destination') }} />
      <h1 className="text-[56px] max-[1024px]:text-[42px] max-[768px]:text-[35px] max-[768px]:font-semibold font-title">
        {t('breadcrumbs.destination')}
      </h1>
      <Main destinations={destinations} currentPage={currentPage} />
    </section>
  );
}
