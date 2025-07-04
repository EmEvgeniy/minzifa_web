import { destinations } from '@/assets/img';
import Image from 'next/image';
import React from 'react';
import { Wrapper } from './Wrapper';
import { DefaultComponentsProps } from '@/types';
import { getTranslations } from 'next-intl/server';

export default async function Destinations({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale, namespace: 'home' });

  const res = await fetch(
    `https://api.minzifatravel.com/api/v1/destinations?main_page=1&limit=12&page=1&perPage=12&locale=${locale}`,
    {
      next: { revalidate: 60 * 5 },
    },
  );
  const data = await res.json();

  return (
    <section className="relative w-full h-full min-h-[577px] mt-[70px] [@media(max-width:768px)]:mt-[30px]">
      <div
        className="absolute inset-0 z-10 pointer-events-none bg-[#16372D]"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 75%, black 90%)',
          maskImage: 'linear-gradient(to bottom, transparent 75%, black 90%)',
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      />
      <Image
        src={destinations || ''}
        alt="destinations"
        fill
        loading="lazy"
        className="absolute top-0 w-full h-full left-0 object-cover"
      />
      <div className="container pt-[70px] pb-[150px] relative z-20 flex flex-col gap-5">
        <h4 className="text-white text-[42px] [@media(max-width:768px)]:text-[24px] w-full">
          {t('destination_title')}
        </h4>
        <Wrapper data={data} locale={locale} />
      </div>
    </section>
  );
}
