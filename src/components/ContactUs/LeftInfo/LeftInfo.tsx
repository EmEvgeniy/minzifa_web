import { SocialMedia } from '@/components/UI';
import { useTranslations } from 'next-intl';
import React from 'react';

export const LeftInfo = () => {
  const t = useTranslations();
  return (
    <div className="w-full flex flex-col h-full items-start justify-start gap-20">
      <div className="w-full h-full ">
        <h2 className="mb-4 w-full text-6xl leading-tight font-bold tracking-tight text-white/70 [@media(max-width:550px)]:text-4xl">
          {t('contact_us.title')}
        </h2>
        <p className="mt-8 w-full text-[24px] font-bold text-white [@media(max-width:550px)]:text-[16px]">
          +998 91 244 47 20
        </p>
        <p className="text-[24px] font-bold text-white [@media(max-width:550px)]:text-[18px]">
          booking@minzifatravel.com
        </p>
        <p className="w-full text-[24px] text-white [@media(max-width:550px)]:text-[18px]">
          63, Eshoni Pir Str., Bukhara, Uzbekistan
        </p>
      </div>
      <div className="w-full h-full ">
        <h2 className="mb-2 justify-end text-6xl leading-tight font-bold tracking-tight text-white/70 [@media(max-width:550px)]:text-2xl">
          {t('contact_us.find')}
        </h2>
        <SocialMedia
          linkClassName="p-2 box-content"
          iconSize={24}
          withBackground
          backgroundColor="#fff"
          iconColor="#000"
        />
      </div>
    </div>
  );
};
