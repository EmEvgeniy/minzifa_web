import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { QueryProvider } from '@/providers/QueryProvider';
import { ThemeProviderWrap } from '@/providers/ThemeProviderWrap';
import { CustomSnackBar } from '@/components/UI/CustomSnackBar';
import { UTMMetricsProvider } from '@/providers/UTMMetricsProvider';
import dynamic from 'next/dynamic';
import TopNav from '@/components/TopNav/TopNav';
import SocialMedia from '@/components/UI/SocialMedia/SocialMedia';
import Footer from '@/components/Footer/Footer';

const ClientPopupObserver = dynamic(() => import('@/layouts/ClientPopupObsorver'));

export async function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;

  return (
    <NextIntlClientProvider>
      <QueryProvider>
        <ThemeProviderWrap>
          <UTMMetricsProvider>
            <div className="flex flex-col h-full min-h-[100vh] w-full relative font-text">
              <div className="hidden md:flex md:fixed md:right-0 md:z-50 md:bg-[rgba(22,55,45,0.7)] md:backdrop-blur-[6px] md:top-[150px] md:p-5 md:rounded-tl-[16px] md:rounded-bl-[16px] max-[1024px]:p-2.5">
                <SocialMedia direction="vertical" gap={20} />
              </div>
              <TopNav locale={locale} />
              <main className="flex-1">{children}</main>
              <ClientPopupObserver locale={locale} />
              <Footer locale={locale} />
              <CustomSnackBar />
            </div>
          </UTMMetricsProvider>
        </ThemeProviderWrap>
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
