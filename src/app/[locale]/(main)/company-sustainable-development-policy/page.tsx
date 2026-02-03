export const dynamic = 'force-dynamic';

import Main from "@/components/company's-sustainable-development-policy/Main/Main";
import { Metadata } from 'next';
import { apiGet } from '../../../../utils/serverApi';

type PageData = {
  seo_metadata?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
};

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const rawLocale = (await params).locale;
  const locale = ['en', 'ru'].includes(rawLocale) ? rawLocale : 'en';
  const pagePath = `/${locale}/company-sustainable-development-policy`;

  const data = (await apiGet(`pages?page=${encodeURIComponent(pagePath)}`, {
    next: { revalidate: 300 },
  })) as PageData;

  return {
    title: data?.seo_metadata?.title,
    description: data?.seo_metadata?.description,
    keywords: data?.seo_metadata?.keywords,
  };
}

export default async function page({ params }: Props) {
  const { locale } = await params;

  return <Main locale={locale} />;
}
