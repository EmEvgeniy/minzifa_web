'use client';

import { formatDate } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import Loader from '@/components/UI/Loader/Loader';
import Button from '@/components/UI/Button/Button';
import { FaChevronLeft } from 'react-icons/fa';
import { useAuthGetQuery } from '@/api/get.api';

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

  const {
    data: form,
    isFetched,
    isLoading,
  } = useAuthGetQuery<IForm>({
    key: ['form'],
    url: `/auth/forms/${params.id}`,
    withLocale: false,
  });

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
  const paymentStatus = formData['payment_status'] as string | undefined;
  const currency = formData['currency'] as string | undefined;

  const calculateDays = () => {
    if (!tourStart || !tourEnd) return null;
    const start = new Date(tourStart);
    const end = new Date(tourEnd);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const tourDays = calculateDays();

  return (
    isFetched &&
    form && (
      <div className="container mx-auto mt-[150px] mb-[50px] px-4 md:mt-[200px]">
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
        <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-md md:p-8">
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <h1 className="text-foreground text-2xl font-bold md:text-3xl">
                  {tourName ?? 'Form'}
                </h1>
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
              <div
                className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium ${
                  paymentStatus === 'paid'
                    ? 'bg-green-50 text-green-700'
                    : paymentStatus === 'pending'
                      ? 'bg-yellow-50 text-yellow-700'
                      : 'bg-red-50 text-red-700'
                }`}
              >
                {paymentStatus}
              </div>
            )}
          </div>
        </div>

        {/* Детали */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Основная информация */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-bold">{t('order.details')}</h2>

            {tourStart && (
              <div className="mb-4 pb-4 border-b border-gray-100">
                <p className="mb-1 text-xs text-gray-500">{t('order.tour_dates')}</p>
                <p className="text-sm font-medium">
                  {formatDate(new Date(tourStart), 'PPP')} -{' '}
                  {formatDate(new Date(tourEnd!), 'PPP')}
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
          </div>

          {/* Статус платежа */}
          {paymentStatus && (
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
              <h2 className="mb-4 text-lg font-bold">{t('order.payment')}</h2>

              <div className="mb-4 pb-4 border-b border-gray-100">
                <p className="mb-1 text-xs text-gray-500">{t('order.status')}</p>
                <p className="text-sm font-medium capitalize">{paymentStatus}</p>
              </div>

              {(formData['paid'] as number | undefined) && (
                <div>
                  <p className="mb-1 text-xs text-gray-500">{t('order.paid')}</p>
                  <p className="text-sm font-medium">
                    {(formData['paid'] as number)} {currency || 'USD'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Необработанные данные формы (для разработки) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 rounded-xl border border-gray-100 bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-bold">Form Data (Debug)</h2>
            <pre className="overflow-auto bg-gray-50 p-4 text-xs">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    )
  );
};
