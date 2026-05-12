'use client';

import { useState } from "react";
import { IBookingForm } from "@/types";
import { getStatusColor } from "@/utils/utils";
import { formatDate } from "date-fns";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/UI/Loader/Loader";
import Button from "@/components/UI/Button/Button";
import { FaChevronLeft, FaCreditCard } from "react-icons/fa";
import { useAuthGetQuery } from "@/api/get.api";
import { useAuthPostMutation } from "@/api/post.api";
import { useSnackStore } from "@/store/useSnackStore";
import { MdClose } from "react-icons/md";

export const Order = () => {
    const t = useTranslations();
    const params = useParams();
    const router = useRouter();
    const { setError } = useSnackStore();

    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const [isGeneratingPaymentUrl, setIsGeneratingPaymentUrl] = useState(false);

    const { data: form, isFetched, isLoading } = useAuthGetQuery<IBookingForm>({
        key: ['form', params.id as string],
        url: `auth/orders/${params.id as string}`,
        withLocale: false,
    });

    const paymentUrlMutation = useAuthPostMutation<{ data?: { payment_url: string } }, { type: string }>(
        ['generate-payment-url'],
        (response) => {
            if (response.data?.payment_url) {
                window.open(response.data.payment_url, '_blank');
            }
            setIsGeneratingPaymentUrl(false);
            setShowPaymentPopup(false);
        },
        (error) => {
            setError(error?.message || t('order.payment_failed'));
            setIsGeneratingPaymentUrl(false);
        }
    );

    const handlePayOnline = () => {
        setIsGeneratingPaymentUrl(true);
        paymentUrlMutation.mutate({
            obj: { type: 'deposit' },
            endpoint: `auth/orders/${params.id}/payment-url`,
        });
    };

    if (isLoading) {
        return (
            <div className="container mb-[50px] mx-auto h-[calc(100vh-200px-50px)] flex items-center justify-center">
                <Loader />
            </div>
        )
    }

    // Маппинг данных из form_data
    const fd = form?.form_data ?? {};
    const formRef = form ? `FRM-${form.id}` : '';
    const formName = form?.form_name ?? null;
    const currency = fd.currency ?? 'USD';

    const tourDetail = {
        tour_name: fd.tour_name,
        tour_start: fd.tour_start,
        tour_end: fd.tour_end,
        count: fd.travellers_count,
        price: fd.tour_price,
        total_price: fd.total_price,
    };

    const mainPassenger = fd.passengers?.[0];
    const tourist = mainPassenger ? {
        name: [mainPassenger.first_name, mainPassenger.last_name].filter(Boolean).join(' ') || null,
        email: mainPassenger.email ?? null,
        phone: mainPassenger.phone ?? null,
    } : null;

    const total = fd.total_price ?? 0;
    const deposit = fd.deposit ?? fd.deposit_amount ?? 0;
    const paymentStatus = fd.payment_status ?? 'pending';
    const paymentMethod = fd.payment_type ?? null;
    const paid = paymentStatus === 'paid' ? total : 0;
    const invoice = total > 0 ? {
        invoice_number: formRef + '-INV',
        total,
        deposit,
        paid,
        balance: total - paid,
        payment_status: paymentStatus,
        payment_method: paymentMethod,
        payment_date: null,
        currency,
    } : null;

    // Вычисление количества дней
    const tourDays = (() => {
        if (!tourDetail.tour_start || !tourDetail.tour_end) return null;
        const start = new Date(tourDetail.tour_start);
        const end = new Date(tourDetail.tour_end);
        const diffDays = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays || null;
    })();

    return isFetched && form && (
        <div className="container mx-auto mb-[50px] px-4 py-8">
            {/* Кнопка назад */}
            <div className="mb-6">
                <Button
                    color="link"
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
                                {t('order.title', { order: formRef })}
                            </h1>
                            {tourDays && (
                                <span className="inline-flex items-center px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-sm font-medium">
                                    {tourDays} {t('orders.days')}
                                </span>
                            )}
                        </div>
                        {tourDetail.tour_name && (
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
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(paymentStatus)}`}>
                        {t(`paymentStatuses.${paymentStatus}`, { defaultValue: paymentStatus })}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t('orders.created')}: {formatDate(new Date(form.created_at), 'dd.MM.yyyy HH:mm')}
                    </div>

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
                                        {tourDetail.price?.toLocaleString()} {currency}
                                    </p>
                                </div>
                            )}

                            {tourDetail.total_price && (
                                <div className="pt-3 border-t border-gray-100">
                                    <p className="text-xs text-gray-500 mb-1">{t('orders.total_price')}</p>
                                    <p className="text-xl font-bold text-green-600">
                                        {tourDetail.total_price?.toLocaleString()} {currency}
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

                        {invoice.deposit !== undefined && invoice.deposit > 0 && (
                            <div>
                                <p className="text-xs text-gray-500 mb-1">{t('order.deposit_amount')}</p>
                                <p className="text-sm font-medium text-gray-900">{invoice.deposit.toLocaleString()} {invoice.currency}</p>
                            </div>
                        )}

                        {invoice.total !== undefined && (
                            <div>
                                <p className="text-xs text-gray-500 mb-1">{t('order.total_amount')}</p>
                                <p className="text-sm font-medium text-gray-900">{invoice.total.toLocaleString()} {invoice.currency}</p>
                            </div>
                        )}

                        {invoice.paid !== undefined && invoice.paid > 0 && (
                            <div>
                                <p className="text-xs text-gray-500 mb-1">{t('order.paid_amount')}</p>
                                <p className="text-sm font-medium text-green-600">{invoice.paid.toLocaleString()} {invoice.currency}</p>
                            </div>
                        )}

                        {invoice.balance !== undefined && invoice.balance > 0 && (
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">{t('order.balance')}</p>
                                    <p className="text-sm font-bold text-red-600">
                                        {invoice.balance.toLocaleString()} {invoice.currency}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {invoice.payment_status && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">{t('order.payment_status')}</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {t(`paymentStatuses.${invoice.payment_status}`)}
                                    </p>
                                </div>

                                {invoice.payment_method && (
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">{t('order.payment_method')}</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {t(`paymentMethods.${invoice.payment_method}`)}
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

            {showPaymentPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="bg-linear-to-r from-[#16372d] via-[#1a3d32] to-[#16372d] text-white p-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FaCreditCard size={24} />
                                <h3 className="text-xl font-bold">{t('order.payment_popup_title')}</h3>
                            </div>
                            <button
                                onClick={() => !isGeneratingPaymentUrl && setShowPaymentPopup(false)}
                                className="text-white hover:text-gray-300 transition-colors"
                                disabled={isGeneratingPaymentUrl}
                            >
                                <MdClose size={24} />
                            </button>
                        </div>

                        {isGeneratingPaymentUrl ? (
                            <div className="p-12 flex flex-col items-center justify-center">
                                <Loader className="w-12 h-12 mb-4" />
                                <p className="text-lg font-medium text-gray-700 text-center">
                                    {t('order.generating_payment_url')}
                                </p>
                                <p className="text-sm text-gray-500 text-center mt-2">
                                    {t('order.please_wait')}
                                </p>
                            </div>
                        ) : (
                            <div className="p-6">
                                <p className="text-gray-600 mb-6">
                                    {t('order.payment_description')}
                                </p>

                                <div className="flex gap-3">
                                    <Button
                                        color="gray"
                                        onClick={() => setShowPaymentPopup(false)}
                                        className="flex-1"
                                    >
                                        {t('common.cancel')}
                                    </Button>
                                    <Button
                                        onClick={handlePayOnline}
                                        className="flex-1"
                                    >
                                        {t('order.proceed_to_payment')}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};