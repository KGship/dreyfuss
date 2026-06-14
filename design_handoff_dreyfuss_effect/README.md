# Handoff: The Dreyfuss Effect — Editorial Website

## Overview
**The Dreyfuss Effect** is a literary/editorial publication website — a digital magazine of long-form essays organized into three sections (Science, History, Commerce). The design evokes a printed editorial quarterly: letterpress masthead, ruled columns, engraving placeholders, Roman-numeral issue dating, marginalia/sidenotes, and a warm paper palette. It is unhurried, bookish, and a little contrarian — "analog by choice in a digital world."

The site comprises six view types: a newspaper-style **Home/Cover**, **Section** landing pages with sort controls, an **Article** reader with sidenotes and a share rail, and three static pages — **About**, **Contact/Submit**, and **Subscribe**.

---

## About the Design Files
The files in this bundle are **design references created in HTML/React-via-Babel** — prototypes that demonstrate the intended look, copy, and behavior. **They are not production code to ship directly.** The current prototype runs entirely in the browser off CDN React + in-browser Babel transpilation, uses client-side route state (no real URLs), and mocks all data in a single `data.js` object.

Your task is to **recreate these designs in the target codebase's real environment** — using its established framework, routing, component patterns, styling system, and build tooling. If no environment exists yet, choose an appropriate modern stack (e.g. Next.js / Astro / Remix for a content site like this, since it is SEO- and reading-oriented) and implement the designs there. Treat the HTML/JSX here as the **source of truth for visual + interaction design and copy**, not for architecture.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, copy, and interactions are final and intentional. Recreate the UI pixel-faithfully — match the exact hex values, font stacks, type sizes, rule weights, and the letterpress/editorial detailing (double rules, diamond separators, dingbat ornaments, drop caps, sidenote popovers). The aesthetic *is* the product; do not substitute a generic design system.

---

## Tech Stack of the Prototype (for reference only)
- React 18 (UMD) + ReactDOM, transpiled in-browser by Babel Standalone — **replace with a real build**.
- No router: a single `route` state object (`{ name, section?, id? }`) in `App` drives which view renders. `go(name, params)` sets the route and scrolls to top. **Recreate as real routes** (see "Routes" below).
- All content mocked in `window.DATA` (`data.js`). **Move to a CMS, MDX, or data layer.**
- A "Tweaks" panel (`tweaks-panel.jsx` + the `<TweaksPanel>` block in `app.jsx`) is a **design-time theming tool, NOT a product feature** — it live-swaps palette/fonts/density via CSS variables. Do **not** ship it; it exists so the design could be explored. The default theme values it carries (below) ARE the intended defaults.

---

## Design Tokens

