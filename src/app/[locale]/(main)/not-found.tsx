import NotFoundContent from '@/components/Parts/NotFound/NotFoundContent';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function LocaleNotFoundPage() {
  const locale = await getLocale();

  if (!['en', 'ru'].includes(locale)) {
    notFound();
  }

  return <NotFoundContent locale={locale} />;
}
