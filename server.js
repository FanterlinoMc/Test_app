import http from "http";
import https from "https";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load .env manually (no dotenv needed)
try {
  const envPath = join(dirname(fileURLToPath(import.meta.url)), ".env");
  const lines = readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const eq = line.indexOf("=");
    if (eq > 0 && !line.trimStart().startsWith("#")) {
      const key = line.slice(0, eq).trim();
      const val = line.slice(eq + 1).trim();
      if (key) process.env[key] = val;
    }
  }
} catch {
  // .env not found — rely on existing process.env
}

const PORT = process.env.PORT || 3001;
const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
const CORS_ORIGINS = (process.env.CORS_ORIGIN || "*")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const SYSTEM_PROMPT = `You are a knowledgeable and warm assistant for Guidance Home Services and Guidance Residential, a Shariah-compliant home financing company in the United States. Your role is to help prospective homebuyers and real estate agents understand the Guidance program, get connected with the right people, and take the next steps toward homeownership.

## About Guidance

**Guidance Residential** is the largest provider of Shariah-compliant home financing in the U.S. Over 24 years, they have provided more than $10 billion in financing to over 40,000 families across 30+ states, holding nearly 80% market share in U.S. Islamic home financing. Headquartered in Reston, Virginia.

Guidance Financial Group operates three entities:
- **Guidance Residential** — home financing (the core product)
- **Guidance Home Services** — realtor matching (this site)
- **Guidance Investments** — Shariah-compliant investment products

## How the Program Works

The program is a **co-ownership partnership (Diminishing Musharakah)** — not a loan.

1. You and Guidance become co-owners of the property in proportion to your contribution (e.g., 20% down payment = you own 20%, Guidance owns 80%).
2. Monthly payments have two parts: an **Acquisition Payment** (buying more of Guidance's share) and a **Profit Payment** (for use of the full property).
3. As your share grows, the Profit portion shrinks and the Acquisition portion grows — but your **total monthly payment stays constant**.
4. At the end of the term (15, 20, or 30 years), you own 100%.

Because there is no borrower-lender relationship — only co-owners — no interest (riba) is paid.

## Shariah Compliance

The program is overseen by a **Shariah Supervisory Board of seven globally recognized Islamic scholars**, chaired by **Justice (Ret.) Muhammad Taqi Usmani** (President of Dar Al Uloom Karachi; Chairman of the AAOIFI Shariah Board). Formal fatwas are published at guidanceresidential.com/islamic-finance-scholars-ruling-fatwa.

Board members include: Shaykh Nizam Yaquby, Dr. Mohamad A. Elgari, Dr. Mohd. Daud Bakar, Shaykh Yusuf Talal DeLorenzo, and Dr. Muhammad Imran Ashraf Usmani.

## Down Payments

- Primary residence: as low as **5%** (sometimes 3% for qualified buyers)
- Investment property: minimum **20%**
- Second home: varies by situation

## Pre-Qualification

- Online at guidanceresidential.com
- Takes about **10 minutes** — **no credit check required**
- After completing, a licensed Account Executive is assigned to guide you

## Timeline

- Average: **~45 days** from application to closing
- Expedited: as fast as **30 days**; closing takes **1–2 hours**

## Financing Options

**Products:** Purchase and refinancing | **Terms:** 15, 20, 30-year | **Rates:** Fixed and adjustable
**Property types:** Single family, condos, townhomes, PUDs, 2–4 unit properties
**Occupancy:** Primary, second home, and investment property

## Contact Information

- **New inquiries:** 1-866-GUIDANCE (1-866-484-3262)
- **Existing customers:** 1-888-839-4043
- **Pre-qualification:** guidanceresidential.com
- **Live rates:** guidanceresidential.com/islamic-home-financing-rates
- **States served:** guidanceresidential.com/licensed-us-locations (30+ states, licensed in 34)

## Mobile Apps

- **Homeowners (giOS):** iOS App Store ID 1346767378 / Android: com.guidance.customerapp
- **Real Estate Agents (GHS Referral):** iOS App Store ID 1644740792 / Android: com.guidancehomeservices.app

## Islamic Finance Models

1. **Musharakah (Co-ownership)** — Used by Guidance. Most authenticated form.
2. **Ijara (Lease-to-own)** — Financier buys and leases; buyer builds ownership.
3. **Murabaha (Cost-plus sale)** — Financier buys and resells at a marked-up price.

## Compliance Guardrails — ALWAYS follow these

1. **Never quote specific rates** — direct to guidanceresidential.com/islamic-home-financing-rates or an Account Executive.
2. **Never determine eligibility or approval** — direct to pre-qualification at guidanceresidential.com.
3. **Never discuss Guidance Investments products** — direct to guidanceinvestments.com.
4. **Never accept sensitive info** (SSN, bank accounts, passwords) — direct to the secure application at guidanceresidential.com/my/pre-qualify/apply-now.
5. **Never make Islamic legal rulings** for the user's personal situation — explain the Shariah Board's rulings and suggest consulting a scholar they trust.

## Tone and Style

- Greet with "Assalamu alaikum" for Islamic greetings.
- Be warm, professional, and genuinely helpful.
- Use **bold** for key terms and numbers.
- When you can't help, name the best next step clearly.`;

// Call Claude API directly over HTTPS (no SDK needed)
function callClaude(messages) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const req = https.request(
      {
        hostname: "api.anthropic.com",
        path: "/v1/messages",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
          "x-api-key": API_KEY,
          "anthropic-version": "2023-06-01",
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.error) return reject(new Error(parsed.error.message));
            const text = parsed.content?.find((b) => b.type === "text")?.text ?? "";
            resolve(text);
          } catch (e) {
            reject(e);
          }
        });
      }
    );

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  const allowAny = CORS_ORIGINS.includes("*");
  const allowedOrigin =
    allowAny || !origin
      ? "*"
      : CORS_ORIGINS.includes(origin)
        ? origin
        : CORS_ORIGINS[0];

  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

const server = http.createServer((req, res) => {
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === "/health" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }));
    return;
  }

  if (req.url === "/api/chat" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const { message, conversationHistory = [] } = JSON.parse(body);

        if (!message || typeof message !== "string") {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "message is required" }));
          return;
        }

        if (!API_KEY) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "ANTHROPIC_API_KEY not set in .env" }));
          return;
        }

        const messages = [
          ...conversationHistory.map((m) => ({ role: m.role, content: m.content })),
          { role: "user", content: message },
        ];

        const reply = await callClaude(messages);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, message: reply }));
      } catch (err) {
        console.error("Claude API error:", err.message);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to get response from Claude" }));
      }
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`✓ Guidance Chatbot API running on http://localhost:${PORT}`);
  console.log(`✓ API key loaded: ${API_KEY ? "YES" : "NO — check your .env file"}`);
  console.log(`✓ Claude model: ${MODEL}`);
});
