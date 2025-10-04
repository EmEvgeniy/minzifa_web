'use client';

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { Passenger as PassengerType, useBookingStore } from '@/store/bookingStore';
import { useEffect, useMemo } from 'react';
import { PhoneInputComp } from '@/components/UI';
import { cn } from '@/utils/utils';

// Оптимизированные константы вынесены вне компонента для лучшей производительности
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

export const Passenger = ({
  index,
  hints,
}: {
  index: number;
  hints: string[];
  errors?: Partial<Record<keyof PassengerType, string[]>>;
}) => {
  const locale = useLocale();
  const t = useTranslations('Booking');

  const { bookingData, setBookingData, sendStatus, updatePassengerField } = useBookingStore(
    (state) => state,
  );

  // Оптимизированные массивы данных
  const days = useMemo(
    () => Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')),
    [],
  );

  const currentYear = new Date().getFullYear();
  const years = useMemo(
    () => Array.from({ length: 100 }, (_, i) => String(currentYear - i)),
    [currentYear],
  );

  useEffect(() => {
    const defaultPassenger: PassengerType = {
      salutation: 'Mr.',
      gender: 'Male',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      birth_date: {
        day: '',
        month: '',
        year: '',
      },
      main_address: {
        address: '',
        address2: '',
        province: '',
        state: '',
        postal_code: '',
      },
    };

    const updatedPassengers = [...(bookingData.passengers || [])];

    // Только если пассажир с таким индексом не существует — создаём нового
    if (!updatedPassengers[index]) {
      updatedPassengers[index] = defaultPassenger;
      setBookingData({
        ...bookingData,
        passengers: updatedPassengers,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Оптимизированный компонент для информационных подсказок
  const InfoHints = () => (
    <div className="bg-[#C5DCD3]/50 rounded-2xl px-2.5 py-5 flex flex-row items-center gap-2 max-[768px]:text-[12px]">
      <div className="w-[30px] h-[30px] flex items-center justify-center text-blue-600">
        <svg fill="currentColor" viewBox="0 0 20 20" width="30" height="30">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {hints.map((el) => (
        <p key={el}>{el}</p>
      ))}
    </div>
  );

  // Оптимизированный компонент для радиокнопок
  const OptimizedRadioGroup = ({
    name,
    value,
    options,
    onChange,
    label,
    error,
  }: {
    name: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    label: string;
    error?: boolean;
  }) => (
    <div className="w-full flex flex-col gap-3">
      <label className={cn('block text-sm font-medium', error && 'text-red-500')}>{label}</label>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="w-4 h-4 text-[#27A430] focus:ring-[#27A430]"
            />
            <span className="text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  // Оптимизированный компонент для селектов
  const OptimizedSelect = ({
    value,
    onChange,
    options,
    placeholder,
    error,
  }: {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder: string;
    error?: boolean;
  }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#27A430] focus:border-transparent text-sm',
        error ? 'border-red-500' : 'border-gray-300',
      )}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  return (
    <div className="space-y-6">
      <InfoHints />

      {/* Personal Information section */}
      <div className="space-y-4">
        {/* Salutation */}
        {locale === 'en' && (
          <OptimizedRadioGroup
            name={`salutation_${index}`}
            value={bookingData?.passengers?.[index]?.salutation || ''}
            options={salutations}
            onChange={(value) => updatePassengerField(index, 'salutation', value)}
            label={locale === 'en' ? 'Choose one of them:*' : 'Выберите один из вариантов:*'}
            error={sendStatus && !bookingData?.passengers?.[index]?.salutation}
          />
        )}

        {/* Name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            className={cn(
              'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#27A430] focus:border-transparent',
              sendStatus && !bookingData?.passengers?.[index]?.first_name
                ? 'border-red-500'
                : 'border-gray-300',
            )}
            value={bookingData?.passengers?.[index]?.first_name || ''}
            onChange={(e) => updatePassengerField(index, 'first_name', e.target.value)}
            placeholder={t('passenger.first_name')}
          />
          <input
            type="text"
            className={cn(
              'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#27A430] focus:border-transparent',
              sendStatus && !bookingData?.passengers?.[index]?.last_name
                ? 'border-red-500'
                : 'border-gray-300',
            )}
            value={bookingData?.passengers?.[index]?.last_name || ''}
            onChange={(e) => updatePassengerField(index, 'last_name', e.target.value)}
            placeholder={t('passenger.last_name')}
          />
        </div>

        {/* Email и Phone */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="email"
            className={cn(
              'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#27A430] focus:border-transparent',
              sendStatus && !bookingData?.passengers?.[index]?.email
                ? 'border-red-500'
                : 'border-gray-300',
            )}
            value={bookingData?.passengers?.[index]?.email || ''}
            onChange={(e) => updatePassengerField(index, 'email', e.target.value)}
            placeholder={t('passenger.email')}
          />
          <PhoneInputComp
            value={bookingData?.passengers?.[index]?.phone || ''}
            onChange={(value) => updatePassengerField(index, 'phone', value)}
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label
            className={cn(
              'block text-sm font-medium text-gray-700',
              sendStatus &&
                !bookingData?.passengers?.[index]?.birth_date?.month &&
                !bookingData?.passengers?.[index]?.birth_date?.day &&
                !bookingData?.passengers?.[index]?.birth_date?.year &&
                'text-red-500',
            )}
          >
            {`${t('passenger.date_of_birth')}:*`}
          </label>
          <div className="mt-1 grid grid-cols-3 gap-2">
            <OptimizedSelect
              value={bookingData?.passengers?.[index]?.birth_date?.month || ''}
              onChange={(value) => updatePassengerField(index, 'birth_date.month', value)}
              options={months[locale]}
              placeholder={t('passenger.month')}
              error={sendStatus && !bookingData?.passengers?.[index]?.birth_date?.month}
            />
            <OptimizedSelect
              value={bookingData?.passengers?.[index]?.birth_date?.day || ''}
              onChange={(value) => updatePassengerField(index, 'birth_date.day', value)}
              options={days}
              placeholder={t('passenger.day')}
              error={sendStatus && !bookingData?.passengers?.[index]?.birth_date?.day}
            />
            <OptimizedSelect
              value={bookingData?.passengers?.[index]?.birth_date?.year || ''}
              onChange={(value) => updatePassengerField(index, 'birth_date.year', value)}
              options={years}
              placeholder={t('passenger.year')}
              error={sendStatus && !bookingData?.passengers?.[index]?.birth_date?.year}
            />
          </div>
        </div>

        {/* Gender */}
        <OptimizedRadioGroup
          name={`gender_${index}`}
          value={bookingData?.passengers?.[index]?.gender || 'Male'}
          options={genders[locale]}
          onChange={(value) => updatePassengerField(index, 'gender', value)}
          label={locale === 'en' ? 'Your gender:*' : 'Ваш пол:*'}
          error={sendStatus && !bookingData?.passengers?.[index]?.gender}
        />
      </div>

      {index === 0 && <hr className="border-[#16372D]/20" />}

      {/* Address Information section */}
      {index === 0 && (
        <>
          <span className="block text-sm font-medium text-gray-700">{t('passenger.adress')}</span>
          <div className="mt-2 space-y-4">
            {/* Street Address */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                className={cn(
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#27A430] focus:border-transparent',
                  sendStatus && !bookingData?.passengers?.[index]?.main_address?.address
                    ? 'border-red-500'
                    : 'border-gray-300',
                )}
                value={bookingData?.passengers?.[index]?.main_address?.address || ''}
                onChange={(e) =>
                  updatePassengerField(index, 'main_address.address', e.target.value)
                }
                placeholder={t('passenger.adress_line', { number: 1 })}
              />
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27A430] focus:border-transparent"
                value={bookingData?.passengers?.[index]?.main_address?.address2 || ''}
                onChange={(e) =>
                  updatePassengerField(index, 'main_address.address2', e.target.value)
                }
                placeholder={t('passenger.adress_line', { number: 2 })}
              />
            </div>

            {/* City, State/Province, Postal Code */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27A430] focus:border-transparent"
                value={bookingData?.passengers?.[index]?.main_address?.province || ''}
                onChange={(e) =>
                  updatePassengerField(index, 'main_address.province', e.target.value)
                }
                placeholder={t('passenger.province')}
              />
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27A430] focus:border-transparent"
                value={bookingData?.passengers?.[index]?.main_address?.state || ''}
                onChange={(e) => updatePassengerField(index, 'main_address.state', e.target.value)}
                placeholder={t('passenger.state')}
              />
            </div>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27A430] focus:border-transparent"
              value={bookingData?.passengers?.[index]?.main_address?.postal_code || ''}
              onChange={(e) =>
                updatePassengerField(index, 'main_address.postal_code', e.target.value)
              }
              placeholder={t('passenger.zip')}
            />
          </div>
        </>
      )}
    </div>
  );
};
