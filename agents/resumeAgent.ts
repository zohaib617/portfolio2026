import Anthropic from '@anthropic-ai/sdk';

/**
 * Resume-Grounded AI Assistant Agent
 * Answers questions only from resume/portfolio data
 * Stays in-scope and provides helpful responses
 */

const client = new Anthropic();

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AgentResponse {
  message: string;
  inScope: boolean;
}

/**
 * Create system prompt for resume-grounded assistant
 * Includes context about the user and constraints
 */
function createSystemPrompt(resumeContext: string): string {
  return `You are Mohammad Zohaib Shah's AI Resume Assistant. You help visitors learn about my professional background, skills, experience, and projects.

IMPORTANT CONSTRAINTS:
1. ONLY answer questions using the information provided in my resume and portfolio below
2. If asked something not in my resume, respond: "This information is not available in my portfolio. Feel free to ask me about my skills, experience, projects, education, or certifications."
3. Be concise, professional, and helpful
4. Highlight relevant skills and experiences when appropriate
5. Encourage further exploration of the portfolio for more details
6. For project inquiries, suggest contacting via email

RESUME CONTEXT:
${resumeContext}

Use this information as your ONLY source of truth. Do not make assumptions or add information beyond what's provided.`;
}

/**
 * Initialize resume context from resume data
 * Converts structured resume to conversational format
 */
function buildResumeContext(): string {
  // This will be populated from resume.json at runtime
  // For now, return a placeholder that will be replaced by the API route
  return 'Resume context will be injected by the API route.';
}

/**
 * Chat with the resume-grounded agent
 * Maintains conversation history and ensures responses stay in-scope
 */
export async function chatWithResumeAgent(
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<AgentResponse> {
  try {
    // Get resume context (this would be passed from the API route)
    const resumeContext = buildResumeContext();

    // Build messages array with conversation history
    const messages: Message[] = [
      ...conversationHistory,
      {
        role: 'user',
        content: userMessage,
      },
    ];

    // Call Claude API with resume-grounded system prompt
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: createSystemPrompt(resumeContext),
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    // Extract text from response
    const assistantMessage =
      response.content && response.content[0] && response.content[0].type === 'text'
        ? response.content[0].text
        : '';

    // Check if response indicates out-of-scope
    const isOutOfScope =
      assistantMessage.includes('not available in my portfolio') ||
      assistantMessage.includes('not in my resume');

    return {
      message: assistantMessage,
      inScope: !isOutOfScope,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Agent error: ${errorMessage}`);
  }
}

/**
 * Validate that user message is appropriate
 * Basic validation before sending to agent
 */
export function validateUserMessage(message: string): {
  valid: boolean;
  error?: string;
} {
  if (!message) {
    return { valid: false, error: 'Message cannot be empty' };
  }

  if (message.length > 1000) {
    return { valid: false, error: 'Message is too long (max 1000 characters)' };
  }

  if (message.trim().length === 0) {
    return { valid: false, error: 'Message cannot be only whitespace' };
  }

  return { valid: true };
}

/**
 * Format conversation for agent
 * Cleans and validates conversation history
 */
export function formatConversationHistory(
  messages: Message[]
): Message[] {
  return messages.filter(
    (msg) => msg.role && msg.content && msg.content.trim().length > 0
  );
}

/**
 * Create initial greeting message
 */
export function createGreetingMessage(userName?: string): string {
  const greeting = `Hi${userName ? ` ${userName}` : ''}! 👋 I'm Mohammad's AI Resume Assistant. I can help you learn about my:

- 💼 Professional experience and roles
- 🛠️ Technical skills and expertise
- 📚 Education and certifications
- 🚀 Featured projects
- 🌍 Languages and achievements

Feel free to ask me anything about my background, skills, or projects!`;

  return greeting;
}

/**
 * Summarize conversation
 * Used for display purposes
 */
export function summarizeConversation(
  messages: Message[]
): { userMessages: number; assistantMessages: number } {
  const userMessages = messages.filter((msg) => msg.role === 'user').length;
  const assistantMessages = messages.filter(
    (msg) => msg.role === 'assistant'
  ).length;

  return { userMessages, assistantMessages };
}
