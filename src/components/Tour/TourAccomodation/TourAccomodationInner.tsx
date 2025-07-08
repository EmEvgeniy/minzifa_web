'use client';
import { useRef, useState } from 'react';
import { Hotel } from '../_types';
import { SwiperClass } from 'swiper/react';
import { Slider, SliderBtns } from '@/components/UI';
import { AccomodationCard } from '@/components/UI/AccomodationCard/AccomodationCard';
import { AccordionCardModal } from '@/components/UI/AccordionCardModal/AccordionCardModal';

function TourAccomodationInner({ hotels }: { hotels: Hotel[] }) {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const handleSlideChange = (swiper: SwiperClass): void => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };
  return (
    <>
      <Slider
        slides={hotels}
        swiperRef={swiperRef}
        isBeginning={isBeginning}
        isEnd={isEnd}
        setIsBeginning={setIsBeginning}
        setIsEnd={setIsEnd}
        handleSlideChange={handleSlideChange}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 16 },
          550: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        renderCard={(hotel: Hotel) => (
          <AccomodationCard
            hotel={hotel}
            openModal={openModal}
            setOpenModal={setOpenModal}
            setSelectedHotel={setSelectedHotel}
          />
        )}
      />

      <AccordionCardModal hotel={selectedHotel} openModal={openModal} setOpenModal={setOpenModal} />

      <SliderBtns
        swiperRef={swiperRef}
        isBeginning={isBeginning}
        isEnd={isEnd}
        variant={'secondary'}
      />
    </>
  );
}

export default TourAccomodationInner;
