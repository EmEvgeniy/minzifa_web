import { economy_icon } from '@/assets/icons';
import { economy, economy_1, economy_2 } from '@/assets/img';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import dynamic from 'next/dynamic';

const MobileSlider = dynamic(() => import('./MobileSlider'));

export default function Economy({
  block,
  title,
  subTitle,
}: {
  block: { title: string; text: string; img: string }[];
  title: string;
  subTitle: string;
}) {
  return (
    <section className="w-full bg-[#16372D] relative">
      <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
      <ImageWithFallback
        src={economy}
        alt="background"
        fill
        className=" object-cover absolute top-0"
      />
      <div className="relative z-30 container flex flex-col items-center gap-5 text-white py-[70px]">
        <ImageWithFallback
          src={economy_icon}
          alt="icon"
          width={65}
          height={65}
          className="w-[65px] h-[65px]"
        />
        <h6 className="text-[42px] max-w-[70%] text-center max-[1024px]:text-[35px]  max-[1024px]:max-w-full max-[550px]:text-[24px]">
          {title}
        </h6>
        <p className="text-[20px] max-[1024px]:text-[18px] text-center">{subTitle}</p>
        <div className="grid grid-cols-4 gap-5 items-center pt-[30px] max-[1024px]:hidden">
          {block.slice(0, 4).map((el, i) =>
            el.img === 'true' ? (
              <ImageWithFallback
                src={economy_1}
                alt="child"
                width={280}
                height={280}
                key={i}
                className="object-cover rounded-full w-[280px] h-[280px]"
              />
            ) : i < block.length - 3 ? (
              <div
                key={i}
                className="bg-white rounded-[16px] opacity-80 text-[#16372D] min-h-[350px] w-full p-3 grid grid-rows-2 backdrop-blur-[16px]"
              >
                <p className="text-[18px] font-semibold">{el.title}</p>
                <p className="text-[16px]">{el.text}</p>
              </div>
            ) : null,
          )}

          {/* Три нижних блока на всю ширину */}
          <div className="col-span-4 grid grid-cols-3 gap-5 place-items-center max-[1024px]:hidden">
            {block.slice(-3).map((el, i) =>
              el.img === 'true' ? (
                <ImageWithFallback
                  src={economy_2}
                  alt="child"
                  width={280}
                  height={280}
                  key={i}
                  className="object-cover rounded-full w-[280px] h-[280px]"
                />
              ) : (
                <div
                  key={`bottom-${i}`}
                  className="bg-white rounded-[16px] opacity-80 text-[#16372D] min-h-[350px] w-full p-3 grid grid-rows-2 backdrop-blur-[16px]"
                >
                  <p className="text-[18px] font-semibold">{el.title}</p>
                  <p className="text-[16px]">{el.text}</p>
                </div>
              ),
            )}
          </div>
        </div>
        <MobileSlider block={block} />
      </div>
    </section>
  );
}
