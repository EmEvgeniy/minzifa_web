'use client';
import { useGetQuery } from '@/api/get.api';
import { AllToursCardType } from '@/components/Tours/MainSection/_types';
import { BestSellersPackagesCard } from '@/components/UI';
import { Pagination, Skeleton } from '@mui/material';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

export const Tours = () => {
  const { slug } = useParams();
  const [page, setPage] = useState<number>(1);
  const perPage = 9;

  const { data, isSuccess, isLoading } = useGetQuery<AllToursCardType[]>({
    key: ['all_tours', `${page}`, `${slug}`],
    page: String(page),
    perPage: String(perPage),
    url: 'tours',
    searchItem: '',
    additionalParam: `&all=true&main_page=0&page=${page}&perPage=${perPage}`,
  });

  const totalPages = Math.ceil((data?.length || 0) / perPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <section className="container py-[70px]">
      <div className="w-full flex flex-col gap-10 items-center">
        <div className="grid grid-cols-3 gap-5 w-full h-full">
          {!isLoading && isSuccess
            ? data
                .slice((page - 1) * perPage, page * perPage)
                .map((el: AllToursCardType) => <BestSellersPackagesCard slide={el} key={el.id} />)
            : Array.from({ length: 9 })
                .fill(1)
                .map((_, i) => (
                  <Skeleton
                    sx={{ borderRadius: '15px', backgroundColor: '#16372D' }}
                    variant="rectangular"
                    width={'100%'}
                    key={i}
                    height={375}
                  />
                ))}
        </div>
        <Pagination
          color="primary"
          count={totalPages}
          page={page}
          size="medium"
          onChange={handlePageChange}
          shape="rounded"
        />
      </div>
    </section>
  );
};
