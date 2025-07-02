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
    <Link prefetch={true} href={`/${locale}/${slide?.destination?.slug}/${slide?.slug}`}>
      <div className="max-w-full min-h-[470px] rounded-2xl overflow-hidden bg-white [@media(max-width:450px)]:min-h-[350px] w-full h-full shadow-[0px_0px_20px_5px_rgba(0,0,0,0.2)]">
        <div className="relative min-h-[372px] max-h-[372px] h-full w-full [@media(max-width:450px)]:min-h-[270px]">
          <div className="absolute inset-0 bg-black opacity-15 z-1 h-full" />
          {slide?.photo?.file && (
            <Image
              src={slide?.photo?.file || ''}
              alt={slide?.photo?.alt_text || 'Minzifa Travel'}
              fill
              loading="lazy"
              className="absolute w-full h-full object-cover"
            />
          )}
          <p className="z-2 text-white absolute bottom-0 left-0 p-5 text-ellipsis text-[20px] font-bold max-w-full [@media(max-width:450px)]:max-w-full ">
            {slide?.name}
          </p>
        </div>
        <div className="p-[10px] flex items-center justify-between">
          <div className=" flex flex-col gap-2">
            <p className="flex items-center justify-start gap-1.5 text-[18px]">
              <span>{slide?.days}</span>
              <span>{t('tourCard.days')}</span>
            </p>
            <p className="flex items-center justify-start gap-1.5 text-[18px]">
              <span className="text-[#464646]">{t('tourCard.from')}</span>
              <span className="font-semibold text-[24px]">
                {slide?.valute ?? '$'} {slide?.price}
              </span>
            </p>
          </div>
          <button className="bg-[#27A430] px-[15px] py-[12px] text-white text-[14px] rounded-[16px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)] text-base">
            {t('View_itinerary')}
          </button>
        </div>
      </div>
    </Link>
  );
};
