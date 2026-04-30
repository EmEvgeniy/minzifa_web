'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { cn } from '@/utils/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownContextType,
  DropdownDetailsProps,
  DropdownItemProps,
  DropdownProps,
  DropdownSummaryProps,
} from './_types';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export function Dropdown<T extends Record<string, unknown>>({
  children,
  className,
  summaryClassName,
  detailsClassName,
  value,
  onChange,
  options = [],
  placeholder = '',
  labelKey = 'label' as keyof T & string,
  valueKey = 'value' as keyof T & string,
  getLabel,
  getValue,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | number | undefined>(value);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = useCallback((state?: boolean) => {
    setIsOpen((prev) => (typeof state === 'boolean' ? state : !prev));
  }, []);

  const resolveValue = useCallback(
    (opt: T | string | number | null | undefined): string | number | undefined => {
      if (opt == null) return undefined;
      if (typeof opt !== 'object') return String(opt);
      if (getValue) return getValue(opt);
      const v = opt[valueKey];
      return v !== undefined ? String(v) : undefined;
    },
    [getValue, valueKey],
  );

  const resolveLabel = useCallback(
    (opt: T | string | number | null | undefined): string => {
      if (opt == null) return '';
      if (typeof opt !== 'object') return String(opt);
      if (getLabel) return getLabel(opt);
      const l = opt[labelKey] ?? resolveValue(opt);
      return l !== undefined ? String(l) : '';
    },
    [getLabel, labelKey, resolveValue],
  );

  const handleChange = useCallback(
    (val: string | number | undefined) => {
      setInternalValue(val);
      onChange?.(val);
      setIsOpen(false);
    },
    [onChange],
  );

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      isOpen,
      toggle,
      value: internalValue,
      onChange: handleChange,
    }),
    [isOpen, internalValue, handleChange, toggle],
  );

  return (
    <DropdownContext.Provider value={contextValue}>
      <div ref={ref} className={cn('relative inline-block w-full', className)}>
        {typeof children === 'function' ? children({ isOpen, toggle, value: internalValue }) : children || (
          <>
            <DropdownSummary className={summaryClassName}>
              <div className="flex justify-between items-center gap-3">
                <span>{placeholder}</span>
                <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
              </div>
            </DropdownSummary>

            <DropdownDetails className={detailsClassName}>
              {options.map((opt, idx) => {
                const optValue = resolveValue(opt);
                const label = resolveLabel(opt);
                const key = String(optValue ?? idx);

                return (
                  <DropdownItem key={key} onClick={() => handleChange(optValue)}>
                    {label}
                  </DropdownItem>
                );
              })}
            </DropdownDetails>
          </>
        )}
      </div>
    </DropdownContext.Provider>
  );
}

export const DropdownSummary = ({ children, className }: DropdownSummaryProps) => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('DropdownSummary must be used within a Dropdown');

  const rendered = useMemo(() => {
    if (typeof children === 'function') {
      return children({ isOpen: context.isOpen, toggle: context.toggle });
    }
    return children;
  }, [children, context.isOpen, context.toggle]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        context.toggle();
      }}
      onKeyDown={(e) => e.key === 'Enter' && context.toggle()}
      tabIndex={0}
      role="button"
      aria-expanded={context.isOpen}
      className={cn('cursor-pointer select-none outline-none', className)}
    >
      {rendered}
    </div>
  );
};


export const DropdownDetails = ({ children, className, position = 'left' }: DropdownDetailsProps) => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('DropdownDetails must be used within a Dropdown');

  const rendered = useMemo(() => {
    if (typeof children === 'function') {
      return children({ isOpen: context.isOpen, toggle: context.toggle });
    }
    return children;
  }, [children, context.isOpen, context.toggle]);

  const positionClass = {
    left: 'left-0',
    right: 'right-0',
    full: 'left-0 right-0',
  }[position];

  return (
    <AnimatePresence>
      {context.isOpen && (
        <motion.div
          key="dropdown-content"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          role="menu"
          className={cn(
            'absolute mt-2 rounded-md bg-white shadow-lg border border-gray-200 z-30',
            positionClass,
            className,
          )}
        >
          {rendered}
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export const DropdownItem = ({ children, onClick, className }: DropdownItemProps) => {
  const context = useContext(DropdownContext);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
        context?.toggle(false);
      }}
      role="menuitem"
      className={cn(
        'cursor-pointer px-4 py-2 hover:bg-gray-100 transition-colors',
        className,
      )}
    >
      {children}
    </div>
  );
};
