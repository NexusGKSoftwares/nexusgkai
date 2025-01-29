import React from 'react';
import { Bot, Settings } from 'lucide-react';

interface AvatarProps {
  customAvatar?: string;
  onCustomize?: () => void;
}

export function Avatar({ customAvatar, onCustomize }: AvatarProps) {
  return (
    <div className="relative group">
      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 p-1 shadow-lg shadow-purple-500/20 animate-fade-in">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/20 to-indigo-600/20 animate-pulse"></div>
        <div className="w-full h-full rounded-full bg-black/90 flex items-center justify-center overflow-hidden">
          {customAvatar ? (
            <img
              src={customAvatar}
              alt="Custom avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <Bot className="w-12 h-12 text-purple-400" />
          )}
        </div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
      </div>
      
      {onCustomize && (
        <button
          onClick={onCustomize}
          className="absolute -bottom-2 -right-2 p-2 rounded-full bg-purple-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-purple-500"
        >
          <Settings className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}