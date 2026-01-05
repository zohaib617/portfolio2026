'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  gradient?: boolean;
  delay?: number;
  animate?: boolean;
}

export default function Card({
  title,
  subtitle,
  description,
  children,
  className = '',
  hover = true,
  onClick,
  gradient = false,
  delay = 0,
  animate = true,
}: CardProps) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      whileHover={hover ? { y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' } : undefined}
      transition={{ duration: 0.3, delay }}
      viewport={{ once: true }}
      onClick={onClick}
      className={`
        rounded-lg border border-slate-200 dark:border-slate-700
        bg-white dark:bg-slate-800 p-6
        ${hover ? 'cursor-pointer' : ''}
        ${gradient ? 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900' : ''}
        ${className}
      `}
    >
      {/* Card Header */}
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Card Description */}
      {description && (
        <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
          {description}
        </p>
      )}

      {/* Card Content */}
      {children}
    </motion.div>
  );
}
