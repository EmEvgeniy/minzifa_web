import "./globals.css";
import Footer from "@/components/Adventures/UI/shared/Footer";
import Header from "@/components/Adventures/UI/shared/Header";
import ScrollToTop from "@/components/Adventures/UI/shared/ScrollToTop";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { type Metadata } from "next";
import { Tinos, Inter } from "next/font/google";
import { QueryProvider } from "@/providers/QueryProvider";
import { ReCaptchaProvider } from "@/providers/ReCaptchaProvider";

const TitleFont = Tinos({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '700'],
});

const TextFont = Inter({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export async function generateStaticParams() {
    return ['en', 'de'].map((locale) => ({ locale }));
}

export default async function AdventuresLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const messages = await getMessages({ locale });

    return (
        <html>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <QueryProvider>
                    <ReCaptchaProvider siteKey={process?.env?.NEXT_PUBLIC_GOOGLE_CAPTCHA_KEY as string}>
                        <body className={`${TitleFont.className} ${TextFont.className} relative min-h-screen flex flex-col`}>
                            <Header />
                            <main className="flex-grow">
                                {children}
                            </main>
                            <ScrollToTop />
                            <Footer />
                        </body>
                    </ReCaptchaProvider>
                </QueryProvider>
            </NextIntlClientProvider>
        </html >
    );
}