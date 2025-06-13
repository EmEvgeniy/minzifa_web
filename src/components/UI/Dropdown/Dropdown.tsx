'use client';

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
    ReactNode,
    useMemo,
} from "react";
import { DropdownContextType, DropdownDetailsProps, DropdownSummaryProps } from "./_types";
import { cn } from "@/utils/utils"; // ✅ твоя функция объединения классов
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

interface DropdownProps {
    children: ReactNode;
    className?: string;
}

export const Dropdown = ({ children, className }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const toggle = (value?: boolean) =>
        setIsOpen(prev => (typeof value === "boolean" ? value : !prev));

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <DropdownContext.Provider value={{ isOpen, toggle }}>
            <div ref={ref} className={cn("relative inline-block w-full", className)}>
                {children}
            </div>
        </DropdownContext.Provider>
    );
};

export const DropdownSummary = ({ children, className }: DropdownSummaryProps) => {
    const context = useContext(DropdownContext);
    if (!context) throw new Error("DropdownSummary must be used within a Dropdown");

    const content = useMemo(() => {
        return typeof children === "function"
            ? children({ isOpen: context.isOpen, toggle: context.toggle })
            : children;
    }, [children, context.isOpen, context.toggle]);

    return (
        <div
            onClick={() => context.toggle()}
            onKeyDown={(e) => e.key === "Enter" && context.toggle()}
            tabIndex={0}
            role="button"
            aria-expanded={context.isOpen}
            className={cn("cursor-pointer select-none outline-none", className)}
        >
            {content}
            {context.isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
    );
};

export const DropdownDetails = ({ children, className }: DropdownDetailsProps) => {
    const context = useContext(DropdownContext);
    if (!context) throw new Error("DropdownDetails must be used within a Dropdown");

    const content = typeof children === "function"
        ? children({ isOpen: context.isOpen, toggle: context.toggle })
        : children;

    return context.isOpen ? (
        <AnimatePresence>
            <motion.div
                key="dropdown-content"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                role="menu"
                className={cn(
                    "absolute left-0 mt-2 w-full rounded-md bg-white shadow-lg border border-gray-200 z-10",
                    className
                )}
            >
                {content}
            </motion.div>
        </AnimatePresence>
    ) : null;
};

export const DropdownItem = ({ children, onClick, className = '' }: { children: ReactNode, onClick: () => void, className?: string }) => (
    <div
        onClick={onClick}
        role="menuitem"
        className={cn(className, "cursor-pointer px-4 py-2 hover:bg-gray-100")}
    >
        {children}
    </div>
);
