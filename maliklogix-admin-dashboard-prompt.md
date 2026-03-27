# MalikLogix Admin Dashboard — `/dash` Implementation Prompt

> **Route:** `http://localhost:5173/dash`
> **Purpose:** A full extenal admin dashboard for managing all content, settings, and operations
> of the MalikLogix website — blog, services, newsletter, SEO, leads, tools, and site config.
> **Stack:** Next.js (App Router) + Tailwind CSS + shadcn/ui (matching existing site stack)
> **Access:** Protected route — only accessible when logged in as admin

---

## Ground Rules

- **DO NOT** modify any existing public-facing pages or components
- **DO NOT** change the site's design, navbar, hero, or any user-facing UI
- This dashboard lives entirely at `/dash` and its sub-routes
- Style the dashboard independently — it does not need to match the public site's teal design
- Use a clean, dark admin aesthetic (dark sidebar, white content area) — professional and functional
- All dashboard routes should be prefixed: `/dash`, `/dash/blog`, `/dash/newsletter`, etc.
- Protect all `/dash/*` routes with an auth check — redirect to `/dash/login` if not authenticated
- Use `localStorage` or a simple session cookie for auth in development

---

## Dashboard Structure Overview

```
/dash                        ← Overview / Home
/dash/login                  ← Admin login page
/dash/blog                   ← Blog post list
/dash/blog/new               ← Create new blog post
/dash/blog/[id]/edit         ← Edit existing blog post
/dash/services               ← Manage service pages content
/dash/services/[slug]/edit   ← Edit a specific service page
/dash/newsletter             ← Newsletter subscriber list + send campaign
/dash/newsletter/new         ← Compose and send new newsletter
/dash/newsletter/history     ← Past sent campaigns
/dash/leads                  ← Lead capture inbox (from contact forms)
/dash/leads/[id]             ← Individual lead detail view
/dash/seo                    ← SEO metadata editor for all pages
/dash/tools                  ← OpenClaw skills / tools management
/dash/tools/new              ← Add new OpenClaw skill entry
/dash/media                  ← Media library (images, files)
/dash/settings               ← Global site settings
/dash/settings/general       ← Site name, logo, tagline, contact info
/dash/settings/integrations  ← API keys: n8n, Make, OpenAI, Klaviyo, etc.
/dash/settings/team          ← Manage admin users
/dash/settings/appearance    ← Colors, fonts, homepage content blocks
```

---

## Step 1 — Auth & Login Page (`/dash/login`)

### Page layout:
- Centered card on a dark background
- MalikLogix logo at top
- Email + password fields
- "Sign In" button (teal, full width)
- No "forgot password" or "register" links (internal tool only)

### Auth logic:
```typescript
// Simple hardcoded admin credentials for development
// Replace with real auth (NextAuth, Clerk, etc.) in production
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@maliklogix.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'maliklogix2026'

// On successful login: set cookie or localStorage flag
// sessionStorage.setItem('ml_admin', 'true')
// Redirect to /dash
```

### Route protection:
```typescript
// middleware.ts — protect all /dash/* routes except /dash/login
export function middleware(request: NextRequest) {
  const isAdmin = request.cookies.get('ml_admin')
  const isDashRoute = request.nextUrl.pathname.startsWith('/dash')
  const isLoginPage = request.nextUrl.pathname === '/dash/login'

  if (isDashRoute && !isLoginPage && !isAdmin) {
    return NextResponse.redirect(new URL('/dash/login', request.url))
  }
}
```

---

## Step 2 — Dashboard Shell (Shared Layout)

### File: `/app/dash/layout`

All `/dash/*` pages share this layout. It must NOT affect any public routes.

### Layout structure:
```
┌─────────────────────────────────────────────────────┐
│  [Sidebar 240px]    │  [Main Content Area - flex 1] │
│                     │                               │
│  Logo               │  Top bar:                     │
│  ─────────          │    Page title  |  User avatar │
│  Nav items          │                               │
│  (with icons)       │  Page content renders here    │
│                     │                               │
│  ─────────          │                               │
│  Settings           │                               │
│  Logout             │                               │
└─────────────────────────────────────────────────────┘
```

