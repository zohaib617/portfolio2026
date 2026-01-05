'use client';

import { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatWindowProps {
  initialMessage?: string;
  title?: string;
  description?: string;
}

export default function ChatWindow({
  initialMessage = "Hi! 👋 I'm Mohammad's AI Resume Assistant. Ask me anything about his skills, experience, projects, or background!",
  title = "Chat with AI",
  description = "Ask questions about Mohammad's professional profile",
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'assistant',
      content: initialMessage,
      timestamp: new Date(),
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  /* 🔥 Stable auto-scroll (ChatGPT style) */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages, isLoading]);

  const handleSendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };

    // 🟢 local updated messages (important fix)
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: updatedMessages
            .filter((m) => m.id !== 'init')
            .map((m) => ({
              role: m.role,
              content: m.content,
            })),
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || `HTTP ${response.status}`);
      }

      const data = await response.json();

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.message ?? 'No response',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Something went wrong';

      setError(errorMessage);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: `⚠️ ${errorMessage}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'init',
        role: 'assistant',
        content: initialMessage,
        timestamp: new Date(),
      },
    ]);
    setError(null);
  };

  return (
    <div className="flex flex-col h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20 dark:border-slate-700/50">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900/80 dark:to-indigo-800/80 text-white p-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-blue-100">{description}</p>
        </div>
        <button
          onClick={handleClearChat}
          className="p-2 hover:bg-blue-700/50 rounded-lg text-sm"
        >
          🔄 Reset
        </button>
      </div>

      {/* MESSAGES */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-slate-900/50"
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}

        {isLoading && (
          <ChatMessage
            role="assistant"
            content="Thinking..."
            isLoading
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 text-sm">
          <p className="font-semibold text-red-700 dark:text-red-300">
            Error
          </p>
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* INPUT */}
      <div className="bg-white/80 dark:bg-slate-800/80 border-t p-6">
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          placeholder="Ask me about Mohammad's experience..."
        />
      </div>
    </div>
  );
}
