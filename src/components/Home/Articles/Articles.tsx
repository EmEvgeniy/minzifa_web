import dynamic from 'next/dynamic';

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ArticleCardType } from '@/components/UI/ArticleCard/_types';
import { apiGet } from '@/utils/serverApi';

const ArticleCard = dynamic(() => import('@/components/UI/ArticleCard/ArticleCard'));
const WrapperMobile = dynamic(() => import('./Wrapper.mobile'));

type ArticlesData = {
  data: ArticleCardType[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
  };
};

export default async function Articles({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });

  const data = (await apiGet(`articles?limit=3&page=1&perPage=3&locale=${locale}`, {
    next: { revalidate: 60 * 5 },
  })) as ArticlesData;

  if (!data?.data.length) return null;

  return (
    <section className="container pb-[70px] w-full">
      <div className="flex flex-col gap-10 items-start w-full">
        <h5 className="text-[42px] [@media(max-width:768px)]:text-[24px]">{t('articles_title')}</h5>
        <div className="grid grid-cols-3 w-full gap-5 [@media(max-width:768px)]:hidden">
          {data?.data.map((el: ArticleCardType) => (
            <ArticleCard key={el.id} article={el} locale={locale} />
          ))}
        </div>
        <WrapperMobile
          data={data.data}
          locale={locale}
          btn={
            <Link
              href={`/${locale}/adventures`}
              className="bg-[#16372D] py-[18px] px-[40px] mx-auto text-white rounded-[16px] hover:bg-[#194D3D] transition-all w-full text-center [@media(max-width:768px)]:px-[10px] [@media(max-width:768px)]:py-[13px] text-[14px] max-w-[150px]"
            >
              {t('article_btn')}
            </Link>
          }
        />
        <Link
          href={`/${locale}/adventures`}
          className="bg-[#16372D] py-[18px] px-[40px] mx-auto text-white rounded-[16px] hover:bg-[#194D3D] transition-all [@media(max-width:768px)]:hidden block"
        >
          {t('article_btn')}
        </Link>
      </div>
    </section>
  );
}
