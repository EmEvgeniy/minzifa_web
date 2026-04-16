'use client';

import { useTranslations } from 'next-intl';
import { Control, useWatch, UseFormRegister } from 'react-hook-form';
import { Radio } from '@/components/UI/Form/Radio/Radio';
import { BookingFormType } from '@/validation/bookingFormSchema';
import { HiOutlineBuildingLibrary, HiOutlineBanknotes, HiOutlineCreditCard } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/utils';

interface PaymentMethodSelectorProps {
    control: Control<BookingFormType>;
    register: UseFormRegister<BookingFormType>;
}

export const PaymentMethodSelector = ({ control, register }: PaymentMethodSelectorProps) => {
    const t = useTranslations('booking.paymentMethod');
    const paymentMethod = useWatch({
        control,
        name: 'payment_method',
    });
    const paymentOption = useWatch({
        control,
        name: 'payment_option',
    });

    const methods = [
        {
            id: 'bank_transfer',
            label: t('bank_transfer'),
            icon: HiOutlineBuildingLibrary,
            value: 'bank_transfer'
        },
        {
            id: 'cash',
            label: t('cash'),
            icon: HiOutlineBanknotes,
            value: 'cash'
        },
        {
            id: 'payworld',
            label: t('online'),
            icon: HiOutlineCreditCard,
            value: 'payworld'
        }
    ];

    return (
        <div className="flex flex-col gap-6 w-full">
            <h2 className="text-[#16372D] text-4xl max-[768px]:text-[24px] max-[768px]:text-center">
                {t('title')}
            </h2>

            <div className="relative p-1.5 bg-gray-100/50 rounded-2xl flex flex-col md:flex-row gap-1">
                {methods.map((method) => {
                    const isActive = paymentMethod === method.value;
                    const Icon = method.icon;

                    return (
                        <label
                            key={method.id}
                            className={cn(
                                "relative flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl cursor-pointer transition-colors z-10",
                                isActive ? "text-[#16372D]" : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            <input
                                {...register('payment_method')}
                                type="radio"
                                value={method.value}
                                className="sr-only"
                            />

                            {isActive && (
                                <motion.div
                                    layoutId="payment-method-slider"
                                    className="absolute inset-0 bg-white shadow-sm rounded-xl z-[-1] border border-gray-100"
                                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                />
                            )}

                            <Icon size={22} className={cn("shrink-0", isActive ? "text-[#27A430]" : "text-gray-400")} />
                            <span className="font-semibold text-base whitespace-nowrap">
                                {method.label}
                            </span>
                        </label>
                    );
                })}
            </div>

            {/* Online Payment Options */}
            <AnimatePresence>
                {paymentMethod === 'payworld' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="w-full"
                    >
                        <div className="flex flex-col gap-5 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <p className="text-lg font-bold text-[#16372D]">{t('online_options.title')}</p>
                            <div className="flex flex-wrap gap-8">
                                <Radio
                                    {...register('payment_option')}
                                    value="deposit"
                                    label={t('online_options.deposit')}
                                    checked={paymentOption === 'deposit'}
                                    labelClassName="text-lg font-normal"
                                />
                                <Radio
                                    {...register('payment_option')}
                                    value="full"
                                    label={t('online_options.full')}
                                    checked={paymentOption === 'full'}
                                    labelClassName="text-lg font-normal"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
