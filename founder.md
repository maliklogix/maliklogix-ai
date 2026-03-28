CURRENT STATE:
The site at maliklogix.com has a "Learn" dropdown in the navigation. 
It currently has no "The Founder" link or founder page.

DESIRED STATE:
1. Add "The Founder" as a link in the Learn dropdown nav, pointing to /founder
2. Create a new page at /founder with the full layout described below

DO NOT break any existing pages, navigation items, styles, or functionality.
DO NOT change the existing nav structure beyond adding the one new link.
DO NOT use a dark theme on any existing pages — the founder page uses dark 
theme only because it is its own standalone page.

DESIGN TOKENS (match live site):
- Existing site: white #ffffff background, text #111111, accent cyan #0ABDE3, 
  borders #e5e5e5, black buttons
- Founder page: dark theme (#0d1117 bg) is intentional and isolated to /founder only

---

PAGE: /founder
FILE: app/founder/page.tsx (or pages/founder.tsx depending on your router)

PHOTO:
- Accept a prop or use a local image at /public/founder-photo.jpg
- Display as 240×240px, border-radius: 20px, with a 2px solid rgba(10,189,227,0.3) border
- Fallback: initials "MF" in a cyan gradient box if no image

---

SECTION 1 — HERO
Left column:
  - Badge: "THE FOUNDER" in small caps with a pulsing cyan dot
  - H1: "Malik" line break "Farooq" — "Farooq" in cyan (#0ABDE3)
  - Role: "AI Specialist — E-commerce AI Solutions"
  - Location line with pin icon: "Lahore, Pakistan · BS Computer Science — University of Sargodha"
  - Description: "I build AI systems that actually ship — agentic pipelines, RAG 
    architectures, and e-commerce automation engines that drive real business 
    outcomes. Founder of MalikLogix, an AI-first digital marketing and automation agency."
  - CTA buttons row:
      Primary (cyan bg): "Get in Touch" → mailto:hello@maliklogix.com
      Ghost: "malikfarooq.com" → https://malikfarooq.com (new tab)
      Ghost: "GitHub" icon → https://github.com/maliklogix (new tab)

Right column:
  - Founder photo (240×240, styled as above)
  - Status card below photo (dark card, green dot):
      "Available for Collaboration"
      "Currently building: Agentic AI & e-commerce automation systems"

---

SECTION 2 — STATS BAR (full width, dark card bg)
Four stats in a row with dividers:
  7+   → AI Domains
  159+ → Published Articles
  50+  → Automation Builds
  3+   → Years in AI

---

SECTION 3 — EXPERTISE GRID
Label: "CORE SKILLS"
Title: "Areas of Expertise"
3-column grid of 9 cards, each with emoji icon, title, short description:

1. 🤖 Agentic AI Systems
   LLM orchestration, multi-agent architectures, autonomous pipelines.

2. 📚 RAG Pipelines
   Retrieval-augmented generation — vector stores, semantic search, grounded AI.

3. 🛒 E-commerce AI
   Lead scoring models, product recommendation engines, customer analytics.

4. ⚡ n8n & AI Automation
   Workflow automation — APIs, triggers, and AI logic in production flows.

5. 📊 Predictive Analytics
   ML pipelines for forecasting, conversion prediction, data-driven decisions.

6. 🔬 Prompt Engineering & R&D
   Advanced prompt design, evaluation frameworks, applied LLM research.

7. 📈 AI Digital Marketing
   GEO, SEO, AI-powered content engines for organic growth and qualified leads.

8. 🗄️ Data Engineering
   Dashboard development, pipeline architecture, ETL for marketing analytics.

9. 🏪 Shopify Development
   AI-enhanced Shopify builds — automation, custom apps, growth engineering.

Each card: dark bg, 1px border, hover lifts 2px, top border accent (cyan) 
animates in on hover using scaleX transform.

---

SECTION 4 — CURRENTLY WORKING ON
Label: "RIGHT NOW"
Title: "What I'm Working On"
3-column card grid:

Card 1 — Tag: BUILDING (cyan)
  Title: Agentic AI & E-commerce Automation
  Body: Designing systems that autonomously handle order ops, customer 
  workflows, and marketing decisions for online businesses.

Card 2 — Tag: LEARNING (green)
  Title: Multi-agent & Multi-modal AI
  Body: Exploring advanced architectures where multiple AI agents collaborate 
  across text, data, and visual modalities.

Card 3 — Tag: OPEN TO (amber)
  Title: Collaborations
  Body: Looking to collaborate on AI, e-commerce automation, and agentic AI 
  projects with founders and technical teams.

---

SECTION 5 — THE MALIKLOGIX JOURNEY (Timeline)
Label: "BACKGROUND"
Title: "The MalikLogix Journey"

Vertical timeline with left border line and cyan dots:

● Foundation
  BS Computer Science — University of Sargodha
  Built a strong foundation in CS, algorithms, and software engineering. 
  First exposure to machine learning sparked a deep interest in applied AI.

● Early Career
  Diving into AI & Automation
  Started building automation workflows and exploring LLMs in practical 
  contexts. Realized most businesses had untapped potential AI could unlock.

● Pivot
  Founding MalikLogix
  Launched MalikLogix as an AI-first digital agency at the intersection of 
  agentic systems, e-commerce, and growth automation.

● Today
  AI Specialist — Lahore, Pakistan
  Building RAG pipelines, agentic systems, and e-commerce AI solutions 
  globally. 150+ published articles. Always shipping, always iterating.

---

SECTION 6 — TECH STACK
Label: "TECH STACK"
Title: "Tools & Technologies"
Pill list (flex-wrap):
Python, Next.js, n8n, LangChain, OpenAI / Claude APIs, Pinecone / Weaviate,
Prisma + MariaDB, Shopify, Make.com, Tailwind CSS, React, Hugging Face,
Supabase, Sanity.io, Vercel / Hostinger

Pills: dark card bg, 1px border, cyan dot on left, hover: cyan border

---

SECTION 7 — CONTACT / CONNECT
Label: "CONNECT"
Title: "Get In Touch"
4-column card grid:

1. Email icon      → hello@maliklogix.com      (mailto link)
2. GitHub icon     → github.com/maliklogix     (new tab)
3. Twitter/X icon  → twitter.com/maliklogix    (new tab — update handle if different)
4. Globe icon      → malikfarooq.com           (new tab)

Each card: dark bg, hover lifts + cyan border

---

PAGE FOOTER (within /founder only):
Left: "© 2025 Malik Farooq · MalikLogix · Lahore, Pakistan"
Right: Cyan CTA button "Request a Free Audit →" linking to /contact

---

STYLING RULES FOR THIS PAGE:
- Background: #0d1117 (dark, isolated to this page)
- Cards: #13181f
- Borders: #1e2732
- Text: #e6edf3
- Muted text: #8b949e
- Accent: #0ABDE3
- Fonts: 'Space Grotesk' for headings, 'DM Sans' for body
- Heading sizes: H1 52px/700, section titles 32px/700
- All cards: 12px border-radius, 1px border, hover transitions
- The page nav should still show the MalikLogix top nav bar

PHOTO IMPLEMENTATION NOTE:
When Malik uploads a photo to /public/founder-photo.jpg, replace the 
initials fallback with:
<Image src="/founder-photo.jpg" alt="Malik Farooq" width={240} height={240} 
  style={{borderRadius:'20px', border:'2px solid rgba(10,189,227,0.3)'}} />