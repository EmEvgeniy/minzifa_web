import { allTours } from '@/assets/img';
import { DefaultComponentsProps } from '@/types';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function Hero({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale, namespace: 'all_tours' });
  return (
    <section className="w-full min-h-[70svh] relative flex items-center justify-center [@media(max-width:1024px)]:min-h-[50svh]">
      <div className="w-full absolute top-0 h-full bg-[rgba(0,0,0,0.35)] z-20" />
      <Image
        src={allTours}
        alt="all_tours"
        fill
        className="absolute top-0 z-10 object-cover"
        loading="lazy"
      />
      <div className="container relative z-30 h-full">
        <div className="text-white flex items-center justify-center w-full h-full">
          <h1 className="text-[56px] [@media(max-width:1024px)]:text-[32px] font-title">
            {t('title')}
          </h1>
        </div>
      </div>
    </section>
  );
}
