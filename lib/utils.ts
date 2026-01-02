// Date formatting utilities
export const formatDate = (dateString: string | null, format: 'short' | 'long' = 'long'): string => {
  if (!dateString) return 'Present';

  try {
    const date = new Date(dateString);
    if (format === 'short') {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateString;
  }
};

export const formatDateRange = (startDate: string, endDate: string | null): string => {
  const start = formatDate(startDate, 'short');
  const end = endDate ? formatDate(endDate, 'short') : 'Present';
  return `${start} – ${end}`;
};

// Duration calculation
export const calculateDuration = (startDate: string, endDate: string | null): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return remainingMonths === 1 ? '1 month' : `${remainingMonths} months`;
  }

  if (remainingMonths === 0) {
    return years === 1 ? '1 year' : `${years} years`;
  }

  return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
};

// String utilities
export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

// Class merging
export const clsx = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Debounce
export const debounce = <T extends (...args: never[]) => void>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
};

// Throttle
export const throttle = <T extends (...args: never[]) => void>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Storage utilities
export const getStorageItem = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const setStorageItem = (key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch {
    console.warn(`Failed to set localStorage item: ${key}`);
  }
};

export const removeStorageItem = (key: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch {
    console.warn(`Failed to remove localStorage item: ${key}`);
  }
};

// URL utilities
export const isExternalUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.href : 'http://localhost:3000');
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    return urlObj.origin !== currentOrigin;
  } catch {
    return false;
  }
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  // Pakistani phone number format
  const re = /^(\+92|0)[0-9]{9,10}$/;
  return re.test(phone.replace(/\s|-/g, ''));
};

// Promise utilities
export const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_resolve, reject) =>
      setTimeout(() => reject(new Error('Promise timeout')), ms),
    ),
  ]);
};

// Error handling
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
};
