'use client';

import { useTranslations } from 'next-intl';
import { info } from '@/assets/img';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';
import { useEffect, useRef } from 'react';

export const Reviews = () => {
  const t = useTranslations('reviews');

  const rating = 4.9;
  const fullStars = Math.floor(rating);
  const starsArray = Array.from({ length: 5 }, (_, i) => (
    <FaStar key={i} size={27} className={i < fullStars ? 'text-[#009F65]' : 'text-[#ccc]'} />
  ));

  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.querySelector('script[data-trustindex]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.trustindex.io/loader.js?9148d5a459d5117735065c57433';
      script.async = true;
      script.defer = true;
      script.setAttribute('data-trustindex', 'true');
      widgetRef.current?.appendChild(script);
    }
  }, []);

  return (
    <section className="relative container">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-4xl font-semibold mb-4" aria-label={t('title')}>
            {t('title')}
          </h2>
          <div className="flex flex-row items-center gap-5">
            <p className="font-title text-[56px]">4.9</p>
            <div>
              <div className="flex flex-row gap-3">{starsArray}</div>
              <div className="text-2xl text-[#666666] font-normal">
                {t('count', { count: 400 })}
              </div>
            </div>
          </div>
        </div>
        <Image src={info} alt="info_img" width={611} height={97} className="object-cover" />
      </div>
      <div ref={widgetRef} className="mt-10 w-full " />
    </section>
  );
};
