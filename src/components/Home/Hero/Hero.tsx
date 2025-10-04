import { DefaultComponentsProps } from '@/types';
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { getApiUrl } from '@/utils/config';
import { DestinationBlockProps } from '../Destinations/_types';
const HeroSearch = dynamic(() => import('./HeroSearch'));

export default async function Hero({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale });

  const data = (await fetch(getApiUrl(`destinations?all=1&locale=${locale}`), {
    next: { revalidate: 60 * 5 },
  }).then((res) => res.json())) as DestinationBlockProps[];

  return (
    <section className="w-full h-[80svh] relative flex items-center justify-center bg-[#16372D] [@media(max-width:1024px)]:h-[80vh] [@media(max-width:768px)]:h-screen">
      <div className="w-full absolute top-0 h-full bg-[rgba(0,0,0,0.35)] backdrop-blur-[1px] z-20" />
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/output.mp4" type="video/mp4" />
      </video>
      <div className="container relative z-30 text-white flex flex-col items-center justify-center gap-5 [@media(max-width:1024px)]:items-start">
        <h1 className="text-[48px] font-semibold text-center [@media(max-width:1024px)]:text-[34px] [@media(max-width:1024px)]:text-left font-title">
          {t('home.title')}
        </h1>
        <p className="max-w-[50%] text-center text-[18px] font-light [@media(max-width:1024px)]:text-[15px] [@media(max-width:1024px)]:max-w-full [@media(max-width:1024px)]:text-left">
          {t('home.subTitle')}
        </p>
        <HeroSearch data={data} locale={locale} pl={t('search')} />
      </div>
    </section>
  );
}
