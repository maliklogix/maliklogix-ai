# MalikLogix Admin Dashboard — Header Scripts Manager Prompt

> **Location:** `http://localhost:5173/dash/settings/scripts`
> **Purpose:** A single admin panel where you paste any third-party script tag
> (Google Analytics, Google AdSense, Meta Pixel, Hotjar, Clarity, custom scripts, etc.)
> and the site injects them into the `<head>` of every public page — but deferred,
> so they only execute AFTER the page has fully loaded. Zero impact on site speed.
> **Stack:** Next.js (App Router) + Tailwind CSS — matching existing dashboard stack

---

## Ground Rules

- **DO NOT** hardcode any third-party scripts anywhere in the codebase
- **DO NOT** block page rendering with any third-party script
- All scripts added here must load with `defer` or `afterInteractive` strategy
- This panel lives at `/dash/settings/scripts` — add it as a new tab in the existing Settings section
- The existing Settings tabs (General, Integrations, Team, Appearance) must remain untouched
- Scripts saved here are stored in a config file or environment-level store and injected globally
- No script should ever execute during SSR — client-side only, post-load

---

## Step 1 — Add New Settings Tab

In `/app/dash/settings/layout.tsx`, add one new tab to the existing settings sub-navigation:

```typescript
// Existing tabs (DO NOT change these):
// General | Integrations | Team | Appearance

// Add this new tab AFTER "Integrations":
{ label: 'Header Scripts', href: '/dash/settings/scripts', icon: '</>' }
```

Tab styling must match the existing settings tab style exactly — same font, same active state, same border treatment.

---

## Step 2 — Header Scripts Manager Page

### File: `/app/dash/settings/scripts/page.tsx`

### Full page layout:

