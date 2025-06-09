import localFont from 'next/font/local';
import './globals.css';
import { useLocale } from 'next-intl';
import { TopNav } from '@/components';
import { NextIntlClientProvider } from 'next-intl';
import { QueryProvider } from '@/providers/QueryProvider';
import { Footer } from '@/components/Footer';
import { ThemeProviderWrap } from '@/providers/ThemeProviderWrap';

const fonts = localFont({
  src: [
    {
      path: '../../assets/fonts/SF-Pro-Display/SF-Pro-Display-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/SF-Pro-Display/SF-Pro-Display-Medium.woff',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../../assets/fonts/SF-Pro-Display/SF-Pro-Display-Semibold.woff',
      weight: '700',
      style: 'semi-bold',
    },
    {
      path: '../../assets/fonts/SF-Pro-Display/SF-Pro-Display-Bold.woff',
      weight: '900',
      style: 'bold',
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = useLocale();

  return (
    <html lang={`${locale}`}>
      <body className={fonts.className}>
        <NextIntlClientProvider>
          <QueryProvider>
            <ThemeProviderWrap>
              <div className="flex flex-col h-full min-h-[100vh] w-full">
                <TopNav />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </ThemeProviderWrap>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
