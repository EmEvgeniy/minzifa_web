'use client';
import { useGetQuery } from '@/api/get.api';
import { AdventureCard } from '@/components/UI';
import { AdventureCardType } from '@/components/UI/AdventureCard/_types';
import React from 'react';

export const Wrapper = () => {
  const { data, isSuccess } = useGetQuery<AdventureCardType[]>({
    key: ['types'],
    page: '',
    perPage: '',
    url: 'types',
    searchItem: '',
    additionalParam: '&main_page=1',
  });

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 [@media(max-width:1024px)]:grid-cols-3 [@media(max-width:768px)]:grid-cols-2">
      {isSuccess &&
        data
          ?.slice(0, 8)
          .map((type: AdventureCardType) => <AdventureCard key={type.id} type={type} />)}
    </div>
  );
};
