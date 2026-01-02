'use client';

import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  gradient?: boolean;
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
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-lg border border-slate-200 dark:border-slate-700
        bg-white dark:bg-slate-800 p-6
        transition-all duration-300
        ${hover ? 'hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 hover:-translate-y-1 cursor-pointer' : ''}
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
    </div>
  );
}
