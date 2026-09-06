# cooperage — build plan

Working plan for the portfolio rebuild. Written to be picked up cold in a new session:
everything decided so far, why, and what is left. Update it as things land.

**Last updated:** 2026-09-06

---

## Where this stands

Phase 0 (design brief) is **done**. Phase 3 (design build) is **in progress** —
tokens, page shell, and the sticky stack are built and green. Two interactive pieces
remain, and they are deliberately reserved as learning work (see "Coach mode").

```
✅ Phase 1  Scaffold
✅ Phase 0  Design brief — direction settled, mockups approved
🔨 Phase 3  Design build — shell + stack done; menu + viewer outstanding
⬜ Phase 2  React fundamentals — folded into Phase 3's two Client Components
⬜ Phase 4  Server features — contact form as Server Action, next/og images
⬜ Phase 5  Cutover — oakcooper.com → Vercel, archive the Gatsby repo
```

Phase 2 and 3 swapped order in practice: the React learning now happens inside the
real design rather than before it, because the two Client Components are genuinely
the clearest illustration of the server/client boundary.

---

## The design, settled

### Positioning

Audience is **recruiters and hiring managers**, not designers.

The argument is Oak's **professional record** — the Vue 3 migration, the ~$80K/yr
pipeline saving, observability built twice, AI guardrails, team leadership. The side
projects are **evidence for that claim, not the claim itself**. Hence: claim first,
evidence after.

An earlier version of `CLAUDE.md` said "let the work lead from the first viewport."
That advice comes from *designer* portfolios, where the work is the product, and it
is wrong here — leading with small personal apps reads as a ceiling rather than a
footnote. Corrected.

Positioning is **design-centric frontend**. The sixteen years of full-stack .NET are
credibility supporting that claim — one line in About — never a co-headline. A site
that claims frontend *and* backend *and* design systems claims nothing.

### Three-second claim

**"Meticulous."** Minimalist but not empty. Restraint reads as confidence.

### Surface — "Editorial"

Chosen over a warmer "Nocturnal" direction. Both were mocked; Oak picked Editorial
and asked for more color, so the Cairn gold came across.

| | |
|---|---|
| Ground | `#0E1018` — cool off-black, never pure black |
| Accent | `#E8C98C` — **lifted from `cairn/src/lib/theme.ts`**, which calls itself the design spec |
| Display | Space Grotesk |
| Reading copy | Newsreader (light) |
| Labels | JetBrains Mono, letterspaced small caps |

**The gold is rationed.** It is allowed on: the tier meter, one rule under the name,
the availability dot, and links. If a fifth thing wants gold, something else gives it
up. This constraint is doing real work — it is why the page reads as restrained.

### The signature move — the maturity axis

Every project shows how finished it actually is: **Polished · In progress ·
Prototype · Planned**, carried by a four-step meter (lit rules for completed steps,
dashed for the rest).

Why it earns its place:

- Most dev portfolios hide unfinished work, which costs them their most interesting
  projects.
- Honesty legible at a glance **is** meticulousness — it demonstrates the trait
  instead of asserting it.
- It is structural, so it survives content churn. Design the tiers, not the projects.
- One sentence to describe to someone else. That is the test.

**Typography stays uniform across every project.** Oak explicitly rejected varying
font sizes per tier — the widget carries the tier, the type does not. An early spike
encoded tier in type size; that was removed.

The idiom is borrowed from Cairn, which already encodes state this way: solid stroke
plus glow for witnessed parts, dashed and unglowing for emerging ones.

### Page order

```
01 Hero        name, title, claim, and EVERY link (GitHub, LinkedIn, resume, email)
02 About       bio; design-centric frontend; .NET as one supporting line
03 Experience  the record and the numbers
04 Skills      banded by depth, honestly
05 Work        the sticky panel stack — evidence
06 Contact
```

Links live in the hero so a recruiter with thirty seconds needs no scrolling.

