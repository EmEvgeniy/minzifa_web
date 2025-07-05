'use client';
import { economy_1, economy_2 } from '@/assets/img';
import { Slider, SliderBtns } from '@/components/UI';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { SwiperClass } from 'swiper/react';

export default function MobileSlider({
  block,
}: {
  block: { title: string; text: string; img: string }[];
}) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const handleSlideChange = (swiper: SwiperClass): void => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="w-full hidden max-[1024px]:block">
      {
        <div className="container-right pt-[30px]">
          <Slider
            slides={block || []}
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
            renderCard={(el, i) => (
              <div className="w-full h-full gird grid-cols-1 items-center justify-items-center min-h-[255px]">
                {el.img === 'true' ? (
                  <div className="grid grid-cols-1 items-center w-full h-full justify-items-center min-h-[285px]">
                    <Image
                      src={i == 2 ? economy_1 : economy_2}
                      alt="child"
                      width={0}
                      height={0}
                      loading="lazy"
                      key={i}
                      className="object-cover rounded-full w-[250px] h-[250px]"
                    />
                  </div>
                ) : (
                  <div
                    key={i}
                    className="bg-white rounded-[16px] opacity-80 text-[#16372D] min-h-[285px] w-full p-3 grid grid-rows-2 backdrop-blur-[16px]"
                  >
                    <p className="text-[18px] font-semibold">{el.title}</p>
                    <p className="text-[16px]">{el.text}</p>
                  </div>
                )}
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
}