### Sidebar nav items (with icons):
```
📊  Overview              /dash
✍️  Blog Posts            /dash/blog
🛠️  Services              /dash/services
📧  Newsletter            /dash/newsletter
📥  Leads                 /dash/leads
🔍  SEO Manager           /dash/seo
🧠  OpenClaw Tools        /dash/tools
🖼️  Media Library         /dash/media
⚙️  Settings              /dash/settings
```

### Sidebar styling:
```css
background: #0f1117   /* very dark navy */
color: #e2e8f0
active item: background #00B4C8 (teal), text white, border-radius 8px
hover item: background rgba(255,255,255,0.06)
font: 14px, font-weight 500
icon: 18px, opacity 0.7 on inactive, 1 on active
```

### Top bar:
```
Left: Current page title (20px bold, dark text)
Right: [🔔 Notifications]  [Avatar initials "MF" in teal circle]  [↪ Logout]
```

---

## Step 3 — Overview Dashboard (`/dash`)

### Layout: 3 sections

#### Section A — Stats row (4 cards):
```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Blog Posts  │  │ Subscribers  │  │  Open Leads  │  │  Services    │
│     24       │  │   10,247     │  │      8       │  │     18       │
│  +3 this mo  │  │ +142 this wk │  │  2 urgent    │  │  All active  │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

Each stat card:
- White background, subtle border, border-radius 12px
- Large number (32px bold, teal)
- Label (12px gray)
- Trend badge (green/red pill)

#### Section B — Quick Actions row:
```
[✍️ New Blog Post]  [📧 Send Newsletter]  [📥 View New Leads]  [⚙️ Site Settings]
```
Each is a teal-outlined button that navigates to the relevant section.

#### Section C — Recent Activity feed:
Show last 10 actions in a timeline list:
- "Blog post published: AI Campaign Management Guide" — 2 hours ago
- "New lead from contact form: Sarah K., USA" — 5 hours ago
- "Newsletter sent to 10,247 subscribers" — Yesterday
- "Service page updated: n8n Automation" — 2 days ago
- etc.

Use placeholder/mock data for development.

---

## Step 4 — Blog Management (`/dash/blog`)

### Blog Post List page (`/dash/blog`):

#### Top bar:
```
[Search posts...]   [Filter: All | Published | Draft | Archived ▾]   [+ New Post]
```

#### Table columns:
| Title | Category | Status | Author | Date | Actions |
|-------|----------|--------|--------|------|---------|
| AI Campaign Management Guide | AI Marketing | 🟢 Published | Malik Farooq | Mar 20, 2026 | Edit / View / Delete |
| How GEO is Replacing SEO | SEO & GEO | 🟡 Draft | Malik Farooq | Mar 18, 2026 | Edit / View / Delete |

- Status badges: green pill = Published, yellow = Draft, gray = Archived
- Clicking title or "Edit" navigates to `/dash/blog/[id]/edit`
- "View" opens the public post in a new tab
- "Delete" shows a confirmation modal before deleting
- Pagination: 20 posts per page

---

### New / Edit Blog Post (`/dash/blog/new` and `/dash/blog/[id]/edit`):

#### Layout: 2-column (editor left, settings right)

**Left column (70%) — Editor:**
```
Title input          ← large, 24px placeholder "Post title..."
Slug input           ← auto-generated from title, editable
                        /blog/[slug]

[Rich text editor]   ← use TipTap or react-quill
                        Toolbar: H1 H2 H3 | Bold Italic | Lists | Link | Image | Code
                        Min height: 500px

Excerpt textarea     ← 2-3 sentences, used for SEO meta description + cards
```

**Right column (30%) — Post Settings:**
```
┌─────────────────────────────┐
│  PUBLISH                    │
│  Status: [Draft ▾]          │
│  Visibility: [Public ▾]     │
│  Publish date: [Now / Later]│
│  [Save Draft]  [Publish →]  │
└─────────────────────────────┘

