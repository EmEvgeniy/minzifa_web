'use client';

import FormattedPrice from '@/components/UI/FormattedPrice/FormattedPrice';
import { BookingFormType } from '@/validation/bookingFormSchema';
import { useTranslations } from 'next-intl';

type MobileStickyPriceProps = {
    bookingData: BookingFormType;
};

export default function MobileStickyPrice({ bookingData }: MobileStickyPriceProps) {
    const t = useTranslations('booking');

    return (
        <div className="sticky bottom-0 bg-[#16372D] max-[1024px]:block hidden z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="container flex items-center justify-between p-5 text-white gap-5">
                <div className="flex justify-start items-start w-full flex-col">
                    <span className="text-[14px] text-gray-400">
                        {t('bookingInfo.total')} (USD)
                    </span>
                    <FormattedPrice
                        price={bookingData?.total_price}
                        currency={bookingData?.currency}
                        className="text-xl"
                    />
                </div>
            </div>
        </div>
    );
}
