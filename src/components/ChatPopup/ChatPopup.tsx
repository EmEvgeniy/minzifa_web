'use client';

import { Controller } from 'react-hook-form';
import Button from '@/components/UI/Button/Button';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import { PhoneInputComp } from '@/components/UI';
import { ChatMessages } from '@/components/Chats/ChatMessages';
import { ChatInput } from '@/components/Chats/ChatInput';
import { useChatPopup } from '@/hooks/useChatPopup';

export const ChatPopup = () => {
  const {
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
  } = useChatPopup();

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-br from-[#27A430] to-[#44DB4E] hover:from-[#1b7521] hover:to-[#31a039] text-white rounded-full p-5 md:p-3 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl cursor-pointer"
        >
          <IoChatbubbleEllipses size={30} className="w-8 h-8 md:w-6 md:h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
      <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-2xl w-[calc(100vw-2rem)] h-[calc(100vh-8rem)] md:w-[420px] md:h-[520px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#16372d] via-[#1a3d32] to-[#16372d] text-white p-4 md:p-6 rounded-t-2xl flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <h3 className="font-bold text-base md:text-lg">
              {isChatMode ? t('chat_popup.chat_title') : t('chat_popup.form_title')}
            </h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-300 transition-colors duration-200 p-1 rounded-full hover:bg-white/10 cursor-pointer"
          >
            <MdClose size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
          {isChatMode ? (
            <div className="h-full flex flex-col">
              <ChatMessages messages={{ data: messages }} />
              <ChatInput
                message={messageInput}
                onMessageChange={setMessageInput}
                onSendMessage={handleSendMessage}
              />
            </div>
          ) : (
            <div className="p-4 md:p-6 h-full overflow-y-auto">
              <div className="mb-4 md:mb-6">
                <h4 className="text-gray-700 font-semibold text-sm mb-2">
                  {t('chat_popup.form_subtitle')}
                </h4>
                <p className="text-gray-500 text-xs">{t('chat_popup.form_description')}</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    {...register('name')}
                    className={`${inputClasses(
                      !!errors.name,
                    )} transition-all duration-200 focus:shadow-lg`}
                    placeholder={t('chat_popup.name_placeholder')}
                    disabled={isAuthenticated}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    {...register('email')}
                    className={`${inputClasses(
                      !!errors.email,
                    )} transition-all duration-200 focus:shadow-lg`}
                    placeholder={t('chat_popup.email_placeholder')}
                    disabled={isAuthenticated}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="relative">
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <PhoneInputComp
                        value={field.value || ''}
                        onChange={(value) => field.onChange(value)}
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    {...register('message')}
                    className={`${inputClasses(
                      !!errors.message,
                    )} resize-none transition-all duration-200 focus:shadow-lg`}
                    placeholder={t('chat_popup.message_placeholder')}
                    rows={4}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full" disabled={!isValid || isPending}>
                  {isPending ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {t('loading')}
                    </div>
                  ) : (
                    t('chat_popup.send')
                  )}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
