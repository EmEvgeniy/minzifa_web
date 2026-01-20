'use client';

import { Block } from '@/components/Adventures/Admin/BlockEditor/types';
import { BlockWrapper } from '@/components/Adventures/Admin/BlockEditor/BlockWrapper';
import { HeadingBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/HeadingBlock';
import { ParagraphBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/ParagraphBlock';
import { ImageBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/ImageBlock';
import { QuoteBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/QuoteBlock';
import { InfoBlockComponent } from '@/components/Adventures/Admin/BlockEditor/blocks/InfoBlockComponent';
import { SliderBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/SliderBlock';
import { GalleryBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/GalleryBlock';
import { ToursBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/ToursBlock';
import { ListBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/ListBlock';
import { CodeBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/CodeBlock';
import { SeparatorBlock } from '@/components/Adventures/Admin/BlockEditor/blocks/SeparatorBlock';

interface BlockRendererProps {
    block: Block;
    isActive: boolean;
    onUpdate: (data: any) => void;
    onDelete: () => void;
    onDuplicate: () => void;
    onFocus: () => void;
    onInsert: (type: any) => void;
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
                return <HeadingBlock {...commonProps} data={block.data as any} />;
            case 'paragraph':
                return <ParagraphBlock {...commonProps} data={block.data as any} />;
            case 'image':
                return <ImageBlock {...commonProps} data={block.data as any} />;
            case 'quote':
                return <QuoteBlock {...commonProps} data={block.data as any} />;
            case 'info':
                return <InfoBlockComponent {...commonProps} data={block.data as any} />;
            case 'slider':
                return <SliderBlock {...commonProps} data={block.data as any} />;
            case 'gallery':
                return <GalleryBlock {...commonProps} data={block.data as any} />;
            case 'tours':
                return <ToursBlock {...commonProps} data={block.data as any} />;
            case 'list':
                return <ListBlock {...commonProps} data={block.data as any} />;
            case 'code':
                return <CodeBlock {...commonProps} data={block.data as any} />;
            case 'separator':
                return <SeparatorBlock {...commonProps} data={block.data as any} />;
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
