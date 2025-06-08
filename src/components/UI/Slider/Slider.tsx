'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import type { SliderType } from './_types';

export const Slider = <T,>({
  slides,
  renderCard,
  swiperRef,
  setIsBeginning,
  handleSlideChange,
  setIsEnd,
  breakpoints,
}: SliderType<T>) => {
  return (
    <div className="relative w-full overflow-visible pb-[30px]">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={handleSlideChange}
        pagination={false}
        centeredSlides={false}
        spaceBetween={30}
        breakpoints={
          breakpoints || {
            320: { slidesPerView: 1.1, spaceBetween: 16 },
            550: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.3 },
          }
        }
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>{renderCard(slide, i)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
