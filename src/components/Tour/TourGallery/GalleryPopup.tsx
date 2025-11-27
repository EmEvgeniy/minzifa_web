'use client';

import { TourImage } from '../_types';
import { useState } from 'react';
import EmblaCarousel from '@/components/UI/EmblaCarousel/EmblaCarousel';
import { NextButton, PrevButton } from '@/components/UI/EmblaCarousel';
import { EmblaCarouselType } from 'embla-carousel';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { Popup } from '@/components/UI';

import { usePrevNextButtons } from '@/components/UI/EmblaCarousel/usePrevNextButtons';
import { ECDotsWrapper } from '@/components/UI/EmblaCarousel/EmblaCarouselDotButton';
import { FaTimes } from 'react-icons/fa';

type GallerySliderEmblaProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  images: TourImage[];
};

export default function GalleryPopup({ show, setShow, images }: GallerySliderEmblaProps) {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <Popup
      open={show}
      handleCloseAction={() => setShow(false)}
      className="mt-[100px]"
      hasBackground={false}
      timesButton={
        <div className={'relative text-right'}>
          <button onClick={() => setShow(false)} className="text-2xl text-white cursor-pointer">
            <FaTimes />
          </button>
        </div>
      }
      content={
        <div className='container'>
          <EmblaCarousel<TourImage>
            slides={images}
            onInit={setEmblaApi}
            className="gap-5"
            options={{
              loop: true,
            }}
            renderSlide={(image: TourImage) => (
              <div key={image.id} className="flex-[0_0_100%]">
                <ImageWithFallback
                  width={800}
                  height={600}
                  src={image?.file}
                  alt={image?.alt_text || ''}
                  className="w-full h-full max-w-[800px] max-h-[600px] mx-auto rounded-2xl"
                />
              </div>
            )}
          />

          <ECDotsWrapper emblaApi={emblaApi} />

          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            className="absolute top-1/2 left-0 text-xl"
            variant='dark'
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            className="absolute top-1/2 right-0 text-xl"
            variant='dark'
          />
        </div>
      }
    />
  );
}