┌─────────────────────────────┐
│  CATEGORIES & TAGS          │
│  Category: [Dropdown ▾]     │
│    - AI Marketing           │
│    - SEO & Content          │
│    - Automation             │
│    - OpenClaw               │
│    - Case Studies           │
│    - Company News           │
│  Tags: [tag input with chips]│
└─────────────────────────────┘

┌─────────────────────────────┐
│  FEATURED IMAGE             │
│  [Upload / Select from      │
│   Media Library]            │
│  [Preview thumbnail]        │
└─────────────────────────────┘

┌─────────────────────────────┐
│  SEO PREVIEW                │
│  Google preview:            │
│  [Blue link title]          │
│  maliklogix.com/blog/[slug] │
│  [Gray meta description]    │
│                             │
│  Meta title: [input]        │
│  Meta desc: [textarea]      │
│  Focus keyword: [input]     │
└─────────────────────────────┘

┌─────────────────────────────┐
│  NEWSLETTER                 │
│  ☐ Also send as newsletter  │
│    to subscribers           │
└─────────────────────────────┘
```

---

## Step 5 — Services Manager (`/dash/services`)

### Service List page (`/dash/services`):

Show all 18 service pages as a grid of cards:

```
┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐
│ 🎯 AI Campaign Mgmt│  │ 🔗 Lead Generation │  │ 📈 Conversion Opt. │
│ AI Marketing       │  │ AI Marketing       │  │ AI Marketing       │
│ 🟢 Published       │  │ 🟢 Published       │  │ 🟡 Draft           │
│ Last edit: Mar 20  │  │ Last edit: Mar 18  │  │ Last edit: Mar 15  │
│ [Edit] [Preview]   │  │ [Edit] [Preview]   │  │ [Edit] [Preview]   │
└────────────────────┘  └────────────────────┘  └────────────────────┘
```

Group cards by column category:
- AI Marketing (6 pages)
- SEO & Content (6 pages)
- Automation & Tools (6 pages)
- OpenClaw Platform (6 pages)

---

### Edit Service Page (`/dash/services/[slug]/edit`):

Each service page has these editable fields:

```
┌─────────────────────────────────────────────────────┐
│  PAGE: AI Campaign Management                       │
│  Route: /services/ai-campaign-management            │
└─────────────────────────────────────────────────────┘

Hero Section:
  Title:          [input — "AI Campaign Management"]
  Subtitle:       [input — "Campaigns that learn..."]
  CTA Button 1:   [input — "Book a Free Strategy Call →"]
  CTA Button 2:   [input — "View Case Studies"]

What It Is:
  [Textarea — 3-4 sentences describing the service]

How It Works (3 steps):
  Step 1 Title:   [input]
  Step 1 Body:    [textarea]
  Step 2 Title:   [input]
  Step 2 Body:    [textarea]
  Step 3 Title:   [input]
  Step 3 Body:    [textarea]

Key Benefits (4 items):
  Benefit 1:      [input]
  Benefit 2:      [input]
  Benefit 3:      [input]
  Benefit 4:      [input]

Results / Stats (3 stat cards):
  Stat 1 Number:  [input — "34%"]
  Stat 1 Label:   [input — "Reduction in CAC"]
  Stat 2 Number:  [input — "2.8x"]
  Stat 2 Label:   [input — "ROAS improvement"]
  Stat 3 Number:  [input — "0 hrs"]
  Stat 3 Label:   [input — "Manual work per week"]

SEO:
  Meta Title:     [input]
  Meta Desc:      [textarea]
  OG Image:       [media picker]

[Save Changes]  [Preview Page]  [Publish]
```

---

## Step 6 — Newsletter Manager (`/dash/newsletter`)

### Subscriber List (`/dash/newsletter`):

#### Stats row:
```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Total Subs   │  │ Active Subs  │  │ Avg Open Rate│  │ Campaigns    │
│  10,247      │  │   9,891      │  │    42.3%     │  │     38       │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

