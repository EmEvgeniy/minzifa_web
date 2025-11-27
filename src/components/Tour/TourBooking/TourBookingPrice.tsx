'use client';

import { Dropdown, DropdownDetails, DropdownSummary } from '@/components/UI/Dropdown/Dropdown';
import { GroupPrice } from '../_types';
import { formatted_date } from '@/utils/utils';
import FormattedPrice from '@/components/UI/FormattedPrice/FormattedPrice';
import IconCalendar from '../../../assets/icons/booking/calendar.svg';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { cn } from '@/utils/utils';

type TourBookingPriceProps = {
  prices?: GroupPrice[];
  locale: string;
  valute: string;
  selectedPrice?: GroupPrice;
  setSelectedPrice: (val: GroupPrice) => void;
  setTotalPrice: (val: number) => void;
  travellers: number;
};

function TourBookingPrice({
  prices,
  selectedPrice,
  locale,
  valute,
  setSelectedPrice,
  travellers,
  setTotalPrice,
}: TourBookingPriceProps) {
  // const { bookingData, setBookingData } = useBookingStore((s) => s);

  // Получаем сегодняшнюю дату в формате "YYYY-MM-DD" (без времени)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!prices?.length) {
    return (
      <input
        type="date"
        // value={bookingData.tour_start || ''}
        // onChange={(e) =>
        //   setBookingData({
        //     ...bookingData,
        //     tour_start: e.target.value,
        //   })
        // }
        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#27A430] focus:border-transparent"
      />
    );
  }

  return (
    <Dropdown>
      <DropdownSummary className="flex flex-row justify-between items-center gap-1.5 border border-gray-300 rounded-2xl p-3 relative cursor-pointer max-[550px]:p-2 max-[550px]:gap-1">
        {() => (
          <div className="flex flex-row items-center gap-2 max-[550px]:gap-1">
            <ImageWithFallback
              src={IconCalendar}
              width={24}
              height={24}
              alt="calendar"
              className="w-5 h-5 md:w-6 md:h-6"
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
            {prices.map((price) => {
              const isActive = selectedPrice?.date_start === price.date_start;
              const priceDate = new Date(price.date_start);
              priceDate.setHours(0, 0, 0, 0);

              const isPast = priceDate < today;

              return (
                <div
                  key={price.date_start}
                  onClick={() => {
                    if (isPast) return; // запрещаем выбор прошедших дат
                    setSelectedPrice(price);
                    setTotalPrice(price.price_for_double * travellers);
                    toggle(!isOpen);
                  }}
                  className={cn(
                    'px-5 py-3 flex flex-row justify-between items-center gap-1.5 transition-colors rounded-lg',
                    isPast
                      ? 'opacity-50 cursor-not-allowed bg-gray-50 text-gray-400'
                      : 'hover:bg-gray-100 cursor-pointer',
                    isActive && !isPast ? 'bg-[#27A430]/10 text-[#27A430]' : '',
                  )}
                >
                  <div>{formatted_date(price.date_start, locale)}</div>
                  <div className={cn('font-medium', isPast ? 'text-gray-400' : 'text-[#27A430]')}>
                    <FormattedPrice price={price.price_for_double} currency={valute} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </DropdownDetails>
    </Dropdown>
  );
}

export default TourBookingPrice;
