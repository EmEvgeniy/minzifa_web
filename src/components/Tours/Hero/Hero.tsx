import { allTours } from '@/assets/img';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { getTranslations } from 'next-intl/server';

export default async function Hero({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'allTours' });
  return (
    <section className="w-full min-h-[70svh] relative flex items-center justify-center [@media(max-width:1024px)]:min-h-[50svh]">
      <div className="w-full absolute top-0 h-full bg-[rgba(0,0,0,0.35)] z-20" />
      <ImageWithFallback
        src={allTours}
        alt="all_tours"
        fill
        priority
        className="absolute top-0 z-10 object-cover"
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
