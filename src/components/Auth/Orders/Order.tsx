'use client';

import { IOrder } from "@/types";
import { getStatusColor } from "@/utils/utils";
import { formatDate } from "date-fns";
import { useTranslations } from "next-intl";
import { useGetQuery } from "@/api";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/UI/Loader/Loader";
import Button from "@/components/UI/Button/Button";
import { FaChevronLeft } from "react-icons/fa";

export const Order = () => {
    const t = useTranslations();
    const params = useParams();
    const router = useRouter();

    const { data: order, isFetched, isLoading } = useGetQuery<IOrder>({
        key: ['order'],
        url: `orders/${params.id}`,
        withLocale: false,
    });

    if (isLoading) {
        return (
            <div className="container mt-[200px] mb-[50px] mx-auto h-screen">
                <Loader />
            </div>
        );
    }

    // Безопасное извлечение данных
    const tourDetail = order?.tour_detail;
    const tourist = order?.tourist;
    const manager = order?.manager;
    const invoice = order?.invoice;
    const chatId = order?.chat_id;
    const formName = order?.form_name;

    // Вычисление количества дней
    const calculateDays = () => {
        if (!tourDetail?.tour_start || !tourDetail?.tour_end) return null;
        const start = new Date(tourDetail.tour_start);
        const end = new Date(tourDetail.tour_end);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const tourDays = calculateDays();

    return isFetched && order && (
        <div className="container mx-auto mt-[150px] md:mt-[200px] mb-[50px] px-4">
            {/* Кнопка назад */}
            <div className="mb-6">
                <Button
                    color="soft"
                    onClick={() => router.push('/orders')}
                    className="flex items-center gap-2"
                >
                    <FaChevronLeft size={14} />
                    {t('order.back')}
                </Button>
            </div>

            {/* Заголовок */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                                {t('order.title', { order: order.order_name })}
                            </h1>
                            {tourDays && (
                                <span className="inline-flex items-center px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-sm font-medium">
                                    {tourDays} {t('orders.days')}
                                </span>
                            )}
                        </div>
                        {tourDetail?.tour_name && (
                            <p className="text-gray-600 text-lg font-medium">
                                {tourDetail.tour_name}
                            </p>
                        )}
                        {formName && (
                            <p className="text-gray-500 text-sm mt-2">
                                {t('order.source')}: <span className="font-medium">{formName}</span>
                            </p>
                        )}
                    </div>
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {t(`order_statuses.${order.status}`)}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t('orders.created')}: {formatDate(order.created_at, 'dd.MM.yyyy HH:mm')}
                    </div>

                    {/* Кнопка "Написать менеджеру" */}
                    {chatId && (
                        <Button
                            to={`/chats?id=${chatId}`}
                            color="primary"
                            className="flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            {t('order.contact_manager')}
                        </Button>
                    )}
                </div>
            </div>

            {/* Основная информация */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Информация о туре */}
                {tourDetail && (
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-lg font-bold text-foreground">{t('order.tour_info')}</h2>
                        </div>

                        <div className="space-y-3">
                            {tourDetail.tour_start && tourDetail.tour_end && (
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">{t('orders.tour_dates')}</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {formatDate(new Date(tourDetail.tour_start), 'dd.MM.yyyy')}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {formatDate(new Date(tourDetail.tour_end), 'dd.MM.yyyy')}
                                    </p>
                                </div>
                            )}

                            {tourDetail.count && (
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">{t('orders.tourists')}</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {tourDetail.count} {t('orders.people')}
                                    </p>
                                </div>
                            )}

                            {tourDetail.price && (
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">{t('order.price_per_person')}</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        ${tourDetail.price.toLocaleString()}
                                    </p>
                                </div>
                            )}

                            {tourDetail.total_price && (
                                <div className="pt-3 border-t border-gray-100">
                                    <p className="text-xs text-gray-500 mb-1">{t('orders.total_price')}</p>
                                    <p className="text-xl font-bold text-green-600">
                                        ${tourDetail.total_price.toLocaleString()}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Информация о туристе */}
                {tourist && (
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h2 className="text-lg font-bold text-foreground">{t('order.tourist_info')}</h2>
                        </div>

                        <div className="space-y-3">
                            {tourist.name && (
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">{t('profile.name')}</p>
                                    <p className="text-sm font-medium text-gray-900">{tourist.name}</p>
                                </div>
                            )}

                            {tourist.email && (
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">{t('profile.email')}</p>
                                    <p className="text-sm font-medium text-gray-900 break-all">{tourist.email}</p>
                                </div>
                            )}

                            {tourist.phone && (
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">{t('profile.phone')}</p>
                                    <p className="text-sm font-medium text-gray-900">{tourist.phone}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Информация о менеджере */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold text-foreground">{t('order.manager_info')}</h2>
                    </div>

                    <div className="space-y-3">
                        {manager ? (
                            <>
                                {manager.name && (
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">{t('profile.name')}</p>
                                        <p className="text-sm font-medium text-gray-900">{manager.name}</p>
                                    </div>
                                )}

                                {manager.email && (
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">{t('profile.email')}</p>
                                        <p className="text-sm font-medium text-gray-900 break-all">{manager.email}</p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-sm text-gray-500">{t('orders.no_manager')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Информация об оплате */}
            {invoice && (
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8 mb-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-foreground">{t('order.payment_info')}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {invoice.invoice_number && (
                            <div>
                                <p className="text-xs text-gray-500 mb-1">{t('order.invoice_number')}</p>
                                <p className="text-sm font-medium text-gray-900">{invoice.invoice_number}</p>
                            </div>
                        )}

                        {invoice.total !== undefined && (
                            <div>
                                <p className="text-xs text-gray-500 mb-1">{t('order.total_amount')}</p>
                                <p className="text-sm font-medium text-gray-900">${invoice.total.toLocaleString()}</p>
                            </div>
                        )}

                        {invoice.paid !== undefined && (
                            <div>
                                <p className="text-xs text-gray-500 mb-1">{t('order.paid_amount')}</p>
                                <p className="text-sm font-medium text-green-600">${invoice.paid.toLocaleString()}</p>
                            </div>
                        )}

                        {invoice.balance !== undefined && (
                            <div>
                                <p className="text-xs text-gray-500 mb-1">{t('order.balance')}</p>
                                <p className={`text-sm font-bold ${invoice.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                    ${invoice.balance.toLocaleString()}
                                </p>
                            </div>
                        )}
                    </div>

                    {invoice.payment_status && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">{t('order.payment_status')}</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {t(`payment_statuses.${invoice.payment_status}`)}
                                    </p>
                                </div>

                                {invoice.payment_method && (
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">{t('order.payment_method')}</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {t(`payment_methods.${invoice.payment_method}`)}
                                        </p>
                                    </div>
                                )}

                                {invoice.payment_date && (
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">{t('order.payment_date')}</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {formatDate(new Date(invoice.payment_date), 'dd.MM.yyyy')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};