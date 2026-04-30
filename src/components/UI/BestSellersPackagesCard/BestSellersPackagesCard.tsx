import type { BestSellersPackagesCardType } from './_types';
import Link from 'next/link';
import BestSellersFavoriteBtn from './BestSellersFavoriteBtn';
import { ImageWithFallback } from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { useTranslations } from 'next-intl';

type Props = {
  tour: BestSellersPackagesCardType;
  locale: string;
};

export default function BestSellersPackagesCard({ tour, locale }: Props) {
  const t = useTranslations();
  const href = `/${locale}/${tour?.destination?.slug}/${tour?.slug}`;

  return (
    <div
      className="flex-[0_0_81%] sm:flex-[0_0_50%] md:flex-[0_0_27.78%]"
      style={{ willChange: 'transform' }}
    >
      <div className="bg-white rounded-t-[12px] rounded-b-[16px] overflow-hidden md:shadow-xl shadow-[0_0_20px_rgba(0,0,0,0.08)] flex flex-col h-full">
        {/* Image Block */}
        <div className="relative w-full shrink-0">
          <Link href={href}>
            <div className="absolute inset-0 z-10" />
          </Link>

          <BestSellersFavoriteBtn tour={tour} />

          <ImageWithFallback
            src={tour?.photo?.file as string}
            alt={tour?.photo?.alt_text || tour?.name || 'Minzifa Travel'}
            width={400}
            height={270}
            sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 400px"
            className="w-[300px] h-[200px] lg:w-[400px] lg:h-[270px] rounded-[12px] overflow-hidden"
          />

          <p className="bg-white px-3 py-2 absolute top-3 left-3 rounded-full text-sm font-semibold leading-100">
            {t('common.tourTypes.' + tour?.tour_type)}
          </p>
        </div>

        {/* Info Block */}
        <div className="px-4 py-6 gap-6 flex flex-col justify-between grow lg:p-4 lg:gap-3">
          <div className="flex flex-col gap-1">
            <div className="text-base text-gray-700">
              {tour?.days} {t('common.tourCard.days')}
            </div>
            <p className="text-foreground text-ellipsis text-[18px] font-bold max-w-full line-clamp-2">
              {tour?.name}
            </p>
          </div>
          <div className="flex flex-col items-end self-end">
                <span className="text-base font-medium leading-100 text-content">
                  {t('common.tourCard.from')}
                </span>
            <span className="font-semibold text-[20px] leading-100 text-foreground">
              {(tour?.valute && t(`common.currencies.${tour?.valute}`)) || tour?.valute}{' '}
              {tour?.price}{' '}
            <span className="text-base font-medium leading-100 text-content">
                {t('common.tourCard.pp')}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
