import dynamic from 'next/dynamic';
import { Tour } from '../_types';

const TourGroupPrices = dynamic(() => import('@/components/Tour/TourPrices/TourGroupPrices'));
const TourIndividualPrice = dynamic(
  () => import('@/components/Tour/TourPrices/TourIndividualPrice'),
);

export default function TourPricesContainer({ tour }: { tour: Tour }) {
  return (
    <div className="relative container md:!px-0">
      {tour.tour_type === 'group' ? <TourGroupPrices tour={tour} /> : <TourIndividualPrice tour={tour} />}
    </div>
  );
}
