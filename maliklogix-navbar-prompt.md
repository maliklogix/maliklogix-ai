# MalikLogix Navbar — Mega Menu Implementation Prompt

> **Purpose:** Add a mega menu dropdown to the existing navbar of `maliklogix-com.vercel.app`
> without changing any existing styles, fonts, colors, layout, or design decisions.
> Only add new functionality on top of what already exists.

---

## Ground Rules (Read Before Implementing)

- **DO NOT** change any existing navbar styles, colors, fonts, spacing, or layout
- **DO NOT** rename or remove any existing nav items
- **DO NOT** touch the hero section, footer, or any other part of the site
- **DO NOT** change the teal color, typography, or button styles
- **ONLY** add a new `Services` nav item with a mega menu dropdown
- **ONLY** create new pages for each dropdown item — do not modify existing pages
- The mega menu must visually match the existing site's teal + white + navy color system
- Keep the dark mode toggle, chatbot bubble, and CTA button completely untouched

---

## Step 1 — Navbar Change (One Addition Only)

### Current navbar items (do not touch these):
```
[Home]   [Services]   [How We Work]   [Contact]   [Free AI Strategy Call →]
```

### New navbar (only change in bold):
```
[Home]   [Services]   **[Our Solutions ▾]**   [How We Work]   [Contact]   [Free AI Strategy Call →]
```

Add a single new nav item called **"Our Solutions"** with a dropdown chevron (`▾`).
Place it between the existing `Services` and `How We Work` items.
Style it identically to the other nav links (same font, same color, same uppercase letter-spacing).

---

## Step 2 — Mega Menu Dropdown Specs

### Trigger behavior:
- Opens on **hover** (desktop) and **click** (mobile/touch)
- Closes on mouse-leave or clicking outside
- Press `Escape` key also closes it
- Smooth animation: `opacity 0→1` + `translateY(-6px → 0)` over `180ms ease-out`

### Container styling (match existing site palette exactly):
```css
background: #ffffff  (or var(--background) if site uses CSS vars)
border-top: 2px solid #00B4C8  (teal accent — match site's exact teal)
box-shadow: 0 12px 40px rgba(0, 0, 0, 0.10)
border-radius: 0 0 16px 16px
width: 100vw
position: absolute, left: 0
padding: 36px 60px 40px 60px
```

### Layout:
- **4 equal columns** side by side
- Column gap: `40px`
- Each column: bold teal heading (11px, uppercase, letter-spacing 1.5px) + list of links below

### Column item styling (each link row):
```
[icon 18px]  Link Title          ← dark navy, 14px, font-weight 500
             Short description   ← muted gray (#6B7280), 12px, 1 line max
```

Hover state on each item:
```css
background: rgba(0, 180, 200, 0.07)  /* very light teal tint */
border-radius: 8px
padding: 8px 10px
transition: background 180ms ease
```

---

## Step 3 — Mega Menu Content (4 Columns)

### Column 1 — AI Marketing

**Heading:** `AI MARKETING`

| Icon | Link Title | Description | Route |
|------|-----------|-------------|-------|
| 🎯 | AI Campaign Management | Campaigns that learn and optimize weekly | `/services/ai-campaign-management` |
| 🔗 | Lead Generation AI | Capture and qualify leads automatically | `/services/lead-generation-ai` |
| 📈 | Conversion Optimization | Turn visitors into paying clients with AI | `/services/conversion-optimization` |
| 📣 | AI Ad Targeting | Precision ad delivery across platforms | `/services/ai-ad-targeting` |
| 🔁 | Funnel Automation | End-to-end sales funnel on autopilot | `/services/funnel-automation` |
| 📧 | Email Marketing AI | Smart sequences that close deals | `/services/email-marketing-ai` |

---

### Column 2 — SEO & Content

**Heading:** `SEO & CONTENT`

| Icon | Link Title | Description | Route |
|------|-----------|-------------|-------|
| 🔍 | SEO Strategy & Audits | Deep keyword research and gap analysis | `/services/seo-strategy` |
| 🤖 | GEO — AI Search Optimization | Rank inside ChatGPT and AI Overviews | `/services/geo-ai-search` |
| ✍️ | AI Content Creation | High-velocity on-brand content at scale | `/services/ai-content-creation` |
| 📝 | Blog & Article Writing | Authority content that drives organic traffic | `/services/blog-writing` |
| 🗂️ | Keyword Clustering | Group intent-based keyword maps | `/services/keyword-clustering` |
| 📊 | Content Performance Tracking | Weekly KPIs on what content converts | `/services/content-tracking` |

---

### Column 3 — Automation & Tools

**Heading:** `AUTOMATION & TOOLS`

