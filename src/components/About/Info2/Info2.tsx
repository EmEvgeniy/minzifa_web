import { gallery, lr2 } from '@/assets/img';
import { DefaultComponentsProps } from '@/types';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

export default async function Info2({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <section className="bg-[#16372D] w-full py-[70px] relative h-full overflow-hidden">
      <Image
        src={lr2}
        alt=""
        width={600}
        height={300}
        loading="lazy"
        className="absolute top-0 left-0 object-cover"
      />
      <div className="relative z-20 container text-white flex items-center justify-between gap-5 max-[920px]:flex-col-reverse">
        <Image
          src={gallery}
          alt="gallery"
          width={567}
          height={400}
          loading="lazy"
          className="max-[1024px]:w-[400px] max-[920px]:w-full"
        />
        <div className=" flex flex-col justify-start items-start h-full gap-5 max-[920px]:w-full max-[920px]:mb-[30px] max-[550px]:items-center">
          <h3 className="text-[42px] font-semibold max-[1024px]:text-[30px] ">
            {t('vision_title')}
          </h3>
          <p className="text-[18px] max-[550px]:text-[16px]">{t('vision_text')}</p>
          <p className="text-[18px] max-[550px]:text-[16px]">{t('vision_text2')}</p>
          <Link
            href={`/${locale}/tours`}
            className="bg-[#27A430] rounded-[16px] py-[10px] px-[20px] text-[18px] shadow-2xl hover:bg-[#208B28] active:bg-[#27A430] transition-all max-[920px]:w-full max-[920px]:text-center max-[550px]:py-[5px]"
          >
            {t('vision_btn')}
          </Link>
        </div>
      </div>
    </section>
  );
}
