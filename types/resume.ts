export interface PersonalInfo {
  fullName: string;
  fatherName: string;
  phone: string;
  email: string;
  address: string;
  dateOfBirth: string; // ISO 8601: YYYY-MM-DD
  location: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Education {
  id?: string;
  degree: string;
  institution: string;
  year: number;
  details?: string;
}

export interface Certification {
  id?: string;
  title: string;
  name?: string;
  issuer: string;
  year: string | number; // "2023–Present" or 2016
  description?: string;
  credentialUrl?: string;
}

export interface Experience {
  id?: string;
  role: string;
  position?: string;
  company: string;
  duration?: string;
  startDate: string; // ISO 8601: YYYY-MM-DD
  endDate: string | null; // null means "Present"
  description?: string;
  responsibilities: string[];
  technologies?: string[];
  achievements?: string[];
}

export interface Project {
  id?: string;
  title: string;
  name?: string;
  description: string;
  features: string[];
  technologies?: string[];
  projectUrl?: string;
  githubUrl?: string;
}

export interface Language {
  id?: string;
  language: string;
  name?: string;
  proficiency: "Beginner" | "Intermediate" | "Fluent" | "Native";
  description?: string;
}

export interface Resume {
  personalInfo: PersonalInfo;
  careerObjective: string;
  skills: SkillCategory[];
  education: Education[];
  certifications: Certification[];
  experience: Experience[];
  projects: Project[];
  achievements: string[];
  languages: Language[];
}
