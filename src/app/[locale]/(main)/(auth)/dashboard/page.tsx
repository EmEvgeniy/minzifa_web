import { Metadata } from "next";
import Dashboard from "@/components/Auth/Dashboard/Dashboard";

export const metadata: Metadata = {
    title: 'Dashboard - Minzifa Travel',
    description:
        'Dashboard - Minzifa Travel',
    keywords: 'Dashboard - Minzifa Travel',
};

export default function page() {
    return <Dashboard />;
}