| Icon | Link Title | Description | Route |
|------|-----------|-------------|-------|
| ⚡ | n8n Workflow Automation | Build complex multi-step AI workflows | `/services/n8n-automation` |
| 🔧 | Make.com Integrations | Visual automation across 1000+ apps | `/services/make-integrations` |
| 💬 | AI Chatbot Development | 24/7 chat trained on your business | `/services/ai-chatbots` |
| 🏪 | Shopify AI Systems | Upsell flows and AOV optimization | `/services/shopify-ai` |
| 🗃️ | CRM Automation | Auto-qualify, score, and route leads | `/services/crm-automation` |
| 🔌 | Custom API Dashboards | Connect any tool to a live data view | `/services/api-dashboards` |

---

### Column 4 — OpenClaw Platform

**Heading:** `OPENCLAW PLATFORM`

| Icon | Link Title | Description | Route |
|------|-----------|-------------|-------|
| 🧠 | OpenClaw SkillHub | Browse and install AI agent skills | `/tools/openclaw/skillhub` |
| 🤖 | Automation Skills Library | Pre-built skills for n8n and Make | `/tools/openclaw/automation` |
| 🗂️ | AI Skills Directory | All skills by category and integration | `/tools/ai-skills` |
| 🧩 | Extensions & Plugins | Extend Claude and AI agents | `/tools/openclaw/extensions` |
| 📤 | Submit a Skill | Contribute your own OpenClaw skill | `/tools/openclaw/submit` |
| 🔗 | Browse by Integration | Skills sorted by tool (Slack, HubSpot…) | `/tools/ai-skills?view=integrations` |

---

## Step 4 — Page Creation (One Page Per Menu Item)

Create a dedicated page for each of the 24 routes listed above.
Each page must follow this exact template structure:

---

### Page Template Structure

```
/app/services/[slug]/page.tsx     (or /pages/services/[slug].tsx for Pages Router)
/app/tools/[slug]/page.tsx
```

Each page uses this section layout (do not invent new design — reuse existing site components):

```
1. Hero Section
   - Page title (H1)
   - 1-line subtitle
   - 2 CTAs: "Book a Free Strategy Call →" + "View Case Studies"

2. What It Is (2-col: text left, icon/visual right)
   - 3–4 sentences explaining the service

3. How It Works (3-step process cards)
   - Step 1 / Step 2 / Step 3
   - Each with: number, bold title, 2-sentence description

4. Key Benefits (3–4 benefit cards in a row)
   - Icon + bold title + 2-line description

5. Who It's For (simple 2-col list)
   - Left: ideal client types
   - Right: problems it solves

6. Results / Metrics (dark teal bg, 3 stat cards)
   - Example: "40% increase in productivity" / "3x organic traffic" etc.

7. CTA Section
   - "Ready to get started?"
   - Primary button: "Book a Free AI Strategy Call →"
```

---

### Page Content Reference — All 24 Pages

---

#### `/services/ai-campaign-management`
**Title:** AI Campaign Management
**Subtitle:** Campaigns that learn, adapt, and optimize every single week — without manual intervention.

**What It Is:**
We build AI-driven marketing campaigns that continuously analyze performance data, adjust targeting, and reallocate budgets in real time. Instead of weekly agency reports, your campaigns improve themselves. We connect your ad platforms, CRM, and analytics into one AI loop that gets smarter over time.

**How It Works:**
1. **Audit & Setup** — We map your existing campaigns and identify performance gaps and wasted spend.
2. **AI Integration** — We connect your ad accounts to our optimization layer using n8n and custom AI models.
3. **Weekly KPI Loop** — Every week, the system reviews CAC, ROAS, and conversion data and auto-adjusts.

**Key Benefits:**
- Reduce wasted ad spend by up to 35%
- Campaigns improve week-over-week without manual input
- Full transparency — live dashboard with every metric
- Works across Google, Meta, LinkedIn, and TikTok

**Who It's For:**
- DTC brands spending $5k+/month on ads
- SaaS companies with long sales cycles
- Agencies managing multiple client ad accounts

**Results:**
- 34% reduction in CAC within 60 days
- 2.8x ROAS improvement in first quarter
- 0 hours per week of manual optimization

---

#### `/services/lead-generation-ai`
**Title:** Lead Generation AI
**Subtitle:** Capture, qualify, and route high-intent leads automatically — 24/7.

**What It Is:**
Our AI lead generation system identifies your ideal customers online, captures their intent signals, and automatically qualifies them before they ever speak to your team. We build multi-channel funnels powered by AI forms, chatbots, and CRM automation that fill your pipeline while you sleep.

