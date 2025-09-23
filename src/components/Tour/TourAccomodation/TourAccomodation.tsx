import dynamic from 'next/dynamic';
import { Hotel } from '../_types';
import { getTranslations } from 'next-intl/server';
const TourAccomodationInner = dynamic(() => import('./TourAccomodationInner'));

export default async function TourAccomodation({
  hotels,
  locale,
}: {
  hotels: Hotel[] | undefined;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: 'Tour' });

  if (!hotels || hotels.length === 0) return null;

  return (
    <div className="col-span-2 w-full z-40 flex flex-col">
      <h2 className="text-4xl font-semibold text-black mb-5 max-[920px]:text-[30px] max-[550px]:text-[24px] max-[550px]:mb-3">{t('hotel.title')}</h2>
      <TourAccomodationInner hotels={hotels} />
    </div>
  );
}
