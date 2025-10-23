import { car, eco_icon3, guide, heart, location } from '@/assets/icons';
import { eco_block } from '@/assets/img';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import dynamic from 'next/dynamic';
const MobileSlider = dynamic(() => import('./MobileSlider'));

export default async function Environment({
  block,
  title,
  subTitle,
  subTitle2,
}: {
  block: { title: string; text: string }[];
  title: string;
  subTitle: string;
  subTitle2: string;
}) {
  return (
    <section className="relative bg-[#16372D] w-full h-full py-[40px]">
      <ImageWithFallback
        src={eco_block}
        alt="environment"
        fill
        className="object-cover absolute top-0"
      />
      <div className="container w-full h-full py-[40px] relative z-20 text-white flex flex-col items-center gap-8 max-[500px]:gap-5">
        <ImageWithFallback
          src={eco_icon3}
          alt="icon"
          width={65}
          height={65}
          className="w-[65px] h-[65px]"
        />
        <h2 className="text-[42px] text-center flex flex-col items-center max-[1024px]:text-[35px] max-[1024px]:max-w-full max-[500px]:text-[24px]">
          <span className='uppercase'>{title}</span>
          {subTitle}
        </h2>
        <p className="text-[20px] text-center max-[500px]:text-[16px] max-[500px]:max-w-full">
          {subTitle2}
        </p>
        <div className="grid grid-cols-2 w-full h-full gap-5 pt-[30px] max-[500px]:hidden">
          {block.map((el, i) => (
            <div
              key={i}
              className="bg-[#FFFFFFCC] opacity-80 backdrop-blur-[6px] w-full h-full rounded-[16px] shadow-2xl p-5 flex flex-col items-center gap-5 text-[#16372D] text-center"
            >
              <ImageWithFallback
                src={i == 0 ? car : i == 1 ? heart : i == 2 ? guide : location}
                alt="icon2"
                width={50}
                height={50}
                className="w-[50px] h-[50px] object-contain"
              />
              <p className="text-[20px]">{el.title}</p>
              <p className="text-[16px]">{el.text}</p>
            </div>
          ))}
        </div>
        <MobileSlider block={block} />
      </div>
    </section>
  );
}
