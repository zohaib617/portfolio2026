---
id: 001
title: Define portfolio website specification
stage: spec
date: 2026-01-02
surface: agent
model: claude-haiku-4-5-20251001
feature: portfolio-site
branch: 001-portfolio-site
user: user
command: /sp.specify
labels: ["specification","resume-grounded","chatbot","portfolio","next.js"]
links:
  spec: specs/001-portfolio-site/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-portfolio-site/spec.md
  - specs/001-portfolio-site/checklists/requirements.md
tests:
  - none
---

## Prompt

Project: AI-Driven Personal Portfolio Website + Resume-Grounded Chatbot
Stack: Next.js 14 (App Router), TypeScript, Tailwind CSS, OpenAI Agent SDK

Purpose:
Define the exact pages, components, data models, and chatbot behavior
using the attached resume as the single source of truth.

Resume Data (Mohammad Zohaib Shah):
- Location: Karachi, Pakistan
- Role: AI-Driven Web Developer / Oracle Trainee Developer
- Contact: zohaib92shah@gmail.com, +92 319 8251617
- Skills: AI-Driven Development, Claude Code, Spec-Kit Plus, HTML/CSS/JS/TS, React, Next.js, Tailwind, Python, Oracle tools, SQL/PL-SQL
- Education: B.Com (2015), Intermediate (2013), Matriculation (2011)
- Certifications: AI/Metaverse/Web3 Developer (2023–Present), Oracle DB, Forms, Reports (2016), ADIT (2013)
- Experience: Trainee Oracle Developer at Qitech (May 2025–Present) with 5 key responsibilities
- Projects: Gym Management System, Billing System, Instalment Payment Application
- Achievements: Next.js Hackathon, continuous learner
- Languages: English (Intermediate), Urdu (Fluent), Sindhi (Fluent)

Technical Constraints:
- Resume data stored as structured JSON (single source of truth)
- No direct OpenAI calls inside React components
- Strict TypeScript typing
- Tailwind CSS only for styling
- Chatbot answers ONLY from resume/portfolio data

## Response snapshot

**Specification created**: `specs/001-portfolio-site/spec.md`
**Branch**: 001-portfolio-site
**Status**: Ready for planning

**Feature Coverage**:
- 5 user stories (P1: recruiter discovery, experience review, projects; P2: chatbot interaction, mobile browsing)
- 15 functional requirements (9 portfolio pages + chatbot + responsiveness + data integrity + navigation)
- 10 measurable success criteria (data coverage, performance, type safety, chatbot accuracy)
- 9 portfolio pages: Home, About, Skills, Education, Certifications, Experience, Projects, Extras (Achievements/Languages), Personal Info
- Chatbot: Resume-grounded AI assistant with out-of-scope handling
- Responsive design: Mobile (375px), tablet (768px), desktop (1024px+)
- Dark/light mode support

**Quality Checklist**: All items pass. Specification is complete, testable, and ready for planning.

## Outcome

- ✅ Impact: Comprehensive specification that captures all recruiter workflows, chatbot behavior, and technical constraints. No ambiguity; all requirements are testable. Establishes resume JSON as single source of truth and enforces resume fidelity.
- 🧪 Tests: No automated tests at this stage; specification validation checklist passed all items
- 📁 Files: `specs/001-portfolio-site/spec.md`, `specs/001-portfolio-site/checklists/requirements.md`
- 🔁 Next prompts: `/sp.plan` (design Next.js App Router structure, resume JSON schema, chatbot architecture, component hierarchy)
- 🧠 Reflection: Specification emphasizes resume fidelity as core constraint. All 5 user stories are independently testable and deliver clear user value. Chatbot knowledge boundary is explicitly defined (resume-grounded only). Requirements avoid implementation details and focus on user outcomes.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS (no [NEEDS CLARIFICATION] markers, all acceptance scenarios defined, success criteria measurable and technology-agnostic)
- Prompt variant (if applicable): none
- Next experiment: Proceed to planning phase
