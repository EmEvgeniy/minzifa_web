'use client';

import { circle1, circle3, circle4, circle5 } from '@/assets/img';
import { EmblaCarousel } from '@/components/UI/EmblaCarousel';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { EmblaCarouselType } from 'embla-carousel';
import { ECArrowWrapper } from '@/components/UI/EmblaCarousel/EmblaCarouselArrowButtons';

interface DataInterface {
  title: string;
  text: string;
}

const imgs = [circle1, circle3, circle4, circle5];

export default function MobileSliderEmbla() {
  const t = useTranslations();
  const data = t.raw('eco.block') as DataInterface[];

  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);

  return (
    <div className="container max-[768px]:block hidden">
      <div className="container-right">
        <EmblaCarousel
          slides={data}
          onInit={setEmblaApi}
          renderSlide={(el: DataInterface, i) => (
            <div
              className="w-full bg-[#16372D] text-white py-5 px-3 rounded-[16px] min-h-[285px] h-[330px] flex flex-col items-center justify-start gap-3 text-center"
              key={i}
            >
              {imgs[i] && (
                <ImageWithFallback src={imgs[i]} key={i} width={150} height={150} alt="circle" />
              )}
              <h2 className="text-[16px] mt-4 py-2">{el.title}</h2>
              <div className="text-[14px]">{el.text}</div>
            </div>
          )}
        />

        <ECArrowWrapper emblaApi={emblaApi} />

        {/* <div className="flex justify-end mt-4">
          <PrevButton onClick={scrollPrev} disabled={!canScrollPrev} />
          <NextButton onClick={scrollNext} disabled={!canScrollNext} />
        </div> */}
      </div>
    </div>
  );
}
