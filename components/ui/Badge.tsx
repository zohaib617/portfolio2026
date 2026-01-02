'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon,
}: BadgeProps) {
  const variantClasses = {
    default:
      'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-600',
    primary:
      'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-700',
    success:
      'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 border border-green-200 dark:border-green-700',
    warning:
      'bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 border border-amber-200 dark:border-amber-700',
    danger:
      'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 border border-red-200 dark:border-red-700',
    info: 'bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 border border-purple-200 dark:border-purple-700',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full font-medium
        transition-colors duration-200
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
