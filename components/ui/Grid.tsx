'use client';

import { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function Grid({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
  className = '',
}: GridProps) {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-10',
  };

  const colClasses = `
    grid
    grid-cols-${columns.mobile}
    md:grid-cols-${columns.tablet}
    lg:grid-cols-${columns.desktop}
    ${gapClasses[gap]}
    ${className}
  `;

  // Since Tailwind doesn't support dynamic class names, we use inline style or hardcoded options
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, 100%), 1fr))`,
    gap: gap === 'sm' ? '1rem' : gap === 'md' ? '1.5rem' : gap === 'lg' ? '2rem' : '2.5rem',
  };

  // For better Tailwind support, return with conditional classes
  if (columns.mobile === 1 && columns.tablet === 2 && columns.desktop === 3) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${gapClasses[gap]} ${className}`}>
        {children}
      </div>
    );
  }

  if (columns.mobile === 1 && columns.tablet === 1 && columns.desktop === 2) {
    return (
      <div className={`grid grid-cols-1 lg:grid-cols-2 ${gapClasses[gap]} ${className}`}>
        {children}
      </div>
    );
  }

  if (columns.mobile === 2 && columns.tablet === 3 && columns.desktop === 4) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${gapClasses[gap]} ${className}`}>
        {children}
      </div>
    );
  }

  // Fallback to inline styles
  return (
    <div style={gridStyle} className={className}>
      {children}
    </div>
  );
}
