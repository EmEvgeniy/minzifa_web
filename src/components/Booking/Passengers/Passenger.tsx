'use client';

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { PhoneInputComp } from '@/components/UI';
import { Input } from '@/components/UI/Form';
import { CustomDatepicker } from '@/components/UI/CustomDatepicker/CustomDatepicker';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import IconInfo from '../../../assets/icons/booking/exclamationmark.circle.svg';
import { RadioGroup } from '@/components/UI/Form/Radio/RadioGroup';
import { Control } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form';
import { BookingFormType } from '@/validation/bookingFormSchema';
import { Controller } from 'react-hook-form';

interface IPassengerProps {
  bookingData: BookingFormType;
  index: number;
  hints: string[];
  errors: FieldErrors<BookingFormType>;
  control: Control<BookingFormType>;
}

const salutations: string[] = ['Mr.', 'Ms.', 'Mrs.', 'Miss'];

const genders: { [key: string]: string[] } = {
  en: ['Male', 'Female'],
  ru: ['Мужчина', 'Женщина'],
};

const genderOptions: { [key: string]: { label: string; value: string }[] } = {
  en: genders.en.map(gender => ({ label: gender, value: gender })),
  ru: genders.ru.map(gender => ({ label: gender, value: gender })),
};

const InfoHints = ({ hints }: { hints: string[] }) => (
  <div className="bg-[#C5DCD3]/50 rounded-2xl px-2.5 py-5 flex flex-row items-center gap-2 max-[768px]:text-[12px]">
    <div className="w-[30px] h-[30px] flex items-center justify-center text-blue-600">
      <ImageWithFallback
        width={100}
        height={100}
        src={IconInfo}
        alt="Minzifa Travel"
        className="w-full h-full object-contain"
      />
    </div>
    {hints?.map((el) => (
      <p key={el}>{el}</p>
    ))}
  </div>
);

export const Passenger = ({ index, hints, errors, control }: IPassengerProps) => {
  const locale = useLocale();
  const t = useTranslations('booking');

  return (
    <div className="space-y-6">
      <InfoHints hints={hints} />

      {/* Personal Information section */}
      <div className="space-y-4">
        {/* Salutation */}
        {locale === 'en' && (
          <div>
            <Controller
              name={`passengers.${index}.salutation`}
              control={control}
              render={({ field }) => (
                <RadioGroup
                  error={!!errors.passengers?.[index]?.salutation}
                  direction="horizontal"
                  name={`salutation_${index}`}
                  value={field.value ?? ''}
                  options={salutations.map(sal => ({ label: sal, value: sal }))}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        )}

        {/* Name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            name={`passengers.${index}.first_name`}
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                {...field}
                placeholder={t('passenger.first_name')}
                error={!!errors.passengers?.[index]?.first_name}
              />
            )}
          />
          <Controller
            name={`passengers.${index}.last_name`}
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                {...field}
                placeholder={t('passenger.last_name')}
                error={!!errors.passengers?.[index]?.last_name}
              />
            )}
          />
        </div>

        {/* Email и Phone */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            name={`passengers.${index}.email`}
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                {...field}
                placeholder={t('passenger.email')}
                error={!!errors.passengers?.[index]?.email}
              />
            )}
          />
          <Controller
            name={`passengers.${index}.phone`}
            control={control}
            render={({ field }) => (
              <PhoneInputComp
                {...field}
                error={!!errors.passengers?.[index]?.phone}
              />
            )}
          />
        </div>

        {/* Date of Birth */}
        <div>
          <Controller
            name={`passengers.${index}.birth_date`}
            control={control}
            render={({ field }) => (
              <CustomDatepicker
                locale={locale}
                selected={field.value ? (typeof field.value === 'string' ? new Date(field.value) : field.value) : undefined}
                onChange={(date: Date | null) => field.onChange(date)}
                placeholderText={`${t('passenger.date_of_birth')}`}
                className="w-full"
                dateFormat={locale === 'en' ? 'yyyy-MM-dd' : 'dd.MM.yyyy'}
                showMonthDropdown
                showYearDropdown
                maxDate={new Date()}
                dropdownMode="select"
                customInput={<Input
                  error={!!errors.passengers?.[index]?.birth_date}
                />}
              />
            )}
          />
        </div>

        {/* Gender */}
        <div>
          <Controller
            name={`passengers.${index}.gender`}
            control={control}
            render={({ field }) => (
              <RadioGroup
                error={!!errors.passengers?.[index]?.gender}
                direction="horizontal"
                name={`gender_${index}`}
                value={field.value}
                options={genderOptions[locale]}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      {index === 0 && <hr className="border-[#16372D]/20" />}

      {/* Address Information section */}
      {index === 0 && (
        <>
          <div className="block text-sm font-medium text-gray-700">{t('passenger.adress')}</div>
          <div className="mt-2 space-y-4">
            {/* Street Address */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Controller
                name={`passengers.${index}.main_address.address`}
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    {...field}
                    placeholder={t('passenger.adress_line', { number: 1 })}
                    error={!!errors.passengers?.[index]?.main_address?.address}
                  />
                )}
              />
              <Controller
                name={`passengers.${index}.main_address.address2`}
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    {...field}
                    placeholder={t('passenger.adress_line', { number: 2 })}
                    error={!!errors.passengers?.[index]?.main_address?.address2}
                  />
                )}
              />
            </div>

            {/* City, State/Province, Postal Code */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Controller
                name={`passengers.${index}.main_address.province`}
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    {...field}
                    placeholder={t('passenger.province')}
                    error={!!errors.passengers?.[index]?.main_address?.province}
                  />
                )}
              />
              <Controller
                name={`passengers.${index}.main_address.state`}
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    {...field}
                    placeholder={t('passenger.state')}
                    error={!!errors.passengers?.[index]?.main_address?.state}
                  />
                )}
              />
            </div>
            <Controller
              name={`passengers.${index}.main_address.postal_code`}
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  {...field}
                  placeholder={t('passenger.zip')}
                  error={!!errors.passengers?.[index]?.main_address?.postal_code}
                />
              )}
            />
          </div>
        </>
      )}
    </div>
  );
};
