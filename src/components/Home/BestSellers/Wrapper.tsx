'use client';
import { useGetQuery } from '@/api/get.api';
import { BestSellersPackagesCard, Slider, SliderBtns } from '@/components/UI';
import { BestSellersPackagesCardType } from '@/components/UI/BestSellersPackagesCard/_types';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { SwiperClass } from 'swiper/react';

export const Wrapper = () => {
  const t = useTranslations();
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const handleSlideChange = (swiper: SwiperClass): void => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const { data, isSuccess } = useGetQuery({
    key: ['tours'],
    page: '',
    perPage: '',
    url: 'tours',
    searchItem: '',
    additionalParam: '&main_page=1',
  });
  return (
    <>
      <div className="min-h-[520px] [@media(max-width:1024px)]:min-h-[450px] [@media(max-width:450px)]:min-h-[350px]">
        {isSuccess && (
          <Slider
            slides={data}
            swiperRef={swiperRef}
            isBeginning={isBeginning}
            isEnd={isEnd}
            setIsBeginning={setIsBeginning}
            setIsEnd={setIsEnd}
            handleSlideChange={handleSlideChange}
            renderCard={(slide: BestSellersPackagesCardType) => (
              <BestSellersPackagesCard slide={slide} />
            )}
          />
        )}
      </div>
      <div className="w-full flex items-center justify-between">
        <Link
          href="/tours"
          className="w-full max-w-[209px] text-center bg-[#16372D] text-white py-[15px] rounded-[16px] text-[16px] shadow-2xl hover:bg-[#194D3D] transition-all active:bg-[#16372D] [@media(max-width:1024px)]:max-w-[150px] [@media(max-width:550px)]:py-[8px]"
        >
          {t('best_sellers_btns')}
        </Link>
        <SliderBtns
          swiperRef={swiperRef}
          isBeginning={isBeginning}
          isEnd={isEnd}
          variant={'primary'}
        />
      </div>
    </>
  );
};
