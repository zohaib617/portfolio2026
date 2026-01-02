# Implementation Plan: AI-Driven Personal Portfolio Website + Resume-Grounded Chatbot

**Branch**: `001-portfolio-site` | **Date**: 2026-01-02 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/001-portfolio-site/spec.md`

## Summary

Build a professional Next.js portfolio website for Mohammad Zohaib Shah with 9 resume-grounded pages and an AI chatbot assistant. The portfolio is sourced entirely from a resume JSON file (single source of truth), ensuring all content matches resume data exactly. The OpenAI Agent SDK powers a chatbot that answers questions only from resume/portfolio data, with a fallback response for out-of-scope queries. The site is fully responsive, supports dark/light modes, and maintains strict TypeScript typing and clean architectural separation.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode), Node.js 18+
**Primary Dependencies**: Next.js 14 (App Router), React 18+, OpenAI Agent SDK, Tailwind CSS, Framer Motion
**Storage**: resume.json (local JSON file serving as authoritative data source)
**Testing**: Jest, React Testing Library, Playwright (for e2e chatbot flows)
**Target Platform**: Web browser (responsive across mobile 375px, tablet 768px, desktop 1024px+)
**Project Type**: Single Next.js application (frontend + API routes for chatbot)
**Performance Goals**: LCP <2.5s, FID <100ms, CLS <0.1; all pages load <3s on 3G
**Constraints**: No hardcoded resume content in components; no OpenAI calls in client code; strict TypeScript; Tailwind-only styling
**Scale/Scope**: 9 pages, 1 chatbot endpoint, ~10 reusable components, 1 resume JSON data model

## Constitution Check

**Gate: Must pass before Phase 0 research. Re-check after Phase 1 design.**

**Principles Compliance**:

✅ **I. AI-Driven Development (ADD)**: Specification ↔ Planning ↔ Tasks ↔ Implementation flow enforced. Planning document precedes code.

✅ **II. Resume Fidelity**: resume.json is single source of truth. All UI data derived directly from resume. No fabricated content. Strict data validation in resumeLoader.

✅ **III. Clean Architecture**:
- No OpenAI API calls in React components (chatbot logic isolated to `/api/chat` route)
- Business logic in services (resumeLoader, agentClient)
- UI components contain only presentation logic
- Data flows: resumeLoader → pages/components; user questions → API route → agent response → UI

✅ **IV. Type Safety (TypeScript Strict)**: All files are `.ts`/`.tsx` with strict mode. Type interfaces defined in `/types/resume.ts`. No `any` without justification.

✅ **V. Professional UI/UX**: Tailwind CSS (mobile-first), Framer Motion animations (subtle section reveals), dark/light mode support, responsive across all breakpoints.

✅ **VI. Resume-Grounded Chatbot**: OpenAI Agent SDK with persona "Zohaib Shah – AI Resume Assistant". Agent context is resume.json only. Fallback: "This information is not available in my portfolio."

**GATE PASSED**: Architecture aligns with all 6 principles. No violations.

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-site/
├── plan.md                       # This file (/sp.plan output)
├── spec.md                       # Feature requirements
├── data-model.md                 # Data entities & JSON schema
├── contracts/
│   ├── chat.openapi.yaml         # Chatbot API contract
│   └── resume.schema.json        # Resume JSON schema
├── quickstart.md                 # Local setup & dev instructions
└── checklists/
    └── requirements.md           # QA checklist
```

### Source Code (repository root)

