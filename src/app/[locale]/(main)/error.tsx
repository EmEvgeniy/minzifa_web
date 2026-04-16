'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errors');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <p className="max-w-md text-center text-gray-600">{t('description')}</p>
      <button
        onClick={reset}
        className="mt-4 rounded bg-green-600 px-6 py-2 text-white transition hover:bg-green-700"
      >
        {t('tryAgain')}
      </button>
    </div>
  );
}
