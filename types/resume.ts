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
  degree: string;
  institution: string;
  year: number;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string | number; // "2023–Present" or 2016
}

export interface Experience {
  role: string;
  company: string;
  startDate: string; // ISO 8601: YYYY-MM-DD
  endDate: string | null; // null means "Present"
  responsibilities: string[];
}

export interface Project {
  title: string;
  description: string;
  features: string[];
}

export interface Language {
  language: string;
  proficiency: "Beginner" | "Intermediate" | "Fluent" | "Native";
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
