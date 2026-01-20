import { MDXRemote } from 'next-mdx-remote/rsc';
import QuoteBlock from '../UI/QuoteBlock';
import ArticleImage from '../UI/ArticleImage';
import EmbeddedTours from '../UI/EmbeddedTours';
import ArticleSlider from '../UI/ArticleSlider';
import ArticleGridGallery from '../UI/ArticleGridGallery';
import Link from 'next/link';
import InfoBlock from '../UI/InfoBlock';
import ArticleVideo from '../UI/ArticleVideo';
import ArticleSeparator from '../UI/ArticleSeparator';
import { ArticleGrid, ArticleLeft, ArticleRight } from '../UI/ArticleGrid';

const components = {
    h1: (props: any) => (
        <h1 className="text-4xl md:text-5xl font-title mt-16 mb-8 text-foreground leading-tight" {...props} />
    ),
    h2: (props: any) => (
        <h2 className="text-3xl md:text-4xl font-title mt-16 mb-6 text-foreground leading-snug" {...props} />
    ),
    h3: (props: any) => (
        <h3 className="text-2xl md:text-3xl font-title mt-12 mb-4 text-foreground text-left" {...props} />
    ),
    h4: (props: any) => (
        <h4 className="text-xl md:text-2xl font-title mt-10 mb-3 text-foreground font-bold text-left" {...props} />
    ),
    h5: (props: any) => (
        <h5 className="text-lg md:text-xl font-title mt-8 mb-2 text-foreground font-bold text-left" {...props} />
    ),
    h6: (props: any) => (
        <h6 className="text-base md:text-lg font-title mt-6 mb-2 text-foreground font-bold uppercase tracking-wider text-left" {...props} />
    ),
    p: (props: any) => (
        <p className="text-lg md:text-xl text-text leading-relaxed mb-8 font-light" {...props} />
    ),
    ul: (props: any) => (
        <ul className="list-disc list-outside ml-6 mb-8 text-lg text-text leading-relaxed" {...props} />
    ),
    ol: (props: any) => (
        <ol className="list-decimal list-outside ml-6 mb-8 text-lg text-text leading-relaxed" {...props} />
    ),
    li: (props: any) => (
        <li className="mb-2 pl-2" {...props} />
    ),
    blockquote: (props: any) => (
        <QuoteBlock>{props.children}</QuoteBlock>
    ),
    a: (props: any) => {
        const isInternal = props.href && (props.href.startsWith('/') || props.href.startsWith('#'));
        if (isInternal) {
            return <Link className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-1" {...props} />;
        }
        return <a target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-1" {...props} />;
    },
    // Custom components available in MDX
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
