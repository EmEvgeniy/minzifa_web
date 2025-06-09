'use client';
import { useGetQuery } from '@/api/get.api';
import { DestinationBlockProps } from '@/components/Home/Destinations/_types';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { Skeleton } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Main = () => {
  const t = useTranslations('breadcrumbs');
  const locale = useLocale();
  const { data, isLoading, isSuccess } = useGetQuery({
    key: ['destinations_main'],
    page: '',
    perPage: '',
    url: 'destinations',
    searchItem: '',
    additionalParam: '&main_page=1',
  });

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <Breadcrumbs link={{ link: '', title: t('destination') }} />
      {!isLoading && isSuccess ? (
        <div className="w-full grid grid-cols-4 gap-5">
          {data.map((el: DestinationBlockProps) => (
            <Link href={`/${locale}/${el.slug}`} key={el.slug}>
              <div className="w-full h-full max-w-[275px] min-h-[275px] rounded-[16px] bg-white opacity-80 flex flex-col items-center justify-center text-xl font-semibold">
                {el.icon.file && (
                  <Image
                    src={el.icon.file ? el.icon.file : ''}
                    alt={el.icon.alt_text ? el.icon.alt_text : 'image'}
                    width={150}
                    height={150}
                    className="w-[150px] h-[150px] object-cover"
                  />
                )}
                <h2 className="text-2xl font-normal">{el?.name}</h2>
                <div className="text-base font-normal">{el?.tours_count} tours</div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-full grid grid-cols-4 gap-5">
          <Skeleton
            sx={{ borderRadius: '15px', backgroundColor: '#16372D' }}
            variant="rectangular"
            width={'100%'}
            height={275}
          />
          <Skeleton
            sx={{ borderRadius: '15px', backgroundColor: '#16372D' }}
            variant="rectangular"
            width={'100%'}
            height={275}
          />
          <Skeleton
            sx={{ borderRadius: '15px', backgroundColor: '#16372D' }}
            variant="rectangular"
            width={'100%'}
            height={275}
          />
          <Skeleton
            sx={{ borderRadius: '15px', backgroundColor: '#16372D' }}
            variant="rectangular"
            width={'100%'}
            height={275}
          />
          <Skeleton
            sx={{ borderRadius: '15px', backgroundColor: '#16372D' }}
            variant="rectangular"
            width={'100%'}
            height={275}
          />
          <Skeleton
            sx={{ borderRadius: '15px', backgroundColor: '#16372D' }}
            variant="rectangular"
            width={'100%'}
            height={275}
          />
          <Skeleton
            sx={{ borderRadius: '15px', backgroundColor: '#16372D' }}
            variant="rectangular"
            width={'100%'}
            height={275}
          />
        </div>
      )}
    </div>
  );
};
