import { DestinationData } from '@/app/[locale]/(main)/destination/[slug]/_types';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { getTranslations } from 'next-intl/server';

export default async function Hero({
  destination,
  locale,
}: {
  destination: DestinationData;
  locale: string;
}) {
  const t = await getTranslations({ locale });

  return (
    <section className="min-h-[90svh] bg-[#16372D] w-full relative  items-center justify-center flex flex-col">
      <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
      {destination?.media?.file && (
        <ImageWithFallback
          src={destination?.media?.file}
          alt="bg"
          fill
          className=" object-cover absolute top-0"
        />
      )}
      <div className="container absolute z-30 top-35 max-[1024px]:top-25 w-full">
        <Breadcrumbs
          className="text-white place-self-start w-full"
          listClasses="text-white"
          locale={locale}
          link={{ link: `/${locale}/destination`, title: t('breadcrumbs.destination') }}
          link2={{ link: '', title: destination?.name }}
        />
      </div>
      <div className="relative z-30 container flex flex-col items-center justify-center gap-5 text-white">
        <div className="w-[100px] h-[100px] border-white border-dashed border-1 rounded-full p-3">
          {destination?.icon?.file && (
            <ImageWithFallback
              src={destination?.icon?.file}
              alt="icon"
              width={100}
              height={100}
              className="invert"
            />
          )}
        </div>
        <h1 className="text-[56px] font-title max-[1024px]:text-[35px] max-[550px]:text-[30px]">
          {destination?.name}
        </h1>
        <p className="text-[24px] max-w-[70%] text-center max-[1024px]:max-w-full max-[1024px]:text-[20]">
          {t('destination.sub_title')}
        </p>
      </div>
    </section>
  );
}
