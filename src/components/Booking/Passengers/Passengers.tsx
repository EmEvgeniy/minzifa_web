import { DefaultComponentsProps } from '@/types';
import { getTranslations } from 'next-intl/server';
import PassengersInner from './PassengersInner';

export default async function Passengers({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale, namespace: 'Booking' });
  const hints = t.raw('passenger.passenger_hint') as string[];
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-[#16372D] text-4xl max-[768px]:text-[24px] max-[768px]:text-center">
        {t('passenger.title')}
      </h2>
      <PassengersInner passenger={t('passenger.passenger')} hints={hints} />
    </div>
  );
}
