import { lr2, ticket } from '@/assets/img';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function HowToBook({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const list = t.raw('bookBlock') as { title: string; text: string }[];

  return (
    <section className="bg-[#16372D] w-full">
      <ImageWithFallback
        src={lr2}
        alt=""
        width={600}
        height={500}
        loading="lazy"
        className="w-auto h-auto absolute left-0"
      />
      <div className="container text-white py-[70px] flex flex-col gap-5 [@media(max-width:768px)]:gap-3 [@media(max-width:768px)]:py-[30px]">
        <h5 className="text-[42px] [@media(max-width:768px)]:text-[24px]">{t('bookTitle')}</h5>
        <p className="text-[18px] [@media(max-width:768px)]:text-[16px]">{t('bookText')}</p>
        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3 [@media(max-width:1024px)]:grid-cols-2 [@media(max-width:550px)]:grid-cols-1 pt-[40px] [@media(max-width:768px)]:pt-[20px]">
          {list.map((el, id) => (
            <div
              key={id}
              className="bg-white/80 text-[#16372D] min-h-[239px] min-w-[200px] w-full backdrop-blur-[30px] rounded-[16px] px-4 py-5 [@media(max-width:550px)]:min-h-[200px]"
            >
              <div className="flex items-center gap-4">
                <span className="rounded-[10px] bg-[#16372D] flex aspect-square w-[50px] h-[50px] items-center justify-center text-2xl font-bold text-white [@media(max-width:768px)]:w-[35px] [@media(max-width:768px)]:h-[35px] [@media(max-width:768px)]:text-[20px]">
                  {++id}
                </span>
                <span className="text-custom-green-900 text-2xl [@media(max-width:1024px)]:text-xl [@media(max-width:768px)]:text-[20px]">
                  {el.title}
                </span>
              </div>
              <span className="text-custom-green-900 mt-4 flex text-sm [@media(max-width:1024px)]:text-md [@media(max-width:768px)]:text-[16px]">
                {el.text}
              </span>
            </div>
          ))}
          <div className="flex items-center">
            <Image
              src={ticket}
              width={0}
              height={0}
              className="object-cover"
              alt=""
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
