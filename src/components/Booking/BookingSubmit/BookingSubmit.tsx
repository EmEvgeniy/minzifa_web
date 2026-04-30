'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Checkbox } from '@/components/UI/Form';
import Button from '@/components/UI/Button/Button';
import { useFormSubmit } from '@/hooks';
import Loader from '@/components/UI/Loader/Loader';

export default function BookingSubmit() {
    const t = useTranslations('booking');
    const tGlobal = useTranslations();
    const locale = useLocale();

    const { isSubmitting } = useFormSubmit();

    return (
        <div className="lg:hidden flex flex-col gap-4 mt-6">
            {/* Terms and conditions - Mobile */}
            <div className="text-sm border-b border-gray-200 pb-4">
                <Checkbox
                    label={tGlobal.rich('common.termsAcceptance', {
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
                    checked={true}
                    onChange={() => {}}
                    labelClassName='flex-wrap gap-x-1 text-sm text-gray-500'
                />
            </div>

            <Button
                form="booking-form"
                type="submit"
                className="w-full"
                disabled={isSubmitting}
            >
                {isSubmitting ? <Loader /> : <span>{t('button')}</span>}
            </Button>
        </div>
    );
}
