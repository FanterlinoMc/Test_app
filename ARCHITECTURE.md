# Architecture & How It Works

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Your Website                         │
│  (index.html, agents.html, homebuyers.html, etc.)      │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│              Chat Widget (chatbot.js)                   │
│  - Floating chat bubble                                 │
│  - Message display                                      │
│  - User input                                           │
│  - Calls API for responses                              │
└────────────────┬────────────────────────────────────────┘
                 │
    HTTP POST    │ {"message": "...", "history": [...]}
                 ↓
┌─────────────────────────────────────────────────────────┐
│           Your Backend Server (server.js)              │
│  - Express.js server                                    │
│  - Runs on localhost:3001                               │
│  - Handles API requests                                 │
│  - Maintains conversation logic                         │
└────────────────┬────────────────────────────────────────┘
                 │
    HTTPS API    │ {"message": "...", "conversationHistory": [...]}
                 ↓
┌─────────────────────────────────────────────────────────┐
│            Claude API (Anthropic)                       │
│  - Intelligent AI model                                 │
│  - Returns context-aware responses                      │
│  - Powered by system prompt                             │
└────────────────┬────────────────────────────────────────┘
                 │
   HTTP 200 OK   │ {"success": true, "message": "..."}
                 ↓
┌─────────────────────────────────────────────────────────┐
│           Backend Response Processing                   │
│  - Parse Claude response                                │
│  - Update conversation history                          │
│  - Return to frontend                                   │
└────────────────┬────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────┐
│              Display in Chat Bubble                      │
│  - Show bot response                                    │
│  - Suggest follow-up questions                          │
│  - Ready for next message                               │
└─────────────────────────────────────────────────────────┘
```

## Data Flow - Step by Step

### 1. User Types and Sends Message

```javascript
User Types: "How does the program work?"
     ↓
User presses Enter or clicks Send button
     ↓
chatbot.js: sendUserMessage() function called
     ↓
Message added to UI immediately (user sees "..."sends)
```

### 2. Message Sent to Backend

```javascript
chatbot.js makes fetch request:
POST http://localhost:3001/api/chat

Payload:
{
  "message": "How does the program work?",
  "conversationHistory": [
    {role: "user", content: "Hello"},
    {role: "assistant", content: "Hi there!"}
  ]
}
```

### 3. Backend Processes Request

```javascript
server.js receives POST /api/chat
     ↓
Validates message format
     ↓
Adds SYSTEM_PROMPT (Guidance context + guardrails)
     ↓
Combines with conversation history
     ↓
Creates API call to Claude
```

### 4. Claude API Call

```javascript
{
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 1024,
  system: `You are helpful AI for Guidance...
           [Full context about Guidance Residential]
           [Safety guardrails]
           [Routing instructions]`,
  messages: [
    ...all previous messages...,
    {role: "user", content: "How does the program work?"}
  ]
}
```

### 5. Claude Returns Response

```
Claude processes the query and returns:
{
  content: [{text: "The program is a co-ownership partnership..."}],
  stop_reason: "end_turn"
}
```

### 6. Backend Returns to Frontend

```javascript
server.js formats response:
{
  success: true,
  message: "The program is a co-ownership partnership...",
  stop_reason: "end_turn"
}
```

### 7. Frontend Displays Response

```javascript
chatbot.js receives response
     ↓
Removes "typing" indicator animation
     ↓
Adds bot message to chat display
     ↓
Updates conversationHistory for next message
     ↓
Shows follow-up suggestion chips
```

## System Prompt Architecture

The system prompt is crucial - it tells Claude HOW to behave:

```
SYSTEM PROMPT
│
├─→ Role: Helpful AI for Guidance Residential
├─→ Knowledge Base: Comprehensive Guidance info
│   ├─ What is Guidance
│   ├─ Program structure
│   ├─ Down payments
│   ├─ Process timeline
│   ├─ etc.
│
├─→ Safety Guardrails
│   ├─ Don't ask for SSN
│   ├─ Don't make underwriting decisions
│   ├─ Don't approve/deny financing
│   └─ Route sensitive data to secure forms
│
└─→ Routing Rules
    ├─ Investments → Guidance Investments
    ├─ Auto loans → Other lenders
    ├─ Account Executive → Phone/link
    └─ Sensitive data → Secure form
