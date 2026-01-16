'use client';


import { ArticleCategory } from '@/app/[locale]/(main)/adventures/page';
import { ArticleCardType } from '@/components/UI/ArticleCard/_types';
import ArticleCard from '@/components/UI/ArticleCard/ArticleCard';
import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { EmblaCarousel } from '@/components/UI/EmblaCarousel';
import { EmblaCarouselType } from 'embla-carousel';
import { usePrevNextButtons } from '@/components/UI/EmblaCarousel/usePrevNextButtons';
import { useGetInfiniteQuery } from '@/api/get.api';
import { Dropdown } from '@/components/UI/Dropdown/Dropdown';

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
  const [selectedCategory, setSelectedCategory] = useState<string[]>(['all']);
  const [selectedSort, setSelectedSort] = useState<string>(menu[0].value);

  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  const handleAlignment = (newAlignment: string) => {
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
    params.append('sort', selectedSort);
    return params.toString();
  };

  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isLoading,
  } = useGetInfiniteQuery<ArticleCardType>({
    key: ['articles_main', locale, selectedSort, selectedCategory.sort().join('_')],
    url: 'articles',
    perPage: '12',
    searchItem: '',
    additionalParam: `&${queryBuilder()}`,
  });
  const filteredArticles = data?.pages?.flatMap((page) => page.data) ?? [];

  const initCategories = [
    {
      id: 0,
      name: all_categories,
      slug: 'all',
      count: data?.pages[0]?.data?.length as number
    },
    ...categories
  ];

  useEffect(() => {
    refetch();
  }, [selectedCategory, selectedSort, refetch]);

  return (
    <section className="container py-[70px] min-h-[50svh] flex flex-col gap-5">
      {/* Заголовок */}
      <div className="flex items-center justify-between w-full">
        <h2 className="text-[42px] max-[768px]:text-[24px] max-[768px]:font-semibold">{titleT}</h2>
        <p className="text-[42px] max-[768px]:text-[20px] max-[768px]:font-semibold">
          {filteredArticles.length > 0 ? filteredArticles.length : 0}
        </p>
      </div>

      {/* Фильтры */}
      <div className="flex flex-col-reverse md:flex-row gap-5 items-center justify-between w-full">
        <div className="flex items-center gap-4 justify-center">
          {/* Кнопка назад */}
          <button
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            className="cursor-pointer p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronDown className="rotate-90 text-[#16372D]" />
          </button>
          <div className='max-w-4xl'>
            <EmblaCarousel<ArticleCategory>
              slides={initCategories}
              renderSlide={(category: ArticleCategory) => (
                <button
                  key={category.id}
                  onClick={() =>
                    handleAlignment(category.name)
                  }
                  className={`flex-[0_0_5%] px-4 py-2 rounded-full text-sm font-medium transition-colors min-w-max ${selectedCategory.includes(category.name)
                    ? 'bg-[#16372D] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {category.name}
                </button>
              )}
              onInit={setEmblaApi}
              options={{
                align: 'start',
                skipSnaps: false,
                dragFree: true,
              }}
              className="gap-2.5"
            />
          </div>

          {/* Кнопка вперёд */}
          <button
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            className="cursor-pointer p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronDown className="-rotate-90 text-[#16372D]" />
          </button>
        </div>

        {/* Меню сортировки */}
        <Dropdown
          options={menu}
          labelKey='title'
          placeholder={menu.find((el) => el.value === selectedSort)?.title || menu[0].title}
          value={selectedSort}
          onChange={(value) => setSelectedSort(value as string)}
          className='w-auto'
        />
      </div>

      {/* Контент */}
      <div className="flex items-center justify-center flex-col gap-5">
        <div className="grid grid-cols-3 gap-5 min-h-[50svh] w-full max-[768px]:grid-cols-2 max-[550px]:grid-cols-1">
          {!isLoading && filteredArticles.length > 0
            ? filteredArticles.map((el) => <ArticleCard locale={locale} key={el.id} article={el} />)
            : Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-[376px] rounded-[15px] bg-[#16372D] animate-pulse"
              />
            ))
          }

          {isFetchingNextPage &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`loading-more-${i}`}
                className="w-full h-[376px] rounded-[15px] bg-[#16372D] animate-pulse"
              />
            ))}
        </div>

        {/* Кнопка "Показать ещё" */}
        {hasNextPage && (
          <button
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="bg-[#DCDCDC] flex items-center justify-center gap-2 text-black py-[10px] px-[20px] rounded-[16px] shadow-2xl hover:scale-110 active:scale-90 transition-all cursor-pointer disabled:opacity-60"
          >
            <span>
              {isFetchingNextPage
                ? locale === 'en'
                  ? 'Loading...'
                  : 'Загрузка...'
                : btn}
            </span>
            <FaChevronDown className={isFetchingNextPage ? 'animate-bounce' : ''} />
          </button>
        )}
      </div>
    </section>
  );
}
