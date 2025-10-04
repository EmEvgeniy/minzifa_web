'use client';

import { useFavoriteStore } from './store';

function FavoriteBtn() {
  const { tours, setActive } = useFavoriteStore((state) => state);

  if (!tours.length) return null;

  return (
    <div
      className="fixed right-5 md:right-20 z-50 bottom-20 bg-white rounded-full p-5 shadow-2xl cursor-pointer hover:scale-110 active:scale-95 transition-all max-[1024px]:p-3"
      onClick={() => setActive(true)}
    >
      <div className="relative">
        <svg
          className="!w-[50px] !h-[50px] text-red-600 max-[1024px]:!w-[35px] max-[1024px]:!h-[35px]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
          {Math.min(tours.length, 999)}
        </span>
      </div>
    </div>
  );
}

export default FavoriteBtn;
