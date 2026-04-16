'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function TourError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errors');
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <p className="max-w-md text-center text-gray-600">{t('description')}</p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={reset}
          className="rounded bg-green-600 px-6 py-2 text-white transition hover:bg-green-700"
        >
          {t('tryAgain')}
        </button>
        <Link
          href={`/${locale}/tours`}
          className="rounded bg-gray-600 px-6 py-2 text-white transition hover:bg-gray-700"
        >
          {t('backToTours')}
        </Link>
      </div>
    </div>
  );
}
