import { circle, circle2 } from '@/assets/img';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export const Values = () => {
  const t = useTranslations('about');
  const values = t.raw('values') as {
    title: string;
    text: string;
    img: string;
    circle: string;
    circle2: string;
  }[];
  return (
    <section className="bg-[#16372D] w-full py-[70px]">
      <div className="container text-white flex flex-col gap-5">
        <h5 className="text-[42px]">{t('values_title')}</h5>
        <p className="flex flex-col gap-1 text-[18px]">
          <span>{t('values_text')}</span>
          <span>{t('values_text2')}</span>
        </p>
        <span className="bg-white h-[1px] w-full rounded-[16px]" />
        <div className="grid grid-cols-4 gap-5">
          {values.map((el, id) =>
            [2, 4].includes(id) ? (
              <div
                className="flex aspect-square h-[285px] w-full items-center justify-center overflow-hidden"
                key={id}
              >
                <Image
                  src={id === 2 ? circle : circle2}
                  className="aspect-square h-full rounded-full object-cover w-full"
                  width={200}
                  height={200}
                  alt="text"
                />
              </div>
            ) : (
              <div
                key={id}
                className="bg-[rgba(216,218,220,.9)] rounded-[16px] backdrop-blur-[16px] flex h-[285px] flex-col justify-between px-4 py-5 text-[#16372D]"
              >
                <span className="text-custom-green-900 text-[20px] font-semibold">{el.title}</span>

                <span className="text-custom-green-900 mt-4 flex text-[16px]">{el.text}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};
