'use client';

import { FiSearch, FiX } from 'react-icons/fi';
import { useState } from 'react';

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (value: string) => void;
    className?: string;
}

export const SearchBar = ({
    placeholder = "Search...",
    onSearch,
    className = ""
}: SearchBarProps) => {
    const [value, setValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        onSearch?.(newValue);
    };

    const handleClear = () => {
        setValue('');
        onSearch?.('');
    };

    return (
        <div className={`relative ${className}`}>
            <div className={`
                relative flex items-center gap-3 
                px-4 py-3 rounded-2xl
                bg-white dark:bg-slate-900
                border-2 transition-all duration-300
                ${isFocused
                    ? 'border-[#3ca542] dark:border-[#3ca542] shadow-lg shadow-[#3ca542]/10'
                    : 'border-slate-200 dark:border-slate-800 shadow-sm'
                }
            `}>
                <FiSearch className={`w-5 h-5 transition-colors ${isFocused
                    ? 'text-[#3ca542] dark:text-[#3ca542]'
                    : 'text-slate-400'
                    }`} />

                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                />

                {value && (
                    <button
                        onClick={handleClear}
                        className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <FiX className="w-4 h-4 text-slate-400" />
                    </button>
                )}
            </div>
        </div>
    );
};
