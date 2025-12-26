'use client';

import React, { memo } from 'react';
import { FaCheck } from 'react-icons/fa';
import { DestinationCard } from '@/components/Home/Destinations/_types';
import { ImageWithFallback } from '@/components/UI/ImageWithFallback/ImageWithFallback';

interface DestinationsSelectProps {
    destinations: DestinationCard[];
    selectedDestinations: string[];
    onChange: (destinations: string[]) => void;
}

export const DestinationsSelect = memo(function DestinationsSelect({
    destinations,
    selectedDestinations,
    onChange,
}: DestinationsSelectProps) {
    const handleToggle = (name: string) => {
        const isChecked = selectedDestinations.includes(name);
        const newDestinations = isChecked
            ? selectedDestinations.filter((d) => d !== name)
            : [...selectedDestinations, name];
        onChange(newDestinations);
    };

    return (
        <div className="w-full flex md:grid md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide md:overflow-visible md:pb-0">
            {destinations.map((el) => {
                const isChecked = selectedDestinations.includes(el.name);
                const hasImage = el.media?.file || el.icon?.file;

                return (
                    <label
                        key={el.name}
                        className={`
                            relative overflow-hidden rounded-2xl cursor-pointer 
                            transition-all duration-300 ease-out
                            border-2 shadow-sm group snap-start
                            w-40 h-40 flex-shrink-0 md:w-auto md:h-auto md:flex-shrink
                            ${isChecked
                                ? 'border-[#27A430] shadow-lg scale-[1.02]'
                                : 'border-transparent hover:border-[#27A430]/30 hover:shadow-md hover:scale-[1.01]'
                            }
                        `}
                    >
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggle(el.name)}
                            className="sr-only"
                        />

                        {/* Background Image */}
                        <div className="relative w-full h-full aspect-square overflow-hidden">
                            {hasImage ? (
                                <>
                                    <ImageWithFallback
                                        src={el.media?.file || el.icon?.file || ''}
                                        alt={el.name}
                                        width={400}
                                        height={250}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className={`absolute inset-0 transition-all duration-300
                                        ${isChecked
                                            ? 'bg-gradient-to-t from-[#16372D]/90 via-[#16372D]/40 to-transparent'
                                            : 'bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70'
                                        }`}
                                    />
                                </>
                            ) : (
                                <div className={`w-full h-full transition-all duration-300
                                    ${isChecked
                                        ? 'bg-gradient-to-br from-[#16372D] to-[#1f4a3d]'
                                        : 'bg-gray-100 group-hover:bg-gray-200'
                                    }`}
                                />
                            )}

                            {/* Destination Name */}
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <p className={`font-bold text-base leading-tight ${hasImage || isChecked ? 'text-white' : 'text-[#16372D]'}`}>
                                    {el.name}
                                </p>
                            </div>
                        </div>

                        {/* Checkmark badge */}
                        {isChecked && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-[#27A430] rounded-full flex items-center justify-center shadow-lg z-10">
                                <FaCheck size={10} className="text-white" />
                            </div>
                        )}
                    </label>
                );
            })}
        </div>
    );
});
