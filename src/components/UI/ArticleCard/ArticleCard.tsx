import type { ArticleCardType } from './_types';
import Link from 'next/link';
import Image from 'next/image';
import Markdown from 'markdown-to-jsx';

type Props = {
  article: ArticleCardType;
  locale: string;
};

export default function ArticleCard({ article, locale }: Props) {
  return (
    <Link
      href={`/${locale}/adventures/` + article.category.slug + '/' + article?.slug}
      className="h-full"
    >
      <div className="bg-white rounded-[16px] shadow-2xl flex flex-col items-center overflow-hidden gap-4 w-full h-full min-h-full">
        <div className="w-full min-h-[224px] h-full relative overflow-hidden">
          {article?.media?.file && (
            <Image
              src={article?.media?.file}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="w-full h-full object-cover"
              alt={article.media.alt_text || 'text'}
            />
          )}
        </div>
        <div className="p-[10px] flex flex-col gap-4 text-[#16372D] mb-[20px] h-full  w-full ">
          <p className="text-[24px] truncate overflow-hidden whitespace-nowrap max-w-[300px] max-[768px]:max-w-full max-[768px]:text-[18px] max-[768px]:font-semibold">
            {article?.name}
          </p>
          <Markdown className="max-[768px]:text-[13px] line-clamp-3 text-base text-[#717171]">
            {article?.description}
          </Markdown>
        </div>
      </div>
    </Link>
  );
}
