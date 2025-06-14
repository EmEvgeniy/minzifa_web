'use client';
import { car, guide, heart, location } from '@/assets/icons';
import { Slider, SliderBtns } from '@/components/UI';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { SwiperClass } from 'swiper/react';

interface DataInterface {
  title: string;
  text: string;
}

export const MobileSlider = () => {
  const t = useTranslations('eco');
  const block = t.raw('environment.block') as { title: string; text: string }[];
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const handleSlideChange = (swiper: SwiperClass): void => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="w-full hidden max-[500px]:block">
      {
        <div className="container-right">
          <Slider
            slides={block || []}
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
            renderCard={(el: DataInterface, i) => (
              <div
                key={i}
                className="bg-[#FFFFFFCC] opacity-80 backdrop-blur-[6px] w-full h-full min-h-[300px] rounded-[16px] shadow-2xl p-5 flex flex-col items-center gap-2 text-[#16372D] text-center"
              >
                <Image
                  src={i == 0 ? car : i == 1 ? heart : i == 2 ? guide : location}
                  alt="icon2"
                  width={50}
                  height={50}
                  className="w-[30px] h-[30px] "
                />
                <p className="text-[18px]">{el.title}</p>
                <p className="text-[14px]">{el.text}</p>
              </div>
            )}
          />

          <SliderBtns
            swiperRef={swiperRef}
            isBeginning={isBeginning}
            isEnd={isEnd}
            variant={'secondary'}
          />
        </div>
      }
    </div>
  );
};
