'use client';
import { useGetQuery } from '@/api/get.api';
import { cr2 } from '@/assets/img';
import { Articles } from '@/components/Home';
import { ArticleCard, SocialMedia } from '@/components/UI';
import { ArticleCardType } from '@/components/UI/ArticleCard/_types';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { Button, Divider } from '@mui/material';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

type ArticleDetail = {
  id: number;
  name: string;
  published: string;
  description: string;
  media: {
    file: string;
    alt?: string;
  };
};

type ArticleListResponse = {
  data: ArticleCardType[];
};

export const Content: React.FC = () => {
  const t = useTranslations();
  const { slug } = useParams() as { slug: string };

  const { data: articleDetail } = useGetQuery<ArticleDetail>({
    key: ['article', slug],
    page: '',
    perPage: '',
    url: `articles/${slug}`,
    searchItem: '',
    additionalParam: '',
  });

  const { data: articleList, isSuccess: isArticleListSuccess } = useGetQuery<ArticleListResponse>({
    key: ['articles_main'],
    page: '1',
    perPage: '2',
    url: 'articles',
    searchItem: '',
    additionalParam: '',
  });

  return (
    <div className="w-full flex flex-col items-start gap-5">
      <Breadcrumbs />
      <div className="flex flex-col gap-3 pt-[40px]">
        <h1 className="text-[56px] max-w-[70%]">{articleDetail?.name}</h1>
        <p className="text-[18px] text-gray-500">{articleDetail?.published}</p>
      </div>
      <div className="w-full bg-[#16372D] h-[650px] rounded-[16px] shadow-2xl relative overflow-hidden">
        {articleDetail?.media?.file && (
          <Image
            src={articleDetail.media.file}
            alt={articleDetail.media.alt || 'image'}
            fill
            className="object-cover absolute top-0"
          />
        )}
      </div>
      <div className="relative w-full min-h-screen">
        <div className="flex items-start justify-between gap-5 h-full pt-[40px]">
          <div className="flex-1 w-full ">
            <div
              dangerouslySetInnerHTML={{ __html: articleDetail?.description || '' }}
              className="text-[18px] w-full flex-1 min-h-[60svh] h-full"
            />
            <Divider orientation="horizontal" className="py-[30px] w-full" />
            <div className="w-full flex flex-col items-start gap-5 pt-[40px]">
              <p className="text-[42px] text-[#16372D]">{t('article.form.title')}</p>
              <textarea
                placeholder={t('article.form.pl')}
                className="bg-white min-h-[250px] rounded-[16px] w-full p-5"
              />
              <Button variant="contained" color="secondary" sx={{ borderRadius: 2, minHeight: 45 }}>
                {t('article.form.btn')}
              </Button>
            </div>
          </div>
          <div className="w-full max-w-[350px] h-full flex flex-col items-end justify-start gap-[50px] sticky top-[150px]">
            <SocialMedia
              linkClassName="p-2 box-content"
              iconSize={24}
              withBackground
              backgroundColor="#fff"
              iconColor="#000"
            />

            <div className="flex flex-col gap-5">
              {isArticleListSuccess &&
                articleList?.data?.map((el: ArticleCardType) => (
                  <ArticleCard key={el.id} article={el} />
                ))}
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
            </div>
          </div>
        </div>
      </div>
      <Articles />
    </div>
  );
};
