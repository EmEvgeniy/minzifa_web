'use client';

import { Hotel } from '@/components/Tour/_types';
import { useTranslations } from 'next-intl';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';

interface AccomodationCardProps {
  hotel: Hotel;
  openModal: boolean;
  setOpenModal: (show: boolean) => void;
  setSelectedHotel: (hotel: Hotel | null) => void;
}

export const AccomodationCard = ({
  hotel,
  openModal,
  setOpenModal,
  setSelectedHotel,
}: AccomodationCardProps) => {
  const t = useTranslations('Tour');

  return (
    <div
      onClick={() => {
        setOpenModal(!openModal);
        setSelectedHotel(hotel);
      }}
      className="flex-[0_0_80%] md:flex-[0_0_50%] md:max-w-[350px] w-full h-full rounded-2xl bg-white overflow-hidden"
    >
      <div className="flex flex-col">
        {hotel.gallery.length > 0 && (
          <div className="w-full h-full aspect-[4/3]">
            <ImageWithFallback
              src={hotel.gallery[0].file ? hotel.gallery[0].file : ''}
              alt={hotel.gallery[0].alt_text ? hotel.gallery[0].alt_text : 'image'}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4 flex flex-col gap-3">
          <h2 className="text-xl font-normal truncate">{hotel?.name}</h2>
          <hr className="border-black/10" />
          <div className="grid grid-cols-2 gap-5">

            <div className="flex flex-col gap-1 text-sm col-span-2">
              {t('hotel.card.location')}
              <div className="flex flex-row gap-2 items-center text-sm font-normal">
                <svg
                  width="15"
                  height="20"
                  viewBox="0 0 15 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0.5C9.36722 0.5 11.1514 1.19286 12.4619 2.41602C13.7713 3.63809 14.5 5.28766 14.5 7C14.5 8.20409 14.0661 9.59345 13.377 11.0293C12.6912 12.4579 11.7722 13.8928 10.8447 15.1758C9.91844 16.4572 8.99126 17.5781 8.29492 18.3789C7.97238 18.7498 7.69908 19.0511 7.5 19.2676C7.30092 19.0511 7.02762 18.7498 6.70508 18.3789C6.00874 17.5781 5.08156 16.4572 4.15527 15.1758C3.2278 13.8928 2.30879 12.4579 1.62305 11.0293C0.933861 9.59345 0.5 8.20409 0.5 7C0.5 5.39467 1.13989 3.8439 2.29883 2.64941L2.53809 2.41602C3.84861 1.19286 5.63278 0.5 7.5 0.5ZM7.5 4C6.77165 4 6.06429 4.23574 5.49805 4.66895L5.26465 4.86719C4.66536 5.42669 4.32129 6.19293 4.32129 7C4.32129 7.75682 4.62346 8.47815 5.15527 9.02637L5.26465 9.13281C5.86297 9.69125 6.6677 10 7.5 10C7.80953 10 8.11704 9.95681 8.41309 9.87305L8.70508 9.77637C9.08816 9.62827 9.4388 9.40959 9.73535 9.13281C9.99481 8.89059 10.2088 8.60736 10.3672 8.29492L10.4316 8.15918C10.5942 7.79279 10.6787 7.39884 10.6787 7C10.6787 6.24318 10.3765 5.52185 9.84473 4.97363L9.73535 4.86719C9.13703 4.30875 8.33231 4 7.5 4Z"
                    stroke="#111111"
                  />
                </svg>
                {hotel?.country}, {hotel?.city}
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              {t('hotel.card.category')}
              <div className="flex flex-row gap-2 items-center text-sm font-normal">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.60826 4.9698C8.19821 3.49905 8.49319 2.76367 9.00044 2.76367C9.50768 2.76367 9.80266 3.49905 10.3926 4.9698L10.4201 5.03828C10.7534 5.86918 10.92 6.28463 11.2597 6.53715C11.5993 6.78967 12.0451 6.8296 12.9368 6.90945L13.098 6.92389C14.5574 7.05459 15.2871 7.11994 15.4432 7.58417C15.5993 8.04841 15.0574 8.54142 13.9737 9.52743L13.612 9.85652C13.0633 10.3557 12.789 10.6052 12.6612 10.9323C12.6373 10.9933 12.6175 11.0558 12.6018 11.1195C12.5178 11.4605 12.5981 11.8225 12.7587 12.5466L12.8088 12.772C13.104 14.1027 13.2516 14.7681 12.9939 15.0551C12.8976 15.1624 12.7724 15.2396 12.6333 15.2775C12.2612 15.3791 11.7328 14.9485 10.6761 14.0875C9.98221 13.5221 9.63527 13.2393 9.23694 13.1757C9.08026 13.1507 8.92061 13.1507 8.76393 13.1757C8.3656 13.2393 8.01866 13.5221 7.32478 14.0875C6.26807 14.9485 5.73971 15.3791 5.36756 15.2775C5.2285 15.2396 5.10331 15.1624 5.007 15.0551C4.74924 14.7681 4.89686 14.1027 5.19212 12.772L5.24213 12.5466C5.40278 11.8225 5.48311 11.4605 5.39907 11.1195C5.38339 11.0558 5.36357 10.9933 5.33972 10.9323C5.21186 10.6052 4.93755 10.3557 4.38892 9.85652L4.02721 9.52743C2.94342 8.54142 2.40153 8.04841 2.55767 7.58417C2.7138 7.11994 3.44348 7.05459 4.90284 6.92389L5.06404 6.90945C5.95573 6.8296 6.40157 6.78967 6.74121 6.53715C7.08085 6.28463 7.2475 5.86918 7.58079 5.03828L7.60826 4.9698Z"
                    stroke="#16372D"
                  />
                </svg>
                {hotel.hotel_type}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
