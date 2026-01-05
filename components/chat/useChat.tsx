import { useState, useRef } from 'react';
import { Message } from './types';

import { ResumeData } from './types';

export const useChat = (resumeData: ResumeData) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your portfolio assistant. Ask me anything about my experience, skills, projects, or background!",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Create new abort controller for this request
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      // Get AI response
      const aiResponse = await getAIResponse(input, resumeData, abortController.signal);

      // Add AI response
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      if (error !== 'aborted') {
        const errorMessage: Message = {
          id: Date.now().toString(),
          content: "Sorry, I encountered an error. Please try again.",
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    setInput,
  };
};

// Function to generate AI response using OpenAI API
const getAIResponse = async (userInput: string, resumeData: ResumeData, signal: AbortSignal): Promise<string> => {
  try {
    // Add the user message to the conversation history
    const messages = [
      {
        id: Date.now().toString(),
        content: userInput,
        sender: 'user',
        timestamp: new Date(),
      }
    ];

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages, resumeData }),
      signal, // Pass the abort signal
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get response from AI');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      // Request was aborted, return a special value to handle this case
      throw 'aborted';
    }
    console.error('Error getting AI response:', error);
    return "Sorry, I'm having trouble responding right now. Please try again later.";
  }
};