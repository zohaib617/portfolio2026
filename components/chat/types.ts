export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  input: string;
  isLoading: boolean;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    fatherName: string;
    phone: string;
    email: string;
    address: string;
    dateOfBirth: string;
    location: string;
  };
  careerObjective: string;
  skills: {
    category: string;
    items: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    year: number | string;
  }[];
  certifications: {
    title: string;
    issuer: string;
    year: string;
  }[];
  experience: {
    role: string;
    company: string;
    startDate: string;
    endDate: string | null;
    responsibilities: string[];
  }[];
  projects: {
    title: string;
    description: string;
    features: string[];
  }[];
  achievements: string[];
  languages: {
    language: string;
    proficiency: string;
  }[];
}