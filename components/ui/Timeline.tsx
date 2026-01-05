'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TimelineItem {
  id: string | number;
  date: string;
  title: string;
  subtitle?: string;
  description?: ReactNode;
  icon?: ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export default function Timeline({ items, className = '' }: TimelineProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className={`space-y-8 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {items.map((item, index) => (
        <motion.div key={item.id} className="relative" variants={itemVariants}>
          {/* Timeline Line */}
          {index !== items.length - 1 && (
            <div className="absolute left-4 top-12 w-0.5 h-20 bg-gradient-to-b from-blue-400 to-transparent"></div>
          )}

          {/* Timeline Item */}
          <div className="flex gap-6">
            {/* Timeline Dot */}
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-white dark:border-slate-800 flex items-center justify-center text-white flex-shrink-0 z-10">
                {item.icon || (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Timeline Content */}
            <div className="flex-1 pt-1">
              <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-4 mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                    {item.date}
                  </div>
                </div>

                {item.description && (
                  <div className="text-slate-700 dark:text-slate-300 mt-3 leading-relaxed">
                    {item.description}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