#### Action buttons:
```
[📤 Export CSV]   [🔍 Search subscribers...]   [+ Add Subscriber]   [📧 New Campaign →]
```

#### Subscriber table:
| Email | Name | Source | Status | Date Joined | Actions |
|-------|------|--------|--------|-------------|---------|
| sarah@example.com | Sarah K. | Blog | 🟢 Active | Mar 1, 2026 | View / Unsubscribe |
| james@startup.io | James R. | Contact Form | 🟢 Active | Feb 28, 2026 | View / Unsubscribe |
| user@anon.com | — | Newsletter Page | 🔴 Unsubscribed | Feb 20, 2026 | View |

- Filter tabs: All / Active / Unsubscribed / Bounced
- Pagination: 50 per page

---

### New Newsletter Campaign (`/dash/newsletter/new`):

```
┌────────────────────────────────────────────────────────────┐
│  NEW NEWSLETTER CAMPAIGN                                   │
└────────────────────────────────────────────────────────────┘

Subject Line:    [input — "5 AI marketing strategies for 2026"]
Preview Text:    [input — "What most agencies are missing..."]

Send To:         ● All subscribers (10,247)
                 ○ Segment: [dropdown — by source, join date, etc.]

From Name:       [input — "Malik @ MalikLogix"]
Reply-To:        [input — "hello@maliklogix.com"]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EMAIL BODY EDITOR:
[Rich text editor — TipTap]
  Toolbar: H1 H2 | Bold Italic | Link | Image | Divider | Button block
  Min height: 600px

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Save Draft]   [Send Test Email →]   [Schedule ▾]   [Send Now →]

Schedule modal:
  Date: [date picker]
  Time: [time picker]
  Timezone: [PKT / UTC / EST dropdown]
```

---

### Campaign History (`/dash/newsletter/history`):

| Subject | Sent To | Sent Date | Opens | Clicks | Unsubs |
|---------|---------|-----------|-------|--------|--------|
| 5 AI strategies for 2026 | 10,247 | Mar 20, 2026 | 42.3% | 18.7% | 12 |
| GEO: The new SEO | 9,890 | Mar 13, 2026 | 38.1% | 15.2% | 8 |

Clicking a row opens a campaign detail view with full stats and a preview of the email content.

---

## Step 7 — Leads Inbox (`/dash/leads`)

### Lead List:

#### Filter tabs:
```
[All (32)]  [New (8)]  [Contacted (14)]  [Qualified (6)]  [Closed (4)]
```

#### Lead cards (list view):
```
┌──────────────────────────────────────────────────────────────┐
│  🔴 NEW  |  Sarah K.  |  sarah@dtcbrand.com  |  USA         │
│  "I need help with AI marketing for my Shopify store"        │
│  Source: Contact Form  |  Service: AI Marketing             │
│  Received: 2 hours ago                    [View]  [Reply]   │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  🟡 CONTACTED  |  James R.  |  james@saas.io  |  UK         │
│  "Looking for n8n automation for our onboarding flow"        │
│  Source: Hero CTA  |  Service: Automation                   │
│  Received: 1 day ago                      [View]  [Reply]   │
└──────────────────────────────────────────────────────────────┘
```

---

### Individual Lead (`/dash/leads/[id]`):

```
┌─────────────────────────────┐  ┌────────────────────────────┐
│  LEAD DETAILS               │  │  ACTIVITY TIMELINE         │
│                             │  │                            │
│  Name: Sarah K.             │  │  ● Mar 27 — Lead received  │
│  Email: sarah@dtcbrand.com  │  │  ● Mar 27 — Auto-reply sent│
│  Country: USA               │  │  ● Mar 28 — You replied    │
│  Source: Contact Form       │  │                            │
│  Service Interest:          │  │  ─────────────────────     │
│    AI Marketing             │  │  REPLY                     │
│  Budget: $2,000–$5,000/mo   │  │  [textarea]                │
│  Message:                   │  │  [Send Reply]              │
│  "I need help with AI..."   │  │                            │
│                             │  └────────────────────────────┘
│  Status: [New ▾]            │
│  Assigned to: [Malik ▾]     │
│  Priority: [High ▾]         │
│                             │
│  [Mark as Qualified]        │
│  [Mark as Closed ✓]         │
│  [Delete Lead]              │
└─────────────────────────────┘
```

