# Data Model: AI-Driven Personal Portfolio Website

**Created**: 2026-01-02
**Purpose**: Define the resume.json schema and all entity relationships

## Resume JSON Schema

```typescript
// types/resume.ts

interface PersonalInfo {
  fullName: string;
  fatherName: string;
  phone: string;
  email: string;
  address: string;
  dateOfBirth: string; // ISO 8601: YYYY-MM-DD
  location: string;
}

interface SkillCategory {
  category: string;
  items: string[];
}

interface Education {
  degree: string;
  institution: string;
  year: number;
}

interface Certification {
  title: string;
  issuer: string;
  year: string | number; // "2023–Present" or 2016
}

interface Experience {
  role: string;
  company: string;
  startDate: string; // ISO 8601: YYYY-MM-DD
  endDate: string | null; // null means "Present"
  responsibilities: string[];
}

interface Project {
  title: string;
  description: string;
  features: string[];
}

interface Language {
  language: string;
  proficiency: "Beginner" | "Intermediate" | "Fluent" | "Native";
}

interface Resume {
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
```

## Entity Relationships

```
Resume
├── PersonalInfo (1:1)
│   ├── fullName
│   ├── fatherName
│   ├── phone
│   ├── email
│   ├── address
│   ├── dateOfBirth
│   └── location
│
├── careerObjective (1:1, string)
│
├── Skills[] (1:many)
│   └── SkillCategory
│       ├── category (name: "AI & Web Development", "Frontend", etc.)
│       └── items[] (array of skill names)
│
├── Education[] (1:many)
│   └── Education
│       ├── degree
│       ├── institution
│       └── year
│
├── Certifications[] (1:many)
│   └── Certification
│       ├── title
│       ├── issuer
│       └── year
│
├── Experience[] (1:many)
│   └── Experience
│       ├── role
│       ├── company
│       ├── startDate
│       ├── endDate (nullable)
│       └── responsibilities[] (array of bullet points)
│
├── Projects[] (1:many)
│   └── Project
│       ├── title
│       ├── description
│       └── features[]
│
├── Achievements[] (1:many, array of strings)
│
└── Languages[] (1:many)
    └── Language
        ├── language
        └── proficiency
```

## Data Validation Rules

### PersonalInfo
- `fullName`: required, non-empty string, max 100 chars
- `phone`: required, format "+92 XXX XXXXXXX" (Pakistani format)
- `email`: required, valid email format
- `address`: required, non-empty string
- `dateOfBirth`: required, valid ISO 8601 date, age ≥ 18
- `location`: required, non-empty string

### Skills
- Each skill category must have at least 1 item
- Skill items are non-empty strings
- No duplicate skills across categories

### Education
- `degree`: required, non-empty string
- `institution`: required, non-empty string
- `year`: required, 4-digit integer, ≥ 2000, ≤ current year

### Certifications
- `title`: required, non-empty string
- `issuer`: required, non-empty string
- `year`: required, string or number format ("2023–Present" or 2016)

### Experience
- `role`: required, non-empty string
- `company`: required, non-empty string
- `startDate`: required, valid ISO 8601 date
- `endDate`: nullable (null = "Present"), valid ISO 8601 date or null
- `responsibilities`: required, array of 3–5 bullet points, each non-empty

### Projects
- `title`: required, non-empty string
- `description`: required, non-empty string
- `features`: required, array of 2–4 features, each non-empty

### Languages
- `language`: required, non-empty string
- `proficiency`: required, one of ["Beginner", "Intermediate", "Fluent", "Native"]

### Achievements
- Array of non-empty strings (max 10 items)

## Data Loading & Validation

**File**: `lib/resumeLoader.ts`

```typescript
import fs from 'fs';
import path from 'path';
import { Resume } from '@/types/resume';

export const resumeLoader = {
  getResume(): Resume {
    const resumePath = path.join(process.cwd(), 'data', 'resume.json');
    const data = fs.readFileSync(resumePath, 'utf-8');
    const resume = JSON.parse(data) as Resume;

    // Validate resume structure
    validateResume(resume);

    return resume;
  },

  /**
   * Utility: Get a specific field from resume
   * Safe access with fallback to empty string/array
   */
  getField<T>(fieldPath: string, defaultValue: T): T {
    // Implementation for nested field access
  },

  /**
   * Utility: Build chatbot context (for agent prompt)
   */
  buildChatbotContext(resume: Resume): string {
    return JSON.stringify(resume, null, 2);
  },
};

function validateResume(resume: Resume): void {
  // Validate each section
  if (!resume.personalInfo) throw new Error('Missing personalInfo');
  if (!resume.skills || resume.skills.length === 0) throw new Error('Missing skills');
  if (!resume.experience || resume.experience.length === 0) throw new Error('Missing experience');
  // ... additional validation
}
```

## Data Usage by Pages

| Page | Data Source | Key Fields | Validation |
|------|-------------|-----------|-----------|
| `/` (Home) | personalInfo, careerObjective | fullName, location, role | Non-empty strings |
| `/about` | careerObjective, personalInfo | careerObjective text | Non-empty string |
| `/skills` | skills[] | category, items[] | Non-empty arrays |
| `/education` | education[] | degree, institution, year | Valid dates, institutions |
| `/certifications` | certifications[] | title, issuer, year | Non-empty strings |
| `/experience` | experience[] | role, company, startDate, endDate, responsibilities[] | Date format, non-empty strings |
| `/projects` | projects[] | title, description, features[] | Non-empty strings, 2+ features |
| `/extras` | achievements[], languages[] | achievement strings, language, proficiency | Non-empty, valid proficiency |
| `/personal` | personalInfo | fullName, phone, email, address, dateOfBirth, location | Contact format, date format |
| `/chat` (Chatbot) | All resume fields | Entire resume object | Complete & valid |

## Data Immutability & Updates

- **Runtime**: resume.json is read-only during app execution (no mutations)
- **Updates**: To update resume data, edit `data/resume.json` and rebuild app
- **Chatbot Context**: Agent receives entire resume JSON; no partial slices
- **Client-Side**: Resume data is fetched at build-time and embedded in static pages (no dynamic loading)

## TypeScript Strict Mode Compliance

- All fields are explicitly typed (no `any`)
- Optional fields use `string | null` or `?` syntax
- Enums used for fixed values (e.g., language proficiency)
- Type guards used in component props
- Runtime validation in resumeLoader catches structural errors

## Privacy & Security Considerations

- **Phone & Email**: Displayed on `/personal` page only (controlled access)
- **Address**: Displayed on `/personal` page (safe for portfolio context)
- **Date of Birth**: Displayed on `/personal` page (only year can be inferred if needed)
- **Agent Prompt**: Entire resume sent to OpenAI Agent; ensure OPENAI_API_KEY has appropriate permissions
- **No Sensitive Data**: CNIC, bank accounts, or other PII excluded from resume.json

## Notes

- Resume data loads from `data/resume.json` at build-time
- All pages receive validated resume data
- Chatbot API route loads resume server-side before agent initialization
- No hardcoded values in components (all data from resume.json)
