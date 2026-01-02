# Feature Specification: AI-Driven Personal Portfolio Website + Resume-Grounded Chatbot

**Feature Branch**: `001-portfolio-site`
**Created**: 2026-01-02
**Status**: In Progress
**Input**: Mohammad Zohaib Shah's resume with 9 portfolio pages and resume-grounded AI chatbot

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Recruiter Discovers Developer Profile (Priority: P1)

A recruiter visits the portfolio to evaluate Mohammad Zohaib Shah as a candidate for a web development position. They should quickly understand his professional focus, core skills, and relevant experience.

**Why this priority**: This is the primary user journey. Recruiters need immediate clarity on professional identity and qualifications. Without this, the portfolio fails its core purpose.

**Independent Test**: Can be fully tested by navigating the home page, about section, and skills page—should take <2 minutes to form an opinion on candidacy.

**Acceptance Scenarios**:

1. **Given** a recruiter visits the home page, **When** they load `/`, **Then** they see: name, location, professional role ("AI-Driven Web Developer"), and a compelling summary
2. **Given** a recruiter is on the about page, **When** they view `/about`, **Then** they read the career objective and professional summary
3. **Given** a recruiter is evaluating skills, **When** they visit `/skills`, **Then** they see categorized technical skills (AI-Driven Development, Web technologies, databases, tools) and soft skills

---

### User Story 2 - Recruiter Reviews Experience & Education (Priority: P1)

A recruiter needs to verify work experience, education, and certifications to assess technical depth and formal qualifications.

**Why this priority**: Recruiters verify credentials early in evaluation. This story completes the core evaluation workflow.

**Independent Test**: Can be fully tested by visiting experience, education, and certifications pages—should show all resume data accurately.

**Acceptance Scenarios**:

1. **Given** a recruiter views `/experience`, **When** they load the page, **Then** they see: Qitech Pvt Ltd role (Trainee Oracle Developer), May 2025–Present, and all 5 responsibility bullet points
2. **Given** a recruiter views `/education`, **When** they load the page, **Then** they see all 3 education entries with institution names and completion years (B.Com 2015, Intermediate 2013, Matriculation 2011)
3. **Given** a recruiter views `/certifications`, **When** they load the page, **Then** they see all 5 certifications with issuing body and year (AI/Metaverse/Web3 2023–Present, Oracle certs 2016, ADIT 2013)

---

### User Story 3 - Recruiter Learns About Projects & Achievements (Priority: P1)

A recruiter wants to see portfolio projects to understand what Zohaib has built and his technical capabilities in practice.

**Why this priority**: Projects demonstrate real-world capability. Recruiters use this to assess hands-on experience beyond certifications.

**Independent Test**: Can be fully tested by visiting the projects page and achievements section—all projects and achievements display with descriptions.

**Acceptance Scenarios**:

1. **Given** a recruiter views `/projects`, **When** they load the page, **Then** they see 3 project cards: Gym Management System, Billing System, Instalment Payment Application—each with features listed
2. **Given** a recruiter views `/extras`, **When** they load the page, **Then** they see achievements (Next.js Hackathon completion, continuous learner status) and languages (English, Urdu, Sindhi with proficiency levels)

---

### User Story 4 - Recruiter or Contact Initiates Conversation with AI Assistant (Priority: P2)

A recruiter or interested party wants to ask questions about Zohaib's skills, experience, or background without needing to read every page. They use the chatbot to get quick answers.

**Why this priority**: Chatbot improves accessibility and engagement. Recruiters appreciate self-service answers to common questions.

**Independent Test**: Can be fully tested by visiting `/chat`, asking 3 questions (e.g., "What skills do you have?", "Tell me about your experience", "What projects have you built?"), and verifying responses come from resume data.

**Acceptance Scenarios**:

1. **Given** a user is on the chatbot page, **When** they ask "What are your main skills?", **Then** the chatbot responds with skill categories from resume data
2. **Given** a user asks about a project, **When** they ask "Describe the Gym Management System", **Then** the chatbot responds with project features
3. **Given** a user asks out-of-scope question, **When** they ask "What's your favorite color?", **Then** the chatbot responds: "This information is not available in my portfolio."

---

### User Story 5 - Visitor Browses on Mobile Device (Priority: P2)

A recruiter may access the portfolio from a phone or tablet. The site must work seamlessly on all screen sizes.

**Why this priority**: Mobile traffic is significant; recruiters often browse on-the-go. Without mobile support, significant audience is lost.

**Independent Test**: Can be fully tested by viewing all pages on mobile viewport (375px, 768px, 1024px+)—layout adapts, text is readable, navigation is accessible.

**Acceptance Scenarios**:

1. **Given** a user views the portfolio on a mobile device (375px width), **When** they load any page, **Then** content stacks vertically, text is readable (≥16px), and no horizontal scroll is required
2. **Given** a user is on mobile, **When** they navigate between pages, **Then** navigation is accessible (either hamburger menu or vertical nav) and easy to use with touch

