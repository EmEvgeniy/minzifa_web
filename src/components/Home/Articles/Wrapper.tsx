'use client';
import { useGetQuery } from '@/api/get.api';
import { ArticleCard } from '@/components/UI';
import { ArticleCardType } from '@/components/UI/ArticleCard/_types';
import React from 'react';

export const Wrapper = () => {
  const { data, isSuccess } = useGetQuery({
    key: ['articles'],
    page: '1',
    perPage: '3',
    url: 'articles',
    searchItem: '',
    additionalParam: '',
  });
  return (
    <div className="flex items-center justify-between gap-5">
      {isSuccess &&
        data?.data.map((el: ArticleCardType) => <ArticleCard key={el.id} article={el} />)}
    </div>
  );
};
