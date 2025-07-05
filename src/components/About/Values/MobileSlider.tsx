'use client';
import { circle, circle2 } from '@/assets/img';
import { Slider, SliderBtns } from '@/components/UI';
import { useRef, useState } from 'react';
import { SwiperClass } from 'swiper/react';
import Image from 'next/image';

type Props = {
  values: {
    title: string;
    text: string;
    img: string;
    circle: string;
    circle2: string;
  }[];
};

export default function MobileSlider({ values }: Props) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const handleSlideChange = (swiper: SwiperClass): void => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="hidden max-[550px]:block">
      {
        <div className="container-right pt-[30px]">
          <Slider
            slides={values || []}
            swiperRef={swiperRef}
            isBeginning={isBeginning}
            isEnd={isEnd}
            setIsBeginning={setIsBeginning}
            setIsEnd={setIsEnd}
            handleSlideChange={handleSlideChange}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 16 },
              550: { slidesPerView: 1 },
              768: { slidesPerView: 3.2 },
              1024: { slidesPerView: 4.4 },
            }}
            renderCard={(el, id) =>
              [2, 4].includes(id) ? (
                <div
                  className="flex aspect-square h-[300px] w-full  items-center justify-center overflow-hidden"
                  key={id}
                >
                  <Image
                    src={id === 2 ? circle : circle2}
                    className="aspect-square  rounded-full object-cover h-[300px] w-[300px]"
                    width={0}
                    height={0}
                    loading="lazy"
                    alt="text"
                  />
                </div>
              ) : (
                <div
                  key={id}
                  className="bg-[rgba(216,218,220,.9)] rounded-[16px] backdrop-blur-[16px] flex h-[285px] flex-col justify-between px-4 py-5 text-[#16372D]"
                >
                  <span className="text-custom-green-900 text-[20px] font-semibold">
                    {el.title}
                  </span>

                  <span className="text-custom-green-900 mt-4 flex text-[16px]">{el.text}</span>
                </div>
              )
            }
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
}
