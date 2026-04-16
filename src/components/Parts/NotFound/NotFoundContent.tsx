import { nf, person } from '@/assets/img';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import Link from 'next/link';

interface NotFoundContentProps {
  locale: string;
}

export default function NotFoundContent({ locale }: NotFoundContentProps) {
  return (
    <section className="relative flex min-h-[600px] w-full flex-col overflow-hidden bg-[#F5F6F4] pt-24 md:min-h-[620px] md:pt-32">
      <ImageWithFallback
        src={nf}
        alt="404 background"
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-0 h-auto w-full container object-contain object-bottom"
      />

      <ImageWithFallback
        src={person}
        alt="traveler with map"
        width={0}
        className="pointer-events-none absolute -bottom-90 z-10 w-full object-contain max-w-[500px] left-1/2 -translate-x-1/2"
      />

      <div className="relative z-20 mx-auto flex w-full max-w-[1100px] flex-col items-center px-4 pb-[180px] text-center md:px-6 md:pb-[350px] pt-[100px]">
        <h1 className="font-title text-8xl leading-[0.88] font-semibold text-[#0F4A3F] md:text-[168px] lg:text-[180px]">
          404
        </h1>
        <p className="mt-2 text-[20px] font-medium text-[#1D1D1D] md:text-[24px]">
          {locale === 'en' ? 'Oops, page not found' : 'Упс, страница не найдена'}
        </p>
        <Link
          href={`/${locale}`}
          className="mt-8 inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#27A430] px-8 text-[15px] font-medium text-white transition-all hover:bg-[#208B28] md:min-h-[54px] md:min-w-[340px] md:px-10 md:text-[18px]"
        >
          {locale === 'en' ? 'Back to the main page' : 'Вернуться на главную страницу'}
        </Link>
      </div>
    </section>
  );
}
