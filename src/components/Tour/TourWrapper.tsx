'use client';
import { useGetQuery } from '@/api/get.api';
import React, { useEffect } from 'react';
import { Breadcrumbs } from '../UI/Breadcrumbs/Breadcrumbs';
import { TourTitle } from './TourTitle/TourTitle';
import { redirect, useParams } from 'next/navigation';
import { Tour } from './_types';
import { useLocale } from 'next-intl';
import { TourGallery } from './TourGallery/TourGallery';
import { TourFacts } from './TourFacts/TourFacts';
import { TourDescription } from './TourDescription/TourDescription';
import { TourHighlights } from './TourHighlights/TourHighlights';
import { TourItinerary } from './TourItinerary/TourItinerary';
import { FreeConsultationForm } from '../UI/FreeConsultationForm/FreeConsultationForm';
import { TourBooking } from './TourBooking/TourBooking';
import { TourIncludes } from './TourIncludes/TourIncludes';
import { TourAccomodation } from './TourAccomodation/TourAccomodation';
import { TourPrices } from './TourPrices/TourPrices';
import { Reviews } from '../UI/Reviews/Reviews';
import { useBookingStore } from '@/store/bookingStore';
import Loader from '../UI/Loader/Loader';
import { MobileBtn } from './MobileBtn';
import { CreateYourTripForm } from '../UI/CreateYourTripForm/CreateYourTripForm';
import { ConsultationQuiz } from '../UI/ConsultationQuiz/ConsultationQuiz';

export const TourWrapper = () => {
  const locale = useLocale();
  const params = useParams();

  const { tour, setTour } = useBookingStore((state) => state);

  const { data, isLoading, isSuccess, error } = useGetQuery<Tour>({
    key: [`tour_${params.tour}`],
    page: '',
    perPage: '',
    url: `tours/${params.tour}`,
    searchItem: '',
    additionalParam: '',
  });

  useEffect(() => {
    if (isSuccess) {
      setTour(data);
    }
  }, [data, isSuccess, setTour]);

  if (!tour && error) redirect(`/${locale}/not-found`);

  if (isLoading)
    return (
      <div className="container mt-[150px] min-h-[200px] flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="w-full min-h-[200vh]">
      <div className="container pt-[150px] flex flex-col gap-10 max-[920px]:pt-[100px]">
        <Breadcrumbs />
        <div className="w-full block max-[920px]:hidden">
          <TourTitle title={tour?.name} />
        </div>
        <TourGallery images={tour?.gallery} tourName={tour?.name} />
        <div className="w-full hidden max-[920px]:block">
          <TourTitle title={tour?.name} />
        </div>
        <div className="grid grid-flow-row-dense  grid-cols-[1fr_445px] max-[920px]:grid-cols-1 gap-5 max-[920px]:gap-0">
          <div className="flex flex-col gap-5 w-full">
            {tour?.facts && <TourFacts facts={tour?.facts} />}
            {tour?.description && (
              <TourDescription
                subtitle={tour?.subtitle}
                description={tour?.description}
                className="col-start-1 max-[920px]:gap-5 max-[920px]:py-5"
              />
            )}
          </div>
          {tour?.hightlights && <TourHighlights highlights={tour?.hightlights} />}
          <TourItinerary itineraries={tour?.itineraries} />
          <div className="col-span-2 z-40 h-fit">
            <FreeConsultationForm />
          </div>
          <TourIncludes includes={tour?.includes} />
          <TourBooking prices={tour?.prices} className="z-30 max-[920px]:hidden" />
        </div>
        <TourAccomodation hotels={tour?.hotels} />
        <TourPrices />
        <Reviews />
        <CreateYourTripForm />
        {locale === 'ru' && <ConsultationQuiz />}
      </div>
      <MobileBtn />
    </div>
  );
};
