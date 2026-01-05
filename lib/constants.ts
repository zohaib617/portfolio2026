// Navigation
export const NAVIGATION_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Education', href: '/education' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Extras', href: '/extras' },
  { label: 'Personal', href: '/personal' },
];

// App Metadata
export const APP_METADATA = {
  title: 'Mohammad Zohaib Shah - AI-Driven Web Developer',
  description: 'Professional portfolio of Mohammad Zohaib Shah, AI-Driven Web Developer with expertise in Next.js, React, and Oracle technologies.',
  author: 'Mohammad Zohaib Shah',
  keywords: [
    'web developer',
    'AI-driven development',
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'portfolio',
  ],
  url: 'https://portfolio.example.com',
  image: '/profile.jpg',
};

// Chatbot
export const CHATBOT_CONFIG = {
  name: 'Zohaib Shah – AI Resume Assistant',
  persona: 'Zohaib Shah – AI Resume Assistant',
  model: 'gpt-4-turbo-preview',
  systemPrompt: `You are "Zohaib Shah – AI Resume Assistant".
Answer questions ONLY using the provided resume data.
For out-of-scope questions, respond: "This information is not available in my portfolio."
Be professional, concise, and conversational.`,
  outOfScopeResponse: 'This information is not available in my portfolio.',
};

// Theme
export const THEME_CONFIG = {
  default: 'light' as const,
  storageKey: 'portfolio-theme',
  values: ['light', 'dark'] as const,
};

// API
export const API_CONFIG = {
  baseUrl: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
  endpoints: {
    chat: '/api/chat',
  },
  timeouts: {
    request: 30000, // 30 seconds
    agent: 10000, // 10 seconds
  },
};

// Animations
export const ANIMATION_CONFIG = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
};

// Skills Categories
export const SKILLS_CATEGORIES = {
  'AI & Web Development': {
    color: 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100',
    borderColor: 'border-blue-300 dark:border-blue-700',
  },
  'Frontend': {
    color: 'bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100',
    borderColor: 'border-purple-300 dark:border-purple-700',
  },
  'Backend & Databases': {
    color: 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100',
    borderColor: 'border-green-300 dark:border-green-700',
  },
  'Soft Skills': {
    color: 'bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100',
    borderColor: 'border-amber-300 dark:border-amber-700',
  },
};

// Proficiency Levels
export const PROFICIENCY_LEVELS = {
  Beginner: 'text-yellow-600 dark:text-yellow-400',
  Intermediate: 'text-blue-600 dark:text-blue-400',
  Fluent: 'text-green-600 dark:text-green-400',
  Native: 'text-emerald-600 dark:text-emerald-400',
};
