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
    // Chhoti screen par submit ke baad keyboard hide na ho isliye focus wapis
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
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 pb-4 space-y-4">
      {/* --- Suggested Questions (Responsive Grid) --- */}
      {message.length === 0 && !isLoading && (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              onClick={() => {
                setMessage(question);
                setTimeout(() => {
                  inputRef.current?.focus();
                }, 0);
              }}
              className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-left rounded-xl bg-white/60 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-600/60 transition-all duration-200 border border-slate-200/50 dark:border-slate-600/50 backdrop-blur-sm shadow-sm hover:shadow-md active:scale-95"
            >
              {question}
            </button>
          ))}
        </div>
      )}

      {/* --- Main Input Form --- */}
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center"
      >
        {/* Input Wrapper */}
        <div
          className={`flex-1 flex items-center gap-3 px-3 py-3 sm:px-4 sm:py-4 rounded-xl border-2 transition-all duration-200 backdrop-blur-sm ${
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
            className="flex-1 bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            maxLength={1000}
          />

          {/* Character Count Inside Input (Mobile par chupa diya space bachane ke liye) */}
          {message.length > 0 && (
            <span className="hidden xs:block text-[10px] text-slate-400 dark:text-slate-500 whitespace-nowrap">
              {message.length}/1000
            </span>
          )}
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-600 dark:disabled:to-slate-700 text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed shadow-lg active:scale-95"
        >
          {isLoading ? (
            <>
              <span className="animate-spin">⏳</span>
              <span className="text-sm">Thinking...</span>
            </>
          ) : (
            <>
              <span className="text-sm">Send</span>
              <span className="text-lg">📤</span>
            </>
          )}
        </button>
      </form>

      {/* --- Footer Info --- */}
      <div className="flex justify-between items-center px-1 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
        <p className="hidden xs:block">Enter to send, Shift+Enter for new line</p>
        <p className="ml-auto">{1000 - message.length} characters left</p>
      </div>
    </div>
  );
}