import { useState } from 'react';
import { axiosInstance, authAxiosInstance } from '@/utils/axios';
import { getApiUrl } from '@/utils/config';

interface FormSubmitOptions {
  onSuccess?: (data: FormSubmitResult) => void;
  onError?: (error: Error) => void;
}

interface FormSubmitResult {
  form_id?: number;
  form?: Record<string, unknown>;
  order_id?: number;
  errors?: {
    form?: Error;
    telegram?: Error;
    email?: Error;
    amocrm?: Error;
    order?: Error;
    googleRecaptcha?: Error;
  };
}

/**
 * Универсальный хук для отправки форм
 *
 * Выполняет цепочку запросов последовательно для мониторинга каждой операции:
 * 1. Telegram уведомление (Job, не блокирует)
 * 2. Email уведомления (Job)
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

    try {
      const formData = { form_name: formName, form_data: data };
      //       token: data.recaptchaToken,
      //       action: formName,
      //     });

      //     delete formData.form_data?.recaptchaToken;
      //   } catch (error) {
      //     console.error('Google ReCaptcha check failed:', error);

      //     result.errors!.googleRecaptcha = error as Error;

      //     // Завершаем выполнение — дальше не продолжаем
      //     options?.onError?.(error as Error);
      //     return result;
      //   }
      // }
      delete formData.form_data?.recaptchaToken;

      // Шаг 0: Сохраняем форму в БД (с авторизацией если есть токен)
      try {
        const formResponse = await authAxiosInstance.post(getApiUrl('forms/store'), formData);
        result.form_id = formResponse.data.form_id;
      } catch (error) {
        console.error('Form save failed:', error);
        result.errors!.form = error as Error;
        throw error; // Останавливаем выполнение если форма не сохранилась
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
