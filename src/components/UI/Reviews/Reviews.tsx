'use client';

import { useTranslations } from 'next-intl';
import { info } from '@/assets/img';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export const Reviews = () => {
  const t = useTranslations('reviews');
  const pathname = usePathname();

  const rating = 5.0;
  const fullStars = Math.floor(rating);
  const starsArray = Array.from({ length: 5 }, (_, i) => (
    <FaStar
      key={i}
      size={27}
      className={
        i < fullStars ? 'text-[#009F65] max-[1024px]:size-4' : 'text-[#ccc] max-[1024px]:size-4'
      }
    />
  ));

  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = 'trustindex-script';
    const oldScript = document.getElementById(scriptId);
    if (oldScript) {
      oldScript.remove();
    }
    if (widgetRef.current) {
      widgetRef.current.innerHTML = '';
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?9148d5a459d5117735065c57433';
    script.async = true;
    script.defer = true;
    script.setAttribute('data-trustindex', 'true');
    script.id = scriptId;

    widgetRef.current?.appendChild(script);
  }, [pathname]);

  return (
    <section className="relative container">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <div>
          <h2
            className="text-4xl font-semibold mb-4 max-[1024px]:text-[35px] max-[550px]:text-[24px]"
            aria-label={t('title')}
          >
            {t('title')}
          </h2>
          <div className="flex flex-row items-center gap-5">
            <p className="font-title text-[56px] max-[1024px]:text-[35px] max-[768px]:text-[30px]">
              {rating.toFixed(1)}
            </p>
            <div>
              <div className="flex flex-row gap-3">{starsArray}</div>
              <div className="text-2xl text-[#666666] font-normal max-[1024px]:text-[20px]">
                {t('count', { count: 456 })}
              </div>
            </div>
          </div>
        </div>
        <Image src={info} alt="info_img" width={611} height={97} className="object-cover" />
      </div>

      <div ref={widgetRef} className="mt-10 w-full" />
    </section>
  );
};
