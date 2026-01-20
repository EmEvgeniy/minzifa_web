'use client';

import { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiMove, FiCopy, FiTrash2 } from 'react-icons/fi';
import { BlockInserter } from './components/BlockInserter';
import { BlockType } from './types';

interface BlockWrapperProps {
    id: string;
    type: string;
    children: ReactNode;
    isActive: boolean;
    onDelete: () => void;
    onDuplicate: () => void;
    onFocus: () => void;
    onInsert: (type: BlockType) => void;
}

export const BlockWrapper = ({ id, type, children, isActive, onDelete, onDuplicate, onFocus, onInsert }: BlockWrapperProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
        zIndex: isDragging ? 100 : (isActive ? 40 : 1),
    };

    return (
        <div className={`relative group/wrapper ${isActive ? 'z-[40]' : 'z-auto'}`}>
            <div
                ref={setNodeRef}
                style={style}
                onClick={(e) => {
                    e.stopPropagation();
                    onFocus();
                }}
                className={`group relative transition-all duration-300 ${isActive
                    ? 'bg-white/70 shadow-xl'
                    : 'hover:bg-white/70'
                    }`}
            >
                {/* Block Type Label - Floating in top-left */}
                <div
                    className={`absolute -top-5 right-5 px-2 py-0.5 rounded-md bg-white border border-slate-200 shadow-sm z-[20] pointer-events-none transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                        }`}
                >
                    <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">
                        {type}
                    </span>
                </div>

                {/* Drag Handle - Floating on the left */}
                <div
                    className={`absolute -left-12 top-0 h-full flex items-center transition-all duration-150 z-[20] ${isActive
                        ? 'opacity-100 pointer-events-auto translate-x-0'
                        : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto'
                        }`}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        type="button"
                        {...attributes}
                        {...listeners}
                        className="p-2 rounded-full bg-white shadow-lg border border-slate-100 text-slate-400 hover:text-purple-500 cursor-grab active:cursor-grabbing transition-all hover:scale-110 active:scale-95"
                        title="Drag to reorder"
                    >
                        <FiMove className="w-4 h-4" />
                    </button>
                </div>

                {/* Block Content */}
                <div className="relative z-10 w-full h-full">
                    {children}
                </div>

                {/* Action Buttons - Floating on the right */}
                <div
                    className={`absolute -right-12 top-0 h-full flex flex-col justify-center gap-2 transition-all duration-150 z-[20] ${isActive
                        ? 'opacity-100 pointer-events-auto translate-x-0'
                        : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto'
                        }`}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDuplicate();
                        }}
                        className="p-2 rounded-full bg-white shadow-lg border border-slate-100 text-slate-400 hover:text-blue-500 transition-all hover:scale-110"
                        title="Duplicate"
                    >
                        <FiCopy className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        className="p-2 rounded-full bg-white shadow-lg border border-slate-100 text-slate-400 hover:text-red-500 transition-all hover:scale-110"
                        title="Delete"
                    >
                        <FiTrash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Inserter below the block */}
            <div className="absolute -bottom-10 left-0 w-full flex justify-center opacity-0 group-hover/wrapper:opacity-100 transition-opacity z-[50]">
                <BlockInserter onAdd={onInsert} />
            </div>
        </div>
    );
};
