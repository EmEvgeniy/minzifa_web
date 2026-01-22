'use client';

import { BlockWrapper } from '@/components/Adventures/Admin/BlockEditor/BlockWrapper';
import { CodeBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/CodeBlock';
import { GalleryBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/GalleryBlock';
import { HeadingBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/HeadingBlock';
import { ImageBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/ImageBlock';
import { InfoBlockComponent } from '@/components/Adventures/Admin/BlockEditor/blocks/InfoBlockComponent';
import { ListBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/ListBlock';
import { ParagraphBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/ParagraphBlock';
import { QuoteBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/QuoteBlock';
import { SeparatorBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/SeparatorBlock';
import { SliderBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/SliderBlock';
import { ToursBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/ToursBlock';
import { Block, BlockType } from '@/components/Adventures/Admin/BlockEditor/types';

interface BlockRendererProps {
    block: Block;
    isActive: boolean;
    onUpdate: (data: Block['data']) => void;
    onDelete: () => void;
    onDuplicate: () => void;
    onFocus: () => void;
    onInsert: (type: BlockType) => void;
    onInsertBlocks: (blocks: Block[]) => void;
}

export const BlockRenderer = ({ block, isActive, onUpdate, onDelete, onDuplicate, onFocus, onInsert, onInsertBlocks }: BlockRendererProps) => {
    const renderBlock = () => {
        const commonProps = {
            data: block.data,
            onChange: onUpdate,
            isActive,
            onInsert,
            onInsertBlocks,
            onDelete,
        };

        switch (block.type) {
            case 'heading':
                return <HeadingBlock {...commonProps} data={block.data} />;
            case 'paragraph':
                return <ParagraphBlock {...commonProps} data={block.data} />;
            case 'image':
                return <ImageBlock {...commonProps} data={block.data} />;
            case 'quote':
                return <QuoteBlock {...commonProps} data={block.data} />;
            case 'info':
                return <InfoBlockComponent {...commonProps} data={block.data} />;
            case 'slider':
                return <SliderBlock {...commonProps} data={block.data} />;
            case 'gallery':
                return <GalleryBlock {...commonProps} data={block.data} />;
            case 'tours':
                return <ToursBlock {...commonProps} data={block.data} />;
            case 'list':
                return <ListBlock {...commonProps} data={block.data} />;
            case 'code':
                return <CodeBlock {...commonProps} data={block.data} />;
            case 'separator':
                return <SeparatorBlock {...commonProps} data={block.data} />;
            default:
                return null;
        }
    };

    return (
        <BlockWrapper
            id={block.id}
            type={block.type}
            isActive={isActive}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
            onFocus={onFocus}
            onInsert={onInsert}
        >
            {renderBlock()}
        </BlockWrapper>
    );
};
