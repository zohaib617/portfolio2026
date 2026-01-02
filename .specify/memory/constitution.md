# AI-Driven Personal Portfolio Website + Resume-Grounded Chatbot Constitution

<!-- Sync Impact Report: v1.0.0 (Initial adoption) | 2026-01-02
- **Version**: 1.0.0 (new project, initial ratification)
- **Principles**: 6 core principles established (AI-Driven Development, Resume Fidelity, Clean Architecture, Type Safety, Professional UI/UX, Resume-Grounded Chatbot)
- **Sections**: Added Technology Stack, Data Integrity, Chatbot Rules, Development Workflow
- **Templates requiring updates**: spec-template.md (Chatbot section), plan-template.md (Chatbot architecture), tasks-template.md (Chatbot testing tasks)
-->

## Core Principles

### I. AI-Driven Development (ADD)
Every feature must be defined through specifications (spec.md) before implementation. Specifications establish requirements, user stories, success criteria, and edge cases. Implementation only proceeds after architectural planning (plan.md) and task definition (tasks.md) are approved. This ensures alignment between intent and delivery, and enables clear test-first development practices.

### II. Resume Fidelity
All portfolio content must strictly match the provided resume data. No fabricated experience, skills, certifications, projects, or achievements are permitted. The structured resume JSON serves as the single authoritative source of truth. Portfolio features, about sections, skills galleries, and project displays must all derive directly from this source. This builds recruiter trust and maintains professional integrity.

### III. Clean Architecture
- No direct OpenAI API calls inside React components
- Business logic separated from presentation layer (no logic in UI components)
- Data flows through well-defined services and API routes
- Validation and transformation happen at system boundaries (API routes, not in components)
- Each module has a single, clear responsibility

### IV. Type Safety (TypeScript Strict)
All code must be TypeScript with strict mode enabled. No `any` types unless explicitly justified with a comment. Type inference is preferred over explicit annotations where it doesn't reduce clarity. Generic types must be constrained meaningfully. This prevents runtime errors and documents intent through types.

### V. Professional UI/UX
- Modern developer portfolio aesthetic with subtle, professional animations (Framer Motion)
- Smooth section transitions, scroll-based effects, and loading states
- Clear typography, consistent spacing, and visual hierarchy
- Full responsive design (mobile-first approach) across all breakpoints
- Dark mode and light mode support with seamless switching
- Accessibility considerations: keyboard navigation, ARIA labels, semantic HTML

### VI. Resume-Grounded Chatbot
The AI Resume Assistant chatbot must answer only from portfolio and resume data. For queries outside resume scope, respond with: "This information is not available in my portfolio." The chatbot is built using OpenAI Agent SDK with a defined persona ("Zohaib Shah – AI-Driven Web Developer Assistant") and operates entirely from resume-derived content. No external knowledge injection, assumptions, or fabricated answers are permitted.

## Technology Stack

**Frontend**:
- Next.js 14 (App Router) with TypeScript
- Tailwind CSS (responsive, mobile-first)
- Framer Motion (subtle animations)
- React 18+

**Chatbot & AI**:
- OpenAI Agent SDK for the AI Resume Assistant
- Resume JSON as the knowledge base

**Development**:
- TypeScript (strict mode)
- Node.js 18+

## Data Integrity

**Single Source of Truth**: The structured resume JSON file is the authoritative source for all portfolio content. All portfolio pages must derive their data from this source, not from hardcoded text or separate data files. This ensures consistency and simplifies updates.

**No Hallucinations**: All displayed information (skills, experience, certifications, projects, achievements) must come directly from the resume. No inference, expansion, or assumed knowledge is permitted.

**Chatbot Knowledge Boundary**: The chatbot's knowledge is limited to resume and portfolio data. Any query outside this scope receives the standard out-of-scope response.

## Chatbot Rules

**Behavior**:
- The chatbot operates using the OpenAI Agent SDK
- Persona: "Zohaib Shah – AI-Driven Web Developer Assistant"
- Responses MUST be grounded in resume/portfolio data
- No external knowledge, assumptions, or creative inference

**Query Handling**:
- In-scope queries: Answer from resume data
- Out-of-scope queries: "This information is not available in my portfolio."
- Ambiguous queries: Ask clarifying questions, but only answer from resume data

**Integration**:
- Chatbot is accessible from the portfolio (floating widget or dedicated page)
- Chatbot maintains conversation context within a session
- Responses are natural and conversational while remaining factual

## Development Workflow

1. **Specification First**: Before any feature work, create or update `specs/<feature>/spec.md` with user stories, requirements, and success criteria
2. **Architecture Review**: Create `specs/<feature>/plan.md` with technical approach, dependencies, and data models
3. **Task Planning**: Generate `specs/<feature>/tasks.md` with concrete, testable tasks
4. **Test-First Implementation**: Write failing tests first, then implement to pass them
5. **Code Review**: Ensure TypeScript strict mode compliance, architecture separation, and resume data accuracy
6. **Deployment Ready**: Code must build without warnings, pass all tests, and have no hardcoded secrets

## Governance

This constitution is the authoritative guide for all development decisions on this project. It supersedes informal practices and verbal agreements.

**Amendment Process**:
- Amendments require documentation explaining the change and rationale
- All design documents (spec, plan, tasks) must be reviewed for compliance
- Version number increments according to semantic versioning (MAJOR = principle changes, MINOR = new section, PATCH = clarifications)
- All team members must acknowledge amendments before proceeding

**Compliance Checks**:
- All PRs/reviews must verify TypeScript strict compliance
- Architecture decisions must be documented in ADRs when architecturally significant
- Resume data accuracy must be verified against the source JSON
- UI/UX changes should be screened for accessibility compliance

**Runtime Guidance**:
- Refer to `CLAUDE.md` for agent-specific execution rules and PHR requirements
- Refer to `specs/` directory for feature-specific design documents
- Refer to `.specify/templates/` for Spec-Kit Plus templates

**Version**: 1.0.0 | **Ratified**: 2026-01-02 | **Last Amended**: 2026-01-02