**How It Works:**
1. **ICP Definition** — We define your ideal customer profile and build AI scoring criteria.
2. **Funnel Build** — Landing pages, chatbots, and lead magnets are deployed and connected.
3. **Auto-Qualify & Route** — Leads are scored, tagged, and routed to the right team member instantly.

**Key Benefits:**
- Cut lead response time from hours to under 15 minutes
- Only speak to qualified, high-intent prospects
- Automatic follow-up sequences that never drop a lead
- CRM sync with HubSpot, Salesforce, or any tool

**Who It's For:**
- B2B companies with a defined sales process
- Agencies and consultancies
- Any business spending time manually qualifying leads

**Results:**
- 9-step nurture sequence, zero manual follow-up
- 3x more qualified meetings booked per month
- 2 enterprise deals closed that would have been lost

---

#### `/services/conversion-optimization`
**Title:** Conversion Optimization
**Subtitle:** Turn more of your existing visitors into paying clients using AI-driven testing.

**What It Is:**
Getting traffic is only half the battle. We use AI-powered A/B testing, heatmaps, and behavioral analytics to find exactly where visitors drop off and fix it. From landing page copy to checkout flow, every element is tested and optimized with data — not guesswork.

**How It Works:**
1. **Audit** — Full funnel analysis: where are users leaving and why?
2. **Hypothesis & Test** — AI generates and prioritizes test variants based on behavioral data.
3. **Scale Winners** — Winning variants are deployed and the loop continues.

**Key Benefits:**
- Increase conversion rate without increasing ad spend
- Data-backed decisions, not gut feelings
- Works on landing pages, product pages, and checkout flows
- Integrates with your existing analytics stack

**Who It's For:**
- E-commerce brands with traffic but poor conversion
- SaaS companies optimizing free-to-paid conversion
- Any business running paid traffic

**Results:**
- 28% increase in Shopify AOV after AI upsell flow
- 2.1x conversion rate improvement in 90 days
- Setup completed in under 2 weeks

---

#### `/services/ai-ad-targeting`
**Title:** AI Ad Targeting
**Subtitle:** Reach the exact right people at the exact right time — powered by machine learning.

**What It Is:**
We build custom audience models using your first-party data, lookalike modeling, and AI-powered intent signals to deliver your ads to people most likely to convert. We manage targeting across Google, Meta, LinkedIn, and programmatic networks with one unified AI layer.

**How It Works:**
1. **Data Audit** — We analyze your existing customer data to build predictive audience models.
2. **Targeting Architecture** — Audiences are segmented by intent, stage, and lifetime value.
3. **Continuous Refinement** — AI updates audiences weekly based on what's converting.

**Key Benefits:**
- Reduce wasted impressions by targeting only high-intent audiences
- Lookalike modeling finds new customers similar to your best ones
- Cross-platform audience sync — one model, all channels
- Weekly performance reporting with actionable insights

**Who It's For:**
- Brands with $10k+/month in ad spend
- Companies with existing customer data to train models on
- Businesses frustrated with platform-native targeting

**Results:**
- 47% improvement in audience match rate
- 3.2x return on ad spend improvement
- 60% reduction in cost per qualified lead

---

#### `/services/funnel-automation`
**Title:** Funnel Automation
**Subtitle:** Build a sales funnel that runs itself — from first click to closed deal.

**What It Is:**
We design and automate your entire sales funnel using AI workflows, smart email sequences, and real-time lead scoring. Every touchpoint — from ad click to discovery call to onboarding — is mapped, automated, and optimized so your team only spends time on deals that are ready to close.

**How It Works:**
1. **Funnel Mapping** — We document every stage and identify manual bottlenecks.
2. **Automation Build** — n8n or Make.com workflows are built to handle every transition.
3. **Optimization Loop** — Weekly data review identifies and fixes drop-off points.

**Key Benefits:**
- Zero leads fall through the cracks
- Sales team only speaks to warm, qualified prospects
- Full funnel visibility in one live dashboard
- Works with any CRM or email platform

**Who It's For:**
- SaaS companies with multi-touch sales cycles
- Agencies and service businesses
- E-commerce brands with complex post-purchase flows

**Results:**
- 9-step nurture fully automated, zero manual steps
- 40% reduction in time-to-close
- 2 enterprise deals closed that would have been missed

---

#### `/services/email-marketing-ai`
**Title:** Email Marketing AI
**Subtitle:** Smart email sequences that nurture, convert, and retain — without lifting a finger.

**What It Is:**
We build AI-powered email systems that send the right message to the right person at the right time. Using behavioral triggers, dynamic content, and AI-written copy, your email list becomes a revenue engine that runs automatically — whether you have 500 or 500,000 subscribers.

