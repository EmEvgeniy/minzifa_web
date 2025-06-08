import { lr2, ticket } from '@/assets/img';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export const HowToBook = () => {
  const t = useTranslations('home');
  const list = t.raw('book_block') as { title: string; text: string }[];

  return (
    <section className="bg-[#16372D] w-full">
      <Image src={lr2} alt="" width={600} height={500} className="absolute left-0 " />
      <div className="container text-white py-[70px] flex flex-col gap-5">
        <h5 className="text-[42px]">{t('book_title')}</h5>
        <p className="text-[18px]">{t('book_text')}</p>
        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3 [@media(max-width:1024px)]:grid-cols-2 [@media(max-width:550px)]:grid-cols-1 pt-[40px]">
          {list.map((el, id) => (
            <div
              key={id}
              className="bg-[rgba(216,218,220,0.8)] min-h-[239px] min-w-[200px] w-full backdrop-blur-[30px] rounded-[16px] px-4 py-5 [@media(max-width:550px)]:min-h-full"
            >
              <div className="flex items-center gap-4">
                <span className="rounded-[10px] bg-[#16372D] flex aspect-square w-[50px] h-[50px] items-center justify-center text-2xl font-bold text-white">
                  {++id}
                </span>
                <span className="text-custom-green-900 text-2xl [@media(max-width:1024px)]:text-xl">
                  {el.title}
                </span>
              </div>
              <span className="text-custom-green-900 mt-4 flex text-lg [@media(max-width:1024px)]:text-md">
                {el.text}
              </span>
            </div>
          ))}
          <div className="flex items-center">
            <Image
              src={ticket}
              width={0}
              height={0}
              className="  object-cover"
              alt=""
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
