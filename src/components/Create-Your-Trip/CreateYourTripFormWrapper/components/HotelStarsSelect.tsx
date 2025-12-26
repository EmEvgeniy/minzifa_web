'use client';

import { memo } from 'react';
import { FaStar, FaHotel, FaCalendarTimes, FaUserEdit } from 'react-icons/fa';

interface HotelOption {
    value: string;
    label: string;
    stars?: number;
}

interface HotelStarsSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: HotelOption[];
}

export const HotelStarsSelect = memo(function HotelStarsSelect({
    value,
    onChange,
    options,
}: HotelStarsSelectProps) {
    return (
        <div className="w-full flex flex-col lg:flex-row gap-3 md:gap-4">
            {options.map((option) => {
                const isSelected = value === option.value;

                return (
                    <label
                        key={option.value}
                        className={`
                            relative rounded-2xl px-5 py-4
                            flex items-center justify-between cursor-pointer 
                            transition-all duration-300 ease-out
                            border-2 shadow-sm
                            ${isSelected
                                ? 'bg-[#16372D] shadow-lg z-10'
                                : 'bg-white border-gray-100 hover:border-[#27A430]/30 hover:shadow-md hover:scale-[1.01]'
                            }
                        `}
                    >
                        <input
                            type="radio"
                            name="hotel_type"
                            value={option.value}
                            checked={isSelected}
                            onChange={() => onChange(option.value)}
                            className="sr-only"
                        />

                        <div className="flex items-center gap-2 w-full">
                            {/* Icon Section */}
                            <div className={`p-2 rounded-xl transition-colors ${isSelected ? 'bg-white/10 text-[#27A430]' : 'bg-gray-50 text-gray-400'
                                }`}>
                                {option.stars || option.value === 'boutique-hotel' ? (
                                    <FaHotel size={16} />
                                ) : option.value === 'self-booking' ? (
                                    <FaUserEdit size={16} />
                                ) : (
                                    <FaCalendarTimes size={16} />
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="flex flex-col flex-1">
                                {option.stars ? (
                                    <div className="flex flex-col">
                                        <div className={`flex items-center gap-1 ${isSelected ? 'text-[#FFD700]' : 'text-[#27A430]'}`}>
                                            {Array.from({ length: option.stars }).map((_, i) => (
                                                <FaStar key={i} size={14} className="drop-shadow-sm" />
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <span className={`text-sm md:text-sm font-bold leading-tight ${isSelected ? 'text-white' : 'text-[#16372D]'}`}>
                                        {option.label}
                                    </span>
                                )}
                            </div>
                        </div>
                    </label>
                );
            })}
        </div>
    );
});
