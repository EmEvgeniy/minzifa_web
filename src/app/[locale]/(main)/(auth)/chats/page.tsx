
import Chats from '@/components/Auth/Chats/Chats';
import { DefaultPageProps } from '@/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'chats.metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `https://minzifatravel.com/${locale}/chats`,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://minzifatravel.com/${locale}/chats`,
      siteName: 'Minzifa Travel',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function page() {
  return <Chats />;
}
