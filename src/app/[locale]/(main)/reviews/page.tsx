import { apiGet } from '@/api';
import Reviews, { IVideoReview } from '@/components/Reviews/Reviews';
import { getLocale } from 'next-intl/server';
import ReviewsWrapper from '@/components/UI/Reviews/Reviews';
import { getTranslations } from 'next-intl/server';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import LeftInfo from '@/components/ContactUs/LeftInfo/LeftInfo';
import { ContactForm } from '@/components/ContactUs';
import { contact_us } from '@/assets/img';
import { DefaultPageProps, ISeoMetadata } from '@/types';
import { Metadata } from 'next';

async function safeApiGet<T>(url: string, fallback: T, revalidateSeconds = 300): Promise<T> {
  try {
    return (await apiGet(url, { next: { revalidate: revalidateSeconds } })) as T;
  } catch (err: any) {
    console.warn(`Failed API GET: ${url}`, err?.status, err?.statusText, err?.url);
    return fallback;
  }
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const locale = (await params).locale;
  const safeLocale = ['en', 'ru'].includes(locale) ? locale : 'en';
  const pagePath = `/${safeLocale}/video-reviews`;

  const data = await safeApiGet<{ seo_metadata?: ISeoMetadata }>(
    `pages?page=${encodeURIComponent(pagePath)}`,
    {},
  );

  return {
    title: data?.seo_metadata?.title,
    description: data?.seo_metadata?.description,
    keywords: data?.seo_metadata?.keywords,
  };
}

export default async function page() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'reviewsPage' });
  const reviews = await apiGet<IVideoReview[]>(`video-reviews?locale=${locale}`);

  return (
    <>
      <div className="container mx-auto mt-[100px] md:mt-[150px]">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{t('title')}</h1>
        <ReviewsWrapper />
        <Reviews reviews={reviews} />
      </div>
      <section className="bg-[#16372D] w-full relative min-h-[90svh] h-full flex items-center justify-center py-[150px] max-[1024px]:min-h-[100svh] max-[768px]:py-[100px]">
        <ImageWithFallback
          src={contact_us}
          alt="contact_us"
          preload
          className=" object-cover absolute top-0 z-10"
        />
        <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
        <div className="container flex items-start justify-between gap-5 w-full relative z-30 h-full max-[768px]:flex-col max-[768px]:items-center max-[768px]:justify-center mt-[50px]">
          <LeftInfo locale={locale} />
          <div className="w-full block max-[768px]:hidden">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
