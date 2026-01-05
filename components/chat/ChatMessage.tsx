'use client';

import { ReactNode } from 'react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string | ReactNode;
  timestamp?: Date;
  isLoading?: boolean;
}

export default function ChatMessage({
  role,
  content,
  timestamp,
  isLoading = false,
}: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div
      className={`flex gap-4 mb-6 animate-fadeIn ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
          🤖
        </div>
      )}

      {/* Message Content */}
      <div
        className={`max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl px-5 py-4 rounded-2xl backdrop-blur-sm border ${
          isUser
            ? 'bg-blue-600/20 dark:bg-blue-700/20 text-white rounded-br-none border-blue-300/30 dark:border-blue-600/30 shadow-lg'
            : 'bg-white/70 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100 rounded-bl-none border-slate-200/30 dark:border-slate-600/30 shadow-lg'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm ml-2">Thinking...</span>
          </div>
        ) : (
          <div className="text-sm leading-relaxed whitespace-pre-wrap">{content}</div>
        )}

        {/* Timestamp */}
        {timestamp && !isLoading && (
          <p
            className={`text-xs mt-2 ${
              isUser
                ? 'text-blue-200/80'
                : 'text-slate-500/80 dark:text-slate-400/80'
            }`}
          >
            {timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-slate-500 to-slate-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
          👤
        </div>
      )}
    </div>
  );
}