```
┌─────────────────────────────────────────────────────────────────────┐
│  HEADER SCRIPTS MANAGER                                             │
│  Scripts added here are injected into <head> on every public page.  │
│  All scripts execute AFTER page load (deferred) for maximum speed.  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  PERFORMANCE MODE                                          [toggle] │
│  When ON: all scripts below load after window.onload fires.         │
│  When OFF: scripts load normally (not recommended).                 │
│  Status: ● DEFERRED — site speed protected             [ON]        │
└─────────────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[+ Add New Script]                         [Scripts active: 4 of 6]

┌─────────────────────────────────────────────────────────────────────┐
│  Script cards list (one card per saved script — see Step 3)        │
└─────────────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────────────┐
│  HOW DEFERRED LOADING WORKS                                         │
│  (collapsible info panel — collapsed by default)                    │
│                                                                     │
│  Normal script loading:  HTML parse → script blocks → page loads   │
│  Deferred loading:       HTML parse → page loads → scripts execute  │
│                                                                     │
│  All scripts here use Next.js Strategy="afterInteractive" which     │
│  guarantees they only run after the browser has finished painting   │
│  the page. This protects your Core Web Vitals (LCP, FID, CLS).     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Step 3 — Script Card Design

Each saved script appears as a card in the list. Cards are drag-reorderable (execution order matters for some scripts like GA before Pixel).

### Card layout:

```
┌──────────────────────────────────────────────────────────────────────┐
│  ⠿  [GA4 icon]  Google Analytics 4              🟢 Active   [· · ·]│
│                                                                      │
│  ID / Tag:   G-XXXXXXXXXX                                           │
│  Type:       Analytics                                               │
│  Load:       afterInteractive (deferred)                            │
│  Pages:      All pages                                               │
│                                                                      │
│  Code preview:                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ <!-- Google tag (gtag.js) -->                                │   │
│  │ <script async src="https://www.googletagmanager.com/..."/>   │   │
│  │ <script>                                                     │   │
│  │   window.dataLayer = window.dataLayer || [];                 │   │
│  │   function gtag(){dataLayer.push(arguments);}               │   │
│  │   gtag('js', new Date());                                    │   │
│  │   gtag('config', 'G-XXXXXXXXXX');                           │   │
│  │ </script>                                                    │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  [Edit]   [Disable]   [Delete]                   ↕ drag to reorder  │
└──────────────────────────────────────────────────────────────────────┘
```

### Card states:
```
🟢 Active    — script is enabled and injecting into <head>
🔴 Disabled  — script is saved but NOT injecting (toggle off)
⚠️ Error     — script saved but contains a syntax issue (show warning)
```

### Three-dot menu `[· · ·]` options:
- Edit script
- Duplicate script
- Move to top
- Move to bottom
- Disable / Enable
- Delete (with confirm modal)

---

## Step 4 — "Add New Script" Modal / Drawer

Clicking `[+ Add New Script]` opens a right-side drawer (slides in from right, 520px wide).

### Drawer layout:

```
┌──────────────────────────────────────────────────────────────────────┐
│  ADD HEADER SCRIPT                                          ✕ Close  │
│                                                                      │
│  QUICK TEMPLATES                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  [G] Google  │  │  [G] Google  │  │  [G] Google  │              │
│  │   Analytics  │  │   AdSense    │  │   Tag Manager│              │
│  │      GA4     │  │              │  │     GTM      │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  [f] Meta    │  │  [H] Hotjar  │  │  [M] MS      │              │
│  │    Pixel     │  │              │  │   Clarity    │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  [P] Pixel   │  │  [S] Search  │  │  [</>]Custom │              │
│  │  TikTok      │  │   Console    │  │   Script     │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                      │
│  ──────────── or fill in manually ────────────                      │
│                                                                      │
│  Script Name: *                                                      │
│  ┌────────────────────────────────────────────────────────────┐     │
│  │ e.g. "Google Analytics 4"                                  │     │
│  └────────────────────────────────────────────────────────────┘     │
│                                                                      │
│  Category:                                                           │
│  [ Analytics ▾ ]                                                    │
│    Analytics | Advertising | Tag Manager |                           │
│    Heatmap/Recording | SEO Verification | Chat Widget | Custom       │
│                                                                      │
│  Load Strategy:                                                      │
│  ● afterInteractive  ← RECOMMENDED (runs after page load)           │
│  ○ beforeInteractive ← runs before hydration (use for critical only) │
│  ○ lazyOnload        ← runs when browser is idle (lowest priority)  │
│                                                                      │
│  Inject On:                                                          │
│  ● All pages                                                         │
│  ○ Homepage only                                                     │
│  ○ Specific pages (enter paths, one per line)                        │
│  ○ Exclude pages  (enter paths to exclude, one per line)             │
│                                                                      │
│  Script Code: *                                                      │
│  ┌────────────────────────────────────────────────────────────┐     │
│  │ Paste your full <script> tag here...                       │     │
│  │                                                            │     │
│  │ <!-- Example: -->                                          │     │
│  │ <script async                                              │     │
│  │   src="https://www.googletagmanager.com/gtag/js?id=G-XX"> │     │
│  │ </script>                                                  │     │
│  │ <script>                                                   │     │
│  │   window.dataLayer = window.dataLayer || [];               │     │
│  │   function gtag(){...}                                     │     │
│  │ </script>                                                  │     │
│  └────────────────────────────────────────────────────────────┘     │
│  Code editor: syntax highlight, line numbers, 200px min height       │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────┐       │
│  │ ℹ️  The async/defer attributes in your pasted code will  │       │
│  │    be overridden by the Load Strategy setting above.     │       │
│  │    MalikLogix controls defer timing, not the script tag. │       │
│  └──────────────────────────────────────────────────────────┘       │
│                                                                      │
│  Status:  ● Enable immediately   ○ Save as disabled                 │
│                                                                      │
│  [Cancel]                              [Validate & Save Script →]   │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Step 5 — Quick Templates (Pre-filled Forms)

When a user clicks a template tile, the drawer auto-fills with the correct code structure. The user only needs to paste their ID/key.

### Template: Google Analytics 4

```
Name:      Google Analytics 4
Category:  Analytics
Strategy:  afterInteractive
Code:
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id={{GA_MEASUREMENT_ID}}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{{GA_MEASUREMENT_ID}}');
</script>

Extra field shown: "Measurement ID" input → replaces {{GA_MEASUREMENT_ID}}
```

