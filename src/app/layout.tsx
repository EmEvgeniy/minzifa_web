import Metrics from '@/components/UI/Metrics/Metrics';
import './[locale]/globals.css';
import { Unbounded, Inter } from 'next/font/google';
import ProgressBar from '@/components/UI/ProgressBar/ProgressBar';
import { ReactNode } from "react";

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
  children: ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={params.lang}>
      <head>
        <meta
          name="google-site-verification"
          content="TXw2szbVg4BjVd82sfGaC_LgwUgkH0hQrTlJRec6mg0"
        />
        <meta name="yandex-verification" content="0cf29f74b98cb00d" />
      </head>
      <body className={`${TitleFont.variable} ${TextFont.variable}`}>
        <ProgressBar />
        <Metrics locale={params.lang} />
        {children}
      </body>
    </html>
  );
}