Work sits at the end on purpose. It also solves a scroll-budget problem: the stack
costs ~1 viewport per panel, so five projects is ~5 viewports. At the end, someone
who has seen enough simply stops instead of scrolling past all of it to reach the bio.

**Known trade-off:** a visitor who bounces after two screens never sees the stack,
which is the distinctive move. Hedges in place: the hero facts row says "5, tiered
honestly", and the menu will read "Work — 5 projects". If that proves insufficient,
the fallback is one teaser panel high on the page with the full stack at the end.
Do not build that until it is a demonstrated problem.

### The sticky panel stack

Full-viewport panels, `position: sticky; top: 0`, each scrolling up over the last
like dealing cards onto a deck.

**It is pure CSS.** No GSAP, no ScrollTrigger, no scroll listener, no animation
library. This was verified by reading the DOM of two reference sites
(centrephotogeneve.ch and michaelpumo.com) — both do exactly this, in Tailwind
arbitrary values. The entire effect is one class string.

Panels are `92dvh`, not `100dvh`, so a sliver of the next panel always shows — the
cue that the stack continues.

The stack **must stay inside its own wrapper** (`Work.tsx`). A sticky element only
sticks while its containing block is in view; scoping it is what lets the last panel
release so About and Contact scroll normally instead of being covered.

---

## Code, as built

```
src/
  app/
    globals.css        design tokens in Tailwind v4 @theme; the `label` utility
    layout.tsx         three Google fonts via next/font, metadata
    page.tsx           section order; all Server Components
  lib/
    projects.ts        Tier type, TIERS table, PROJECTS array
    resume.ts          PROFILE, ROLES, EARLIER, SKILLS — from the 2026 resume
  components/
    Hero.tsx  About.tsx  Experience.tsx  Skills.tsx  Contact.tsx
    Work.tsx           stack wrapper — scopes sticky
    ProjectPanel.tsx   one panel; `sticky top-0 h-panel` is the effect
    TierMeter.tsx      the four-rule meter
public/screens/        screenshots go here; see its README
```

State: `next build` green, `tsc --noEmit` clean, `eslint` clean, `/` prerenders as
`○ (Static)` — **zero client JavaScript so far**.

The throwaway `/spike/stack` route has been deleted; the real stack supersedes it.

---

## What is left

### 1. Screenshots — Oak

Nothing is wired up yet; every project's `screens` array is empty and panels render
an "AWAITING SCREENS" placeholder, which is honest but not the goal.

Drop files in `public/screens/` as `<slug>-<n>.png`, then fill each project's
`screens` array in `src/lib/projects.ts` with `src`, `alt`, `caption`, and the real
pixel `width`/`height` (next/image needs the dimensions to avoid layout shift).

Two or three per project. The first is the panel cover; the rest appear in the viewer.

> **Do not use Claude in Chrome to capture these.** Oak takes screenshots himself —
> browser tooling is slow and token-heavy. Ask before using it for anything.

### 2. The collapsing menu — Oak writes it, coached

A sticky top bar that collapses, with jump links to each section. Needs open/closed
state and scroll position, so it is a **Client Component** (`"use client"`).

This is the cleanest illustration of the server/client boundary: the page is static
HTML, one small island is interactive. Explain the boundary first, Oak writes it,
then review.

### 3. The screenshot viewer — Oak writes it, coached

Opens from "VIEW SCREENS" on a panel and cycles through that project's screens.
Needs index state, keyboard navigation (arrows, Escape), and focus management.
Same lesson, slightly harder. `ProjectPanel.tsx` has a `TODO(oak)` marking the seam.

### 4. Remaining content passes

- About copy is **drafted by Claude**, not lifted from the resume. It is the one
  section written rather than transcribed — read it aloud and rewrite in Oak's voice.
- Decide whether to state "twenty-five years" at all. Accurate and signals depth,
  but some readers act on it.
