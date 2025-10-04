export const dynamic = 'force-dynamic';

import { contact_us } from '@/assets/img';
import { Form } from '@/components/ContactUs';
import Image from 'next/image';
import React from 'react';
import { Metadata } from 'next';
import LeftInfo from '@/components/ContactUs/LeftInfo/LeftInfo';
import { DefaultPageProps } from '@/types';
import { SeoMetadata } from '@/components/Tour/_types';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import { getTranslations } from 'next-intl/server';
import { apiGet } from '../../../utils/serverApi';

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const locale = (await params).locale;
  const pagePath = `/${locale}/contact`;

  const data = await apiGet<{ seo_metadata?: SeoMetadata }>(
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
  const t = await getTranslations();

  return (
    <section className="bg-[#16372D] w-full relative min-h-[90svh] h-full flex items-center justify-center py-[150px] max-[1024px]:min-h-[100svh] max-[768px]:py-[100px]">
      <Image
        src={contact_us}
        fill
        alt="contact_us"
        className=" object-cover absolute top-0 z-10"
        loading="lazy"
      />
      <div className="container absolute z-30 top-35 max-[1024px]:top-25 w-full">
        <Breadcrumbs
          mainStyle="text-white "
          listClasses="text-white"
          locale={locale}
          link={{ link: '', title: t('breadcrumbs.contact') }}
        />
      </div>
      <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
      <div className="container flex items-start justify-between gap-5 w-full relative z-30 h-full max-[768px]:flex-col max-[768px]:items-center max-[768px]:justify-center mt-[50px]">
        <LeftInfo locale={locale} />
        <div className="w-full block max-[768px]:hidden">
          <Form />
        </div>
      </div>
    </section>
  );
}
