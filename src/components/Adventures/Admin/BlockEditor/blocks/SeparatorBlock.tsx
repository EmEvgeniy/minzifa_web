'use client';

import { SeparatorBlock as SeparatorBlockType } from '@/components/Adventures/Admin/BlockEditor/types';

interface SeparatorBlockProps {
    data: SeparatorBlockType['data'];
    onChange: (data: SeparatorBlockType['data']) => void;
    isActive?: boolean;
}

export const SeparatorBlock = ({ isActive }: SeparatorBlockProps) => {
    return (
        <div className={`py-4 transition-all duration-300 ${isActive ? 'opacity-80' : 'opacity-100'}`}>
            <hr className="border-0 h-px bg-slate-400" />
        </div>
    );
};
