# Chatbot API Contract

**Endpoint**: `POST /api/chat`
**Authentication**: None (internal API)
**Content-Type**: `application/json`

## Request

```typescript
interface ChatRequest {
  message: string;  // User's question (1-1000 chars)
}
```

**Example**:
```json
{
  "message": "What are your main skills?"
}
```

**Validation**:
- `message` is required
- `message` must be non-empty string
- `message` max length: 1000 characters

## Response (Success)

```typescript
interface ChatResponse {
  response: string;     // Agent's answer
  timestamp: string;    // ISO 8601 timestamp
  groundedInResume: boolean; // true if answer uses resume data
}
```

**Example**:
```json
{
  "response": "I have skills in AI-Driven Development, Claude Code, Spec-Kit Plus, and many web technologies...",
  "timestamp": "2026-01-02T15:30:00Z",
  "groundedInResume": true
}
```

**HTTP Status**: `200 OK`

## Response (Out-of-Scope Query)

```json
{
  "response": "This information is not available in my portfolio.",
  "timestamp": "2026-01-02T15:30:00Z",
  "groundedInResume": false
}
```

**HTTP Status**: `200 OK` (still success, but grounded=false)

## Response (Error)

```typescript
interface ErrorResponse {
  error: string;
  code: string;
  timestamp: string;
}
```

**Examples**:

```json
{
  "error": "Message is required",
  "code": "INVALID_REQUEST",
  "timestamp": "2026-01-02T15:30:00Z"
}
```

**HTTP Status**: `400 Bad Request`

```json
{
  "error": "OpenAI API error: rate_limit_exceeded",
  "code": "OPENAI_ERROR",
  "timestamp": "2026-01-02T15:30:00Z"
}
```

**HTTP Status**: `503 Service Unavailable`

## Agent Behavior

### In-Scope Questions
Agent answers using resume.json context:
- Skills, certifications, education
- Work experience, projects
- Languages, achievements
- Personal background

**Example queries**:
- "What are your skills?"
- "Tell me about your experience"
- "What projects have you built?"
- "Do you speak Urdu?"
- "Where did you study?"

### Out-of-Scope Questions
Agent responds with standard message for queries outside resume:
- Personal opinions ("What's your favorite color?")
- Current events ("What's happening in tech news?")
- General knowledge ("How do I build a React app?")
- Advice beyond resume scope

**Example queries**:
- "What's your favorite food?"
- "How's the weather?"
- "Can you help me code?"
- "Tell me a joke"

**Standard Response**:
```
"This information is not available in my portfolio."
```

### Ambiguous Questions
Agent may ask for clarification while staying in resume scope:
- "Can you be more specific? Are you asking about my Oracle experience or web development skills?"
- "Which project would you like to know more about—Gym Management System, Billing System, or Instalment Payment App?"

## Rate Limiting

- **Rate Limit**: 10 requests per minute per IP
- **Retry-After**: Returned in response header if limit exceeded
- **HTTP Status**: `429 Too Many Requests`

## Timeout

- **Request Timeout**: 30 seconds
- **Agent Response Timeout**: 10 seconds
- **Error Response**: If agent doesn't respond, return fallback message

## Security Notes

- API Key (`OPENAI_API_KEY`) is server-side only (never exposed to client)
- Resume context is sent to OpenAI API; ensure compliance with privacy requirements
- No sensitive personal identifiers beyond what's in portfolio
- Input validation prevents prompt injection attempts

## Chatbot Context Limitations

The agent is initialized with:
```
System Prompt: "You are 'Zohaib Shah – AI Resume Assistant'. Answer questions ONLY using the provided resume data. For out-of-scope questions, respond: 'This information is not available in my portfolio.'"

Context: [Entire resume.json serialized as JSON string]
```

The agent:
- ✅ Can answer questions about resume data
- ✅ Can ask clarifying questions about resume scope
- ❌ Cannot browse the internet
- ❌ Cannot access external APIs
- ❌ Cannot infer information beyond resume
- ❌ Cannot make assumptions

## Implementation Notes

**File**: `app/api/chat/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { resumeLoader } from '@/lib/resumeLoader';
import { initializeResumeAgent } from '@/agents/resumeAgent';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required', code: 'INVALID_REQUEST' },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Message exceeds 1000 characters', code: 'INVALID_REQUEST' },
        { status: 400 }
      );
    }

    // Load resume context
    const resume = resumeLoader.getResume();

    // Initialize agent with resume context
    const agent = initializeResumeAgent(resume);

    // Call agent (with timeout)
    const response = await Promise.race([
      agent.chat(message),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Agent timeout')), 10000)
      ),
    ]);

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
      groundedInResume: !response.includes('not available'),
    });
  } catch (error) {
    console.error('Chat API error:', error);

    if (error instanceof Error && error.message === 'Agent timeout') {
      return NextResponse.json(
        {
          error: 'Response timeout. Please try again.',
          code: 'TIMEOUT',
          timestamp: new Date().toISOString(),
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
        code: 'SERVER_ERROR',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
```

## Testing

### Unit Tests
- Validate request/response schemas
- Test edge cases (empty message, max length, invalid JSON)

### Integration Tests
- Test agent response accuracy for known resume questions
- Test out-of-scope query fallback
- Test error handling (API failures, timeouts)

### E2E Tests
- User sends message through chat UI
- API endpoint processes and returns response
- Chat UI displays response correctly
