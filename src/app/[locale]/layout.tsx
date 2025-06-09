import './globals.css';
import { TopNav } from '@/components';
import { NextIntlClientProvider } from 'next-intl';
import { QueryProvider } from '@/providers/QueryProvider';
import { Footer } from '@/components/Footer';
import { ThemeProviderWrap } from '@/providers/ThemeProviderWrap';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
