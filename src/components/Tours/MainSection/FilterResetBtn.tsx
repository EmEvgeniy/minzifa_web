'use client';

import { usePathname, useRouter } from 'next/navigation';
import { IoCloseCircle } from 'react-icons/io5';
import { useFilterStore } from './store';

function FilterResetBtn({ title }: { title: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const { resetFilters } = useFilterStore();

  const handleReset = () => {
    router.replace(pathname, { scroll: false });
    resetFilters();
  };

  return (
    <button
      onClick={handleReset}
      className="bg-white flex items-center justify-center gap-2 px-[20px] py-[13.5px] rounded-[30px] hover:bg-gray-300 cursor-pointer transition-all active:bg-white [@media(max-width:1024px)]:hidden "
    >
      <span className="text-[18px]">{title}</span>
      <IoCloseCircle size={30} className="text-green-600" />
    </button>
  );
}

export default FilterResetBtn;
