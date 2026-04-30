'use client';

import { memo } from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { FaEnvelope, FaUser, FaFlag } from 'react-icons/fa';
import { SectionHeader } from './SectionHeader';
import { Input, Textarea } from '@/components/UI/Form';
import { PhoneInputComp } from '@/components/UI';
import { CreateYourTripFormType } from '@/validation/createYourTripFormSchema';

interface ContactSectionProps {
    control: Control<CreateYourTripFormType>;
    errors: FieldErrors<CreateYourTripFormType>;
    t: (key: string) => string;
}

export const ContactSection = memo(({
    control,
    errors,
    t,
}: ContactSectionProps) => {
    return (
        <div className="bg-white/95 backdrop-blur-md w-full rounded-3xl shadow-xl p-6 md:p-8 text-[#16372D] relative z-40 flex flex-col gap-6 border border-white/20">
            {/* Contact Information */}
            <SectionHeader icon={FaEnvelope} title={t('form2.contact.title')} />
            <p className="text-gray-500 text-sm -mt-2">
                {t('form2.contact.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                    name="first_name"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            error={!!errors.first_name}
                            placeholder={t('form2.contact.firstName')}
                            startIcon={<FaUser size={16} />}
                        />
                    )}
                />
                <Controller
                    name="last_name"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            error={!!errors.last_name}
                            placeholder={t('form2.contact.lastName')}
                            startIcon={<FaUser size={16} />}
                        />
                    )}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="email"
                            error={!!errors.email}
                            placeholder={t('form2.contact.email')}
                            startIcon={<FaEnvelope size={16} />}
                        />
                    )}
                />
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <PhoneInputComp
                            {...field}
                            error={!!errors.phone}
                        />
                    )}
                />
            </div>

            <Controller
                name="nationality"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        placeholder={t('form2.contact.nationality')}
                        startIcon={<FaFlag size={16} />}
                    />
                )}
            />

            {/* Wishes */}
            <Controller
                name="wishes"
                control={control}
                render={({ field }) => (
                    <Textarea
                        label={t('form.wishes.label')}
                        placeholder={t('form.wishes.placeholder')}
                        rows={4}
                        {...field}
                    />
                )}
            />
        </div>
    );
});

ContactSection.displayName = 'ContactSection';
