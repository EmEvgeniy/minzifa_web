import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { QueryProvider } from '@/providers/QueryProvider';
import { Inter, Unbounded } from 'next/font/google';
import './(main)/globals.css';

const TitleFont = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
});

const TextFont = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
});

const LOCALES = ['en', 'ru'] as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!LOCALES.includes(locale as 'en' | 'ru')) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${TitleFont.className} ${TextFont.className}`}>
        <QueryProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
