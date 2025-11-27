'use client';

import React from 'react';

import { useChatsStore } from '@/store';
import { useTranslations } from 'next-intl';
import Loader from '@/components/UI/Loader/Loader';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

interface ChatProps {
  isMobile?: boolean;
  onBack?: () => void;
  onSendMessage: () => void;
}

export const Chat: React.FC<ChatProps> = ({ onBack, onSendMessage }) => {
  const t = useTranslations();
  const {
    selectedChat,
    currentChatMessages,
    messageInput,
    isLoading,
    setMessageInput,
  } = useChatsStore();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-full bg-white">
        <div className="text-center">
          <Loader text={t('chat.loadingChats')} />
        </div>
      </div>
    );
  }

  if (!selectedChat) {
    return null;
  }

  return (
    <div className="h-full flex-1 flex flex-col overflow-hidden shadow-2xl bg-white">
      <ChatHeader chat={selectedChat} onBack={onBack} />
      <ChatMessages messages={currentChatMessages?.data || []} />
      <ChatInput
        message={messageInput}
        onMessageChange={setMessageInput}
        onSendMessage={onSendMessage}
      />
    </div>
  );
};
