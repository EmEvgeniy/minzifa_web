'use client';

import { memo } from 'react';
import { Controller, Control, FieldErrors, useWatch } from 'react-hook-form';
import { FaCalendarAlt, FaHotel } from 'react-icons/fa';
import { SectionHeader } from './SectionHeader';
import { FormFieldWrapper } from '@/components/UI/Form';
import { HotelStarsSelect } from './HotelStarsSelect';
import { SuggestedTours } from './SuggestedTours';
import { CreateYourTripFormType } from '@/validation/createYourTripFormSchema';

interface TripBasicsSectionProps {
    control: Control<CreateYourTripFormType>;
    errors: FieldErrors<CreateYourTripFormType>;
    hotelOptions: { value: string; label: string; stars?: number }[];
    t: (key: string) => string;
    lang: string;
    onCustomTourToggle: () => void;
}

export const TripBasicsSection = memo(({
    control,
    errors,
    hotelOptions,
    t,
    lang,
    onCustomTourToggle,
}: TripBasicsSectionProps) => {
    // Isolated watch using useWatch to prevent sectional re-renders unless these values change
    const destinations = useWatch({ control, name: 'destinations' }) || [];
    const days = useWatch({ control, name: 'days' });
    const hotelType = useWatch({ control, name: 'hotel_type' }) || '';

    return (
        <>
            <div className="flex flex-col gap-6">
                {/* Days Section */}
                <div className="flex flex-col gap-6">
                    <SectionHeader icon={FaCalendarAlt} title={t('form.days.title')} />
                    <p className="text-gray-500 -mt-4 text-sm leading-relaxed">{t('form.days.text')}</p>

                    <div className="w-full">
                        <Controller
                            name="days"
                            control={control}
                            render={({ field }) => (
                                <FormFieldWrapper error={!!errors.days}>
                                    <div className="relative group">
                                        <input
                                            {...field}
                                            type="number"
                                            min="1"
                                            max="60"
                                            placeholder={t('form.days.placeholder')}
                                            className={`w-full px-5 py-4 bg-white rounded-2xl border-2 outline-none text-sm font-bold text-[#16372D] focus:bg-white focus:ring-4 focus:ring-[#27A430]/10 transition-all shadow-sm ${errors.days ? 'border-red-500 bg-red-50/10' : 'border-transparent focus:border-[#27A430]'
                                                }`}
                                            onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                                        />
                                    </div>
                                </FormFieldWrapper>
                            )}
                        />
                    </div>
                </div>

                {/* Hotel Selection Section */}
                <div className="flex flex-col gap-6">
                    <SectionHeader icon={FaHotel} title={t('form.hotel.title')} />
                    <p className="text-gray-500 -mt-4 text-sm leading-relaxed">{t('form.hotel.text')}</p>

                    <Controller
                        name="hotel_type"
                        control={control}
                        render={({ field }) => (
                            <FormFieldWrapper error={!!errors.hotel_type}>
                                <HotelStarsSelect
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={hotelOptions}
                                />
                            </FormFieldWrapper>
                        )}
                    />
                </div>
            </div>

            {/* Suggested Tours */}
            <div className="flex flex-col gap-6">
                <SuggestedTours
                    destinations={destinations}
                    days={days}
                    hotelType={hotelType}
                    locale={lang}
                    onRequestCustomTour={onCustomTourToggle}
                />
            </div>
        </>
    );
});

TripBasicsSection.displayName = 'TripBasicsSection';
