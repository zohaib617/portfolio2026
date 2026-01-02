---
id: 001
title: Establish portfolio constitution
stage: constitution
date: 2026-01-02
surface: agent
model: claude-haiku-4-5-20251001
feature: none
branch: master
user: user
command: /sp.constitution
labels: ["governance","architecture","portfolio","chatbot"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - none
---

## Prompt

Project: AI-Driven Personal Portfolio Website + Resume-Grounded Chatbot
Stack: Next.js (App Router, TypeScript), Tailwind CSS, OpenAI Agent SDK
Methodology: Spec-Driven Development using Spec-Kit Plus and Claude Code

Core Principles:
- AI-Driven Development: specs before implementation
- Resume fidelity: all content must strictly match the attached resume
- No hallucinations, no fabricated skills, experience, or data
- Clean, professional, recruiter-ready UI
- Type-safe, maintainable, production-ready code

Architecture Standards:
- Next.js App Router using `page.tsx`
- TypeScript (strict)
- Tailwind CSS (responsive, mobile-first)
- OpenAI Agent SDK for chatbot
- Structured resume JSON as single source of truth

Chatbot Rules:
- Resume-grounded AI Resume Assistant
- Answers only from portfolio/resume data
- Out-of-scope response:
  "This information is not available in my portfolio."

Constraints:
- No fake data or assumptions
- No direct OpenAI calls inside UI components
- No business logic in presentation layer

Success Criteria:
- Project builds without errors
- Resume content accurately rendered
- Chatbot remains fully grounded
- Portfolio is recruiter-ready and deployable

## Response snapshot

Constitution v1.0.0 created with 6 core principles:
1. AI-Driven Development (ADD)
2. Resume Fidelity
3. Clean Architecture
4. Type Safety (TypeScript Strict)
5. Professional UI/UX
6. Resume-Grounded Chatbot

Added sections: Technology Stack, Data Integrity, Chatbot Rules, Development Workflow, Governance.

File: `.specify/memory/constitution.md`
Status: Ready for next phase (specification or planning)

## Outcome

- ✅ Impact: Foundation established for AI-driven portfolio project with clear governance, architecture standards, and chatbot constraints
- 🧪 Tests: No automated tests required; constitution is declarative governance
- 📁 Files: `.specify/memory/constitution.md` (v1.0.0)
- 🔁 Next prompts: `/sp.specify` (define portfolio pages, components, chatbot behavior), `/sp.plan` (architecture decisions), `/sp.tasks` (implementation roadmap)
- 🧠 Reflection: Constitution establishes resume fidelity as core principle and defines clear boundaries for chatbot (resume-grounded only). Clean architecture principle prevents coupling of AI logic with React components.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS (all placeholders filled, no hallucinations, governance clear)
- Prompt variant (if applicable): none
- Next experiment: Proceed to specification phase
