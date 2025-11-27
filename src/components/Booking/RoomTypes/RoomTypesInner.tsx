'use client';

import { Dropdown } from '@/components/UI/Dropdown/Dropdown';
import FormattedPrice from '@/components/UI/FormattedPrice/FormattedPrice';
import { UseFormSetValue } from 'react-hook-form';
import { RoomType } from '../_types';
import { BookingFormType } from '@/validation/bookingFormSchema';

const roomTypesAll: RoomType[] = ['standart', 'single'] as const;

type Props = {
  bookingData: BookingFormType,
  title: {
    title: string;
    standart: string;
    standart_hint: string;
    single: string;
    single_hint: string;
    pt: string;
  };
  setValue: UseFormSetValue<BookingFormType>;
};

function RoomTypesInner({ bookingData, title, setValue }: Props) {
  const travellersCount = Number(bookingData?.travellers_count || 0);
  const single_price = Number(bookingData?.single_price || 0);
  const tour_price = Number(bookingData?.tour_price || 0);

  // Check if room_types need reset when travellers decrease
  // const totalRoomsSelected = (bookingData.room_types?.standart || 0) + (bookingData.room_types?.single || 0);

  // const prevTravellersRef = useRef<number>(travellersCount);

  // useEffect(() => {
  //   const prevTravellers = prevTravellersRef.current;
  //   if (!bookingData?.room_types) return;

  //   const totalRoomsSelected =
  //     (bookingData.room_types.standart || 0) + (bookingData.room_types.single || 0);

  //   if (travellersCount !== prevTravellers || totalRoomsSelected > travellersCount) {
  //     setBookingData({
  //       ...bookingData,
  //       room_types: {
  //         standart: Math.min(travellersCount, 1),
  //         single: 0,
  //       },
  //     });
  //   }

  //   prevTravellersRef.current = travellersCount;
  // }, [travellersCount, bookingData, setBookingData]);

  // if (!bookingData?.room_types) return null;

  const handleChangeCount = (roomType: RoomType, value: number) => {
    const updatedRooms = {
      ...bookingData?.room_types,
      [roomType]: value,
    };

    // Validate against total travellers after update
    // const totalRoomsAfterUpdate = (updatedRooms['single'] || 0) + (updatedRooms['standart'] || 0);

    const singleRoomsCount = updatedRooms['single'] || 0;
    const standartRoomsCount = updatedRooms['standart'] || 0;

    // Ensure total rooms don't exceed travellers count
    const totalRooms = singleRoomsCount + standartRoomsCount;
    if (totalRooms > travellersCount) {
      if (roomType === 'single') {
        updatedRooms['standart'] = Math.max(0, travellersCount - value);
      } else {
        updatedRooms['single'] = Math.max(0, travellersCount - value);
      }
    }

    const deposit = tour_price * 0.15 * travellersCount + single_price * (updatedRooms['single'] || 0);
    const total_price = tour_price * travellersCount + single_price * (updatedRooms['single'] || 0);

    setValue('room_types', updatedRooms);
    setValue('deposit', deposit);
    setValue('total_price', total_price);
  };

  const getFormattedRoomPrice = (roomType: RoomType): number => {
    return roomType === 'single' ? tour_price + single_price : tour_price;
  };

  const visibleRoomTypes = roomTypesAll.filter((type) =>
    type === 'single' ? single_price > 0 : true,
  );

  return (
    <>
      {visibleRoomTypes.map((roomType) => {
        const roomTitle = title[roomType];
        const roomHint = roomType === 'single' ? title.single_hint : title.standart_hint;
        const currentCount = bookingData.room_types?.[roomType] ?? 0;

        return (
          <div key={roomType} className="md:flex flex-col gap-5 rounded-2xl">
            <div
              className={
                'relative rounded-2xl grid grid-cols-1 md:grid-cols-3 items-center bg-white transition-all duration-300 p-5 max-[550px]:grid-cols-1 max-[550px]:justify-items-center max-[550px]:gap-2'
              }
            >
              <span className="text-base font-normal flex flex-col">
                <span className="text-base font-semibold">{roomTitle}</span>
                <span className="text-xs text-gray-500">{roomHint}</span>
              </span>
              <span className="text-base font-normal flex flex-col text-center">
                <FormattedPrice
                  className="text-base font-semibold"
                  price={getFormattedRoomPrice(roomType)}
                />
                <span className="text-xs text-gray-500">{title.pt}</span>
              </span>
              <Dropdown
                value={String(currentCount)}
                onChange={(val) => handleChangeCount(roomType, Number(val))}
                className="border rounded-md px-2 py-1"
                options={Array.from({ length: travellersCount + 1 }).map((_, i) => ({
                  label: String(i),
                  value: String(i),
                }))}
                placeholder={String(currentCount)}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default RoomTypesInner;
