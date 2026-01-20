'use client';

import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiX, FiCheck } from 'react-icons/fi';

export interface SelectOption {
    value: string | number;
    label: string;
}

interface CustomSelectProps {
    value: string | number | (string | number)[];
    onChange: (value: string | number | (string | number)[]) => void;
    options: SelectOption[];
    multiple?: boolean;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    isLoading?: boolean;
    className?: string;
    error?: string;
}

export const CustomSelect = ({
    value,
    onChange,
    options,
    multiple = false,
    label,
    placeholder = "Select...",
    disabled = false,
    isLoading = false,
    className = "",
    error
}: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string | number) => {
        if (multiple) {
            const currentValues = Array.isArray(value) ? value : [];
            const exists = currentValues.some(v => String(v) === String(optionValue));

            const newValue = exists
                ? currentValues.filter(v => String(v) !== String(optionValue))
                : [...currentValues, optionValue];
            onChange(newValue);
        } else {
            onChange(optionValue);
            setIsOpen(false);
        }
    };

    const removeValue = (e: React.MouseEvent, valToRemove: string | number) => {
        e.stopPropagation();
        if (Array.isArray(value)) {
            onChange(value.filter(v => String(v) !== String(valToRemove)));
        }
    };

    const isSelected = (optionValue: string | number) => {
        if (Array.isArray(value)) {
            return value.some(v => String(v) === String(optionValue));
        }
        return String(value) === String(optionValue);
    };

    const getDisplayLabel = () => {
        if (multiple) {
            if (!Array.isArray(value) || value.length === 0) return null;

            const selectedOptions = value
                .map(val => options.find(o => String(o.value) === String(val)))
                .filter((o): o is SelectOption => !!o);

            if (selectedOptions.length === 0) return null;

            return (
                <div className="flex flex-wrap gap-1.5">
                    {selectedOptions.map(option => (
                        <span
                            key={option.value}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600"
                        >
                            {option.label}
                            <button
                                type="button"
                                onClick={(e) => removeValue(e, option.value)}
                                className="hover:text-red-500 transition-colors"
                            >
                                <FiX className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>
            );
        }

        const selectedOption = options.find(o => String(o.value) === String(value));
        return selectedOption ? (
            <span className="text-slate-900 dark:text-slate-100 font-medium">
                {selectedOption.label}
            </span>
        ) : null;
    };

    return (
        <div ref={containerRef} className={`space-y-1.5 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                    {label}
                </label>
            )}

            <div className="relative">
                <div
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-controls="custom-select-list"
                    tabIndex={disabled ? -1 : 0}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onKeyDown={(e) => {
                        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                            e.preventDefault();
                            setIsOpen(!isOpen);
                        }
                    }}
                    className={`
                        w-full min-h-[42px] pl-3 pr-10 py-2 text-left bg-white dark:bg-slate-800 
                        border rounded-xl transition-all duration-200 outline-none
                        ${error
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 focus:border-[#3ca542] focus:ring-4 focus:ring-[#3ca542]/10'
                        }
                        ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-50 dark:bg-slate-800/50' : 'cursor-pointer'}
                        ${isOpen ? 'border-[#3ca542] ring-4 ring-[#3ca542]/10' : ''}
                    `}
                >
                    <div className="flex items-center min-h-[22px]">
                        {getDisplayLabel() || (
                            <span className="text-slate-400 dark:text-slate-500">
                                {isLoading ? 'Loading...' : placeholder}
                            </span>
                        )}
                    </div>

                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                        <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                </div>

                {/* Dropdown Menu */}
                {isOpen && !disabled && (
                    <div className="absolute z-50 w-full mt-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg max-h-60 overflow-y-auto overflow-x-hidden scrollbar-thin">
                        {options.length > 0 ? (
                            <div className="p-1.5 space-y-0.5">
                                {options.map((option) => {
                                    const selected = isSelected(option.value);
                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => handleSelect(option.value)}
                                            className={`
                                                w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors
                                                ${selected
                                                    ? 'bg-[#3ca542]/10 text-[#3ca542]'
                                                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                                                }
                                            `}
                                        >
                                            <span className="truncate">{option.label}</span>
                                            {selected && <FiCheck className="w-4 h-4 shrink-0" />}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="p-4 text-center text-sm text-slate-400">
                                No options available
                            </div>
                        )}
                    </div>
                )}
            </div>

            {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
        </div>
    );
};
