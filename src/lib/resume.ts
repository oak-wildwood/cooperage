/** Content from the 2026 resume, trimmed for reading on screen. */

export const PROFILE = {
  name: "Oak Cooper",
  title: "Senior Frontend Engineer",
  email: "oak@oakcooper.com",
  linkedin: "https://linkedin.com/in/oakcooper",
  github: "https://github.com/oak-wildwood",
  resume: "/oak-cooper-resume-2026.pdf",
  available: true,
  claim:
    "Senior frontend engineer with an eye for the friction most people don't notice until it's gone. Most recently four years deep in a ~300-component Vue application — co-leading its Vue 3 migration, rebuilding the deployment pipeline underneath it, and setting how the team used AI without letting speed cost quality.",
} as const;

export type Role = {
  start: string;
  end: string;
  place: string;
  title: string;
  company: string;
  bullets: string[];
};

export const ROLES: Role[] = [
  {
    start: "2022",
    end: "2026",
    place: "Remote",
    title: "Senior Software Engineer, Frontend",
    company: "ACV Auctions · ACV MAX",
    bullets: [
      "Co-led the Vue 2 → Vue 3 / Vuetify 3 migration of a ~300-component application, clearing the Vuetify breakages that were the migration's biggest blocker.",
      "Moved the deployment pipeline off Vercel and GitHub Actions onto AWS and Jenkins, rebuilding branch previews from scratch — saving ~$80K/yr.",
      "Built frontend browser observability from scratch, twice — New Relic, then Datadog RUM — adding anomaly detection to catch the silent failures threshold alerts miss.",
      "Cut local test-suite runtime in half and memory use by 66%, then encoded the fixes into an automated pre-PR review step.",
      "Engineered the guardrails that keep AI-generated code trustworthy, and ran coding and systems-design interviews as the team scaled across the US and India.",
    ],
  },
  {
    start: "2020",
    end: "2022",
    place: "Remote",
    title: "Lead Frontend Developer",
    company: "Hudson MX",
    bullets: [
      "Led a small frontend team owning six Angular apps and one React app for an ad-tech platform.",
      "Introduced an Nx monorepo with a microfrontend architecture, and ran a private npm registry of shared UI components consumed by 30+ apps across the company.",
      "Established a UI design system on Storybook in partnership with the UX team.",
    ],
  },
  {
    start: "2017",
    end: "2019",
    place: "Atlanta, GA",
    title: "Lead Developer",
    company: "Dick's Sporting Goods · Blue Sombrero",
    bullets: [
      "Led the frontend architectural redesign of the flagship registration product in TypeScript and Angular, with a microfrontend strategy built on Angular Elements.",
      "Upgraded the flagship Angular 4 application through version 8, including AoT support.",
      "Introduced Jest and Cypress, and established mandatory pre-merge build, lint and test checks.",
    ],
  },
];

export const EARLIER =
  "Earlier: Sr. Angular Architect at Rockwater, Sr. Engineer at Preparis, technical lead for fourteen developers at Morneau Shepell, and back through Kabbage, HotDocs and FNC to 2001.";

export type SkillBand = {
  label: string;
  note?: string;
  tone: "deep" | "gold" | "plain" | "dashed";
  items: string[];
  caption?: string;
};

export const SKILLS: SkillBand[] = [
  {
    label: "Deep",
    note: "Years of production work",
    tone: "deep",
    items: [
      "Vue 2 / 3",
      "Angular",
      "TypeScript",
      "NgRx (Redux)",
      "Pinia",
      "GraphQL",
      "CSS architecture",
      "Accessibility",
      "Design systems",
    ],
  },
  {
    label: "AI-assisted engineering",
    note: "Set the team's approach",
    tone: "gold",
    items: [
      "Claude Code",
      "Skill / plugin dev",
      "LLM review in CI",
      "AI guardrails",
    ],
    caption:
      "Codified the conventions the tools follow, so speed never cost the team quality or consistency — and kept the judgment to know when to override them.",
  },
  {
    label: "Platform",
    tone: "plain",
    items: [
      "Jenkins / Vercel",
      "AWS",
      "Docker",
      "Vite",
      "Datadog RUM",
      "Vitest / Jest",
      "Playwright / Cypress",
      "Storybook / Chromatic",
    ],
  },
  {
    label: "Recent, not deep",
    tone: "dashed",
    items: ["React", "Next.js", "Server Components", "Svelte"],
    caption:
      "Dashed for the same reason the projects are. This site is the React one; Cairn is the Svelte one. Both are recent.",
  },
];
