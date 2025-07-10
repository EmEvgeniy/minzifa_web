import { DefaultComponentsProps } from '@/types';
import { getTranslations } from 'next-intl/server';
import TourByRequestBtn from './TourByRequestBtn';

export default async function TourByRequest({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale, namespace: 'Tour' });

  return (
    <div className={'sticky top-36'}>
      <div className="bg-white rounded-2xl p-6 flex flex-col gap-5">
        <div className="text-base">{t('by_request.text')}</div>
        <TourByRequestBtn title={t('by_request.button')} />
      </div>
    </div>
  );
}
