'use client';

import { ReactNode, useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

interface FilterAccordionProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

export default function FilterAccordion({
  title,
  children,
  defaultExpanded = true,
  className = '',
}: FilterAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`w-full ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
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
