'use client';
import { useGetQuery } from '@/api/get.api';
import { ArticleCategory } from '@/app/[locale]/adventures/page';

import { ArticleCardType } from '@/components/UI/ArticleCard/_types';
import ArticleCard from '@/components/UI/ArticleCard/ArticleCard';
import { useEffect, useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import { NavigationOptions } from 'swiper/types';

type ArticleListResponse = {
  data: ArticleCardType[];
  links: { url: string; label: string; active: boolean }[];
  meta: {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
  };
};

export default function ArticlesMain({
  categories,
  menu,
  titleT,
  btn,
  locale,
  all_categories,
}: {
  categories: ArticleCategory[];
  menu: { title: string; value: string }[];
  titleT: string;
  btn: string;
  locale: string;
  all_categories: string;
}) {
  const [page, setPage] = useState<number>(1);
  const [filteredArticles, setFilteredArticles] = useState<ArticleCardType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>(['all']);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [title, setTitle] = useState<string>(menu[0].title);
  const [value, setValue] = useState<string>(menu[0].value);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperClass>(null); // хранит инстанс swiper

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: string, val: string) => {
    setValue(event);
    setTitle(val);
    setAnchorEl(null);
  };

  const handleAlignment = (event: React.MouseEvent<HTMLButtonElement>, newAlignment: string) => {
    if (newAlignment === 'all') {
      setSelectedCategory(['all']);
    } else {
      setSelectedCategory((prev) => {
        const withoutAll = prev.filter((i) => i !== 'all');
        return withoutAll.includes(newAlignment)
          ? withoutAll.filter((i) => i !== newAlignment)
          : [...withoutAll, newAlignment];
      });
    }
  };

  const queryBuilder = () => {
    const params = new URLSearchParams();
    if (!selectedCategory.includes('all')) {
      selectedCategory.forEach((item) => params.append('categories[]', item));
    }
    params.append('sort', value);
    return params.toString();
  };

  const {
    data: articles,
    isFetching,
    isLoading,
  } = useGetQuery<ArticleListResponse>({
    key: ['articles_main', page.toString(), value, ...selectedCategory],
    page: `${page}`,
    perPage: '9',
    url: 'articles',
    searchItem: '',
    additionalParam: `&${queryBuilder()}`,
  });

  useEffect(() => {
    setPage(1);
    setFilteredArticles([]);
  }, [selectedCategory, value]);

  useEffect(() => {
    if (articles?.data) {
      setFilteredArticles((prev) => (page === 1 ? articles.data : [...prev, ...articles.data]));
    }
  }, [articles, page]);

  useEffect(() => {
    if (isFetching && page > 1) {
      setIsLoadingMore(true);
    } else {
      setIsLoadingMore(false);
    }
  }, [isFetching, page]);

  useEffect(() => {
    if (
      swiperRef.current &&
      prevRef.current &&
      nextRef.current &&
      swiperRef.current.params.navigation
    ) {
      const navigation = swiperRef.current.params.navigation as NavigationOptions;
      navigation.prevEl = prevRef.current;
      navigation.nextEl = nextRef.current;

      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <section className="container py-[70px] min-h-[50svh] flex flex-col gap-5">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-[42px] max-[768px]:text-[24px] max-[768px]:font-semibold">{titleT}</h2>
        <p className="text-[42px] max-[768px]:text-[20px] max-[768px]:font-semibold">
          {filteredArticles.length > 0 ? filteredArticles.length : 0}
        </p>
      </div>
      <div className="flex flex-col-reverse md:flex-row gap-5 md:gap-20 items-center justify-between w-full">
        <div className="w-full flex items-center gap-4 overflow-hidden">
          {/* Кнопка назад */}
          <div
            ref={prevRef}
            className="cursor-pointer p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-all"
          >
            <FaChevronDown className="rotate-90 text-[#16372D]" />
          </div>

          <Swiper
            spaceBetween={10}
            freeMode={true}
            modules={[FreeMode, Navigation]}
            className="!pb-2"
            slidesPerView={'auto'}
            onSwiper={(swiperInstance) => {
              swiperRef.current = swiperInstance;
            }}
          >
            <SwiperSlide className="!w-auto">
              <button
                onClick={() => handleAlignment({} as React.MouseEvent<HTMLButtonElement>, 'all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-w-max ${
                  selectedCategory.includes('all')
                    ? 'bg-[#16372D] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {all_categories}
              </button>
            </SwiperSlide>
            {categories.map((el) => (
              <SwiperSlide key={el.id} className="!w-auto">
                <button
                  onClick={() =>
                    handleAlignment({} as React.MouseEvent<HTMLButtonElement>, el.name)
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-w-max ${
                    selectedCategory.includes(el.name)
                      ? 'bg-[#16372D] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {el.name}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Кнопка вперёд */}
          <div
            ref={nextRef}
            className="cursor-pointer p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-all"
          >
            <FaChevronDown className="-rotate-90 text-[#16372D]" />
          </div>
        </div>
        <div
          onClick={handleClick}
          className="self-end md:self-auto flex items-center justify-center gap-3 text-[#16372D] cursor-pointer"
        >
          <span className="text-[16px]">{title}</span>
          <FaChevronDown
            className={`transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
          />
        </div>
        {open && (
          <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
            {menu.map((el) => (
              <button
                key={el.value}
                onClick={() => handleClose(el.value, el.title)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
              >
                {el.title}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center flex-col gap-5">
        <div className="grid grid-cols-3 gap-5 min-h-[50svh] w-full max-[768px]:grid-cols-2 max-[550px]:grid-cols-1">
          {!isLoading && !isFetching && filteredArticles.length > 0
            ? filteredArticles.map((el) => <ArticleCard locale={locale} key={el.id} article={el} />)
            : Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full h-[376px] rounded-[15px] bg-[#16372D] animate-pulse"
                />
              ))}

          {isFetching &&
            page > 1 &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`loading-more-${i}`}
                className="w-full h-[376px] rounded-[15px] bg-[#16372D] animate-pulse"
              />
            ))}
        </div>
        {articles?.meta && articles.meta.total > filteredArticles.length && (
          <button
            disabled={isLoadingMore}
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-[#DCDCDC] flex items-center justify-center gap-2 text-black py-[10px] px-[20px] rounded-[16px] shadow-2xl hover:scale-110 active:scale-90 transition-all cursor-pointer disabled:opacity-60"
          >
            <span>{isLoadingMore ? (locale == 'en' ? 'Loading...' : 'Загрузка...') : btn}</span>
            <FaChevronDown className={isLoadingMore ? 'animate-bounce' : ''} />
          </button>
        )}
      </div>
    </section>
  );
}
