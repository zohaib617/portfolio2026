'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
  animate?: boolean;
  fullWidth?: boolean;
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
  dark = false,
  animate = true,
  fullWidth = false,
}: SectionProps) {
  const bgClass = dark ? 'bg-slate-900 dark:bg-slate-950' : 'bg-white dark:bg-slate-800';

  return (
    <section
      id={id}
      className={`py-16 md:py-20 ${bgClass} ${className} transition-colors duration-300`}
    >
      <div className={fullWidth ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
        {/* Section Header */}
        {(title || subtitle) && (
          <motion.div
            initial={animate ? { opacity: 0, y: 20 } : undefined}
            whileInView={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            {title && (
              <h2
                className={`text-4xl md:text-5xl font-bold mb-4 ${
                  dark
                    ? 'text-white'
                    : 'text-slate-900'
                }`}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={`text-lg md:text-xl max-w-2xl mx-auto ${
                  dark
                    ? 'text-slate-300'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Section Content */}
        {animate ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {children}
          </motion.div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}
