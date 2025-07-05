import { tripadvisor_mobile } from '@/assets/icons';
import { info, lr } from '@/assets/img';
import { DefaultComponentsProps } from '@/types';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function Info({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <section className="container">
      <div className="flex flex-col items-center justify-center gap-5 text-center px-[172px] my-[70px] [@media(max-width:1024px)]:my-[30px] bg-[#16372D1A] backdrop-blur-[3px]  py-[39px] rounded-[16px] [@media(max-width:1024px)]:px-[20px] relative w-full overflow-hidden">
        <Image
          src={lr}
          alt="lr"
          width={500}
          loading="lazy"
          height={500}
          className="absolute top-0 left-[-300px] z-10 max-w-[100%] h-full pointer-events-none block object-cover [@media(max-width:768px)]:hidden"
        />
        <Image
          src={lr}
          alt="lr"
          width={500}
          loading="lazy"
          height={500}
          className="absolute top-0 right-[-300px] z-10 rotate-180 max-w-[100%] h-full pointer-events-none block object-cover [@media(max-width:768px)]:hidden"
        />
        <h2 className="text-[42px] text-center max-w-full [@media(max-width:1024px)]:text-[24px] [@media(max-width:1024px)]:text-left">
          {t('info_title')}
        </h2>
        <p className="text-[18px] [@media(max-width:1024px)]:text-[16px] [@media(max-width:1024px)]:text-left">
          {t('info_text')}
        </p>
        <Image
          src={info}
          alt="info_img"
          loading="lazy"
          width={611}
          height={97}
          className="object-cover block [@media(max-width:768px)]:hidden"
        />
        <Image
          src={tripadvisor_mobile}
          alt="info_img"
          width={250}
          loading="lazy"
          height={97}
          className="object-cover hidden [@media(max-width:768px)]:block"
        />
      </div>
    </section>
  );
}
