import Metrics from '@/components/UI/Metrics/Metrics';
import './[locale]/globals.css';
import { Unbounded, Inter } from 'next/font/google';
import ProgressBar from '@/components/UI/ProgressBar/ProgressBar';

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

export async function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={params.lang}>
      <body className={`${TitleFont.variable} ${TextFont.variable}`}>
        <ProgressBar />
        <Metrics />
        {children}
      </body>
    </html>
  );
}
