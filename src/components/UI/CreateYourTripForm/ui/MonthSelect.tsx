'use client';
import { useState } from 'react';
import { IoIosCalendar } from 'react-icons/io';
import { FaChevronDown } from 'react-icons/fa';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function MonthYearSelect() {
  const [selected, setSelected] = useState('January 2025');

  const years = Array.from({ length: 2030 - 2025 + 1 }, (_, i) => 2025 + i);
  const options = years.flatMap((year) => months.map((month) => `${month} ${year}`));

  return (
    <div className="relative w-full max-w-[300px] max-[650px]:max-w-full">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full appearance-none bg-white shadow-2xl rounded-2xl pl-10 pr-10 py-3  text-gray-700 focus:outline-none cursor-pointer text-[16px] max-[650px]:text-[12px] max-[920px]:border-[#D8DADC] max-[920px]:border-1  max-[920px]:shadow-[0px_4px_18px_0px_#0000002B]"
      >
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
      <IoIosCalendar className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none " />
      <FaChevronDown className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none max-[620px]:w-[12px]" />
    </div>
  );
}