```text
app/                              # Next.js App Router pages
├── layout.tsx                    # Global layout (Header, Footer, theme provider)
├── page.tsx                      # Home page (/)
├── about/page.tsx                # About page (/about)
├── personal/page.tsx             # Personal Info page (/personal)
├── skills/page.tsx               # Skills page (/skills)
├── education/page.tsx            # Education page (/education)
├── certifications/page.tsx       # Certifications page (/certifications)
├── experience/page.tsx           # Experience page (/experience)
├── projects/page.tsx             # Projects page (/projects)
├── extras/page.tsx               # Achievements & Languages (/extras)
├── chat/page.tsx                 # Chatbot UI page (/chat)
│
└── api/
    └── chat/
        └── route.ts              # POST /api/chat - OpenAI Agent endpoint

components/                       # Reusable React components
├── layout/
│   ├── Header.tsx                # Top navigation with theme toggle
│   ├── Footer.tsx                # Footer with links & copyright
│   └── Navigation.tsx            # Sidebar/Mobile menu
├── ui/
│   ├── Section.tsx               # Page section wrapper (with animations)
│   ├── Card.tsx                  # Generic card component
│   ├── Timeline.tsx              # Timeline for education/certifications
│   ├── Badge.tsx                 # Skill/language badge
│   └── Grid.tsx                  # Responsive grid layout
├── chat/
│   ├── ChatWindow.tsx            # Chat message list & scroll container
│   ├── ChatMessage.tsx           # Individual message (user/assistant)
│   └── ChatInput.tsx             # Message input & send button
└── common/
    └── ThemeProvider.tsx         # Dark/light mode context & provider

data/
└── resume.json                   # Canonical resume data (single source of truth)

agents/
└── resumeAgent.ts                # OpenAI Agent SDK configuration & system prompt

lib/
├── agentClient.ts                # Initialize OpenAI Agent (client-side for API route only)
├── resumeLoader.ts               # Load & validate resume.json (used by pages & API)
├── constants.ts                  # App constants (nav links, site metadata)
└── utils.ts                      # Utility functions (formatDate, categorizeSkills, etc.)

types/
└── resume.ts                     # TypeScript interfaces for resume data structure

styles/
├── globals.css                   # Tailwind base styles, theme variables
└── animations.css                # Framer Motion animation keyframes (optional)

public/
└── (static assets: favicons, images)

__tests__/
├── unit/
│   ├── resumeLoader.test.ts
│   └── utils.test.ts
├── integration/
│   └── chat-api.test.ts
└── e2e/
    └── portfolio.spec.ts         # Playwright: test full user journey

tests/
├── api.spec.ts                   # Playwright e2e tests

.env.example                      # Environment template (OPENAI_API_KEY placeholder)
.env.local                        # Local environment (git-ignored)

next.config.js                    # Next.js configuration
tsconfig.json                     # TypeScript strict mode config
tailwind.config.js                # Tailwind CSS setup
package.json                      # Dependencies
```

**Structure Decision**: Single Next.js project (no monorepo split). All portfolio pages and chatbot in one app. API route for chatbot ensures OpenAI calls stay server-side. resume.json is loaded both by pages (client-side via getStaticProps or build-time) and API route (server-side).

## Key Components & Data Flow

### 1. Resume JSON (Data Layer)

**File**: `data/resume.json`

