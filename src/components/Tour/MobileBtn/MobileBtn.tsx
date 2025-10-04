import { FormattedPrice } from '@/components/UI/FormattedPrice/FormattedPrice';
import Link from 'next/link';
import { Tour } from '../_types';
import { getTranslations } from 'next-intl/server';

export default async function MobileBtn({ locale, tour }: { locale: string; tour: Tour }) {
  const t = await getTranslations({ locale, namespace: 'Tour' });

  return (
    <div className="container  bg-[#16372D] sticky bottom-0 z-50 text-white py-5 w-full hidden items-center justify-between max-[920px]:flex gap-5">
      <div className="text-base w-full flex flex-col">
        {t('prices.pp')}{' '}
        <FormattedPrice
          price={
            tour?.prices?.price_for_3_hotels ||
            tour?.prices?.price_for_4_hotels ||
            tour?.prices?.price_for_5_hotels ||
            0
          }
          currency={tour?.prices?.valute || 'UZS'}
          className="text-[16px] font-semibold"
          as={'span'}
        />
      </div>
      <Link
        href={`/${locale}/booking/${tour?.slug}`}
        className="text-center w-full rounded-4xl bg-[#27A430] text-white px-4 py-2 max-w-[150px] cursor-pointer transition-all duration-300 hover:bg-[#208B28]"
      >
        {t('booking.button', { count: 1 })}
      </Link>
    </div>
  );
}
