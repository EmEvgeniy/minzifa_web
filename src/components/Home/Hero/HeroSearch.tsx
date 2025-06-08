import React from 'react';
import { RiSearch2Line } from 'react-icons/ri';

export const HeroSearch = () => {
  return (
    <div className="bg-white max-w-[320px] px-[5px] py-[11px] w-full flex items-center justify-between gap-1 rounded-[16px] mt-[1px]">
      <RiSearch2Line size={30} className="text-[#16372DCC]" />
      <input
        placeholder="123"
        className="text-[#16372DCC] w-full focus:outline-none text-[18px] "
      />
      <button className="bg-[#27A430] p-[9.8px] rounded-[16px] hover:bg-[#208B28] cursor-pointer transition-all active:scale-110">
        <RiSearch2Line size={28.8} />
      </button>
    </div>
  );
};
