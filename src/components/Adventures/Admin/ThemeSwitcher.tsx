'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { motion } from "framer-motion";

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
        );
    }

    const isDark = theme === 'dark' || (theme === 'system' && resolvedTheme === 'dark');

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded-full transition-colors duration-300"
            aria-label="Toggle theme"
        >
            {/* Track */}
            <motion.div
                className="absolute inset-0.5 bg-gradient-to-r from-amber-400 to-orange-500 dark:from-slate-700 dark:to-slate-900 rounded-full"
                initial={false}
                animate={{
                    opacity: isDark ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Slider */}
            <motion.div
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center dark:bg-slate-700"
                initial={false}
                animate={{
                    x: isDark ? 32 : 4,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                }}
            >
                {isDark ? (
                    <FaMoon className="w-3.5 h-3.5 text-amber-300" />
                ) : (
                    <FaSun className="w-3.5 h-3.5 text-amber-500" />
                )}
            </motion.div>
        </button>
    );
};
