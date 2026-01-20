'use client';

import { Sidebar } from "@/components/Adventures/Admin/Sidebar";
import { AdminHeader } from "@/components/Adventures/Admin/AdminHeader";
import { useLocale } from "next-intl";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const locale = useLocale();

    return (
        <>
            <Sidebar locale={locale} />
            <AdminHeader locale={locale} />
            <main className="ml-64 pt-24 px-8 pb-8 transition-all duration-300">
                {children}
            </main>
        </>
    );
}