### Colors (CSS custom properties from `:root` in `styles.css`)
| Token | Hex | Role |
|---|---|---|
| `--ink` | `#1a1410` | Primary text, hard rules, borders |
| `--ink-soft` | `#3a2c20` | Secondary text / deks |
| `--ink-mute` | `#6b5947` | Tertiary / captions / datelines |
| `--rule` | `#b9a98a` | Hairline rules / soft borders |
| `--rule-soft` | `#d9cbac` | Faintest dividers |
| `--crimson` | `#7a1b2b` | **Primary accent** — kickers, links, the red rule under headings, buttons |
| `--crimson-deep` | `#5a1220` | Hover/active accent |
| `--crimson-bright` | `#9a2738` | Bright accent |
| `--cream` | `#f4ecd8` | Inset/card backgrounds (e.g. subscribe box, editor's note) |
| `--paper` | `#efe6d2` | **Page background** |
| `--paper-warm` | `#ebe0c6` | Warm panel background |
| `--paper-shadow` | `#e2d4b3` | Deeper paper shade |
| `--gold` | `#b08d3a` | Secondary accent — "Of Commerce/History" kickers, diamonds, ornament borders |
| `--gold-bright` | `#c9a24a` | Bright gold (on dark subscribe hero) |
| `--gold-soft` | `#d8b96a` | Muted gold |

The page background also carries two very faint radial gradients (gold at 20%/10%, crimson at 80%/90%, ~0.03–0.04 alpha) and an optional SVG fractal-noise "paper texture" overlay (`body.paper-noise::before`, opacity 0.35, `mix-blend-mode: multiply`). The **Subscribe hero** is a dark/ink panel with gold accents (inverse of the rest of the site).

### Typography (font stacks)
Loaded from Google Fonts. Stacks are defined as CSS variables:
- `--serif-mast` (masthead/large display): **IM Fell English**, fallback IM Fell DW Pica, Cormorant Garamond.
- `--serif-display` (headlines, italic accents): **Cormorant Garamond**, fallback EB Garamond, Garamond.
- `--serif-body` (body copy): **EB Garamond**, fallback Garamond, Times New Roman.
- `--sans-meta` (kickers, datelines — small tracked caps): Cormorant Garamond / EB Garamond.
- `--mono` (email addresses, technical): **JetBrains Mono**.
- The masthead wordmark "The Dreyfuss Effect" specifically uses **Cinzel** (Roman caps).

Base body: `19px`, `line-height 1.55`, color `--ink`, on `--paper`. `font-feature-settings: "kern","liga","onum"` (oldstyle figures). Antialiased.

**Type roles & sizes:**
- `.kicker` — 13px, `letter-spacing 0.28em`, uppercase, crimson, weight 600.
- `.dateline` — 12px, `letter-spacing 0.22em`, uppercase, ink-mute (`--sans-meta`).
- Masthead wordmark — large Cinzel, clickable (returns home).
- Hero headline (home) — Cormorant, large, line-height ~1.05, uses `titleHtml` with `<br/>` and `<em>` for the accent word.
- Article headline — `clamp` large display; About `<h1>` uses `clamp(56px, 8vw, 104px)`, line-height 0.96.
- Pull quotes / deks — Cormorant Garamond **italic**, `--ink-soft`.
- `.smallcaps` / `.smcps` — small-caps utilities used for inline emphasis (e.g. "pdf", "docx", volume numerals).

### Spacing, rules & ornaments
- **No border radius** anywhere except: section emblems (`border-radius: 50%`, circular) and is otherwise `0` (e.g. form fields explicitly `border-radius: 0`). This is a hard-edged, printed-page aesthetic — **keep corners square.**
- **Borders:** 1px solid `--ink` for structural boxes/columns; 1px solid `--rule` for hairline inner dividers. Several boxes use a **double-rule inset** — an absolutely-positioned inner border (`position:absolute; inset:6px; border:1px solid var(--gold|--rule)`) inside a `--ink` outer border (see InlineSubscribe, sample card, modal).
- **The crimson rule** under section headings: `<hr class="rule">` with `height:1px; background: var(--crimson); border:0;` and a bottom margin (`0 0 22px` under "The Purpose", `0 0 16px` under "The Publication"/"The Podcast"). This is a signature element — reproduce it under each card heading.
- **Shadows:** used sparingly as hard offset "letterpress" shadows, never soft blur — sidenote popover `4px 4px 0 rgba(122,27,43,0.12)`; share modal `8px 8px 0 rgba(122,27,43,0.25)`.
- **Diamonds** (`.diamond`) — small rotated gold/ink squares used as meta separators.
- **Dingbats** (`❦`) — `<Dingbat>` ornament dividers between sections.
- Container widths: `.container` (article/text width), `.container-wide` (full grid width), `.container-narrow` (centered prose). Match the existing max-widths in `styles.css`.

### Default theme (intended product defaults — from `TWEAK_DEFAULTS` in `app.jsx`)
```
palette:      crimson #7a1b2b · paper #f4ecd8 · gold #b08d3a
headlineFont: Cormorant Garamond
mastFont:     IM Fell English
bodyFont:     EB Garamond
density:      regular
night:        false
paperTexture: true
```

---

## Routes / Views
The prototype uses in-app state, not URLs. Recreate as real routes:

| View | Suggested route | Component | Purpose |
|---|---|---|---|
| Home / Cover | `/` | `Home` (`home.jsx`) | Front page: lead essay, two secondary leads, tri-column section roundup, editors' pull quote, inline subscribe |
| Section landing | `/{science\|history\|commerce}` | `Section` (`section.jsx`) | Section hero + sort toolbar + article list + cross-section nav |
| Article reader | `/{section}/{articleId}` | `Article` (`article.jsx`) | Headline, dek, meta, share bar, body with sidenotes + figure, right-rail marginalia, related grid, share modal |
| About | `/about` | `About` (`pages.jsx`) | Mission/purpose; two-column layout |
| Contact / Submit | `/contact` | `Contact` (`pages.jsx`) | Three-box contact section + essay-submission form |
| Subscribe | `/subscribe` | `Subscribe` (`pages.jsx`) | Dark hero with email capture + "What lands on Sunday" |

Persistent chrome on every view: `Masthead` → `Nav` → view → `Colophon` (footer) → `Toast`. (`components.jsx`)

---

## Screens / Views — detail

### Masthead (`components.jsx` → `Masthead`)
Top strip with `Vol. {VIII} · No. {CXLIII}` (Roman numerals via `toRoman`), centered "An Editorial Publication, Published Weekly", "Established MMXIX". Big centered **Cinzel** wordmark "The Dreyfuss Effect" (click → home). Sub-line "Reports, Reflections, & Reckonings from the long present" (note the `&` is styled `.amp`). Meta row: today's full date (left), centered Latin motto "Sapientia est Veritas" flanked by ❦ and diamonds, "Reading Time · Approx. 47 min" (right). The Roman volume/issue and date are computed at render — keep that behavior.

### Nav (`components.jsx` → `Nav`)
Horizontal: Cover · Science · History · Commerce · About · Contact · Subscribe, separated by `.nav-sep`. Active state underlines/colors the current item. Section items route to their section landing; section + article routes both mark the section item active.

### Home / Cover (`home.jsx`)
- **Hero grid** (2-col, `.hero-grid`): left = lead essay (kicker "The Lead Essay · Vol. VIII", clickable headline from `hero.titleHtml`, dek, byline `By {author} · {readTime} read · {date}`, `.btn-ghost` "Read the Essay →"); right = `<Engraving>` placeholder plate. Hero article = `octopus-mind`.
- **Two secondary leads** (2-col, divided by a `--rule` border, outer `--ink` bottom border): commerce lead (`tulip`, gold kicker "Of Commerce") + history lead (`clerk-byzantine`, gold kicker "Of History"). 38px Cormorant headlines.
- **Tri-column roundup** (`.tri-col`): one column per section, each with a circular `<Emblem>` letter, section title, kicker, the 3 most-recent essays (headline + dek + `author · date`), and a `.btn-ghost` "All of {Section} →".
- **Editors' pull quote** section: centered `<Dingbat glyph="❦ ❦ ❦">`, large italic Cormorant blockquote ("The shortest path between two truths is the longer essay."), attribution, trailing ❦.
- **InlineSubscribe**: cream box with gold double-rule inset; left = "The Weekly Letter" kicker + "One essay. Sunday morning." (mast font) + italic sub; right = email form (`.subscribe-form`: input + Subscribe button) → on submit shows a ❦ confirmation. "Free, always · Unsubscribe in two clicks".

### Section landing (`section.jsx`)
- **Hero** (`.section-hero`): `<Emblem>`, `.section-title`, crimson kicker, `.section-blurb`, dingbat.
- **Toolbar** (`.section-toolbar`): count "{n} essays in this section" + **Sort** group with three buttons — "Most Recent" (newest), "From the Beginning" (oldest), "Most Read" (popularity). Active button highlighted. Sorting is real client-side state (`useMemo`).
- **Article list** (`.article-list`): each `.article-row` is a 3-zone grid — left: `№ {Roman index}` + kicker sublabel; center: crimson kicker, headline (`titleHtml`), `.dek`, meta row (`By {author}` · diamond · `{date}` · diamond · `{readTime} read`); right (`.art-side`): `<Engraving>` plate 180px. Whole row clickable → article.
- **Cross-section nav**: dingbat + "Continue Reading In" + `.btn-ghost` buttons for the other two sections.

### Article reader (`article.jsx`)
- **`ReadingRibbon`** — fixed vertical scroll-progress bar (`.ribbon` / `.ribbon-progress` height %).
- **Article hero** (`.article-hero`): kicker = clickable section name · gold sub-kicker; `.article-headline` (`titleHtml`); `.article-dek`; meta row with diamonds.
- **Body with rails** (`.article-with-rails`, center + right `<aside>`):
  - **Share bar** (`.share-bar`): "Share this essay" + pills — Copy Link (writes URL to clipboard + toast), Email (mailto), Print as PDF (`window.print()`), More (opens `ShareModal`).
  - **Body** (`.article-body`, rendered by `BodyRenderer`): markdown-ish blocks from `DATA.bodies`. Strings → paragraphs (first gets `.lede` drop-cap treatment); `*text*`/`_text_` → `<em>`; `{type:"h2"}` → `<h2>`; `{type:"break"}` → `❦ ❦ ❦` `.section-break`; raw `<blockquote>` passed through. After the 2nd paragraph a `<figure>` with an `<Engraving>` + italic figcaption is injected. **Sidenotes**: specific phrases get `.sidenote` spans with `data-popover` text; on hover a numbered `.sidenote-popover` appears positioned in the right margin (see `SidenoteParagraph`).
  - **Editor's note** — cream box, italic, with crimson "An Editor's Note" dateline, author bio line, `mono` email.
  - **Right rail** `<aside>` — sticky (`top:120`) "In this essay" contents list + "Companion reading" citations.
- **Related** (`.related` / `.related-grid`): "More from {Section}" + 3 `.related-card`s (kicker, headline, dek, meta).
- **`ShareModal`** — backdrop + square modal with hard offset shadow; "Pass it Along" dateline, title, share options (Email, Print, LinkedIn, X — last two just toast), and a copy-link row.

### About (`pages.jsx` → `About`)
- **Hero** (`.about-hero`): kicker "On the Publication", huge mast-font `<h1>` "About *The Dreyfuss Effect*" (crimson italic accent), italic Cormorant standfirst, dingbat.
- **Two-column body** (`.about-cols`, grid `1.15fr 0.85fr`, `align-items: stretch`):
  - **Left — "The Purpose"** (`.about-col-main`): a single `--ink`-bordered box, `display:flex; flex-direction:column; justify-content:center`. Heading "The Purpose" + **crimson rule** (`<hr class="rule">`, margin `0 0 22px`) + one long mission paragraph. The box **stretches to match the combined height of the two right-hand cards** (tops aligned, bottoms aligned), content vertically centered.
  - **Right — stacked cards** (`.about-col-side`): two `.about-card`s — **"The Publication"** (tag "Now Publishing") and **"The Podcast"** (tag "Coming Soon", gold). Each card: tag + heading + **crimson rule** (`<hr class="rule">`, margin `0 0 16px`) + paragraph.
- **Closing**: centered narrow section — dingbat, italic statement on the name, "The Editors" dateline.

> Note: All three section headings ("The Purpose", "The Publication", "The Podcast") carry the identical crimson `<hr class="rule">` beneath them — a recently-corrected detail; preserve it.

### Contact / Submit (`pages.jsx` → `Contact`)
- **Hero**: "Contact *the team.*" (crimson italic accent) + italic sub "We answer all communications, eventually. The post is slow on purpose."
- **Three-box section** (`.contact-grid`, 3 equal cols, divided by `--ink` borders; each `.contact-card` is `display:flex; flex-direction:column`):
  - **Tips & Leads** — "An archive abandoned, a manuscript misplaced, a story sequestered. We invite individuals to offer what others have overlooked."
  - **General Inquiries** — "Press, proposition, and partnership. We welcome queries and questions alike."
  - **Submissions** — "Distinct, Deliberate, and Daring. See our criteria below."
  - Each card ends with an **email address pinned to the bottom** (`.contact-email`: `align-self:flex-start; margin-top:auto`, bordered) — emails align along a common baseline across all three boxes.
- **Submission form** ("Pitch us here" heading): intro "An opinion, plainly stated and patiently developed. A subject studied, seasoned, and slept on. We accept pieces between two and six thousand words." Fields: Name, Email, **Section `<select>` defaulting to a disabled "Please select"** option (then Science / History / Commerce / "I am not yet sure"), Working title, "The pitch — two paragraphs" textarea, and a `.btn-primary` "Send the Pitch →". (Square fields, `border-radius:0`.)

> Note: an earlier "Guidelines" ordered list was intentionally removed — do not reintroduce it.

### Subscribe (`pages.jsx` → `Subscribe`)
- **Dark hero** (`.subscribe-hero`, ink background, gold accents): "The Weekly Letter" dateline, `<h2>` "One essay. *Sunday morning.* Always free." (gold accent), sub "A single piece of long-form writing, delivered at dawn.", `.subscribe-form` (email + Subscribe) → on submit a gold-bordered ❦ confirmation. Stat line "17,400 readers in 64 countries · Unsubscribe in two clicks".
- **"What lands on Sunday"** section: kicker, mast-font heading "The editor's *choice*" (crimson italic accent), italic sub "One click to subscribe. Free in perpetuity."

---

## Interactions & Behavior
- **Navigation**: `go(name, params)` sets route state and `window.scrollTo(top)`. Recreate as real client/server routing with scroll-reset.
- **Clickable headlines/rows/cards** route to their article or section.
- **Sort** (Section): real state, three orders (newest / oldest / most-read by `popularity`).
- **Reading progress ribbon** (Article): updates on scroll.
- **Sidenotes** (Article): hover a `.sidenote` span → numbered popover appears in the right margin, positioned relative to the span.
- **Share**: Copy Link uses `navigator.clipboard` + a toast; Email uses `mailto:`; Print uses `window.print()`; ShareModal for more options. LinkedIn/X are stubbed to toasts.
- **Forms** (Subscribe, InlineSubscribe, Contact): controlled inputs; submit is `preventDefault`'d and swaps to an inline confirmation state. **No real backend** — wire these to your real subscribe/submit endpoints.
- **Toast**: transient message, auto-dismiss ~2.4s.
- **Modal**: click backdrop or ✕ to close; inner click stops propagation.

## State Management
Prototype-level only — replace with your app's conventions:
- `route` (`{name, section?, id?}`), `toastMsg`, tweak/theme object (design-time only).
- Per-view local state: section `sort`; article `shareOpen`; forms `email`/`sent`; sidenote `popover` position.
- Data fetching: none — all from `window.DATA`. Replace with real content fetching (CMS/MDX) keyed by section slug + article id.

## Assets
- **No bitmap/image assets.** All "imagery" is **`<Engraving>` placeholder slots** (`components.jsx`) — bordered boxes with a centered glyph + label/caption, standing in for engraving plates. Replace with real editorial illustrations/engravings where the design calls for them, preserving the framed/captioned treatment.
- **Iconography** is typographic — Unicode glyphs/dingbats (❦ ✦ ⚓ † ✺ ◈ etc.), diamonds drawn in CSS, social glyphs as text. No icon font/SVG set.
- **Fonts**: Google Fonts — IM Fell English, IM Fell DW Pica, Cormorant Garamond, EB Garamond, Playfair Display, Spectral, Lora, Crimson Pro, Cinzel, UnifrakturMaguntia, JetBrains Mono. (The full list is loaded for the design-time font tweaker; the **shipping set** you actually need is: **Cinzel, IM Fell English, Cormorant Garamond, EB Garamond, JetBrains Mono** — plus any you choose to keep.)
- **Paper texture**: inline SVG `feTurbulence` noise data-URI in `body.paper-noise::before` — copyable from `styles.css`.

## Files in this bundle
- `index.html` — document shell, font loading, script order.
- `styles.css` — **the complete design system** (~1,400 lines): tokens, typography, every component's styles. Lift exact values from here.
- `data.js` — mock content corpus (`window.DATA`: sections, articles, one full article body).
- `components.jsx` — shared chrome & ornaments: `Masthead`, `Nav`, `Colophon`, `Engraving`, `Dingbat`, `Emblem`, `ReadingRibbon`, `Toast`, `toRoman`.
- `home.jsx` — `Home` + `InlineSubscribe`.
- `section.jsx` — `Section`.
- `article.jsx` — `Article`, `BodyRenderer`, `SidenoteParagraph`, `ShareModal`.
- `pages.jsx` — `About`, `Contact`, `Subscribe`.
- `app.jsx` — `App` (routing/state), the **design-time** Tweaks panel, theme application, `shade()` helper, mount.
- `tweaks-panel.jsx` — the design-time tweak controls (**do not ship**).

## Implementation notes / gotchas
- **Keep corners square** and rules hairline — this is a print aesthetic; rounded corners or soft drop-shadows will break it. The only round element is the circular section emblem.
- **Reproduce the crimson `<hr class="rule">`** under every card/section heading and the **gold/rule double-border insets** — these are signature details.
- Headlines use `titleHtml` (contains `<br/>` + `<em>`); render as HTML, and keep the italic accent-word convention.
- Strip the **Tweaks panel** entirely from production. Bake in the default theme values above as your design tokens.
- Roman numerals (volume/issue/list indices) come from `toRoman()` — preserve the convention.
- Replace `dangerouslySetInnerHTML` content with safe, sanitized rendering (or author content as MDX) in production.
