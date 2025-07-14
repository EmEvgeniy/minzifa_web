'use client';

import { Badge } from '@mui/material';
import { useFavoriteStore } from './store';
import FavoriteIcon from '@mui/icons-material/Favorite';

function FavoriteBtn() {
  const { tours, setActive } = useFavoriteStore((state) => state);

  return (
    <div
      className="fixed right-20 z-50 bottom-20 bg-white rounded-full p-5 shadow-2xl cursor-pointer hover:scale-110 active:scale-95 transition-all"
      onClick={() => setActive(true)}
    >
      <Badge color="secondary" overlap="circular" badgeContent={tours.length} max={999}>
        <FavoriteIcon className="!text-[50px] text-red-600" />
      </Badge>
    </div>
  );
}

export default FavoriteBtn;
