'use client';

import React from 'react';
import { CounterProps } from './_types';
import { cn } from '@/utils/utils';
import { FaMinus, FaPlus } from 'react-icons/fa6';

const Counter: React.FC<CounterProps> = ({
  value,
  onChange,
  min = 0,
  max = Infinity,
  label = 'Travellers',
  className,
}) => {
  const decrement = () => {
    onChange(Math.max(min, value - 1));
  };

  const increment = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className={cn('flex flex-row justify-between items-center', className)}>
      <span>{label}</span>
      <div className="flex flex-row gap-2.5 items-center">
        <button
          className={cn(
            value <= min ? 'disabled:cursor-not-allowed' : 'cursor-pointer',
            'flex items-center justify-center w-10 h-10 bg-[#16372D] text-white rounded-lg disabled:opacity-50',
          )}
          onClick={decrement}
          disabled={value <= min}
        >
          <FaMinus />
        </button>
        <span className="min-w-[2rem] text-center">{value}</span>
        <button
          className="cursor-pointer flex items-center justify-center w-10 h-10 bg-[#16372D] text-white rounded-lg disabled:opacity-50"
          onClick={increment}
          disabled={value >= max}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
