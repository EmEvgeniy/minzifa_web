import { useState } from 'react';
import { authApi } from '@/utils/http';
import { getApiUrl } from '@/utils/config';
import { FormNameEnum } from '@/constants';

interface FormSubmitOptions {
  onSuccess?: (data: FormSubmitResult) => void;
  onError?: (error: Error) => void;
}

interface FormSubmitResult {
  form_id: number;
  success: boolean;
  payment_url?: string;
}

export const useFormSubmit = (options?: FormSubmitOptions) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (
    formName: FormNameEnum,
    data: Record<string, unknown>,
  ): Promise<FormSubmitResult> => {
    setIsSubmitting(true);

    const { recaptchaToken, ...formData } = data;

    try {
      const result = await authApi<FormSubmitResult>(getApiUrl('forms/submit'), {
        method: 'POST',
        body: {
          form_name: formName,
          form_data: formData,
          recaptcha_token: recaptchaToken,
        },
      });

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
