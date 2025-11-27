'use client';

import { car, guide, heart, location } from '@/assets/icons';
import { useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import { EmblaCarousel } from '@/components/UI/EmblaCarousel';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { ECArrowWrapper } from '@/components/UI/EmblaCarousel/EmblaCarouselArrowButtons';

interface DataInterface {
  title: string;
  text: string;
}

export default function MobileSlider({ block }: { block: DataInterface[] }) {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);
  return (
    <div className="w-full hidden max-[500px]:block">
      <div>
        <EmblaCarousel
          slides={block}
          onInit={setEmblaApi}
          renderSlide={(el: DataInterface, i) => (
            <div
              key={i}
              className="flex-[0_0_100%] w-full h-full bg-[#FFFFFFCC] opacity-80 backdrop-blur-[6px] rounded-[16px] shadow-2xl p-5 flex flex-col items-center gap-2 text-[#16372D] text-center"
            >
              <ImageWithFallback
                src={i == 0 ? car : i == 1 ? heart : i == 2 ? guide : location}
                alt="icon2"
                width={50}
                height={50}
                className="w-[30px] h-[30px] object-contain"
              />
              <p className="text-[18px]">{el.title}</p>
              <p className="text-[14px]">{el.text}</p>
            </div>
          )}
        />

        <ECArrowWrapper emblaApi={emblaApi} />
      </div>
    </div>
  );
}