---

### Template: Google AdSense

```
Name:      Google AdSense
Category:  Advertising
Strategy:  lazyOnload
Code:
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={{ADSENSE_CLIENT_ID}}"
     crossorigin="anonymous">
</script>

Extra field shown: "AdSense Client ID" input (ca-pub-XXXXXXXXXXXXXXXX)
→ replaces {{ADSENSE_CLIENT_ID}}
```

---

### Template: Google Tag Manager

```
Name:      Google Tag Manager
Category:  Tag Manager
Strategy:  afterInteractive
Code (head):
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','{{GTM_ID}}');</script>

Code (body — noscript):
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{GTM_ID}}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

Extra field: "GTM Container ID" (GTM-XXXXXXX)
Note shown: "GTM also requires a <noscript> tag in <body>. 
This will be auto-injected after <body> opens on all pages."
```

---

### Template: Meta (Facebook) Pixel

```
Name:      Meta Pixel
Category:  Advertising
Strategy:  afterInteractive
Code:
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '{{PIXEL_ID}}');
fbq('track', 'PageView');
</script>

Extra field: "Pixel ID" input → replaces {{PIXEL_ID}}
```

---

### Template: Hotjar

```
Name:      Hotjar
Category:  Heatmap / Recording
Strategy:  lazyOnload
Code:
<script>
(function(h,o,t,j,a,r){
  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
  h._hjSettings={hjid:{{HOTJAR_ID}},hjsv:6};
  a=o.getElementsByTagName('head')[0];
  r=o.createElement('script');r.async=1;
  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
  a.appendChild(r)
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>

Extra field: "Hotjar Site ID" (numeric) → replaces {{HOTJAR_ID}}
```

---

### Template: Microsoft Clarity

```
Name:      Microsoft Clarity
Category:  Heatmap / Recording
Strategy:  lazyOnload
Code:
<script type="text/javascript">
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "{{CLARITY_ID}}");
</script>

Extra field: "Clarity Project ID" → replaces {{CLARITY_ID}}
```

---

### Template: TikTok Pixel

```
Name:      TikTok Pixel
Category:  Advertising
Strategy:  afterInteractive
Code:
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
  ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
  ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
  for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
  ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
  ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
  ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
  var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;
  var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
  ttq.load('{{TIKTOK_PIXEL_ID}}');ttq.page();
}(window, document, 'ttq');
</script>

Extra field: "TikTok Pixel ID" → replaces {{TIKTOK_PIXEL_ID}}
```

---

### Template: Google Search Console Verification

```
Name:      Google Search Console
Category:  SEO Verification
Strategy:  beforeInteractive
Code:
<meta name="google-site-verification" content="{{VERIFICATION_CODE}}" />

Extra field: "Verification Code" → replaces {{VERIFICATION_CODE}}
Note shown: "This is a <meta> tag, not a script. It will be injected 
into <head> immediately (not deferred) as verification tags must 
be present during crawl."
```

---

### Template: Custom Script

```
Name:      [user fills in]
Category:  Custom
Strategy:  afterInteractive (default, user can change)
Code:      [empty — user pastes anything]
```

---

## Step 6 — Script Validation Logic

Before saving, run these checks on the pasted code:

```typescript
function validateScript(code: string): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Error: empty
  if (!code.trim()) {
    errors.push('Script code cannot be empty.')
  }

  // Error: contains </html> or </body> — wrong place
  if (/<\/html>|<\/body>/i.test(code)) {
    errors.push('This code contains </html> or </body> tags. Only paste the script portion.')
  }

  // Warning: contains document.write() — bad practice
  if (/document\.write\(/i.test(code)) {
    warnings.push('document.write() is not compatible with deferred loading and may cause issues.')
  }

  // Warning: inline event handlers
  if (/onload\s*=|onerror\s*=/i.test(code)) {
    warnings.push('Inline event handlers like onload= may not fire correctly when deferred.')
  }

  // Info: template placeholders not filled
  if (/\{\{[A-Z_]+\}\}/.test(code)) {
    errors.push('Template placeholder detected. Replace {{PLACEHOLDER}} with your actual ID/key.')
  }

  // Warning: multiple <script> blocks — note execution order
  const scriptCount = (code.match(/<script/gi) || []).length
  if (scriptCount > 1) {
    warnings.push(`This snippet contains ${scriptCount} <script> blocks. They will all be deferred and execute in order.`)
  }

  return { valid: errors.length === 0, errors, warnings }
}
```