- Postmarked has no screenshots because it is mid-redesign. It slots into the
  **In progress** tier when ready.
- Recipe Site is **Angular on purpose** — twelve years of production Angular and
  nothing public to point at. Filling the Prototype tier needs a night of design work.
- `public/oak-cooper-resume-2026.pdf` is referenced but **not yet added**.

### 5. Phase 4 — Server features

Contact form as a **Server Action** (Oak writes this — highest-value learning in the
project), and dynamic OG images via `next/og`.

### 6. Phase 5 — Cutover

Import to Vercel, point oakcooper.com, archive the Gatsby repo. Note from the vault:
the apex currently resolves to `52.52.192.191` / `13.52.188.95`, which is not
Netlify's standard apex IP — find where DNS is actually hosted before attempting it.

---

## PR previews

The repo went public today, ahead of the Phase 5 cutover schedule — nothing in it
depends on staying private (`.env*` is gitignored, `.env.example` only lists
placeholder names, real secrets live in Vercel), and a public repo is itself part of
the pitch (see CLAUDE.md's "Conventions"). Going public unblocks the plainer choice
below, so no reason to wait for cutover.

**Decision: connect the Vercel project now, for previews only — not the domain
cutover.** This is a separate step from Phase 5 above: it gets every PR a live
preview, but `oakcooper.com` still doesn't point anywhere until cutover.

Considered and rejected: reusing cairn's approach (build a static export, push it to
a `gh-pages` branch via `rossjrw/pr-preview-action`, comment the link on the PR).
Two problems. First, GitHub Pages isn't available on a private repo without
GitHub Pro — moot now that the repo is public, but it was the original blocker.
Second, and the real reason to drop it even after going public: that flow only ever
posts a PR comment, it never registers as a real GitHub Deployment, so the PR never
gets an Environments entry — exactly what felt thin about cairn's setup. Next.js
also has Server Actions and a `next/og` route coming in Phase 4, both of which need
a Node server; a static export would stop working the day that work lands, so
building preview infra around one would have been throwaway.

Vercel's own GitHub integration solves both problems natively, with zero workflow
YAML: every push gets a Preview deployment registered as a real GitHub Deployment
(shows under the PR's Environments tab, via the Deployments API, not just a bot
comment), and every branch additionally gets a stable alias —
`cooperage-git-<branch-slug>-<vercel-scope>.vercel.app` — that stays constant across
every commit pushed to that branch, unlike the per-deployment hash URL. That's the
part cairn's per-PR gh-pages subfolder got right and plain Vercel previews don't by
default; the branch alias gets it back without leaving Vercel.

**One-time manual step (needs Oak's own Vercel login, not something Claude can do):**
import `oak-wildwood/cooperage` at vercel.com/new, accept the zero-config Next.js
detection, deploy. Nothing else to configure — no `vercel.json` needed.

---

## Coach mode — how to work on this

From `CLAUDE.md`, and it still holds:

- **CSS, layout, tooling, config: just do it.** Oak has fifteen-plus years of this
  and learns nothing watching it get explained.
- **React and Next concepts: explain first, let Oak write it, then review.** Server
  vs. Client Components, Server Actions, data flow, caching. Do not silently
  implement the parts he is here to learn — that is the whole point of the project.

The two outstanding Client Components and the Phase 4 Server Action are **his to
write**. Scaffold around them, mark the seam, explain the concept, then stop.

---

## Reference

- Design sourcing, references, and the reasoning behind the direction:
  `~/Vault/Projects/Portfolio Design Inspiration Sourcing 2026-08-23.md`
- Approved mockups (7 artboards, Editorial direction):
  https://claude.ai/code/artifact/143aa9e0-35cd-423d-adbb-c8523ab43268
- Resume: `~/Documents/2026 Job Search/Oak Cooper Resume 2026.pdf`
- Cairn's palette, which is the source of this site's accent:
  `~/Code/cairn/src/lib/theme.ts`
