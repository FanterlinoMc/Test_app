# Guidance Residential Chatbot - Claude API Integration ✨

Your chatbot has been successfully upgraded to use **Claude AI** for intelligent, context-aware responses!

## 📋 Quick Summary

### What Was Done

✅ **Created backend server** (`server.js`) that:

- Accepts messages from your chat widget
- Sends them to Claude API
- Returns intelligent responses with context

✅ **Updated chat widget** (`chatbot.js`) to:

- Call the Claude API backend instead of local pattern matching
- Maintain conversation history for context
- Provide better user experience

✅ **Added configuration** files:

- `package.json` - Node.js dependencies
- `.env` - Your API key (you add this)
- Setup scripts for Windows (`setup.bat`) and Mac/Linux (`setup.sh`)

✅ **Created documentation**:

- `GETTING_STARTED.md` - Quick start guide (read this first!)
- `CLAUDE_API_SETUP.md` - Detailed setup
- `CLAUDE_API_README.md` - Full documentation
- `ARCHITECTURE.md` - How everything works

## 🚀 Get Started in 3 Steps

### Step 1: Get Claude API Key (2 minutes)

1. Visit [https://console.anthropic.com](https://console.anthropic.com)
2. Sign in or create free account
3. Go to **API Keys**
4. Click **Create Key**
5. Copy the key (looks like: `sk-ant-xxxxx...`)

### Step 2: Configure Server (1 minute)

**Windows:**

- Double-click `setup.bat`
- Paste API key when prompted
- Server starts automatically

**Mac/Linux:**

```bash
chmod +x setup.sh
./setup.sh
```

**Manual:**

```bash
npm install
# Edit .env and add: ANTHROPIC_API_KEY=sk-ant-xxxxx...
npm start
```

### Step 3: Test It (1 minute)

1. Open your website
2. Click the chat bubble
3. Type: "How does Guidance work?"
4. Get an intelligent answer from Claude! 🎉

## 📁 What's New

```
✨ NEW FILES
├── server.js              # Backend server (handles Claude API)
├── package.json           # Node.js config
├── .env                   # Your API key (CREATE THIS)
├── .env.example           # Template
├── setup.bat              # Windows auto-setup
├── setup.sh               # Mac/Linux auto-setup
├── .gitignore             # Protect sensitive files
│
📚 DOCUMENTATION (READ THESE)
├── GETTING_STARTED.md     # ← Start here!
├── CLAUDE_API_SETUP.md    # Detailed setup guide
├── CLAUDE_API_README.md   # Full documentation
└── ARCHITECTURE.md        # How it all works

🔄 UPDATED FILES
└── chatbot.js             # Now calls Claude API backend
```

## 🎯 Key Features

| Feature                   | Benefit                                       |
| ------------------------- | --------------------------------------------- |
| **Intelligent Responses** | Claude understands context, not just keywords |
| **Conversation Memory**   | Bot remembers previous messages               |
| **Contextual Answers**    | Better follow-up responses                    |
| **Safe & Compliant**      | Built-in guardrails for sensitive data        |
| **Fast Deployment**       | Easy to deploy to production                  |

## 📖 Documentation Guide

**Read in this order:**

1. **GETTING_STARTED.md** ← Start here
   - Quick setup (5 minutes)
   - How to get API key
   - Troubleshooting

2. **CLAUDE_API_README.md**
   - Full features overview
   - Integration guide
   - Deployment instructions

3. **CLAUDE_API_SETUP.md**
   - Detailed technical setup
   - API reference
   - Advanced configuration

4. **ARCHITECTURE.md**
   - How system works
   - Data flow diagrams
   - Security model

## 💻 System Requirements

- **Node.js** 18.0 or higher - [Download](https://nodejs.org/)
- **Claude API Key** - [Get free](https://console.anthropic.com)
- **Modern Browser** - Chrome, Firefox, Safari, Edge

## 🔑 API Key Management

### Getting Your Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign in
3. Click **API Keys**
4. Click **Create Key**
5. **Copy immediately** (shown only once)

### Keeping It Safe

✅ **DO:**

- Store in `.env` file
- Never commit `.env` to git
- Use environment variables in production
- Rotate keys regularly

❌ **DON'T:**

- Put API key in JavaScript files
- Commit `.env` to repository
- Share with others
- Use in production URLs

## 📊 How It Works (Simple)

```
User Asks → chatbot.js → server.js → Claude API → Smart Answer
           Your browser      Your server    Anthropic's AI
```

**With Context:**

- Claude remembers previous messages
- Provides relevant, thoughtful responses
- Stays focused on Guidance services
- Blocks sensitive data requests

## 💰 Pricing

**Claude API Pricing:**

- **Free Tier:** 100K tokens per month
- **After that:** ~$3 per 1M input tokens, ~$15 per 1M output tokens
- **Per chat:** ~1-2 cents per message
- **Perfect for:** Chatbots like yours

👉 [View full pricing](https://www.anthropic.com/pricing)

## ✅ Quick Verification

Before going live:

- [ ] Node.js installed (`node -v` shows version)
- [ ] Dependencies installed (`npm install` succeeds)
- [ ] `.env` file has your Claude API key
- [ ] Server runs (`npm start` works)
- [ ] Website loads
- [ ] Chat responds (not pattern-matched)

## 🆘 If Something Goes Wrong

**"Cannot find module" error:**

```bash
npm install
```

**"Invalid API key" error:**

- Check `.env` file
- Verify key from console.anthropic.com
- No extra spaces around key

**"Server won't start" error:**

- Is Node.js installed? (`node -v`)
- Is port 3001 in use? (Change in `.env`)

**More help:**

- See `GETTING_STARTED.md` - Troubleshooting section
- Check server logs in terminal for error messages

## 🌍 Production Deployment

When ready to go live:

1. Choose hosting (Heroku, Vercel, AWS, etc.)
2. Set environment variables
3. Deploy the code
4. Update API URL in chatbot.js

See `CLAUDE_API_README.md` for deployment examples.

## 📚 Learning Resources

- **Claude Documentation:** https://docs.anthropic.com
- **API Reference:** https://docs.anthropic.com/en/api
- **Anthropic Blog:** https://www.anthropic.com/research
- **Support:** https://console.anthropic.com/help

## 🎓 What You Can Do Now

Your chatbot can now:

✨ **Understand Natural Language** - "How much down payment?" not just exact phrases

✨ **Provide Context** - "Based on what we discussed about your situation..."

✨ **Answer Follow-ups** - "Tell me more about rates" remembers rate discussion

✨ **Stay Compliant** - System prompt ensures safety guardrails

✨ **Scale Easily** - Backend handles load, easy to deploy

## 🔄 File Changes Summary

### What Changed

- `chatbot.js` - Removed local pattern matching, added API calls
- Chat now much more intelligent and context-aware
- Conversation history maintained automatically

### What Stayed the Same

- Same chat UI and design
- Same styling and appearance
- Same website structure
- Fully backward compatible

## 📞 Support

- **Setup Help:** See `GETTING_STARTED.md`
- **Technical Details:** See `ARCHITECTURE.md`
- **API Questions:** Check https://docs.anthropic.com
- **Code Issues:** Review error messages in terminal/console

## 🎉 Next Steps

1. ✅ Read `GETTING_STARTED.md` (5 min)
2. ✅ Get Claude API key (2 min)
3. ✅ Run setup script (1 min)
4. ✅ Test the chatbot (1 min)
5. ✅ Deploy to production (optional)

---

## 📖 Documentation Quick Links

| Document                 | Purpose                  | Time   |
| ------------------------ | ------------------------ | ------ |
| **GETTING_STARTED.md**   | Start here, quick setup  | 5 min  |
| **CLAUDE_API_README.md** | Full feature guide       | 10 min |
| **CLAUDE_API_SETUP.md**  | Detailed technical setup | 15 min |
| **ARCHITECTURE.md**      | Understanding the system | 10 min |

---

**Ready to get started?** → Open `GETTING_STARTED.md` now! 🚀

Your Guidance chatbot is now powered by Claude AI - providing intelligent, context-aware answers to your customers! 🎉
