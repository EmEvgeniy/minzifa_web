'use client';

import * as React from 'react';
import { cn } from '@/utils';

const TabsContext = React.createContext<{
    value: string;
    onValueChange: (value: string) => void;
} | null>(null);

interface TabsProps {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    className?: string;
    children: React.ReactNode;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
    ({ defaultValue, value, onValueChange, children, className }, ref) => {
        const [activeTab, setActiveTab] = React.useState(defaultValue || '');

        const handleTabChange = (tabValue: string) => {
            setActiveTab(tabValue);
            onValueChange?.(tabValue);
        };

        const contextValue = {
            value: value || activeTab,
            onValueChange: handleTabChange,
        };

        return (
            <TabsContext.Provider value={contextValue}>
                <div ref={ref} className={cn('w-full', className)}>
                    {children}
                </div>
            </TabsContext.Provider>
        );
    }
);

Tabs.displayName = 'Tabs';

interface TabsListProps {
    className?: string;
    children: React.ReactNode;
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
    ({ children, className }, ref) => (
        <div
            ref={ref}
            className={cn(
                'flex items-center justify-start gap-2 bg-white rounded-xl p-1 border border-gray-200',
                className
            )}
        >
            {children}
        </div>
    )
);

TabsList.displayName = 'TabsList';

interface TabsTriggerProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
    ({ value, children, className }, ref) => {
        const context = React.useContext(TabsContext);

        if (!context) {
            throw new Error('TabsTrigger must be used within a Tabs');
        }

        const isActive = value === context.value;

        return (
            <button
                ref={ref}
                type="button"
                className={cn(
                    'flex items-center justify-center whitespace-nowrap rounded-xl px-4 py-3 text-gray-700 text-sm font-medium transition-all duration-200 cursor-pointer',
                    isActive
                        ? 'bg-gray-100'
                        : 'bg-white hover:bg-gray-100',
                    className
                )}
                onClick={() => context.onValueChange(value)}
            >
                {children}
            </button>
        );
    }
);

TabsTrigger.displayName = 'TabsTrigger';

interface TabsContentProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
    ({ value, children, className }, ref) => {
        const context = React.useContext(TabsContext);

        if (!context || value !== context.value) {
            return null;
        }

        return (
            <div
                ref={ref}
                className={cn(
                    'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    className
                )}
            >
                {children}
            </div>
        );
    }
);

TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };