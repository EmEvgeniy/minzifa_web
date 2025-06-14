'use client';
import { useGetQuery } from '@/api/get.api';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useLocale, useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { AllToursCardType } from './_types';
import Image from 'next/image';
import Divider from '@mui/material/Divider';
import { IoLocationOutline } from 'react-icons/io5';
import Link from 'next/link';
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';
import { BestSellersPackagesCard } from '@/components/UI';

export const ToursView = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState<string>('newest');
  const [title, setTitle] = useState<string>('newest');
  const [page, setPage] = useState<number>(1);
  const perPage = 5;
  const open = Boolean(anchorEl);
  const t = useTranslations('');
  const menu = t.raw('all_tours.sort') as { title: string; value: string }[];
  const locale = useLocale();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: string, val: string) => {
    setValue(event);
    setTitle(val);
    setAnchorEl(null);
  };

  const { data, isSuccess, isLoading } = useGetQuery<AllToursCardType[]>({
    key: ['all_tours', value, `${page}`],
    page: String(page),
    perPage: String(perPage),
    url: 'tours',
    searchItem: '',
    additionalParam: `&all=true&main_page=1&sort=${value}&page=${page}&perPage=${perPage}`,
  });
  const totalPages = Math.ceil((data?.length || 0) / perPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div className="w-full flex flex-col gap-5 items-start justify-start">
      <div className="w-full flex items-center justify-between min-h-[57px] [@media(max-width:1024px)]:justify-end">
        <p className="block [@media(max-width:1024px)]:hidden">
          {t('all_tours.showing')} {page} - {totalPages} {t('all_tours.out')} {data?.length}
        </p>
        <p
          onClick={handleClick}
          className="flex items-center justify-center gap-3 text-[#16372D] cursor-pointer"
        >
          <span className="text-[16px]">{title}</span>
          <FaChevronDown
            className={`transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
          />
        </p>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          sx={{ '& .MuiPaper-root': { borderRadius: '16px' } }}
          onClose={() => handleClose(value, title)}
        >
          {menu.map((el) => (
            <MenuItem key={el.value} onClick={() => handleClose(el.value, el.title)}>
              {el.title}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-5 w-full [@media(max-width:1024px)]:hidden">
          {!isLoading && isSuccess
            ? data.slice((page - 1) * perPage, page * perPage).map((el: AllToursCardType) => (
                <div
                  key={el.id}
                  className="grid grid-cols-2 w-full bg-white rounded-[16px] shadow-2xl overflow-hidden max-h-[350px] h-full"
                >
                  <div className="bg-[#16372D] w-full h-full">
                    {el.photo.file && (
                      <Image
                        src={el.photo.file}
                        alt={el.photo.alt_text || ''}
                        width={500}
                        height={300}
                        className="object-cover w-full h-full "
                      />
                    )}
                  </div>
                  <div className="w-full p-[10px] grid grid-cols-1 grid-rows-3 gap-0 items-center h-full">
                    <div className="flex flex-row justify-between">
                      <p className="mt-[-6rem] w-1/2 text-[16px] font-semibold  text-white sm:mt-0 sm:text-inherit">
                        {el.name}
                      </p>
                      <div className="price flex flex-row items-start gap-5">
                        <div className="flex flex-col justify-between gap-2 h-full">
                          <span className="price-begin text-custom-gray-500 text-md text-center">
                            {t('all_tours.days')}
                          </span>
                          <span className="price-value text-custom-green-900 text-[16px] font-bold">
                            {el.days}
                          </span>
                        </div>
                        <Divider orientation="vertical" className="bg-gray-500-gray mx-5" />
                        <div className="flex flex-col justify-between gap-2 h-full">
                          <span className="price-begin text-custom-gray-500 text-sm">
                            {t('all_tours.from')}
                          </span>
                          <span className="price-value text-custom-green-900 text-[16px] font-bold">
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
                        <h5 className="text-md text-gray-900">{t('all_tours.location')}</h5>
                        <p className="truncate overflow-hidden whitespace-nowrap max-w-[300px] font-normal">
                          {el.destinations}
                        </p>
                      </div>
                    </div>
                    <Link
                      className="bg-[#27A430] w-full text-center rounded-[16px] py-[10px] shadow-2xl text-white transition-all hover:bg-[#66B93E] active:bg-[#27A430] max-h-[50px]"
                      href={`/${locale}/${el.destination.slug}/${el.slug}`}
                    >
                      {t('View_itinerary')}
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
        <div className="hidden grid-cols-3 gap-5 w-full [@media(max-width:1024px)]:grid [@media(max-width:768px)]:grid-cols-1 ">
          {!isLoading && isSuccess
            ? data
                .slice((page - 1) * perPage, page * perPage)
                .map((el: AllToursCardType) => <BestSellersPackagesCard key={el.id} slide={el} />)
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
        {totalPages ? (
          <Pagination
            color="primary"
            count={totalPages}
            page={page}
            size="medium"
            onChange={handlePageChange}
            shape="rounded"
          />
        ) : null}
      </div>
    </div>
  );
};
