'use client';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useLocale, useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { AllToursCardType, ToursResponse } from './_types';
import Image from 'next/image';
import Divider from '@mui/material/Divider';
import { IoLocationOutline } from 'react-icons/io5';
import Link from 'next/link';
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';
import { BestSellersPackagesCard } from '@/components/UI';
import { useFilterStore } from './store';
import { useRouter } from 'next/navigation';

export const ToursView = ({ tourData }: { tourData: ToursResponse }) => {
  const t = useTranslations('all_tours');
  const locale = useLocale();
  const router = useRouter();

  const { sort, page, isLoading, setSort, setPage, buildFilterQuery } = useFilterStore((state) => state);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const menu = t.raw('sort') as { title: string; value: string }[];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value: string) => {
    setSort(value);
    setAnchorEl(null);
    router.replace(`?${buildFilterQuery()}`, { scroll: false });
  };

  const lastPage = tourData?.meta.last_page || 1;

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    router.replace(`?${buildFilterQuery()}`, { scroll: false });
  };

  // if (!isLoading) {
  //   return (
  //     <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
  //       <Loader />
  //     </div>
  //   )
  // }

  if (tourData.data.length === 0) {
    return (
      <div>
        {t('not_found')}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5 items-start justify-start">
      <div className="w-full flex items-center justify-between min-h-[57px] [@media(max-width:1024px)]:justify-end">
        <p className="block [@media(max-width:1024px)]:hidden">
          {t('showing')} {tourData?.meta.from} - {tourData?.meta.to} {t('out')} {tourData?.meta.total}
        </p>
        <p
          onClick={handleClick}
          className="flex items-center justify-center gap-3 text-[#16372D] cursor-pointer"
        >
          <span className="text-[16px]">
            {menu.find((el) => el.value === sort)?.title || menu[0].title}
          </span>
          <FaChevronDown
            className={`transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
          />
        </p>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          sx={{ '& .MuiPaper-root': { borderRadius: '16px' } }}
          onClose={() => handleClose(sort)}
        >
          {menu.map((el) => (
            <MenuItem key={el.value} onClick={() => handleClose(el.value)}>
              {el.title}
            </MenuItem>
          ))}
        </Menu>
      </div>

      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-5 w-full [@media(max-width:1024px)]:hidden">
          {!isLoading && tourData?.data.length
            ? tourData?.data?.map((el: AllToursCardType) => (
              <div
                key={el.id}
                className="grid grid-cols-[353px_1fr] grid-rows-[254px] items-center w-full bg-white rounded-[16px] shadow-2xl overflow-hidden h-full"
              >
                <div className="bg-[#16372D] w-full h-full overflow-hidden">
                  {el.photo.file && (
                    <Image
                      src={el.photo.file}
                      alt={el.photo.alt_text || el.name || ''}
                      width={500}
                      height={300}
                      loading="lazy"
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div className="w-full p-5 grid grid-cols-1 grid-rows-3 gap-0 items-center h-full">
                  <div className="flex flex-row justify-between">
                    <p className="mt-[-6rem] w-1/2 text-2xl font-semibold text-white sm:mt-0 sm:text-inherit line-clamp-2">
                      {el.name}
                    </p>
                    <div className="price flex flex-row items-start gap-5">
                      <div className="flex flex-col justify-between gap-2 h-full">
                        <span className="price-begin text-custom-gray-500 text-md text-center">
                          {t('days')}
                        </span>
                        <span className="price-value text-custom-green-900 text-2xl font-bold">
                          {el.days}
                        </span>
                      </div>
                      <Divider orientation="vertical" className="bg-gray-500-gray mx-5" />
                      <div className="flex flex-col justify-between gap-2 h-full">
                        <span className="price-begin text-custom-gray-500 text-sm">
                          {t('from')}
                        </span>
                        <span className="price-value text-custom-green-900 text-2xl font-bold">
                          ${el.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 hidden items-center md:flex">
                    <div className="bg-[#CFDFD9] p-1 rounded-[10px]">
                      <IoLocationOutline size={34} />
                    </div>
                    <div className="ml-2">
                      <h5 className="text-md text-gray-900">{t('location')}</h5>
                      <p className="truncate overflow-hidden max-w-[400px] font-normal text-[#9B9B9B]">
                        {el.destination.name}
                      </p>
                    </div>
                  </div>
                  <Link
                    className="bg-[#27A430] w-full text-center rounded-[16px] py-[10px] shadow-2xl text-white transition-all hover:bg-[#66B93E] active:bg-[#27A430] max-h-[50px]"
                    href={`/${locale}/${el.destination.slug}/${el.slug}`}
                  >
                    {t('view_itinerary')}
                  </Link>
                </div>
              </div>
            ))
            : Array.from({ length: 5 })
              .fill(1)
              .map((_, i) => (
                <Skeleton
                  sx={{ borderRadius: '15px', backgroundColor: '#16372D' }}
                  variant="rectangular"
                  width={'100%'}
                  key={i}
                  height={300}
                />
              ))}
        </div>
        <div className="hidden grid-cols-3 gap-5 w-full [@media(max-width:1024px)]:grid [@media(max-width:768px)]:grid-cols-1">
          {!isLoading && tourData?.data.length
            ? tourData?.data.map((el: AllToursCardType) => <BestSellersPackagesCard key={el.id} slide={el} />)
            : Array.from({ length: 5 })
              .fill(2)
              .map((_, i) => (
                <Skeleton
                  sx={{ borderRadius: '15px', backgroundColor: '#16372D' }}
                  variant="rectangular"
                  width={'100%'}
                  height={375}
                  key={i}
                />
              ))}
        </div>
        {lastPage && lastPage > 1 ? (
          <Pagination
            color="primary"
            count={lastPage}
            page={Number(page)}
            size="medium"
            onChange={handlePageChange}
            shape="rounded"
          />
        ) : null}
      </div>
    </div>
  );
};
