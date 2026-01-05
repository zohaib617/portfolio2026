import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { resumeLoader } from '@/lib/resumeLoader';
import { validateUserMessage, formatConversationHistory } from '@/agents/resumeAgent';

/**
 * POST /api/chat
 * Handles chat messages and returns AI-generated responses
 * Uses OpenAI API with resume-grounded system prompt
 */

interface ChatRequest {
  message: string;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

interface ChatResponse {
  success: boolean;
  message?: string;
  error?: string;
  inScope?: boolean;
}

/**
 * Initialize OpenAI client
 */
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Build system prompt with resume context
 */
function buildSystemPrompt(): string {
  const resume = resumeLoader.getResume();
  const resumeContext = buildResumeContext(resume);

  return `You are Mohammad Zohaib Shah's Intelligent AI Assistant. You are also a professional AI Business Consultant and Client-Hunting Assistant.

Your main goal is:
1) Ask intelligent questions to understand exactly what the user wants.
2) Identify whether the user wants:
   - A website
   - Software
   - An AI-based solution or automation
   - Or any other digital solution.

CRITICAL RULES:
1. Use the resume content below for all factual answers about Mohammad Zohaib Shah .
2. Keep responses professional, concise, and helpful (max 2-3 sentences for factual answers, slightly longer if providing advice or client guidance).
3. Automatically detect the user's language:
   - If English, reply in English.
   - If Roman Urdu or any other language, reply in that language.
   - Default language is English if undetectable.
4. If the user shows interest in working with Mohammad, subtly highlight he is a full-stack and AI-driven developer capable of creating custom software, mobile/web applications, and POS solutions. Share contact information (mobile/email) extracted from the resume.
5. For greetings (like "hello", "hi"), respond politely in the user's language with a professional introduction.
6. Always impress the user with intelligent problem-solving responses, subtle promotion of expertise, and confidence.
7. Ask intelligent discovery questions for clients based on their business needs and digital solution requirements.
8. Assure users you can deliver **high-quality work** and build trust with professional, confident, and friendly tone.

Conversation Flow:

STEP 1 – Discovery
Your first question must always be:
"Please tell me, what would you like to create? A website, software, or an AI-based solution?"

STEP 2 – Intelligent Guess
Based on the user’s answer, determine which category they fall into:
- Website → Ask website-specific questions
- Software → Ask software/business-specific questions
- AI Agent → Ask AI automation and business questions

STEP 3 – Website Questions
- What business or purpose is this website for?
- Is it a simple portfolio, business website, or e-commerce site?
- Do you have any reference websites you like?
- Do you need contact forms, WhatsApp integration, chatbots, or payment gateways?

STEP 4 – Software Questions
- What business or process is this software for?
- Will it be web-based, desktop, or mobile?
- What tasks do you want to automate or simplify?
- How many users or clients will use it?

STEP 5 – AI Agent Questions
- What task will the AI agent perform? (sales, support, marketing, automation)
- Will it interact with clients or internal teams?
- Should it integrate with WhatsApp, website, or internal systems?

STEP 6 – Trust & Closing Message
Always include the following points at the end:
- "We will understand your business and provide the perfect solution."
- "We don’t just suggest, we deliver high-quality work."
- "You will receive 1 month of free support after delivery."
- "Our pricing is reasonable, and quality is premium."
- "Relax and trust us — we will deliver an outstanding solution for you."

Example Closing Message:
"Please share your idea at my whats app number +923198251617, and we will design the best solution for your business — with high-quality work, performance, and full support included."

RESUME CONTENT:
${resumeContext}

Remember: 
- You are an assistant for Mohammad Zohaib Shah's portfolio.
- Provide accurate, helpful, and professional answers.
- Engage users politely, impressively, and subtly promote Mohammad's expertise when appropriate.
- Communicate intelligently, discover user needs, and offer business solutions with confidence and professionalism.
`;
}

/**
 * Convert resume object to conversational text format
 */
function buildResumeContext(resume: any): string {  // Using any here as resume structure is complex and validated elsewhere
  const sections: string[] = [];

  // Personal Info
  sections.push(`PERSONAL INFORMATION:
Name: ${resume.personalInfo.fullName}
Email: ${resume.personalInfo.email}
Phone: ${resume.personalInfo.phone}
Location: ${resume.personalInfo.location}
DOB: ${resume.personalInfo.dateOfBirth}`);

  // Career Objective
  sections.push(`CAREER OBJECTIVE:
${resume.careerObjective}`);

  // Skills
  sections.push(`SKILLS:
${resume.skills
  .map((cat: { category: string; items: string[] }) => `${cat.category}: ${cat.items.join(', ')}`)
  .join('\n')}`);

  // Education
  if (resume.education && resume.education.length > 0) {
    sections.push(`EDUCATION:
${resume.education
  .map((edu: { degree: string; institution: string; year: number }) => `- ${edu.degree} from ${edu.institution} (${edu.year})`)
  .join('\n')}`);
  }

  // Certifications
  if (resume.certifications && resume.certifications.length > 0) {
    sections.push(`CERTIFICATIONS:
${resume.certifications
  .map(
    (cert: { title: string; issuer: string; year: string | number }) =>
      `- ${cert.title} from ${cert.issuer} (${cert.year})`
  )
  .join('\n')}`);
  }

  // Experience
  if (resume.experience && resume.experience.length > 0) {
    sections.push(`PROFESSIONAL EXPERIENCE:
${resume.experience
  .map((exp: {
    role: string;
    company: string;
    startDate: string;
    endDate: string | null;
    responsibilities?: string[];
    technologies?: string[];
  }) => {
    const endDate = exp.endDate ? exp.endDate : 'Present';
    let details = `- ${exp.role} at ${exp.company} (${exp.startDate} to ${endDate})`;
    if (exp.responsibilities && exp.responsibilities.length > 0) {
      details += `\n  Responsibilities: ${exp.responsibilities.join('; ')}`;
    }
    if (exp.technologies && exp.technologies.length > 0) {
      details += `\n  Technologies: ${exp.technologies.join(', ')}`;
    }
    return details;
  })
  .join('\n\n')}`);
  }

  // Projects
  if (resume.projects && resume.projects.length > 0) {
    sections.push(`PROJECTS:
${resume.projects
  .map((proj: {
    title: string;
    description: string;
    features?: string[];
    technologies?: string[];
  }) => {
    let details = `- ${proj.title}: ${proj.description}`;
    if (proj.features && proj.features.length > 0) {
      details += `\n  Features: ${proj.features.join(', ')}`;
    }
    if (proj.technologies && proj.technologies.length > 0) {
      details += `\n  Technologies: ${proj.technologies.join(', ')}`;
    }
    return details;
  })
  .join('\n\n')}`);
  }

  // Languages
  if (resume.languages && resume.languages.length > 0) {
    sections.push(`LANGUAGES:
${resume.languages
  .map((lang: { language: string; proficiency: string }) => `- ${lang.language} (${lang.proficiency})`)
  .join('\n')}`);
  }

  // Achievements
  if (resume.achievements && resume.achievements.length > 0) {
    sections.push(`ACHIEVEMENTS:
${resume.achievements
  .map((ach: string) => `- ${ach}`)
  .join('\n')}`);
  }

  return sections.join('\n\n');
}

/**
 * POST handler for chat messages
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body: ChatRequest = await request.json();

    // Validate request
    if (!body.message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    // Validate user message
    const validation = validateUserMessage(body.message);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Format conversation history
    const conversationHistory = formatConversationHistory(
      body.conversationHistory || []
    );

    // Build system prompt with resume context
    const systemPrompt = buildSystemPrompt();

    // Prepare messages for API
    const messages = [
      ...conversationHistory,
      {
        role: 'user' as const,
        content: body.message,
      },
    ];

    // Call OpenAI API
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      max_tokens: 1024,
      temperature: 0.7,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
    });

    // Extract response text
    const assistantMessage = response.choices[0]?.message?.content || '';

    // Check if response is out of scope
    const isOutOfScope =
      assistantMessage.includes('not available in my portfolio') ||
      assistantMessage.includes('not in my resume');

    return NextResponse.json({
      success: true,
      message: assistantMessage,
      inScope: !isOutOfScope,
    } as ChatResponse);
  } catch (error) {
    console.error('Chat API error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    // Handle specific error types
    if (errorMessage.includes('API key')) {
      return NextResponse.json(
        {
          success: false,
          error: 'API configuration error. Please check server configuration.',
        },
        { status: 500 }
      );
    }

    if (errorMessage.includes('rate_limit')) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process message. Please try again.',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight
 */
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
