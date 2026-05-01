'use client';

import { useLocale } from 'next-intl';
import { useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/components/UI/CustomDatepicker/CustomDatepicker.scss';
import { useFilterStore } from '@/store';
import { useTranslations } from 'next-intl';
import Accordion from '@/components/UI/Accordion';
import { FaCalendarAlt } from 'react-icons/fa';

export default function FilterDateRange() {
  const locale = useLocale();
  const t = useTranslations('allTours');
  const { dateFrom, dateTo, setDateRange, expandedFilters, setExpandedFilter } = useFilterStore();

  const [localFrom, setLocalFrom] = useState<Date | null>(dateFrom ? new Date(dateFrom) : null);
  const [localTo, setLocalTo] = useState<Date | null>(dateTo ? new Date(dateTo) : null);

  const accordionKey = 'date';
  const isExpanded = expandedFilters[accordionKey] ?? true;

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
    <Accordion
      title={t('filterDateTitle')}
      isExpanded={isExpanded}
      onToggle={(expanded) => setExpandedFilter(accordionKey, expanded)}
    >
      <div className="relative">
        <DatePicker
          selectsRange
          startDate={localFrom}
          endDate={localTo}
          onChange={handleChange}
          minDate={new Date()}
          monthsShown={2}
          dateFormat={dateFormat}
          popperPlacement="bottom-start"
          popperClassName="!z-50"
          popperProps={{
            strategy: 'fixed',
          }}
          customInput={
            <div className="relative flex items-center rounded-2xl border border-gray-300 hover:border-gray-400 focus-within:border-[#27A430] focus-within:ring-2 focus-within:ring-[#27A430]/20 bg-white transition-all duration-200">
              <div className="absolute left-4 text-gray-400 pointer-events-none z-10">
                <FaCalendarAlt size={14} />
              </div>
              <input
                value={displayValue}
                placeholder={t('dateRangePlaceholder') || 'Start date - End date'}
                className="w-full bg-transparent outline-none text-gray-900 text-base placeholder-gray-400 px-4 py-3 pl-12 rounded-2xl disabled:text-gray-400"
                readOnly
              />
            </div>
          }
        />
      </div>
    </Accordion>
  );
}
