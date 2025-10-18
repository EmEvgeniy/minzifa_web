'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useChats } from '@/hooks/useChats';
import { AuthPopup } from '@/components/Auth/AuthPopup';
import { ChatWindow } from '@/components/Chats';

export default function ChatPage() {
  const params = useParams();
  const chatId = params.id as string;

  const { isAuthenticated, checkAuth } = useAuthStore();
  const {
    selectedChat,
    messageInput,
    currentChatMessages,
    isLoading,
    setMessageInput,
    handleSendMessage,
    handleBack,
    fetchChat,
  } = useChats();

  const [authPopupOpen, setAuthPopupOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuth();
      setAuthChecked(true);
    };

    initializeAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!authChecked) return;

    if (!isAuthenticated) {
      setAuthPopupOpen(true);
    } else if (chatId) {
      // Fetch specific chat
      fetchChat(parseInt(chatId));
    }
  }, [isAuthenticated, authChecked, chatId, fetchChat]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-[#cfdfd9]">
        <div className="w-10 h-10 border-4 border-[#16372d] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPopup open={authPopupOpen} onClose={() => setAuthPopupOpen(false)} />;
  }

  if (!selectedChat) {
    return (
      <div className="min-h-[calc(100vh-200px)] bg-[#cfdfd9] py-4">
        <div className="max-w-5xl mx-auto px-4">
          <h4 className="text-red-500 text-xl">Чат не найден</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-200px)] bg-[#cfdfd9] py-4">
      <div className="max-w-5xl mx-auto px-4 h-[calc(100vh-280px)]">
        <ChatWindow
          chat={selectedChat}
          messages={currentChatMessages}
          message={messageInput}
          onMessageChange={setMessageInput}
          onSendMessage={handleSendMessage}
          isMobile={false}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}
