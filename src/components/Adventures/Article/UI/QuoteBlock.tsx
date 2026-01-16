'use client';

interface QuoteBlockProps {
    children: React.ReactNode;
    author?: string;
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({ children, author }) => {
    return (
        <blockquote className="relative my-12 pl-8 border-l-4 border-primary/30 italic">
            <div className="text-2xl md:text-3xl font-title text-foreground leading-relaxed">
                {children}
            </div>
            {author && (
                <footer className="mt-4 text-sm font-medium text-text-secondary uppercase tracking-wider not-italic">
                    — {author}
                </footer>
            )}
        </blockquote>
    );
};

export default QuoteBlock;
