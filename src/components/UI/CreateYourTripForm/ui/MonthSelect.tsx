'use client';
import { useEffect } from 'react';
import { IoIosCalendar } from 'react-icons/io';
import { FaChevronDown } from 'react-icons/fa';
import { useQuizStore } from '@/store/quizStore';

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

export default function MonthYearSelect({ onChange }: { onChange?: () => void }) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonthIndex = now.getMonth();

  const years = Array.from({ length: 2030 - 2025 + 1 }, (_, i) => 2025 + i);

  // Формируем список опций только с текущего месяца
  const options = years.flatMap((year) =>
    months
      .map((month, monthIndex) => {
        if (year === currentYear && monthIndex < currentMonthIndex) {
          return null; // пропускаем прошлые месяцы
        }
        return `${month} ${year}`;
      })
      .filter(Boolean) as string[]
  );

  const { formData: { whenGo }, setWhenGo } = useQuizStore();

  useEffect(() => {
    setWhenGo(options[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full max-w-[300px] max-[650px]:max-w-full">
      <select
        value={whenGo}
        onChange={(e) => {
          setWhenGo(e.target.value);
          if (onChange) onChange();
        }}
        className="w-full appearance-none bg-white shadow-2xl rounded-2xl pl-10 pr-10 py-3  text-gray-700 focus:outline-none cursor-pointer text-[16px] max-[650px]:text-[12px] border-[#D8DADC] border-1  max-[920px]:shadow-[0px_4px_18px_0px_#0000002B]"
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
