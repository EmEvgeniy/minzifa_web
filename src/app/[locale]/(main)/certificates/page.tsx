export const dynamic = 'force-dynamic';

import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import { DefaultPageProps } from '@/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Img1 from '@/assets/img/certificates/01.jpg';
import Img2 from '@/assets/img/certificates/02.jpg';
import Img3 from '@/assets/img/certificates/03.jpg';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const rawLocale = (await params).locale;
  const locale = ['en', 'ru'].includes(rawLocale) ? rawLocale : 'en';
  const t = await getTranslations({ locale });

  return t.raw('certificates.seo_metadata');
}

const images = [
  {
    src: Img1,
    alt: 'certificate',
  },
  {
    src: Img2,
    alt: 'certificate',
  },
  {
    src: Img3,
    alt: 'certificate',
  },
];

export default async function page({ params }: DefaultPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <section className="container py-[150px] flex flex-col gap-5 max-[768px]:py-[100px]">
      <Breadcrumbs locale={locale} link={{ link: '', title: t('breadcrumbs.certificates') }} />
      <h1 className="text-[42px] max-[768px]:text-[30px] max-[550px]:text-[24px] font-title">
        {t('certificates.title')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <ImageWithFallback key={index} src={image.src} alt={image.alt} />
        ))}
      </div>
    </section>
  );
}