---

## Step 8 — SEO Manager (`/dash/seo`)

### Page list with SEO status:

```
┌──────────────────────────────────────────────────────────────────────┐
│  PAGE                         │ META TITLE │ META DESC │ OG IMAGE   │
│  / (Homepage)                 │ ✅ Set     │ ✅ Set    │ ✅ Set     │
│  /services/ai-campaign-mgmt   │ ✅ Set     │ ⚠️ Missing│ ✅ Set     │
│  /services/geo-ai-search      │ ✅ Set     │ ✅ Set    │ ❌ Missing │
│  /blog/ai-strategies-2026     │ ✅ Set     │ ✅ Set    │ ✅ Set     │
└──────────────────────────────────────────────────────────────────────┘
```

- Filter by: All / Issues Only / Pages / Blog / Services
- Click any row to edit that page's SEO settings inline
- Inline edit fields:
  ```
  Meta Title (60 chars max):  [input with char counter]
  Meta Description (160 max): [textarea with char counter]
  OG Image:                   [media picker]
  Canonical URL:              [input]
  noIndex:                    [toggle]
  ```
- Google SERP preview updates in real time as you type

---

## Step 9 — OpenClaw Tools Manager (`/dash/tools`)

### Skills List:

```
[Search skills...]   [Filter: All | Marketing | SEO | Automation | OpenClaw ▾]   [+ Add Skill]
```

#### Skills table:
| Name | Category | Status | Installs | Last Updated | Actions |
|------|----------|--------|----------|--------------|---------|
| Lead Enrichment AI | Automation | 🟢 Published | 342 | Mar 20, 2026 | Edit / Toggle / Delete |
| GEO Keyword Tracker | SEO | 🟢 Published | 218 | Mar 15, 2026 | Edit / Toggle / Delete |
| Blog Draft Generator | Marketing | 🟡 Draft | — | Mar 10, 2026 | Edit / Toggle / Delete |

---

### Add / Edit Skill (`/dash/tools/new` or `/dash/tools/[id]/edit`):

```
Skill Name:          [input]
Category:            [Marketing | SEO | Automation | OpenClaw ▾]
Short Description:   [input — 1 line, shown in directory]
Full Description:    [rich text editor]
Required Tools:      [tag input — e.g. n8n, HubSpot, Slack]
Integration Tags:    [tag input — for filtering by integration]
Install Instructions:[rich text editor]
Difficulty Level:    [Beginner | Intermediate | Advanced ▾]
Skill File Upload:   [file upload — .json or .zip]
Status:              [Draft | Published ▾]
Featured:            [toggle — appears in homepage tools section]

[Save Draft]   [Publish Skill]
```

---

## Step 10 — Media Library (`/dash/media`)

### Layout: Masonry grid of uploaded files

```
[Upload Files ↑]   [Search media...]   [Filter: All | Images | PDFs | Videos ▾]
[Sort: Newest ▾]

┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐
│ img   │ │ img   │ │ img   │ │ img   │ │ img   │
│       │ │       │ │       │ │       │ │       │
│ logo  │ │hero-bg│ │avatar │ │og-img │ │blog-1 │
│ .webp │ │ .jpg  │ │ .png  │ │ .png  │ │ .jpg  │
│ 24kb  │ │ 180kb │ │ 12kb  │ │ 45kb  │ │ 95kb  │
└───────┘ └───────┘ └───────┘ └───────┘ └───────┘
```

- Click any file: opens a sidebar with:
  - Full preview
  - File name (editable)
  - Alt text (editable, important for SEO)
  - File size, dimensions, upload date
  - Copy URL button
  - Delete button
- Drag-and-drop upload zone (highlight on drag-over)
- Accepted types: JPG, PNG, WebP, SVG, PDF, MP4
- Max file size: 10MB

---

