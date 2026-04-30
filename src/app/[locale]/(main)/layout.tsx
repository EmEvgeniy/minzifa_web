import { AuthPopup } from '@/components/Auth/AuthPopup';
import GoogleOneTap from '@/components/Auth/Forms/GoogleOneTap';
import { ChatPopup } from '@/components/ChatPopup';
import Footer from '@/components/Parts/Footer/Footer';
import TopNav from '@/components/Parts/Header/TopNav';
import PlanYourTripPopup from '@/components/PlanYourTripPopup/PlanYourTripPopup';
import { CookiePopup } from '@/components/UI/CookiePopup';
import { CustomSnackBar } from '@/components/UI/CustomSnackBar';
import Metrics from '@/components/UI/Metrics/Metrics';
import ProgressBar from '@/components/UI/ProgressBar/ProgressBar';
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
              <TopNav />
              <FavoriteBtn />
              <FavoriteMenu />
              <main className="flex-1">{children}</main>
              <Footer locale={locale} />
              <AuthPopup />
              <PlanYourTripPopup />
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
