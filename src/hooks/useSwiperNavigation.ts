// hooks/useSwiperNavigation.ts
import { useEffect } from 'react';
import { SwiperRef } from 'swiper/react';

export default function useSwiperNavigation(
  swiperRef: React.RefObject<SwiperRef | null>,
  prevRef: React.RefObject<HTMLButtonElement | null>,
  nextRef: React.RefObject<HTMLButtonElement | null>,
) {
  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    const prevEl = prevRef.current;
    const nextEl = nextRef.current;

    if (
      swiper &&
      prevEl &&
      nextEl &&
      swiper.params.navigation &&
      typeof swiper.params.navigation !== 'boolean'
    ) {
      swiper.params.navigation.prevEl = prevEl;
      swiper.params.navigation.nextEl = nextEl;

      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiperRef, prevRef, nextRef]);
}