**How It Works:**
1. **List Audit & Segmentation** — We clean and segment your list by behavior, intent, and lifecycle stage.
2. **Sequence Build** — Welcome flows, nurture sequences, win-back campaigns, and transactional emails.
3. **AI Optimization** — Subject lines, send times, and content are continuously A/B tested by AI.

**Key Benefits:**
- 3–5x higher open rates with AI-personalized subject lines
- Behavioral triggers that send emails based on what users do
- Automated revenue flows — abandoned cart, upsell, re-engagement
- Works with Klaviyo, ActiveCampaign, Mailchimp, or any ESP

**Who It's For:**
- E-commerce brands with an email list
- SaaS companies with free trial users to convert
- Coaches, consultants, and info-product businesses

**Results:**
- Organic traffic tripled in under 3 months
- Email revenue increased 65% with no new subscribers
- Zero hours per week of manual email management

---

#### `/services/seo-strategy`
**Title:** SEO Strategy & Audits
**Subtitle:** Find exactly where your organic growth is hiding — and go get it.

**What It Is:**
We run deep technical and content SEO audits that identify exactly why you're not ranking and what to do about it. From crawl errors and Core Web Vitals to content gaps and backlink opportunities, we build a prioritized action plan that delivers measurable results within 90 days.

**How It Works:**
1. **Full Site Audit** — Technical, on-page, and off-page analysis across every ranking factor.
2. **Opportunity Mapping** — We identify the 20% of fixes that will deliver 80% of the results.
3. **90-Day Sprint** — Prioritized implementation with weekly check-ins and live rank tracking.

**Key Benefits:**
- Clear priority list — no overwhelm, just action
- Technical fixes that unlock ranking potential immediately
- Content gap analysis showing exactly what pages to build next
- Monthly reporting tied directly to revenue impact

**Who It's For:**
- Businesses with an existing site that isn't ranking
- Companies switching from paid to organic traffic
- Agencies needing white-label SEO strategy

**Results:**
- 47 keyword clusters identified in week one
- 12 quick-win pages prioritised and published
- First-page rankings achieved within 60 days

---

#### `/services/geo-ai-search`
**Title:** GEO — AI Search Optimization
**Subtitle:** Rank inside ChatGPT, Google AI Overviews, and Perplexity — not just traditional search.

**What It Is:**
Generative Engine Optimization (GEO) is the new frontier of search. We optimize your content and authority signals so your brand appears in AI-generated answers across ChatGPT, Google SGE, Perplexity, and Bing Copilot. This is the next evolution of SEO — and most of your competitors haven't figured it out yet.

**How It Works:**
1. **AI Citation Audit** — We test what AI tools currently say about your brand and industry.
2. **Authority Building** — We create content that AI models are trained to cite as authoritative.
3. **Monitoring & Iteration** — We track AI mentions and optimize for higher citation frequency.

**Key Benefits:**
- Appear in AI-generated answers before competitors do
- Build brand authority that both humans and AI models trust
- Future-proof your organic strategy as search evolves
- Works alongside traditional SEO, not instead of it

**Who It's For:**
- Brands that want to stay ahead of search evolution
- B2B companies where trust and authority drive decisions
- Businesses already investing in content and SEO

**Results:**
- Appearing in ChatGPT answers for 12 core keywords
- Featured in Google AI Overviews for target terms
- 3x increase in branded search volume in 90 days

---

#### `/services/ai-content-creation`
**Title:** AI Content Creation
**Subtitle:** High-velocity, on-brand content at scale — without sacrificing quality.

**What It Is:**
We build custom AI content systems trained on your brand voice, target audience, and industry expertise. The result is a content engine that produces blog posts, social content, email copy, landing pages, and more — at 10x the speed of traditional content creation, with quality that reflects your expertise.

**How It Works:**
1. **Brand Voice Training** — We train AI models on your existing content, tone, and style guides.
2. **Content Architecture** — We build a content calendar and topic cluster strategy.
3. **Production & QA** — Content is produced, reviewed, and published on your schedule.

**Key Benefits:**
- 10x content output without hiring more writers
- Consistent brand voice across every piece
- Built-in SEO optimization for every article
- Human review layer ensures quality and accuracy

**Who It's For:**
- Businesses that need consistent content but lack the team
- Agencies managing content for multiple clients
- Founders who know content matters but have no time

**Results:**
- Organic traffic tripled in under 3 months
- 30+ pieces of content published per month
- Content system set up and running in 2 weeks

---

#### `/services/blog-writing`
**Title:** Blog & Article Writing
**Subtitle:** Authority content that builds trust, drives organic traffic, and converts readers.

**What It Is:**
We produce long-form blog posts and articles that rank in search, establish your expertise, and move readers toward a buying decision. Every piece is researched, SEO-optimized, and written to reflect your brand's authority — not generic AI fluff.

