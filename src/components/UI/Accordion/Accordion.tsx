'use client';

import { cn } from '@/utils';
import { ReactNode, useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface AccordionProps {
  title: ReactNode | string | undefined;
  children: ReactNode;
  defaultExpanded?: boolean;
  isExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  className?: string;
}

export default function Accordion({
  title,
  children,
  defaultExpanded = false,
  isExpanded: controlledExpanded,
  onToggle,
  className = '',
}: AccordionProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;

  const handleToggle = () => {
    const newState = !expanded;
    if (isControlled) {
      onToggle?.(newState);
    } else {
      setInternalExpanded(newState);
      onToggle?.(newState);
    }
  };

  useEffect(() => {
    if (!isControlled) {
      setInternalExpanded(defaultExpanded);
    }
  }, [defaultExpanded, isControlled]);

  return (
    <div className={`w-full ${className}`}>
      <button
        onClick={handleToggle}
        className={cn(
          'w-full text-left p-5 bg-white rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer group',
          expanded ? 'pb-0' : 'pb-5',
        )}
      >
        <p className="text-lg font-semibold text-gray-800 transition-colors">{title}</p>
        <div className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
          <FaChevronDown className="w-5 h-5 text-gray-500 transition-colors" />
        </div>
      </button>

      <div
        className={cn(
          `transition-all duration-300 ease-in-out overflow-hidden ${
            expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`,
        )}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
