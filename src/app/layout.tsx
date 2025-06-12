import './globals.css';
import { useLocale } from 'next-intl';
import { TopNav } from '@/components';
import { NextIntlClientProvider } from 'next-intl';
import { QueryProvider } from '@/providers/QueryProvider';
import { Footer } from '@/components/Footer';
import { Unbounded, Inter } from 'next/font/google';

const TitleFont = Unbounded({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-title',
  weight: '400',
  display: 'swap',
});
const TextFont = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-text',
  display: 'swap',
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = useLocale();

  return (
    <html lang={`${locale}`}>
      <body className={`${TitleFont.variable} ${TextFont.variable}`}>
        <NextIntlClientProvider>
          <QueryProvider>
            <div className="flex flex-col h-full min-h-[100vh] w-full">
              <TopNav />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
