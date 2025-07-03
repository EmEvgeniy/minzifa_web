'use client';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { AllToursCardType, ToursResponse } from './_types';
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';
import { BestSellersPackagesCard } from '@/components/UI';
import { useFilterStore } from './store';
import { useRouter } from 'next/navigation';
import { HorizontalTourCard } from '../HorizontalTourCard';

export const ToursView = ({ tourData }: { tourData: ToursResponse }) => {
  const t = useTranslations('all_tours');
  const router = useRouter();

  const { sort, page, setSort, setPage, buildFilterQuery } = useFilterStore((state) => state);

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
          {tourData.data.length > 0
            ? tourData?.data?.map((el: AllToursCardType) => <HorizontalTourCard key={el.id} tour={el} />)
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
          {tourData?.data.length > 0
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
