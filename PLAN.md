# cooperage — build plan

Working plan for the portfolio rebuild. Written to be picked up cold in a new session:
everything decided so far, why, and what is left. Update it as things land.

**Last updated:** 2026-09-06

---

## Today's session queue

Ordered, so a cold session (or a context clear mid-session) knows what's next:

1. ✅ **Collapsing menu** — fixed and verified live (collapse + active-section
   highlight, including the page-bottom edge case). See "Code, as built."
2. **Workshop the About copy** — Claude's draft exists; refine it toward Oak's voice.
3. **Screenshots + roster lock** — Oak shoots the screens, then decide together which
   projects actually ship in v1 (roster in `CLAUDE.md` may shrink for launch).
4. **Publish** — Vercel import, point oakcooper.com at it.
5. **Retire the Gatsby repo** — archive `oak-wildwood/dev-portfolio` once cutover holds.

The goal is shipping today, not sequencing every phase below in order — Phase 4
(Server Action, OG images) is not in today's queue and can wait past launch.

## Where this stands

Phase 0 (design brief) is **done**. Phase 3 (design build) is **in progress** —
tokens, page shell, sticky stack, and the collapsing menu are built and green. The
screenshot viewer is the one outstanding interactive piece.

```
✅ Phase 1  Scaffold
✅ Phase 0  Design brief — direction settled, mockups approved
🔨 Phase 3  Design build — shell + stack + menu done; viewer outstanding
⬜ Phase 2  React fundamentals — folded into Phase 3's Client Components
⬜ Phase 4  Server features — contact form as Server Action, next/og images
⬜ Phase 5  Cutover — oakcooper.com → Vercel, archive the Gatsby repo
```

Phase 2 and 3 swapped order in practice: the React learning now happens inside the
real design rather than before it, because the Client Components are genuinely the
clearest illustration of the server/client boundary.

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
the availability dot, links, and — added 2026-09-06 — the Skills section's
AI-assisted-engineering band, the one skill category worth calling out as a real
differentiator rather than raw years-of-depth. `Skills.tsx`'s "Deep" band had drifted
into a sixth, unintentional gold spot (gold label text on plain chips, next to the
AI band's dim-gold label on gold chips) with no clear reason — corrected to plain so
the AI band is the section's sole accent. If a further thing wants gold, something
else gives it up. This constraint is doing real work — it is why the page reads as
restrained.

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
    Menu.tsx           the one "use client" island — collapsing top bar
  hooks/
    useCollapsedPastHero.ts   hero-visibility → collapsed boolean
    useActiveSection.ts       scroll-driven active section id, plus the
                              exported pure `computeActiveSection` — unit
                              tested in useActiveSection.test.ts
public/screens/        screenshots go here; see its README
```

State: `next build` green, `tsc --noEmit` clean, `eslint` clean, `/` still
prerenders as `○ (Static)` even with `Menu.tsx` mounted — the Client Component
boundary is small enough that it doesn't change the page's rendering strategy.

Testing: Vitest + React Testing Library, per Next's own guide
(`node_modules/next/dist/docs/01-app/02-guides/testing/vitest.md`). Config in
`vitest.config.mts` (jsdom environment, native `resolve.tsconfigPaths` for the
`@/*` alias — no separate plugin needed). `npm test` runs once, `npm run
test:watch` for dev. `@types/node` bumped `^20` → `^24` to match the actual
Node runtime and satisfy Vitest 5's peer requirement — a pre-existing
staleness from scaffold time, not caused by adding tests.

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

### 2. The collapsing menu — done

`Menu.tsx` is a **Client Component** (`"use client"`): a sticky top bar that
collapses past the hero and highlights the active section while scrolling. Both
behaviors are scroll-driven state, resolved via a `scroll` listener rather than
`IntersectionObserver` for the active-section case — the `work` section wraps the
whole sticky panel stack, so its bounding box is many viewports tall, and a
short final section (`contact`) immediately after it can leave the page with no
scroll distance left for a threshold-line approach to ever reach it. Verified live
against the running dev server, including the page-bottom edge case.

### 3. The screenshot viewer

Opens from "VIEW SCREENS" on a panel and cycles through that project's screens.
Needs index state, keyboard navigation (arrows, Escape), and focus management.
`ProjectPanel.tsx` has a `TODO(oak)` marking the seam.

### 4. Remaining content passes

- ✅ **About/Hero copy voice pass — done 2026-09-06.** Read aloud line by line;
  reworked the Hero claim to drop the "twenty-five years" framing (softened to
  the AI-guardrails/friction angle instead — resolves the open question below)
  and fixed the About "sixteen years, full-stack .NET" line against the actual
  resume (closer to a decade-plus, not exclusively .NET). Cross-checked against
  `~/Documents/2026 Job Search/Oak Cooper Resume 2026.pdf` and the Vault's
  `Job Search - LinkedIn and Strategy 2026-07-15.md`. UX/accessibility was
  considered as a positioning angle and dropped — not backed by much tangible
  resume evidence, so don't lean on it here.
- Postmarked has no screenshots because it is mid-redesign. It slots into the
  **In progress** tier when ready.
- Recipe Site is **Angular on purpose** — twelve years of production Angular and
  nothing public to point at. Filling the Prototype tier needs a night of design work.
- ✅ `public/oak-cooper-resume-2026.pdf` added; the Hero's resume link now has a
  `download` attribute so it saves instead of opening inline in the browser.

### 5. Phase 4 — Server features

Contact form as a **Server Action** (Oak writes this — highest-value learning in the
project), and dynamic OG images via `next/og`.

### 6. Phase 5 — Cutover

Import to Vercel, point oakcooper.com, archive the Gatsby repo. Note from the vault:
the apex currently resolves to `52.52.192.191` / `13.52.188.95`, which is not
Netlify's standard apex IP — find where DNS is actually hosted before attempting it.

---

## PR previews

Connect this repo's Vercel project via Vercel's GitHub integration — separate from
the Phase 5 domain cutover, and needs no workflow YAML. Every push registers a real
GitHub Deployment (Environments tab on the PR, not a bot comment), and every branch
gets a stable alias URL (`cooperage-git-<branch-slug>-<vercel-scope>.vercel.app`)
that doesn't change across commits, unlike Vercel's default per-deployment URL. Repo
is public now (moved up from the Phase 5 schedule) — nothing in it was private-only.

**Manual step (needs Oak's own Vercel login):** import `oak-wildwood/cooperage` at
vercel.com/new, accept zero-config detection, deploy.

---

## Coach mode — how to work on this

Superseded 2026-09-06: Claude now implements Client Components and the Phase 4
Server Action directly rather than scaffolding them for Oak to write. CSS, layout,
tooling, and config were always fair game to just do.

---

## Reference

- Design sourcing, references, and the reasoning behind the direction:
  `~/Vault/Projects/Portfolio Design Inspiration Sourcing 2026-08-23.md`
- Approved mockups (7 artboards, Editorial direction):
  https://claude.ai/code/artifact/143aa9e0-35cd-423d-adbb-c8523ab43268
- Resume: `~/Documents/2026 Job Search/Oak Cooper Resume 2026.pdf`
- Cairn's palette, which is the source of this site's accent:
  `~/Code/cairn/src/lib/theme.ts`
