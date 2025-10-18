'use client';

import { useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import { EmblaCarousel } from '@/components/UI/EmblaCarousel';
import { circle, circle2 } from '@/assets/img';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { ECArrowWrapper } from '@/components/UI/EmblaCarousel/EmblaCarouselArrowButtons';

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
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);

  return (
    <div className="hidden max-[550px]:block">
      <div className="container-right pt-[30px]">
        <EmblaCarousel
          slides={values}
          onInit={setEmblaApi}
          className="gap-5"
          renderSlide={(el, id) =>
            [2, 4].includes(id) ? (
              <div
                className="flex aspect-square flex-[0_0_80%] h-[300px] w-full items-center justify-center overflow-hidden"
                key={id}
              >
                <ImageWithFallback
                  src={id === 2 ? circle : circle2}
                  className="aspect-square rounded-full object-cover h-[300px] w-[300px]"
                  width={300}
                  height={300}
                  loading="lazy"
                  alt="text"
                />
              </div>
            ) : (
              <div
                key={id}
                className="flex-[0_0_80%] bg-[rgba(216,218,220,.9)] rounded-[16px] backdrop-blur-[16px] flex flex-col h-[300px] px-4 py-5 text-[#16372D]"
              >
                <span className="text-custom-green-900 text-[20px] font-semibold">{el.title}</span>
                <span className="text-custom-green-900 mt-4 flex text-[16px]">{el.text}</span>
              </div>
            )
          }
        />

        <ECArrowWrapper emblaApi={emblaApi} />

        {/* <div className="flex justify-end mt-4 gap-3">
          <PrevButton onClick={onPrevButtonClick} disabled={!prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={!nextBtnDisabled} />
        </div> */}
      </div>
    </div>
  );
}
