# Guidance Chatbot API - Setup Guide

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Get Claude API Key:**
   - Go to [https://console.anthropic.com](https://console.anthropic.com)
   - Create an account or sign in
   - Navigate to API Keys section
   - Create a new API key
   - Copy the key

3. **Configure Environment Variables:**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and replace `your_api_key_here` with your actual Claude API key
   - Update other variables as needed

4. **Start the server:**
   ```bash
   npm start
   ```
   or for development with auto-reload:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3001`

## API Endpoints

### POST `/api/chat`

Sends a user message and returns Claude's response

**Request:**

```json
{
  "message": "How does the program work?",
  "conversationHistory": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi there!" }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "message": "The program is a co-ownership partnership...",
  "stop_reason": "end_turn"
}
```

### GET `/health`

Health check endpoint

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2024-06-21T12:00:00.000Z"
}
```

## Integration with Frontend

The chatbot widget automatically connects to the API at `http://localhost:3001`.

To change the API URL in `chatbot.js`:

```javascript
const API_BASE_URL = "http://your-api-url:3001";
```

## Production Deployment

When deploying to production:

1. Set `NODE_ENV=production`
2. Use a production API URL (e.g., on Heroku, Vercel, AWS Lambda, etc.)
3. Keep your `.env` file with actual API keys secure (use environment variables in your hosting provider)
4. Update CORS origins to allow only your frontend domain

## Features

✓ **Context-Aware Responses** - Maintains conversation history for contextual answers
✓ **Secure** - Sensitive data handling with guardrails
✓ **Guidance-Trained** - System prompt includes comprehensive Guidance Residential information
✓ **Fallback Logic** - Falls back to local knowledge base if API is unavailable
✓ **Error Handling** - Graceful error handling with user-friendly messages

## Troubleshooting

**"Invalid API key" error:**

- Verify your API key is correctly set in `.env`
- Check that there are no extra spaces or quotes

**"Rate limit exceeded" error:**

- Wait a few moments before trying again
- Consider implementing request throttling for production

**API connection fails:**

- Ensure the server is running (`npm start`)
- Check that PORT 3001 is not blocked
- Verify CORS settings if calling from different origins
