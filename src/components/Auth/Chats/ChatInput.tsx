'use client';

import Button from '@/components/UI/Button/Button';
import { Textarea } from '@/components/UI/Form';
import { useTranslations } from 'next-intl';
import React, { useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

interface ChatInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  message,
  onMessageChange,
  onSendMessage,
}) => {
  const t = useTranslations('chat');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    onSendMessage();
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-white to-gray-50 border-t border-gray-200">
      <div className="flex gap-4 items-end">
        <Textarea
          ref={textareaRef}
          className='text-sm'
          placeholder={t('inputPlaceholder')}
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyUp={handleKeyPress}
          rows={1}
        />
        <Button
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleSend}
          disabled={!message.trim()}
          className={`w-10 h-10 p-2.5 rounded-full flex items-center justify-center transition-all duration-200 
            ${message.trim()
              ? 'bg-gradient-to-br from-green-800 to-green-900 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          <FaPaperPlane size={16} />
        </Button>
      </div>
    </div>
  );
};
