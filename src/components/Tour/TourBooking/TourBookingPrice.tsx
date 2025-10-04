'use client';
import { Dropdown, DropdownDetails, DropdownSummary } from '@/components/UI/Dropdown/Dropdown';
import { GroupPrice } from '../_types';
import Image from 'next/image';
import { formatted_date } from '@/utils/utils';
import { FormattedPrice } from '@/components/UI/FormattedPrice/FormattedPrice';
import IconCalendar from '../../../assets/icons/booking/calendar.svg';
import { useBookingStore } from '@/store/bookingStore';

type TourBookingPrice = {
  prices: GroupPrice[];
  locale: string;
  selectedPrice: GroupPrice | undefined;
  setSelectedPrice: (val: GroupPrice) => void;
  setTotalPrice: (val: number) => void;
  travellers: number;
};

function TourBookingPrice({
  prices,
  selectedPrice,
  locale,
  setSelectedPrice,
  travellers,
  setTotalPrice,
}: TourBookingPrice) {
  const { bookingData, setBookingData } = useBookingStore((s) => s);

  if (!prices.length)
    return (
      <input
        type="date"
        value={bookingData.tour_start || ''}
        onChange={(e) =>
          setBookingData({
            ...bookingData,
            tour_start: e.target.value,
          })
        }
        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#27A430] focus:border-transparent"
      />
    );

  return (
    <Dropdown>
      <DropdownSummary className="flex flex-row justify-between items-center gap-1.5 border border-gray-300 rounded-2xl p-3 relative cursor-pointer max-[550px]:p-2 max-[550px]:gap-1">
        {() => (
          <div className="flex flex-row items-center gap-2 max-[550px]:gap-1">
            <Image
              src={IconCalendar}
              width={24}
              height={24}
              alt="calendar"
              className="max-[550px]:w-[20px] max-[550px]:h-[20px]"
            />
            <div className="max-[550px]:text-[14px]">
              {formatted_date(selectedPrice?.date_start || '', locale)}
            </div>
          </div>
        )}
      </DropdownSummary>
      <DropdownDetails>
        {({ isOpen, toggle }) => (
          <div className="flex flex-col overflow-hidden overflow-y-auto max-h-[300px]">
            {prices.length > 0 &&
              prices.map((price) => (
                <div
                  key={price.date_start}
                  onClick={() => {
                    setSelectedPrice(price);
                    setTotalPrice(price.price_for_double * travellers);
                    toggle(!isOpen);
                  }}
                  className="px-5 py-3 flex flex-row justify-between items-center gap-1.5 hover:bg-gray-100 cursor-pointer"
                >
                  <div>{formatted_date(price.date_start, locale)}</div>
                  <div className="text-[#27A430]">
                    <FormattedPrice price={price.price_for_double} currency={price.valute} />
                  </div>
                </div>
              ))}
          </div>
        )}
      </DropdownDetails>
    </Dropdown>
  );
}

export default TourBookingPrice;
