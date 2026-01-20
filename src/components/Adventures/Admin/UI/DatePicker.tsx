'use client';

import { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { FiCalendar } from 'react-icons/fi';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

interface DatePickerProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    error?: string;
    disabled?: boolean;
}

export const DatePicker = ({ value, onChange, label, error, disabled }: DatePickerProps) => {
    const selectedDate = value ? new Date(value) : null;

    const handleChange = (date: Date | null) => {
        if (date) {
            // Convert to YYYY-MM-DD format
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            onChange(`${year}-${month}-${day}`);
        } else {
            onChange('');
        }
    };

    // Custom input component
    const CustomInput = forwardRef<HTMLButtonElement, any>(({ value, onClick }, ref) => (
        <button
            type="button"
            onClick={onClick}
            ref={ref}
            disabled={disabled}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3ca542] disabled:opacity-70 text-left"
        >
            <FiCalendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="flex-1">
                {value || 'Select date'}
            </span>
        </button>
    ));

    CustomInput.displayName = 'CustomInput';

    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {label}
                </label>
            )}

            <ReactDatePicker
                selected={selectedDate}
                onChange={handleChange}
                dateFormat="MMMM d, yyyy"
                customInput={<CustomInput />}
                disabled={disabled}
                calendarClassName="!font-sans"
                wrapperClassName="w-full"
            />

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};
