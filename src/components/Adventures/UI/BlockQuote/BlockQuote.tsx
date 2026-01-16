interface BlockQuoteProps {
    quote: string;
    author?: string;
    className?: string;
}

export default function BlockQuote({ quote, author, className = '' }: BlockQuoteProps) {
    return (
        <blockquote className={`relative my-10 ${className}`}>
            {/* Quote text */}
            <p className="text-2xl lg:text-3xl font-title italic text-text leading-relaxed pl-6 border-l-4 border-foreground">
                "{quote}"
            </p>

            {/* Author */}
            {author && (
                <footer className="mt-4 pl-6">
                    <cite className="text-text-secondary text-sm not-italic">— {author}</cite>
                </footer>
            )}
        </blockquote>
    );
}
