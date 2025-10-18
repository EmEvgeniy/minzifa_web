'use client';

import { useState } from 'react';
import { Hotel } from '../_types';
import { AccomodationCard } from '@/components/UI/AccomodationCard/AccomodationCard';
import { AccordionCardModal } from '@/components/UI/AccordionCardModal/AccordionCardModal';
import { EmblaCarouselType } from 'embla-carousel';
import { EmblaCarousel } from '@/components/UI/EmblaCarousel';
import { ECArrowWrapper } from '@/components/UI/EmblaCarousel/EmblaCarouselArrowButtons';

function TourAccomodationInnerEmbla({ hotels }: { hotels: Hotel[] }) {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);

  return (
    <div className="max-w-[720px]">
      {hotels.length > 2 ? (
        <>
          <EmblaCarousel<Hotel>
            slides={hotels}
            onInit={setEmblaApi}
            className="gap-4 "
            renderSlide={(hotel: Hotel) => (
              <AccomodationCard
                key={hotel.id}
                hotel={hotel}
                openModal={openModal}
                setOpenModal={setOpenModal}
                setSelectedHotel={setSelectedHotel}
              />
            )}
          />

          <ECArrowWrapper emblaApi={emblaApi} />
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hotels.map((hotel) => (
            <AccomodationCard
              key={hotel.id}
              hotel={hotel}
              openModal={openModal}
              setOpenModal={setOpenModal}
              setSelectedHotel={setSelectedHotel}
            />
          ))}
        </div>
      )}

      <AccordionCardModal hotel={selectedHotel} openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}

export default TourAccomodationInnerEmbla;