```json
{
  "personalInfo": {
    "fullName": "Mohammad Zohaib Shah",
    "fatherName": "Mohammad Aslam Shah",
    "phone": "+92 319 8251617",
    "email": "zohaib92shah@gmail.com",
    "address": "Liaquatabad, Karachi, Pakistan",
    "dateOfBirth": "1994-04-25",
    "location": "Karachi, Pakistan"
  },
  "careerObjective": "Motivated and detail-oriented Web Developer seeking opportunities...",
  "skills": [
    {
      "category": "AI & Web Development",
      "items": ["AI-Driven Development", "Claude Code", "Spec-Kit Plus", "AI Agents"]
    },
    {
      "category": "Frontend",
      "items": ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS"]
    },
    {
      "category": "Backend & Databases",
      "items": ["Python", "SQL", "PL/SQL", "Oracle EBS XML Reports", "Oracle Fusion BI Publisher"]
    },
    {
      "category": "Soft Skills",
      "items": ["Communication", "Time Management"]
    }
  ],
  "education": [
    {
      "degree": "Bachelor of Commerce",
      "institution": "University of Karachi",
      "year": 2015
    },
    {
      "degree": "Intermediate (Commerce)",
      "institution": "Board of Intermediate Education, Karachi",
      "year": 2013
    },
    {
      "degree": "Matriculation (Science)",
      "institution": "Board of Secondary Education, Karachi",
      "year": 2011
    }
  ],
  "certifications": [
    {
      "title": "Certified AI, Metaverse & Web 3.0 Developer & Solopreneur",
      "issuer": "Governor Sindh IT Initiative, Karachi",
      "year": "2023–Present"
    },
    {
      "title": "Oracle Database 11g: SQL Fundamentals I",
      "issuer": "Orasoft Training Center",
      "year": 2016
    },
    {
      "title": "Oracle Database 11g: Program with PL/SQL",
      "issuer": "Orasoft Training Center",
      "year": 2016
    },
    {
      "title": "Oracle Forms 11g (Fusion Middleware)",
      "issuer": "Orasoft Training Center",
      "year": 2016
    },
    {
      "title": "Oracle Reports Developer 11g",
      "issuer": "Orasoft Training Center",
      "year": 2016
    },
    {
      "title": "Advanced Diploma in Information Technology (ADIT)",
      "issuer": "Noor College, Karachi",
      "year": 2013
    }
  ],
  "experience": [
    {
      "role": "Trainee Oracle Developer",
      "company": "Qitech Pvt Ltd",
      "startDate": "2025-05-01",
      "endDate": null,
      "responsibilities": [
        "Created XML Data Templates",
        "Integrated reports with Oracle BI Publisher",
        "Generated Excel and Word reports",
        "Worked on data extraction, transformation, and visualization",
        "Improved reporting accuracy and automation"
      ]
    }
  ],
  "projects": [
    {
      "title": "Gym Management System",
      "description": "Member registration, fee tracking, and attendance management",
      "features": ["Member registration", "Fee tracking", "Attendance management"]
    },
    {
      "title": "Billing System",
      "description": "Automated product billing and receipt generation for small businesses",
      "features": ["Automated product billing", "Receipt generation"]
    },
    {
      "title": "Instalment Payment Application",
      "description": "Customer instalment management with due-date tracking and payment alerts",
      "features": ["Customer instalment management", "Due-date tracking", "Payment alerts"]
    }
  ],
  "achievements": [
    "Completed Next.js Hackathon Project (3rd Hackathon)",
    "Continuous learner in AI and Web Development"
  ],
  "languages": [
    {
      "language": "English",
      "proficiency": "Intermediate"
    },
    {
      "language": "Urdu",
      "proficiency": "Fluent"
    },
    {
      "language": "Sindhi",
      "proficiency": "Fluent"
    }
  ]
}
```

### 2. Page Components (UI Layer)

Each page (`app/*/page.tsx`) follows this pattern:

```typescript
import { resumeLoader } from '@/lib/resumeLoader';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';

export default function PageName() {
  const resume = resumeLoader.getResume();

  return (
    <Section title="Page Title">
      {/* Render resume data using reusable components */}
      {resume.data.map((item) => (
        <Card key={item.id}>{/* Item content */}</Card>
      ))}
    </Section>
  );
}
```

**Key Rules**:
- No hardcoded content
- Data flows from resume.json via resumeLoader
- Presentation logic only (no business logic)
- Components are fully responsive (Tailwind)
- Framer Motion animations for smooth section reveals

### 3. Chatbot API Route (API Layer)

**File**: `app/api/chat/route.ts`

```typescript
import { OpenAI } from 'openai';
import { resumeLoader } from '@/lib/resumeLoader';
import { initializeResumeAgent } from '@/agents/resumeAgent';

export async function POST(req: Request) {
  const { message } = await req.json();

  // Get resume context
  const resume = resumeLoader.getResume();

  // Initialize agent with resume context
  const agent = initializeResumeAgent(resume);

  // Call agent with user message
  const response = await agent.chat(message);

  return Response.json({ response });
}
```

**Key Rules**:
- OpenAI API calls only in API route (server-side)
- Resume context loaded server-side and passed to agent
- Agent response validated before returning to client
- Fallback response for out-of-scope queries

### 4. OpenAI Agent Configuration (Agent Layer)

**File**: `agents/resumeAgent.ts`

