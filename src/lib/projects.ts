/**
 * The work, and how finished each piece actually is.
 *
 * The maturity tier is the point of this section: showing unfinished work with the
 * unfinished part labelled is the claim the whole site makes. Design for the tiers,
 * not for these five projects — the roster will churn, the axis won't.
 */

export type Tier = "polished" | "building" | "prototype" | "planned";

export const TIERS: Record<
  Tier,
  { label: string; note: string; steps: number }
> = {
  polished: { label: "Polished", note: "Shipped. In use. Finished.", steps: 4 },
  building: { label: "In progress", note: "Real, and still moving.", steps: 3 },
  prototype: { label: "Prototype", note: "A sketch that runs.", steps: 2 },
  planned: { label: "Planned", note: "Not built yet.", steps: 1 },
};

export type Screen = {
  /** Path under /public/screens/. */
  src: string;
  /** Describes the UI for someone who can't see it — not "screenshot of app". */
  alt: string;
  /** Shown under the image while cycling. */
  caption: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  tier: Tier;
  year: string;
  blurb: string;
  stack: string[];
  repo?: string;
  live?: string;
  /** Empty is legitimate — a prototype with nothing to show says so. */
  screens: Screen[];
};

export const PROJECTS: Project[] = [
  {
    slug: "work-search-log",
    name: "Work Search Log",
    tier: "polished",
    year: "2026",
    blurb:
      "A private log for job-search activity — built to satisfy the record most US unemployment agencies can demand at any time, for any week of a benefit year.",
    stack: ["Vue 3", "TypeScript", "Vitest", "Accessibility"],
    repo: "https://github.com/oak-wildwood/work-search-log",
    screens: [],
  },
  {
    slug: "cairn",
    name: "Cairn",
    tier: "polished",
    year: "2026",
    blurb:
      "A radial map for Internal Family Systems parts work. Self fixed at the centre, parts placed around it by role, connected by lines that show how they relate.",
    stack: ["Svelte", "D3", "TypeScript", "SVG"],
    repo: "https://github.com/oak-wildwood/cairn",
    screens: [],
  },
  {
    slug: "postmarked",
    name: "Postmarked",
    tier: "building",
    year: "2026",
    blurb:
      "A postcard tracker my household opens every day — address book, photos, and where each card is on its way to. Built for us, kept because it works.",
    stack: ["Vue 3", "Pinia", "Firebase", "PWA"],
    screens: [],
  },
  {
    slug: "cooperage",
    name: "cooperage",
    tier: "building",
    year: "2026",
    blurb:
      "This site. Next 16 and React Server Components, written in the open — the repository is as much the exhibit as the page you are reading.",
    stack: ["Next 16", "RSC", "Tailwind v4", "TypeScript"],
    repo: "https://github.com/oak-wildwood/cooperage",
    screens: [],
  },
  {
    slug: "recipe-site",
    name: "Recipe Site",
    tier: "prototype",
    year: "—",
    blurb:
      "A place for the recipes that already work. Angular on purpose: twelve years of it in production and nothing public to point at.",
    stack: ["Angular", "TypeScript", "Signals"],
    screens: [],
  },
];
