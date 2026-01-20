'use client';

import { FiX } from 'react-icons/fi';

export type FilterOption = {
    id: string;
    label: string;
    count?: number;
};

interface FilterPillsProps {
    options: FilterOption[];
    selected: string[];
    onChange: (selected: string[]) => void;
    label?: string;
}

export const FilterPills = ({ options, selected, onChange, label }: FilterPillsProps) => {
    const toggleFilter = (id: string) => {
        if (selected.includes(id)) {
            onChange(selected.filter(s => s !== id));
        } else {
            onChange([...selected, id]);
        }
    };

    const clearAll = () => {
        onChange([]);
    };

    return (
        <div className="space-y-3">
            {label && (
                <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {label}
                    </label>
                    {selected.length > 0 && (
                        <button
                            onClick={clearAll}
                            className="text-xs text-[#3ca542] dark:text-[#3ca542] hover:underline"
                        >
                            Clear all
                        </button>
                    )}
                </div>
            )}

            <div className="flex flex-wrap gap-2">
                {options.map((option, index) => {
                    const isSelected = selected.includes(option.id);

                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => toggleFilter(option.id)}
                            className={`
                                group relative inline-flex items-center gap-2 
                                px-4 py-2 rounded-full
                                text-sm font-medium
                                transition-all duration-200
                                ${isSelected
                                    ? 'bg-[#3ca542] dark:bg-[#3ca542] text-white shadow-lg shadow-[#3ca542]/30'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }
                            `}
                        >
                            <span>{option.label}</span>

                            {option.count !== undefined && (
                                <span className={`
                                    text-xs px-2 py-0.5 rounded-full
                                    ${isSelected
                                        ? 'bg-white/20 text-white'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                                    }
                                `}>
                                    {option.count}
                                </span>
                            )}

                            {isSelected && (
                                <FiX className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
