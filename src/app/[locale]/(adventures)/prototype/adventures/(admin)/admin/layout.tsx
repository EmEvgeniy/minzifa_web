import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { type Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Sidebar } from "@/components/Adventures/Admin/Sidebar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AdminHeader } from "@/components/Adventures/Admin/AdminHeader";
import { QueryProvider } from "@/providers/QueryProvider";
import { AdventuresAuthGuard } from "@/components/Adventures/Admin/Auth/AdventuresAuthGuard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminFont = DM_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-admin',
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
        <html suppressHydrationWarning className={AdminFont.variable}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <body className="font-sans relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        <QueryProvider>
                            <AdventuresAuthGuard>
                                {children}
                                <ToastContainer
                                    position="top-right"
                                    autoClose={3000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="colored"
                                />
                            </AdventuresAuthGuard>
                        </QueryProvider>
                    </ThemeProvider>
                </body>
            </NextIntlClientProvider>
        </html >
    );
}