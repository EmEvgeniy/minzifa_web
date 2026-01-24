import { FormNameEnum } from '@/constants';
import { useAuthStore } from '@/store/useAuthStore';
import { useMetricsStore } from '@/store/useMetricsStore';
import { useSnackStore } from '@/store/useSnackStore';
import { chatPopupFormSchema, ChatPopupFormType } from '@/validation/chatPopupFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useChats } from './useChats';
import { useFormSubmit } from './useFormSubmit';
import { useRecaptcha } from './useRecaptcha';

export const useChatPopup = () => {
  const t = useTranslations();
  const { user, isAuthenticated } = useAuthStore();
  const { metrics } = useMetricsStore();
  const { setMessage, setError } = useSnackStore();

  const [isOpen, setIsOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');

  const { token, getToken } = useRecaptcha();

  const schema = chatPopupFormSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    control,
    reset,
  } = useForm<ChatPopupFormType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      message: '',
      recaptchaToken: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setValue('name', user.name || '');
      setValue('email', user.email || '');
      setValue('phone', user.phone || '');
    }
  }, [isAuthenticated, user, setValue]);

  const { submitForm, isSubmitting } = useFormSubmit({
    onSuccess() {
      setMessage(t('chatPopup.formSent'));
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
      reset();
    },
    onError(error) {
      setError(error.message);
    },
  });

  const handleRecaptcha = async () => await getToken(FormNameEnum.CHAT_POPUP);

  const onSubmit = async (data: ChatPopupFormType) => {
    const formData = {
      ...data,
      recaptchaToken: token,
      ...metrics,
    };

    await submitForm(FormNameEnum.CHAT_POPUP, formData);
  };

  const { handleSendMessage } = useChats();

  return {
    isOpen,
    setIsOpen,
    messageInput,
    setMessageInput,
    register,
    handleSubmit,
    errors,
    isValid,
    control,
    onSubmit,
    t,
    isAuthenticated,
    handleSendMessage,
    token,
    handleRecaptcha,
    isSubmitting,
  };
};
