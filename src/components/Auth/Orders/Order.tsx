'use client';

import { formatDate } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import Loader from '@/components/UI/Loader/Loader';
import { FaSpinner } from 'react-icons/fa';
import Button from '@/components/UI/Button/Button';
import { FaChevronLeft, FaCreditCard, FaTimes } from 'react-icons/fa';
import { useAuthGetQuery } from '@/api/get.api';
import { useAuthPostMutation } from '@/api/post.api';
import { useState } from 'react';
import { Popup } from '@/components/UI/Popup';
import { Textarea } from '@/components/UI/Form';

interface IForm {
  id: number;
  form_name: string;
  form_data: Record<string, unknown>;
  created_at: string;
}

export const Order = () => {
  const t = useTranslations();
  const params = useParams();
  const router = useRouter();

  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);

  const {
    data: form,
    isFetched,
    isLoading,
    refetch,
  } = useAuthGetQuery<IForm>({
    key: ['form'],
    url: `/auth/forms/${params.id}`,
    withLocale: false,
  });

  const createPaymentLinkMutation = useAuthPostMutation(
    ['createPaymentLink', params.id as string],
    (data: { payment_url?: string }) => {
      setShowPaymentPopup(false);
      if (data?.payment_url) {
        window.location.href = data.payment_url;
      }
    },
  );

  const cancelOrderMutation = useAuthPostMutation(['cancelOrder', params.id as string], () => {
    setShowCancelPopup(false);
    setCancelReason('');
    refetch();
  });

  const handlePayNow = () => {
    setShowPaymentPopup(true);
  };

  const handleCreatePaymentLink = async (option: 'deposit' | 'full') => {
    setIsCreatingPayment(true);
    try {
      await createPaymentLinkMutation.mutateAsync({
        obj: { payment_option: option },
        endpoint: `payments/payworld/create-link/${params.id}`,
      });
    } catch (error) {
      console.error('Failed to create payment link:', error);
    } finally {
      setIsCreatingPayment(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) return;
    setIsCancelling(true);
    try {
      await cancelOrderMutation.mutateAsync({
        obj: { reason: cancelReason },
        endpoint: `auth/forms/${params.id}/cancel`,
      });
    } catch (error) {
      console.error('Failed to cancel order:', error);
    } finally {
      setIsCancelling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto mt-[200px] mb-[50px] flex h-[calc(100vh-200px-50px)] items-center justify-center">
        <Loader />
      </div>
    );
  }

  const formData = form?.form_data ?? {};
  const tourName = formData['tour_name'] as string | undefined;
  const tourStart = formData['tour_start'] as string | undefined;
  const tourEnd = formData['tour_end'] as string | undefined;
  const totalPrice = formData['total_price'] as number | undefined;
  const paid = formData['paid'] as number | undefined;
  const balance = formData['balance'] as number | undefined;
  const depositAmount = formData['deposit_amount'] as number | undefined;
  const currency = formData['currency'] as string | undefined;
  const paymentStatus = formData['payment_status'] as string | undefined;
  const paymentOption = formData['payment_option'] as string | undefined;
  const passengers = formData['passengers'] as Array<{ first_name?: string; last_name?: string; email?: string; phone?: string }> | undefined;

  const formatAmount = (amount: number | undefined) => {
    if (amount === undefined) return '0';
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
  };

  const calculateDays = () => {
    if (!tourStart || !tourEnd) return null;
    const start = new Date(tourStart);
    const end = new Date(tourEnd);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const tourDays = calculateDays();
  const isPartiallyPaid = paymentStatus === 'partially_paid';
  const canCancel = paymentStatus && ['pending', 'partially_paid'].includes(paymentStatus);

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'paid':
        return 'bg-green-50 text-green-700';
      case 'partially_paid':
        return 'bg-blue-50 text-blue-700';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700';
      case 'failed':
      case 'cancelled':
      case 'rejected':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const renderPaymentOptions = () => {
    const isDeposit = paymentOption === 'deposit';
    const isFull = paymentOption === 'full';

    if (isPartiallyPaid && balance) {
      return (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">{t('order.payment_remaining')}</p>
          <Button
            color="secondary"
            onClick={() => handleCreatePaymentLink('full')}
            disabled={isCreatingPayment}
            className="w-full"
          >
            {isCreatingPayment ? (
              <FaSpinner className="animate-spin" />
            ) : (
              t('order.pay_remaining', {
                amount: formatAmount(balance),
                currency: currency || 'USD',
              })
            )}
          </Button>
        </div>
      );
    }

    if (isDeposit && depositAmount && !isPartiallyPaid) {
      return (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">{t('order.payment_deposit_info')}</p>
          <div className="flex gap-3">
            <Button
              color="secondary"
              onClick={() => handleCreatePaymentLink('deposit')}
              disabled={isCreatingPayment}
              className="flex-1"
            >
              {isCreatingPayment ? (
                <FaSpinner className="animate-spin" />
              ) : (
                t('order.pay_deposit', {
                  amount: formatAmount(depositAmount),
                  currency: currency || 'USD',
                })
              )}
            </Button>
            {totalPrice && (
              <Button
                color="secondary"
                onClick={() => handleCreatePaymentLink('full')}
                disabled={isCreatingPayment}
                className="flex-1"
              >
                {isCreatingPayment ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  t('order.pay_full', {
                    amount: formatAmount(totalPrice),
                    currency: currency || 'USD',
                  })
                )}
              </Button>
            )}
          </div>
        </div>
      );
    }

    if (isFull && totalPrice && !isPartiallyPaid) {
      return (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">{t('order.payment_full_info')}</p>
          <Button
            color="secondary"
            onClick={() => handleCreatePaymentLink('full')}
            disabled={isCreatingPayment}
            className="w-full"
          >
            {isCreatingPayment ? (
              <FaSpinner className="animate-spin" />
            ) : (
              t('order.pay_full', { amount: formatAmount(totalPrice), currency: currency || 'USD' })
            )}
          </Button>
        </div>
      );
    }

    return (
      <Button
        color="primary"
        onClick={() => handleCreatePaymentLink('full')}
        disabled={isCreatingPayment}
        className="w-full"
      >
        {isCreatingPayment ? <FaSpinner className="animate-spin" /> : t('order.pay_now')}
      </Button>
    );
  };

  return (
    isFetched &&
    form && (
      <div className="container mx-auto mt-[150px] mb-[50px] px-4 md:mt-[200px]">
        <div className="mb-6">
          <Button color="link" onClick={() => router.push('/orders')} className="flex items-center gap-2">
            <FaChevronLeft size={14} />
            {t('order.back')}
          </Button>
        </div>

        <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-md md:p-8">
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <h1 className="text-foreground text-2xl font-bold md:text-3xl">{tourName ?? 'Form'}</h1>
                {tourDays && (
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    {tourDays} {t('orders.days')}
                  </span>
                )}
              </div>
              {form.created_at && (
                <p className="text-sm text-gray-500">
                  {t('order.date', { date: formatDate(new Date(form.created_at), 'PPP') })}
                </p>
              )}
            </div>

            {paymentStatus && (
              <div className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium ${getStatusColor(paymentStatus)}`}>
                {t(`order_statuses.${paymentStatus}`) || paymentStatus}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-bold">{t('order.details')}</h2>

            {tourStart && (
              <div className="mb-4 pb-4 border-b border-gray-100">
                <p className="mb-1 text-xs text-gray-500">{t('order.tour_dates')}</p>
                <p className="text-sm font-medium">
                  {formatDate(new Date(tourStart), 'PPP')} - {formatDate(new Date(tourEnd!), 'PPP')}
                </p>
              </div>
            )}

            {totalPrice && (
              <div className="pb-4 border-b border-gray-100">
                <p className="mb-1 text-xs text-gray-500">{t('order.total_price')}</p>
                <p className="text-sm font-medium">
                  {totalPrice} {currency || 'USD'}
                </p>
              </div>
            )}

            {passengers && passengers.length > 0 && (
              <div>
                <p className="mb-2 text-xs text-gray-500">{t('order.passengers_info')}</p>
                {passengers.slice(0, 3).map((p, i) => (
                  <p key={i} className="text-sm font-medium">
                    {p.first_name} {p.last_name}
                  </p>
                ))}
                {passengers.length > 3 && (
                  <p className="text-sm text-gray-500">
                    + {passengers.length - 3} {t('order.more_passengers')}
                  </p>
                )}
              </div>
            )}
          </div>

          {paymentStatus && (
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
              <h2 className="mb-4 text-lg font-bold">{t('order.payment')}</h2>

              <div className="mb-4 pb-4 border-b border-gray-100">
                <p className="mb-1 text-xs text-gray-500">{t('order.status')}</p>
                <p className="text-sm font-medium capitalize">{t(`order_statuses.${paymentStatus}`) || paymentStatus}</p>
              </div>

              {paid !== undefined && (
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <p className="mb-1 text-xs text-gray-500">{t('order.paid')}</p>
                  <p className="text-sm font-medium text-green-600">
                    {paid} {currency || 'USD'}
                  </p>
                </div>
              )}

              {balance !== undefined && balance > 0 && (
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <p className="mb-1 text-xs text-gray-500">{t('order.balance')}</p>
                  <p className="text-sm font-medium">
                    {formatAmount(balance)} {currency || 'USD'}
                  </p>
                </div>
              )}

              {depositAmount && paymentStatus === 'pending' && (
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <p className="mb-1 text-xs text-gray-500">{t('order.deposit')}</p>
                  <p className="text-sm font-medium">
                    {formatAmount(depositAmount)} {currency || 'USD'}
                  </p>
                </div>
              )}

              {paymentStatus !== 'paid' && paymentStatus !== 'cancelled' && (
                <div className="space-y-3">
                  <Button color="secondary" onClick={handlePayNow} className="w-full flex items-center justify-center gap-2">
                    <FaCreditCard size={16} />
                    {t('order.pay_now')}
                  </Button>
                  {canCancel && (
                    <Button color="red" onClick={() => setShowCancelPopup(true)} className="w-full">
                      {t('order.cancel_order')}
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <Popup
          open={showPaymentPopup}
          handleCloseAction={() => !isCreatingPayment && setShowPaymentPopup(false)}
          showTimesButton={!isCreatingPayment}
          content={
            isCreatingPayment ? (
              <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl shadow-2xl max-w-sm">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#27A430] border-r-transparent"></div>
                <p className="text-center text-lg font-medium text-gray-900">
                  {t('order.creating_payment_link')}
                </p>
                <p className="text-center text-sm text-gray-500">
                  {t('order.please_wait_payment')}
                </p>
              </div>
            ) : (
              <div className="relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
                <h2 className="mb-4 text-xl font-bold text-gray-900">{t('order.payment_title')}</h2>
                <Button
                  color="link"
                  onClick={() => setShowPaymentPopup(false)}
                  className="absolute top-4 right-4 z-10 h-auto min-h-0 p-0 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={16} />
                </Button>
                {tourName && (
                  <div className="mb-4 rounded-lg bg-gray-50 p-3">
                    <p className="text-sm font-medium text-gray-900">{tourName}</p>
                    {tourStart && tourEnd && (
                      <p className="text-xs text-gray-500">
                        {formatDate(new Date(tourStart), 'PPP')} - {formatDate(new Date(tourEnd), 'PPP')}
                      </p>
                    )}
                  </div>
                )}

                <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">{t('order.total_price')}</p>
                    <p className="font-medium text-gray-900">{totalPrice} {currency || 'USD'}</p>
                  </div>
                  {paid !== undefined && (
                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">{t('order.paid')}</p>
                      <p className="font-medium text-green-600">{paid} {currency || 'USD'}</p>
                    </div>
                  )}
                  {balance !== undefined && balance > 0 && (
                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">{t('order.balance')}</p>
                      <p className="font-medium text-gray-900">{formatAmount(balance)} {currency || 'USD'}</p>
                    </div>
                  )}
                  {depositAmount && (
                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">{t('order.deposit')}</p>
                      <p className="font-medium text-gray-900">{formatAmount(depositAmount)} {currency || 'USD'}</p>
                    </div>
                  )}
                </div>

                {renderPaymentOptions()}
              </div>
            )
          }
        />

        <Popup
          open={showCancelPopup}
          handleCloseAction={() => setShowCancelPopup(false)}
          showTimesButton={false}
          content={
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl relative">
              <h2 className="mb-4 text-xl font-bold text-gray-900">{t('order.cancel_order_title')}</h2>
              <Button
                color="link"
                onClick={() => setShowCancelPopup(false)}
                className="absolute top-4 right-4 z-10 h-auto min-h-0 p-0 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={16} />
              </Button>
              <p className="mb-4 text-sm text-gray-600">{t('order.cancel_order_description')}</p>
              <Textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder={t('order.cancel_reason_placeholder')}
                rows={4}
              />
              <div className="flex gap-3 mt-5">
                <Button color="red" onClick={() => setShowCancelPopup(false)} className="flex-1">
                  {t('order.cancel_action')}
                </Button>
                <Button
                  color="primary"
                  onClick={handleCancelOrder}
                  disabled={!cancelReason.trim() || isCancelling}
                  className="flex-1"
                >
                  {isCancelling ? <FaSpinner className="animate-spin" /> : t('order.submit_cancel')}
                </Button>
              </div>
            </div>
          }
        />
      </div>
    )
  );
};