**How It Works:**
1. **Topic Research** — We identify high-intent topics with real search volume and low competition.
2. **Writing & Optimization** — Every article is written with target keywords, proper structure, and internal linking.
3. **Publish & Track** — We handle publishing and track rankings and traffic for every piece.

**Key Benefits:**
- Articles that rank on Google and drive consistent traffic
- Builds domain authority over time
- Converts readers into leads with strategic CTAs
- Full editorial calendar managed for you

**Who It's For:**
- Businesses investing in long-term organic growth
- SaaS companies building thought leadership
- Service businesses needing to educate before selling

**Results:**
- 12 blog posts in first month, 8 on page 1 within 90 days
- 40% of inbound leads now come from organic blog traffic
- Newsletter audience grew 3x from blog-driven traffic

---

#### `/services/keyword-clustering`
**Title:** Keyword Clustering
**Subtitle:** Group search intent into content clusters that dominate entire topic areas.

**What It Is:**
Keyword clustering is the strategy of grouping related keywords by search intent to build content that ranks for dozens of related terms — not just one. We use AI tools to build comprehensive keyword maps that tell you exactly what to write, how to structure it, and which pages to build first for maximum impact.

**How It Works:**
1. **Seed Keyword Research** — We start with your core topics and expand into hundreds of related terms.
2. **Intent Clustering** — Keywords are grouped by user intent: informational, navigational, transactional.
3. **Content Map Delivery** — You receive a prioritized spreadsheet of clusters and page recommendations.

**Key Benefits:**
- Rank for entire topic categories, not just single keywords
- Clear content roadmap removes guesswork
- Identifies quick-win opportunities with existing content
- Foundation for a content strategy that compounds over time

**Who It's For:**
- Businesses starting a content strategy from scratch
- Companies with existing content that isn't ranking
- Agencies building SEO strategies for clients

**Results:**
- 47 keyword clusters identified in first week
- 3x increase in organic keyword footprint in 6 months
- Quick-win pages ranking within 30 days

---

#### `/services/content-tracking`
**Title:** Content Performance Tracking
**Subtitle:** Know exactly which content is driving revenue — and scale what works.

**What It Is:**
Most businesses have no idea which blog posts or pages actually drive revenue. We build custom content analytics dashboards that track every piece of content from first click to closed deal — connecting Google Analytics, Search Console, and your CRM into one live performance view.

**How It Works:**
1. **Analytics Audit** — We audit your current tracking setup and identify gaps.
2. **Dashboard Build** — A custom live dashboard is built showing rankings, traffic, leads, and revenue by content piece.
3. **Weekly Review** — We review performance every week and recommend what to update or create next.

**Key Benefits:**
- Know exactly which content generates revenue
- Weekly insights delivered without you pulling reports
- Connects search data directly to CRM outcomes
- Stops wasted content spend on topics that don't convert

**Who It's For:**
- Businesses investing in content and wanting proof of ROI
- Marketing teams reporting to a revenue-focused leadership
- Agencies needing client-facing content reporting

**Results:**
- Identified top 20% of pages driving 80% of leads
- Cut content production waste by 40%
- CAC reduced 34% by cutting underperforming channels

---

#### `/services/n8n-automation`
**Title:** n8n Workflow Automation
**Subtitle:** Build powerful, self-running workflows that replace hours of manual work every week.

**What It Is:**
n8n is the most powerful open-source workflow automation tool available. We use it to build custom workflows that connect your apps, automate repetitive tasks, and create intelligent multi-step AI processes. From lead routing to report generation, n8n handles it without code or ongoing maintenance.

**How It Works:**
1. **Workflow Audit** — We map your current manual processes and identify automation opportunities.
2. **Build & Test** — Custom n8n workflows are built, tested, and connected to your existing tools.
3. **Deploy & Monitor** — Workflows go live with monitoring, error alerts, and documentation.

**Key Benefits:**
- Replace 10–20 hours/week of manual work per employee
- Self-hosted option keeps your data private and secure
- Connect 400+ apps including Slack, HubSpot, Google Workspace
- Scales as your business grows without per-task fees

**Who It's For:**
- Operations teams drowning in manual, repetitive tasks
- Agencies automating client reporting and delivery
- SaaS companies with complex onboarding workflows

**Results:**
- Lead response time cut from 4 hours to under 15 minutes
- 9-step nurture sequence automated end-to-end
- 2 enterprise deals closed that would have been lost

---

#### `/services/make-integrations`
**Title:** Make.com Integrations
**Subtitle:** Visual, drag-and-drop automation across 1,000+ apps — built for your exact workflow.

**What It Is:**
Make.com (formerly Integromat) is the leading visual automation platform. We design and build Make scenarios that connect your entire tech stack — from your CRM and email platform to AI models and custom APIs. Perfect for businesses that want powerful automation with a visual interface they can understand.

