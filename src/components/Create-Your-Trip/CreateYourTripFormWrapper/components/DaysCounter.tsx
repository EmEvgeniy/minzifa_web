'use client';

import React, { memo } from 'react';
import Counter from '@/components/UI/Counter/Counter';

interface DaysCounterProps {
    value: string;
    onChange: (value: string) => void;
    label: string;
}

export const DaysCounter = memo(function DaysCounter({
    value,
    onChange,
    label,
}: DaysCounterProps) {
    const numValue = parseInt(value || '1');

    return (
        <div className="bg-white rounded-2xl px-5 py-4 flex items-center justify-between w-full border border-gray-100 shadow-sm">
            <Counter
                value={numValue}
                onChange={(val) => onChange(val.toString())}
                min={1}
                max={60}
                label={label}
                className="w-full"
            />
        </div>
    );
});
