'use client';

import { cn } from "@/utils";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { useTranslations } from "next-intl";

export default function ScrollToTop() {
    const t = useTranslations('adventures.components');
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const footer = document.getElementById('site-footer');
        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFooterVisible(entry.isIntersecting);
            },
            { threshold: 0 }
        );

        observer.observe(footer);

        return () => {
            if (footer) observer.unobserve(footer);
        };
    }, []);

    const shouldShow = hasScrolled && !isFooterVisible;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button onClick={scrollToTop} className={cn("fixed bottom-4 right-4 z-50 bg-foreground text-background px-2 py-4 rounded-sm flex items-center gap-2 shadow-lg hover:bg-foreground/80 transition-opacity duration-300 cursor-pointer", shouldShow ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}>
            {t('backToTop')}
            <FaArrowUp />
        </button>
    );
}