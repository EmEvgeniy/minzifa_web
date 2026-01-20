'use client';

import { ReactNode } from 'react';

export function ArticleGrid({ children }: { children: ReactNode }) {
    return (
        <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {children}
        </div>
    );
}

export function ArticleLeft({ children }: { children: ReactNode }) {
    return <div className="space-y-4">{children}</div>;
}

export function ArticleRight({ children }: { children: ReactNode }) {
    return <div className="space-y-4">{children}</div>;
}
