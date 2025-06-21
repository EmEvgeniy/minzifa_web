'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { FormattedPrice } from '@/components/UI/FormattedPrice/FormattedPrice';
import { useBookingStore } from '@/store/bookingStore';
import { cn } from '@/utils/utils';
import IconCheck from '../../../assets/icons/booking/Line 1.svg';
import Image from 'next/image';
import { Dropdown } from '@/components/UI/Dropdown/Dropdown';

const roomTypes = ['double', 'twin', 'single'] as const;
type RoomType = (typeof roomTypes)[number];

export const RoomTypes = () => {
  const t = useTranslations('Booking');

  const { bookingData, setBookingData } = useBookingStore((state) => state);
  const travellersCount = bookingData?.travellers_count || 0;
  const selectedRoomsTotal = Object.values(bookingData?.room_types || {}).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  // Состояние для визуального выделения активных комнат
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<Set<RoomType>>(
    new Set(
      Object.entries(bookingData?.room_types || {})
        .filter(([, count]) => count > 0)
        .map(([key]) => key as RoomType),
    ),
  );

  useEffect(() => {
    if (!bookingData) return;

    const currentRoomTypes = bookingData.room_types || {};

    // Сброс если 0
    if (travellersCount === 0 && Object.keys(currentRoomTypes).length > 0) {
      setBookingData({
        ...bookingData,
        room_types: {},
      });
      setSelectedRoomTypes(new Set());
    }

    // Автовыбор если 1
    if (Number(travellersCount) === 1) {
      const selected = Object.entries(currentRoomTypes).filter(([, count]) => count > 0);

      if (selected.length !== 1 || selected[0][1] !== 1) {
        const firstSelected = (selected[0]?.[0] as RoomType) || 'double';

        setBookingData({
          ...bookingData,
          room_types: {
            [firstSelected]: 1,
          },
        });

        setSelectedRoomTypes(new Set([firstSelected]));
      }
    }
  }, [travellersCount, bookingData, setBookingData]);

  const handleRoomTypeClick = (roomType: RoomType) => {
    if (!bookingData || !travellersCount) return;

    const travellers = Number(bookingData?.travellers_count) as number;
    const tour_price = bookingData?.tour_price as number;
    const single_price = bookingData?.single_price as number;

    if (Number(travellersCount) === 1) {
      let deposit;
      let total_price;

      if (roomType === 'single') {
        deposit = tour_price * 0.15 + single_price;
        total_price = tour_price * travellers + single_price;
      } else {
        deposit = (bookingData?.deposit as number) - single_price;
        total_price = (bookingData?.total_price as number) - single_price;
      }

      // Только один тип номера
      setSelectedRoomTypes(new Set([roomType]));
      setBookingData({
        ...bookingData,
        room_types: {
          [roomType]: 1,
        },
        deposit: deposit,
        total_price: total_price,
      });
    } else {
      // Множественный выбор
      const roomCount = bookingData.room_types?.[roomType] || 0;
      const updatedSet = new Set(selectedRoomTypes);

      const updatedRoomTypes = {
        ...bookingData.room_types,
        [roomType]: roomCount > 0 ? 0 : 1,
      };

      if (roomCount > 0) {
        updatedSet.delete(roomType);
      } else {
        updatedSet.add(roomType);
      }

      setSelectedRoomTypes(updatedSet);
      setBookingData({
        ...bookingData,
        room_types: updatedRoomTypes,
        deposit:
          tour_price * 0.15 * travellers + (roomType === 'single' ? single_price * roomCount : 0),
        total_price:
          tour_price * travellers + (roomType === 'single' ? single_price * roomCount : 0),
      });
    }
  };

  const handleChangeCount = (value: number, roomType: RoomType) => {
    const otherRoomTypes = Object.entries(bookingData?.room_types || {})
      .filter(([key]) => key !== roomType)
      .reduce((acc, [, count]) => acc + count, 0);

    const available = Number(travellersCount) - otherRoomTypes;
    const finalValue = Math.min(value, available);

    const updatedSet = new Set(selectedRoomTypes);
    if (finalValue > 0) {
      updatedSet.add(roomType);
    } else {
      updatedSet.delete(roomType);
    }

    const travellers = Number(bookingData?.travellers_count) as number;
    const tour_price = bookingData?.tour_price as number;
    const single_price = bookingData?.single_price as number;

    setSelectedRoomTypes(updatedSet);
    setBookingData({
      ...bookingData,
      room_types: {
        ...(bookingData?.room_types || {}),
        [roomType]: finalValue,
      },
      deposit:
        tour_price * 0.15 * travellers + (roomType === 'single' ? single_price * finalValue : 0),
      total_price:
        tour_price * travellers + (roomType === 'single' ? single_price * finalValue : 0),
    });
  };

  return (
    <div className="flex flex-col gap-5 col-span-2 max-[550px]:col-span-1">
      <h2 className="text-[#16372D] text-3xl max-[768px]:text-[24px] max-[768px]:text-center">
        {t('roomTypes.title')}
      </h2>

      {roomTypes.map((roomType: RoomType) => {
        const roomCount = bookingData?.room_types?.[roomType] || 0;
        const isSelected = roomCount > 0;

        return (
          <div key={roomType} className="md:flex flex-col gap-5 rounded-2xl">
            <div
              onClick={() => handleRoomTypeClick(roomType)}
              className={cn(
                'relative rounded-2xl grid grid-cols-1 items-center bg-white hover:bg-gray-100 transition-all duration-300 p-5 pl-8 cursor-pointer max-[550px]:grid-cols-1 max-[550px]:justify-items-center max-[550px]:gap-2',
                isSelected ? 'border-2 border-[#16372D]' : 'border border-gray-300',
                Number(travellersCount) > 1 ? 'grid-cols-3' : 'grid-cols-2',
              )}
            >
              <span className="text-base font-normal">{t(`roomTypes.${roomType}`)}</span>

              {isSelected ? (
                <>
                  <span className={cn(Number(travellersCount) > 1 ? "text-center" : "text-right md:justify-self-end", "text-base font-semibold")}>
                    {t('roomTypes.included')}
                  </span>
                  <span className='absolute top-0 right-0 overflow-hidden w-full h-full rounded-t-xl'>
                    <span className="absolute top-0 left-0 w-[15px] h-[15px]">
                      <div className="absolute w-[50px] h-[50px] bg-[#16372D]/80 rotate-45 z-[1] -top-[25.5px] -left-[25.5px]" />
                      <Image
                        src={IconCheck}
                        width={8}
                        height={10}
                        alt=""
                        className="z-[2] absolute top-[3px] left-[3px] w-full h-full"
                      />
                    </span>
                  </span>
                </>
              ) : (
                <span className={cn(Number(travellersCount) > 1 ? "text-center" : "text-right md:justify-self-end", "text-base font-semibold")}>
                  +{' '}
                  <FormattedPrice
                    price={roomType === 'single' ? bookingData?.single_price || 0 : 0}
                  />
                </span>
              )}

              {Number(travellersCount) > 1 && (
                <Dropdown
                  value={roomCount}
                  onChange={(val) => handleChangeCount(Number(val), roomType)}
                  className="border rounded-md px-2 py-1"
                  options={Array.from({
                    length:
                      (bookingData?.room_types?.[roomType] || 0) +
                      (Number(travellersCount) - selectedRoomsTotal) +
                      1,
                  }).map((_, i) => {
                    return {
                      label: String(i),
                      value: String(i),
                    };
                  })}
                  placeholder="0"
                >
                </Dropdown>
              )}

            </div>

          </div>
        );
      })}
    </div>
  );
};
