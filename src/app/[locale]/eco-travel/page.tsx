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
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const locale = (await params).locale;
  const slug = `https://minzifatravel.com/${locale}/eco-travel`;

  const data = await fetch(
    `https://api.minzifatravel.com/api/v1/pages?page=${slug}`,
  ).then((res) => res.json());

  return {
    title: data?.seo_metadata?.title,
    description: data?.seo_metadata?.description,
    keywords: data?.seo_metadata?.keywords,
  };
}

export default async function page({ params }: DefaultPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const block = t.raw('eco.environment.block') as { title: string; text: string }[];
  const block2 = t.raw('eco.children.block') as { title: string; text: string; img: string }[];
  const block3 = t.raw('eco.economy.block') as { title: string; text: string; img: string }[];
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
        <div className="container absolute z-30 top-35 max-[1024px]:top-25 w-full">
          <Breadcrumbs
            mainStyle="text-white "
            listClasses="text-white"
            locale={locale}
            link={{ link: '', title: t('breadcrumbs.eco') }}
          />
        </div>
        <div className="container relative z-30 flex flex-col items-center justify-center gap-5">
          <Image
            src={eco_icon}
            alt="eco-icon"
            width={65}
            height={65}
            className="max-[768px]:w-[40px] max-[500px]:w-[30px]"
          />
          <h1 className="text-white text-[56px] flex flex-col text-center max-[768px]:text-[35px] max-[500px]:text-[24px] font-title">
            <span>{t('eco.title')}</span>
            <span>{t('eco.title2')}</span>
          </h1>
        </div>
      </section>
      <section className="container py-[70px] flex flex-col gap-10 max-[1024px]:py-[50px] max-[500px]:gap-5">
        <h2 className="text-[42px] text-[#16372D] text-center max-[1024px]:text-[35px] max-[500px]:text-[24px]">
          {t('eco.team.title')}
        </h2>
        <div className="w-full flex flex-col gap-5 text-[18px] text-center max-[500px]:text-[16px]">
          <p>{t('eco.team.text')}</p>
          <p>{t('eco.team.text2')}</p>
          <p>{t('eco.team.text3')}</p>
          <p>{t('eco.team.text4')}</p>
          <p>{t('eco.team.text5')}</p>
          <p>{t('eco.team.text6')}</p>
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
            {t('eco.mission.title')}
          </h2>
          <p className="text-[18px] text-center flex flex-col gap-5 max-[500px]:text-[16px]">
            <span>{t('eco.mission.text')}</span>
            <span>{t('eco.mission.text2')}</span>
          </p>
        </div>
      </section>
      <EnvironmentCircle />
      <MobileSlider />
      <Environment
        title={t('eco.environment.title')}
        block={block}
        subTitle={t('eco.environment.title2')}
        subTitle2={t('eco.environment.sub_title')}
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
          {t('eco.env.title')}
        </h5>
        <p className="text-[24px] max-w-[70%] text-center max-[1024px]:max-w-full max-[768px]:text-[18px]">
          {t('eco.env.sub_title')}
        </p>
        <div className="w-full flex gap-5 min-h-[400px] h-full max-[768px]:flex-col-reverse max-[768px]:pt-[30px]">
          <div className="bg-[#BCCEC8] rounded-[16px]   flex flex-col justify-between p-5 gap-5 text-[18px] w-1/2 max-[768px]:w-full max-[500px]:text-[16px]">
            <p>{t('eco.env.text')}</p>
            <p>{t('eco.env.text2')}</p>
            <p>{t('eco.env.text3')}</p>
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
            {t('eco.children.title')}
          </h6>
          <p className="text-[18px] max-[768px]:text-[16px] max-[768px]:text-center">
            {t('eco.children.sub_title')}
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
        <h6 className="text-[42px] max-[1024px]:text-[35px]">{t('eco.animal.title')}</h6>
        <p className="text-[20px] text-center max-w-[80%] max-[768px]:text-[18px] max-[768px]:max-w-full">
          {t('eco.animal.sub_title')}
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
            <p>{t('eco.animal.text')}</p>
            <p>{t('eco.animal.text2')}</p>
          </div>
        </div>
      </section>
      <Economy
        block={block3}
        title={t('eco.economy.title')}
        subTitle={t('eco.economy.sub_title')}
      />
      <div className="container">
        <FreeConsultationForm />
      </div>
    </>
  );
}
