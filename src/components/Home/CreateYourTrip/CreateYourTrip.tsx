import { cyt } from '@/assets/img';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function CreateYourTrip({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <section className="w-full relative">
      <div className="absolute inset-0 bg-[#16372DB2] w-full h-full opacity-70 z-10" />
      <ImageWithFallback
        src={cyt}
        alt="create_your_trip"
        fill
        loading="lazy"
        className="absolute top-0 w-full object-cover z-0"
      />
      <div className="container py-[188px] relative z-20 text-white flex flex-col items-center justify-center gap-5 [@media(max-width:768px)]:py-[90px]">
        <h6 className="text-[42px] [@media(max-width:768px)]:text-[24px] font-semibold">
          {t('createYourTripTitle')}
        </h6>
        <p className="text-[16px] max-w-[50%] text-center [@media(max-width:768px)]:max-w-full">
          {t('createYourTripSubTitle')}
        </p>
        <Link
          className="bg-[#27A430] hover:bg-[#208B28] transition-all  text-white text-center py-[20px] text-[16px] rounded-[16px] shadow-2xl mt-[20px] w-full max-w-[420px] [@media(max-width:768px)]:py-[10px]"
          href={`/${locale}/create-your-trip`}
        >
          {t('createYourTripBtn')}
        </Link>
      </div>
    </section>
  );
}
