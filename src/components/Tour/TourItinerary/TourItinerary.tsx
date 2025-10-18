import { Itinerary } from '../_types';
import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';

const TourItineraryBtn = dynamic(() => import('./TourItineraryBtn'));
const TourItineraryAccordions = dynamic(() => import('./TourItineraryAccordions'));

export default async function TourItinerary({
  itineraries,
  locale,
}: {
  itineraries: Itinerary[] | undefined;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: 'Tour' });

  if (!itineraries) return null;

  return (
    <div className="flex flex-col gap-5 md:col-start-1">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-4xl font-semibold max-[920px]:text-[30px] max-[550px]:text-[24px]">
          {t('itinerary.title')}
        </h2>
        <TourItineraryBtn
          closed={t('itinerary.closed')}
          expanded={t('itinerary.expanded')}
          itineraries={itineraries}
        />
      </div>
      <TourItineraryAccordions
        itineraries={itineraries}
        pl={t('itinerary.accomodation')}
        pl2={t('itinerary.meals')}
      />
    </div>
  );
}
