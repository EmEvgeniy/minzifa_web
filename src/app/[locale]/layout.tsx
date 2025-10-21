import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { QueryProvider } from '@/providers/QueryProvider';
import { CustomSnackBar } from '@/components/UI/CustomSnackBar';
import { UTMMetricsProvider } from '@/providers/UTMMetricsProvider';
import dynamic from 'next/dynamic';
import TopNav from '@/components/TopNav/TopNav';
import SocialMedia from '@/components/UI/SocialMedia/SocialMedia';
import Footer from '@/components/Footer/Footer';
import { getMessages } from 'next-intl/server';
import { ThemeProviderWrap } from '@/providers/ThemeProviderWrap';
import { AuthInitializerWithSuspense } from '@/components/Auth/AuthInitializer';
import { ChatPopup } from '@/components/ChatPopup';
import MetricsComponent from '@/components/UI/Metrics/Metrics';
import { CookiePopup } from '@/components/UI/CookiePopup';
import { AuthPopup } from '@/components/Auth/AuthPopup';

// Оптимизированные динамические импорты с приоритетами загрузки
const ClientPopupObserver = dynamic(() => import('@/layouts/ClientPopupObsorver'), {
  loading: () => null,
});

const FavoriteBtn = dynamic(() => import('@/components/UI/FavoriteBtn/FavoriteBtn'), {
  loading: () => null,
});

const FavoriteMenu = dynamic(() => import('@/components/UI/FavoriteBtn/FavoriteMenu'), {
  loading: () => null,
});

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
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <QueryProvider>
        <ThemeProviderWrap>
          <UTMMetricsProvider>
            <div className="flex flex-col h-full min-h-[100vh] w-full relative font-text">
              <AuthInitializerWithSuspense />
              <div className="hidden md:flex md:fixed md:right-0 md:z-50 md:bg-[rgba(22,55,45,0.7)] md:backdrop-blur-[6px] md:top-[150px] md:p-5 md:rounded-tl-[16px] md:rounded-bl-[16px] max-[1024px]:p-2.5">
                <SocialMedia direction="vertical" gap={20} />
              </div>
              <TopNav />
              <FavoriteBtn />
              <FavoriteMenu />
              <main className="flex-1">{children}</main>
              <ClientPopupObserver />
              <Footer locale={locale} />
              <MetricsComponent locale={locale} />
              <AuthPopup />
              <CustomSnackBar />
              <ChatPopup />
              <CookiePopup />
            </div>
          </UTMMetricsProvider>
        </ThemeProviderWrap>
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
