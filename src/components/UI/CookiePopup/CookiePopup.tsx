'use client';

import { cn } from '@/utils/utils';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useCookieStore } from '@/store';
import Button from '../Button/Button';

type CookiePopupProps = {
    className?: string;
};

export const CookiePopup: FC<CookiePopupProps> = ({
    className = '',
}) => {
    const t = useTranslations('cookies');
    const { hasConsented, acceptAll, declineAll, initialize } = useCookieStore();

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Initialize cookie settings on mount
        initialize();

        // Check if user has already made a choice
        if (!hasConsented) {
            // Show popup after a short delay
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, [hasConsented, initialize]);

    const handleAccept = () => {
        acceptAll();
        setIsVisible(false);
    };

    const handleClose = () => {
        declineAll();
        setIsVisible(false);
    };

    if (!isVisible || hasConsented) return null;

    return (
        <div className={cn(
            'fixed bottom-6 right-6 z-50 bg-white border border-gray-200 shadow-xl rounded-2xl max-w-xs md:max-w-md',
            'transform transition-all duration-300 ease-out',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 pointer-events-none',
            className
        )}>
            <div className="p-4">
                <div className="flex flex-col items-start justify-between gap-4">
                    <div className="flex flex-row items-center w-full">
                        <h3 className="text-lg font-semibold text-[#16372D] w-full">
                            {t('title')}
                        </h3>
                        <Button
                            onClick={handleClose}
                            className=" p-1.5 w-6 h-6"
                            color="link"
                        >
                            <FaTimes size={12} />
                        </Button>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {t('description')}
                    </p>
                    <Button
                        onClick={handleAccept}
                        className='text-sm font-semibold px-12 py-3 w-full md:w-auto'
                    >
                        {t('accept')}
                    </Button>
                </div>
            </div>
        </div>
    );
};