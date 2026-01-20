import MarkdownRenderer from '@/components/Adventures/Article/Renderer/MarkdownRenderer';
import SocialShare from '@/components/Adventures/UI/SocialShare/SocialShare';
import { Article } from '@/types/adventures';

interface ArticleContentProps {
    article: Article;
}

export default function ArticleContent({ article }: ArticleContentProps) {
    return (
        <div className="container relative">
            <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Sidebar: Social Share (Desktop Sticky) */}
                <div className="hidden lg:block lg:col-span-2">
                    <div className="sticky top-32">
                        <SocialShare title={article.title} vertical />
                    </div>
                </div>

                {/* Mobile Social Share */}
                <div className="order-3 lg:order-0 lg:hidden mb-8 flex justify-center">
                    <SocialShare title={article.title} vertical={false} />
                </div>

                {/* Article Body */}
                <div className="order-1 lg:order-0 col-span-1 lg:col-span-8 lg:col-start-3">
                    <MarkdownRenderer source={article.content} />

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-slate-200">
                            <h3 className="text-sm font-semibold text-slate-700 mb-4">Tags:</h3>
                            <div className="flex flex-wrap gap-2">
                                {article.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors cursor-pointer"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <hr className="order-2 lg:order-0 my-12 border-[#D0D0D0] col-span-12" />
            </div>
        </div>
    );
}
