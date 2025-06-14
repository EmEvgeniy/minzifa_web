import { eco_icon4 } from '@/assets/icons';
import { child, lr2 } from '@/assets/img';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export const Children = () => {
  const t = useTranslations('eco');
  const block = t.raw('children.block') as { title: string; text: string; img: string }[];

  return (
    <section className="bg-[#16372D] w-full py-[40px] relative overflow-hidden">
      <Image
        src={lr2}
        alt="icon"
        width={900}
        height={500}
        className="absolute top-0 right-0 object-cover rotate-180"
      />
      <div className="container flex flex-col items-center gap-5 text-white relative z-30">
        <Image src={eco_icon4} alt="icon" width={65} height={65} className="max-[768px]:w-[35px]" />
        <h6 className="text-[42px] max-[1024px]:text-[35px] max-[768px]:text-[24px] ">
          {t('children.title')}
        </h6>
        <p className="text-[18px] max-[768px]:text-[16px] max-[768px]:text-center">
          {t('children.sub_title')}
        </p>
        <div className="grid grid-cols-4 gap-5 items-center pt-[30px] max-[1150px]:grid-cols-3 max-[920px]:grid-cols-2 max-[550px]:grid-cols-1 max-[550px]:justify-items-center">
          {block.map((el, i) =>
            el.img === 'true' ? (
              <Image
                src={child}
                alt="child"
                width={350}
                height={350}
                key={i}
                className=" object-cover rounded-full p-0"
              />
            ) : (
              <div
                key={i}
                className="bg-white rounded-[16px] opacity-80 text-[#16372D] min-h-[350px] w-full p-3 grid grid-rows-2 backdrop-blur-[16px] max-[768px]:min-h-[285px]"
              >
                <p className="text-[18px] font-semibold">{el.title}</p>
                <p className="text-[16px]">{el.text}</p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};