Show errors in red below the code editor, warnings in yellow. Only block save on errors — warnings allow save with acknowledgement.

---

## Step 7 — Deferred Injection Implementation

### How scripts are stored:

```typescript
// /lib/scripts-config.ts

export type ScriptEntry = {
  id: string
  name: string
  category: 'analytics' | 'advertising' | 'tag-manager' | 'heatmap' | 'seo-verification' | 'chat' | 'custom'
  strategy: 'afterInteractive' | 'beforeInteractive' | 'lazyOnload'
  injectOn: 'all' | 'homepage' | 'include-paths' | 'exclude-paths'
  paths: string[]          // used when injectOn is include or exclude
  code: string             // raw script/meta tag HTML string
  enabled: boolean
  order: number            // drag-reorder index
  createdAt: string
  updatedAt: string
}

// Scripts are persisted to:
// - Development: /public/scripts-config.json  (written by API route)
// - Production:  database or Vercel Edge Config
```

---

### API Route to save scripts:

```typescript
// /app/api/dash/scripts/route.ts

import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const CONFIG_PATH = path.join(process.cwd(), 'public', 'scripts-config.json')

// GET — fetch all scripts
export async function GET() {
  try {
    const data = fs.existsSync(CONFIG_PATH)
      ? JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'))
      : { scripts: [], deferAll: true }
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ scripts: [], deferAll: true })
  }
}

// POST — save updated scripts array
export async function POST(request: NextRequest) {
  const body = await request.json()
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(body, null, 2))
  return NextResponse.json({ success: true })
}
```

---

### Global script injector component:

```typescript
// /components/ScriptInjector.tsx
// This component goes inside the ROOT layout.tsx — public site only, NOT /dash

'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import type { ScriptEntry } from '@/lib/scripts-config'

export default function ScriptInjector() {
  const [scripts, setScripts] = useState<ScriptEntry[]>([])
  const pathname = usePathname()

  useEffect(() => {
    // Fetch scripts config from public JSON — no flash, no layout shift
    fetch('/scripts-config.json')
      .then(r => r.json())
      .then(data => setScripts(data.scripts || []))
      .catch(() => {}) // fail silently — never break the site
  }, [])

  const shouldInject = (script: ScriptEntry): boolean => {
    if (!script.enabled) return false
    if (script.injectOn === 'all') return true
    if (script.injectOn === 'homepage') return pathname === '/'
    if (script.injectOn === 'include-paths') {
      return script.paths.some(p => pathname.startsWith(p))
    }
    if (script.injectOn === 'exclude-paths') {
      return !script.paths.some(p => pathname.startsWith(p))
    }
    return true
  }

  // Parse raw HTML code string and render as Next.js <Script> components
  const renderScript = (entry: ScriptEntry) => {
    if (!shouldInject(entry)) return null

    // Handle <meta> tags (like Search Console verification)
    // These must go in <Head>, not as Script components
    const isMetaOnly = /^<meta\s/i.test(entry.code.trim()) && !/<script/i.test(entry.code)

    if (isMetaOnly) {
      // Meta tags injected via dangerouslySetInnerHTML in a hidden span — 
      // Next.js will hoist them to <head> via next/head
      return null // handled separately in MetaInjector component
    }

    // Extract src from first <script src="..."> if present
    const srcMatch = entry.code.match(/<script[^>]+src=["']([^"']+)["']/)
    const inlinePart = entry.code
      .replace(/<script[^>]*src=["'][^"']*["'][^>]*>\s*<\/script>/gi, '')
      .replace(/<\/?script[^>]*>/gi, '')
      .trim()

    return (
      <Script
        key={entry.id}
        id={`ml-script-${entry.id}`}
        strategy={entry.strategy}
        src={srcMatch ? srcMatch[1] : undefined}
        dangerouslySetInnerHTML={!srcMatch && inlinePart ? { __html: inlinePart } : undefined}
      />
    )
  }

  return <>{scripts.sort((a, b) => a.order - b.order).map(renderScript)}</>
}
```