**How It Works:**
1. **Stack Mapping** — We document all the tools you use and identify where data needs to flow between them.
2. **Scenario Design** — Visual workflows are designed and built with error handling and data transformation.
3. **Testing & Handover** — Every scenario is fully tested and documented so your team understands it.

**Key Benefits:**
- Connect any combination of apps without code
- Visual interface makes automation easy to understand and edit
- Handles complex data transformation and conditional logic
- 1,000+ integrations available out of the box

**Who It's For:**
- Businesses using multiple SaaS tools that don't talk to each other
- Teams that want to maintain and edit automations themselves
- Companies needing rapid integration between new tools

**Results:**
- 15 manual workflows automated in first month
- Reporting time reduced from 4 hours to 20 minutes weekly
- Zero integration costs for tools that already have Make connectors

---

#### `/services/ai-chatbots`
**Title:** AI Chatbot Development
**Subtitle:** A 24/7 AI assistant that knows your business, qualifies leads, and never takes a day off.

**What It Is:**
We build custom AI chatbots trained on your products, services, FAQs, and brand voice. Unlike generic chat widgets, our chatbots actually understand your business context — they qualify leads, answer complex questions, book meetings, and hand off to your team at exactly the right moment.

**How It Works:**
1. **Knowledge Base Build** — We ingest your docs, FAQs, service pages, and case studies into the AI.
2. **Flow Design** — Conversation flows are mapped for every scenario: lead capture, support, booking.
3. **Deploy & Integrate** — The chatbot is deployed on your site and connected to your CRM and calendar.

**Key Benefits:**
- Respond to every visitor instantly, 24/7
- Qualify and capture leads even outside business hours
- Hands off to a human at the perfect moment with full context
- Trained on your content — not generic scripts

**Who It's For:**
- Service businesses with high inbound inquiry volume
- SaaS companies with complex onboarding questions
- E-commerce brands with frequent product questions

**Results:**
- 45% of leads now captured outside business hours
- Support ticket volume reduced 30% by chatbot self-service
- Average response time: under 3 seconds, 24/7

---

#### `/services/shopify-ai`
**Title:** Shopify AI Systems
**Subtitle:** Increase average order value and repeat purchases with AI-powered Shopify automation.

**What It Is:**
We build AI-powered upsell flows, product recommendation engines, and post-purchase automation for Shopify stores. From the moment a customer lands on your site to 90 days after purchase, every touchpoint is optimized by AI to increase revenue per customer — automatically.

**How It Works:**
1. **Store Audit** — We analyze your current conversion funnel, AOV, and post-purchase experience.
2. **AI Flow Build** — Upsell sequences, bundle recommendations, and win-back campaigns are built and connected.
3. **Launch & Optimize** — Flows go live and are optimized weekly based on performance data.

**Key Benefits:**
- Increase AOV without increasing ad spend
- Post-purchase sequences that drive repeat orders
- AI product recommendations based on purchase history
- Integrates with Klaviyo, Recharge, and all major Shopify apps

**Who It's For:**
- Shopify stores doing $50k+/month in revenue
- E-commerce brands with repeat purchase potential
- DTC companies wanting to compete with big-brand personalization

**Results:**
- Shopify AOV up 28% after AI upsell flow went live
- Setup completed in under 2 weeks
- Repeat purchase rate increased 35% in first quarter

---

#### `/services/crm-automation`
**Title:** CRM Automation
**Subtitle:** Automatically qualify, score, and route every lead so your team closes — not chases.

**What It Is:**
We build custom AI lead scoring and CRM automation systems that tell your sales team exactly which prospects to call first. Every lead is automatically enriched, scored based on intent signals, tagged by product interest, and routed to the right person — the moment they enter your pipeline.

**How It Works:**
1. **CRM Audit** — We review your current CRM setup and identify where leads are falling through.
2. **Scoring Model** — An AI lead scoring model is built using your historical conversion data.
3. **Automation Build** — Triggers, sequences, and routing rules are deployed in your CRM.

**Key Benefits:**
- Sales team only calls leads most likely to close
- No lead ever goes cold due to slow follow-up
- Automatic CRM enrichment from LinkedIn, Apollo, and more
- Works with HubSpot, Salesforce, Pipedrive, or any CRM

**Who It's For:**
- B2B companies with a dedicated sales team
- Agencies managing lead flow for multiple service lines
- SaaS companies with long sales cycles

**Results:**
- Lead scoring system tells team exactly which prospects to call
- Pipeline velocity increased 50% in first 60 days
- Zero leads dropped in transition between stages

---

