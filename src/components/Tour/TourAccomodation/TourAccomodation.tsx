'use client';
import { useTranslations } from "next-intl";
import { Hotel } from "../_types"
import { Slider, SliderBtns } from "@/components/UI";
import { useRef, useState } from "react";
import { SwiperClass } from "swiper/react";
import { AccomodationCard } from "@/components/UI/AccomodationCard/AccomodationCard";
import { AccordionCardModal } from "@/components/UI/AccordionCardModal/AccordionCardModal";

export const TourAccomodation = ({ hotels }: { hotels: Hotel[] | undefined }) => {
    const t = useTranslations("Tour");

    const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const swiperRef = useRef<SwiperClass | null>(null);
    const [isBeginning, setIsBeginning] = useState<boolean>(true);
    const [isEnd, setIsEnd] = useState<boolean>(false);

    const handleSlideChange = (swiper: SwiperClass): void => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    if (!hotels || hotels.length === 0) {
        return null;
    }

    return (
        <div className="col-span-2 w-full z-40 flex flex-col">
            <h2 className="text-4xl font-semibold text-black mb-5">{t('hotel.title')}</h2>

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
                renderCard={(hotel: Hotel) => <AccomodationCard hotel={hotel} openModal={openModal} setOpenModal={setOpenModal} setSelectedHotel={setSelectedHotel} />}
            />

            <AccordionCardModal
                hotel={selectedHotel}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />

            <SliderBtns
                swiperRef={swiperRef}
                isBeginning={isBeginning}
                isEnd={isEnd}
                variant={'secondary'}
            />
        </div>
    )
}