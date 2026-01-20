'use client';

import { useState, useEffect, useRef } from 'react';
import { Block, BlockType } from '@/components/Adventures/Admin/BlockEditor/types';
import { parseBlocksToMarkdown, createBlock, generateId, parseMarkdownToBlocks, parseHtmlToBlocks } from '@/components/Adventures/Admin/BlockEditor/utils';
import { BlockToolbar } from '@/components/Adventures/Admin/BlockEditor/BlockToolbar';
import { BlockRenderer } from '@/components/Adventures/Admin/BlockEditor/BlockRenderer';
import { FiPlus } from 'react-icons/fi';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { BlockInserter } from './components/BlockInserter';

interface BlockEditorProps {
    initialContent?: string;
    onChange?: (markdown: string) => void;
    blocks?: Block[];
    onChangeBlocks?: (blocks: Block[]) => void;
    readOnly?: boolean;
}

export const BlockEditor = ({ initialContent, onChange, blocks: externalBlocks, onChangeBlocks, readOnly = false }: BlockEditorProps) => {
    // Parse initial content or use external blocks
    const [internalBlocks, setInternalBlocks] = useState<Block[]>(() => {
        if (externalBlocks) return externalBlocks;
        return initialContent ? parseMarkdownToBlocks(initialContent) : [createBlock('paragraph', 0)];
    });

    const blocks = externalBlocks || internalBlocks;
    const setBlocks = onChangeBlocks || setInternalBlocks;

    const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const [isSourceMode, setIsSourceMode] = useState(false);
    const [sourceText, setSourceText] = useState('');

    // Sync blocks when initialContent arrives (only for internal mode)
    useEffect(() => {
        if (!externalBlocks && initialContent && !isInitialized) {
            setInternalBlocks(parseMarkdownToBlocks(initialContent));
            setIsInitialized(true);
        }
    }, [initialContent, isInitialized, externalBlocks]);

    // Handle ESC to exit fullscreen
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isFullscreen]);

    // Sensors for drag and drop
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Use a ref to track the last markdown sent to parent to avoid redundant calls
    const lastMarkdownRef = useRef<string>(initialContent || '');

    // Update markdown when internal blocks change (with debounce)
    useEffect(() => {
        if (!onChange || externalBlocks || isSourceMode) return;

        const timer = setTimeout(() => {
            const markdown = parseBlocksToMarkdown(internalBlocks);
            if (markdown !== lastMarkdownRef.current) {
                lastMarkdownRef.current = markdown;
                onChange(markdown);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [internalBlocks, onChange, externalBlocks, isSourceMode]);

    // Toggle Fullscreen
    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
        if (!isFullscreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    // Toggle Source Mode
    const toggleSourceMode = () => {
        if (isSourceMode) {
            // Switch to Visual: Parse markdown to blocks
            const newBlocks = parseMarkdownToBlocks(sourceText);
            setBlocks(newBlocks);
            if (onChange) onChange(sourceText);
        } else {
            // Switch to Source: Convert blocks to markdown
            const markdown = parseBlocksToMarkdown(blocks);
            setSourceText(markdown);
        }
        setIsSourceMode(!isSourceMode);
    };

    const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setSourceText(newText);
        if (onChange) onChange(newText);
    };

    // Add multiple blocks at specific index
    // If replace is true, the block at index-1 will be removed if it's considered "empty"
    const insertBlocks = (newBlocks: Block[], index: number, options: { replaceIfEmpty?: boolean } = {}) => {
        let finalIndex = index;
        let blocksToKeep = [...blocks];

        if (options.replaceIfEmpty && index > 0) {
            const targetIndex = index - 1;
            const targetBlock = blocks[targetIndex];

            // Check if block is empty/default
            const isEmpty = (
                (targetBlock.type === 'paragraph' && (!targetBlock.data.text || targetBlock.data.text === 'Start typing...' || targetBlock.data.text === '<br>')) ||
                (targetBlock.type === 'heading' && (!targetBlock.data.text || targetBlock.data.text === 'Heading'))
            );

            if (isEmpty) {
                blocksToKeep.splice(targetIndex, 1);
                finalIndex = targetIndex;
            }
        }

        const blocksBefore = blocksToKeep.slice(0, finalIndex);
        const blocksAfter = blocksToKeep.slice(finalIndex);

        const combinedBlocks = [...blocksBefore, ...newBlocks, ...blocksAfter];

        // Reorder all blocks
        const finalBlocks = combinedBlocks.map((block, i) => ({
            ...block,
            order: i
        }));

        setBlocks(finalBlocks);
        if (newBlocks.length > 0) {
            setActiveBlockId(newBlocks[newBlocks.length - 1].id);
        }
    };

    // Add new block at specific index
    const insertBlock = (type: BlockType, index: number) => {
        const newBlock = createBlock(type, index);
        insertBlocks([newBlock], index);
    };

    // Add new block (append)
    const addBlock = (type: BlockType) => {
        insertBlock(type, blocks.length);
    };

    // Update block data
    const updateBlock = (id: string, data: any) => {
        const updated = blocks.map(block =>
            block.id === id ? { ...block, data } as Block : block
        );
        setBlocks(updated);
    };

    // Delete block
    const deleteBlock = (id: string) => {
        const newBlocks = blocks.filter(block => block.id !== id);
        const reorderedBlocks = newBlocks.map((block, index) => ({
            ...block,
            order: index
        }));
        setBlocks(reorderedBlocks);
    };

    // Duplicate block
    const duplicateBlock = (id: string) => {
        const index = blocks.findIndex(block => block.id === id);
        if (index === -1) return;

        const blockToDuplicate = blocks[index];
        const newBlock = {
            ...blockToDuplicate,
            id: generateId(),
            order: index + 1
        };

        const newBlocks = [...blocks];
        newBlocks.splice(index + 1, 0, newBlock);

        const reorderedBlocks = newBlocks.map((block, i) => ({
            ...block,
            order: i
        }));

        setBlocks(reorderedBlocks);
        setActiveBlockId(newBlock.id);
    };

    // Handle drag end
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = blocks.findIndex(item => item.id === active.id);
            const newIndex = blocks.findIndex(item => item.id === over.id);

            const newItems = arrayMove(blocks, oldIndex, newIndex);
            const finalBlocks = newItems.map((item, index) => ({
                ...item,
                order: index
            }));
            setBlocks(finalBlocks);
        }
    };

    const wrapperClasses = isFullscreen
        ? "fixed inset-0 z-[1000] bg-[#F5F4F1] dark:bg-[#F5F4F1] flex flex-col light"
        : "relative w-full h-[700px] bg-[#F5F4F1] flex flex-col rounded-xl overflow-hidden border border-slate-200 shadow-sm light transition-all duration-300";

    return (
        <div
            className={wrapperClasses}
            onClick={() => setActiveBlockId(null)}
        >
            {/* Editor Header / Toolbar area */}
            <div className={`sticky top-0 z-[20] bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 py-3 flex items-center justify-between transition-shadow duration-200 ${isFullscreen ? 'shadow-sm' : ''}`}>
                <div className="flex-1 overflow-x-auto no-scrollbar">
                    {!readOnly && (
                        <BlockToolbar
                            onAddBlock={addBlock}
                            isFullscreen={isFullscreen}
                            onToggleFullscreen={toggleFullscreen}
                            isSourceMode={isSourceMode}
                            onToggleSourceMode={toggleSourceMode}
                        />
                    )}
                </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto bg-[#F5F4F1] py-12 px-4 scroll-smooth">
                <div
                    className="max-w-[720px] mx-auto space-y-6 min-h-full pb-32"
                // Removing stopPropagation to allow clicking empty space to deselect
                // onClick={(e) => e.stopPropagation()}
                >
                    {isSourceMode ? (
                        <textarea
                            value={sourceText}
                            onChange={handleSourceChange}
                            className="w-full h-full min-h-[500px] text-black bg-white p-6 rounded-xl border border-slate-200 shadow-sm font-mono text-sm leading-relaxed outline-none resize-none"
                            placeholder="# Write your markdown here..."
                            spellCheck={false}
                        />
                    ) : (
                        <>
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext
                                    items={blocks.map(b => b.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {blocks.map((block, index) => (
                                        <BlockRenderer
                                            key={block.id}
                                            block={block}
                                            isActive={!readOnly && activeBlockId === block.id}
                                            onUpdate={(data) => !readOnly && updateBlock(block.id, data)}
                                            onDelete={() => !readOnly && deleteBlock(block.id)}
                                            onDuplicate={() => !readOnly && duplicateBlock(block.id)}
                                            onFocus={() => !readOnly && setActiveBlockId(block.id)}
                                            onInsert={(type) => !readOnly && insertBlock(type, index + 1)}
                                            onInsertBlocks={(newBlocks) => !readOnly && insertBlocks(newBlocks, index + 1, { replaceIfEmpty: true })}
                                        />
                                    ))}
                                </SortableContext>
                            </DndContext>

                            {/* Bottom Inserter */}
                            {!readOnly && blocks.length > 0 && (
                                <div className="pt-2 pb-8 flex justify-center">
                                    <div className="w-full h-full">
                                        <BlockInserter onAdd={(type) => insertBlock(type, blocks.length)} />
                                    </div>
                                </div>
                            )}

                            {/* Empty state inside scroller */}
                            {blocks.length === 0 && (
                                <div className="text-center py-20 bg-white/50 border-2 border-dashed border-slate-300 rounded-xl relative group">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-4">
                                        <FiPlus className="w-8 h-8 text-purple-500" />
                                    </div>
                                    <p className="text-slate-500 font-medium">Click a button above or here to start</p>

                                    {/* Overlay inserter for empty state */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 backdrop-blur-sm rounded-xl">
                                        <BlockInserter onAdd={addBlock} isVisible={true} />
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
