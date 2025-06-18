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
    <div className="w-full overflow-visible mb-5">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={handleSlideChange}
        pagination={false}
        centeredSlides={false}
        spaceBetween={20}
        breakpoints={
          breakpoints || {
            320: { slidesPerView: 1.2, spaceBetween: 16 },
            550: { slidesPerView: 2 },
            920: { slidesPerView: 3 },
            1200: { slidesPerView: 3.5 },
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
