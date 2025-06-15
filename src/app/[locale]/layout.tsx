import './globals.css';
import { SocialMedia, TopNav } from '@/components';
import { NextIntlClientProvider } from 'next-intl';
import { QueryProvider } from '@/providers/QueryProvider';
import { Footer } from '@/components/Footer';
import { ThemeProviderWrap } from '@/providers/ThemeProviderWrap';
import { CustomSnackBar } from '@/components/UI/CustomSnackBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextIntlClientProvider>
      <QueryProvider>
        <ThemeProviderWrap>
          <div className="flex flex-col h-full min-h-[100vh] w-full relative font-text">
            <div className="fixed right-0 z-50 bg-[rgba(22,55,45,0.7)] backdrop-blur-[6px] top-[300px] p-5 rounded-tl-[16px] rounded-bl-[16px] max-[1024px]:p-2.5 ">
              <SocialMedia direction="vertical" gap={20} />
            </div>
            <TopNav />
            <main className="flex-1">{children}</main>
            <Footer />
            <CustomSnackBar />
          </div>
        </ThemeProviderWrap>
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
