'use client';

import { useTranslations } from 'next-intl';
import BestSellersPackagesCard from '../UI/BestSellersPackagesCard/BestSellersPackagesCard';
import { useFavoriteStore } from '../UI/FavoriteBtn/store';
import FreeConsultationForm from '../UI/FreeConsultationForm/FreeConsultationForm';

function Favorites({ locale }: { locale: string }) {
  const { tours } = useFavoriteStore((s) => s);
  const t = useTranslations();

  if (!tours.length)
    return (
      <div className="w-full ">
        <p className="text-[35px] max-[1024px]:text-[24px] max-[768px]:text-[18px]">
          {t('favorite_nf')}
        </p>
        <FreeConsultationForm />
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-5 h-full">
      <div className="grid grid-cols-3 gap-5 w-full h-full max-[1024px]:grid-cols-2 max-[500px]:grid-cols-1">
        {tours.map((el, i) => (
          <BestSellersPackagesCard
            key={i}
            locale={locale}
            slide={el}
            days={t('all_tours.days')}
            from={t('all_tours.from')}
            view_itinerary={t('all_tours.view_itinerary')}
            byRequest={t('all_tours.byRequest')}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
