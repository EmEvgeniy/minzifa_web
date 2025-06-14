import { SocialMedia } from '@/components/UI';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Form } from '../Form';

export const LeftInfo = () => {
  const t = useTranslations();
  return (
    <div className="w-full flex flex-col h-full items-start justify-start gap-20 min-h-[45svh] max-[768px]:items-center max-[768px]:min-h-full">
      <div className="w-full h-full">
        <h2 className="mb-4 w-full text-[56px] leading-tight font-bold tracking-tight text-white/70 max-[1024px]:text-[35px] max-[768px]:text-center">
          {t('contact_us.title')}
        </h2>
        <p className="mt-8 w-full text-[24px] font-bold text-white max-[1024px]:text-[18px] max-[768px]:text-center">
          +998 91 244 47 20
        </p>
        <p className="text-[24px] font-bold text-white  max-[1024px]:text-[18px] py-[10px] max-[768px]:text-center">
          booking@minzifatravel.com
        </p>
        <p className="w-full text-[24px] text-white max-[1024px]:text-[18px] max-[768px]:text-center">
          63, Eshoni Pir Str., Bukhara, Uzbekistan
        </p>
      </div>
      <div className="hidden max-[768px]:block mx-auto">
        <Form />
      </div>
      <div className="w-full h-full max-[768px]:flex max-[768px]:flex-col max-[768px]:items-center">
        <h2 className="mb-2 justify-end text-6xl leading-tight font-bold tracking-tight text-white/70 max-[1024px]:text-[35px]">
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