## Step 11 — Settings (`/dash/settings`)

Settings has a sub-nav with 4 tabs:

### Tab 1 — General (`/dash/settings/general`):
```
Site Name:           [input — "MalikLogix"]
Tagline:             [input — "AI-Powered Growth. Built to Scale."]
Contact Email:       [input — "hello@maliklogix.com"]
Phone:               [input]
WhatsApp Link:       [input]
Address:             [textarea]
Social Links:
  YouTube:           [input]
  Twitter/X:         [input]
  LinkedIn:          [input]
  Instagram:         [input]
  GitHub:            [input]
Footer Copyright:    [input — "© 2026 MalikLogix. All rights reserved."]

[Save Changes]
```

---

### Tab 2 — Integrations (`/dash/settings/integrations`):
```
━━━━━━━━━━━━━━━━━━━━━━━━
AUTOMATION
━━━━━━━━━━━━━━━━━━━━━━━━
n8n Webhook URL:       [input + Test Connection button]
Make.com API Key:      [input, masked]

━━━━━━━━━━━━━━━━━━━━━━━━
AI MODELS
━━━━━━━━━━━━━━━━━━━━━━━━
OpenAI API Key:        [input, masked]  ← for content generation in dashboard
Anthropic API Key:     [input, masked]  ← for Claude-powered features

━━━━━━━━━━━━━━━━━━━━━━━━
EMAIL & NEWSLETTER
━━━━━━━━━━━━━━━━━━━━━━━━
Klaviyo API Key:       [input, masked]
Klaviyo List ID:       [input]
SMTP Host:             [input]
SMTP Port:             [input — 587]
SMTP Username:         [input]
SMTP Password:         [input, masked]
From Email:            [input — "hello@maliklogix.com"]

━━━━━━━━━━━━━━━━━━━━━━━━
ANALYTICS
━━━━━━━━━━━━━━━━━━━━━━━━
Google Analytics ID:   [input — "G-XXXXXXXXXX"]
Search Console:        [Connected ✅ / Connect ▾]
Hotjar Site ID:        [input]

━━━━━━━━━━━━━━━━━━━━━━━━
CRM
━━━━━━━━━━━━━━━━━━━━━━━━
HubSpot API Key:       [input, masked]
HubSpot Pipeline ID:   [input]

[Save All Integrations]
```

---

### Tab 3 — Team (`/dash/settings/team`):
```
┌───────────────────────────────────────────────────┐
│  ADMIN USERS                          [+ Add User]│
│                                                   │
│  [MF]  Malik Farooq                               │
│        admin@maliklogix.com                       │
│        Role: Super Admin              [You]       │
│                                                   │
│  [AK]  Assistant Account                          │
│        assistant@maliklogix.com                   │
│        Role: Editor            [Edit]  [Remove]   │
└───────────────────────────────────────────────────┘
```

Roles available:
- **Super Admin** — full access to everything
- **Editor** — can create/edit blog and services, no settings access
- **Viewer** — read-only access to leads and analytics

Add User modal:
```
Email:    [input]
Role:     [Super Admin | Editor | Viewer ▾]
[Send Invite]
```

---

### Tab 4 — Appearance (`/dash/settings/appearance`):
```
━━━━━━━━━━━━━━━━━━━━━━━━
HOMEPAGE HERO
━━━━━━━━━━━━━━━━━━━━━━━━
Hero Label:           [input — "AI AUTOMATION AGENCY"]
Hero Title Line 1:    [input — "AI-Powered"]
Hero Title Line 2:    [input — "Automation"]
Hero Title Line 3:    [input — "Systems"]
Hero Body Text:       [textarea]
CTA Button 1 Text:    [input — "Book a Free AI Strategy Call →"]
CTA Button 2 Text:    [input — "View Case Studies"]

━━━━━━━━━━━━━━━━━━━━━━━━
BRAND COLORS
━━━━━━━━━━━━━━━━━━━━━━━━
Primary Teal:         [color picker — #00B4C8]
Dark Navy:            [color picker — #0A1628]
Background:           [color picker — #F8F9FA]

━━━━━━━━━━━━━━━━━━━━━━━━
ANNOUNCEMENT BAR
━━━━━━━━━━━━━━━━━━━━━━━━
Enable:               [toggle]
Message:              [input — "🚀 Free AI Strategy Call — Limited spots this month"]
Link:                 [input — "/contact"]
Background Color:     [color picker]

━━━━━━━━━━━━━━━━━━━━━━━━
CHATBOT WIDGET
━━━━━━━━━━━━━━━━━━━━━━━━
Enable Chatbot:       [toggle — currently ON]
Widget Color:         [color picker — teal]
Greeting Message:     [input — "Hey! How can we help you grow?"]

[Save Appearance Settings]
[Preview Homepage →]
```

