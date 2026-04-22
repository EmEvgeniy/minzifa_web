'use client';

import { useTranslations } from "next-intl";
import Link from "next/link";
import Pagination from "@/components/UI/Pagination";
import { useState } from "react";
import Loader from "@/components/UI/Loader/Loader";
import { useAuthGetQuery } from "@/api/get.api";

interface IForm {
    id: number;
    form_name: string;
    form_data: {
        tour_name?: string;
        tour_start?: string;
        tour_end?: string;
        travellers_count?: number;
        total_price?: number;
        payment_status?: string;
        client_ref?: string;
        passengers?: Array<{ first_name?: string; last_name?: string; email?: string }>;
    };
    created_at: string;
}

interface PaginatedForms {
    data: IForm[];
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    };
}

export const Orders = () => {
    const t = useTranslations();

    const [page, setPage] = useState("1");

    const { data: forms, isFetched, isLoading } = useAuthGetQuery<PaginatedForms>({
        key: ['orders'],
        page: page,
        perPage: '10',
        url: 'auth/forms',
        withLocale: false,
    });

    if (isLoading) {
        return (
            <div className="container mt-[200px] mb-[50px] mx-auto h-[calc(100vh-200px-50px)] flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            case 'refunded':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    const getPaymentStatusLabel = (status?: string) => {
        switch (status) {
            case 'paid':
                return t('paymentStatuses.paid');
            case 'pending':
                return t('paymentStatuses.pending');
            case 'cancelled':
                return t('paymentStatuses.cancelled');
            case 'failed':
                return t('paymentStatuses.failed');
            case 'refunded':
                return t('paymentStatuses.refunded');
            default:
                return status || 'Unknown';
        }
    };

    const calculateDays = (start?: string, end?: string) => {
        if (!start || !end) return null;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return isFetched && (
        <div className="container mt-[150px] md:mt-[200px] mb-[50px] mx-auto px-4">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {t('orders.title')}
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                    {t('orders.subtitle', { count: forms?.meta?.total || 0 })}
                </p>
            </div>

            {forms?.data && forms.data.length > 0 ? (
                <div className="space-y-4">
                    {forms.data.map((form) => {
                        const formData = form.form_data;
                        const tourDays = calculateDays(formData.tour_start, formData.tour_end);
                        const mainPassenger = formData.passengers?.[0];

                        return (
                            <Link
                                href={`/orders/${form.id}`}
                                key={form.id}
                                className="block"
                            >
                                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 md:p-6 transition-all duration-300 hover:shadow-xl hover:border-green-200 hover:-translate-y-1">
                                    <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-bold text-lg md:text-xl text-foreground">
                                                    {formData.client_ref || `Booking #${form.id}`}
                                                </h3>
                                                {tourDays && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                                                        {tourDays} {t('orders.days')}
                                                    </span>
                                                )}
                                            </div>
                                            {formData.tour_name && (
                                                <p className="text-gray-600 text-sm md:text-base font-medium">
                                                    {formData.tour_name}
                                                </p>
                                            )}
                                        </div>
                                        <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(formData.payment_status)}`}>
                                            {getPaymentStatusLabel(formData.payment_status)}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {formData.tour_start && formData.tour_end && (
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-gray-500 mb-1">{t('orders.tour_dates')}</p>
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {new Date(formData.tour_start).toLocaleDateString()}
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        {new Date(formData.tour_end).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {formData.travellers_count && (
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-gray-500 mb-1">{t('orders.tourists')}</p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {formData.travellers_count} {t('orders.people')}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-gray-500 mb-1">{t('profile.name')}</p>
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {mainPassenger ? `${mainPassenger.first_name || ''} ${mainPassenger.last_name || ''}`.trim() : '-'}
                                                </p>
                                            </div>
                                        </div>

                                        {formData.total_price && (
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-gray-500 mb-1">{t('orders.total_price')}</p>
                                                    <p className="text-sm font-bold text-gray-900">
                                                        ${formData.total_price.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <div className="flex items-center text-xs text-gray-500">
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {t('orders.created')}: {new Date(form.created_at).toLocaleDateString()} {new Date(form.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">{t('orders.no_orders')}</h3>
                    <p className="text-gray-500">{t('orders.no_orders_description')}</p>
                </div>
            )}

            {forms?.data && forms.data.length > 0 && (
                <div className="mt-8">
                    <Pagination
                        currentPage={forms?.meta?.current_page as number}
                        totalPages={forms?.meta?.last_page as number}
                        onPageChange={(page) => setPage(page.toString())}
                    />
                </div>
            )}
        </div>
    );
};