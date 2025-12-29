'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface TelegramSubscriptionProps {
    userId: number;
    initialChatId?: number | null;
    botUsername?: string;
    onStatusChange?: (connected: boolean) => void;
}

export default function TelegramSubscription({
    userId,
    initialChatId,
    botUsername = 'minzifa_travel_bot',
    onStatusChange,
}: TelegramSubscriptionProps) {
    const t = useTranslations('profile.telegram');
    const [isConnected, setIsConnected] = useState(!!initialChatId);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsConnected(!!initialChatId);
    }, [initialChatId]);

    const handleConnect = () => {
        setIsLoading(true);

        // Generate deep link with user ID
        const deepLink = `https://t.me/${botUsername}?start=user_${userId}`;

        // Open Telegram in new window
        window.open(deepLink, '_blank');

        // Simulate connection check (in real app, you'd poll the API)
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    const handleDisconnect = async () => {
        try {
            setIsLoading(true);

            // Call API to disconnect
            const response = await fetch('/api/v1/profile/telegram/disconnect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setIsConnected(false);
                onStatusChange?.(false);
            }
        } catch (error) {
            console.error('Failed to disconnect Telegram:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <svg
                            className="w-6 h-6 text-[#0088cc]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                        </svg>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {t('title')}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                {t('description')}
                            </p>
                        </div>
                    </div>

                    {isConnected && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span>{t('statusConnected')}</span>
                        </div>
                    )}

                    {!isConnected && (
                        <div className="mt-4 space-y-2 text-sm text-gray-600">
                            <p>• {t('step1')}</p>
                            <p>• {t('step2')}</p>
                            <p>• {t('step3')}</p>
                        </div>
                    )}
                </div>

                <div className="ml-4">
                    {isConnected ? (
                        <button
                            onClick={handleDisconnect}
                            disabled={isLoading}
                            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-300 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? t('statusConnecting') : t('disconnect')}
                        </button>
                    ) : (
                        <button
                            onClick={handleConnect}
                            disabled={isLoading}
                            className="px-4 py-2 text-sm font-medium text-white bg-[#0088cc] hover:bg-[#0077b3] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    {t('statusConnecting')}
                                </>
                            ) : (
                                t('connect')
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
