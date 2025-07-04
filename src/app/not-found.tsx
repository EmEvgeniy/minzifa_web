import { nf, person } from '@/assets/img';
import { getLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export default async function NotFoundPage({ params }: { params: { locale: string } }) {
  const locale = params?.locale || (await getLocale());

  if (!['en', 'ru'].includes(locale)) {
    notFound();
  }

  return (
    <section className="relative w-full h-[100vh] overflow-hidden">
      <Image src={nf} alt="nf" fill className="object-contain object-bottom" loading="lazy" />
      <Image
        src={person}
        alt="nf"
        width={0}
        loading="lazy"
        className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 object-contain max-w-[600px]"
      />
      <div className="flex items-center justify-start flex-col relative z-10 h-full py-[100px] gap-5">
        <h1 className="text-[200px] font-semibold">404</h1>
        <p className="text-[24px]">
          {locale === 'en' ? 'Oops, page not found' : 'Упс, страница не найдена'}
        </p>
        <Link
          href={`/${locale}`}
          className="bg-[#27A430] px-[20px] py-[10px] text-white text-[18px] rounded-[16px] hover:bg-[#208B28] transition-all"
        >
          {locale === 'en' ? 'Back to the main page' : 'Вернуться на главную страницу'}
        </Link>
      </div>
    </section>
  );
}
