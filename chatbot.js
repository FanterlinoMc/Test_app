/* =========================================================
   GUIDANCE HOME SERVICES — AI CHATBOT WIDGET
   Knowledge-base driven assistant with compliance guardrails
   ========================================================= */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     KNOWLEDGE BASE — sourced from chatbot knowledge spec
  ---------------------------------------------------------- */
  const KB = [
    /* ── WHAT IS GUIDANCE ── */
    {
      patterns: [
        "what is guidance",
        "who is guidance",
        "tell me about guidance",
        "what does guidance do",
        "about guidance",
      ],
      response: `**Guidance Residential** is the largest provider of Shariah-compliant home financing in the U.S. Over 24 years, they've provided more than **$10 billion** in home financing to over **40,000 families** across 30+ states, holding nearly **80% market share** in U.S. Islamic home financing.

Headquartered in Reston, Virginia, Guidance Financial Group operates three entities:
- **Guidance Residential** — home financing (the core product)
- **Guidance Home Services** — realtor matching (you're here now)
- **Guidance Investments** — Shariah-compliant investment products

How can I help you today?`,
    },

    /* ── HOW THE PROGRAM WORKS ── */
    {
      patterns: [
        "how does the program work",
        "how does it work",
        "explain the program",
        "how does guidance work",
        "how does financing work",
        "what is the program",
        "declining balance",
        "co-ownership",
        "co ownership",
      ],
      response: `Guidance's program is a **co-ownership partnership** — not a loan. Here's how it works:

1. **You and Guidance become co-owners** of the property, each in proportion to what you contribute. Put down 20% → you own 20%, Guidance owns 80%.
2. Each month, your payment has **two parts**: an *Acquisition Payment* (buying more of Guidance's share) and a *Profit Payment* (for use of the full property).
3. As your share grows, the Profit portion shrinks and the Acquisition portion grows — but your **total monthly payment stays constant**.
4. At the end of the term (15, 20, or 30 years), **you own 100%**.

This structure means no interest (riba) is paid between borrower and lender — because there is no borrower and lender, only co-owners. Would you like to learn how this differs from a conventional mortgage?`,
    },

    /* ── DIFFERENCE FROM CONVENTIONAL MORTGAGE ── */
    {
      patterns: [
        "different from",
        "difference between",
        "vs mortgage",
        "versus mortgage",
        "compare",
        "regular mortgage",
        "conventional mortgage",
        "regular loan",
        "how is it different",
      ],
      response: `The core difference is the **legal structure**. A conventional mortgage is a loan — you borrow money and pay it back with interest. Guidance's program is a **co-ownership partnership**.

Key differentiators:
- **Co-ownership** — Both parties own a stake. Partner-to-partner, not creditor-to-debtor.
- **Riba-free** — No interest paid. The Profit Payment is for use of property, not borrowed money.
- **Risk sharing** — If property is lost, proceeds are split by ownership share.
- **No prepayment penalty** — Pay ahead of schedule anytime.
- **Capped late fees** — $50 or less (not the standard 5% penalty).
- **Non-recourse** — In default, Guidance does not pursue your other assets.

Would you like to speak with an Account Executive about your specific situation?`,
    },

    /* ── IS IT HALAL / SHARIAH COMPLIANT ── */
    {
      patterns: [
        "is it halal",
        "is this halal",
        "really halal",
        "shariah compliant",
        "shariah-compliant",
        "islamic finance",
        "is it haram",
        "regular mortgage in disguise",
        "just a mortgage",
        "riba",
        "interest",
      ],
      response: `This is an important question, and Guidance takes it seriously.

The program is overseen by a **Shariah Supervisory Board of seven globally recognized Islamic scholars**, chaired by **Justice (Ret.) Muhammad Taqi Usmani** — who also chairs the AAOIFI Shariah Board and is one of the most respected authorities in modern Islamic finance.

The Board has issued formal **fatwas** on the program's overall structure. The key point: this is **Diminishing Musharakah** (co-ownership), not a loan. There is no interest (riba) paid between borrower and lender — because there is no borrower and lender, only co-owners.

For your personal situation, I'd encourage you to consult a scholar you trust. The published fatwas are available at guidanceresidential.com/islamic-finance-scholars-ruling-fatwa.`,
    },

    /* ── SHARIAH BOARD ── */
    {
      patterns: [
        "shariah board",
        "scholars",
        "who oversees",
        "who approved",
        "fatwa",
        "fatwas",
        "taqi usmani",
        "usmani",
      ],
      response: `Guidance's **Shariah Supervisory Board** includes seven globally recognized scholars:

- **Justice (Ret.) M. Taqi Usmani** *(Chairman)* — President of Dar Al Uloom Karachi; Chairman of AAOIFI Shariah Board
- **Shaykh Nizam Yaquby** — Leading expert in modern Islamic finance; PhD in Islamic Law
- **Dr. Mohamad A. Elgari** — Former Professor, King Abdulaziz University; OIC Jurisprudence Academy
- **Dr. Mohd. Daud Bakar** — Former Chairman, Malaysian Central Bank Shariah Advisory Council
- **Shaykh Yusuf Talal DeLorenzo** — Leading Islamic finance authority in the United States
- **Dr. Muhammad Imran Ashraf Usmani** — Vice President, Darul Uloom Karachi

The Board has issued formal fatwas on the program's structure. I can't interpret Islamic law myself — for your specific situation, please consult a qualified scholar or review the published rulings at guidanceresidential.com/islamic-finance-scholars-ruling-fatwa.`,
    },

    /* ── DOWN PAYMENT ── */
    {
      patterns: [
        "down payment",
        "how much down",
        "downpayment",
        "how much do i need",
        "minimum down",
        "percent down",
        "5%",
        "20%",
        "3%",
      ],
      response: `Down payment requirements depend on your situation:

- **Primary residence:** As low as **5%** — and in some cases qualified buyers may put down as little as **3%**
- **Investment property:** Minimum **20%**
- **Second home:** Requirements vary

The exact amount depends on your credit profile, property type, and contract length. An Account Executive can give you a precise number once they understand your scenario.

Ready to find out what you qualify for? The online Pre-Qualification takes about **10 minutes** and requires **no credit check**. Would you like the link?`,
    },

    /* ── PRE-QUALIFICATION ── */
    {
      patterns: [
        "pre-qualification",
        "pre qualification",
        "prequalification",
        "pre-qualify",
        "prequalify",
        "qualify",
        "eligible",
        "eligibility",
        "how do i start",
        "get started",
        "how to apply",
        "can i apply",
      ],
      response: `Getting started is simple with **Pre-Qualification**:

- Takes less than **10 minutes** to complete online
- **No credit check required**
- Provides estimates on your affordability based on the information you provide

After you pre-qualify, you'll be assigned a licensed **Account Executive** who will guide you through the home financing process, answer questions, and help you get pre-approved.

Eligibility depends on a number of factors that an Account Executive reviews individually — I can't determine eligibility through chat. Ready to start? You can pre-qualify at **guidanceresidential.com**.`,
    },

    /* ── APPLICATION TO CLOSING TIMELINE ── */
    {
      patterns: [
        "how long",
        "timeline",
        "closing",
        "how fast",
        "days to close",
        "45 days",
        "30 days",
        "time to close",
        "how many days",
      ],
      response: `The timeline varies case by case:

- **Average:** ~45 days from application to closing
- **Expedited:** As fast as 30 days, depending on third-party vendor timeliness, your responsiveness, and your credit profile

The closing itself takes **1–2 hours** of paperwork signing. Your Account Executive will guide you through each step and provide a closing cost estimate in advance.

Would you like to get pre-qualified to start the clock?`,
    },

    /* ── RATES ── */
    {
      patterns: [
        "rate",
        "rates",
        "profit rate",
        "interest rate",
        "what rate",
        "current rate",
        "how much is the rate",
        "monthly payment",
        "payment amount",
        "how much per month",
        "cost",
      ],
      response: `Rates depend on several factors — property type, down payment, contract length, and current market conditions.

I can't quote a specific rate from here, but **live rates for all contract types** are published at guidanceresidential.com/islamic-home-financing-rates.

For a personalized estimate based on your specific situation, an **Account Executive** is the right person to speak with. Would you like me to share the pre-qualification link? It takes about 10 minutes and doesn't require a credit check.`,
      guardrail: true,
    },

    /* ── FINANCING OPTIONS ── */
    {
      patterns: [
        "what types",
        "financing options",
        "what do you offer",
        "loan types",
        "products",
        "refinance",
        "refinancing",
        "purchase",
        "what can i finance",
        "condo",
        "townhome",
        "investment property",
      ],
      response: `Guidance offers a full range of Shariah-compliant home financing options:

**Purchase Financing**
- Fixed and adjustable rates
- 30, 20, and 15-year contracts
- Conforming and Conforming Jumbo

**Refinancing**
- Same term and rate options as purchase

**Property Types**
- Single family homes, condominiums, townhomes, planned unit developments (PUDs), and 2–4 unit properties

**Occupancy Types**
- Owner-occupied (primary), second home, and investment property

Would you like to know more about any specific option?`,
    },

    /* ── FIND A REAL ESTATE AGENT ── */
    {
      patterns: [
        "real estate agent",
        "find an agent",
        "realtor",
        "agent",
        "home services",
        "guidance home services",
        "ghs",
        "help finding a home",
      ],
      response: `That's exactly what **Guidance Home Services** does — and you're already here!

We match homebuyers with **pre-screened local real estate experts** who understand Shariah-compliant financing and the Guidance process. The service is **completely free**.

The typical flow:
1. Get pre-qualified with Guidance Residential
2. We connect you with a vetted agent in your area
3. Your agent helps you find the right home — all the way through closing

Ready to get matched? You can schedule a consultation or reach out through this site. Would you like help with either the agent matching or the pre-qualification first?`,
    },

    /* ── CONNECT WITH ACCOUNT EXECUTIVE ── */
    {
      patterns: [
        "account executive",
        "speak to someone",
        "talk to someone",
        "contact",
        "call",
        "phone number",
        "phone",
        "connect me",
        "human",
        "advisor",
        "speak to advisor",
        "866",
        "speak with",
      ],
      response: `I'd be happy to connect you with a licensed **Account Executive**!

There are a few ways to reach Guidance Residential:

- **Phone (new inquiries):** 1-866-GUIDANCE (1-866-484-3262)
- **Phone (existing customers):** 1-888-839-4043
- **Online Pre-Qualification:** guidanceresidential.com — takes 10 minutes, no credit check, and an AE will follow up

After you complete Pre-Qualification, a licensed Account Executive is assigned to you personally to guide you through the entire process.

Is there anything else I can explain while you're here?`,
    },

    /* ── DOCUMENTS NEEDED ── */
    {
      patterns: [
        "documents",
        "what do i need",
        "paperwork",
        "checklist",
        "documentation",
        "what documents",
      ],
      response: `Documentation requirements vary based on your individual situation.

For the **complete, up-to-date list** of required documents, visit the Application Checklist at:
**guidanceresidential.com/islamic-home-financing-checklist**

Once you pre-qualify, your assigned Account Executive will walk you through exactly what's needed for your specific case.

Would you like to start with the Pre-Qualification first?`,
    },

    /* ── THREE ISLAMIC FINANCE MODELS ── */
    {
      patterns: [
        "musharakah",
        "ijara",
        "murabaha",
        "islamic finance models",
        "types of islamic",
        "other islamic",
        "diminishing",
        "diminishing musharakah",
        "partnership",
      ],
      response: `There are three main Islamic home financing structures in the U.S.:

1. **Musharakah (Co-ownership)** — Used by Guidance. You and the financier are co-owners; you gradually buy out their stake. Considered the most authenticated form of Islamic home financing.

2. **Ijara (Lease-to-own)** — The financier purchases the property and you rent it. A portion of each payment builds toward future ownership; you take title at lease end.

3. **Murabaha (Cost-plus sale)** — The financier buys the property and resells it to you at a marked-up price, payable in installments. Less common in U.S. residential financing.

Guidance uses **Diminishing Musharakah** because it has been deemed by leading Islamic scholars as the best option for home financing — it preserves your full ownership rights from day one while embedding genuine risk-sharing.`,
    },

    /* ── STATES / LOCATIONS ── */
    {
      patterns: [
        "what states",
        "which states",
        "where do you operate",
        "locations",
        "available in",
        "do you serve",
        "my state",
        "licensed",
      ],
      response: `Guidance Residential currently operates in **30+ U.S. states** and is licensed in **34 states**.

To check whether your specific state is covered, visit the full list at:
**guidanceresidential.com/licensed-us-locations**

If you share your state, I can confirm whether Guidance operates there — though I can't make underwriting promises beyond confirming operation. An Account Executive can give you state-specific details.`,
    },

    /* ── CLOSING PROCESS ── */
    {
      patterns: [
        "closing process",
        "how does closing work",
        "what happens at closing",
        "closing costs",
      ],
      response: `Here's what to expect at closing:

1. **Get inspections done** — hire a licensed home inspector and any specialty inspectors needed
2. **Arrange closing costs** — your Account Executive will provide a cost estimate; bring a cashier's check or arrange a wire transfer
3. **Avoid new debt** — don't make large purchases or take on new debt during this period
4. **Sign paperwork** — the closing itself takes 1–2 hours

Your Account Executive walks you through each step and is available to answer questions throughout the process.

Is there anything specific about closing you'd like to understand better?`,
    },

    /* ── APP / MOBILE ── */
    {
      patterns: [
        "app",
        "mobile app",
        "gios",
        "application app",
        "ios app",
        "android app",
        "download",
      ],
      response: `Guidance offers mobile apps for both homeowners and agents:

**For Homeowners (giOS):**
- iOS: Search "gios for homeowners" on the App Store (ID: 1346767378)
- Android: Search "com.guidance.customerapp" on Google Play

**For Real Estate Agents (GHS Referral App):**
- iOS: App Store ID 1644740792
- Android: Search "com.guidancehomeservices.app" on Google Play

Is there anything else I can help you with?`,
    },

    /* ── INVESTMENTS (ROUTE AWAY) ── */
    {
      patterns: [
        "investment",
        "investments",
        "sukuk",
        "reit",
        "fund",
        "guidance investments",
        "accredited investor",
        "fixed income",
      ],
      response: `Investment products are handled by **Guidance Investments** — a separate entity from Guidance Home Services.

Guidance Investments offers SEC-registered, Shariah-compliant fixed-income and alternative investment products for accredited investors.

For accurate information, please visit: **guidanceinvestments.com**

For home financing or agent matching (which is what we do here), I'm happy to help with that. What would you like to know?`,
      guardrail: true,
    },

    /* ── CAR / AUTO FINANCING ── */
    {
      patterns: [
        "car",
        "auto",
        "vehicle",
        "car financing",
        "auto loan",
        "personal loan",
        "business loan",
      ],
      response: `Guidance Residential focuses specifically on **Shariah-compliant home financing** — that's our specialty.

For other types of Islamic financing (auto, personal, business), other Islamic financial institutions in the U.S. specialize in those products.

If you're looking at home financing or finding a real estate agent, I'm here to help. Would you like to learn more about how Guidance's home financing program works?`,
    },

    /* ── GREETINGS ── */
    {
      patterns: [
        "hello",
        "hi",
        "hey",
        "good morning",
        "good afternoon",
        "salam",
        "assalamu",
        "salaam",
      ],
      response: `Assalamu alaikum and welcome to Guidance! I can help you:

- Understand Shariah-compliant home financing
- Learn how the co-ownership program works
- Find a real estate agent through Guidance Home Services
- Connect you with a licensed Account Executive

What can I help you with today?`,
    },

    /* ── APPROVAL / ELIGIBILITY (GUARDRAIL) ── */
    {
      patterns: [
        "will i be approved",
        "am i eligible",
        "do i qualify",
        "will i qualify",
        "can i get approved",
        "approval",
        "approve me",
      ],
      response: `Eligibility depends on a number of factors that a licensed Account Executive reviews individually — it's not something I'm able to determine through chat.

The good news: you can find out quickly by completing the **online Pre-Qualification**:
- Takes about **10 minutes**
- **No credit check** required
- An Account Executive follows up to walk you through next steps

Ready to get started at guidanceresidential.com?`,
      guardrail: true,
    },

    /* ── SSN / SENSITIVE INFO (COMPLIANCE CRITICAL) ── */
    {
      patterns: [
        "ssn",
        "social security",
        "account number",
        "bank account",
        "routing number",
        "credit card",
        "password",
      ],
      response: `Please don't share that information here — chat isn't a secure channel for sensitive personal data, and we don't store or process it through this interface.

To complete a secure application, please use the encrypted form at:
**guidanceresidential.com/my/pre-qualify/apply-now**

It takes about 10 minutes and a licensed Account Executive will follow up with you afterward. Would you like me to share the direct link?`,
      guardrail: true,
    },
  ];

  /* ----------------------------------------------------------
     QUICK REPLIES
  ---------------------------------------------------------- */
  const INITIAL_QUICK_REPLIES = [
    "How does the program work?",
    "What's the process?",
    "Connect me with an Account Executive",
  ];

  /* ----------------------------------------------------------
     CONVERSATION STATE
  ---------------------------------------------------------- */
  let conversationHistory = [];

  /* ----------------------------------------------------------
     SYSTEM PROMPT FOR CLAUDE
  ---------------------------------------------------------- */
  const SYSTEM_PROMPT = `You are a knowledgeable and warm assistant for Guidance Home Services and Guidance Residential, a Shariah-compliant home financing company in the United States. Your role is to help prospective homebuyers and real estate agents understand the Guidance program, get connected with the right people, and take the next steps toward homeownership.

About Guidance: Guidance Residential is the largest provider of Shariah-compliant home financing in the U.S. Over 24 years, they have provided more than $10 billion in financing to over 40,000 families across 30+ states, holding nearly 80% market share. Headquartered in Reston, Virginia. Part of Guidance Financial Group: Guidance Residential (home financing), Guidance Home Services (realtor matching), Guidance Investments (investment products).

How the Program Works (Diminishing Musharakah co-ownership, NOT a loan): You and Guidance become co-owners in proportion to your contribution. Monthly payments have two parts: Acquisition Payment (buying Guidance's share) and Profit Payment (for use of property). Total monthly payment stays constant. At end of term you own 100%. No riba — no borrower-lender relationship, only co-owners.

Shariah Compliance: Overseen by 7-member Shariah Supervisory Board chaired by Justice (Ret.) Muhammad Taqi Usmani. Formal fatwas published at guidanceresidential.com/islamic-finance-scholars-ruling-fatwa.

Down Payments: Primary residence as low as 5% (sometimes 3%). Investment property minimum 20%. Second home varies.

Pre-Qualification: Online at guidanceresidential.com. ~10 minutes, no credit check. Account Executive assigned after.

Timeline: ~45 days average, as fast as 30 days. Closing takes 1-2 hours.

Financing: Purchase and refinancing. 15, 20, 30-year terms. Fixed and adjustable rates. Single family, condos, townhomes, PUDs, 2-4 unit properties. Primary, second home, investment property.

Contact: New inquiries 1-866-GUIDANCE (1-866-484-3262). Existing customers 1-888-839-4043. guidanceresidential.com.

States: 30+ states, licensed in 34. Full list at guidanceresidential.com/licensed-us-locations.

COMPLIANCE GUARDRAILS — always follow:
1. Never quote specific rates — direct to guidanceresidential.com/islamic-home-financing-rates.
2. Never determine eligibility — direct to pre-qualification.
3. Never discuss Guidance Investments — direct to guidanceinvestments.com.
4. Never accept sensitive info (SSN, bank accounts) — direct to guidanceresidential.com/my/pre-qualify/apply-now.
5. Never make personal Islamic legal rulings — suggest consulting a scholar.

Tone: Greet with "Assalamu alaikum" for Islamic greetings. Warm, professional, concise. Bold key terms and numbers.`;

  /* ----------------------------------------------------------
     API ENGINE - CALL SERVER-SIDE CLAUDE PROXY
  ---------------------------------------------------------- */
  function normalizeChatApiUrl(value) {
    if (!value || typeof value !== "string") return null;
    const trimmed = value.trim().replace(/\/+$/, "");
    if (!trimmed) return null;
    return trimmed.endsWith("/api/chat") ? trimmed : `${trimmed}/api/chat`;
  }

  function getChatApiUrl() {
    const configured = normalizeChatApiUrl(window.GUIDANCE_CHAT_API_URL);
    if (configured) return configured;

    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.protocol === "file:";

    return isLocal ? "http://localhost:3001/api/chat" : null;
  }

  async function getClaudeResponse(input) {
    const apiUrl = getChatApiUrl();

    if (!apiUrl) {
      console.warn("No Claude backend configured — using local knowledge base.");
      return findResponse(input);
    }

    try {
      const historyForApi = conversationHistory.slice();
      const latest = historyForApi[historyForApi.length - 1];
      if (latest?.role === "user" && latest.content === input) {
        historyForApi.pop();
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          conversationHistory: historyForApi,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return data.message || "";
    } catch (error) {
      console.warn("Claude backend error, falling back to local KB:", error.message);
      return findResponse(input);
    }
  }

  /* ----------------------------------------------------------
     FALLBACK: LOCAL MATCH ENGINE (if API unavailable)
  ---------------------------------------------------------- */
  function findResponse(input) {
    const text = input.toLowerCase().trim();

    // Scan SSN / sensitive data first — highest priority guardrail
    const ssnPattern = /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/;
    if (ssnPattern.test(text)) {
      return KB.find((k) => k.patterns.includes("ssn")).response;
    }

    let best = null;
    let bestScore = 0;

    for (const entry of KB) {
      let score = 0;
      for (const pattern of entry.patterns) {
        if (text.includes(pattern)) {
          score += pattern.split(" ").length; // prefer longer matches
        }
      }
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    }

    return best
      ? best.response
      : `An Account Executive can give you the most accurate answer on that. Would you like me to connect you, or share the Pre-Qualification link? You can also call **1-866-GUIDANCE** (1-866-484-3262) directly.`;
  }

  /* ----------------------------------------------------------
     WIDGET HTML
  ---------------------------------------------------------- */
  function buildWidget() {
    const wrapper = document.createElement("div");
    wrapper.id = "guidance-chat-root";

    wrapper.innerHTML = `
      <!-- Trigger Bubble -->
      <button class="chat-bubble" id="chatBubble" aria-label="Open chat assistant">
        <span class="badge">1</span>
        <svg class="bubble-chat" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <svg class="bubble-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <!-- Chat Panel -->
      <div class="chat-panel" id="chatPanel" role="dialog" aria-label="Guidance AI Assistant">

        <!-- Header -->
        <div class="chat-header">
          <div class="chat-header-logo">
            <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
              <path d="M6 14L14 7L22 14V22H17V17H11V22H6V14Z" fill="#071d47"/>
            </svg>
          </div>
          <div class="chat-header-info">
            <div class="chat-header-name">Chat with Guidance</div>
            <div class="chat-header-status"><span class="status-dot"></span> Online · Typically replies instantly</div>
          </div>
          <button class="chat-header-close" id="chatClose" aria-label="Close chat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- Compliance bar -->
        <div class="chat-compliance">
          Equal Housing Lender · NMLS #2908 · Information is general and not a commitment to finance
        </div>

        <!-- Messages -->
        <div class="chat-messages" id="chatMessages"></div>

        <!-- Quick replies -->
        <div class="chat-quick-replies" id="chatQuickReplies"></div>

        <!-- Input -->
        <div class="chat-input-bar">
          <textarea class="chat-textarea" id="chatInput" placeholder="Ask about home financing…" rows="1" aria-label="Message"></textarea>
          <button class="chat-send" id="chatSend" aria-label="Send message" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(wrapper);
  }

  /* ----------------------------------------------------------
     RENDER HELPERS
  ---------------------------------------------------------- */
  function formatTime() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Very simple markdown-like renderer (bold, lists, links)
  function renderText(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\n\n/g, "<br><br>")
      .replace(/\n- /g, "<br>• ")
      .replace(/\n(\d+)\. /g, (_, n) => `<br>${n}. `)
      .replace(/\n/g, "<br>");
  }

  function appendMessage(role, text, messagesEl) {
    const msg = document.createElement("div");
    msg.classList.add("msg", `msg--${role}`);
    msg.innerHTML = `
      <div class="msg-bubble">${renderText(text)}</div>
      <div class="msg-time">${formatTime()}</div>
    `;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return msg;
  }

  function showTyping(messagesEl) {
    const el = document.createElement("div");
    el.classList.add("msg", "msg--bot");
    el.id = "typingIndicator";
    el.innerHTML = `<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById("typingIndicator");
    if (el) el.remove();
  }

  function renderQuickReplies(chips, onSelect) {
    const container = document.getElementById("chatQuickReplies");
    container.innerHTML = "";
    chips.forEach((label) => {
      const btn = document.createElement("button");
      btn.className = "quick-chip";
      btn.textContent = label;
      btn.addEventListener("click", () => {
        container.innerHTML = "";
        onSelect(label);
      });
      container.appendChild(btn);
    });
  }

  /* ----------------------------------------------------------
     INIT
  ---------------------------------------------------------- */
  function init() {
    buildWidget();

    const bubble = document.getElementById("chatBubble");
    const panel = document.getElementById("chatPanel");
    const closeBtn = document.getElementById("chatClose");
    const messagesEl = document.getElementById("chatMessages");
    const input = document.getElementById("chatInput");
    const sendBtn = document.getElementById("chatSend");
    let opened = false;

    /* Toggle open/close */
    function openChat() {
      bubble.classList.add("open");
      panel.classList.add("open");
      input.focus();

      if (!opened) {
        opened = true;
        // Show greeting after brief delay
        setTimeout(() => {
          appendMessage(
            "bot",
            `Assalamu alaikum and welcome to Guidance! I can help you understand Shariah-compliant home financing, walk through our process, or connect you with an Account Executive.

What can I help you with today?`,
            messagesEl,
          );

          setTimeout(() => {
            renderQuickReplies(INITIAL_QUICK_REPLIES, sendUserMessage);
          }, 300);
        }, 400);
      }
    }

    function closeChat() {
      bubble.classList.remove("open");
      panel.classList.remove("open");
    }

    bubble.addEventListener("click", () => {
      if (panel.classList.contains("open")) closeChat();
      else openChat();
    });
    closeBtn.addEventListener("click", closeChat);

    /* Send message flow */
    async function sendUserMessage(text) {
      if (!text.trim()) return;

      // Clear quick replies
      document.getElementById("chatQuickReplies").innerHTML = "";

      // Show user message
      appendMessage("user", text, messagesEl);

      // Add to conversation history
      conversationHistory.push({ role: "user", content: text });

      input.value = "";
      input.style.height = "auto";
      sendBtn.disabled = true;

      // Show typing
      showTyping(messagesEl);

      try {
        // Get response from Claude API
        const reply = await getClaudeResponse(text);

        removeTyping();
        appendMessage("bot", reply, messagesEl);

        // Add bot response to conversation history
        conversationHistory.push({ role: "assistant", content: reply });

        // Keep conversation history manageable (last 20 messages)
        if (conversationHistory.length > 20) {
          conversationHistory = conversationHistory.slice(-20);
        }

        // Offer contextual follow-up chips
        const followUps = getFollowUps(text);
        if (followUps.length) {
          setTimeout(() => renderQuickReplies(followUps, sendUserMessage), 200);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        removeTyping();
        appendMessage(
          "bot",
          "Sorry, I encountered an error. Please try again.",
          messagesEl,
        );
      }
    }

    /* Follow-up chip logic */
    function getFollowUps(input) {
      const t = input.toLowerCase();
      if (t.includes("program") || t.includes("work") || t.includes("co-own")) {
        return [
          "How is it different from a regular mortgage?",
          "Is it really halal?",
          "How much down payment do I need?",
        ];
      }
      if (t.includes("halal") || t.includes("shariah") || t.includes("riba")) {
        return [
          "Who is on the Shariah Board?",
          "What types of financing do you offer?",
          "Connect me with an Account Executive",
        ];
      }
      if (t.includes("rate") || t.includes("payment") || t.includes("cost")) {
        return [
          "What is the pre-qualification process?",
          "How long does closing take?",
          "Connect me with an Account Executive",
        ];
      }
      if (t.includes("agent") || t.includes("realtor")) {
        return [
          "How does the co-ownership program work?",
          "What is the pre-qualification process?",
        ];
      }
      return [
        "How does the program work?",
        "Connect me with an Account Executive",
      ];
    }

    /* Input handling */
    input.addEventListener("input", () => {
      sendBtn.disabled = !input.value.trim();
      // Auto-grow textarea
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 100) + "px";
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (input.value.trim()) sendUserMessage(input.value);
      }
    });

    sendBtn.addEventListener("click", () => {
      if (input.value.trim()) sendUserMessage(input.value);
    });
  }

  /* Wait for DOM */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
