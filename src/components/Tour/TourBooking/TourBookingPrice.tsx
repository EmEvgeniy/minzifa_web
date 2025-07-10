'use client';
import { Dropdown, DropdownDetails, DropdownSummary } from '@/components/UI/Dropdown/Dropdown';
import { Price } from '../_types';
import Image from 'next/image';
import { formatted_date } from '@/utils/utils';
import { FormattedPrice } from '@/components/UI/FormattedPrice/FormattedPrice';
import IconCalendar from '../../../assets/icons/booking/calendar.svg';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useBookingStore } from '@/store/bookingStore';
import dayjs from 'dayjs';

type TourBookingPrice = {
  prices: Price[];
  locale: string;
  selectedPrice: Price | undefined;
  setSelectedPrice: (val: Price) => void;
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
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
        <DatePicker
          value={bookingData.tour_start ? dayjs(bookingData.tour_start) : null}
          onChange={(value) =>
            setBookingData({
              ...bookingData,
              tour_start: value ? value.toISOString() : '',
            })
          }
          sx={{
            width: '100%',
            '& .MuiInputBase-root.MuiOutlinedInput-root': {
              borderRadius: '15px',
              border: 'none !important',
            },
            '& .css-lqwr9g-MuiPickersOutlinedInput-notchedOutline': {
              borderRadius: '15px',
            },
          }}
        />
      </LocalizationProvider>
    );

  return (
    <Dropdown>
      <DropdownSummary className="flex flex-row justify-between items-center gap-1.5 border border-gray-300 rounded-2xl p-3 relative cursor-pointer">
        {() => (
          <div className="flex flex-row items-center gap-2">
            <Image src={IconCalendar} width={24} height={24} alt="calendar" />
            <div>{formatted_date(selectedPrice?.date_start || '', locale)}</div>
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