```typescript
import { createAgent } from 'openai/agents';

export function initializeResumeAgent(resume: Resume) {
  const systemPrompt = `
    You are "Zohaib Shah – AI Resume Assistant".
    Answer questions ONLY using the provided resume data.
    For out-of-scope questions, respond: "This information is not available in my portfolio."

    Resume Data:
    ${JSON.stringify(resume)}
  `;

  return createAgent({
    name: 'ResumeAssistant',
    systemPrompt,
    model: 'gpt-4',
  });
}
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  resume.json (Single Source of Truth)                       │
└──────────────┬──────────────────────────────────┬────────────┘
               │                                  │
         ┌─────▼─────┐                    ┌───────▼──────┐
         │ Pages (/*, GET)                │ API (/api/chat/, POST)
         │ ├─ Home                        │ ├─ Load resume context
         │ ├─ About                       │ ├─ Initialize agent
         │ ├─ Skills                      │ ├─ Call LLM
         │ ├─ Education                   │ └─ Return response
         │ ├─ Certifications              └────────────────┘
         │ ├─ Experience                        │
         │ ├─ Projects                         │
         │ ├─ Extras                    ┌──────▼──────────┐
         │ └─ Personal                  │ Chat Component
         │                              │ ├─ Send message
         │ Uses:                        │ ├─ Display response
         │ ├─ resumeLoader              │ └─ Theme toggle
         │ ├─ UI components             └─────────────────┘
         │ └─ Framer Motion
         │
         └──────────────────────────────────────┐
                                                │
                                    ┌───────────▼────────────┐
                                    │ Dark/Light Theme       │
                                    │ (Context + localStorage)
                                    └────────────────────────┘
```

## Complexity Tracking

No Constitution Check violations. All principles aligned.

## Complexity Decisions Justifying Additional Layers

| Decision | Why Needed | Simpler Alternative Rejected |
|----------|-----------|-------------------------------|
| Separate `/api/chat` route | Server-side OpenAI calls required for API key security | Direct client-side OpenAI calls expose API key |
| resume.json as data file | Single source of truth for recruiter-facing content | Hardcoded content in components breaks DRY, causes drift |
| Reusable UI components (Section, Card, Timeline, Badge) | Portfolio has 9 similar pages requiring consistent styling | Duplicate styling in each page file leads to maintenance burden |
| Type interfaces in `/types/resume.ts` | Strict TypeScript typing across pages and API | Missing types cause bugs when resume structure changes |
| Separate agent configuration file | OpenAI agent logic isolated and testable | Agent logic scattered across API route reduces maintainability |

## Implementation Dependencies

**Critical Path**:
1. Define resume.json schema and populate data
2. Create TypeScript interfaces (`types/resume.ts`)
3. Build resumeLoader utility
4. Implement layout & navigation components
5. Build 9 portfolio pages (can be parallel)
6. Implement chatbot API route & chatbot component
7. E2E testing (verify data accuracy, chatbot responses)

**Parallel Opportunities**:
- All 9 portfolio pages can be built in parallel after resumeLoader is ready
- Chatbot API route and UI can be developed independently
- Styling (Tailwind) and animations (Framer Motion) can be added incrementally

## Checklist for Success

- [ ] resume.json populated with all data from provided resume
- [ ] TypeScript interfaces accurately model resume structure
- [ ] All 9 pages load resume data correctly (no hardcoded content)
- [ ] Dark/light mode toggle persists across navigation
- [ ] Responsive design tested on mobile (375px), tablet (768px), desktop (1024px+)
- [ ] Chatbot API endpoint validates user messages and returns resume-grounded responses
- [ ] Chatbot rejects out-of-scope queries with standard message
- [ ] No TypeScript errors in strict mode
- [ ] All pages load <3s on 3G
- [ ] Accessibility: keyboard navigation, ARIA labels, semantic HTML

---

**Ready for Task Generation**: Architecture is clear, data flow is documented, and implementation dependencies are mapped. Next phase: `/sp.tasks` to generate concrete, testable implementation tasks.
