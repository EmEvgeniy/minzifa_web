import { AuthPopup } from '@/components/Auth/AuthPopup';
import GoogleOneTap from '@/components/Auth/Forms/GoogleOneTap';
import { ChatPopup } from '@/components/ChatPopup';
import Footer from '@/components/Parts/Footer/Footer';
import TopNav from '@/components/Parts/Header/TopNav';
import { CookiePopup } from '@/components/UI/CookiePopup';
import { CustomSnackBar } from '@/components/UI/CustomSnackBar';
import Metrics from '@/components/UI/Metrics/Metrics';
import ProgressBar from '@/components/UI/ProgressBar/ProgressBar';
import SocialMedia from '@/components/UI/SocialMedia/SocialMedia';
import { AuthCheckProvider } from '@/providers/AuthCheckProvider';
import { ReCaptchaProvider } from '@/providers/ReCaptchaProvider';
import { UTMMetricsProvider } from '@/providers/UTMMetricsProvider';
import dynamic from 'next/dynamic';

const FavoriteBtn = dynamic(() => import('@/components/UI/FavoriteBtn/FavoriteBtn'), {
  loading: () => null,
});

const FavoriteMenu = dynamic(() => import('@/components/UI/FavoriteBtn/FavoriteMenu'), {
  loading: () => null,
});

export default async function MainLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <>
      <ProgressBar />
      <Metrics />
      <UTMMetricsProvider>
        <ReCaptchaProvider siteKey={process?.env?.NEXT_PUBLIC_GOOGLE_CAPTCHA_KEY as string}>
          <AuthCheckProvider>
            <div className="flex flex-col h-full min-h-screen w-full relative font-text">
              <div className="hidden md:flex md:fixed md:right-0 md:z-50 md:bg-[rgba(22,55,45,0.7)] md:backdrop-blur-[6px] md:top-[150px] md:p-5 md:rounded-tl-[16px] md:rounded-bl-[16px] max-[1024px]:p-2.5">
                <SocialMedia direction="vertical" gap={20} iconSize={20} />
              </div>
              <TopNav />
              <FavoriteBtn />
              <FavoriteMenu />
              <main className="flex-1">{children}</main>
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
    </>
  );
}
