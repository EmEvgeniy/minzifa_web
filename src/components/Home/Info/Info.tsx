import { tripadvisor_mobile } from '@/assets/icons';
import { TravelChoice_Black, lr } from '@/assets/img';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { getTranslations } from 'next-intl/server';

export default async function Info({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <section className="container">
      <div className="flex flex-col items-center justify-center gap-5 text-center px-[172px] my-[70px] [@media(max-width:1024px)]:my-[30px] bg-[#16372D1A] backdrop-blur-[3px]  py-[39px] rounded-[16px] [@media(max-width:1024px)]:px-[20px] relative w-full overflow-hidden">
        <ImageWithFallback
          src={lr}
          alt="lr"
          width={500}
          height={500}
          loading="lazy"
          className="w-auto h-full absolute top-0 -left-1/2 pointer-events-none block object-cover [@media(max-width:768px)]:hidden"
        />
        <ImageWithFallback
          src={lr}
          alt="lr"
          width={500}
          height={500}
          loading="lazy"
          className="w-auto h-full absolute bottom-0 -right-1/2 rotate-180 pointer-events-none block object-cover [@media(max-width:768px)]:hidden"
        />
        <h2 className="z-10 text-[42px] text-center max-w-full [@media(max-width:1024px)]:text-[24px] [@media(max-width:1024px)]:text-left">
          {t('info_title')}
        </h2>
        <p className="z-10 text-[18px] [@media(max-width:1024px)]:text-[16px] [@media(max-width:1024px)]:text-left">
          {t('info_text')}
        </p>
        <ImageWithFallback
          src={TravelChoice_Black}
          alt="info_img"
          loading="lazy"
          width={611}
          height={97}
          className="object-cover block [@media(max-width:768px)]:hidden"
        />
        <ImageWithFallback
          src={tripadvisor_mobile}
          alt="info_img"
          width={250}
          height={97}
          loading="lazy"
          className="object-cover hidden [@media(max-width:768px)]:block"
        />
      </div>
    </section>
  );
}
