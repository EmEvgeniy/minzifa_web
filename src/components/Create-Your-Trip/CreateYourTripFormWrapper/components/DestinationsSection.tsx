'use client';

import { memo } from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { FaGlobeAmericas } from 'react-icons/fa';
import { SectionHeader } from './SectionHeader';
import { FormFieldWrapper } from '@/components/UI/Form';
import { DestinationsSelect } from './DestinationsSelect';
import { DestinationCard } from '@/components/Home/Destinations/_types';
import { CreateYourTripFormType } from '@/validation/createYourTripFormSchema';

interface DestinationsSectionProps {
    control: Control<CreateYourTripFormType>;
    errors: FieldErrors<CreateYourTripFormType>;
    destinations: DestinationCard[];
    isSuccess: boolean;
    t: (key: string) => string;
}

export const DestinationsSection = memo(({
    control,
    errors,
    destinations,
    isSuccess,
    t,
}: DestinationsSectionProps) => {
    return (
        <div className="flex flex-col gap-6">
            <SectionHeader icon={FaGlobeAmericas} title={t('form.destination.title')} />
            <p className="text-gray-500 -mt-4 text-sm md:text-base leading-relaxed max-w-2xl">
                {t('form.destination.text')}
            </p>

            {isSuccess && destinations && (
                <Controller
                    name="destinations"
                    control={control}
                    render={({ field }) => (
                        <FormFieldWrapper error={errors.destinations}>
                            <DestinationsSelect
                                destinations={destinations}
                                selectedDestinations={field.value}
                                onChange={field.onChange}
                            />
                        </FormFieldWrapper>
                    )}
                />
            )}
        </div>
    );
});

DestinationsSection.displayName = 'DestinationsSection';
