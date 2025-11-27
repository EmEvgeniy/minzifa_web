import type { BestSellersPackagesCardType } from './_types';
import Link from 'next/link';
import BestSellersFavoriteBtn from './BestSellersFavoriteBtn';
import { ImageWithFallback } from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { useTranslations } from 'next-intl';
import Button from '../Button/Button';

type Props = {
  tour: BestSellersPackagesCardType;
  locale: string;
};

export default function BestSellersPackagesCard({ tour, locale }: Props) {
  const t = useTranslations();
  const href = `/${locale}/${tour?.destination?.slug}/${tour?.slug}`;

  return (
    <div className="flex-[0_0_90%] sm:flex-[0_0_50%] md:flex-[0_0_33%]">
      <div className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col h-full">
        {/* Image Block */}
        <div className="relative w-full flex-shrink-0">
          <Link href={href}>
            <div className="absolute inset-0 z-10" />
          </Link>
          <BestSellersFavoriteBtn tour={tour} />
          <div className="absolute inset-0 bg-black opacity-15 z-1" />

          <ImageWithFallback
            src={tour?.photo?.file}
            alt={tour?.photo?.alt_text || tour?.name || 'Minzifa Travel'}
            width={800}
            height={600}
            className="w-full h-full object-cover aspect-[3/3]"
            showLoader={true}
          />

          {/* Бейдж типа тура поверх изображения слева */}
          {tour?.tour_type && (
            <div className="absolute top-3 left-3 z-20 inline-flex items-center px-3 py-1.5 bg-white bg-opacity-70 text-gray-900 text-xs font-medium rounded-full backdrop-blur-sm">
              {t(`tour_types.${tour?.tour_type}`)}
            </div>
          )}

          {/* Название тура */}
          <div className="z-20 absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white text-ellipsis text-[18px] font-bold max-w-full line-clamp-2">
              {tour?.name}
            </p>
          </div>
        </div>

        {/* Info Block */}
        <div className="p-3.5 md:p-4 flex flex-col justify-between flex-grow gap-3">
          {/* Цена и кнопка */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-2.5">
            <div className="flex flex-row md:flex-col gap-2 items-center md:items-start justify-between w-full">
              <span className="text-base text-gray-700">
                {tour?.days} {t('all_tours.days')}
              </span>
              <span className="font-bold text-2xl text-gray-900">
                <span className="text-base text-gray-500 font-normal mr-1">{t('all_tours.from')}</span>
                {(tour?.valute && t(`currencies.${tour?.valute}`)) || tour?.valute} {tour?.price}
              </span>
            </div>
            <Button
              to={href}
              color="primary"
              className="text-sm md:text-base w-full py-4 px-12 md:p-2.5"
            >
              {t('all_tours.view_itinerary')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
