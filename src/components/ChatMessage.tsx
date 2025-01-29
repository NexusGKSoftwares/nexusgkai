import React from 'react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export function ChatMessage({ message, isUser }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
            : 'bg-white/10 backdrop-blur-sm text-gray-100 ai-message'
        } shadow-lg`}
      >
        <p className="text-sm md:text-base">{message}</p>
      </div>
    </div>
  );
}