'use client';
import { useGetQuery } from '@/api/get.api';
import { ArticleCard, Slider, SliderBtns } from '@/components/UI';
import { ArticleCardType } from '@/components/UI/ArticleCard/_types';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { SwiperClass } from 'swiper/react';

interface DataResponse {
  data: ArticleCardType[];
}

export const WrapperMobile = () => {
  const locale = useLocale();
  const t = useTranslations('home');
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const handleSlideChange = (swiper: SwiperClass): void => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };
  const { data, isSuccess } = useGetQuery<DataResponse>({
    key: ['articles-mobile'],
    page: '1',
    perPage: '3',
    url: 'articles',
    searchItem: '',
    additionalParam: '',
  });
  return (
    <div className="w-full hidden [@media(max-width:768px)]:block">
      {isSuccess && (
        <Slider
          slides={data?.data}
          swiperRef={swiperRef}
          isBeginning={isBeginning}
          isEnd={isEnd}
          setIsBeginning={setIsBeginning}
          setIsEnd={setIsEnd}
          handleSlideChange={handleSlideChange}
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 16 },
            550: { slidesPerView: 2.2 },
            768: { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.4 },
          }}
          renderCard={(slide: ArticleCardType) => <ArticleCard key={slide.id} article={slide} />}
        />
      )}
      <div className="flex items-center w-full justify-between gap-5">
        <Link
          href={`/${locale}/adventures`}
          className="bg-[#16372D] py-[18px] px-[40px] mx-auto text-white rounded-[16px] hover:bg-[#194D3D] transition-all w-full text-center [@media(max-width:768px)]:px-[10px] [@media(max-width:768px)]:py-[13px] text-[14px] max-w-[150px]"
        >
          {t('article_btn')}
        </Link>
        <SliderBtns
          swiperRef={swiperRef}
          isBeginning={isBeginning}
          isEnd={isEnd}
          variant={'primary'}
        />
      </div>
    </div>
  );
};
