'use client';

import { usePathname, useRouter } from 'next/navigation';
import { IoCloseCircle } from 'react-icons/io5';
import { useFilterStore } from '@/store';
import { useTranslations } from 'next-intl';

function FilterResetBtn() {
  const t = useTranslations('all_tours');
  const router = useRouter();
  const pathname = usePathname();

  const { resetFilters, activeFiltersCount } = useFilterStore();

  const handleReset = () => {
    router.replace(pathname, { scroll: false });
    resetFilters();
  };

  return (
    <button
      onClick={handleReset}
      className="bg-white flex items-center justify-center gap-2 px-[12px] py-[13.5px] rounded-full hover:bg-gray-50 cursor-pointer transition-all active:bg-white [@media(max-width:1024px)]:hidden relative"
    >
      <span className="text-sm font-medium">{t('reset_filter_btn')}</span>
      {activeFiltersCount > 0 && (
        <span className="bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
          {activeFiltersCount > 99 ? '99+' : activeFiltersCount}
        </span>
      )}
      <IoCloseCircle size={20} className="text-green-600" />
    </button>
  );
}

export default FilterResetBtn;
