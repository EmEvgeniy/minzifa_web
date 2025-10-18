import type { ArticleCardType } from './_types';
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';
import { ImageWithFallback } from '@/components/UI/ImageWithFallback/ImageWithFallback';
import Button from '../Button/Button';
import { formatted_date } from '@/utils';

type Props = {
  article: ArticleCardType;
  locale: string;
};

export default function ArticleCard({ article, locale }: Props) {
  return (
    <div className="bg-white rounded-2xl md:shadow-2xl flex flex-col items-center overflow-hidden">
      <div className="w-full h-full relative overflow-hidden">
        <span className='absolute left-3 top-3 text-gray-700 bg-white/80 backdrop-blur-2xl rounded-2xl px-2 py-1 text-xs z-10'>{article.category.name}</span>
        <span className='absolute right-3 top-3 text-gray-700 bg-white/80 backdrop-blur-2xl rounded-2xl px-2 py-1 z-10 text-xs'>{formatted_date(article.published, locale)}</span>
        <ImageWithFallback
          src={article?.media?.file}
          alt={article?.media?.alt_text}
          width={800}
          height={600}
          className="w-full h-full max-h-[224px] object-cover"
        />
      </div>
      <div className="p-3 flex flex-col justify-between text-[#16372D] w-full h-full">
        <p className="text-lg line-clamp-2">
          {article?.name}
        </p>
        <Markdown className="text-sm line-clamp-3 text-[#717171]">
          {article?.description}
        </Markdown>
        <Button
          as={Link}
          to={`/${locale}/adventures/` + article.category.slug + '/' + article?.slug}
          color='link'
          className='text-sm'
        >
          {locale === 'en' ? 'Read more...' : 'Подробнее...'}
        </Button>
      </div>
    </div>
  );
}
