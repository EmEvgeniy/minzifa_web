import type { SwiperClass } from "swiper/react";

export type SliderBtnsProps = {
  swiperRef: React.RefObject<SwiperClass | null>;
  isBeginning: boolean;
  isEnd: boolean;
  variant?: "primary" | "secondary"; // или любые варианты, что у тебя есть
};
