# Guidance Chatbot - Claude API Integration

Your chatbot has been enhanced to use Claude API for intelligent, context-aware responses instead of simple pattern matching.

## 🎯 What Changed

**Before:**

- Static knowledge base with keyword pattern matching
- Limited to pre-defined responses
- No conversation context

**After:**

- Claude AI provides intelligent responses
- Understands context and nuance
- Maintains conversation history
- More natural and helpful interactions

## 📁 Project Structure

```
Guidance/
├── server.js                    # Express server + Claude API integration
├── package.json                 # Node.js dependencies
├── .env                         # API configuration (CREATE THIS - see below)
├── .env.example                 # Template for .env
├── .gitignore                   # Git ignore rules
├── chatbot.js                   # Updated chat widget (calls backend API)
├── chatbot.css                  # Chat UI styles
├── index.html                   # Main page
├── CLAUDE_API_SETUP.md         # Detailed setup guide
├── CLAUDE_API_README.md        # This file
└── setup.bat                    # Windows quick-start script
```

## 🚀 Quick Start (Windows Users)

1. **Double-click `setup.bat`** - This will:
   - Install Node.js dependencies
   - Create `.env` file
   - Start the server

2. **Configure API Key:**
   - Get your key from [https://console.anthropic.com/api_keys](https://console.anthropic.com/api_keys)
   - Open `.env` file
   - Replace `your_api_key_here` with your actual API key
   - Restart the server

3. **Open your website** - The chatbot will now use Claude API!

## 🚀 Quick Start (Mac/Linux Users)

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.example .env

# 3. Edit .env and add your Claude API key
# Get key from: https://console.anthropic.com/api_keys
nano .env  # or use your preferred editor

# 4. Start the server
npm start
```

## 🔑 Getting Your Claude API Key

1. Go to [https://console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in to your Anthropic account
3. Navigate to the **API Keys** section
4. Click **Create Key**
5. Copy the API key immediately (you won't see it again)
6. Paste it into your `.env` file

## 📋 Configuration

Edit `.env` to customize:

```bash
# Your Claude API key (required)
ANTHROPIC_API_KEY=sk-ant-xxxxx...

# Server port (default: 3001)
PORT=3001

# Environment (development or production)
NODE_ENV=development

# Frontend origins allowed to call the API
CORS_ORIGIN=http://localhost:3000,file://
```

## 🛠️ Development

### Start Development Server (with auto-reload)

```bash
npm run dev
```

### Production Build

```bash
npm start
```

## 🎓 How It Works

```
User Types → chatbot.js → /api/chat → Claude API → Response
                          ↓                         ↓
                        server.js            Provides intelligent
                                             context-aware answer
```

### System Prompt

The server includes a comprehensive system prompt that:

- Provides Claude with Guidance Residential information
- Sets safety guardrails (sensitive data, scope limits)
- Instructs routing to appropriate resources
- Maintains brand voice and compliance

## 🔒 Safety & Compliance

The chatbot has built-in safeguards:

- ✓ **No SSN Collection** - Detects and blocks SSN patterns
- ✓ **Sensitive Data Protection** - Routes users to secure forms for personal data
- ✓ **Scope Management** - Stays focused on Guidance's services
- ✓ **Rate Limiting** - Handles API errors gracefully
- ✓ **CORS Protection** - Only allows configured origins

## 📞 API Reference

### Chat Endpoint

```
POST /api/chat
```

**Request:**

```json
{
  "message": "How does the program work?",
  "conversationHistory": []
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

### Health Check

```
GET /health
```

Returns `{ "status": "ok", "timestamp": "..." }`

## 📊 Conversation History

The chatbot maintains conversation history automatically:

- Includes user and assistant messages
- Limited to last 20 messages to manage API costs
- Provides context for follow-up questions
- Cleared when chat widget is closed

## 🚨 Troubleshooting

### "Cannot find module '@anthropic-ai/sdk'"

```bash
npm install
```

### "ANTHROPIC_API_KEY is not configured"

- Edit `.env` file
- Add your actual API key (from console.anthropic.com)
- Restart the server

### "Port 3001 already in use"

- Close other applications using port 3001, or
- Change PORT in `.env` to a different number (e.g., 3002)

### API returns 401 "Invalid API key"

- Verify your API key is correct in `.env`
- Check for extra spaces or special characters
- Generate a new key if uncertain

### Chatbot shows "trouble connecting to AI service"

- Verify server is running (`npm start`)
- Check browser console for error messages
- Ensure API URL is correct in chatbot.js

## 📈 Usage Tips

1. **For better responses:** Provide context about what you're asking
2. **Multi-turn conversations:** The bot remembers previous messages
3. **Quick replies:** Use the suggested chips for common questions
4. **Escalation:** Bot suggests Account Executive contact when appropriate

## 🔄 Integration with Your Website

The chatbot widget is loaded via `chatbot.js` in your HTML files. It:

1. Loads automatically on page load
2. Creates a floating chat bubble
3. Calls `http://localhost:3001/api/chat` when user sends messages
4. Falls back to local knowledge base if API is unavailable

## 📦 Deployment

For production deployment:

1. **Host the server** (Heroku, Vercel, AWS, DigitalOcean, etc.)
2. **Update API_BASE_URL in chatbot.js** to your production server
3. **Set environment variables** on your hosting platform
4. **Update CORS_ORIGIN** to your production domain

### Heroku Example

```bash
# Login to Heroku
heroku login

# Create new app
heroku create your-app-name

# Set environment variables
heroku config:set ANTHROPIC_API_KEY=your_key_here

# Deploy
git push heroku main
```

## 💡 Features

✨ **Intelligent Responses** - Claude understands nuance and context
📚 **Knowledge Base** - Trained on comprehensive Guidance info
🔄 **Conversation Memory** - Maintains context across messages
🛡️ **Safety Guardrails** - Protects against sensitive data collection
⚡ **Fast Responses** - Real-time API calls with typing indicator
📱 **Responsive Design** - Works on mobile and desktop

## 📝 License & Support

This integration uses Claude API by Anthropic. Visit:

- Claude Documentation: https://docs.anthropic.com
- API Pricing: https://www.anthropic.com/pricing
- Support: https://console.anthropic.com/help

## Questions?

Refer to:

- `CLAUDE_API_SETUP.md` for detailed setup instructions
- Server logs for debugging (`npm start` shows logs)
- Anthropic documentation for Claude-specific questions

---

**Next Steps:**

1. ✅ Install dependencies (`npm install`)
2. ✅ Add Claude API key to `.env`
3. ✅ Start server (`npm start`)
4. ✅ Open your website and test the chatbot!
