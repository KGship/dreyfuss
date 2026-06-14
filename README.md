# The Dreyfuss Effect

A digital editorial quarterly — long-form essays on Science, History, and Commerce,
set in a letterpress/print aesthetic. Built from the design handoff in
`design_handoff_dreyfuss_effect/` (reference only — not shipped).

## Stack

- **Next.js 15** (App Router) + **TypeScript**, React 19
- Server components for reading pages; client components only where there's real
  interactivity (nav active state, sort, share, forms, reading ribbon, toast)
- Content authored as **MDX** with frontmatter (`content/articles/*.mdx`),
  compiled with `next-mdx-remote/rsc`. No `dangerouslySetInnerHTML` — constrained
  headline markup (`<br/>`, `<em>`) is parsed into React nodes by
  `components/RichTitle.tsx`.
- Fonts via `next/font/google` (Cinzel, IM Fell English, Cormorant Garamond,
  EB Garamond, JetBrains Mono), wired to the design tokens in `app/globals.css`.

## Routes (the six views + chrome)

| Route | View |
|---|---|
| `/` | Cover / front page |
| `/{science\|history\|commerce}` | Section landing (sort: recent / beginning / most-read) |
| `/{section}/{articleId}` | Article reader (ribbon, share bar + modal, sidenotes, figure, rail, related) |
| `/about` | About |
| `/contact` | Contact + essay-pitch form |
| `/subscribe` | Subscribe (dark hero) |

Persistent chrome on every page: **Masthead → Nav → view → Colophon → Toast**
(`app/layout.tsx`). Invalid sections and section/article mismatches render the
styled `app/not-found.tsx`.

## Data layer

- `lib/sections.ts` — the three sections.
- `lib/content.ts` — reads `content/articles/*.mdx` frontmatter + body.
- `content/articles/octopus-mind.mdx` — the one fully-authored essay (drop cap,
  numbered margin sidenotes, engraving figure, blockquote, section break).
- The other 17 articles ship as metadata only; opening one renders the full
  chrome with a **"being typeset"** stub in place of the body (no fabricated
  prose). Author a body by adding MDX under the frontmatter to light it up.

## Forms / endpoints (stubs)

- `POST /api/subscribe` — validates email, logs, acknowledges. Wire to a real
  mailing-list provider.
- `POST /api/submit` — validates pitch, logs, acknowledges. Wire to the
  editorial inbox / CRM.

## Design fidelity

The default theme from the handoff is baked into `:root` in `app/globals.css`
(crimson `#7a1b2b`, gold `#b08d3a`, paper/cream family, square corners, hairline
rules, hard letterpress shadows). The design-time **Tweaks panel**, night mode,
and density modes were intentionally dropped. Crimson `<hr class="rule">` under
headings and the gold double-rule insets are preserved.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # prerenders all 30 routes
```
