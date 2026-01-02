---
id: 002
title: Design implementation plan
stage: plan
date: 2026-01-02
surface: agent
model: claude-haiku-4-5-20251001
feature: portfolio-site
branch: 001-portfolio-site
user: user
command: /sp.plan
labels: ["architecture","data-model","api-contract","next.js","chatbot"]
links:
  spec: specs/001-portfolio-site/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-portfolio-site/plan.md
  - specs/001-portfolio-site/data-model.md
  - specs/001-portfolio-site/contracts/chat-api.md
  - specs/001-portfolio-site/quickstart.md
tests:
  - none
---

## Prompt

Project: AI-Driven Personal Portfolio Website + Resume-Grounded Chatbot
Stack: Next.js 14 (App Router), TypeScript, Tailwind CSS, OpenAI Agent SDK
Methodology: Spec-Driven Development (Spec-Kit Plus + Claude Code)

Purpose:
Define the full project structure, file layout, data flow, and agent
architecture before implementation.

Architecture:
- Frontend-heavy Next.js application
- Backend logic via API routes (App Router)
- AI chatbot powered by OpenAI Agent SDK
- Resume JSON as single source of truth

Key Layers:
1. Data Layer (Resume JSON)
2. UI Layer (Next.js pages & components)
3. Agent Layer (Resume-grounded AI assistant)
4. API Layer (Agent interaction & validation)

## Response snapshot

**Plan created**: `specs/001-portfolio-site/plan.md`
**Data Model**: `specs/001-portfolio-site/data-model.md`
**API Contract**: `specs/001-portfolio-site/contracts/chat-api.md`
**Quick Start**: `specs/001-portfolio-site/quickstart.md`

**Architecture Summary**:
- 9 portfolio pages (home, about, skills, education, certifications, experience, projects, extras, personal)
- 1 chatbot page with AI Resume Assistant
- 1 API route for chatbot (`/api/chat`)
- Reusable UI components (Header, Footer, Section, Card, Timeline, Badge, Grid, ChatWindow, ChatMessage, ChatInput)
- Single resume.json data source (fully typed TypeScript interfaces)
- Dark/light mode with localStorage persistence
- Fully responsive design (mobile-first, Tailwind CSS)
- Framer Motion animations for section reveals

**Constitution Check**: PASSED
✅ All 6 principles aligned (ADD, Resume Fidelity, Clean Architecture, Type Safety, Professional UI/UX, Resume-Grounded Chatbot)

**Data Flow**:
resume.json → resumeLoader → pages (read-only) + API route (agent context)
User question → /api/chat → OpenAI Agent (context: resume.json) → Grounded response

**Critical Path**:
1. Define resume.json schema + TypeScript interfaces
2. Build resumeLoader utility (load & validate)
3. Implement layout + navigation components
4. Build 9 portfolio pages (parallel)
5. Implement chatbot API + UI
6. E2E testing & validation

## Outcome

- ✅ Impact: Complete architectural blueprint enabling error-free implementation. Data flow documented, component hierarchy clear, API contract fully specified. Constitution principles embedded in architecture.
- 🧪 Tests: No automated tests at this stage; architecture validation passed against constitution
- 📁 Files: plan.md, data-model.md, chat-api.md (contract), quickstart.md
- 🔁 Next prompts: `/sp.tasks` (generate concrete, testable implementation tasks)
- 🧠 Reflection: Architecture enforces resume fidelity via single source of truth (resume.json). Clean separation: UI components have no business logic; OpenAI calls isolated to API route. TypeScript strict mode throughout. Chatbot knowledge boundary explicit: agent can only answer from resume context.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS (Constitution Check aligned, data flow clear, API contract complete, no ambiguities)
- Prompt variant (if applicable): none
- Next experiment: Proceed to task generation phase
