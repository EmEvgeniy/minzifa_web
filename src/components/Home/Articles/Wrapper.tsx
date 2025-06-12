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
    <div className="grid grid-cols-3 w-full gap-5 [@media(max-width:768px)]:hidden">
      {isSuccess &&
        data?.data.map((el: ArticleCardType) => <ArticleCard key={el.id} article={el} />)}
    </div>
  );
};
