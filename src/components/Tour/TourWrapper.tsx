'use client';

import type { OrderTourDetailData, Tour as TourData } from './_types';
import { CreateYourTripForm } from '../UI/CreateYourTripForm/CreateYourTripForm';
import TourTitle from './TourTitle/TourTitle';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';
import TourGallery from './TourGallery/TourGallery';
import TourFacts from './TourFacts/TourFacts';
import TourDescription from '../UI/MarkdownDescription/MarkdownDescription';
import TourBookingWrapper from './TourBooking/TourBookingWrapper';
import TourHighlights from './TourHighlights/TourHighlights';
import TourItinerary from './TourItinerary/TourItinerary';
import FreeConsultationForm from '../UI/FreeConsultationForm/FreeConsultationForm';
import TourIncludes from './TourIncludes/TourIncludes';
import TourAccomodation from './TourAccomodation/TourAccomodation';
import Transport from './Transport/Transport';
import TourPricesContainer from './TourPrices/TourPricesContainer';
import Reviews from '../UI/Reviews/Reviews';
import QuizForm from '../UI/CreateYourTripForm/QuizForm';
import MobileBtn from './MobileBtn/MobileBtn';
import TourPrivateModal from './TourPrivateModal/TourPrivateModal';

export default function TourWrapper({ locale, tourData }: { locale: string; tourData: TourData }) {

  const t = useTranslations('Tour');

  if (!tourData?.id) redirect(`/${locale}`);

  if (tourData?.photo) {
    tourData?.gallery.unshift(tourData?.photo);
  }

  const additionalFormData: OrderTourDetailData = {
    tour_id: tourData?.id,
    tour_name: tourData?.name,
    tour_start: null,
    tour_end: null,
    count: null,
    price_id: null,
    price: null,
    total_price: null,
  }

  return (
    <>
      <div className="w-full block max-[920px]:hidden">
        <TourTitle title={tourData?.name} />
      </div>
      <TourGallery images={tourData?.gallery} />
      <div className="w-full hidden container max-[920px]:block">
        <TourTitle title={tourData?.name} />
      </div>
      <div className={"container md:!px-0 md:grid md:grid-flow-row-dense md:grid-cols-[720px_370px] md:justify-between md:gap-5"}>
        <div className="flex flex-col gap-5 w-full h-full">
          <TourFacts facts={tourData?.facts} tour_type={tourData?.tour_type} />
          <TourDescription
            subtitle={tourData?.subtitle}
            description={tourData?.description}
            className="md:col-start-1 max-[920px]:gap-5 max-[920px]:py-5"
          />
        </div>
        <div className='md:hidden'>
          <TourBookingWrapper tour={tourData} />
        </div>
        <TourHighlights highlights={tourData?.hightlights} />
        <TourItinerary itineraries={tourData?.itineraries} />
        <div id="free-consultation" className="col-span-2 z-40 h-fit">
          <FreeConsultationForm additionalFormData={additionalFormData} />
        </div>
        <TourIncludes includes={tourData?.includes} />
        <TourAccomodation hotels={tourData?.hotels} />
        <div className={'hidden md:block sticky top-36 z-30'}>
          <TourBookingWrapper tour={tourData} />
        </div>
        <Transport locale={locale} transports={tourData?.transports} />
      </div>
      <TourPricesContainer tour={tourData} />
      <Reviews />
      <div className='container'>
        {locale === 'en' ? (
          <QuizForm className="mb-10 flex justify-center" locale="en" />
        ) : (
          <CreateYourTripForm className="mb-10" locale={locale} />
        )}
      </div>
      <MobileBtn locale={locale} tour={tourData} />
      <TourPrivateModal locale={locale} tour={tourData} />
    </>
  );
}
