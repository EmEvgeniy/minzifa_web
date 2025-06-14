'use client';
import { circle1, circle3, circle4, circle5 } from '@/assets/img';
import { Slider, SliderBtns } from '@/components/UI';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { SwiperClass } from 'swiper/react';

interface DataInterface {
  title: string;
  text: string;
}

const imgs = [circle1, circle3, circle4, circle5];

export const MobileSlider = () => {
  const t = useTranslations();
  const data = t.raw('eco.block') as DataInterface[];
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const handleSlideChange = (swiper: SwiperClass): void => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };
  return (
    <div className="container max-[768px]:block hidden">
      {
        <div className="container-right">
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
            renderCard={(el: DataInterface, i) => (
              <div
                className="w-full bg-[#16372D] text-white py-5 px-3  rounded-[16px] min-h-[285px] h-[330px] flex flex-col items-center justify-start gap-3  text-center "
                key={i}
              >
                {imgs[i] && <Image src={imgs[i]} key={i} width={150} height={150} alt="circle" />}
                <h2 className="text-[16px] mt-4 py-2">{el.title}</h2>
                <div className="text-[14px]">{el.text}</div>
              </div>
            )}
          />

          <SliderBtns
            swiperRef={swiperRef}
            isBeginning={isBeginning}
            isEnd={isEnd}
            variant={'primary'}
          />
        </div>
      }
    </div>
  );
};