---

### Add ScriptInjector to public root layout:

```typescript
// /app/layout.tsx  ← PUBLIC root layout only (not /dash layout)
// Add ScriptInjector at the END of <body> — never inside /dash routes

import ScriptInjector from '@/components/ScriptInjector'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ScriptInjector />  {/* ← Add this line. Injects all deferred scripts. */}
      </body>
    </html>
  )
}
```

> **Critical:** The `/dash` layout has its own `layout.tsx` that does NOT include `ScriptInjector`.
> Admin pages never load Google Analytics, AdSense, or any tracking scripts.

---

## Step 8 — Load Strategy Explanation (shown in UI)

Display this as a collapsible info card in the dashboard panel:

```
STRATEGY          WHEN IT RUNS                    BEST FOR
─────────────────────────────────────────────────────────────────────
afterInteractive  After page is interactive        GA4, Meta Pixel,
                  (hydration complete)             GTM, TikTok Pixel
                  → Recommended for 95% of scripts

lazyOnload        When browser is idle             Hotjar, Clarity,
                  (lowest priority, best for       chat widgets,
                  non-critical tracking)           non-critical tools

beforeInteractive Before hydration                 Search Console meta
                  (use only for critical scripts)  tags, critical GTM

─────────────────────────────────────────────────────────────────────
WHAT "DEFERRED" MEANS FOR YOUR CORE WEB VITALS:

  LCP (Largest Contentful Paint):   ✅ Not blocked — hero loads first
  FID (First Input Delay):          ✅ Not blocked — page interactive first
  CLS (Cumulative Layout Shift):    ✅ Not blocked — no layout-shifting scripts
  TTFB (Time to First Byte):        ✅ Not affected — server-side unaffected

  Google PageSpeed Impact:          Scripts in this manager add ~0ms to
                                    your PageSpeed score because they run
                                    after the score is measured.
```

---

## Step 9 — Scripts Dashboard Summary Bar

At the top of `/dash/settings/scripts`, show a live status bar:

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Total Scripts│  │   Active     │  │   Disabled   │  │  Deferred    │
│      6       │  │      4       │  │      2       │  │    100%      │
│              │  │  injecting   │  │  saved only  │  │  of active   │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

Green highlight on the "Deferred: 100%" card when all active scripts are deferred.
Orange highlight if any active script uses `beforeInteractive` (flag it as attention-needed).

---

## Step 10 — Test Mode

Add a "Test Mode" toggle at the top of the page:

```
┌──────────────────────────────────────────────────────────────────────┐
│  TEST MODE                                                  [toggle] │
│  When ON: scripts only inject on pages with ?ml_preview=1 in the    │
│  URL. Safe way to test a new script before going live site-wide.    │
│                                                                      │
│  Test URL example:                                                   │
│  https://maliklogix.com/?ml_preview=1                               │
│  [Copy Test URL]                                                     │
└──────────────────────────────────────────────────────────────────────┘
```

Implementation:
```typescript
// In ScriptInjector.tsx — check for test mode
const searchParams = new URLSearchParams(window.location.search)
const isPreview = searchParams.get('ml_preview') === '1'

// If global testMode is ON, only inject when ?ml_preview=1 is present
if (globalConfig.testMode && !isPreview) return null
```

---

## Step 11 — Script Execution Log (Dev Mode Only)

When `NODE_ENV === 'development'`, show a small debug overlay in the bottom-left corner of the public site:

```
┌─────────────────────────────────────┐
│  ML Scripts [4 active]              │
│  ✅ GA4 — loaded (afterInteractive) │
│  ✅ AdSense — loaded (lazyOnload)   │
│  ✅ Meta Pixel — loaded             │
│  ⏳ Hotjar — pending (idle)         │
│  [Hide]                             │
└─────────────────────────────────────┘
```

This only appears in development — never in production.

```typescript
// Show only in dev
if (process.env.NODE_ENV !== 'development') return null
```

---

## Step 12 — Full File Structure

```
/app
  /dash
    /settings
      /scripts
        page.tsx              ← Header Scripts Manager UI

/app
  /api
    /dash
      /scripts
        route.ts              ← GET/POST API for reading/writing scripts config

/components
  ScriptInjector.tsx          ← Injects active scripts into public pages
  MetaInjector.tsx            ← Injects <meta> verification tags into <head>
  ScriptDebugOverlay.tsx      ← Dev-only overlay showing script load status

/lib
  scripts-config.ts           ← TypeScript types for ScriptEntry, GlobalConfig

/public
  scripts-config.json         ← Persisted scripts data (gitignored in production)
                                 Auto-created on first save if missing
```

---

## Step 13 — TypeScript Types

```typescript
// /lib/scripts-config.ts

export type ScriptStrategy = 'afterInteractive' | 'beforeInteractive' | 'lazyOnload'

export type ScriptCategory =
  | 'analytics'
  | 'advertising'
  | 'tag-manager'
  | 'heatmap'
  | 'seo-verification'
  | 'chat'
  | 'custom'

export type InjectTarget = 'all' | 'homepage' | 'include-paths' | 'exclude-paths'

export type ScriptEntry = {
  id: string                  // uuid
  name: string                // human-readable label
  category: ScriptCategory
  strategy: ScriptStrategy
  injectOn: InjectTarget
  paths: string[]             // route paths for include/exclude targeting
  code: string                // raw HTML — may contain <script>, <meta>, etc.
  enabled: boolean
  order: number               // execution order (drag-reorderable)
  createdAt: string           // ISO timestamp
  updatedAt: string
}

export type ScriptsConfig = {
  scripts: ScriptEntry[]
  deferAll: boolean           // global override — forces all to afterInteractive
  testMode: boolean           // only inject on ?ml_preview=1
  lastUpdated: string
}
```

---

## Step 14 — Default Seed Data

On first load, if `scripts-config.json` doesn't exist, create it with this default:

```json
{
  "scripts": [],
  "deferAll": true,
  "testMode": false,
  "lastUpdated": "2026-01-01T00:00:00Z"
}
```

No scripts are active by default — the user adds them through the UI.

---

## Deliverables Checklist

- [ ] New "Header Scripts" tab added to `/dash/settings` sub-navigation
- [ ] `/dash/settings/scripts` page with full UI (stats bar, cards list, global toggles)
- [ ] "Add New Script" drawer with all 9 quick templates pre-filled
- [ ] Template variable replacement UI (e.g. Measurement ID field)
- [ ] Drag-to-reorder script cards (execution order)
- [ ] Per-script enable/disable toggle
- [ ] Script validation with error and warning messages
- [ ] Load strategy selector (afterInteractive / beforeInteractive / lazyOnload)
- [ ] Page targeting (all / homepage / include / exclude paths)
- [ ] `/api/dash/scripts` GET + POST route for persistence
- [ ] `ScriptInjector` component in public root `layout.tsx`
- [ ] Scripts load via Next.js `<Script strategy="...">` — never render-blocking
- [ ] `/dash` routes never load public tracking scripts
- [ ] Test Mode toggle with `?ml_preview=1` URL parameter support
- [ ] Dev-only script execution debug overlay
- [ ] `scripts-config.json` auto-created on first save
- [ ] TypeScript types for all data structures
- [ ] Confirmation modal before deleting a script
- [ ] Toast notifications on save, delete, enable, disable
- [ ] No existing dashboard pages or public site components modified

---

*This prompt covers the Header Scripts Manager only.*
*All other dashboard sections are covered in the Admin Dashboard prompt.*
