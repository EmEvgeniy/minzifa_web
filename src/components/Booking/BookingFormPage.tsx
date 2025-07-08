import BookingHeader from './BookingHeader/BookingHeader';
import { Tour } from '../Tour/_types';
import dynamic from 'next/dynamic';
import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';
const Travellers = dynamic(() => import('./Travellers/Travellers'));
const RoomTypes = dynamic(() => import('./RoomTypes/RoomTypes'));
const Passengers = dynamic(() => import('./Passengers/Passengers'));
const MobileBtn = dynamic(() => import('./MobileBtn/MobileBtn'));
const BookingInfo = dynamic(() => import('./BookingInfo/BookingInfo'));

export default function BookingFormPage({ tourData, locale }: { tourData: Tour; locale: string }) {
  return (
    <section className="relative pb-[0px]">
      <div className="container mt-[150px] flex flex-col gap-5 min-h-[200px] mb-10 max-[1024px]:mt-[90px]">
        <Breadcrumbs />
        <BookingHeader tourData={tourData} />
        <div className="flex items-start justify-between gap-5 relative max-[1024px]:flex-col-reverse">
          <div className="flex flex-col gap-10 h-full w-2/2">
            <Travellers locale={locale} />
            <RoomTypes locale={locale} />
            <Passengers locale={locale} />
          </div>

          <div className="h-screen max-[1024px]:w-full max-[1024px]:h-full">
            <BookingInfo tour={tourData} />
          </div>
        </div>
      </div>

      <MobileBtn />
    </section>
  );
}
