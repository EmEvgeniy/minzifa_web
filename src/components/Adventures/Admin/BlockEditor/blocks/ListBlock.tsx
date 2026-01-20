'use client';

import { ListBlock as ListBlockType, Block, BlockType } from '@/components/Adventures/Admin/BlockEditor/types';
import { InlineFormatting } from '@/components/Adventures/Admin/BlockEditor/components/InlineFormatting';
import { EditableText } from '@/components/Adventures/Admin/BlockEditor/components/EditableText';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

interface ListBlockProps {
    data: ListBlockType['data'];
    onChange: (data: ListBlockType['data']) => void;
    isActive?: boolean;
    onInsert: (type: BlockType) => void;
    onInsertBlocks: (blocks: Block[]) => void;
    onDelete: () => void;
}

export const ListBlock = ({ data, onChange, isActive, onInsert, onDelete }: ListBlockProps) => {
    const ListTag = data.ordered ? 'ol' : 'ul';

    const updateItem = (index: number, value: string) => {
        const newItems = [...data.items];
        newItems[index] = value;
        onChange({ ...data, items: newItems });
    };

    const addItem = () => {
        onChange({ ...data, items: [...data.items, ''] });
    };

    const removeItem = (index: number) => {
        if (data.items.length > 1) {
            onChange({ ...data, items: data.items.filter((_, i) => i !== index) });
        } else {
            onDelete();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>, index: number) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (data.items[index].trim() === '') {
                // Exit list on Enter in empty item
                removeItem(index);
                onInsert('paragraph');
            } else {
                // Add new item
                addItem();
            }
        } else if (e.key === 'Backspace' && data.items[index] === '') {
            e.preventDefault();
            removeItem(index);
        }
    };

    return (
        <div className="relative space-y-4">
            <InlineFormatting isActive={!!isActive} />

            {isActive && (
                <div className="flex items-center gap-2 mb-4 bg-white/50 p-2 rounded-lg border border-slate-100 w-fit">
                    <button
                        type="button"
                        onClick={() => onChange({ ...data, ordered: false })}
                        className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${!data.ordered
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'text-slate-500 hover:bg-slate-50'
                            }`}
                    >
                        Bulleted
                    </button>
                    <button
                        type="button"
                        onClick={() => onChange({ ...data, ordered: true })}
                        className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${data.ordered
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'text-slate-500 hover:bg-slate-50'
                            }`}
                    >
                        Numbered
                    </button>
                </div>
            )}

            <ListTag className={`w-full space-y-3 ${data.ordered ? 'list-decimal pl-5' : 'list-disc pl-5'}`}>
                {data.items.map((item, index) => (
                    <li key={index} className="group/item relative">
                        <EditableText
                            tagName="div"
                            value={item}
                            onChange={(val) => updateItem(index, val)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-full text-[17px] font-light leading-[1.65] text-[#1D1D1F] font-sans focus:outline-none min-h-[1.5em]"
                            placeholder="List item..."
                        />
                        {isActive && (
                            <button
                                type="button"
                                onClick={() => removeItem(index)}
                                className="absolute -left-10 top-1.5 p-1 rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover/item:opacity-100 transition-all scale-75"
                                title="Remove item"
                            >
                                <FiTrash2 className="w-4 h-4" />
                            </button>
                        )}
                    </li>
                ))}
            </ListTag>

            {isActive && (
                <button
                    type="button"
                    onClick={addItem}
                    className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 font-medium px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 transition-all w-fit mt-4"
                >
                    <FiPlus className="w-4 h-4" />
                    Add list item
                </button>
            )}
        </div>
    );
};
