'use client';

import { useState, useEffect, useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface DropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    align?: 'left' | 'right';
}

export default function Dropdown({ trigger, children, align = 'left' }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-text hover:text-foreground transition-colors cursor-pointer"
            >
                {trigger}
                <FiChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div
                    className={`absolute top-full mt-2 py-2 bg-white rounded-lg shadow-lg border border-gray-100 min-w-[120px] z-50 ${align === 'right' ? 'right-0' : 'left-0'}`}
                    onClick={() => setIsOpen(false)}
                >
                    {children}
                </div>
            )}
        </div>
    );
}
