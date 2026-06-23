# 🚀 Getting Started - Claude API Chatbot Integration

## What You Now Have

Your Guidance chatbot has been upgraded from pattern-matching to **Claude AI** - providing intelligent, context-aware responses!

### New Files Created

| File                   | Purpose                                  |
| ---------------------- | ---------------------------------------- |
| `server.js`            | Express server that calls Claude API     |
| `package.json`         | Node.js dependencies                     |
| `.env`                 | Your API key configuration (create this) |
| `.env.example`         | Template for .env                        |
| `setup.bat`            | Windows quick-start script               |
| `setup.sh`             | Mac/Linux quick-start script             |
| `CLAUDE_API_README.md` | Full documentation                       |
| `CLAUDE_API_SETUP.md`  | Detailed setup guide                     |

### Modified Files

| File         | Change                                                   |
| ------------ | -------------------------------------------------------- |
| `chatbot.js` | Now calls Claude API backend instead of pattern matching |

## ⚡ Quick Start (5 minutes)

### Step 1: Get Your Claude API Key

1. Go to **[https://console.anthropic.com](https://console.anthropic.com)**
2. Sign in (or create account - free tier available)
3. Click **API Keys** in the sidebar
4. Click **Create Key**
5. **Copy the key** immediately (you won't see it again)

### Step 2: Configure Environment

**Windows Users:**

1. Double-click `setup.bat`
2. Follow the prompts
3. When asked, paste your API key into `.env` file
4. The server will start automatically

**Mac/Linux Users:**

```bash
chmod +x setup.sh
./setup.sh
```

**Manual Setup:**

1. Run: `npm install`
2. Create/Edit `.env` file
3. Add: `ANTHROPIC_API_KEY=sk-ant-xxxxx...` (your key)
4. Run: `npm start`

### Step 3: Test It

1. Open your website (index.html)
2. Click the chat bubble
3. Ask: "How does Guidance work?"
4. Claude AI responds with intelligent answer!

## 🏗️ Architecture

```
Your Website (index.html)
    ↓
chatbot.js (Chat Widget)
    ↓
    ├─→ POST /api/chat
    ↓
server.js (Express)
    ↓
    └─→ Claude API
         ↓
    Returns: Context-aware response
         ↓
    Back to chatbot.js
         ↓
    User sees: Intelligent answer!
```

## 🎯 Key Improvements

| Feature              | Before              | After                          |
| -------------------- | ------------------- | ------------------------------ |
| **Response Quality** | Keyword matching    | AI-powered intelligence        |
| **Context**          | None                | Maintains conversation history |
| **Flexibility**      | Pre-defined answers | Dynamic responses              |
| **Understanding**    | Exact phrases only  | Natural language               |
| **Follow-ups**       | Generic suggestions | Contextual suggestions         |

## 🔑 What's Your API Key For?

Your Claude API key allows:

- ✅ Calling Claude AI from your server
- ✅ Processing user questions
- ✅ Returning intelligent responses
- ❌ Does NOT store user data
- ❌ Does NOT expose to frontend (kept secret on server)

## 📊 How Claude API Works

When a user asks your chatbot:

1. **User message** → Sent to server
2. **System prompt** → Claude gets context (what is Guidance, tone, guardrails)
3. **Conversation history** → Previous messages for context
4. **Claude processes** → Understands question within Guidance context
5. **Response returned** → User sees thoughtful, relevant answer

## 💰 Pricing

Claude API is **pay-as-you-go**:

- First 100K tokens free per month (trial)
- Then: ~$3 per 1M input tokens, ~$15 per 1M output tokens
- A typical chat costs 1-2 cents per message
- Perfect for chatbots!

Pricing: [anthropic.com/pricing](https://www.anthropic.com/pricing)

## 🛡️ Safety & Compliance

Built-in protections:

- ✓ No SSN collection (blocked automatically)
- ✓ Routes sensitive data to secure forms
- ✓ Stays within Guidance scope
- ✓ System prompt enforces compliance
- ✓ Conversation history limited (20 messages)

## ✅ Verification Checklist

- [ ] Node.js installed (`node -v` shows version)
- [ ] Dependencies installed (`npm install` completed)
- [ ] `.env` file created with your API key
- [ ] Server runs without errors (`npm start`)
- [ ] Website loads chatbot widget
- [ ] Chat responds (not pattern-matched, but AI!)

## 🆘 Troubleshooting

### Issue: "Cannot find module"

```bash
npm install
```

### Issue: "Invalid API key"

- Check `.env` has correct key from console.anthropic.com
- No extra spaces or quotes around key

### Issue: "Server won't start"

- Is port 3001 in use? Change in `.env`:
  ```
  PORT=3002
  ```
- Node.js installed? (`node -v`)

### Issue: Chatbot won't respond

- Is server running? (`npm start` in terminal)
- Check browser console (F12) for errors
- Verify API key in `.env`

### Issue: Slow responses

- First request might be slow (cold start)
- Subsequent requests are faster
- Normal latency: 1-3 seconds

## 📞 API Endpoint Reference

Your server provides one main endpoint:

```
POST http://localhost:3001/api/chat

Request:
{
  "message": "How does the program work?",
  "conversationHistory": []
}

Response:
{
  "success": true,
  "message": "The program is a co-ownership partnership..."
}
```

## 🚀 Next: Deploying to Production

Once you verify it works locally:

1. **Choose hosting:** Heroku, Vercel, AWS Lambda, DigitalOcean, etc.
2. **Set environment variables** on hosting platform
3. **Update API URL** in chatbot.js if different domain
4. **Update CORS** in `.env` to your domain
5. **Deploy:** `git push heroku main` (or platform equivalent)

See `CLAUDE_API_SETUP.md` for production deployment details.

## 📚 Full Documentation

- **Setup Guide:** `CLAUDE_API_SETUP.md`
- **Full README:** `CLAUDE_API_README.md`
- **Claude Docs:** https://docs.anthropic.com
- **API Console:** https://console.anthropic.com

## 🎓 Learning Resources

- **Understanding Claude:** https://www.anthropic.com/research
- **API Tutorial:** https://docs.anthropic.com/en/api/getting-started
- **Best Practices:** https://docs.anthropic.com/en/docs/build-a-prototype

## 💡 Tips for Best Results

1. **Be specific in questions** → "How does the co-ownership program work?" (better than "tell me about it")
2. **Use follow-up messages** → Claude remembers conversation context
3. **Test different phrasings** → See how Claude adapts
4. **Monitor API usage** → Check console.anthropic.com for costs
5. **Update knowledge base** → Modify system prompt in server.js if Guidance info changes

## 🎉 You're Ready!

Your chatbot is now powered by Claude AI!

**Next steps:**

1. ✅ Get API key from console.anthropic.com
2. ✅ Run `setup.bat` or `setup.sh`
3. ✅ Add API key to `.env`
4. ✅ Start server (`npm start`)
5. ✅ Test your chatbot!

---

## Need Help?

- **Setup issues?** → Check `CLAUDE_API_SETUP.md`
- **API questions?** → https://docs.anthropic.com
- **Server not running?** → Check terminal for error messages
- **Chatbot not responding?** → Check browser console (F12)

**Happy chatting! 🚀**