---

## Step 12 — Notifications System

### In-dashboard toast notifications:
```typescript
// Show on every save/publish/send action
toast.success('Blog post published successfully')
toast.error('Failed to send newsletter — check SMTP settings')
toast.info('Draft auto-saved')
```

### Notification bell (top bar):
Show a red badge count on the bell icon when there are:
- New leads (unread)
- Failed integrations
- Scheduled campaigns due soon

Clicking the bell opens a dropdown:
```
🔴 New lead from Sarah K. — 2 hours ago
⚠️ n8n webhook returned 404 — Check integration settings
📧 Newsletter scheduled for tomorrow 9am PKT
```

---

## Step 13 — Data Layer (Development Mock)

For development, use local JSON files or `localStorage` to mock all data.
Define these data types:

```typescript
// types/dashboard.ts

type BlogPost = {
  id: string
  title: string
  slug: string
  content: string  // HTML string from rich text editor
  excerpt: string
  category: string
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  featuredImage: string
  metaTitle: string
  metaDescription: string
  author: string
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

type Lead = {
  id: string
  name: string
  email: string
  country: string
  service: string
  message: string
  source: string
  status: 'new' | 'contacted' | 'qualified' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignedTo: string
  createdAt: string
}

type NewsletterSubscriber = {
  id: string
  email: string
  name: string
  source: string
  status: 'active' | 'unsubscribed' | 'bounced'
  joinedAt: string
}

type NewsletterCampaign = {
  id: string
  subject: string
  previewText: string
  body: string
  sentTo: number
  sentAt: string | null
  status: 'draft' | 'scheduled' | 'sent'
  openRate: number
  clickRate: number
  unsubscribes: number
}

type ServicePage = {
  slug: string
  title: string
  subtitle: string
  whatItIs: string
  steps: { title: string; body: string }[]
  benefits: string[]
  stats: { number: string; label: string }[]
  metaTitle: string
  metaDescription: string
  status: 'draft' | 'published'
  updatedAt: string
}

type OpenClawSkill = {
  id: string
  name: string
  category: string
  shortDescription: string
  fullDescription: string
  requiredTools: string[]
  integrationTags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  status: 'draft' | 'published'
  featured: boolean
  installs: number
  updatedAt: string
}

type SiteSettings = {
  siteName: string
  tagline: string
  contactEmail: string
  socialLinks: Record<string, string>
  heroContent: Record<string, string>
  brandColors: Record<string, string>
  integrations: Record<string, string>  // API keys — never log these
}
```

Seed file at `/dash/seed.ts` with 10 mock blog posts, 15 mock leads, 10 mock subscribers to make the dashboard feel real during development.

---

## Step 14 — File Structure

