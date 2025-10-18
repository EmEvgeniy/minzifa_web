'use client';

import { ArticleCardType } from '@/components/UI/ArticleCard/_types';
import ArticleCard from '@/components/UI/ArticleCard/ArticleCard';
import { ReactNode, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import EmblaCarousel from '@/components/UI/EmblaCarousel/EmblaCarousel';
import { ECArrowWrapper } from '@/components/UI/EmblaCarousel/EmblaCarouselArrowButtons';

interface DataResponse {
  data: ArticleCardType[];
  btn: ReactNode;
  locale: string;
}

export default function WrapperMobileEmbla({ data, btn, locale }: DataResponse) {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);

  return (
    <div className="w-full hidden [@media(max-width:768px)]:block">
      <EmblaCarousel<ArticleCardType>
        slides={data}
        onInit={setEmblaApi}
        renderSlide={(slide: ArticleCardType) => (
          <div key={slide.id} className='flex-[0_0_80%]'>
            <ArticleCard article={slide} locale={locale} />
          </div>
        )}
        className="gap-5"
      />

      <div className="w-full flex flex-wrap items-center justify-between gap-3 mt-5">
        <div className="flex-shrink">{btn}</div>
        <ECArrowWrapper emblaApi={emblaApi} variant='dark' />
      </div>
    </div>
  );
}
