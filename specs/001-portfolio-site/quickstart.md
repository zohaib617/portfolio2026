# Quick Start Guide: AI-Driven Personal Portfolio Website

**Duration**: ~10 minutes to get the site running locally
**Prerequisite**: Node.js 18+, OpenAI API key

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure Environment

Create `.env.local` in the project root:

```bash
# Copy template
cp .env.example .env.local

# Edit .env.local and add your OpenAI API key
OPENAI_API_KEY=sk-xxxxxxxxxxxxx
```

**Never commit `.env.local` to git!**

### 3. Verify Resume Data

Check that `data/resume.json` is populated with correct data:

```bash
cat data/resume.json | jq '.' # Pretty print JSON
```

Expected sections:
- ✅ personalInfo
- ✅ careerObjective
- ✅ skills
- ✅ education
- ✅ certifications
- ✅ experience
- ✅ projects
- ✅ achievements
- ✅ languages

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Server runs at: `http://localhost:3000`

### 5. Test the Portfolio

**Portfolio Pages**:
- Home: http://localhost:3000/
- About: http://localhost:3000/about
- Skills: http://localhost:3000/skills
- Education: http://localhost:3000/education
- Certifications: http://localhost:3000/certifications
- Experience: http://localhost:3000/experience
- Projects: http://localhost:3000/projects
- Achievements & Languages: http://localhost:3000/extras
- Personal Info: http://localhost:3000/personal

**Chatbot**:
- Chat page: http://localhost:3000/chat
- Test questions:
  - "What are your main skills?"
  - "Tell me about your experience"
  - "What's your favorite color?" (out-of-scope)

### 6. Test Dark/Light Mode

- Toggle theme using the button in the header
- Theme preference persists across page refreshes

### 7. Test Responsive Design

**Using Browser DevTools**:
```
Chrome/Edge: F12 → Toggle device toolbar (Ctrl+Shift+M)
Firefox: F12 → Responsive Design Mode (Ctrl+Shift+M)
```

Test breakpoints:
- Mobile (375px): iPhone SE
- Tablet (768px): iPad
- Desktop (1024px+): Standard desktop

## Build & Production

### Build for Production

```bash
npm run build
```

Checks:
- ✅ Next.js build completes without errors
- ✅ TypeScript strict mode passes
- ✅ All pages are static or pre-rendered

### Start Production Server

```bash
npm run start
```

### Run Tests

```bash
# Unit & integration tests
npm run test

# E2E tests (Playwright)
npm run test:e2e

# All tests with coverage
npm run test:coverage
```

## File Structure (Quick Reference)

```
app/                    # Next.js pages (App Router)
  page.tsx            # Home
  about/page.tsx      # About
  skills/page.tsx     # Skills
  ... (other pages)
  chat/page.tsx       # Chatbot UI
  api/chat/route.ts   # Chatbot API

components/           # Reusable React components
  layout/             # Header, Footer, Nav
  ui/                 # Card, Section, Timeline, Badge, Grid
  chat/               # ChatWindow, ChatMessage, ChatInput

data/
  resume.json         # Canonical resume data (SINGLE SOURCE OF TRUTH)

lib/
  resumeLoader.ts     # Load & validate resume.json
  agentClient.ts      # Initialize OpenAI Agent
  constants.ts        # App constants
  utils.ts            # Utility functions

types/
  resume.ts           # TypeScript interfaces

styles/
  globals.css         # Tailwind base styles
```

## Common Development Tasks

### Add a New Page

1. Create `app/new-page/page.tsx`
2. Import resumeLoader: `import { resumeLoader } from '@/lib/resumeLoader';`
3. Load data: `const resume = resumeLoader.getResume();`
4. Use reusable components from `/components`
5. Add route to navigation in `components/layout/Header.tsx`

### Update Resume Data

1. Edit `data/resume.json`
2. Validate JSON: `npm run validate:resume`
3. Restart dev server

The portfolio automatically updates all pages referencing the changed data.

### Customize Styling

All styling uses Tailwind CSS in component files. Global styles in `styles/globals.css`.

**Update theme colors**:
- Edit `tailwind.config.js`
- Restart dev server

### Test Chatbot Response

1. Open http://localhost:3000/chat
2. Type a question
3. Check browser console (F12) for API request/response
4. Verify response comes from resume.json

## Troubleshooting

### "Cannot find module 'data/resume.json'"

- Check that `data/resume.json` exists and is valid JSON
- Run: `npm run validate:resume`

### Chatbot returns "This information is not available"

- The query is out-of-scope (expected behavior)
- Check agent system prompt in `agents/resumeAgent.ts`
- Verify resume context is being passed correctly

### Dark mode not persisting

- Check browser localStorage is enabled
- Verify `ThemeProvider.tsx` is wrapping app in layout
- Clear browser cache: F12 → Application → Clear storage

### Pages load slowly

- Check performance in Chrome DevTools (F12 → Performance)
- Profile with `npm run analyze` (requires Next.js bundle analyzer)
- Optimize images in `/public`

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Environment Variables** (set in Vercel dashboard):
- `OPENAI_API_KEY`: Your OpenAI API key

### Deploy to Other Platforms

For any Node.js-compatible platform (AWS, Azure, Netlify, etc.):

1. Build: `npm run build`
2. Start: `npm run start`
3. Set environment variable: `OPENAI_API_KEY`

## Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [OpenAI Agent SDK](https://platform.openai.com/docs/agents)

## Getting Help

- Check `specs/001-portfolio-site/` for detailed architecture docs
- Review test files for usage examples
- Check Next.js build output for errors: `npm run build`

---

**Next Steps**:
1. Run `npm install` to install dependencies
2. Create `.env.local` with your OpenAI API key
3. Run `npm run dev` to start dev server
4. Open http://localhost:3000 in browser
5. Test pages and chatbot
6. Begin implementation following `/sp.tasks`
