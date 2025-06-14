'use client';

import Image from 'next/image';
import Banner from '../../../assets/img/FreeConBanner.jpg';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { cn } from '@/utils/utils';

export const FreeConsultationForm = ({ className }: { className?: string }) => {
  const t = useTranslations('FreeForm');
  const locale = useLocale();

  return (
    <form
      className={cn(
        className,
        'bg-[#16372D] w-full h-full rounded-2xl overflow-hidden my-[70px] max-[768px]:my-[40px]',
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="relative w-full h-full block max-[768px]:hidden">
          <div
            className="absolute inset-0 z-10 pointer-events-none bg-[#16372D]"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 75%, black 90%)',
              maskImage: 'linear-gradient(to right, transparent 75%, black 90%)',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
          />
          <Image
            src={Banner}
            quality={100}
            width={585}
            height={536}
            alt={'Minzifa Travel'}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-5 w-full max-w-[434px] mx-auto my-8 p-5 max-[768px]:max-w-full max-[768px]:gap-8">
          <h2 className="text-4xl font-semibold text-white max-[768px]:text-[35px] max-[550px]:text-[24px] max-[550px]:text-center">
            {t('title')}
          </h2>
          <input
            type="text"
            className="bg-white w-full text-black rounded-2xl py-[18px] px-2.5 max-[768px]:py-2 max-[768px]:text-[16px]"
            placeholder={t('name')}
          />
          <input
            type="text"
            className="bg-white w-full text-black rounded-2xl py-[18px] px-2.5 max-[768px]:py-2 max-[768px]:text-[16px]"
            placeholder={t('email')}
          />
          <textarea
            name=""
            id=""
            className="bg-white w-full min-h-[145px] text-black rounded-2xl py-[18px] px-2.5 max-[768px]:py-2 max-[768px]:text-[16px]"
            placeholder={t('wishes')}
          ></textarea>
          <button className="bg-[#27A430] text-white font-semibold text-base rounded-2xl py-4 max-[768px]:py-2 max-[768px]:text-[16px]">
            {t('button')}
          </button>
          <div className="flex flex-row gap-2 mx-auto  max-[768px]:text-[16px]">
            <input type="checkbox" id="checkbox" />
            <label htmlFor={'checkbox'} className="text-white text-base font-normal">
              {t('checkbox.0')}{' '}
              <Link href={`/${locale}/privacy-policy`} className="text-[#27A430]">
                {t('checkbox.1')}
              </Link>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};
