import type { BestSellersPackagesCardType } from './_types';
import Link from 'next/link';
import BestSellersFavoriteBtn from './BestSellersFavoriteBtn';
import { ImageWithFallback } from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { useTranslations } from 'next-intl';

type Props = {
  slide: BestSellersPackagesCardType;
  locale: string;
  days: string;
  from: string;
  view_itinerary: string;
  byRequest?: string;
};

export default function BestSellersPackagesCard({
  slide,
  locale,
  days,
  from,
  view_itinerary,
}: Props) {
  const t = useTranslations();
  const href = `/${locale}/${slide?.destination?.slug}/${slide?.slug}`;

  // Функция для получения человеко-читаемого типа тура с использованием переводов
  const getTourTypeLabel = (tourType?: string) => {
    if (!tourType) return null;

    // Используем переводы из файла локализации
    return t(`tour_types.${tourType}`);
  };

  const tourTypeLabel = getTourTypeLabel(slide?.tour_type);

  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col h-full">
      {/* Image Block */}
      <div className="relative w-full aspect-[3/4] flex-shrink-0">
        <Link href={href}>
          <div className="absolute inset-0 z-10" />
        </Link>
        <BestSellersFavoriteBtn tour={slide} />
        <div className="absolute inset-0 bg-black opacity-15 z-1" />

        <ImageWithFallback
          src={slide?.photo?.file}
          alt={slide?.photo?.alt_text || slide?.name || 'Minzifa Travel'}
          width={400}
          height={300}
          className="w-full h-full object-cover"
          showLoader={true}
        />

        {/* Бейдж типа тура поверх изображения слева */}
        {tourTypeLabel && (
          <div className="absolute top-3 left-3 z-20 inline-flex items-center px-3 py-1.5 bg-white bg-opacity-70 text-gray-900 text-xs font-medium rounded-full backdrop-blur-sm">
            {tourTypeLabel}
          </div>
        )}

        {/* Название тура */}
        <div className="z-20 absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white text-ellipsis text-[18px] font-bold max-w-full line-clamp-2">
            {slide?.name}
          </p>
        </div>
      </div>

      {/* Info Block */}
      <div className="p-4 flex flex-col justify-between flex-grow gap-3">
        {/* Дни и направления */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[16px] text-gray-700">
            <span className="font-medium">
              {slide?.days} {days}
            </span>
          </div>
        </div>

        {/* Цена и кнопка */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{from}:</span>
            <span className="font-bold text-[20px] text-gray-900">
              {t(`currencies.${slide?.valute}`) || slide?.valute} {slide?.price}
            </span>
          </div>

          <Link
            href={href}
            className="bg-[#27A430] hover:bg-[#66B93E] active:bg-[#27A430] px-4 py-2 text-white text-sm rounded-[20px] shadow-lg transition-all whitespace-nowrap"
          >
            {view_itinerary}
          </Link>
        </div>
      </div>
    </div>
  );
}
