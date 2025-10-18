'use client';

import { economy_1, economy_2 } from '@/assets/img';
import { EmblaCarousel } from '@/components/UI/EmblaCarousel';
import { ECArrowWrapper } from '@/components/UI/EmblaCarousel/EmblaCarouselArrowButtons';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { EmblaCarouselType } from 'embla-carousel';
import { useState } from 'react';

export default function MobileSlider({
  block,
}: {
  block: { title: string; text: string; img: string }[];
}) {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);

  return (
    <div className="w-full hidden max-[1024px]:block">
      <div className="container-right pt-[30px]">
        <EmblaCarousel
          slides={block}
          onInit={setEmblaApi}
          renderSlide={(el, i) => (
            <div className="w-full h-full grid grid-cols-1 items-center justify-items-center min-h-[255px]">
              {el.img === 'true' ? (
                <div className="grid grid-cols-1 items-center w-full h-full justify-items-center min-h-[285px]">
                  <ImageWithFallback
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

        <ECArrowWrapper emblaApi={emblaApi} />
      </div>
    </div>
  );
}
