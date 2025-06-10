import { economy_icon } from '@/assets/icons';
import { economy, economy_1, economy_2 } from '@/assets/img';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export const Economy = () => {
  const t = useTranslations('eco');
  const block = t.raw('economy.block') as { title: string; text: string; img: string }[];

  return (
    <section className="w-full bg-[#16372D] relative">
      <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
      <Image src={economy} alt="background" fill className=" object-cover absolute top-0" />
      <div className="relative z-30 container flex flex-col items-center gap-5 text-white py-[70px]">
        <Image src={economy_icon} alt="icon" width={65} height={65} />
        <h6 className="text-[42px] max-w-[70%] text-center">{t('economy.title')}</h6>
        <p className="text-[20px]">{t('economy.sub_title')}</p>
        <div className="grid grid-cols-4 gap-5 items-center pt-[30px]">
          {block.slice(0, 4).map((el, i) =>
            el.img === 'true' ? (
              <Image
                src={economy_1}
                alt="child"
                width={280}
                height={280}
                key={i}
                className="object-cover rounded-full w-[280px] h-[280px]"
              />
            ) : i < block.length - 3 ? (
              <div
                key={i}
                className="bg-white rounded-[16px] opacity-80 text-[#16372D] min-h-[350px] w-full p-3 grid grid-rows-2 backdrop-blur-[16px]"
              >
                <p className="text-[18px] font-semibold">{el.title}</p>
                <p className="text-[16px]">{el.text}</p>
              </div>
            ) : null,
          )}

          {/* Три нижних блока на всю ширину */}
          <div className="col-span-4 grid grid-cols-3 gap-5 place-items-center">
            {block.slice(-3).map((el, i) =>
              el.img === 'true' ? (
                <Image
                  src={economy_2}
                  alt="child"
                  width={280}
                  height={280}
                  key={i}
                  className="object-cover rounded-full w-[280px] h-[280px]"
                />
              ) : (
                <div
                  key={`bottom-${i}`}
                  className="bg-white rounded-[16px] opacity-80 text-[#16372D] min-h-[350px] w-full p-3 grid grid-rows-2 backdrop-blur-[16px]"
                >
                  <p className="text-[18px] font-semibold">{el.title}</p>
                  <p className="text-[16px]">{el.text}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
