import Metrics from '@/components/UI/Metrics/Metrics';
import './[locale]/globals.css';
import { Unbounded, Inter } from 'next/font/google';
import ProgressBar from '@/components/UI/ProgressBar/ProgressBar';
import { ReactNode } from "react";

const TitleFont = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
});

const TextFont = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
});

export async function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="TXw2szbVg4BjVd82sfGaC_LgwUgkH0hQrTlJRec6mg0"
        />
        <meta name="yandex-verification" content="0cf29f74b98cb00d" />
      </head>
      <body className={`${TitleFont.className} ${TextFont.className}`}>
        <ProgressBar />
        <Metrics />
        {children}
      </body>
    </html>
  );
}
