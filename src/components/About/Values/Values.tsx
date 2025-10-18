import dynamic from 'next/dynamic';

import { circle, circle2 } from '@/assets/img';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { getTranslations } from 'next-intl/server';
const MobileSlider = dynamic(() => import('./MobileSlider'));

export default async function Values({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'about' });
  const values = t.raw('values') as {
    title: string;
    text: string;
    img: string;
    circle: string;
    circle2: string;
  }[];

  return (
    <section className="bg-[#16372D] w-full py-[70px] mb-10">
      <div className="container text-white flex flex-col gap-5">
        <h5 className="text-[42px] max-[1024px]:text-[35px] max-[768px]:text-[30px]  max-[768px]:text-left ">
          {t('values_title')}
        </h5>
        <p className="flex flex-col gap-1 text-[18px] max-[768px]:text-[16px] max-[768px]:text-left ">
          <span>{t('values_text')}</span>
          <span>{t('values_text2')}</span>
        </p>
        <span className="bg-white h-[1px] w-full rounded-[16px]" />
        <div className="grid grid-cols-4 gap-5 max-[1024px]:grid-cols-3 max-[768px]:grid-cols-2 max-[550px]:hidden">
          {values.map((el, id) =>
            [2, 4].includes(id) ? (
              <div
                className="flex aspect-square h-[285px] w-full items-center justify-center overflow-hidden"
                key={id}
              >
                <ImageWithFallback
                  src={id === 2 ? circle : circle2}
                  className="aspect-square  rounded-full object-cover h-[250px] w-[250px]"
                  width={200}
                  height={200}
                  loading="lazy"
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
        <MobileSlider values={values} />
      </div>
    </section>
  );
}
