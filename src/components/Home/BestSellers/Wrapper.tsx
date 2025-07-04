'use client';
import { BestSellersPackagesCard, Slider, SliderBtns } from '@/components/UI';
import { BestSellersPackagesCardType } from '@/components/UI/BestSellersPackagesCard/_types';
import React, { ReactNode, useRef, useState } from 'react';
import { SwiperClass } from 'swiper/react';

export const Wrapper = ({ data, btn }: { data: BestSellersPackagesCardType[]; btn: ReactNode }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const handleSlideChange = (swiper: SwiperClass): void => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <>
      <div className="min-h-[520px] [@media(max-width:1024px)]:min-h-[450px] [@media(max-width:450px)]:min-h-[350px]">
        {data?.length && (
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
        {btn}
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
