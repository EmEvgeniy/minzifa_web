'use client';

import { ReactNode, useEffect } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useFilterStore } from '@/store';

interface FilterAccordionProps {
  title: string;
  children: ReactNode;
  filterKey: string; // Уникальный ключ для отслеживания состояния
  defaultExpanded?: boolean;
  className?: string;
}

export default function FilterAccordion({
  title,
  children,
  filterKey,
  defaultExpanded = true,
  className = '',
}: FilterAccordionProps) {
  const { expandedFilters, setExpandedFilter } = useFilterStore();
  const isExpanded = expandedFilters[filterKey] ?? defaultExpanded;

  const handleToggle = () => {
    setExpandedFilter(filterKey, !isExpanded);
  };

  // Синхронизируем локальное состояние с глобальным при монтировании
  useEffect(() => {
    if (!(filterKey in expandedFilters)) {
      setExpandedFilter(filterKey, defaultExpanded);
    }
  }, [filterKey, defaultExpanded, expandedFilters, setExpandedFilter]);

  return (
    <div className={`w-full ${className}`}>
      <button
        onClick={handleToggle}
        className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between"
      >
        <p className="text-[18px] font-semibold">{title}</p>
        {isExpanded ? (
          <FaChevronDown className="w-5 h-5" />
        ) : (
          <FaChevronRight className="w-5 h-5" />
        )}
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? 'max-h-[400px] opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>

      <hr className="border-gray-200 mt-2" />
    </div>
  );
}
