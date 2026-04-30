'use client';

import { useLocale } from 'next-intl';
import { useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/components/UI/CustomDatepicker/CustomDatepicker.scss';
import { useFilterStore } from '@/store';
import { FaCalendarAlt } from 'react-icons/fa';

export default function FilterDateRange() {
  const locale = useLocale();
  const { dateFrom, dateTo, setDateRange } = useFilterStore();

  const [localFrom, setLocalFrom] = useState<Date | null>(dateFrom ? new Date(dateFrom) : null);
  const [localTo, setLocalTo] = useState<Date | null>(dateTo ? new Date(dateTo) : null);

  const dateFormat = locale === 'en' ? 'yyyy-MM-dd' : 'dd.MM.yyyy';

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setLocalFrom(start);
    setLocalTo(end);

    const fromStr = start
      ? locale === 'en'
        ? start.toISOString().split('T')[0]
        : start.toLocaleDateString('ru-RU').split('.').reverse().join('-')
      : null;

    const toStr = end
      ? locale === 'en'
        ? end.toISOString().split('T')[0]
        : end.toLocaleDateString('ru-RU').split('.').reverse().join('-')
      : null;

    setDateRange(fromStr, toStr);
  };

  const displayValue = useMemo(() => {
    if (!localFrom && !localTo) return '';
    const formatFn = (d: Date) =>
      locale === 'en'
        ? d.toISOString().split('T')[0]
        : d.toLocaleDateString('ru-RU').split('.').reverse().join('-');

    const parts = [];
    if (localFrom) parts.push(formatFn(localFrom));
    if (localTo) parts.push(formatFn(localTo));
    return parts.join(' - ');
  }, [localFrom, localTo, locale]);

  return (
    <div className="relative flex items-center rounded-2xl transition-all duration-200 bg-white border border-gray-300 hover:border-gray-400 focus-within:border-[#27A430] focus-within:ring-2 focus-within:ring-[#27A430]/20">
      <div className="absolute left-4 text-gray-400 pointer-events-none z-10">
        <FaCalendarAlt />
      </div>
      <DatePicker
        selectsRange
        startDate={localFrom}
        endDate={localTo}
        onChange={handleChange}
        minDate={new Date()}
        monthsShown={2}
        dateFormat={dateFormat}
        className="w-full"
        customInput={
          <input
            value={displayValue}
            placeholder="Start date - End date"
            className="w-full h-full bg-transparent outline-none text-gray-900 text-base placeholder-gray-400 rounded-md disabled:text-gray-400 px-4 py-3 pl-12"
            readOnly
          />
        }
      />
    </div>
  );
}