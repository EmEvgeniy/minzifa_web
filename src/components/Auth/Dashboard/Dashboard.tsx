'use client';

import React from 'react';
import Link from 'next/link';
import { useGetQuery } from '@/api';
import { IOrder, PaginatedData } from '@/types';
import { useTranslations } from 'next-intl';

const Dashboard: React.FC = () => {
    const t = useTranslations('dashboard');

    // Fetch orders to get the total count
    const { data: orders, isLoading } = useGetQuery<PaginatedData<IOrder>>({
        key: ['orders'],
        page: '1',
        perPage: '1', // We only need the count
        url: 'orders',
        withLocale: false,
    });

    const ordersCount = orders?.meta?.total || 0;

    return (
        <div className="container mx-auto px-4 py-8 mt-[80px] md:mt-[150px]">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('title')}</h1>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">{t('total_orders')}</p>
                        {isLoading ? (
                            <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
                        ) : (
                            <p className="text-3xl font-bold text-gray-900">{ordersCount}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('quick_access')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Orders Card */}
                <Link href="/orders" className="group block">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md hover:border-blue-200 hover:-translate-y-1 h-full">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </div>
                            <svg className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('my_orders')}</h3>
                        <p className="text-sm text-gray-500">{t('my_orders_description')}</p>
                    </div>
                </Link>

                {/* Chats Card */}
                <Link href="/chats" className="group block">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md hover:border-green-200 hover:-translate-y-1 h-full">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <svg className="w-5 h-5 text-gray-300 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('messages')}</h3>
                        <p className="text-sm text-gray-500">{t('messages_description')}</p>
                    </div>
                </Link>

                {/* Profile Card */}
                <Link href="/profile" className="group block">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md hover:border-purple-200 hover:-translate-y-1 h-full">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <svg className="w-5 h-5 text-gray-300 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('profile')}</h3>
                        <p className="text-sm text-gray-500">{t('profile_description')}</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;