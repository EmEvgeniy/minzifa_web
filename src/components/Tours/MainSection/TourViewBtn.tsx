'use client';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { FaChevronDown } from 'react-icons/fa6';
import { useState } from 'react';
import { useFilterStore } from './store';
import { useRouter } from 'next/navigation';

function TourViewBtn({ menu }: { menu: { title: string; value: string }[] }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { sort, setSort, buildFilterQuery } = useFilterStore((state) => state);
  const open = Boolean(anchorEl);
  const router = useRouter();


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value: string) => {
    setSort(value);
    setAnchorEl(null);
    router.replace(`?${buildFilterQuery().toString()}`, { scroll: false });
  };

  return (
    <>
      {' '}
      <p
        onClick={handleClick}
        className="flex items-center justify-center gap-3 text-[#16372D] cursor-pointer"
      >
        <span className="text-[16px]">
          {menu.find((el) => el.value === sort)?.title || menu[0].title}
        </span>
        <FaChevronDown
          className={`transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
        />
      </p>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        sx={{ '& .MuiPaper-root': { borderRadius: '16px' } }}
        onClose={() => handleClose(sort)}
      >
        {menu.map((el) => (
          <MenuItem key={el.value} onClick={() => handleClose(el.value)}>
            {el.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default TourViewBtn;
