import { Tour } from './_types';
import { CreateYourTripForm } from '../UI/CreateYourTripForm/CreateYourTripForm';
import dynamic from 'next/dynamic';
import TourTitle from './TourTitle/TourTitle';
const Reviews = dynamic(() => import('../UI/Reviews/Reviews'));
const TourHighlights = dynamic(() => import('./TourHighlights/TourHighlights'));
const TourGallery = dynamic(() => import('./TourGallery/TourGallery'));
const TourFacts = dynamic(() => import('./TourFacts/TourFacts'));
const TourDescription = dynamic(() => import('./TourDescription/TourDescription'));
const TourItinerary = dynamic(() => import('./TourItinerary/TourItinerary'));
const TourAccomodation = dynamic(() => import('./TourAccomodation/TourAccomodation'));
const TourByRequest = dynamic(() => import('./TourByRequest/TourByRequest'));
const FreeConsultationForm = dynamic(
  () => import('../UI/FreeConsultationForm/FreeConsultationForm'),
);
const TourIncludes = dynamic(() => import('./TourIncludes/TourIncludes'));
const TourBooking = dynamic(() => import('./TourBooking/TourBooking'));
const TourPrices = dynamic(() => import('./TourPrices/TourPrices'));
const MobileBtn = dynamic(() => import('./MobileBtn/MobileBtn'));

export default async function TourWrapper({
  tourData,
  locale,
}: {
  tourData: Tour;
  locale: string;
}) {
  return (
    <div className="w-full min-h-[200vh]">
      <div className="container pt-[150px] flex flex-col gap-10 max-[920px]:pt-[100px]">
        <div className="w-full block max-[920px]:hidden">
          <TourTitle title={tourData?.name} />
        </div>
        <TourGallery images={tourData?.gallery} tourName={tourData?.name} locale={locale} />
        <div className="w-full hidden max-[920px]:block">
          <TourTitle title={tourData?.name} />
        </div>
        <div className="grid grid-flow-row-dense  grid-cols-[1fr_445px] max-[920px]:grid-cols-1 gap-5 max-[920px]:gap-0">
          <div className="flex flex-col gap-5 w-full">
            <TourFacts facts={tourData?.facts} locale={locale} />
            <TourDescription
              subtitle={tourData?.subtitle}
              description={tourData?.description}
              className="col-start-1 max-[920px]:gap-5 max-[920px]:py-5"
            />
          </div>
          <TourHighlights highlights={tourData?.hightlights} />
          <TourItinerary itineraries={tourData?.itineraries} locale={locale} />
          <div id="free-consultation" className="col-span-2 z-40 h-fit">
            <FreeConsultationForm />
          </div>
          <TourIncludes includes={tourData?.includes} locale={locale} />
          {tourData?.prices.length ? (
            <TourBooking
              prices={tourData?.prices}
              className="z-30 max-[920px]:hidden"
              tour={tourData}
            />
          ) : (
            <TourByRequest locale={locale} />
          )}
        </div>
        <TourAccomodation hotels={tourData.hotels} locale={locale} />
        <TourPrices tour={tourData} />
        <Reviews locale={locale} />
        <CreateYourTripForm className="mb-5" />
      </div>
      <MobileBtn locale={locale} tour={tourData} />
    </div>
  );
}
