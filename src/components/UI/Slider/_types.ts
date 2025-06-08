import type { RefObject } from "react";
import type SwiperClass from "swiper";
import type { SwiperOptions } from "swiper/types";

interface SliderControls {
  swiperRef: RefObject<SwiperClass | null>;
  isBeginning: boolean;
  isEnd: boolean;
  breakpoints?: {
    [width: number]: SwiperOptions;
    [ratio: string]: SwiperOptions;
  };
  setIsBeginning: (arg: boolean) => void;
  setIsEnd: (arg: boolean) => void;
  handleSlideChange: (swiper: SwiperClass) => void;
}

export interface SliderType<T> extends SliderControls {
  variant?: "primary" | "secondary";
  slides: T[];
  renderCard: (slide: T, index: number) => React.ReactNode;
}
