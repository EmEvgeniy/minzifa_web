import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArticleGrid, ArticleLeft, ArticleRight } from '../UI/ArticleGrid';
import ArticleGridGallery from '../UI/ArticleGridGallery';
import ArticleImage from '../UI/ArticleImage';
import ArticleSeparator from '../UI/ArticleSeparator';
import ArticleSlider from '../UI/ArticleSlider';
import ArticleVideo from '../UI/ArticleVideo';
import EmbeddedTours from '../UI/EmbeddedTours';
import InfoBlock from '../UI/InfoBlock';
import QuoteBlock from '../UI/QuoteBlock';
import { ComponentPropsWithoutRef } from 'react';

// Определяем типы для стандартных HTML элементов
type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const components = {
    h1: (props: HeadingProps) => (
        <h1 className="text-4xl md:text-5xl font-title mt-16 mb-8 text-foreground leading-tight" {...props} />
    ),
    h2: (props: HeadingProps) => (
        <h2 className="text-3xl md:text-4xl font-title mt-16 mb-6 text-foreground leading-snug" {...props} />
    ),
    h3: (props: HeadingProps) => (
        <h3 className="text-2xl md:text-3xl font-title mt-12 mb-4 text-foreground text-left" {...props} />
    ),
    h4: (props: HeadingProps) => (
        <h4 className="text-xl md:text-2xl font-title mt-10 mb-3 text-foreground font-bold text-left" {...props} />
    ),
    h5: (props: HeadingProps) => (
        <h5 className="text-lg md:text-xl font-title mt-8 mb-2 text-foreground font-bold text-left" {...props} />
    ),
    h6: (props: HeadingProps) => (
        <h6 className="text-base md:text-lg font-title mt-6 mb-2 text-foreground font-bold uppercase tracking-wider text-left" {...props} />
    ),
    p: (props: ParagraphProps) => (
        <p className="text-lg md:text-xl text-text leading-relaxed mb-8 font-light" {...props} />
    ),
    ul: (props: ListProps) => (
        <ul className="list-disc list-outside ml-6 mb-8 text-lg text-text leading-relaxed" {...props} />
    ),
    ol: (props: ListProps) => (
        <ol className="list-decimal list-outside ml-6 mb-8 text-lg text-text leading-relaxed" {...props} />
    ),
    li: (props: ListItemProps) => (
        <li className="mb-2 pl-2" {...props} />
    ),
    blockquote: (props: BlockquoteProps) => (
        <QuoteBlock>{props.children}</QuoteBlock>
    ),
    a: ({ href, ...props }: AnchorProps) => {
        const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
        if (isInternal) {
            return (
                <Link
                    href={href}
                    className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-1"
                    {...props}
                />
            );
        }
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-1"
                {...props}
            />
        );
    },
    // Кастомные компоненты уже имеют свои типы из определений
    Quote: QuoteBlock,
    Image: ArticleImage,
    Tours: EmbeddedTours,
    Slider: ArticleSlider,
    Gallery: ArticleGridGallery,
    InfoBlock: InfoBlock,
    Video: ArticleVideo,
    Separator: ArticleSeparator,
    Grid: ArticleGrid,
    Left: ArticleLeft,
    Right: ArticleRight
};

interface MarkdownRendererProps {
    source: string;
}

export default function MarkdownRenderer({ source }: MarkdownRendererProps) {
    return (
        <div className="max-w-[630px] mx-auto">
            <MDXRemote source={source} components={components} />
        </div>
    );
}

// Named export for dynamic import
export { MarkdownRenderer };
