import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/useAuthStore';
import { useMetricsStore } from '@/store/useMetricsStore';
import { chatPopupFormSchema, ChatPopupFormType } from '@/validation/chatPopupFormSchema';
import { useSnackStore } from '@/store/useSnackStore';
import { IMessage } from '@/types';
import { useRecaptcha } from './useRecaptcha';
import { useChats } from './useChats';
import { useFormSubmit } from './useFormSubmit';
import { FormNameEnum } from '@/constants';

export const useChatPopup = () => {
  const t = useTranslations();
  const { user, isAuthenticated } = useAuthStore();
  const { metrics } = useMetricsStore();
  const { setMessage, setError } = useSnackStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isChatMode, setIsChatMode] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);

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

  const { handleChatSelect, initializeWebSocket } = useChats();

  const { submitForm, isSubmitting } = useFormSubmit({
    onSuccess(data) {
      setMessage(t('chat_popup.form_sent'));
      if (data?.chats && data.chats.length > 0) {
        const chat = data.chats[0];
        handleChatSelect(chat);
        initializeWebSocket();
        setIsChatMode(true);
      } else {
        setTimeout(() => {
          setIsOpen(false);
        }, 3000);
      }
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
    isChatMode,
    messageInput,
    setMessageInput,
    messages,
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
