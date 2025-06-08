'use client';
import { useGetQuery } from '@/api/get.api';
import { Slider, SliderBtns } from '@/components/UI';
import React, { useRef, useState } from 'react';
import { SwiperClass } from 'swiper/react';
import { DestinationBlockProps } from './_types';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Image from 'next/image';

export const Wrapper = () => {
  const locale = useLocale();
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const handleSlideChange = (swiper: SwiperClass): void => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const { data, isLoading } = useGetQuery({
    key: ['destinations'],
    page: '',
    perPage: '',
    url: 'destinations',
    searchItem: '',
    additionalParam: '&main_page=1',
  });

  return (
    <>
      {isLoading ? (
        <div className="min-h-[420px] h-full"></div>
      ) : (
        data?.length > 0 && (
          <div className="container-right">
            <Slider
              slides={data}
              swiperRef={swiperRef}
              isBeginning={isBeginning}
              isEnd={isEnd}
              setIsBeginning={setIsBeginning}
              setIsEnd={setIsEnd}
              handleSlideChange={handleSlideChange}
              breakpoints={{
                320: { slidesPerView: 2.2, spaceBetween: 16 },
                550: { slidesPerView: 2.2 },
                768: { slidesPerView: 2.2 },
                1024: { slidesPerView: 4.4 },
              }}
              renderCard={(slide: DestinationBlockProps) => (
                <Link href={`/${locale}/${slide.slug}`}>
                  <div className="w-full h-full max-w-[275px] min-h-[275px] rounded-[16px] bg-white opacity-80 flex flex-col items-center justify-center text-xl font-semibold">
                    <Image
                      src={slide.icon.file || ''}
                      alt={slide.icon.alt_text}
                      width={150}
                      height={150}
                      className="w-[150px] h-[150px] object-cover"
                    />
                    <h2 className="text-2xl font-normal">{slide?.name}</h2>
                    <div className="text-base font-normal">{slide?.tours_count} tours</div>
                  </div>
                </Link>
              )}
            />

            <SliderBtns
              swiperRef={swiperRef}
              isBeginning={isBeginning}
              isEnd={isEnd}
              variant={'secondary'}
            />
          </div>
        )
      )}
    </>
  );
};
