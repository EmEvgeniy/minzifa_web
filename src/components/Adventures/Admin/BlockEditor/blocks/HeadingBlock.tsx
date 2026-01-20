'use client';

import { HeadingBlock as HeadingBlockType, Block, BlockType } from '@/components/Adventures/Admin/BlockEditor/types';
import { EditableText } from '@/components/Adventures/Admin/BlockEditor/components/EditableText';
import { InlineFormatting } from '@/components/Adventures/Admin/BlockEditor/components/InlineFormatting';
import { parseHtmlToBlocks, parseMarkdownToBlocks } from '@/components/Adventures/Admin/BlockEditor/utils';

interface HeadingBlockProps {
    data: HeadingBlockType['data'];
    onChange: (data: HeadingBlockType['data']) => void;
    isActive?: boolean;
    onInsert: (type: BlockType) => void;
    onInsertBlocks: (blocks: Block[]) => void;
    onDelete: () => void;
}

export const HeadingBlock = ({ data, onChange, isActive, onInsert, onInsertBlocks, onDelete }: HeadingBlockProps) => {
    // Determine semantic tag
    const Tag = `h${data.level}` as const;

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

        const hasStructure = html && /<(p|h[1-6]|ul|ol|blockquote|img|hr|div)/i.test(html);

        if (hasStructure) {
            const blocks = parseHtmlToBlocks(html);
            if (blocks.length > 1 || (blocks.length === 1 && blocks[0].type !== 'heading')) {
                e.preventDefault();
                onInsertBlocks(blocks);
                return;
            }
        }

        if (text && (text.includes('\n\n') || text.match(/^(#{1,6})\s/m) || text.match(/^[-*]\s/m))) {
            const blocks = parseMarkdownToBlocks(text);
            if (blocks.length > 1 || (blocks.length === 1 && blocks[0].type !== 'heading')) {
                e.preventDefault();
                onInsertBlocks(blocks);
                return;
            }
        }
    };

    // Use standard classes that map to the theme's typography
    const getHeadingClass = () => {
        switch (data.level) {
            case 1: return 'text-4xl font-bold mb-4 mt-8';
            case 2: return 'text-3xl font-bold mb-3 mt-6';
            case 3: return 'text-2xl font-semibold mb-3 mt-5';
            case 4: return 'text-xl font-semibold mb-2 mt-4';
            case 5: return 'text-lg font-medium mb-2 mt-4';
            case 6: return 'text-base font-medium mb-2 mt-4';
            default: return 'text-3xl font-bold';
        }
    };

    return (
        <div className="relative group">
            {/* Inline Formatting Toolbar (Bold, Italic, Link) */}
            <InlineFormatting isActive={!!isActive} />

            {/* Level Selector - Improved positioning and styling */}
            {isActive && (
                <div className="absolute -left-20 top-0 z-[110] flex flex-col gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-lg animate-fade-in">
                    {([1, 2, 3, 4, 5, 6] as const).map((level) => (
                        <button
                            key={level}
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => onChange({ ...data, level })}
                            className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-bold transition-all ${data.level === level
                                ? 'bg-purple-600 text-white shadow-md scale-110'
                                : 'text-slate-400 hover:bg-slate-50 hover:text-purple-500'
                                }`}
                        >
                            H{level}
                        </button>
                    ))}
                </div>
            )}

            <EditableText
                tagName={Tag}
                value={data.text}
                onChange={(text) => onChange({ ...data, text })}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                className={`w-full text-[#1D1D1F] focus:outline-none min-h-[1.2em] ${getHeadingClass()}`}
                placeholder={`Heading ${data.level}`}
            />
        </div>
    );
};
