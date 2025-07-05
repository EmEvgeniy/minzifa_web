'use client';

import { ArticleCard, Slider, SliderBtns } from '@/components/UI';
import { ArticleCardType } from '@/components/UI/ArticleCard/_types';
import { ReactNode, useRef, useState } from 'react';
import { SwiperClass } from 'swiper/react';

interface DataResponse {
  data: ArticleCardType[];
  btn: ReactNode;
}

export default function WrapperMobile({ data, btn }: DataResponse) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const handleSlideChange = (swiper: SwiperClass): void => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="w-full hidden [@media(max-width:768px)]:block">
      <Slider
        slides={data || []}
        swiperRef={swiperRef}
        isBeginning={isBeginning}
        isEnd={isEnd}
        setIsBeginning={setIsBeginning}
        setIsEnd={setIsEnd}
        handleSlideChange={handleSlideChange}
        breakpoints={{
          320: { slidesPerView: 1.2, spaceBetween: 16 },
          550: { slidesPerView: 2.2 },
          768: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4.4 },
        }}
        renderCard={(slide: ArticleCardType) => <ArticleCard key={slide.id} article={slide} />}
      />

      <div className="flex items-center w-full justify-between gap-5">
        {btn}
        <SliderBtns
          swiperRef={swiperRef}
          isBeginning={isBeginning}
          isEnd={isEnd}
          variant={'primary'}
        />
      </div>
    </div>
  );
}
