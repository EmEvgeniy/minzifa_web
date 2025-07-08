'use client';

import Image from 'next/image';
import { TourImage } from '../_types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom } from 'swiper/modules';
import 'swiper/css';
import { useRef } from 'react';
import { useGalleryStore } from './store';

type GallerySliderProps = {
  images: TourImage[];
  tourName: string | undefined;
};

export default function GallerySlider({ images }: GallerySliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setShow, show } = useGalleryStore((s) => s);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setShow(false);
    }
  };

  return (
    show && (
      <div
        onClick={handleClickOutside}
        className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center"
      >
        <div ref={containerRef} className="w-full container">
          <Swiper
            zoom={true}
            navigation={true}
            pagination={{ clickable: true }}
            slidesPerView={1}
            loop={true}
            modules={[Zoom, Navigation, Pagination]}
          >
            {images.map((image: TourImage, i) => (
              <SwiperSlide key={i} className="flex items-center justify-center">
                <div className="max-w-[800px] max-h-[600px] mx-auto overflow-hidden rounded-lg">
                  <Image
                    width={800}
                    height={460}
                    loading="lazy"
                    quality={100}
                    src={image?.file}
                    alt={image?.alt_text || ''}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    )
  );
}
