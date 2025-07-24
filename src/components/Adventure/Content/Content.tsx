import { cr2 } from '@/assets/img';

import { BestSellersPackagesCardType } from '@/components/UI/BestSellersPackagesCard/_types';
import BestSellersPackagesCard from '@/components/UI/BestSellersPackagesCard/BestSellersPackagesCard';
import MarkdownDescription from '@/components/UI/MarkdownDescription/MarkdownDescription';
import SocialMedia from '@/components/UI/SocialMedia/SocialMedia';
import { calculateReadingTime, formatted_date } from '@/utils/utils';

import { Button, Divider } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

export type ArticleDetail = {
  id: number;
  name: string;
  published: string;
  description: string;
  media: {
    file: string;
    alt?: string;
  };
};

export default async function Content({
  locale,
  articleDetail,
  tours,
}: {
  locale: string;
  articleDetail: ArticleDetail;
  tours: BestSellersPackagesCardType[];
}) {
  const t = await getTranslations({ locale });

  return (
    <div className="w-full flex flex-col items-start gap-5">
      <div className="flex flex-col gap-3 pt-[40px] max-[1024px]:pt-[20px] max-[768px]:gap-2">
        <h1 className="text-[35px] max-w-[100%] max-[1024px]:text-[35px] max-[1024px]:max-w-full max-[550px]:text-[24px] max-[550px]:font-semibold font-title">
          {articleDetail?.name}
        </h1>
        <p className="text-[18px] text-gray-500 max-[1024px]:text-[16px]">
          {formatted_date(articleDetail?.published || '', locale, 'MMMM d, yyyy')} • {t('article.reading_time', { time: calculateReadingTime(articleDetail?.description || '') })}
        </p>
      </div>
      <div className="w-full bg-[#16372D] h-[650px] rounded-[16px] shadow-2xl relative overflow-hidden max-[1024px]:h-[450px] max-[550px]:h-[300px]">
        {articleDetail?.media?.file && (
          <Image
            src={articleDetail.media.file}
            alt={articleDetail.media.alt || 'image'}
            loading="lazy"
            fill
            className="object-cover absolute top-0 "
          />
        )}
      </div>
      <div className="relative w-full min-h-screen max-[550px]:min-h-full max-[550px]:pb-[30px]">
        <div className="flex items-start justify-between gap-5 h-full pt-[40px] max-[1024px]:flex-col">
          <div className="flex-1 w-full h-full">
            <MarkdownDescription description={articleDetail?.description || ''} />
            <Divider orientation="horizontal" className="py-[30px] w-full max-[1024px]:py-[10px]" />
            <div className="w-full flex flex-col items-start gap-5 pt-[40px] max-[550px]:gap-3">
              <p className="text-[42px] text-[#16372D] max-[1024px]:text-[28px] max-[550px]:text-[24px] max-[550px]:font-semibold ">
                {t('article.form.title')}
              </p>
              <textarea
                placeholder={t('article.form.pl')}
                className="bg-white min-h-[250px] rounded-[16px] w-full p-5 max-[550px]:min-h-[180px] "
              />
              <Button variant="contained" color="secondary" sx={{ borderRadius: 2, minHeight: 45 }}>
                {t('article.form.btn')}
              </Button>
            </div>
          </div>
          <div className="w-full max-w-[350px] h-full flex flex-col items-end justify-start gap-[50px] sticky top-[150px] max-[1024px]:hidden p-5">
            <SocialMedia
              linkClassName="p-2 box-content"
              iconSize={24}
              withBackground
              backgroundColor="#fff"
              iconColor="#000"
            />

            <div className="flex flex-col gap-5 max-[1024px]:hidden">
              {tours?.map((el: BestSellersPackagesCardType) => (
                <BestSellersPackagesCard
                  key={el.id}
                  slide={el}
                  locale={locale}
                  days={t('all_tours.days')}
                  from={t('all_tours.from')}
                  view_itinerary={t('all_tours.view_itinerary')}
                  byRequest={t('all_tours.byRequest')}
                />
              ))}

              <Link href={`/${locale}/create-your-trip`}>
                <div className="h-[450px] w-full bg-[#16372D] relative rounded-[16px] overflow-hidden flex items-center justify-center">
                  <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
                  <Image src={cr2} alt="cyt" fill className="object-cover absolute top-0" />
                  <div className="relative z-30 text-white p-5 flex flex-col items-center gap-5 text-center">
                    <p className="text-[28px]">{t('article.cyt.title')}</p>
                    <p className="text-[16px]">{t('article.cyt.text')}</p>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ borderRadius: 2, width: '100%', minHeight: 40 }}
                    >
                      {t('article.cyt.btn')}
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
