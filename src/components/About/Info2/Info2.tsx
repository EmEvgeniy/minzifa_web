import { gallery, lr2 } from '@/assets/img';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Info2 = () => {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <section className="bg-[#16372D] w-full py-[70px] relative h-full overflow-hidden">
      <Image
        src={lr2}
        alt=""
        width={600}
        height={300}
        className="absolute top-0 left-0 object-cover"
      />
      <div className="relative z-20 container text-white flex items-center justify-between gap-5">
        <Image src={gallery} alt="gallery" width={567} height={400} />
        <div className=" flex flex-col justify-start items-start h-full gap-5">
          <h3 className="text-[42px] font-semibold">{t('vision_title')}</h3>
          <p className="text-[18px]">{t('vision_text')}</p>
          <p className="text-[18px]">{t('vision_text2')}</p>
          <Link
            href={`/${locale}/tours`}
            className="bg-[#27A430] rounded-[16px] py-[10px] px-[20px] text-[18px] shadow-2xl hover:bg-[#208B28] active:bg-[#27A430] transition-all"
          >
            {t('vision_btn')}
          </Link>
        </div>
      </div>
    </section>
  );
};
