'use client';

import { nf, person } from '@/assets/img';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function NotFoundContent() {
  const currentLocale = useLocale();
  const t = useTranslations('notFound');

  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-white pt-32 sm:pt-52">
      <div className="relative z-20 mx-auto flex w-full flex-col items-center justify-start flex-1 px-4 sm:px-6">
        <h1 className="text-8xl font-title sm:text-[180px] md:text-[220px] lg:text-[200px] font-black leading-[0.8] text-[#0F4A3F] animate-fadeIn">
          404
        </h1>

        <p className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl font-medium text-[#1D1D1D] animate-fadeIn animation-delay-100">
          {t('subtitle')}
        </p>

        <Link
          href={`/${currentLocale}`}
          className="mt-6 sm:mt-8 inline-flex items-center justify-center rounded-full bg-[#27A430] px-8 sm:px-12 md:px-16 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg font-semibold text-white no-underline hover:no-underline transition-all duration-300 hover:bg-[#208B28] active:scale-95 shadow-lg hover:shadow-xl"
        >
          {t('backButton')}
        </Link>

        <div className="relative w-full max-w-[1536px]">
          <ImageWithFallback
            src={nf}
            alt="404 background"
            className="pointer-events-none h-full w-full relative -bottom-[2px]"
          />

          <div className="absolute h-[300px] sm:h-auto -bottom-[150px] w-full flex justify-center">
            <ImageWithFallback
              src={person}
              alt="traveler with map"
              width={0}
              className="pointer-events-none w-auto object-contain"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>
    </section>
  );
}
