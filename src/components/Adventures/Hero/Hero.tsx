import { articles } from '@/assets/img';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import Image from 'next/image';

export default async function Hero({ title, subTitle }: { title: string; subTitle: string }) {
  return (
    <section className="w-full relative h-[70svh] max-[768px]:h-[60svh]">
      <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
      <Image
        src={articles}
        alt="articles_hero"
        fill
        loading="lazy"
        className=" object-cover absolute top-0 z-10"
      />
      <div className="relative w-full z-30 text-white container flex flex-col items-start justify-start h-full py-[150px] gap-5">
        <Breadcrumbs
          separator={<span className="mx-2 text-white">/</span>}
          listClasses={'text-white hover:underline'}
          activeClasses={'text-white'}
        />
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-center">
          <h1 className="text-[56px] max-[1024px]:text-[42px] max-[768px]:text-[35px] max-[768px]:font-semibold font-title">
            {title}
          </h1>
          <p className="text-[24px] max-w-[50%] max-[768px]:text-[20px] max-[768px]:max-w-full">
            {subTitle}
          </p>
        </div>
      </div>
    </section>
  );
}