```

## Conversation History Management

### Why Keep History?

```
Example without history:
User: "How does down payment work?"
Claude: "Guidance offers down payments starting at 3%..."

User: "What about my situation?"
Claude: ??? (Doesn't know what program was discussed)
```

```
Example WITH history:
User: "How does down payment work?"
Claude: "Guidance offers down payments starting at 3%..."

User: "What about my situation?"
Claude: "Based on our discussion about Guidance's down payment
         requirements, here's what might apply to you..."
         (Actually remembers context!)
```

### How History Works

```javascript
conversationHistory = [
  {role: "user", content: "Tell me about Guidance"},
  {role: "assistant", content: "Guidance is the largest..."},
  {role: "user", content: "How long does closing take?"},
  {role: "assistant", content: "Closing typically takes..."}
]

Max messages: 20 (to manage costs)
Cleared when: Chat widget closed and reopened
```

## Error Handling Flow

```
User sends message
     ↓
API call fails? → Server catches error
     ↓
Is it an API key error?
├─ YES → Return "Invalid API key" message
├─ NO (rate limit) → Return "Rate limited" message
└─ NO (other) → Return "Try again later" message
     ↓
User sees helpful error message
     ↓
Falls back to local knowledge base (if needed)
```

## Security Architecture

```
Frontend (chatbot.js)
    ├─ ❌ NO API KEY stored here
    ├─ ❌ NO direct Claude API calls
    └─ ✓ Safe - just sends messages

↓ HTTPS encrypted

Backend (server.js)
    ├─ ✓ API KEY stored securely in .env
    ├─ ✓ API KEY never exposed to frontend
    └─ ✓ Acts as secure middleman

↓ Authentication via API key

Claude API (Anthropic)
    ├─ ✓ Only backend can call
    └─ ✓ Frontend cannot bypass
```

## Deployment Architecture

### Local Development

```
You: npm start
    ↓
Server: localhost:3001
    ↓
chatbot.js calls: http://localhost:3001/api/chat
    ↓
Works on your machine!
```

### Production Deployment (Example: Heroku)

```
You: git push heroku main
    ↓
Heroku: Creates running instance
    ↓
Server: https://your-app.herokuapp.com
    ↓
Environment: Sets ANTHROPIC_API_KEY from config
    ↓
chatbot.js calls: https://your-app.herokuapp.com/api/chat
    ↓
Works on the internet!
```

## Performance Considerations

### Latency

```
User clicks send
    ↓
200-300ms: Round trip to server
    ↓
500-2000ms: Claude API processing
    ↓
200-300ms: Response back to browser
    ↓
Total: ~1-3 seconds (normal)

Typing indicator shows during waiting
```

### Tokens & Costs

```
Each message uses tokens (like "words"):
- Input tokens: Your question + history
- Output tokens: Claude's response

Cost per message:
- ~1-2 cents average for Guidance chatbot
- Conversation history increases cost slightly
- Suggest 20-message limit to manage costs
```

## Fallback Strategy

```
API Working?
    ├─ YES → Use Claude API (intelligent)
    └─ NO → Fall back to local KB (pattern matching)

This ensures:
- ✓ Best experience when API works
- ✓ Still functional if API is down
- ✓ No data loss
```

## Key Configuration Points

### In server.js

```javascript
const SYSTEM_PROMPT = `...`;
// ↑ Controls how Claude responds

const MODEL = "claude-3-5-sonnet-20241022";
// ↑ Which Claude model to use

max_tokens: 1024;
// ↑ Max response length
```

### In chatbot.js

```javascript
const API_BASE_URL = "http://localhost:3001";
// ↑ Where to call the server

conversationHistory.slice(-20);
// ↑ Keep last 20 messages

getFollowUps(text);
// ↑ Suggest contextual follow-ups
```

### In .env

```bash
ANTHROPIC_API_KEY=sk-ant-...
# ↑ Your API credential

PORT=3001
# ↑ Server port

NODE_ENV=development
# ↑ Environment setting

CORS_ORIGIN=http://localhost:3000
# ↑ Which frontends can call this
```

---

This architecture ensures:

- ✅ Intelligent responses via Claude
- ✅ Context-aware conversations
- ✅ Secure API key handling
- ✅ Scalable backend
- ✅ Fast performance
- ✅ Cost-effective operation