---

### Edge Cases

- What happens when a recruiter visits a page that doesn't exist? → 404 page with navigation back to home
- What happens if the chatbot receives an ambiguous question? → Chatbot asks for clarification but only answers from resume data
- What happens if JavaScript is disabled in the browser? → Core content (pages, text) still loads; chatbot may degrade gracefully
- What happens on very large screens (4K monitors)? → Layout remains readable with max-width constraints

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render a home page (`/`) displaying name, location, and professional role with a professional hero section
- **FR-002**: System MUST render an about page (`/about`) displaying the career objective from resume
- **FR-003**: System MUST render a skills page (`/skills`) displaying all skills from resume, organized by category (AI/Web Dev, Frontend, Backend, Tools/Databases)
- **FR-004**: System MUST render an education page (`/education`) displaying all 3 education entries with institution, degree/level, and year
- **FR-005**: System MUST render a certifications page (`/certifications`) displaying all 5 certifications with issuing body and year
- **FR-006**: System MUST render an experience page (`/experience`) displaying the Trainee Oracle Developer role with company (Qitech Pvt Ltd), duration (May 2025–Present), and all 5 responsibilities
- **FR-007**: System MUST render a projects page (`/projects`) displaying all 3 projects (Gym Management, Billing System, Instalment Payment App) with features/descriptions
- **FR-008**: System MUST render an extras page (`/extras`) displaying achievements and languages with proficiency levels
- **FR-009**: System MUST render a personal info page (`/personal`) displaying name, contact details (phone, email), address, and date of birth
- **FR-010**: System MUST provide a chatbot page (`/chat`) with an AI Resume Assistant interface built on OpenAI Agent SDK
- **FR-011**: Chatbot MUST answer questions grounded only in resume/portfolio data; for out-of-scope queries, respond: "This information is not available in my portfolio."
- **FR-012**: System MUST be fully responsive (mobile-first design) across all viewport sizes (mobile 375px, tablet 768px, desktop 1024px+)
- **FR-013**: System MUST support dark mode and light mode with seamless theme switching
- **FR-014**: All data MUST be sourced from a structured resume JSON file (single source of truth); no hardcoded values in components
- **FR-015**: System MUST include a navigation menu accessible from all pages with links to home, about, skills, education, certifications, experience, projects, extras, chat, and contact

### Key Entities

- **Resume (JSON)**: Authoritative data source containing all personal info, skills, education, certifications, experience, projects, achievements, and languages
  - Structure: `{ personalInfo, careerObjective, skills, education, certifications, experience, projects, achievements, languages }`
- **Page Components**: Each portfolio page corresponds to a Next.js route rendering data from the Resume JSON
- **ChatbotAgent**: OpenAI Agent SDK instance initialized with resume data as the knowledge base
- **UIComponents**: Reusable React components (cards, timeline, grid, nav) styled with Tailwind CSS

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 9 portfolio pages build without errors and deploy successfully
- **SC-002**: 100% of resume data (name, contact, skills, education, certifications, experience, projects, achievements, languages) is visible on the portfolio
- **SC-003**: Recruiter can navigate between all pages and complete a full portfolio review in under 5 minutes
- **SC-004**: Chatbot responds to 95% of resume-related questions with accurate, resume-grounded answers
- **SC-005**: Portfolio is fully responsive: all pages render correctly on mobile (375px), tablet (768px), and desktop (1024px+) viewports
- **SC-006**: Dark mode and light mode toggle works seamlessly with theme persistence across page navigation
- **SC-007**: All pages load in under 3 seconds on standard internet connection (3G simulated)
- **SC-008**: TypeScript strict mode compliance: zero `any` types (unless justified), zero type errors
- **SC-009**: No hardcoded resume content in component files; all data flows from resume JSON
- **SC-010**: Chatbot correctly rejects out-of-scope questions with the standard message 100% of the time

## Assumptions

- Resume data structure will be defined before implementation (JSON schema provided)
- OpenAI API key will be configured in environment variables, not hardcoded
- "Professional UI/UX" defaults to modern dark/light theme with subtle Framer Motion animations unless specified otherwise
- Mobile-first responsive design uses Tailwind CSS breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Chatbot knowledge boundary is strict: only resume and portfolio content; no inference or external knowledge
- Navigation structure is top-level (home, about, skills, etc.) with optional secondary nav for related content
- Contact details on personal info page exclude sensitive numbers; phone and email are display-ready
- Performance targets: LCP (Largest Contentful Paint) <2.5s, FID (First Input Delay) <100ms, CLS (Cumulative Layout Shift) <0.1

---

**Ready for Planning**: All functional requirements are testable, success criteria are measurable, and data integrity rules are clear. Next phase: `/sp.plan` to design architecture and file structure.
