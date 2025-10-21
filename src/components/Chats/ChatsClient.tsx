'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useChats } from '@/hooks/useChats';
import { AuthPopup } from '@/components/Auth/AuthPopup';
import { ChatList, ChatWindow } from './index';

export default function ChatsClient() {
  const { isAuthenticated, checkAuth, openAuthPopup } = useAuthStore();
  const {
    chats,
    selectedChat,
    messageInput,
    currentChatMessages,
    isLoading,
    fetchChats,
    setMessageInput,
    handleSendMessage,
    handleChatSelect,
  } = useChats();

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuth();
      setAuthChecked(true);
    };

    initializeAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!authChecked) {
      return;
    }

    if (!isAuthenticated) {
      openAuthPopup();
    } else {
      // Загружаем чаты только если пользователь аутентифицирован
      fetchChats();
    }
  }, [isAuthenticated, authChecked, fetchChats, openAuthPopup]);

  // Если еще идет проверка аутентификации или загрузка
  if (isLoading || !authChecked) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-800 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-700">Загружаем ваши чаты...</h3>
          <p className="text-gray-500 mt-2">Пожалуйста, подождите</p>
        </div>
      </div>
    );
  }

  // Если пользователь не аутентифицирован
  if (!isAuthenticated) {
    return <AuthPopup />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 h-[calc(100vh-160px)]">
        {/* Главный layout чата */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex h-full">
          {/* Левая панель - список чатов */}
          <div className="w-96 border-r border-gray-200">
            <ChatList chats={chats} selectedChat={selectedChat} onChatSelect={handleChatSelect} />
          </div>

          {/* Правая панель - активный чат или placeholder */}
          <div className="flex-1">
            {selectedChat ? (
              <ChatWindow
                chat={selectedChat}
                messages={currentChatMessages}
                message={messageInput}
                onMessageChange={setMessageInput}
                onSendMessage={handleSendMessage}
                isMobile={false}
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="text-center max-w-md">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-4xl">💬</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">Выберите разговор</h2>
                  <p className="text-gray-600 text-lg">
                    Кликните на чат в списке слева, чтобы начать общение с менеджером поддержки
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
