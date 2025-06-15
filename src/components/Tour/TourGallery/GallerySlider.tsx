'use client';

import Image from 'next/image';
import { TourImage } from '../_types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom } from 'swiper/modules';
import 'swiper/css';
import React, { useRef } from 'react';

type GallerySliderProps = {
  images: TourImage[];
  tourName: string | undefined;
  showGallery: boolean;
  setShowGallery: (show: boolean) => void;
};

export const GallerySlider = ({ images, showGallery, setShowGallery }: GallerySliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setShowGallery(false);
    }
  };

  return (
    showGallery && (
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
            {images.map((image: TourImage) => (
              <SwiperSlide key={image.id} className="flex items-center justify-center">
                <div className="max-w-[800px] max-h-[600px] mx-auto overflow-hidden rounded-lg">
                  <Image
                    width={800}
                    height={460}
                    loading="lazy"
                    quality={100}
                    src={image.file}
                    alt={image.alt_text}
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
};
