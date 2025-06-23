import Metrics from '@/components/UI/Metrics/Metrics';
import './[locale]/globals.css';
import { useLocale } from 'next-intl';
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
  weight: ['300', '400', '500', '600', '700'],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = useLocale();

  return (
    <html lang={locale}>
      <body className={`${TitleFont.variable} ${TextFont.variable}`}>
        <Metrics />
        {children}
      </body>
    </html>
  );
}
