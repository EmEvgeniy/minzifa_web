'use client';

import { ParagraphBlock as ParagraphBlockType, Block, BlockType } from '@/components/Adventures/Admin/BlockEditor/types';
import { EditableText } from '@/components/Adventures/Admin/BlockEditor/components/EditableText';
import { InlineFormatting } from '@/components/Adventures/Admin/BlockEditor/components/InlineFormatting';
import { parseHtmlToBlocks, parseMarkdownToBlocks } from '@/components/Adventures/Admin/BlockEditor/utils';

interface ParagraphBlockProps {
    data: ParagraphBlockType['data'];
    onChange: (data: ParagraphBlockType['data']) => void;
    isActive?: boolean;
    onInsert: (type: BlockType) => void;
    onInsertBlocks: (blocks: Block[]) => void;
    onDelete: () => void;
}

export const ParagraphBlock = ({ data, onChange, isActive, onInsert, onInsertBlocks, onDelete }: ParagraphBlockProps) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onInsert('paragraph');
        } else if (e.key === 'Backspace' && !data.text) {
            e.preventDefault();
            onDelete();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLElement>) => {
        const html = e.clipboardData.getData('text/html');
        const text = e.clipboardData.getData('text/plain');

        // Check if it's complex content (multiple blocks)
        // We look for tags that indicate structure
        const hasStructure = html && /<(p|h[1-6]|ul|ol|blockquote|img|hr|div)/i.test(html);

        if (hasStructure) {
            const blocks = parseHtmlToBlocks(html);
            // Only intercept if we actually found multiple blocks or specific structured blocks
            if (blocks.length > 1 || (blocks.length === 1 && blocks[0].type !== 'paragraph')) {
                e.preventDefault();
                onInsertBlocks(blocks);
                return;
            }
        }

        // Markdown detection
        if (text && (text.includes('\n\n') || text.match(/^(#{1,6})\s/m) || text.match(/^[-*]\s/m))) {
            const blocks = parseMarkdownToBlocks(text);
            if (blocks.length > 1 || (blocks.length === 1 && blocks[0].type !== 'paragraph')) {
                e.preventDefault();
                onInsertBlocks(blocks);
                return;
            }
        }

        // Fallback: let EditableText handle simple text paste
    };

    return (
        <div className="relative">
            <InlineFormatting isActive={!!isActive} />
            <EditableText
                tagName="p"
                value={data.text}
                onChange={(text) => onChange({ ...data, text })}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                className="w-full text-[17px] font-light leading-[1.65] text-[#1D1D1F] font-sans focus:outline-none min-h-[1.5em]"
                placeholder="Start typing..."
            />
        </div>
    );
};
