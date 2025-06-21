'use client';

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { Passenger as PassengerType, useBookingStore } from '@/store/bookingStore';

import {
  Dropdown,
  DropdownDetails,
  DropdownItem,
  DropdownSummary,
} from '@/components/UI/Dropdown/Dropdown';
import { useMemo } from 'react';
import IconInfo from '../../../assets/icons/booking/exclamationmark.circle.svg';
import Image from 'next/image';

const InputField = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => (
  <input
    type="text"
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    className="rounded-2xl border border-[#D8DADC] placeholder:text-[#16372D]/50 text-[#16372D] font-normal text-base px-2.5 py-4 w-full"
  />
);

const RadioButton = ({
  name,
  value,
  checked,
  label,
  onChange,
}: {
  name: string;
  value: string;
  checked: boolean;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <label className="flex items-center space-x-2 text-sm text-gray-600">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <span>{label}</span>
  </label>
);

export const Passenger = ({ index }: { index: number, errors?: Partial<Record<keyof PassengerType, string[]>>; }) => {
  const locale = useLocale();
  const t = useTranslations('Booking');

  const { bookingData, setBookingData } = useBookingStore((state) => state);

  const salutations: string[] = ['Mr.', 'Ms.', 'Mrs.', 'Miss'];

  const genders: { [key: string]: string[] } = {
    en: ['Male', 'Female'],
    ru: ['Мужчина', 'Женщина'],
  };

  const months: { [key: string]: string[] } = {
    en: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    ru: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
  };

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

  const currentYear = new Date().getFullYear();
  const years = useMemo(
    () => Array.from({ length: 100 }, (_, i) => String(currentYear - i)),
    [currentYear],
  );

  const updatePassengerField = (index: number, path: string, value: string) => {
    if (!bookingData || !Array.isArray(bookingData.passengers)) {
      console.warn('bookingData или passengers не инициализированы');
      return;
    }

    const keys = path.split('.');

    const newPassengers: PassengerType[] = [...bookingData.passengers];
    const passenger = { ...newPassengers[index] };

    let current: Record<string, unknown> = passenger;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];

      if (
        typeof current[key] !== 'object' ||
        current[key] === null ||
        Array.isArray(current[key])
      ) {
        current[key] = {};
      } else {
        current[key] = { ...current[key] };
      }

      current = current[key] as Record<string, unknown>;
    }

    current[keys[keys.length - 1]] = value;

    newPassengers[index] = passenger;

    console.log(newPassengers);

    setBookingData({
      ...bookingData,
      passengers: newPassengers,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#C5DCD3]/50 rounded-2xl px-2.5 py-5 flex flex-row items-center gap-2 max-[768px]:text-[12px]">
        <Image src={IconInfo} alt={''} width={30} height={30} />
        {t.rich('passenger.passenger_hint', {
          strong: (chunks) => <b>{chunks}</b>,
        })}
      </div>
      {/* Personal Information section */}
      <div className="space-y-4">
        {/* Salutation */}
        <div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {locale === 'en' &&
              salutations?.map((s) => (
                <RadioButton
                  key={s}
                  name={`salutation_${index}`}
                  value={s}
                  checked={bookingData?.passengers?.[index]?.salutation === s}
                  label={s}
                  onChange={(e) => updatePassengerField(index, 'salutation', e.target.value)}
                />
              ))}
          </div>
        </div>

        {/* Name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <InputField
              value={bookingData?.passengers?.[index]?.first_name || ''}
              onChange={(e) => updatePassengerField(index, 'first_name', e.target.value)}
              placeholder={t('passenger.first_name')}
            />
          </div>
          <div>
            <InputField
              value={bookingData?.passengers?.[index]?.last_name || ''}
              onChange={(e) => updatePassengerField(index, 'last_name', e.target.value)}
              placeholder={t('passenger.last_name')}
            />
          </div>
        </div>

        {/* Email */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <InputField
              value={bookingData?.passengers?.[index]?.email || ''}
              onChange={(e) => updatePassengerField(index, 'email', e.target.value)}
              placeholder={t('passenger.email')}
            />
          </div>

          {/* Phone Number */}
          <div>
            <div className="flex flex-row">
              <InputField
                value={bookingData?.passengers?.[index]?.phone || ''}
                onChange={(e) => updatePassengerField(index, 'phone', e.target.value)}
                placeholder={t('passenger.phone')}
              />
            </div>
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('passenger.date_of_birth')}
          </label>
          <div className="mt-1 grid grid-cols-3 gap-2">
            <Dropdown>
              <DropdownSummary className="cursor-pointer rounded-2xl border border-[#D8DADC] placeholder:text-[#16372D]/50 text-[#16372D] font-normal text-base px-2.5 py-4 w-full flex flex-row justify-between items-center">
                {bookingData?.passengers?.[index]?.birth_date?.month || t('passenger.month')}
              </DropdownSummary>
              <DropdownDetails className="flex flex-col overflow-hidden overflow-y-auto max-h-[300px]">
                {({ isOpen, toggle }) =>
                  months[locale].map((month) => (
                    <DropdownItem
                      key={month}
                      onClick={() => {
                        updatePassengerField(index, 'birth_date.month', month);
                        toggle(!isOpen);
                      }}
                    >
                      {month}
                    </DropdownItem>
                  ))
                }
              </DropdownDetails>
            </Dropdown>

            <Dropdown>
              <DropdownSummary className="cursor-pointer rounded-2xl border border-[#D8DADC] placeholder:text-[#16372D]/50 text-[#16372D] font-normal text-base px-2.5 py-4 w-full flex flex-row justify-between items-center">
                {bookingData?.passengers?.[index]?.birth_date?.day || t('passenger.day')}
              </DropdownSummary>
              <DropdownDetails className="flex flex-col overflow-hidden overflow-y-auto max-h-[300px]">
                {({ isOpen, toggle }) =>
                  days.map((day) => (
                    <DropdownItem
                      key={day}
                      onClick={() => {
                        updatePassengerField(index, 'birth_date.day', day);
                        toggle(!isOpen);
                      }}
                    >
                      {day}
                    </DropdownItem>
                  ))
                }
              </DropdownDetails>
            </Dropdown>

            <Dropdown>
              <DropdownSummary className="cursor-pointer rounded-2xl border border-[#D8DADC] placeholder:text-[#16372D]/50 text-[#16372D] font-normal text-base px-2.5 py-4 w-full flex flex-row justify-between items-center">
                {bookingData?.passengers?.[index]?.birth_date?.year || t('passenger.year')}
              </DropdownSummary>
              <DropdownDetails className="flex flex-col overflow-hidden overflow-y-auto max-h-[300px]">
                {({ isOpen, toggle }) =>
                  years.map((year) => (
                    <DropdownItem
                      key={year}
                      onClick={() => {
                        updatePassengerField(index, 'birth_date.year', year);
                        toggle(!isOpen);
                      }}
                    >
                      {year}
                    </DropdownItem>
                  ))
                }
              </DropdownDetails>
            </Dropdown>
          </div>
        </div>

        {/* Gender */}
        <div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {genders[locale].map((g) => (
              <RadioButton
                key={g}
                name={`gender_${index}`}
                value={g}
                checked={bookingData?.passengers?.[index]?.gender === g}
                label={g}
                onChange={(e) => updatePassengerField(index, 'gender', e.target.value)}
              />
            ))}
          </div>
        </div>
      </div>

      <hr className="border-[#16372D]/20" />
      {/* Address Information section */}
      <span className="block text-sm font-medium text-gray-700">{t('passenger.adress')}</span>

      <div className="mt-2 space-y-4">
        {/* Street Address */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField
            value={bookingData?.passengers?.[index]?.main_address?.address || ''}
            onChange={(e) => updatePassengerField(index, 'main_address.address', e.target.value)}
            placeholder={t('passenger.adress_line', { number: 1 })}
          />
          <InputField
            value={bookingData?.passengers?.[index]?.main_address?.address2 || ''}
            onChange={(e) => updatePassengerField(index, 'main_address.address2', e.target.value)}
            placeholder={t('passenger.adress_line', { number: 2 })}
          />
        </div>

        {/* City, State/Province, Postal Code */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField
            value={bookingData?.passengers?.[index]?.main_address?.province || ''}
            onChange={(e) => updatePassengerField(index, 'main_address.province', e.target.value)}
            placeholder={t('passenger.province')}
          />
          <InputField
            value={bookingData?.passengers?.[index]?.main_address?.state || ''}
            onChange={(e) => updatePassengerField(index, 'main_address.state', e.target.value)}
            placeholder={t('passenger.state')}
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <InputField
            value={bookingData?.passengers?.[index]?.main_address?.postal_code || ''}
            onChange={(e) =>
              updatePassengerField(index, 'main_address.postal_code', e.target.value)
            }
            placeholder={t('passenger.zip')}
          />
        </div>
      </div>
    </div>
  );
};
