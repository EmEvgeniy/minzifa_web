import Link from 'next/link';
import { DefaultComponentsProps } from '@/types';
import { getTranslations } from 'next-intl/server';
import { ArticleCardType } from '@/components/UI/ArticleCard/_types';
import { ArticleCard } from '@/components/UI';
import dynamic from 'next/dynamic';
const WrapperMobile = dynamic(() => import('./Wrapper.mobile'));

export default async function Articles({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale, namespace: 'home' });

  const res = await fetch(
    `https://api.minzifatravel.com/api/v1/articles?limit=12&page=1&perPage=12&locale=${locale}`,
    {
      next: { revalidate: 60 * 5 },
    },
  );
  const data = await res.json();

  if (!data?.data.length) return null;

  return (
    <section className="container pb-[70px] w-full">
      <div className="flex flex-col gap-10 items-start w-full">
        <h5 className="text-[42px] [@media(max-width:768px)]:text-[24px] ">
          {t('articles_title')}
        </h5>
        <div className="grid grid-cols-3 w-full gap-5 [@media(max-width:768px)]:hidden">
          {data?.data.slice(0, 3).map((el: ArticleCardType) => (
            <ArticleCard key={el.id} article={el} />
          ))}
        </div>
        <WrapperMobile
          data={data.data.slice(0, 3)}
          btn={
            <Link
              href={`/${locale}/adventures`}
              prefetch={false}
              className="bg-[#16372D] py-[18px] px-[40px] mx-auto text-white rounded-[16px] hover:bg-[#194D3D] transition-all w-full text-center [@media(max-width:768px)]:px-[10px] [@media(max-width:768px)]:py-[13px] text-[14px] max-w-[150px]"
            >
              {t('article_btn')}
            </Link>
          }
        />
        <Link
          href={`/${locale}/adventures`}
          prefetch={false}
          className="bg-[#16372D] py-[18px] px-[40px] mx-auto text-white rounded-[16px] hover:bg-[#194D3D] transition-all [@media(max-width:768px)]:hidden block"
        >
          {t('article_btn')}
        </Link>
      </div>
    </section>
  );
}
