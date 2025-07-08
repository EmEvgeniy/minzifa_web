export const dynamic = 'force-static';
import Image from 'next/image';
import { Metadata } from 'next';
import { eco_icon, eco_icon2, eco_icon4, eco_icon5 } from '@/assets/icons';
import { eco_bg, lr, lr2, child, animal } from '@/assets/img';
import { respect } from '@/assets/img';
import { DefaultPageProps } from '@/types';
import { getTranslations } from 'next-intl/server';
import EnvironmentCircle from '@/components/UI/DynamicCircle/index.desktop';
import MobileSlider from '@/components/Eco-travel/MobileSlider/MobileSlider';
import Environment from '@/components/Eco-travel/Environment/Environment';
import Economy from '@/components/Eco-travel/Economy/Economy';
import FreeConsultationForm from '@/components/UI/FreeConsultationForm/FreeConsultationForm';

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const slug = 'responsible-conscious-travel';
  const locale = (await params).locale;

  const data = await fetch(
    `https://api.minzifatravel.com/api/v1/pages/${slug}?locale=${locale}`,
  ).then((res) => res.json());

  return {
    title: data?.seo_metadata?.title,
    description: data?.seo_metadata?.description,
    keywords: data?.seo_metadata?.keywords,
  };
}

export default async function page({ params }: DefaultPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'eco' });
  const block = t.raw('environment.block') as { title: string; text: string }[];
  const block2 = t.raw('children.block') as { title: string; text: string; img: string }[];
  const block3 = t.raw('economy.block') as { title: string; text: string; img: string }[];
  return (
    <>
      <section className="min-h-[90svh] w-full relative bg-[#16372D] flex items-center justify-center max-[768px]:min-h-[70svh]">
        <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
        <Image
          src={eco_bg}
          alt="eco_bg"
          fill
          className=" object-cover absolute top-0 z-10"
          loading="lazy"
        />
        <div className="container relative z-30 flex flex-col items-center justify-center gap-5">
          <Image
            src={eco_icon}
            alt="eco-icon"
            width={65}
            height={65}
            className="max-[768px]:w-[40px] max-[500px]:w-[30px]"
          />
          <h1 className="text-white text-[56px] flex flex-col text-center max-[768px]:text-[35px] max-[500px]:text-[24px] font-title">
            <span>{t('title')}</span>
            <span>{t('title2')}</span>
          </h1>
        </div>
      </section>
      <section className="container py-[70px] flex flex-col gap-10 max-[1024px]:py-[50px] max-[500px]:gap-5">
        <h2 className="text-[42px] text-[#16372D] text-center max-[1024px]:text-[35px] max-[500px]:text-[24px]">
          {t('team.title')}
        </h2>
        <div className="w-full flex flex-col gap-5 text-[18px] text-center max-[500px]:text-[16px]">
          <p>{t('team.text')}</p>
          <p>{t('team.text2')}</p>
          <p>{t('team.text3')}</p>
          <p>{t('team.text4')}</p>
          <p>{t('team.text5')}</p>
          <p>{t('team.text6')}</p>
        </div>
      </section>
      <section className="bg-[#16372D] w-full min-h-[385px] relative h-full mb-[70px] overflow-hidden">
        <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
        <Image
          src={lr}
          alt="lr"
          width={450}
          height={300}
          loading="lazy"
          className=" object-cover absolute top-0 left-[-20%] z-10"
        />
        <Image
          src={lr}
          alt="lr"
          width={700}
          height={300}
          loading="lazy"
          className=" object-cover absolute rotate-180 top-[-15%] right-[-20%] z-10 max-[768px]:hidden"
        />
        <div className="container relative z-30 text-white py-[70px] flex flex-col items-center justify-center gap-10 max-[1024px]:gap-5">
          <h2 className="text-[42px] text-center max-[1024px]:text-[35px] max-[500px]:text-[24px]">
            {t('mission.title')}
          </h2>
          <p className="text-[18px] text-center flex flex-col gap-5 max-[500px]:text-[16px]">
            <span>{t('mission.text')}</span>
            <span>{t('mission.text2')}</span>
          </p>
        </div>
      </section>
      <EnvironmentCircle />
      <MobileSlider />
      <Environment
        title={t('environment.title')}
        block={block}
        subTitle={t('environment.title2')}
        subTitle2={t('environment.sub_title')}
      />
      <section className="container flex flex-col gap-5 items-center justify-center h-full py-[70px] max-[768px]:py-[40px] max-[768px]:gap-3">
        <Image
          src={eco_icon2}
          alt="icon"
          width={65}
          height={65}
          className="max-[1024px]:w-[40px] max-[500px]:w-[35px]"
        />
        <h5 className="text-[42px] max-w-[70%] text-center max-[1024px]:max-w-full max-[1024px]:text-[30px] max-[500px]:text-[24px]">
          {t('env.title')}
        </h5>
        <p className="text-[24px] max-w-[70%] text-center max-[1024px]:max-w-full max-[768px]:text-[18px]">
          {t('env.sub_title')}
        </p>
        <div className="w-full flex gap-5 min-h-[400px] h-full max-[768px]:flex-col-reverse max-[768px]:pt-[30px]">
          <div className="bg-[#BCCEC8] rounded-[16px]   flex flex-col justify-between p-5 gap-5 text-[18px] w-1/2 max-[768px]:w-full max-[500px]:text-[16px]">
            <p>{t('env.text')}</p>
            <p>{t('env.text2')}</p>
            <p>{t('env.text3')}</p>
          </div>

          <Image
            src={respect}
            alt="respect"
            width={0}
            height={0}
            className="object-cover  h-full max-h-[400px] rounded-[16px] shadow-2xl w-1/2 max-[768px]:w-full"
          />
        </div>
      </section>
      <section className="bg-[#16372D] w-full py-[40px] relative overflow-hidden">
        <Image
          src={lr2}
          alt="icon"
          width={900}
          height={500}
          className="absolute top-0 right-0 object-cover rotate-180"
        />
        <div className="container flex flex-col items-center gap-5 text-white relative z-30">
          <Image
            src={eco_icon4}
            alt="icon"
            width={65}
            height={65}
            className="max-[768px]:w-[35px]"
          />
          <h6 className="text-[42px] max-[1024px]:text-[35px] max-[768px]:text-[24px] ">
            {t('children.title')}
          </h6>
          <p className="text-[18px] max-[768px]:text-[16px] max-[768px]:text-center">
            {t('children.sub_title')}
          </p>
          <div className="grid grid-cols-4 gap-5 items-center pt-[30px] max-[1150px]:grid-cols-3 max-[920px]:grid-cols-2 max-[550px]:grid-cols-1 max-[550px]:justify-items-center">
            {block2.map((el, i) =>
              el.img === 'true' ? (
                <Image
                  src={child}
                  alt="child"
                  width={350}
                  height={350}
                  loading="lazy"
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
      <section className="container py-[70px] flex flex-col gap-8 items-center max-[768px]:gap-3 max-[768px]:py-[40px]">
        <Image src={eco_icon5} alt="icon" width={65} height={65} className="max-[768px]:w-[35px]" />
        <h6 className="text-[42px] max-[1024px]:text-[35px]">{t('animal.title')}</h6>
        <p className="text-[20px] text-center max-w-[80%] max-[768px]:text-[18px] max-[768px]:max-w-full">
          {t('animal.sub_title')}
        </p>
        <div className="w-full flex gap-5 min-h-[400px] h-full max-[768px]:pt-[30px] max-[768px]:flex-col">
          <Image
            src={animal}
            alt="panda"
            width={0}
            loading="lazy"
            height={0}
            className="object-cover  h-full max-h-[400px] rounded-[16px] shadow-2xl w-1/2 max-[768px]:w-full"
          />
          <div className="bg-[#BCCEC8] rounded-[16px]   flex flex-col justify-center p-5 gap-5 text-[18px] w-1/2 max-[768px]:w-full max-[768px]:text-[16px]">
            <p>{t('animal.text')}</p>
            <p>{t('animal.text2')}</p>
          </div>
        </div>
      </section>
      <Economy block={block3} title={t('economy.title')} subTitle={t('economy.sub_title')} />
      <div className="container">
        <FreeConsultationForm />
      </div>
    </>
  );
}
