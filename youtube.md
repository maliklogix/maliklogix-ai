YouTube Page (/youtube) + Dashboard (/dash/youtube)
Link in navbar under 'Learn' dropdown
PART 1: Public Page — /youtube
w

Create a new page at /youtube under the Learn nav dropdown.
Add "YouTube" as a link under the Learn menu (alongside existing Learn items).

Section 1 — Latest Videos (Hero Section)

Section heading: "Latest from YouTube"
Display the 3 most recent YouTube videos fetched from the database table youtube_videos (fields: id, title, thumbnail_url, youtube_url, published_at, description, views, duration, is_featured, created_at)
Render each as a card: thumbnail image, title, short description (truncated to 2 lines), published date, duration badge
Cards in a 3-column grid (responsive: 1 col mobile, 2 col tablet, 3 col desktop)
Below the 3 cards, centered: one button — "View All Videos" (indigo #4f46e5, full styled CTA) — links to https://www.youtube.com/@maliklogix (opens in new tab)


Section 2 — Resources

Section heading: "Resources"
Subheading: "Docs, video summaries, AI tools, guides and more"
Fetch from database table youtube_resources (fields: id, title, type [enum: doc, video_summary, ai_title, guide, tool, link, other], url, description, icon, tags, created_at)
Display resources as horizontal rows (not cards), each row showing: icon/emoji, title, type badge, short description, tags, and a "Open →" link on the right
Show 10 resources per page with pagination above the list (Previous / Page numbers / Next)
A small filter row above the list: filter by type (All | Docs | Video Summaries | AI Titles | Guides | Tools)


Section 3 — Suggest Next YouTube Video

Section heading: "Suggest the Next Video"
Subheading paragraph: "Got a topic you'd love me to cover? Drop your idea below — I read every suggestion and use them to plan upcoming videos."
Below: a single email input field (placeholder: your@email.com) and a textarea (placeholder: What should the next video be about?)
Submit button: "Send Suggestion" (indigo CTA)
On submit: POST to /api/youtube/suggest → saves to database table youtube_suggestions (fields: id, email, suggestion, status [default: pending], created_at)
Show success message inline after submit: "Thanks! Your suggestion has been noted."


PART 2: Dashboard — /dash/youtube
This is an admin-only internal dashboard. Style: clean white admin panel, consistent with /dash design if it exists, else use the same site design system.

YouTube Sidebar Navigation
Create a left sidebar within /dash/youtube with the following nav items:

📹 Videos — manage all YouTube videos
📦 Resources — manage resources list
💡 Suggestions — view submitted suggestions
📊 Analytics — placeholder page (coming soon)
⚙️ Settings — YouTube page settings (channel URL, section visibility toggles, etc.)


Dashboard — Videos Page (/dash/youtube/videos)

Full table of all youtube_videos rows: ID, thumbnail (small), title, views, published_at, is_featured toggle, actions (Edit / Delete)
Add New Video button → opens a modal or inline form with fields: Title, YouTube URL (auto-parse video ID and thumbnail), Description, Published At, Duration, Views, Is Featured toggle
Edit → same form pre-filled
Delete → confirm dialog


Dashboard — Resources Page (/dash/youtube/resources)

Table of all youtube_resources: title, type badge, url, tags, created_at, actions (Edit / Delete)
Add New Resource button → modal with fields: Title, Type (dropdown), URL, Description, Icon (emoji picker or text), Tags (comma separated)
Edit / Delete per row


Dashboard — Suggestions Page (/dash/youtube/suggestions)

Table of all youtube_suggestions: email, suggestion text (truncated), status badge (pending / reviewed / ignored), created_at
Inline status updater (dropdown per row: pending → reviewed → ignored)
Delete button per row
Filter by status at top


Dashboard — Settings Page (/dash/youtube/settings)
Fields saved to a youtube_settings table or a key-value config table:

YouTube Channel URL (text input)
Channel Handle (text input)
Show "Latest Videos" section toggle (on/off)
Show "Resources" section toggle (on/off)
Show "Suggest Next Video" section toggle (on/off)
Resources per page (number input, default 10)
Featured video override (select from existing videos)
Success message text for suggestion form
Save Settings button (indigo CTA)


Database Tables Required
Run these migrations (Prisma schema additions):
prismamodel YoutubeVideo {
  id           Int      @id @default(autoincrement())
  title        String
  youtubeUrl   String
  thumbnailUrl String
  description  String?  @db.Text
  publishedAt  DateTime
  duration     String?
  views        Int?     @default(0)
  isFeatured   Boolean  @default(false)
  createdAt    DateTime @default(now())
}

model YoutubeResource {
  id          Int      @id @default(autoincrement())
  title       String
  type        String   // doc | video_summary | ai_title | guide | tool | link | other
  url         String
  description String?
  icon        String?
  tags        String?
  createdAt   DateTime @default(now())
}

model YoutubeSuggestion {
  id         Int      @id @default(autoincrement())
  email      String
  suggestion String   @db.Text
  status     String   @default("pending") // pending | reviewed | ignored
  createdAt  DateTime @default(now())
}

model YoutubeSetting {
  id    Int    @id @default(autoincrement())
  key   String @unique
  value String @db.Text
}
```

---

### API Routes Required
```
GET    /api/youtube/videos          → latest videos (public, limit 3)
GET    /api/youtube/resources       → paginated resources (public, ?page=1&type=all)
POST   /api/youtube/suggest         → submit suggestion (public)

GET    /api/dash/youtube/videos     → all videos (auth)
POST   /api/dash/youtube/videos     → add video (auth)
PUT    /api/dash/youtube/videos/:id → edit video (auth)
DELETE /api/dash/youtube/videos/:id → delete video (auth)

GET    /api/dash/youtube/resources     → all resources (auth)
POST   /api/dash/youtube/resources     → add (auth)
PUT    /api/dash/youtube/resources/:id → edit (auth)
DELETE /api/dash/youtube/resources/:id → delete (auth)

GET    /api/dash/youtube/suggestions     → all suggestions (auth)
PUT    /api/dash/youtube/suggestions/:id → update status (auth)
DELETE /api/dash/youtube/suggestions/:id → delete (auth)

GET    /api/dash/youtube/settings    → get settings (auth)
POST   /api/dash/youtube/settings    → save settings (auth)

Notes for Antigravity

All public sections respect the YoutubeSetting visibility toggles fetched server-side

Pagination on Resources section: server-side with ?page= query param
/dash/youtube sidebar layout wraps all sub-pages under a shared layout file: app/dash/youtube/layout.tsx
Auth guard on all /dash/youtube/* routes (same auth pattern used elsewhere on the site)