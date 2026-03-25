import { useState } from 'react';
import { axiosInstance } from '@/utils/axios';
import { getApiUrl, getCrmLeadsUrl } from '@/utils/config';

interface FormSubmitOptions {
  onSuccess?: (data: FormSubmitResult) => void;
  onError?: (error: Error) => void;
}

interface FormSubmitResult {
  form?: Record<string, unknown>;
  order?: Record<string, unknown>;
  errors?: {
    telegram?: Error;
    email?: Error;
    amocrm?: Error;
    order?: Error;
    googleRecaptcha?: Error;
  };
}

export function buildCrmLeadPayload(
  formName: string,
  data: Record<string, unknown>,
) {
  return {
    contact: {
      name: typeof data.name === 'string' ? data.name : String(data.name ?? ''),
      email: typeof data.email === 'string' ? data.email : String(data.email ?? ''),
      phone: typeof data.phone === 'string' ? data.phone : String(data.phone ?? ''),
    },
    source: 'site',
    channel: 'web',
    formData: {
      form_name: formName,
      message: data.message,
      page: data.page,
      referrer: data.referrer,
      tour_id: data.tour_id,
      tour_name: data.tour_name,
    },
    marketingData: {
      utmSource: data.utm_source,
      utmMedium: data.utm_medium,
      utmCampaign: data.utm_campaign,
      utmContent: data.utm_content,
      utmTerm: data.utm_term,
      userAgent: data.user_agent,
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      acceptedLanguage: typeof navigator !== 'undefined' ? navigator.language : undefined,
      timezone: typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : undefined,
    },
  };
}

/**
 * Универсальный хук для отправки форм
 *
 * Выполняет цепочку запросов последовательно для мониторинга каждой операции:
 * 1. Сохранение формы в БД
 * 2. Telegram уведомление (Job, не блокирует)
 * 3. Email уведомления (Job)
 * 4. AmoCRM (Job, не блокирует)
 * 5. Создание заказа в CRM (Job для чата и уведомлений)
 *
 * @example
 * const { submitForm, isSubmitting } = useFormSubmit({
 *   onSuccess: (result) => console.log('Success!', result),
 *   onError: (error) => console.error('Error:', error),
 * });
 *
 * await submitForm('forms/free-consultation', formData);
 */
export const useFormSubmit = (options?: FormSubmitOptions) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Отправляет форму и выполняет цепочку запросов
   * Каждый запрос можно мониторить отдельно
   *
   * @param formName - Название формы
   * @param formData - Данные формы
   * @returns Результат отправки
   */
  const submitForm = async (
    formName: string,
    data: Record<string, unknown>,
  ): Promise<FormSubmitResult> => {
    setIsSubmitting(true);

    const result: FormSubmitResult = {
      errors: {},
    };

    const crmLeadPayload = buildCrmLeadPayload(formName, data);

    try {
      const formData = { form_name: formName, form_data: data };

      // Шаг 0: Проверка Google ReCaptcha
      if (data.recaptchaToken) {
        try {
          await axiosInstance.post(getApiUrl('forms/check-recaptcha'), {
            token: data.recaptchaToken,
            action: formName,
          });

          delete formData.form_data?.recaptchaToken;
        } catch (error) {
          console.error('Google ReCaptcha check failed:', error);

          result.errors!.googleRecaptcha = error as Error;

          // Завершаем выполнение — дальше не продолжаем
          options?.onError?.(error as Error);
          return result;
        }
      }

      // Шаг 1: Telegram
      try {
        await axiosInstance.post(getApiUrl('forms/notifications/telegram'), formData);
      } catch (error) {
        console.warn('Telegram queuing failed (non-critical):', error);
        result.errors!.telegram = error as Error;
      }

      // Шаг 2: Email
      try {
        await axiosInstance.post(getApiUrl('forms/notifications/email'), formData);
      } catch (error) {
        console.error('Email notification failed:', error);
        result.errors!.email = error as Error;
      }

      // Шаг 3: AmoCRM
      try {
        await axiosInstance.post(getApiUrl('forms/amocrm/send'), formData);
      } catch (error) {
        console.warn('AmoCRM queuing failed (non-critical):', error);
        result.errors!.amocrm = error as Error;
      }

      // Шаг 4: Добавление в нашу CRM
      try {
        const crmApiKey = process.env.NEXT_PUBLIC_CRM_API_KEY;
        if (!crmApiKey) {
          throw new Error('Missing NEXT_PUBLIC_CRM_API_KEY for CRM lead creation');
        }
        
        const leadUrl = getCrmLeadsUrl();
        const leadResponse = await axiosInstance.post(leadUrl, crmLeadPayload, {
          headers: {
            'x-api-key': crmApiKey,
          },
        });

        result.order = leadResponse.data;
      } catch (error) {
        console.error('Order creation failed:', error);
        result.errors!.order = error as Error;
      }

      options?.onSuccess?.(result);
      return result;
    } catch (error) {
      console.error('Form submission failed:', error);
      options?.onError?.(error as Error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitForm,
    isSubmitting,
  };
};
