import './globals.css';
import dynamic from 'next/dynamic';
import { NextIntlClientProvider } from 'next-intl';
import { QueryProvider } from '@/providers/QueryProvider';
import { CustomSnackBar } from '@/components/UI/CustomSnackBar';
import { UTMMetricsProvider } from '@/providers/UTMMetricsProvider';
import { ReCaptchaProvider } from '@/providers/ReCaptchaProvider';
import TopNav from '@/components/Parts/Header/TopNav';
import SocialMedia from '@/components/UI/SocialMedia/SocialMedia';
import Footer from '@/components/Parts/Footer/Footer';
import { getMessages } from 'next-intl/server';
import { ChatPopup } from '@/components/ChatPopup';
import { CookiePopup } from '@/components/UI/CookiePopup';
import { AuthPopup } from '@/components/Auth/AuthPopup';
import { AuthCheckProvider } from '@/providers/AuthCheckProvider';
import GoogleOneTap from '@/components/Auth/Forms/GoogleOneTap';
import { Unbounded, Inter } from 'next/font/google';
import Metrics from '@/components/UI/Metrics/Metrics';
import ProgressBar from '@/components/UI/ProgressBar/ProgressBar';

const TitleFont = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
});

const TextFont = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
});

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
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (<html lang="en" suppressHydrationWarning>
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
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryProvider>
          <UTMMetricsProvider>
            <ReCaptchaProvider siteKey={process?.env?.NEXT_PUBLIC_GOOGLE_CAPTCHA_KEY as string}>
              <AuthCheckProvider>
                <div className="flex flex-col h-full min-h-[100vh] w-full relative font-text">
                  <div className="hidden md:flex md:fixed md:right-0 md:z-50 md:bg-[rgba(22,55,45,0.7)] md:backdrop-blur-[6px] md:top-[150px] md:p-5 md:rounded-tl-[16px] md:rounded-bl-[16px] max-[1024px]:p-2.5">
                    <SocialMedia direction="vertical" gap={20} iconSize={20} />
                  </div>
                  <TopNav />
                  <FavoriteBtn />
                  <FavoriteMenu />
                  <main className="flex-1">{children}</main>
                  {/* <ClientPopupObserver /> */}
                  <Footer locale={locale} />
                  <AuthPopup />
                  <CustomSnackBar />
                  <ChatPopup />
                  <CookiePopup />
                  <GoogleOneTap />
                </div>
              </AuthCheckProvider>
            </ReCaptchaProvider>
          </UTMMetricsProvider>
        </QueryProvider>
      </NextIntlClientProvider>
    </body>
  </html>
  );
}
