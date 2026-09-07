@AGENTS.md

# cooperage — project context

> **Start here: [`PLAN.md`](./PLAN.md).** It carries the settled design direction, the
> reasoning behind each decision, what is built, and what is left. Read it before
> touching the design or the build — it exists so a cold session does not re-litigate
> choices that are already made.

Personal dev portfolio for Oak Cooper. Ground-up rebuild replacing a 2020-era
Gatsby 2 site (`oak-wildwood/dev-portfolio`, still live at oakcooper.com until cutover).

## Goals

1. **Primary — a genuinely modern portfolio.** Bold, distinctive, memorable. The old
   site was an off-the-shelf HTML5UP template; it is the explicit *anti-reference*,
   not a starting point.
2. **Secondary — hands-on React / Next.js / SSR experience.** Oak is a Vue.js and
   AngularJS expert with deep TypeScript background but little React. This project
   is a deliberate learning vehicle for React Server Components, the App Router,
   and Server Actions.

## How to work with Oak

Claude implements directly, including React and Next.js concepts — Server vs. Client
Components, Server Actions, data flow, caching — rather than scaffolding them for
Oak to write. See `PLAN.md`'s "Coach mode" section for how that changed mid-build.

## Stack

| | |
|---|---|
| Next.js 16.3.2 | App Router, React Server Components |
| React 19.2.8 | |
| TypeScript 5 | Non-negotiable — it's table stakes in React shops |
| Tailwind CSS v4 | Chosen over Sass: it's the lingua franca in React codebases |
| Vercel | First-party Next hosting; Server Actions + `next/og` work with zero config |

Note: Next 16 is new enough that its APIs differ from model training data. Read
`node_modules/next/dist/docs/` before writing Next-specific code (see AGENTS.md).

## Roadmap

- [x] **Phase 1 — Scaffold.** `create-next-app`, repo, Impeccable ported, build green.
- [ ] **Phase 0 — Design brief.** Landbook references → `/impeccable init` → `DESIGN.md`.
      Deliberately *after* scaffolding, but *before* any UI work.
- [ ] **Phase 2 — React fundamentals (coach mode).** Server vs. Client Components;
      App Router file conventions; porting project content into typed objects.
- [ ] **Phase 3 — Design build.** Impeccable drives. **Not** "work leads from the first
      viewport" — that advice is for *designer* portfolios, where the work is the product.
      Oak's argument is his professional record; the side projects are evidence for it.
      Order: Hero (with every link) → About → Experience → Skills → Selected work → Contact.
- [ ] **Phase 4 — Server features.** Contact form as a Server Action; dynamic OG images
      via `next/og`. Oak writes the Server Action — highest-value learning in the project.
- [ ] **Phase 5 — Cutover.** Point oakcooper.com at Vercel, archive the Gatsby repo.

Phase 2 precedes Phase 3 on purpose: learning React while fighting a complex layout
buries the concepts in noise. Simple markup first, then make it beautiful.

## Conventions

- **Secrets never enter the repo.** `.env.example` is committed; `.env*` is ignored.
  Real values live in Vercel project settings.
- **Vendored tooling is gitignored** (`.claude/skills/`, `.impeccable/`) so the repo
  stays focused on application code.
- **Repo is private now, goes public at launch.** A public Next.js repo with readable
  code is itself a portfolio piece — plan accordingly and keep commits legible.
- **PR and commit descriptions are matter-of-fact.** State what the change is and
  what problem it solves, the way a human engineer's description would. Never
  narrate the chat that produced it (no "Oak asked about X").
- **PR titles follow Conventional Commits** (`type: summary`, e.g. `docs:`, `feat:`,
  `fix:`, `chore:`) — squash-merges reuse the PR title as the commit message, so the
  title is what ends up in history. Enforced by CI.

## Content status

The four legacy projects (Lunch & Learn, withjoy.life, Storylines, Dev Portfolio) are
**cut, not ported**. None of those sites are still hosted, and all that survives is a
few low-res screenshots — showing them would contradict the design claim below.

The replacement roster, and the design primitive it implies:

| Project | Tier |
|---|---|
| Work Search Log — public repo, tests, a11y, genuinely finished | Polished |
| Postmarked — postcard-tracking PWA, used daily; needs a design revamp first | Polished |
| `cooperage` itself — public repo at launch, the code is the exhibit | In progress |
| A prototype — none exist yet; tier may be empty at launch | Prototype |
| Recipe site | Planned |

**Design for the tiers, not the projects.** Two roster rows are still unnamed and the
content will churn; the *maturity axis* (Polished · In progress · Prototype · Planned)
is the stable structure. Showing project state honestly and at a glance is a candidate
for the site's one signature move.

## Design direction (Phase 0)

- **Three-second claim: "meticulous."** Minimalist, but not empty.
- **Surface: Editorial.** Cool off-black `#0E1018`; Space Grotesk headings, Newsreader
  reading copy, JetBrains Mono labels. One accent — `#E8C98C`, the gold lifted from
  Cairn's own `theme.ts` — rationed to the tier meter, one rule, the status dot, links.
- **Audience is recruiters and hiring managers**, not designers. Claim first, evidence
  after. Positioning is *design-centric frontend*; the .NET years are credibility
  supporting that claim, never a co-headline.
- **Signature move: the maturity axis** — Polished · In progress · Prototype · Planned,
  carried by a four-step meter, never by varying typography.
- **Oak's own nature photography** is in play, deliberately restrained — subdued
  backdrop or texture rather than full-bleed hero, so it doesn't overpower the work.
- Full sourcing method, references, and open tensions live in
  `~/Vault/Projects/Portfolio Design Inspiration Sourcing 2026-08-23.md`.
