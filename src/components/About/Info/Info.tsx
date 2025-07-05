import { destination } from '@/assets/img';
import { DefaultComponentsProps } from '@/types';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function Info({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale, namespace: 'about' });
  const statistic = t.raw('statistic') as { title: string; text: string }[];

  return (
    <section className="container py-[48px] flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-4 max-[1024px]:grid-cols-1 ">
        <div className="md:col-span-1 text-[#16372D]">
          <h1 className="text-custom-green-900 mb-8 text-[52px] leading-tight tracking-tight  max-[1024px]:text-[35px] max-[768px]:text-[24px] max-[768px]:font-semibold">
            {t('title_2')}
          </h1>
          <p className="text-custom-green-900 mb-6 text-lg flex flex-col gap-2 max-[768px]:text-[18px]">
            <span>{t('text_2')}</span>
            <span className="w-full h-[0.5px] bg-black" />
            <span>{t('text_3')}</span>
          </p>
        </div>
        <div className="sm:col-span-1 sm:mt-0 rounded-[16px] overflow-hidden">
          <Image
            className="rounded-one-six aspect-[4/3] w-full"
            src={destination}
            alt="peripherals"
            loading="lazy"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-8 max-[768px]:grid-cols-2 max-[550px]:grid-cols-1">
        {statistic.map((el, i) => (
          <div
            key={i}
            className={`${
              i <= 2 && 'border-r-[1px] border-gray-400 pr-[20px] max-[768px]:border-none'
            } flex flex-col items-start justify-start`}
          >
            <p className="text-[35px] font-semibold max-[550px]:text-[24px]">{el.title}</p>
            <p className="text-[18px] max-[550px]:text-[16px]">{el.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
