---
description: "Task list for AI-Driven Personal Portfolio Website + Resume-Grounded Chatbot feature implementation"
---

# Tasks: AI-Driven Personal Portfolio Website + Resume-Grounded Chatbot

**Input**: Design documents from `/specs/001-portfolio-site/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), data-model.md

**Tests**: E2E tests included to verify data accuracy and chatbot responses

**Organization**: Tasks grouped by implementation phase to enable independent development and testing of each component

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US5)
- Include exact file paths in descriptions

## Path Conventions

- Single project: `src/`, `tests/` at repository root, `app/` for Next.js App Router
- Paths shown below use Next.js 14 App Router structure
- All TypeScript files use `.ts`/`.tsx` with strict mode

---

## Phase 1: Project Setup & Configuration

**Purpose**: Initialize Next.js 14 project with all required dependencies and tooling

- [ ] T001 Initialize Next.js 14 project with App Router, TypeScript, and ESLint (`npm create next-app@latest`)
- [ ] T002 [P] Install additional dependencies: Tailwind CSS, Framer Motion, OpenAI SDK, dotenv (`npm install tailwindcss framer-motion openai dotenv`)
- [ ] T003 [P] Configure Tailwind CSS in `tailwind.config.js` with dark mode support, responsive breakpoints (sm, md, lg, xl), and custom theme colors
- [ ] T004 [P] Create global styles in `styles/globals.css` with Tailwind base setup, typography defaults, and theme variables
- [ ] T005 Create `.env.example` template with `OPENAI_API_KEY` placeholder
- [ ] T006 Create `.env.local` (git-ignored) and populate with test OpenAI API key

**Checkpoint**: Project runs with `npm run dev`; no build errors

---

## Phase 2: Data Layer & Type Definitions

**Purpose**: Establish resume JSON as single source of truth with strict TypeScript validation

- [ ] T007 Create `data/resume.json` populated with Mohammad Zohaib Shah's complete resume data matching spec.md requirements:
  - personalInfo (name, contact, location, DOB)
  - careerObjective (text)
  - skills[] (categories: AI/Web Dev, Frontend, Backend, Soft Skills)
  - education[] (3 entries with institution, degree, year)
  - certifications[] (5 entries with issuer, year)
  - experience[] (1 entry: Trainee Oracle Developer with 5 responsibilities)
  - projects[] (3 projects: Gym, Billing, Instalment with features)
  - achievements[] (2+ items)
  - languages[] (3 languages with proficiency)
- [ ] T008 Define TypeScript interfaces in `types/resume.ts` covering:
  - PersonalInfo, SkillCategory, Education, Certification, Experience, Project, Language, Resume
  - All fields properly typed (no `any`)
  - Optional fields use `| null` syntax
  - Enums for fixed values (proficiency levels)
- [ ] T009 Implement `lib/resumeLoader.ts` to:
  - Load resume.json at build-time
  - Validate resume structure (all required sections present)
  - Export getResume() function returning typed Resume object
  - Include error handling with descriptive messages

**Checkpoint**: TypeScript strict mode passes; `resumeLoader.getResume()` returns validated resume

---

## Phase 3: Global Layout & Shared Components

**Purpose**: Build reusable layout and UI components for all pages

- [ ] T010 [P] Create `app/layout.tsx` (global root layout) with:
  - HTML/body structure
  - Tailwind CSS provider
  - Theme provider (dark/light mode support)
  - No business logic (pure layout)
- [ ] T011 [P] Implement `components/layout/Header.tsx`:
  - Logo/site name (left)
  - Navigation links (home, about, skills, education, certifications, experience, projects, extras, chat)
  - Dark/light mode toggle button (right)
  - Mobile hamburger menu (responsive)
  - Sticky positioning
- [ ] T012 [P] Implement `components/layout/Footer.tsx`:
  - Copyright and site metadata
  - Optional: social links or contact CTA
  - Full-width, dark background
- [ ] T013 [P] Implement `components/layout/Navigation.tsx`:
  - Sidebar or mobile dropdown menu
  - Links to all pages
  - Highlights current page (active state)
  - Closes on route change
- [ ] T014 [P] Create `components/common/ThemeProvider.tsx`:
  - Context for dark/light mode
  - Persists theme preference to localStorage
  - Applies class to document root
- [ ] T015 [P] Implement `components/ui/Section.tsx`:
  - Wrapper for page sections
  - Props: title, children, id
  - Tailwind styling (padding, max-width, responsive)
  - Optional: Framer Motion animation trigger
- [ ] T016 [P] Implement `components/ui/Card.tsx`:
  - Reusable card component
  - Props: title, description, children
  - Tailwind styling (border, shadow, hover)
  - Dark mode support
- [ ] T017 [P] Implement `components/ui/Timeline.tsx`:
  - Display education/experience chronologically
  - Props: items[], formatDate function
  - Vertical line connecting items
  - Year/date badges on left
- [ ] T018 [P] Implement `components/ui/Badge.tsx`:
  - Display skills, certifications, language proficiency
  - Props: label, variant (skill, cert, language)
  - Tailwind styling with category-based colors
  - Responsive grid layout
- [ ] T019 [P] Implement `components/ui/Grid.tsx`:
  - Responsive grid wrapper for projects/skills
  - Props: columns (mobile, tablet, desktop), children
  - Tailwind grid classes (sm, md, lg)
- [ ] T020 Create `lib/constants.ts`:
  - Navigation menu items (label, href)
  - App metadata (title, description)
  - Color theme mapping

**Checkpoint**: All components render without errors; dark/light mode toggle works; responsive on mobile (375px) and desktop (1024px)

---

## Phase 4: Portfolio Pages (User Story 1 – Core Portfolio)

**Purpose**: Implement 9 resume-grounded portfolio pages

### Home Page (US1)

- [ ] T021 [US1] Implement `app/page.tsx`:
  - Hero section: name, role ("AI-Driven Web Developer"), location from resume.json
  - Brief professional summary (max 2 sentences)
  - Call-to-action button (link to about or skills)
  - Full-viewport height on desktop, responsive mobile
  - Use Section and Card components
  - Import data: `const resume = resumeLoader.getResume();`

### About Page (US1)

- [ ] T022 [US1] Implement `app/about/page.tsx`:
  - Display careerObjective from resume.json
  - Professional summary paragraph
  - Responsive text layout
  - Use Section component

### Personal Info Page (US1 implicit)

- [ ] T023 [US1] Implement `app/personal/page.tsx`:
  - Display personalInfo fields from resume.json:
    - Full Name, Father's Name
    - Phone, Email (contact-ready format)
    - Address, Location
    - Date of Birth (formatted: 25 April 1994)
  - Clean, readable layout (2-column on desktop, 1-column mobile)
  - Use Card component for each field group

### Skills Page (US1)

- [ ] T024 [US1] Implement `app/skills/page.tsx`:
  - Display skills[] from resume.json organized by category
  - 4 skill categories: AI & Web Development, Frontend, Backend, Soft Skills
  - Render skills as badges (Badge component)
  - Responsive grid: 2 columns mobile, 3+ desktop
  - Use Section wrapper

### Education Page (US2)

- [ ] T025 [US2] Implement `app/education/page.tsx`:
  - Display education[] timeline from resume.json
  - 3 entries: B.Com (2015), Intermediate (2013), Matriculation (2011)
  - Use Timeline component with institution, degree, year
  - Responsive layout
  - Use Section wrapper

### Certifications Page (US2)

- [ ] T026 [US2] Implement `app/certifications/page.tsx`:
  - Display certifications[] from resume.json
  - 5 certifications with issuer and year/date range
  - List or card layout
  - Group by category if applicable (Oracle, AI/Web3, ADIT)
  - Use Badge component for categories
  - Use Section wrapper

### Experience Page (US2)

- [ ] T027 [US2] Implement `app/experience/page.tsx`:
  - Display experience[] from resume.json
  - Trainee Oracle Developer role (Qitech Pvt Ltd, May 2025–Present)
  - Display all 5 responsibilities as bullet points
  - Company, role, date range formatting
  - Use Card component for role details
  - Use Section wrapper

### Projects Page (US3)

- [ ] T028 [US3] Implement `app/projects/page.tsx`:
  - Display projects[] from resume.json
  - 3 project cards: Gym Management System, Billing System, Instalment Payment App
  - Each card shows: title, description, features list
  - Responsive grid (1 column mobile, 2–3 desktop)
  - Use Card and Grid components
  - Use Section wrapper

### Achievements & Languages Page (US3)

- [ ] T029 [US3] Implement `app/extras/page.tsx`:
  - Display achievements[] from resume.json (2+ items)
  - Display languages[] with proficiency levels
  - Achievements: bulleted list
  - Languages: badges with proficiency (Beginner, Intermediate, Fluent, Native)
  - Responsive layout
  - Use Badge component for languages
  - Use Section wrapper

**Checkpoint**: All 9 pages load without errors; resume.json data visible on each page; no hardcoded content in components; responsive on mobile (375px) and desktop (1024px); dark/light mode works

---

## Phase 5: Chatbot Infrastructure (User Story 4)

**Purpose**: Implement OpenAI Agent SDK with resume-grounded context

- [ ] T030 [US4] [P] Create `agents/resumeAgent.ts`:
  - Define agent with persona: "Zohaib Shah – AI Resume Assistant"
  - System prompt:
    ```
    You are "Zohaib Shah – AI Resume Assistant".
    Answer questions ONLY using the provided resume data.
    For out-of-scope questions, respond: "This information is not available in my portfolio."
    Be professional, concise, and conversational.
    ```
  - Export initializeResumeAgent(resume: Resume) function
  - Return configured agent with resume context embedded
  - No external knowledge or assumptions
- [ ] T031 [US4] [P] Implement `lib/agentClient.ts`:
  - Export function to initialize OpenAI client (server-side only)
  - Use OPENAI_API_KEY from environment
  - Return client configured for Agent SDK
  - Handle API key validation with error messages
- [ ] T032 [US4] Implement `app/api/chat/route.ts` (POST endpoint):
  - Accept JSON body: `{ message: string }`
  - Validate message (non-empty, max 1000 chars)
  - Load resume context: `const resume = resumeLoader.getResume();`
  - Initialize agent: `const agent = initializeResumeAgent(resume);`
  - Call agent with user message
  - Return response: `{ response: string, timestamp: ISO8601, groundedInResume: boolean }`
  - Error handling: return `{ error, code, timestamp }` with appropriate HTTP status
  - Implement 30-second request timeout, 10-second agent timeout

**Checkpoint**: API endpoint accepts POST requests; returns valid JSON responses; chatbot context includes full resume data; no errors in strict mode

---

## Phase 6: Chatbot UI (User Story 4)

**Purpose**: Build responsive chat interface

- [ ] T033 [US4] [P] Implement `components/chat/ChatWindow.tsx`:
  - Scrollable message container
  - Props: messages[], isLoading
  - Auto-scroll to latest message
  - Responsive height (full viewport minus input)
  - Use Card component for message layout
- [ ] T034 [US4] [P] Implement `components/chat/ChatMessage.tsx`:
  - Display single message
  - Props: message, sender (user/assistant), timestamp
  - Different styling for user vs assistant messages
  - Dark mode support
  - Responsive text wrapping
- [ ] T035 [US4] [P] Implement `components/chat/ChatInput.tsx`:
  - Text input field
  - Send button
  - Props: onSend, disabled, placeholder
  - Enter key submits message
  - Responsive layout (full-width mobile, constrained desktop)
- [ ] T036 [US4] Implement `app/chat/page.tsx`:
  - Integrate ChatWindow, ChatMessage, ChatInput components
  - Manage conversation state (messages[])
  - Handle sending message to `/api/chat`
  - Handle loading and error states
  - Display typing indicator while awaiting response
  - Initial greeting message
  - Responsive layout: full-height on all screens
  - Use Section wrapper for page structure

**Checkpoint**: Chat UI loads without errors; can send message and receive response; loading states display correctly; responsive on all viewports; dark/light mode works

---

## Phase 7: Animations & Polish (User Story 5)

**Purpose**: Add professional animations and ensure full responsiveness

- [ ] T037 [P] Add Framer Motion animations to Section component:
  - Fade-in on page load
  - Slide-up transition for sections
  - Subtle hover effects on cards
  - No excessive motion (accessibility)
  - Test on reduced-motion preference
- [ ] T038 [P] Ensure full responsiveness:
  - Test mobile viewport (375px): iPhone SE
  - Test tablet viewport (768px): iPad
  - Test desktop viewport (1024px, 1280px+): Standard desktop
  - No horizontal scroll on any device
  - Touch-friendly: buttons ≥44px, spacing ≥16px
  - Font sizes readable: ≥16px body, ≥14px small
- [ ] T039 [P] Optimize dark/light mode:
  - All text readable in both modes (sufficient contrast)
  - Images/icons adapt to theme
  - Theme toggle smooth transition
  - Persistence across page navigation

**Checkpoint**: All pages render smoothly with animations; no layout shifts; fully responsive on mobile, tablet, desktop; theme toggle seamless

---

## Phase 8: Validation & Testing (Acceptance)

**Purpose**: Verify data accuracy, chatbot behavior, and quality standards

### Data Integrity Tests

- [ ] T040 [US1–US3] Verify all resume.json data visible on portfolio:
  - [ ] Home: name, role, location visible
  - [ ] About: careerObjective displayed
  - [ ] Skills: all 4 categories visible with all skills
  - [ ] Education: 3 entries with years correct (2015, 2013, 2011)
  - [ ] Certifications: 5 certs with issuer and year/range
  - [ ] Experience: Trainee Oracle Developer + 5 responsibilities
  - [ ] Projects: 3 projects with features
  - [ ] Extras: achievements + 3 languages with proficiency
  - [ ] Personal: name, phone, email, address, DOB formatted correctly
- [ ] T041 Validate no hardcoded content:
  - Grep all page files for hardcoded text (should be none)
  - Verify all data flows from resume.json via resumeLoader
  - No duplicate data in components
- [ ] T042 [US4] Test chatbot behavior:
  - [ ] Question: "What are your main skills?" → Returns skill categories from resume
  - [ ] Question: "Tell me about your experience" → Returns Trainee Oracle Developer role + responsibilities
  - [ ] Question: "What projects have you built?" → Returns 3 projects with descriptions
  - [ ] Question: "Do you speak Urdu?" → Returns "Yes, fluent" from languages
  - [ ] Out-of-scope: "What's your favorite color?" → Returns "This information is not available in my portfolio."
  - [ ] Out-of-scope: "Write me code" → Returns standard out-of-scope message
  - [ ] Ambiguous: "Tell me about Gym" → Clarifies or returns Gym Management System details
- [ ] T043 Test error handling:
  - [ ] Empty message → Returns 400 error
  - [ ] Message > 1000 chars → Returns 400 error
  - [ ] Invalid JSON → Returns 400 error
  - [ ] API timeout → Returns 503 with timeout message
  - [ ] Missing OPENAI_API_KEY → Returns clear error message

### Type Safety & Build

- [ ] T044 Run TypeScript strict mode check:
  - `npx tsc --noEmit` passes with zero errors
  - No `any` types in codebase
  - All component props properly typed
  - All function returns typed
- [ ] T045 Run ESLint:
  - `npm run lint` passes with zero warnings
  - Follow Next.js ESLint rules
  - No unused imports
- [ ] T046 Run production build:
  - `npm run build` completes without errors or warnings
  - All pages pre-rendered or static
  - No console errors during build
  - Build size reasonable (<5MB)

### Performance

- [ ] T047 Test page load performance:
  - All pages load <3 seconds on 3G throttle (DevTools)
  - Largest Contentful Paint (LCP) < 2.5s
  - First Input Delay (FID) < 100ms
  - Cumulative Layout Shift (CLS) < 0.1
- [ ] T048 Test on browsers:
  - Chrome/Edge (latest)
  - Firefox (latest)
  - Safari (latest)
  - Mobile Safari (iOS 15+)
  - Chrome Mobile (Android)

### E2E Tests

- [ ] T049 [P] Write E2E test: Home page loads with hero section
  ```
  File: __tests__/e2e/home.spec.ts
  - Navigate to /
  - Verify name visible
  - Verify role "AI-Driven Web Developer" visible
  - Verify location visible
  ```
- [ ] T050 [P] Write E2E test: Skills page displays all categories
  ```
  File: __tests__/e2e/skills.spec.ts
  - Navigate to /skills
  - Verify 4 skill categories present
  - Verify all skills from resume.json rendered
  ```
- [ ] T051 [P] Write E2E test: Education page timeline correct
  ```
  File: __tests__/e2e/education.spec.ts
  - Navigate to /education
  - Verify 3 education entries
  - Verify years: 2015, 2013, 2011
  ```
- [ ] T052 Write E2E test: Chat sends/receives message
  ```
  File: __tests__/e2e/chat.spec.ts
  - Navigate to /chat
  - Type "What are your skills?"
  - Send message
  - Wait for response
  - Verify response contains skill data
  - Verify timestamp
  ```
- [ ] T053 Write E2E test: Chat rejects out-of-scope query
  ```
  File: __tests__/e2e/chat-oob.spec.ts
  - Navigate to /chat
  - Type "What's your favorite color?"
  - Send message
  - Verify response: "This information is not available in my portfolio."
  ```

**Checkpoint**: All acceptance tests pass; production build successful; no TypeScript or ESLint errors; chatbot behavior verified; responsiveness tested across all viewports and browsers

---

## Phase 9: Documentation & Deployment Ready

**Purpose**: Finalize documentation and prepare for production

- [ ] T054 Update README.md:
  - Project description
  - Stack overview
  - Setup instructions (copy from quickstart.md)
  - Local development guide
  - Deployment instructions
  - Links to `/specs/001-portfolio-site/` documents
- [ ] T055 Create DEPLOYMENT.md:
  - Vercel deployment step-by-step
  - Environment variables required
  - Custom domain setup (optional)
  - CI/CD pipeline (GitHub Actions example)
- [ ] T056 Verify .env.example is complete:
  - OPENAI_API_KEY placeholder
  - Any other required variables
  - Document each variable purpose
- [ ] T057 Final code review:
  - All code follows TypeScript strict mode
  - All components have proper prop types
  - No console.log or debug code
  - Comments added where logic isn't self-evident
  - No hardcoded values (all from resume.json or constants.ts)

**Checkpoint**: Documentation complete; code ready for production deployment; all requirements met

---

## Phase 10: Final Validation & Delivery

**Purpose**: Comprehensive feature acceptance

- [ ] T058 Create acceptance test checklist:
  - All 9 pages render correctly
  - Resume data 100% visible (no missing information)
  - Chatbot responds to resume questions
  - Chatbot rejects out-of-scope queries
  - Dark/light mode works
  - Responsive across mobile, tablet, desktop
  - No TypeScript errors
  - No hardcoded content
  - Performance targets met (<3s load)
- [ ] T059 Run full feature walkthrough:
  - Follow recruiter journey: home → about → skills → experience → certifications → projects
  - Test chatbot with 5+ questions
  - Test dark/light mode on each page
  - Test on mobile device (physical or emulator)
  - Verify accessibility: keyboard navigation, ARIA labels
- [ ] T060 Create deployment PR:
  - Feature branch: 001-portfolio-site
  - All commits reference spec/plan/tasks
  - Commit messages follow convention
  - Ready for merge to main/master

**Checkpoint**: Feature complete and ready for production

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Data Layer (Phase 2)**: Depends on Setup - BLOCKS all other phases
- **Global Layout (Phase 3)**: Depends on Data Layer completion
- **Portfolio Pages (Phase 4)**: Depends on Global Layout + Data Layer completion
- **Chatbot (Phase 5–6)**: Depends on Data Layer + Global Layout completion (can parallel with pages)
- **Polish (Phase 7)**: Depends on all pages complete
- **Testing & Validation (Phase 8)**: Depends on all components complete
- **Documentation (Phase 9)**: Can start after Phase 7
- **Final Validation (Phase 10)**: Depends on all phases complete

### Parallel Opportunities

**Phase 1**: All tasks marked [P] can run in parallel

**Phase 3**: All component tasks [T011–T019] marked [P] can run in parallel after T010 (layout) completes

**Phase 4**: All 9 page tasks [T021–T029] can run in parallel after Phase 3 completes (each page is independent)

**Phase 5–6**: Chatbot tasks [T030–T036] can run in parallel with Phase 4 pages (different files)

**Phase 7**: Animation and responsiveness tasks marked [P] can run in parallel

**Phase 8**: E2E test tasks marked [P] can run in parallel

### Recommended Team Execution

**Single Developer**:
1. Phase 1 → Phase 2 → Phase 3 → Phase 4 (pages sequentially) → Phase 5–6 (chatbot) → Phase 7 → Phase 8–10

**Two Developers**:
- Developer A: Phase 1 → Phase 2 → Phase 3 → Phase 4 (pages)
- Developer B: (waits for Phase 2/3) → Phase 5–6 (chatbot in parallel with pages) → Phase 7–8

**Three+ Developers**:
1. All: Phase 1 together
2. All: Phase 2 together
3. Dev A: Phase 3 (layout/components) in parallel with Dev B: Phase 5 (chatbot setup)
4. Once Phase 3 done: Dev C starts Phase 4 (pages), Devs A+B continue Phase 5–6 (chatbot UI)
5. Phase 7–8: All developers in parallel (animations, testing)

---

## Notes

- [P] tasks = different files, no dependencies (can run in parallel)
- [Story] label maps task to specific user story for traceability
- Each user story (US1–US5) is independently testable after its phase completes
- Use `npm run dev` for continuous development testing
- Run `npm run build` before committing to catch build errors early
- Commit after each logical group of tasks (e.g., after all Phase 3 components, after Phase 4 pages)
- All resume data must flow from resume.json (no hardcoding, no duplication)
- Chatbot context is entire resume.json (no partial slices)

---

**Ready for Implementation**: All tasks are concrete, testable, and mapped to user stories. Next phase: Development execution with regular validation against task checklist.

**Success Criteria**:
- ✅ All 27 major task groups complete
- ✅ All resume data visible and accurate
- ✅ Chatbot responds accurately to resume questions
- ✅ Portfolio fully responsive (375px–1280px+)
- ✅ Dark/light mode working
- ✅ Zero TypeScript/ESLint errors
- ✅ Production build successful
- ✅ E2E tests passing
- ✅ Ready for recruiter review
