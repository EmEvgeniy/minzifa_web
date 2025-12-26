import { AllToursCardType } from './MainSection/_types';
import { IoLocationOutline } from 'react-icons/io5';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { useTranslations } from 'next-intl';
import { Fallback_Image } from '@/assets/img';

type HorizontalTourCardProps = {
  tour: AllToursCardType;
  locale: string;
};

export default function HorizontalTourCard({ tour, locale }: HorizontalTourCardProps) {
  const t = useTranslations();

  // Функция для получения человеко-читаемого типа тура
  const getTourTypeLabel = (tourType?: string) => {
    if (!tourType) return null;
    return t(`common.tourTypes.${tourType}`);
  };

  const tourTypeLabel = getTourTypeLabel(tour?.tour_type);

  return (
    <div
      key={tour.id}
      className="grid grid-cols-1 md:grid-cols-[353px_1fr] w-full bg-white rounded-[16px] shadow-2xl overflow-hidden h-full"
    >
      {/* Блок изображения */}
      <div className="relative w-full h-full md:h-full md:max-h-[254px] overflow-hidden">
        <ImageWithFallback
          src={tour.photo?.file}
          alt={tour.photo?.alt_text || tour.name || ''}
          width={500}
          height={300}
          className="w-full h-full md:max-h-[250px]"
          fallbackSrc={Fallback_Image.src}
        />

        {/* Бейдж типа тура поверх изображения слева */}
        {tourTypeLabel && (
          <div className="absolute top-3 left-3 z-20 inline-flex items-center px-3 py-1.5 bg-white bg-opacity-70 text-gray-900 text-xs font-medium rounded-full backdrop-blur-sm">
            {tourTypeLabel}
          </div>
        )}

        {/* Название поверх изображения — только на мобилке */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-3 block md:hidden">
          <h3 className="text-white text-lg sm:text-xl font-semibold line-clamp-2">{tour.name}</h3>
        </div>
      </div>

      {/* Контент карточки */}
      <div className="w-full p-5 flex flex-col justify-between gap-4 h-full">
        {/* Название и блок цен — только на десктопе */}
        <div className="hidden md:flex flex-row items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold text-gray-900 line-clamp-2 flex-grow pr-4">
            {tour.name}
          </h3>

          {/* Блок дней и цены с разделителем */}
          <div className="flex flex-row items-start gap-6 shrink-0">
            {/* Дни */}
            <div className="flex flex-col items-end gap-1 text-right">
              <span className="text-custom-gray-500 text-sm">{t('common.tourCard.days')}</span>
              <span className="text-custom-green-900 text-xl font-bold">{tour.days}</span>
            </div>

            {/* Разделитель */}
            <div className="w-px bg-gray-300 h-10 self-center" />

            {/* Цена */}
            <div className="flex flex-col items-end gap-1 text-right">
              <span className="text-custom-gray-500 text-sm">{t('common.tourCard.from')}</span>
              <span className="text-custom-green-900 text-xl font-bold">
                {t(`common.currencies.${tour?.valute}`) || tour?.valute} {tour.price}
              </span>
            </div>
          </div>
        </div>

        {/* На мобилке — дни и цена в одной строке, локация ниже */}
        <div className="flex flex-col gap-2 md:hidden">
          {/* Дни и цена */}
          <div className="flex items-center justify-between text-base font-medium text-gray-900">
            {/* Дни */}
            <div className="flex items-center gap-1">
              <span>{t('common.tourCard.days')}:</span>
              <span className="text-custom-green-900 font-bold text-xl">{tour.days}</span>
            </div>

            {/* Разделитель */}
            <div className="w-px bg-gray-300 h-5" />

            {/* Цена */}
            <div className="flex items-center gap-1">
              {tour.price ? (
                <>
                  <span>{t('common.tourCard.from')}:</span>
                  <span className="text-custom-green-900 font-bold text-xl">
                    {t(`common.currencies.${tour?.valute}`) || tour?.valute} {tour.price}
                  </span>
                </>
              ) : (
                <span className="text-custom-gray-500">{t('allTours.byRequest')}</span>
              )}
            </div>
          </div>

          {/* Локация */}
          <div className="flex items-center gap-2 mt-1 text-gray-700 text-base border-t border-t-gray-300 py-3">
            <IoLocationOutline className="text-[#27A430]" />
            <span className="truncate">{tour.destination.name}</span>
          </div>
        </div>

        {/* Локация — только на десктопе */}
        <div className="hidden md:flex items-center">
          <div className="bg-[#CFDFD9] p-1 rounded-[10px]">
            <IoLocationOutline size={28} />
          </div>
          <div className="ml-2">
            <h5 className="text-md text-gray-900">{t('allTours.location')}</h5>
            <p className="truncate overflow-hidden font-normal text-[#9B9B9B] max-w-[250px] sm:max-w-[400px]">
              {tour.destination.name}
            </p>
          </div>
        </div>

        {/* Кнопка */}
        <Link
          className="mt-3 bg-[#27A430] w-full text-center rounded-[12px] py-[10px] shadow-2xl text-white text-sm sm:text-base transition-all hover:bg-[#66B93E] active:bg-[#27A430]"
          href={`/${locale}/${tour.destination.slug}/${tour.slug}`}
        >
          {t('allTours.viewItinerary')}
        </Link>
      </div>
    </div>
  );
}
