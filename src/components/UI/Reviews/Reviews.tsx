'use client';

import { FaTripadvisor } from 'react-icons/fa';
import ReviewsInner from './ReviewsInner';
import { FcGoogle } from 'react-icons/fc';
import { cn } from '@/utils';
import { useTranslations } from 'next-intl';

export default function Reviews() {
  const t = useTranslations('home.reviews');

  return (
    <section className={cn('container px-2.5 mb-[65px]', 'md:mb-[112px] md:mx-auto')}>
      <div
        className={cn(
          'bg-white px-4 py-6 rounded-3xl flex flex-col gap-4 shadow-[0_0_32px_0_#B9B9B940]',
          'md:bg-transparent md:shadow-none md:p-0 md:rounded-none md:gap-8',
        )}
      >
        <div className={cn('flex justify-between flex-col', 'md:flex-row')}>
          <div className="w-full md:max-w-[579px]">
            <h4 className="text-foreground text-[32px] font-title font-bold [@media(max-width:768px)]:text-[24px] w-full max-w-[300px]">
              {t('title')}
            </h4>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <p className="font-title text-[72px] text-primary font-bold leading-100 tracking-[-8%]">
              {'5.0'}
            </p>

            <div className="flex flex-row gap-3">
              <div className="font-title font-medium text-base leading-100 tracking-[-2%] flex flex-row items-center gap-2">
                <FaTripadvisor size={28} />
                {t('count', { count: 479 })}
              </div>

              <div className="font-title font-medium text-base leading-100 tracking-[-2%] flex flex-row items-center gap-2">
                <FcGoogle size={24} />
                {t('count', { count: 29 })}
              </div>
            </div>
          </div>
        </div>

        <ReviewsInner />
      </div>
    </section>
  );
}