#### `/services/api-dashboards`
**Title:** Custom API Dashboards
**Subtitle:** Connect every tool you use into one live performance dashboard built for your business.

**What It Is:**
We build custom API-connected dashboards that pull data from your ad accounts, CRM, analytics, email platform, and more into a single real-time view. Instead of logging into 10 different tools every morning, your entire business performance is visible in one place — updated automatically.

**How It Works:**
1. **Data Audit** — We map every tool and metric you currently track across different platforms.
2. **Dashboard Architecture** — A custom dashboard is designed for your specific KPIs and team.
3. **API Connections & Build** — Every data source is connected via API and visualized in real time.

**Key Benefits:**
- Full business overview in one tab, updated in real time
- No more manual data exports or spreadsheet merging
- Custom alerts when key metrics drop below threshold
- Built to scale — add new data sources anytime

**Who It's For:**
- Marketing and ops teams spending hours on manual reporting
- Agencies managing multiple clients and channels
- Founders who want one source of truth for business performance

**Results:**
- Reporting time reduced from 6 hours to 15 minutes weekly
- Dashboard alone worth the retainer — client quote
- CAC, ROAS, and conversion tracked in one live view

---

#### `/tools/openclaw/skillhub`
**Title:** OpenClaw SkillHub
**Subtitle:** Browse, install, and deploy AI agent skills — built for real business automation.

**What It Is:**
SkillHub is MalikLogix's curated library of AI agent skills for OpenClaw. Each skill is a pre-built, plug-and-play capability that extends what your AI agents can do — from web research and lead enrichment to CRM updates and content generation. Think of it as an app store for AI automation.

**How It Works:**
1. **Browse the Library** — Filter skills by use case, integration, or category.
2. **Install in One Click** — Skills are deployed directly into your OpenClaw environment.
3. **Customize & Run** — Adjust parameters to match your workflow and let the agent do the rest.

**Key Benefits:**
- 100+ pre-built skills ready to deploy
- No code required — install and run in minutes
- Built by the MalikLogix team, tested in real client environments
- New skills added weekly based on community requests

**Who It's For:**
- Businesses already using AI agents for automation
- Developers building custom AI workflows
- Marketing and ops teams wanting to expand AI capability

---

#### `/tools/openclaw/automation`
**Title:** Automation Skills Library
**Subtitle:** Pre-built n8n and Make.com skills that automate your most repetitive workflows.

**What It Is:**
Our Automation Skills Library is a collection of ready-to-use workflow templates and AI-enhanced automation skills for n8n and Make.com. Each skill is documented, tested, and built to solve a specific business problem — from lead enrichment to invoice processing to social posting.

**How It Works:**
1. **Browse by Workflow Type** — Find skills by category: marketing, operations, sales, reporting.
2. **Download & Import** — Each skill comes with a ready-to-import n8n or Make.com template.
3. **Configure & Deploy** — Update credentials and parameters, then activate your workflow.

**Key Benefits:**
- Skip the build phase — deploy tested workflows in hours
- Each skill includes documentation and setup guide
- Compatible with n8n self-hosted and cloud, and Make.com
- Community ratings and usage stats help you pick the best skill

---

#### `/tools/ai-skills`
**Title:** AI Skills Directory
**Subtitle:** Every OpenClaw skill, organized by category, integration, and use case.

**What It Is:**
The AI Skills Directory is the complete, searchable index of all MalikLogix OpenClaw skills. Browse by category (Marketing, SEO, Automation, Sales), by integration (Slack, HubSpot, Airtable, Notion), or by use case (lead gen, content, reporting). Find exactly the skill you need in seconds.

**How It Works:**
1. **Search or Browse** — Use the search bar or category filters to find relevant skills.
2. **Read the Skill Brief** — Each skill page shows what it does, what tools it requires, and how to install it.
3. **Install or Request** — Deploy directly or submit a request for a custom skill build.

**Key Benefits:**
- Largest curated AI skills library for business automation
- Filter by tool, industry, or use case
- Community-contributed skills alongside official MalikLogix builds
- Free tier available — no subscription required to browse

---

#### `/tools/openclaw/extensions`
**Title:** Extensions & Plugins
**Subtitle:** Extend the capabilities of Claude and other AI agents with purpose-built plugins.

**What It Is:**
OpenClaw Extensions are purpose-built plugins that add new capabilities to AI models like Claude. From real-time web access and CRM lookup to document analysis and calendar integration — extensions turn your AI assistant into a fully capable business operator.

**How It Works:**
1. **Browse Extensions** — Find extensions by capability: search, data, communication, analysis.
2. **Authorize & Connect** — Each extension connects to your tools via OAuth or API key.
3. **Activate in Your Agent** — Enable the extension in your OpenClaw agent config and it's ready.

