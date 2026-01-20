import { useState, KeyboardEvent } from 'react';
import { FiX } from 'react-icons/fi';

interface TagsInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
    label?: string;
    placeholder?: string;
    error?: string;
}

export const TagsInput = ({ value = [], onChange, label, placeholder = "Add tag and press Enter", error }: TagsInputProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const trimmedValue = inputValue.trim();

            if (trimmedValue && !value.includes(trimmedValue)) {
                onChange([...value, trimmedValue]);
                setInputValue('');
            }
        } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
            // Remove last tag on backspace if input is empty
            onChange(value.slice(0, -1));
        }
    };

    const removeTag = (tagToRemove: string) => {
        onChange(value.filter(tag => tag !== tagToRemove));
    };

    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {label}
                </label>
            )}

            <div className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus-within:ring-2 focus-within:ring-[#3ca542] min-h-[42px]">
                <div className="flex flex-wrap gap-2">
                    {value.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md text-sm font-medium"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 transition-colors"
                            >
                                <FiX className="w-3 h-3" />
                            </button>
                        </span>
                    ))}

                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={value.length === 0 ? placeholder : ''}
                        className="flex-1 min-w-[120px] bg-transparent text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-400"
                    />
                </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Press Enter to add a tag, Backspace to remove the last one
            </p>
        </div>
    );
};
