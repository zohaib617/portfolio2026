'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSendMessage,
  isLoading = false,
  placeholder = "Ask me about my experience, skills, or projects...",
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || isLoading) {
      return;
    }

    onSendMessage(message.trim());
    setMessage('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const suggestedQuestions = [
    "What are your main skills?",
    "Tell me about your experience",
    "What projects have you worked on?",
    "What are your certifications?",
  ];

  return (
    <div className="space-y-4">
      {/* Suggested Questions */}
      {message.length === 0 && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              onClick={() => {
                setMessage(question);
                setTimeout(() => {
                  inputRef.current?.focus();
                }, 0);
              }}
              className="px-4 py-3 text-sm text-left rounded-xl bg-white/60 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-600/60 transition-all duration-200 border border-slate-200/50 dark:border-slate-600/50 backdrop-blur-sm shadow-sm hover:shadow-md"
            >
              {question}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div
          className={`flex-1 flex items-center gap-3 px-4 py-4 rounded-xl border-2 transition-all duration-200 backdrop-blur-sm ${
            isFocused
              ? 'border-blue-500/50 dark:border-blue-400/50 bg-white/50 dark:bg-slate-700/50 shadow-lg'
              : 'border-slate-200/50 dark:border-slate-600/50 bg-white/40 dark:bg-slate-800/40 shadow-sm'
          }`}
        >
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1 bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            maxLength={1000}
          />

          {message.length > 0 && (
            <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
              {message.length}/1000
            </span>
          )}
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-600 dark:disabled:to-slate-700 text-white font-medium transition-all duration-200 flex items-center gap-2 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-sm disabled:transform-none"
        >
          {isLoading ? (
            <>
              <span className="animate-spin">⏳</span>
              <span className="hidden sm:inline text-sm">Thinking...</span>
            </>
          ) : (
            <>
              <span className="hidden sm:inline text-sm">Send</span>
              <span>📤</span>
            </>
          )}
        </button>
      </form>

      {/* Character Count and Help Text */}
      <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
        <p className="text-xs">Press Enter to send, Shift+Enter for new line</p>
        <p className="text-xs">{1000 - message.length} characters remaining</p>
      </div>
    </div>
  );
}