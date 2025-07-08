'use client';
import { useFilterStore } from './store';
import { IoCloseCircle } from 'react-icons/io5';

function FilterResetBtn({ title }: { title: string }) {
  const { resetFilters } = useFilterStore();

  const handleReset = () => {
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
