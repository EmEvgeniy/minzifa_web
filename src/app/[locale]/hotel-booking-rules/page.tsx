export const dynamic = 'force-static';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import { DefaultPageProps } from '@/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const slug = 'hotel-booking-rules';
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

export default async function page({ params }: DefaultPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hotel-booking-rules' });

  return (
    <section className="container pt-[150px] h-full max-[768px]:py-[100px]">
      <Breadcrumbs />
      <div className="w-full h-full flex flex-col items-start gap-5 pt-[30px]">
        <h1 className="text-[56px] font-semibold max-[1024px]:text-[35px] max-[768px]:text-[28px] max-[768px]:font-semibold font-title">
          {t('title')}
        </h1>
        <p className="text-[24px] font-semibold max-[768px]:text-[18px] max-[768px]:font-semibold">
          {t('sub_title')}
        </p>
        <p className="text-[18px] max-[768px]:text-[14px]">{t('text')}</p>
        <p className="text-[24px] font-semibold max-[768px]:text-[18px] max-[768px]:font-semibold">
          {t('sub_title2')}
        </p>
        <p className="text-[18px] max-[768px]:text-[14px]">{t('text2')}</p>
        <p className="text-[24px] font-semibold max-[768px]:text-[18px] max-[768px]:font-semibold">
          {t('sub_title3')}
        </p>
        <p className="text-[18px] max-[768px]:text-[14px]">{t('text3')}</p>
        <p className="text-[24px] font-semibold max-[768px]:text-[18px] max-[768px]:font-semibold">
          {t('sub_title4')}
        </p>
        <p className="text-[18px] max-[768px]:text-[14px]">{t('text4')}</p>
      </div>
    </section>
  );
}
