import type { FC } from 'react';
import type { BestSellersPackagesCardType } from './_types';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  slide: BestSellersPackagesCardType;
};

export const BestSellersPackagesCard: FC<Props> = ({ slide }) => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="max-w-full min-h-[470px] rounded-2xl overflow-hidden bg-white shadow-2xs [@media(max-width:450px)]:min-h-[350px] w-full h-full">
      <div className="relative min-h-[372px] h-full w-full [@media(max-width:450px)]:min-h-[270px]">
        <div className="absolute inset-0 bg-black opacity-15 z-1 h-full" />
        <Image
          src={slide?.photo?.file || ''}
          alt={slide?.photo?.alt_text || 'Minzifa Travel'}
          fill
          loading="lazy"
          className="absolute w-full h-full object-cover"
        />
        <p className="z-2 text-white absolute bottom-0 left-0 p-5 text-ellipsis text-[28px] font-bold max-w-full [@media(max-width:450px)]:max-w-full [@media(max-width:450px)]:text-[22px]">
          {slide?.name}
        </p>
      </div>
      <div className="p-[20px] flex items-center justify-between">
        <div className=" flex flex-col gap-2">
          <p className="flex items-center justify-start gap-1.5 text-xl">
            <span>{slide?.days}</span>
            <span>{t('tourCard.days')}</span>
          </p>
          <p className="flex items-center justify-start gap-1.5 text-lg">
            <span className="text-[#464646]">{t('tourCard.from')}</span>
            <span className="font-semibold text-2xl">
              {slide?.valute ?? '$'} {slide?.price}
            </span>
          </p>
        </div>
        <Link
          className="bg-[#27A430] px-[20px] py-[18px] text-white rounded-[16px] text-base"
          href={`/${locale}/${slide?.destinations}/${slide?.slug}`}
        >
          {t('View_itinerary')}
        </Link>
      </div>
    </div>
  );
};
