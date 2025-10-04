import { DefaultComponentsProps } from '@/types';
import { getTranslations } from 'next-intl/server';
import TourByRequestBtn from './TourByRequestBtn';
import { Tour } from '../_types';

export default async function TourByRequest({ locale, tour }: DefaultComponentsProps & { tour?: Tour }) {
  const t = await getTranslations({ locale, namespace: 'Tour' });

  return (
    <div className={'hidden md:block sticky top-36 max-[920px]:top-20'}>
      <div className="bg-white rounded-2xl p-6 flex flex-col gap-5 max-[920px]:p-4 max-[550px]:gap-3">
        <div className="text-base max-[920px]:text-[14px]">{t('by_request.text')}</div>
        <TourByRequestBtn title={t('by_request.button')} tour={tour} />
      </div>
    </div>
  );
}
