'use client';

import React from 'react';
import { cn } from '@/utils/utils';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { FormFieldWrapper } from '../FormFieldWrapper/FormFieldWraper';
import { Dropdown, DropdownDetails, DropdownItem, DropdownSummary } from '../../Dropdown/Dropdown';
import { DropdownFieldProps } from './_types';

export function DropdownField<T extends Record<string, unknown>>({
    label,
    error,
    helperText,
    placeholder,
    options = [],
    value,
    onChange,
    labelKey = 'label' as keyof T & string,
    valueKey = 'value' as keyof T & string,
    getLabel,
    getValue,
    fullWidth = true,
    renderSummary,
}: DropdownFieldProps<T>) {
    const selectedOption = options.find((opt) => {
        const optValue = getValue?.(opt) ?? (opt[valueKey] as string | number | undefined);
        return String(optValue) === String(value);
    });

    const selectedLabel =
        selectedOption != null
            ? getLabel?.(selectedOption) ?? (selectedOption[labelKey] as React.ReactNode)
            : '';

    return (
        <FormFieldWrapper
            label={label}
            error={error}
            helperText={helperText}
            fullWidth={fullWidth}
            paddingLeft="pl-3"
        >
            <Dropdown<T>
                value={value}
                onChange={onChange}
                options={options}
                className={cn(
                    'relative rounded-2xl border bg-white transition-all duration-200',
                    error
                        ? 'border-red-500'
                        : 'border-gray-300 hover:border-gray-400 focus-within:border-[#27A430] focus-within:ring-2 focus-within:ring-[#27A430]/20',
                    fullWidth && 'w-full',
                )}
            >
                <DropdownSummary className={cn(
                    "flex justify-between items-center w-full cursor-pointer text-gray-900 text-base rounded-xl",
                    label ? 'px-3 py-2 pt-6' : 'px-3 py-2',
                )}>
                    {({ isOpen }) => {
                        if (renderSummary) {
                            return renderSummary(selectedLabel, isOpen);
                        }

                        return (
                            <div className="flex justify-between items-center w-full">
                                <span className={cn('truncate', !selectedLabel && 'text-gray-400')}>
                                    {selectedLabel || placeholder}
                                </span>
                                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                        );
                    }}
                </DropdownSummary>

                <DropdownDetails className="absolute left-0 top-full mt-1 w-full rounded-lg bg-white shadow-lg border border-gray-200 z-30 max-h-64 overflow-auto">
                    {options.map((opt, idx) => {
                        const val = getValue?.(opt) ?? (opt[valueKey] as string | number | undefined);
                        const lbl = getLabel?.(opt) ?? (opt[labelKey] as React.ReactNode);
                        const isSelected = String(val) === String(value);

                        return (
                            <DropdownItem
                                key={val ?? idx}
                                onClick={() => onChange?.(val)}
                                className={cn(
                                    'px-4 py-2 hover:bg-gray-100 transition-colors',
                                    isSelected && 'bg-gray-50 font-medium text-[#27A430]'
                                )}
                            >
                                {lbl}
                            </DropdownItem>
                        );
                    })}
                </DropdownDetails>
            </Dropdown>
        </FormFieldWrapper>
    );
}
