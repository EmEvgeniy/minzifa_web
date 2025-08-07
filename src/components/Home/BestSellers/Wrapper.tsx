'use client';

import { Slider, SliderBtns } from '@/components/UI';
import { BestSellersPackagesCardType } from '@/components/UI/BestSellersPackagesCard/_types';
import BestSellersPackagesCard from '@/components/UI/BestSellersPackagesCard/BestSellersPackagesCard';
import { ReactNode, useRef, useState } from 'react';
import { SwiperClass } from 'swiper/react';

type Props = {
  days: string;
  from: string;
  location: string;
  view_itinerary: string;
  byRequest: string;
  data: BestSellersPackagesCardType[];
  btn: ReactNode;
  locale: string;
};

export default function Wrapper({
  data,
  btn,
  locale,
  days,
  from,
  byRequest,
  view_itinerary,
}: Props) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const handleSlideChange = (swiper: SwiperClass): void => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full">
        {data?.length > 0 && (
          <Slider
            slides={data}
            swiperRef={swiperRef}
            isBeginning={isBeginning}
            isEnd={isEnd}
            setIsBeginning={setIsBeginning}
            setIsEnd={setIsEnd}
            handleSlideChange={handleSlideChange}
            renderCard={(slide: BestSellersPackagesCardType) => (
              <BestSellersPackagesCard
                slide={slide}
                locale={locale}
                days={days}
                from={from}
                byRequest={byRequest}
                view_itinerary={view_itinerary}
              />
            )}
          />
        )}
      </div>
      <div className="w-full flex flex-wrap items-center justify-between gap-3">
        <div className="flex-shrink">{btn}</div>
        <div className="flex-shrink">
          <SliderBtns
            swiperRef={swiperRef}
            isBeginning={isBeginning}
            isEnd={isEnd}
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
}
