'use client';
import { useGetQuery } from '@/api/get.api';
import { ArticleCard } from '@/components/UI';
import { ArticleCardType } from '@/components/UI/ArticleCard/_types';
import { Menu, MenuItem, Skeleton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

// type ArticleDetail = {
//   id: number;
//   name: string;
//   published: string;
//   description: string;
//   media: {
//     file: string;
//     alt?: string;
//   };
// };

type ArticleListResponse = {
  data: ArticleCardType[];
  meta: { total: number };
};

export const ArticlesMain = () => {
  const t = useTranslations('articles');
  const btns = t.raw('btns') as { title: string; value: string }[];
  const menu = t.raw('sort') as { title: string; value: string }[];
  const [size, setSize] = useState<number>(9);
  const [alignment, setAlignment] = useState<string | null>('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [value, setValue] = useState<string>('newest');
  const [title, setTitle] = useState<string>('newest');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: string, val: string) => {
    setValue(event);
    setTitle(val);
    setAnchorEl(null);
  };

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment);
  };

  const { data, isFetching, isLoading, isRefetching } = useGetQuery<ArticleListResponse>({
    key: ['articles_main', `${size}`, `${value}`, `${alignment}`],
    page: '1',
    perPage: `${size}`,
    url: 'articles',
    searchItem: '',
    additionalParam: `&sort=${value}`,
  });

  return (
    <section className="container py-[70px] min-h-[50svh] flex flex-col gap-5">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-[42px]">{t('title')}</h2>
        <p className="text-[42px]">{data?.meta?.total}</p>
      </div>
      <div className="flex items-center justify-between">
        <ToggleButtonGroup
          value={alignment}
          color="secondary"
          size="small"
          exclusive
          onChange={handleAlignment}
        >
          {btns.map((el) => (
            <ToggleButton value={el.value} key={el.value}>
              {el.title}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
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
      <div className="flex items-center justify-center flex-col gap-5">
        <div className="grid grid-cols-3 gap-5 min-h-[50svh] w-full">
          {!isLoading && !isRefetching && !isFetching
            ? data?.data.map((el: ArticleCardType) => <ArticleCard key={el.id} article={el} />)
            : size > 0 &&
              Array.from({ length: size })
                .fill(22)
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    sx={{ borderRadius: '15px', backgroundColor: '#16372D' }}
                    variant="rectangular"
                    width={'100%'}
                    height={376}
                  />
                ))}
        </div>
        {data?.meta?.total !== size && (
          <button
            onClick={() => setSize(size + 9)}
            className="bg-[#DCDCDC] flex items-center justify-center gap-2 text-black py-[10px] px-[20px] rounded-[16px] shadow-2xl hover:scale-110 active:scale-90 transition-all cursor-pointer"
          >
            <span>{t('show_more')}</span>
            <FaChevronDown />
          </button>
        )}
      </div>
    </section>
  );
};
