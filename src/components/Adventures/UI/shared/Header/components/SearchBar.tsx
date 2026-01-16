'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchBarProps {
    isActive: boolean;
    onClose: () => void;
    onOpen: () => void;
}

export default function SearchBar({ isActive, onClose, onOpen }: SearchBarProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isActive && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isActive]);

    return (
        <div className={`relative flex items-center h-10 ${isActive ? 'w-full' : ''}`}>
            {!isActive ? (
                <button
                    onClick={onOpen}
                    className="flex items-center gap-2 px-4 h-full hover:bg-white border border-transparent hover:border-gray-200 rounded-full transition-all duration-200 group"
                >
                    <FiSearch className="w-4 h-4 text-text transition-colors" />
                    <span className="hidden lg:inline text-sm text-text-secondary group-hover:text-text transition-colors">Search</span>
                </button>
            ) : (
                <div className="w-full h-full bg-white shadow-md rounded-full flex items-center px-4 animate-in fade-in zoom-in-95 duration-200 border border-gray-100">
                    <FiSearch className="w-5 h-5 text-text mr-3 shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="What are you looking for?"
                        className="flex-1 bg-transparent border-none outline-none text-base text-text placeholder:text-gray-400 h-full py-2"
                    />
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors ml-2"
                    >
                        <FiX className="w-5 h-5 text-text-secondary" />
                    </button>
                </div>
            )}
        </div>
    );
}
