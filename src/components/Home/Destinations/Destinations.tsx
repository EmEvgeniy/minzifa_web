import { destinations } from '@/assets/img';
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { apiGet } from '../../../utils/serverApi';
import { DestinationCard } from './_types';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';

const Wrapper = dynamic(() => import('./Wrapper'));

export default async function Destinations({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });

  const data = (await apiGet(`destinations?main_page=1&locale=${locale}`, {
    next: { revalidate: 60 * 5 },
  })) as DestinationCard[];

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
      <ImageWithFallback
        src={destinations || ''}
        alt="destinations"
        fill
        preload
        className="absolute top-0 w-full h-full left-0 object-cover"
      />
      <div className="container pt-[70px] pb-[150px] relative flex flex-col gap-5">
        <h4 className="text-white text-[42px] [@media(max-width:768px)]:text-[24px] w-full">
          {t('destinationTitle')}
        </h4>
        <Wrapper data={data} locale={locale} />
      </div>
    </section>
  );
}
