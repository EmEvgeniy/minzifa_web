import './globals.css';
import { SocialMedia, TopNav } from '@/components';
import { NextIntlClientProvider } from 'next-intl';
import { QueryProvider } from '@/providers/QueryProvider';
import { ThemeProviderWrap } from '@/providers/ThemeProviderWrap';
import { CustomSnackBar } from '@/components/UI/CustomSnackBar';
import { UTMMetricsProvider } from '@/providers/UTMMetricsProvider';

import dynamic from 'next/dynamic';

const MainLayout = dynamic(() => import('@/layouts/MainLayout'));

export async function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextIntlClientProvider>
      <QueryProvider>
        <ThemeProviderWrap>
          <UTMMetricsProvider>
            <div className="flex flex-col h-full min-h-[100vh] w-full relative font-text">
              <div className="hidden md:flex md:fixed md:right-0 md:z-50 md:bg-[rgba(22,55,45,0.7)] md:backdrop-blur-[6px] md:top-[150px] md:p-5 md:rounded-tl-[16px] md:rounded-bl-[16px] max-[1024px]:p-2.5">
                <SocialMedia direction="vertical" gap={20} />
              </div>
              <TopNav />
              <MainLayout>{children}</MainLayout>
              <CustomSnackBar />
            </div>
          </UTMMetricsProvider>
        </ThemeProviderWrap>
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
