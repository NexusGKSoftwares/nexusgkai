import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { VoiceControl } from './VoiceControl';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

export function ChatInput({ onSendMessage, isProcessing }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleVoiceInput = (text: string) => {
    onSendMessage(text);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full px-6 py-4 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none text-white placeholder-gray-400 pr-24 transition-all duration-300"
        />
        <div className="absolute right-2 flex gap-2">
          <VoiceControl 
            onSpeechResult={handleVoiceInput}
            isProcessing={isProcessing}
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 shadow-lg shadow-purple-500/20"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </form>
  );
}