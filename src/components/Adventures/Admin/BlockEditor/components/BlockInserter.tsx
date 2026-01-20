'use client';

import { useState, useRef, useEffect } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import { BlockType } from '../types';
import { EDITOR_BLOCKS, getColorClasses } from '../constants';

interface BlockInserterProps {
    onAdd: (type: BlockType) => void;
    isVisible?: boolean;
}

export const BlockInserter = ({ onAdd, isVisible = true }: BlockInserterProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => window.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    if (!isVisible) return null;

    return (
        <div ref={containerRef} className="relative group/inserter py-2 flex justify-center w-full h-full">
            {/* Main Toggle Button */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400 hover:bg-purple-100 hover:text-purple-600 transition-colors opacity-0 group-hover/inserter:opacity-100 shadow-sm border border-transparent hover:border-purple-200"
                title="Add block here"
            >
                <FiPlus className="w-3.5 h-3.5" />
            </button>
            {isOpen && (
                <div className="absolute top-1/2 left-1/2 right-0 bg-white rounded-xl shadow-xl border border-slate-200 p-2 min-w-[320px] animation-fade-in-up">
                    <div className="flex items-center justify-between mb-2 px-1">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Add Block</span>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <FiX className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-1 max-h-[300px] overflow-y-auto custom-scrollbar">
                        {EDITOR_BLOCKS.map(({ type, icon: Icon, label, color }) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => {
                                    onAdd(type);
                                    setIsOpen(false);
                                }}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 transition-all duration-200 border text-xs font-medium text-left ${getColorClasses(color)}`}
                            >
                                <Icon className="w-3.5 h-3.5 shrink-0" />
                                <span>{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
