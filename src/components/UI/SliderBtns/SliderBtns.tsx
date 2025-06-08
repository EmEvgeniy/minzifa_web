import { IoChevronBack } from 'react-icons/io5';
import type { SliderBtnsProps } from './_types';

export const SliderBtns: React.FC<SliderBtnsProps> = ({
  swiperRef,
  isBeginning,
  isEnd,
  variant = 'primary',
}) => {
  return (
    <div className="flex items-center justify-end space-x-4  w-full">
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        disabled={isBeginning}
        className={`p-3 rounded-full shadow transition ${
          isBeginning
            ? `${variant === 'primary' ? 'bg-gray-200 text-white' : 'text-black'} `
            : `${
                variant === 'primary' ? 'bg-[#16372D] text-white' : 'bg-white text-black'
              }  hover:scale-105`
        }`}
        aria-label="Предыдущий слайд"
        type="button"
      >
        <IoChevronBack size={16} />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        disabled={isEnd}
        className={`p-3 rounded-full shadow transition ${
          isEnd
            ? `${variant === 'primary' ? 'bg-gray-200 text-white' : 'text-black'} `
            : `${variant === 'primary' ? 'bg-[#16372D] text-white' : 'bg-white text-black'} `
        }`}
        aria-label="Следующий слайд"
        type="button"
      >
        <IoChevronBack size={16} className="rotate-180" />
      </button>
    </div>
  );
};
