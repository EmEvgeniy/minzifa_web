'use client';
import { Drawer } from '@mui/material';
import { useMobFilterStore } from './store';
import { FaChevronLeft } from 'react-icons/fa6';

import { KeyboardEvent, MouseEvent, ReactNode } from 'react';

function MobileDrawler({ btn, elem }: { btn: string; elem: ReactNode }) {
  const { setOpen, open } = useMobFilterStore((s) => s);

  const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };

  return (
    <Drawer
      PaperProps={{
        sx: {
          height: '90vh', // Set height to 90% of viewport height
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          overflowX: 'hidden',
        },
      }}
      anchor={'bottom'}
      open={open}
      onClose={toggleDrawer(false)}
    >
      <div className="p-2.5 w-full  relative h-screen">
        <div className="w-full px-[10px] py-[20px] border-b-1 flex items-center sticky top-0 z-20 bg-white">
          <FaChevronLeft className="text-[]" onClick={toggleDrawer(false)} />
          <p className="text-center w-full text-[18px] font-semibold">{btn}</p>
        </div>
        <div className=" overflow-y-scroll h-screen py-[10px]">{elem}</div>
      </div>
    </Drawer>
  );
}

export default MobileDrawler;
