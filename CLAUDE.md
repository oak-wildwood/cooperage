@AGENTS.md

# cooperage — project context

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

**Coach mode on the React/Next concepts.** Claude scaffolds, configures, and does the
design/CSS grunt work. But for React and Next.js concepts — Server vs. Client
Components, Server Actions, data flow, caching — *explain first, let Oak write it,
then review*. Do not silently implement the parts he's here to learn.

CSS, layout, tooling, and config are fair game to just do — he already knows those cold.

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
- [ ] **Phase 3 — Design build.** Impeccable drives. Portfolios are "Experience" mode:
      let the work lead from the first viewport, the interface recedes.
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

## Content status

The four legacy projects (Lunch & Learn, withjoy.life, Storylines, Dev Portfolio) carry
over from the old site as **placeholders**. They're dated and will be replaced. Design
for the structure, not for this specific content.
