'use client';
import { FaChevronDown } from 'react-icons/fa6';
import { useState } from 'react';
import { useFilterStore } from '@/store';
import { useRouter } from 'next/navigation';

function TourViewBtn({ menu }: { menu: { title: string; value: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const { sort, setSort, buildFilterQuery } = useFilterStore((state) => state);
  const router = useRouter();

  const handleSelect = (value: string) => {
    setSort(value);
    setIsOpen(false);
    router.replace(`?${buildFilterQuery().toString()}`, { scroll: false });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-3 text-[#16372D] cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
      >
        <span className="text-[16px]">
          {menu.find((el) => el.value === sort)?.title || menu[0].title}
        </span>
        <FaChevronDown
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop для закрытия при клике вне меню */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          {/* Кастомное выпадающее меню */}
          <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[200px]">
            {menu.map((el) => (
              <button
                key={el.value}
                type="button"
                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                onClick={() => handleSelect(el.value)}
              >
                {el.title}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TourViewBtn;
