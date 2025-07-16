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
import { useEffect, useMemo } from 'react';
import IconInfo from '../../../assets/icons/booking/exclamationmark.circle.svg';
import Image from 'next/image';
import { PhoneInputComp } from '@/components/UI';
import { cn } from '@/utils/utils';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

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

  const { bookingData, setBookingData, sendStatus } = useBookingStore((state) => state);

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

    setBookingData({
      ...bookingData,
      passengers: newPassengers,
    });
  };

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

  return (
    <div className="space-y-6">
      <div className="bg-[#C5DCD3]/50 rounded-2xl px-2.5 py-5 flex flex-row items-center gap-2 max-[768px]:text-[12px]">
        <Image src={IconInfo} alt={''} width={30} height={30} />
        {hints.map((el) => (
          <p key={el}>{el}</p>
        ))}
      </div>
      {/* Personal Information section */}
      <div className="space-y-4">
        {/* Salutation */}
        <div className="w-full flex flex-col gap-3">
          {locale === 'en' && (
            <FormControl error={sendStatus && !bookingData?.passengers?.[index]?.salutation}>
              <FormLabel>
                {locale === 'en' ? 'Choose one of them:*' : 'Выберите один из вариантов:*'}
              </FormLabel>
              <RadioGroup
                color="secondary"
                name={`salutation_${index}`}
                value={bookingData?.passengers?.[index]?.salutation || ''}
                onChange={(e) =>
                  updatePassengerField(
                    index,
                    'salutation',
                    bookingData?.passengers?.[index]?.salutation ? e.target.value : 'Mr.',
                  )
                }
                sx={{ my: 1, display: 'flex', flexDirection: 'row' }}
              >
                {salutations?.map((s: string) => (
                  <FormControlLabel
                    color="secondary"
                    key={s}
                    value={s}
                    control={<Radio color="secondary" />}
                    label={s}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
        </div>

        {/* Name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            type="text"
            color="secondary"
            fullWidth
            error={sendStatus && !bookingData?.passengers?.[index]?.first_name}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
              },
            }}
            value={bookingData?.passengers?.[index]?.first_name || ''}
            onChange={(e) => updatePassengerField(index, 'first_name', e.target.value)}
            placeholder={t('passenger.first_name')}
          />
          <TextField
            type="text"
            color="secondary"
            fullWidth
            error={sendStatus && !bookingData?.passengers?.[index]?.last_name}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
              },
            }}
            value={bookingData?.passengers?.[index]?.last_name || ''}
            onChange={(e) => updatePassengerField(index, 'last_name', e.target.value)}
            placeholder={t('passenger.last_name')}
          />
        </div>

        {/* Email */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            type="text"
            color="secondary"
            fullWidth
            error={sendStatus && !bookingData?.passengers?.[index]?.email}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
              },
            }}
            value={bookingData?.passengers?.[index]?.email || ''}
            onChange={(e) => updatePassengerField(index, 'email', e.target.value)}
            placeholder={t('passenger.email')}
          />

          {/* Phone Number */}
          <div>
            <div className="flex flex-row">
              <PhoneInputComp
                value={bookingData?.passengers?.[index]?.phone || ''}
                onChange={(e) => updatePassengerField(index, 'phone', e)}
              />
            </div>
          </div>
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
        <div className="flex flex-col gap-3">
          <FormControl error={sendStatus && !bookingData?.passengers?.[index]?.salutation}>
            <FormLabel>{locale === 'en' ? 'Your gender:*' : 'Ваш пол:*'}</FormLabel>
            <RadioGroup
              color="secondary"
              name={`salutation_${index}`}
              value={bookingData?.passengers?.[index]?.gender || 'Male'}
              onChange={(e) =>
                updatePassengerField(
                  index,
                  'gender',
                  bookingData?.passengers?.[index]?.gender ? e.target.value : 'Male',
                )
              }
              sx={{ my: 1, display: 'flex', flexDirection: 'row' }}
            >
              {genders[locale].map((s: string) => (
                <FormControlLabel
                  color="secondary"
                  key={s}
                  value={s}
                  control={<Radio color="secondary" />}
                  label={s}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {index === 0 && <hr className="border-[#16372D]/20" />}
      {/* Address Information section */}
      {index === 0 && (
        <span className="block text-sm font-medium text-gray-700">{t('passenger.adress')}</span>
      )}

      {index === 0 && (
        <div className="mt-2 space-y-4">
          {/* Street Address */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              type="text"
              color="secondary"
              fullWidth
              error={sendStatus && !bookingData?.passengers?.[index]?.main_address?.address}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                },
              }}
              value={bookingData?.passengers?.[index]?.main_address?.address || ''}
              onChange={(e) => updatePassengerField(index, 'main_address.address', e.target.value)}
              placeholder={t('passenger.adress_line', { number: 1 })}
            />
            <TextField
              type="text"
              color="secondary"
              fullWidth
              // error={sendStatus && !bookingData?.passengers?.[index]?.main_address?.address2}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                },
              }}
              value={bookingData?.passengers?.[index]?.main_address?.address2 || ''}
              onChange={(e) => updatePassengerField(index, 'main_address.address2', e.target.value)}
              placeholder={t('passenger.adress_line', { number: 2 })}
            />
          </div>

          {/* City, State/Province, Postal Code */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              type="text"
              color="secondary"
              fullWidth
              // error={sendStatus && !bookingData?.passengers?.[index]?.main_address?.province}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                },
              }}
              value={bookingData?.passengers?.[index]?.main_address?.province || ''}
              onChange={(e) => updatePassengerField(index, 'main_address.province', e.target.value)}
              placeholder={t('passenger.province')}
            />
            <TextField
              type="text"
              color="secondary"
              fullWidth
              // error={sendStatus && !bookingData?.passengers?.[index]?.main_address?.state}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                },
              }}
              value={bookingData?.passengers?.[index]?.main_address?.state || ''}
              onChange={(e) => updatePassengerField(index, 'main_address.state', e.target.value)}
              placeholder={t('passenger.state')}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <TextField
              type="text"
              color="secondary"
              fullWidth
              // error={sendStatus && !bookingData?.passengers?.[index]?.main_address?.postal_code}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                },
              }}
              value={bookingData?.passengers?.[index]?.main_address?.postal_code || ''}
              onChange={(e) =>
                updatePassengerField(index, 'main_address.postal_code', e.target.value)
              }
              placeholder={t('passenger.zip')}
            />
          </div>
        </div>
      )}
    </div>
  );
};
