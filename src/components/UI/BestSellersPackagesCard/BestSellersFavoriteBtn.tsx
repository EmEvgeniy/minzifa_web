'use client';

import { FaHeart } from 'react-icons/fa';
import { useFavoriteStore } from '../FavoriteBtn/store';
import { BestSellersPackagesCardType } from './_types';
import { FaRegHeart } from 'react-icons/fa6';

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
      className="absolute top-3 right-3 z-20 cursor-pointer bg-white rounded-full p-2.5"
    >
      {isFavorite ? (
        <FaHeart size={20} className="text-red-600" />
      ) : (
        <FaRegHeart size={20} className={'text-foreground'} />
      )}
    </button>
  );
}

export default BestSellersFavoriteBtn;