```
/app
  /dash
    layout                    ← shared sidebar + topbar shell
    page                      ← /dash overview
    /login
      page
    /blog
      page                    ← post list
      /new
        page                  ← create post
      /[id]
        /edit
          page                ← edit post
    /services
      page                    ← service grid
      /[slug]
        /edit
          page                ← edit service page content
    /newsletter
      page                    ← subscriber list
      /new
        page                  ← compose campaign
      /history
        page                  ← past campaigns
    /leads
      page                    ← lead list
      /[id]
        page                  ← lead detail
    /seo
      page                    ← SEO manager
    /tools
      page                    ← OpenClaw skills list
      /new
        page
      /[id]
        /edit
          page
    /media
      page                    ← media library
    /settings
      layout                  ← settings sub-nav tabs
      /general
        page
      /integrations
        page
      /team
        page
      /appearance
        page

/components
  /dash
    Sidebar
    TopBar
    StatCard
    BlogPostTable
    BlogPostEditor
    ServiceEditor
    NewsletterComposer
    LeadCard
    LeadDetail
    SeoEditor
    SkillForm
    MediaGrid
    SettingsForm
    NotificationBell
    ConfirmModal

/lib
  /dash
    auth.ts                       ← session check helper
    mock-data.ts                  ← seed data for dev
    types.ts                      ← all TypeScript types (see Step 13)
    api.ts                        ← data fetching helpers (localStorage in dev, API in prod)
```

---

## Step 15 — Dashboard Styling Reference

Match this visual spec for the admin dashboard:

```css
/* Dashboard color tokens */
--dash-sidebar-bg: #0f1117;
--dash-sidebar-text: #94a3b8;
--dash-sidebar-active: #00B4C8;
--dash-sidebar-active-bg: rgba(0, 180, 200, 0.12);
--dash-topbar-bg: #ffffff;
--dash-topbar-border: #e2e8f0;
--dash-content-bg: #f8fafc;
--dash-card-bg: #ffffff;
--dash-card-border: #e2e8f0;
--dash-card-shadow: 0 1px 3px rgba(0,0,0,0.07);
--dash-text-primary: #0f172a;
--dash-text-secondary: #64748b;
--dash-teal: #00B4C8;
--dash-teal-light: rgba(0, 180, 200, 0.10);
--dash-red: #ef4444;
--dash-green: #22c55e;
--dash-yellow: #f59e0b;

/* Status badge patterns */
.badge-published  { background: #dcfce7; color: #166534; }
.badge-draft      { background: #fef9c3; color: #854d0e; }
.badge-archived   { background: #f1f5f9; color: #475569; }
.badge-new        { background: #fee2e2; color: #991b1b; }
.badge-contacted  { background: #fef9c3; color: #854d0e; }
.badge-qualified  { background: #dbeafe; color: #1e40af; }
.badge-closed     { background: #dcfce7; color: #166534; }
```

---

## Deliverables Checklist

- [ ] `/dash/login` — working auth with redirect
- [ ] Route protection middleware on all `/dash/*` routes
- [ ] Shared sidebar + topbar layout component
- [ ] `/dash` overview with stats, quick actions, activity feed
- [ ] `/dash/blog` — post list with filters and search
- [ ] `/dash/blog/new` and `/dash/blog/[id]/edit` — full post editor
- [ ] `/dash/services` — service page grid
- [ ] `/dash/services/[slug]/edit` — service content editor
- [ ] `/dash/newsletter` — subscriber list with stats
- [ ] `/dash/newsletter/new` — campaign composer
- [ ] `/dash/newsletter/history` — sent campaigns table
- [ ] `/dash/leads` — lead inbox with status filters
- [ ] `/dash/leads/[id]` — lead detail + reply
- [ ] `/dash/seo` — SEO status table with inline editing
- [ ] `/dash/tools` — OpenClaw skills list
- [ ] `/dash/tools/new` and `/dash/tools/[id]/edit`
- [ ] `/dash/media` — media library with upload
- [ ] `/dash/settings/general` — site info settings
- [ ] `/dash/settings/integrations` — all API key fields
- [ ] `/dash/settings/team` — user management
- [ ] `/dash/settings/appearance` — homepage + brand settings
- [ ] Toast notifications on all save/publish/send actions
- [ ] Notification bell with unread badge
- [ ] TypeScript types defined for all data models
- [ ] Mock seed data so dashboard looks populated immediately
- [ ] No public-facing routes or components modified
- [ ] Responsive: sidebar collapses to hamburger below 1024px

---

*This prompt covers the complete `/dash` admin dashboard only.*
*All public-facing site changes are covered in separate prompts.*
