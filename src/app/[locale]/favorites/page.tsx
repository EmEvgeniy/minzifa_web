import Favorites from '@/components/Favorites/Favorites';
import FavoritesAll from '@/components/Favorites/FavoritesAll';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import { DefaultPageProps } from '@/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const locale = (await params).locale;

  return {
    title:
      locale === 'en'
        ? 'Your favorite tours in our web site'
        : 'Ваши избранные туры на нашем сайте',
    description: '',
    keywords: '',
  };
}

export default async function page({ params }: DefaultPageProps) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <section
      className="w-full h-full min-h-[100svh] flex flex-col gap-5 container py-[150px] 
  max-[768px]:py-[100px] max-[500px]:pt-[100px] "
    >
      <Breadcrumbs
        locale={locale}
        link={{ title: locale === 'en' ? 'Favorites' : 'Избранные', link: '' }}
      />
      <h1 className="text-[42px] [@media(max-width:768px)]:text-[24px]">{t('favoriteBtn')}</h1>
      <Favorites locale={locale} />
      <FavoritesAll locale={locale} />
    </section>
  );
}
