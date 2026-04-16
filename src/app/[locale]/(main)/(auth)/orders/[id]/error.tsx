'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import Button from '@/components/UI/Button/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errors');

  useEffect(() => {
    console.error('Order page error:', error);
  }, [error]);

  return (
    <div className="container mx-auto mt-[150px] mb-[50px] px-4 md:mt-[200px]">
      <div className="rounded-xl border border-red-100 bg-white p-12 text-center shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-red-600">{t('title')}</h1>
        <p className="mb-6 text-gray-600">{t('description')}</p>
        <Button color="primary" onClick={reset}>
          {t('tryAgain')}
        </Button>
      </div>
    </div>
  );
}