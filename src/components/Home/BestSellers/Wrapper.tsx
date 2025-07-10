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
}
