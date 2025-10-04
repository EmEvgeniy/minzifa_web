import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/useAuthStore';
import { useMetricsStore } from '@/store/useMetricsStore';
import { chatPopupFormSchema, ChatPopupFormType } from '@/validation/chatPopupFormSchema';
import { usePostMutation } from '@/api/post.api';
import { useSnackStore } from '@/components/UI/CustomSnackBar/store';
import { IMessage } from '@/types';

export const useChatPopup = () => {
  const t = useTranslations();
  const { user, isAuthenticated } = useAuthStore();
  const { metrics } = useMetricsStore();
  const { setMessage, setError } = useSnackStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isChatMode] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  const schema = chatPopupFormSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    control,
  } = useForm<ChatPopupFormType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  // Fill form if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setValue('name', user.name || '');
      setValue('email', user.email || '');
      setValue('phone', user.phone || '');
    }
  }, [isAuthenticated, user, setValue]);

  const { mutate, isPending } = usePostMutation<{ success: boolean }, { success: boolean }>(
    ['chat-popup'],
    () => {
      setMessage(t('chat_popup.form_sent'));
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    },
    () => {
      setError(t('errors.general'));
    },
  );

  const onSubmit = (data: ChatPopupFormType) => {
    mutate({
      obj: { ...data, ...metrics, success: true },
      endpoint: 'forms/chat-popup',
    });
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    const newMessage: IMessage = {
      id: messages.length + 1,
      chat_id: 1,
      sender_type: 'App\\Models\\Tourist',
      sender_id: user?.id || 0,
      message_type: 'text',
      message: messageInput,
      file_path: '',
      is_read: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    setMessages([...messages, newMessage]);
    setMessageInput('');
    // Mock manager response
    setTimeout(() => {
      const managerMessage: IMessage = {
        id: messages.length + 2,
        chat_id: 1,
        sender_type: 'App\\Models\\Manager',
        sender_id: 1,
        message_type: 'text',
        message: t('chat_popup.manager_response'),
        file_path: '',
        is_read: true,
        created_at: new Date(),
        updated_at: new Date(),
      };
      setMessages((prev) => [...prev, managerMessage]);
    }, 2000);
  };

  const inputClasses = (hasError?: boolean) =>
    `focus:ring-green-500 focus:border-green-500 block w-full rounded-lg border p-3 text-sm text-gray-900 shadow-sm bg-white ${
      hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
    }`;

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
    handleSendMessage,
    inputClasses,
    isPending,
    t,
    isAuthenticated,
  };
};
