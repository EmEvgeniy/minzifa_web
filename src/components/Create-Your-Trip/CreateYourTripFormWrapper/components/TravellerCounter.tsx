'use client';

import React, { memo } from 'react';
import Counter from '@/components/UI/Counter/Counter';
import { FaUser, FaChild } from 'react-icons/fa';

interface TravellerCounterProps {
    adults: number;
    children: number;
    onAdultsChange: (value: number) => void;
    onChildrenChange: (value: number) => void;
    adultsLabel: string;
    childrenLabel: string;
}

export const TravellerCounter = memo(function TravellerCounter({
    adults,
    children,
    onAdultsChange,
    onChildrenChange,
    adultsLabel,
    childrenLabel,
}: TravellerCounterProps) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden w-full shadow-sm border border-gray-100">
            <div className="px-5 py-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#27A430] to-[#1f8a26] rounded-xl flex items-center justify-center shadow-sm">
                    <FaUser className="text-white" size={16} />
                </div>
                <Counter
                    value={adults}
                    onChange={onAdultsChange}
                    min={1}
                    label={adultsLabel}
                    className="flex-1"
                />
            </div>
            <div className="border-t border-gray-100 px-5 py-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FFB347] to-[#FF8C00] rounded-xl flex items-center justify-center shadow-sm">
                    <FaChild className="text-white" size={16} />
                </div>
                <Counter
                    value={children}
                    onChange={onChildrenChange}
                    min={0}
                    label={childrenLabel}
                    className="flex-1"
                />
            </div>
        </div>
    );
});
