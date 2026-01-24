'use client';

import { PhoneInputComp } from '@/components/UI';
import Button from '@/components/UI/Button/Button';
import { Checkbox, Input, Textarea } from "@/components/UI/Form";
import { useChatPopup } from '@/hooks/useChatPopup';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Controller } from 'react-hook-form';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import Loader from '../UI/Loader/Loader';

export const ChatPopup = () => {
    const t = useTranslations();
    const locale = useLocale();
    const {
        isOpen,
        setIsOpen,
        register,
        handleSubmit,
        errors,
        control,
        onSubmit,
        isAuthenticated,
        token,
        handleRecaptcha,
        isSubmitting,
    } = useChatPopup();

    if (!isOpen) {
        return (
            <div className="fixed bottom-24 right-2 md:bottom-8 md:right-8 z-40">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-br from-[#27A430] to-[#44DB4E] hover:from-[#1b7521] hover:to-[#31a039] text-white rounded-full p-5 md:p-3 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl cursor-pointer"
                >
                    <IoChatbubbleEllipses size={30} className="w-6 h-6 md:w-6 md:h-6" />
                </button>
            </div>
        );
    }

    return (
        <div className="fixed bottom-24 right-4 md:bottom-8 md:right-20 z-40">
            <div
                className="bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-2xl w-[calc(100vw-2rem)] h-[calc(100vh-8rem)] md:w-[420px] md:h-[600px] flex flex-col overflow-hidden">
                {/* Header */}
                <div
                    className="bg-gradient-to-r from-[#16372d] via-[#1a3d32] to-[#16372d] text-white p-4 md:p-6 rounded-t-2xl flex items-center justify-between shadow-lg">
                    <div className="flex items-center space-x-2 md:space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <h3 className="font-bold text-base md:text-lg">
                            {t('chatPopup.formTitle')}
                        </h3>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:text-gray-300 transition-colors duration-200 p-1 rounded-full hover:bg-white/10 cursor-pointer"
                    >
                        <MdClose size={20} className="md:w-6 md:h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
                    <div className="p-4 md:p-6 h-full overflow-y-auto">
                        <div className="mb-4 md:mb-6">
                            <h4 className="text-gray-700 font-semibold text-sm mb-2">
                                {t('chatPopup.formSubtitle')}
                            </h4>
                            <p className="text-gray-500 text-xs">{t('chatPopup.formDescription')}</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                            {/* Name */}
                            <Input
                                type="text"
                                {...register('name')}
                                placeholder={t('chatPopup.namePlaceholder')}
                                disabled={isAuthenticated}
                                error={errors?.name}
                            />

                            {/* Email */}
                            <Input
                                type="email"
                                {...register('email')}
                                placeholder={t('chatPopup.emailPlaceholder')}
                                disabled={isAuthenticated}
                                error={errors?.email}
                            />

                            {/* Phone */}
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => (
                                    <PhoneInputComp
                                        {...field}
                                        error={errors?.phone}
                                    />
                                )}
                            />

                            {/* Message */}
                            <Textarea
                                {...register('message')}
                                placeholder={t('chatPopup.messagePlaceholder')}
                                rows={4}
                                error={errors?.message}
                            />

                            <Checkbox
                                label={t.rich('common.termsAcceptance', {
                                    terms: (chunks) => (
                                        <Link
                                            href={`/${locale}/term-and-conditions-of-booking-tours`}
                                            className="text-[#009F65] hover:underline"
                                            target='_blank'
                                        >
                                            {chunks}
                                        </Link>
                                    ),
                                    privacy: (chunks) => (
                                        <Link href={`/${locale}/privacy-policy`} className="text-[#009F65] hover:underline" target='_blank'>
                                            {chunks}
                                        </Link>
                                    ),
                                })}
                                checked={!!token}
                                onChange={() => handleRecaptcha()}
                                labelClassName='flex-wrap gap-x-1 text-sm text-gray-500 hover:text-gray-700'
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting || !token}
                            >
                                {isSubmitting ? <Loader /> : t('auth.register.createAccount')}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
