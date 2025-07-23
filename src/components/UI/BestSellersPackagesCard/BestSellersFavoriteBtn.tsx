'use client';

import { FaHeart } from 'react-icons/fa';
import { useFavoriteStore } from '../FavoriteBtn/store';
import { cn } from '@/utils/utils';
import { BestSellersPackagesCardType } from './_types';

type Props = {
  tour: BestSellersPackagesCardType;
};

function BestSellersFavoriteBtn({ tour }: Props) {
  const { tours, setTours } = useFavoriteStore((s) => s);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const exists = tours.find((el) => el && el.slug === tour.slug);

    if (exists) {
      setTours(tours.filter((el) => el?.slug !== tour.slug));
    } else {
      setTours([...tours, tour]);
    }
  };

  const isFavorite = tours.some((el) => el && el.slug === tour.slug);

  return (
    <button
      type="button"
      aria-label="Toggle favorite"
      onClick={handleToggle}
      className="absolute top-3 right-3 z-20 cursor-pointer"
    >
      <FaHeart className={cn('text-white text-[30px]', isFavorite && 'text-red-600')} />
    </button>
  );
}

export default BestSellersFavoriteBtn;
