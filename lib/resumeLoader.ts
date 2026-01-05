import { Resume } from '@/types/resume';

// Import resume data directly - using type assertion to handle potential typing issues
import resumeDataRaw from '@/data/resume.json';

const resumeData = resumeDataRaw as Resume;

let cachedResume: Resume | null = null;

export const resumeLoader = {
  getResume(): Resume {
    if (cachedResume) {
      return cachedResume;
    }

    try {
      // Validate resume structure
      validateResume(resumeData);

      cachedResume = resumeData;
      return resumeData;
    } catch (error) {
      console.error('Failed to load resume:', error);
      throw new Error('Failed to load resume data. Please ensure data/resume.json exists and is valid.');
    }
  },

  /**
   * Build chatbot context from resume data
   */
  buildChatbotContext(resume: Resume): string {
    return JSON.stringify(resume, null, 2);
  },

  /**
   * Clear cached resume (useful for testing or reloading)
   */
  clearCache(): void {
    cachedResume = null;
  },
};

function validateResume(resume: Resume): void {
  // Basic structural validation
  if (!resume) {
    throw new Error('Resume is empty');
  }

  if (!resume.personalInfo) {
    throw new Error('Missing personalInfo section');
  }

  if (!Array.isArray(resume.skills) || resume.skills.length === 0) {
    throw new Error('Missing or empty skills section');
  }

  if (!Array.isArray(resume.education)) {
    throw new Error('Missing education section');
  }

  if (!Array.isArray(resume.experience)) {
    throw new Error('Missing experience section');
  }

  if (!Array.isArray(resume.certifications)) {
    throw new Error('Missing certifications section');
  }

  if (!Array.isArray(resume.projects)) {
    throw new Error('Missing projects section');
  }

  if (!Array.isArray(resume.languages)) {
    throw new Error('Missing languages section');
  }
}
