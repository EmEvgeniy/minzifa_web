'use client';

import { QuoteBlock as QuoteBlockType } from '@/components/Adventures/Admin/BlockEditor/types';
import { InlineFormatting } from '@/components/Adventures/Admin/BlockEditor/components/InlineFormatting';
import { EditableText } from '@/components/Adventures/Admin/BlockEditor/components/EditableText';

interface QuoteBlockProps {
    data: QuoteBlockType['data'];
    onChange: (data: QuoteBlockType['data']) => void;
    isActive?: boolean;
}

export const QuoteBlock = ({ data, onChange, isActive }: QuoteBlockProps) => {
    return (
        <div className="relative pl-12 py-4 group">
            <InlineFormatting isActive={!!isActive} />
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#E5E5E5]"></div>

            <EditableText
                tagName="div"
                value={data.text}
                onChange={(text) => onChange({ ...data, text })}
                className="w-full text-2xl font-serif italic text-[#1D1D1F] focus:outline-none min-h-[1.5em] leading-relaxed"
                placeholder="Enter quote text..."
            />

            <EditableText
                tagName="div"
                value={data.author || ''}
                onChange={(author) => onChange({ ...data, author })}
                className="mt-4 text-[13px] text-slate-500 uppercase tracking-widest font-sans focus:outline-none"
                placeholder="Author name..."
            />
        </div>
    );
};
