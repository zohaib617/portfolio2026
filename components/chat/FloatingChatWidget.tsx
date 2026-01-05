'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatWindow from './ChatWindow';

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnreadMessage, setHasUnreadMessage] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle unread messages when chat is opened
  useEffect(() => {
    if (isOpen) {
      setHasUnreadMessage(false);
    }
  }, [isOpen]);

  // Animation variants for the chat window
  const chatWindowVariants = {
    closed: {
      scale: 0,
      opacity: 0,
      x: '50%',
      y: '50%',
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30,
        duration: 0.3
      }
    },
    open: {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30,
        duration: 0.3
      }
    }
  };

  // Animation variants for the floating button
  const buttonVariants = {
    closed: {
      scale: 1,
      rotate: 0
    },
    open: {
      scale: 1.1,
      rotate: 90
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'reverse' as const
      }
    }
  };

  const toggleChat = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsOpen(!isOpen);

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={chatWindowVariants}
            className="fixed bottom-24 right-6 w-full max-w-md h-[600px] md:w-[400px] md:h-[600px] shadow-2xl rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <ChatWindow
              title="AI Resume Assistant"
              description="Ask me about Mohammad's experience"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        onClick={toggleChat}
        className={`p-4 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${
          hasUnreadMessage ? 'ring-4 ring-blue-400/50' : ''
        }`}
        variants={buttonVariants}
        animate={hasUnreadMessage ? 'pulse' : isOpen ? 'open' : 'closed'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <div className="relative">
          {isOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M6 18L18 6M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M8 12H16M12 8V16M21 12C21 16.0732 17.863 19.4 14 19.4C13.1816 19.4 12.4068 19.2374 11.703 18.9381C10.9992 18.6388 10.3793 18.2113 9.86455 17.6829C9.34979 17.1546 8.95147 16.5347 8.68427 15.8611C8.41707 15.1875 8.28549 14.4707 8.29595 13.7531C8.30641 13.0354 8.4587 12.3281 8.74374 11.6735C9.02877 11.0189 9.44045 10.4274 9.9568 9.9344C10.4732 9.44143 11.0832 9.0575 11.7512 8.80316C12.4193 8.54882 13.1318 8.42879 13.8473 8.44944C14.5628 8.47009 15.2673 8.63111 15.9202 8.92388C16.573 9.21665 17.1613 9.63544 17.6522 10.1578"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}

          {/* Unread message indicator */}
          {hasUnreadMessage && !isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            >
              <span className="text-xs text-white font-bold">!</span>
            </motion.div>
          )}
        </div>
      </motion.button>
    </div>
  );
}