'use client';

import { memo } from 'react';
import { Controller, Control, FieldErrors, useWatch, UseFormSetValue } from 'react-hook-form';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';
import { SectionHeader } from './SectionHeader';
import { FormFieldWrapper } from '@/components/UI/Form';
import { TravellerCounter } from './TravellerCounter';
import { CustomDatepicker } from '@/components/UI/CustomDatepicker/CustomDatepicker';
import { CreateYourTripFormType } from '@/validation/createYourTripFormSchema';

interface PersonalInfoSectionProps {
    control: Control<CreateYourTripFormType>;
    errors: FieldErrors<CreateYourTripFormType>;
    setValue: UseFormSetValue<CreateYourTripFormType>;
    travellerTypes: string[];
    appealOptions: { title: string }[];
    t: (key: string) => string;
    lang: string;
}

export const PersonalInfoSection = memo(({
    control,
    errors,
    setValue,
    travellerTypes,
    appealOptions,
    t,
    lang,
}: PersonalInfoSectionProps) => {
    const watchedTravellersType = useWatch({ control, name: 'travellers_type' });
    const watchedAppeals = useWatch({ control, name: 'appeals' });

    return (
        <div className="bg-white/95 backdrop-blur-md w-full rounded-3xl shadow-xl p-6 md:p-8 text-[#16372D] relative z-40 flex flex-col gap-6 border border-white/20">

            <SectionHeader icon={FaUser} title={t('form2.aboutYou.title')} />

            {/* Traveller Type Select */}
            <div className="flex items-center justify-start gap-3 flex-wrap">
                {travellerTypes.map((type) => (
                    <button
                        key={type}
                        type="button"
                        className={`px-5 py-3 rounded-xl font-medium transition-all duration-300
                ${watchedTravellersType === type
                                ? 'bg-gradient-to-br from-[#27A430] to-[#1f8a26] text-white shadow-lg scale-[1.02]'
                                : 'bg-gray-100 text-[#16372D] hover:bg-gray-200 hover:scale-[1.01]'
                            }`}
                        onClick={() => setValue('travellers_type', type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Description for Traveller Type */}
            <p className="text-gray-500 text-sm -mt-2">
                {t('form2.aboutYou.description')}
            </p>

            {/* Show counter only for Family and Group */}
            {(watchedTravellersType === travellerTypes[2] || watchedTravellersType === travellerTypes[3]) && (
                <Controller
                    name="travellers"
                    control={control}
                    render={({ field }) => (
                        <TravellerCounter
                            adults={field.value.adults}
                            children={field.value.children}
                            onAdultsChange={(val) => field.onChange({ ...field.value, adults: val })}
                            onChildrenChange={(val) => field.onChange({ ...field.value, children: val })}
                            adultsLabel={t('form2.travellers.adults')}
                            childrenLabel={t('form2.travellers.children')}
                        />
                    )}
                />
            )}

            <hr className="border-gray-200" />

            {/* Preferred Travel Date */}
            <SectionHeader icon={FaCalendarAlt} title={t('form2.travelDate.title')} />
            <p className="text-gray-500 text-sm -mt-2">
                {t('form2.travelDate.description')}
            </p>
            <Controller
                name="date"
                control={control}
                render={({ field }) => (
                    <FormFieldWrapper error={!!errors.date}>
                        <CustomDatepicker
                            locale={lang}
                            selected={field.value ? new Date(field.value) : null}
                            onChange={(date: Date | null) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                            dateFormat="dd.MM.yyyy"
                            placeholderText={t('form2.travelDate.placeholder')}
                            startIcon={<FaCalendarAlt className="text-[#27A430]" size={18} />}
                            minDate={new Date()}
                            wrapperClassName="w-full"
                            className={`w-full pl-12 pr-4 py-6 bg-transparent rounded-2xl border shadow-sm outline-none text-base font-medium cursor-pointer transition-all ${errors.date ? 'border-red-500 bg-red-50/10' : 'border-gray-100 focus:border-[#27A430]'
                                }`}
                        />
                    </FormFieldWrapper>
                )}
            />

            <hr className="border-gray-200" />

            {/* Appeal Select */}
            <SectionHeader icon={FaUser} title={t('form2.appeal.title')} />
            <FormFieldWrapper error={!!errors.appeals}>
                <div className="w-full flex items-center justify-start gap-4 flex-wrap">
                    {appealOptions.map((el) => (
                        <label
                            key={el.title}
                            className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-xl transition-all duration-200
                    ${watchedAppeals === el.title
                                    ? 'bg-[#27A430]/10 border-2 border-[#27A430]'
                                    : errors.appeals ? 'bg-red-50/10 border-2 border-red-200' : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                                }`}
                        >
                            <input
                                type="radio"
                                name="appeals"
                                value={el.title}
                                checked={watchedAppeals === el.title}
                                onChange={() => setValue('appeals', el.title)}
                                className="w-5 h-5 text-[#27A430] focus:ring-[#27A430] accent-[#27A430]"
                            />
                            <span className="font-medium">{el.title}</span>
                        </label>
                    ))}
                </div>
            </FormFieldWrapper>
        </div>
    );
});

PersonalInfoSection.displayName = 'PersonalInfoSection';