**Key Benefits:**
- Give your AI agent real-world capabilities beyond chat
- Works with Claude, GPT-4, and most major AI models
- Extensions are sandboxed and secure — no data stored
- New extensions built monthly based on user requests

---

#### `/tools/openclaw/submit`
**Title:** Submit a Skill
**Subtitle:** Built something useful? Share it with the MalikLogix community and earn recognition.

**What It Is:**
The OpenClaw community grows through contributions. If you've built an AI skill, workflow template, or automation that others would benefit from, submit it to SkillHub. Our team reviews every submission, and the best ones are featured in the directory and promoted to our 10,000+ newsletter subscribers.

**How It Works:**
1. **Package Your Skill** — Document what it does, what tools it requires, and how to set it up.
2. **Submit via Form** — Fill in the submission form with your skill details and files.
3. **Review & Publish** — Our team reviews within 5 business days and publishes approved skills.

**Key Benefits:**
- Get your work in front of 10,000+ business owners and developers
- Featured submissions receive a dedicated newsletter mention
- Build a public portfolio of AI automation work
- Earn affiliate revenue if your skill is used by paid members

---

#### `/tools/ai-skills?view=integrations`
**Title:** Browse by Integration
**Subtitle:** Find AI skills built specifically for the tools you already use.

**What It Is:**
Instead of searching by category, browse OpenClaw skills by the tool they integrate with. Whether you're using Slack, HubSpot, Notion, Airtable, Google Workspace, or a custom API — we have skills built and tested for your exact stack.

**How It Works:**
1. **Pick Your Tool** — Select from 100+ supported integrations in the directory.
2. **Browse Skills for That Tool** — See every skill that works with your chosen integration.
3. **Install & Configure** — Each skill page has a one-click install and setup guide.

**Key Benefits:**
- Find the right skill without knowing its category name
- Covers 100+ popular business tools and platforms
- Each integration page shows community ratings and usage count
- Request new integrations directly from the integration page

---

## Step 5 — Mobile Mega Menu (Responsive)

On screens below 768px:
- The `Our Solutions` nav item collapses into the hamburger menu
- Inside the hamburger, `Our Solutions` becomes an accordion item with `▾` chevron
- Tapping it expands a stacked list of all 4 column headings
- Each heading is also expandable, showing the items beneath it
- No horizontal columns on mobile — everything is vertical and full-width
- All other mobile nav behavior remains identical to the current site

---

## Step 6 — Implementation Notes

### Recommended file structure additions:
```
/app
  /our-solutions           ← optional: redirect to first service
/services
  /ai-campaign-management/page.tsx
  /lead-generation-ai/page.tsx
  /conversion-optimization/page.tsx
  /ai-ad-targeting/page.tsx
  /funnel-automation/page.tsx
  /email-marketing-ai/page.tsx
  /seo-strategy/page.tsx
  /geo-ai-search/page.tsx
  /ai-content-creation/page.tsx
  /blog-writing/page.tsx
  /keyword-clustering/page.tsx
  /content-tracking/page.tsx
  /n8n-automation/page.tsx
  /make-integrations/page.tsx
  /ai-chatbots/page.tsx
  /shopify-ai/page.tsx
  /crm-automation/page.tsx
  /api-dashboards/page.tsx
/tools
  /openclaw
    /skillhub/page.tsx
    /automation/page.tsx
    /extensions/page.tsx
    /submit/page.tsx
  /ai-skills/page.tsx      ← supports ?view=integrations query param
```

### Accessibility requirements:
- Mega menu items must be keyboard-navigable with `Tab`
- `Escape` key closes the dropdown and returns focus to trigger
- `aria-expanded` attribute toggles on the trigger element
- `role="menu"` on the dropdown container
- `role="menuitem"` on each link
- Focus trap within open mega menu on keyboard navigation

### Performance:
- Lazy-load mega menu content (it is not in the initial viewport)
- Images on service pages should use `next/image` with lazy loading
- Each service page should have its own `metadata` export for SEO

---

## Deliverables Checklist

- [ ] New `Our Solutions` nav item added with matching style
- [ ] Mega menu dropdown with 4 columns implemented
- [ ] All 24 service/tool pages created with full content
- [ ] Mobile responsive accordion behavior working
- [ ] Keyboard accessibility and ARIA attributes implemented
- [ ] No existing navbar styles, pages, or components modified
- [ ] Dark mode toggle and chatbot bubble untouched
- [ ] CTA button `Free AI Strategy Call →` untouched
- [ ] Each service page has correct `metadata` for SEO
- [ ] All routes resolve without 404 errors

---

*This document covers Navbar + Mega Menu + All 24 Pages only.*
*Hero, footer, and other section changes are covered in separate prompts.*
