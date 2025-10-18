import React from 'react';

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
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-white to-gray-50 border-t border-gray-200">
      <div className="flex gap-4 items-end">
        <textarea
          className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg resize-none focus:bg-white focus:border-green-700 focus:ring-2 focus:ring-green-100 transition-all duration-200 placeholder-gray-500 text-sm"
          placeholder="Введите сообщение..."
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={1}
          style={{ minHeight: '48px', maxHeight: '120px' }}
        />
        <button
          onClick={onSendMessage}
          disabled={!message.trim()}
          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 ${
            message.trim()
              ? 'bg-gradient-to-br from-green-800 to-green-900 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.409l-7-14z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
